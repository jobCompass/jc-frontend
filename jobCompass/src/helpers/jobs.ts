import axios from 'axios';
import { JobType, Obj } from './propTypes';
import { Timestamp } from "firebase/firestore";
const server = import.meta.env.VITE_SERVER;

type FormValues = {
  company: string;
  job_title: string;
  list: string;
}

const filterJobs = (arr:Array<JobType>) => {
  const result: Obj = {'saved':[], 'applied':[], 'reject':[], 'screen':[], 'tech':[], 'final':[], 'offered':[]};
  arr.forEach((job:JobType) => {result[job.status].push(job)});
  return result;
}

const getUserJob = (userId:string) => {
  return axios.get(`${server}/${userId}/getjob`)
    .then(result => {
      // console.log('result',result, result.data.length);
      if (result.data.length > 0) {
        return filterJobs(result.data)
      } else {
        return result.data;
      }
    })
    .catch(err => console.error(err));
}
interface LogoResponse {
  logos: {type:string, formats:Record<string, string>[]}[];
  colors:Record<string, string>[]
}
const getLogo =async (company:string) => {
  try {
    const res= await axios.get<LogoResponse>(`https://api.brandfetch.io/v2/brands/${company}.com`, {headers:{"Authorization":import.meta.env.VITE_logo_api}})
    if (res && res.data.logos && res.data.colors) {
      const icon = res.data.logos.filter((l) => l.type === 'icon')
      const lightColor = res.data.colors.filter(c => c.type === 'accent')
      return {logo: icon[0].formats[0].src, color:lightColor[0].hex}
    }
  } catch(error) {
    console.error('datelejob error: ', error)
  }
}
const addJob = async(userId:string, jobData: FormValues)=> {
  // console.log('in job functions:',userId, jobData)
  const current_time = Timestamp.fromDate(new Date())
  const newJob = {logo:"",bgColor:'#f5f6f7',company:jobData.company, title: jobData.job_title, status: jobData.list, timeline:{[jobData.list]: {'_seconds': current_time.seconds, '_nanoseconds':current_time.nanoseconds}}}
  // console.log('newjob: ', newJob)
  try{
    const logodata = await getLogo(newJob.company.split(" ")[0])
    console.log('logodata:', logodata)
    if (logodata && logodata.logo && logodata.color) {

      newJob.logo = logodata.logo
      newJob.bgColor = logodata.color
    }
    const res = await axios.post(`${server}/${userId}/addjob`, newJob)
    if (res.status === 201) {
      return res.data
    }
  } catch(error) {
    console.error('addjob server error:', error)
  }
}

const updateJob = async(userId: string, job: JobType, target?: string ) => {
  const current_time = Timestamp.fromDate(new Date());
  const copy = !target ? job : {...job, status: target, timeline: {...job.timeline, [target]: {'_seconds': current_time.seconds, '_nanoseconds':current_time.nanoseconds}}};
  try {

    const res = await axios.put(`${server}/${userId}/${job.id}/updatejob`, copy);
    if (res.status == 200) {
      console.log('copy', copy)
      return copy;
    }
  } catch(error) {
    console.error('update job server error: ', error);
  }
}

const deleteOneJob = async (userId: string, id: string) => {
  console.log('starting delete', userId, id)
  try{
    const res = await axios.delete(`${server}/${userId}/${id}`)
    if (res.status == 200) {
      return 'delete'
    }
  } catch(error) {
    console.error('datelejob error: ', error)
  }
}



export {getUserJob, addJob, updateJob, deleteOneJob, getLogo}
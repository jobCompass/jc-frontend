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
  const result: Obj = {'saved':[], 'applied':[], 'reject':[], 'phone':[], 'tech':[], 'fianl':[], 'offered':[]};
  arr.forEach((job:JobType) => {result[job.status].push(job)});
  return result;
}

const getUserJob = (userId:string) => {
  return axios.get(`${server}/${userId}/getjob`)
    .then(result => {
      console.log('result',result);
      if (result.data.length > 0) {
        return filterJobs(result.data)
      } else {
        return result.data;
      }
    })
    .catch(err => console.error(err));
}

const addJob = async(userId:string, jobData: FormValues):Promise<JobType|undefined>=> {
  // console.log('in job functions:',userId, jobData)
  const current_time = Timestamp.fromDate(new Date())
  const newJob = {company:jobData.company, title: jobData.job_title, status: jobData.list, timeline:{[jobData.list]: {'_seconds': current_time.seconds, '_nanoseconds':current_time.nanoseconds}}}
  // console.log('newjob: ', newJob)
  try{
    const res = await axios.post(`${server}/${userId}/addjob`, newJob)
    if (res.status === 201) {
      return newJob
    }
  } catch(error) {
    console.error('addjob server error:', error)
  }
}

export {getUserJob, addJob}
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
      console.log('result',result, result.data.length);
      if (result.data.length > 0) {
        return filterJobs(result.data)
      } else {
        return result.data;
      }
    })
    .catch(err => console.error(err));
}

const addJob = async(userId:string, jobData: FormValues)=> {
  // console.log('in job functions:',userId, jobData)
  const current_time = Timestamp.fromDate(new Date())
  const newJob = {company:jobData.company, title: jobData.job_title, status: jobData.list, timeline:{[jobData.list]: {'_seconds': current_time.seconds, '_nanoseconds':current_time.nanoseconds}}}
  // console.log('newjob: ', newJob)
  try{
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
  console.log('outside copy', copy)
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

export {getUserJob, addJob, updateJob, deleteOneJob}
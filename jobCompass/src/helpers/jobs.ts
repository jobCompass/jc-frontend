import axios from 'axios';
import { JobType, Obj } from './propTypes';
const server = import.meta.env.VITE_SERVER;


const filterJobs = (arr:Array<JobType>) => {
  console.log('filterjobs', arr);
  const result: Obj = {'saved':[], 'applied':[], 'reject':[], 'phone':[], 'tech':[], 'fianl':[], 'offered':[]};
  arr.forEach((job:JobType) => {
    result[job.status].push(job);
  });
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

export {getUserJob}
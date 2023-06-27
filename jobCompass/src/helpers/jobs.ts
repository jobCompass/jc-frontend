import axios from 'axios';
const server = import.meta.env.VITE_SERVER;
import { Timestamp } from "firebase/firestore";
type JobType = {
  title: string,
  company: string,
  type: string,
  location: string | null,
  note: string | null,
  status: string,
  update:Timestamp,
  url:string,
  timeline:Map<string, Timestamp>
};
const filterJobs = (arr:Array<JobType>) => {
  console.log('filterjobs', arr);
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
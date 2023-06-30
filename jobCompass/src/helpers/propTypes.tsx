import { Timestamp } from "firebase/firestore";
export type JobType = {
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

export type JobListType = {
  status: string,
  jobs: Array<JobType>
}

export type Obj = { [propKey: string]: Array<JobType>};

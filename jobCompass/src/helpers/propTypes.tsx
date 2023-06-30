export type TimeType = {
  _seconds: number,
  _nanoseconds: number,
}

export type JobType = {
  title: string,
  company: string,
  type: string,
  location: string | null,
  note: string | null,
  status: string,
  update: string,
  url:string,
  timeline: {[propKey: string]: TimeType}
};

export type JobListType = {
  status: string,
  jobs: Array<JobType>
}

export type Obj = { [propKey: string]: Array<JobType>};

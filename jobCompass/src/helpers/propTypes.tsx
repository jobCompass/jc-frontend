export type TimeType = {
  _seconds: number,
  _nanoseconds: number
}
export type statusName = 'saved' | 'applied' | 'reject' | 'phone interview'| 'tech interview'| 'final interview'| 'offered'

export type JobType = {
  title: string,
  company: string,
  type?: string,
  location?: string,
  note?: string | null,
  status: string,
  update?: string,
  url?:string,
  timeline:{[key: string]: TimeType}
};
export type JobListType = {
  status: string,
  jobs: Array<JobType>
}

export type Obj = { [propKey: string]: Array<JobType>};

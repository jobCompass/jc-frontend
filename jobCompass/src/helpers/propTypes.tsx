export type TimeType = {
  _seconds: number,
  _nanoseconds: number
}

export type JobType = {
  id?: string,
  logo?:string,
  bgColor:string,
  title: string,
  company: string,
  type?: string,
  salary?:string,
  location?: string,
  description?:string,
  note?: string | null,
  status: string,
  update?: string,
  url?:string,
  timeline:{[key: string]: TimeType}
};
export type JobListType = {
  status: string,
  jobs: JobType[]
}

export type Obj = { [propKey: string]: JobType[]};

export interface AlertProps {
  title:string,
  message:string,
  type?:string,
  class?:string,
  success?:string,
  close?:string
  onSuccess?: () => void,
  onClose?:() => void,
}
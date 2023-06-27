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
type JobListProps = {
  key:number,
  list: {
    status: string,
    jobs: Array<JobType>
  }
}
export default function JobList ({list, key}:JobListProps) {
  return (
    <div key={key}>
      <div>{list.status}</div>
      <div>
        <ul>
          {list.jobs.map((job: JobType, j:number) => {
            return (
              <li key={j}>
                <div>{job.title}</div>
                <div>{job.company}</div>
                <div>{JSON.stringify(job.timeline)}</div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
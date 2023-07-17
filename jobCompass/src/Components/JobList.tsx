

import Button from "../Utilities/Button";
import { JobType, JobListType } from "../helpers/propTypes";
import Card from "../Utilities/Card";
import convertTime from "../helpers/convertTime";

type JobListProps = JobListType & {key:number, toggleOpen:()=>void, saveType: ()=>void};

export default function JobList ({status,  jobs,toggleOpen, saveType}:JobListProps) {

  return (
    <div
     className="w-72 h-screen border snap-x"
    >
      <div className="text-l font-bold pt-2 mt-8 h-10">
        <span>{status.toUpperCase()}</span></div>
      <div className="mb-6">{!jobs ||!jobs.length? '0' : jobs.length} JOBS</div>
      <div className="m-2">
      <Button
        class="w-full border-1 border-gray-100 hover:ring-1 hover:bg-white hover:ring-gray-200 focus:ring-1 focus:ring-blue4"
        text="+"
        type="light"
        onClick={() => {
          toggleOpen()
          saveType()
        }}
      />
      </div>
      <div>
        {!jobs || !jobs.length ?
        null
        :
        <ul>
          {jobs.map((job: JobType, j:number) => {
            job = {...job, update: convertTime(job.timeline[status])}
            return <Card key={j} job={job} />
          })}
        </ul>
        }
      </div>
    </div>
  )
}
// import { Timestamp } from "firebase/firestore";
// import {useState} from "react";
import Button from "../Utilities/Button";
import { TimeType, JobType, JobListType } from "../helpers/propTypes";
import Card from "../Utilities/Card";
import * as dateFns from 'date-fns';
import {useState} from 'react';
type JobListProps = JobListType & {key:number, open: boolean, setOpen:(open:boolean)=>void};
function convertTime (timestamp: TimeType) {1
  const temp:number = (timestamp._seconds + timestamp._nanoseconds * 0.00000001) * 1000;
  return dateFns.formatDistanceToNow(temp);
}
export default function JobList ({status, jobs, open, setOpen}:JobListProps) {

  const addJob = ()=> {
    console.log('pop up add job window')
    setOpen(true)
  }
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
        onClick={addJob}
      />
      </div>
      <div>
        {!jobs || !jobs.length ?
        null
        :
        <ul>
          {jobs.map((job: JobType, j:number) => {
            job.update = convertTime(job.timeline[status])
            return <Card key={j} job={job} />
          })}
        </ul>
        }
      </div>
    </div>
  )
}
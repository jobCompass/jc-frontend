import { Timestamp } from "firebase/firestore";
import {useState} from "react";
import Button from "../Utilities/Button";
import { JobType, JobListType } from "../helpers/propTypes";

type JobListProps = JobListType & {key:number};
function convertTime (timestamp: {_seconds:number; _nanoseconds:number}) {1
  const temp:number = (timestamp._seconds + timestamp._nanoseconds * 0.00000001) * 1000;
  const current = new Date().getTime();
  console.log((current - temp)/1000);
  return (current - temp)/1000;
}
export default function JobList ({status, jobs}:JobListProps) {

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
      />
      </div>
      <div>
        {!jobs || !jobs.length ?
        null
        :
        <ul>
          {jobs.map((job: JobType, j:number) => {
            const time1 = convertTime(job.timeline[status]);
            console.log('time convered:',time1);
            return (
              <li key={j}>
                <div>{job.title}</div>
                <div>{job.company}</div>
                <div>{time1} seconds ago</div>
              </li>
            )
          })}
        </ul>
        }
      </div>
    </div>
  )
}
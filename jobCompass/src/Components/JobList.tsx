import Button from "../Utilities/Button";
import { JobType, JobListType } from "../helpers/propTypes";
import Card from "./Card";
import convertTime from "../helpers/convertTime";
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { dragJob } from "../features/jobs/jobSlice";
import { updateJob } from "../helpers/jobs";
import { useParams } from "react-router-dom";
type JobListProps = JobListType & {key:number, toggleOpen:()=>void, saveType: ()=>void};

export default function JobList ({status, jobs, toggleOpen, saveType}:JobListProps) {
  const joblist = useAppSelector((state) => state.jobs.joblist)
  const { userId } = useParams()
  const [isDrage, setIsDrag] = useState(false)
  const dispatch = useAppDispatch()
  const handleDragOver = (e: React.DragEvent) => {
    console.log('drag overrrr')
    e.preventDefault();
    setIsDrag(true)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const job_id = e.dataTransfer.getData("id");
    const status = e.dataTransfer.getData("list")
    console.log('i in drop   d', e.currentTarget.id)
    const index = joblist[status].findIndex(x => x.id == job_id)
    const target = e.currentTarget.id.split(" ")[0]
    if (target != status) {
      if (index >= 0 && userId){
        // send put request to server update the status

        updateJob(userId, target, joblist[status][index])
          .then((updated) => {
            setIsDrag(false)
            if (updated !== undefined) {
              dispatch(dragJob({index, status, target, updated}))
            }
          })
          .catch((error) => console.log('err in handldrop: ', error))
    }
  }}
  console.log('status: ', status, jobs)
  return (
    <div
     className={`w-72 h-screen border snap-x ${isDrage ? "border-black" : ""}`}
     onDragOver={handleDragOver}
     onDrop={handleDrop}
     id={status}
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
        <ul>
          {jobs.map((job: JobType, j:number) => {
            job = {...job, update: convertTime(job.timeline[status])}
            return <Card key={j} job={job} />
          })}
        </ul>
      </div>
    </div>
  )
}
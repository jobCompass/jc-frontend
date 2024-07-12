import { JobType, JobListType } from "../helpers/propTypes";
import Card from "./Card";
import convertTime from "../helpers/convertTime";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { dragJob } from "../store/features/jobSlice";
import { updateJob } from "../helpers/jobs";


type JobListProps = JobListType & {name:string,toggleOpen:()=>void, saveType: ()=>void};

const JobList:React.FC<JobListProps> = (
  {name, status, jobs, toggleOpen, saveType}
) => {
  const joblist = useAppSelector((state) => state.jobs.joblist)
  const userId = useAppSelector((state) => state.users.id)

  const dispatch = useAppDispatch()
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const job_id = e.dataTransfer.getData("id");
    const status = e.dataTransfer.getData("list")
    const index = joblist[status].findIndex(x => x.id == job_id)
    const target = e.currentTarget.id.split(" ")[0]
    if (target != status) {
      if (index >= 0 && userId){
        // send put request to server update the status
        updateJob(userId, joblist[status][index], target)
          .then((updated) => {

            if (updated !== undefined) {
              dispatch(dragJob({index, status, target, updated}))
            }
          })
          .catch((error) => console.log('err in handldrop: ', error))
    }
  }}

  return (
    <div
     className={`md:w-72 min-h-screen md:border-[.5px] md:border-gray-300 md:snap-x`}
     onDragOver={handleDragOver}
     onDrop={handleDrop}
     id={status}
    >
      <div className="text-l text-center font-bold pt-2 md:mt-8 md:h-10">
        <span className="uppercase">{name}</span></div>
      <div className="md:mb-6 text-center">{!jobs ||!jobs.length? '0' : jobs.length} JOBS</div>
      <div className="md:m-2">
      <button
        className="w-full border-[.5px] border-gray-500 hover:ring-1 hover:bg-white hover:ring-gray-200 focus:ring-1 focus:ring-blue4 shadow-md"
        onClick={() => {
          toggleOpen()
          saveType()
        }}
      >
        +
      </button>
      </div>
      <div className="h-screen overflow-y-auto">

        <ul>
          {jobs.map((job: JobType, j:number) => {
            job = {...job, update: convertTime(job.timeline[status])}
            return <Card key={j} index={j} job={job} />
          })}
        </ul>
      </div>
    </div>
  )
}

export default JobList;
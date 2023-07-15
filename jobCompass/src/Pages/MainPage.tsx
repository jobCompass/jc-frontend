import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getUserJob} from "../helpers/jobs";
import JobList from "../Components/JobList";
import AddJob from "../Components/AddJob";
// import { JobListType } from "../helpers/propTypes";
import { Obj } from "../helpers/propTypes";
// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }
const hidden = "fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
const status = ['saved', 'applied', 'reject', 'phone interview', 'tech interview', 'final interview', 'offered']
function MainPage() {
  const { userId } = useParams()
  const [jobs, setJobs] = useState<Obj>({});
  const [open, setOpen] = useState(false)
  //send request to get jobs
  useEffect(() => {
    if (userId !== undefined){
      console.log('in ', userId);
      getUserJob(userId)
        .then(result => {
          console.log('getUserjob:', result);
          setJobs(result);
        })
    }

  }, [userId])

  return (
    <div className="flex flex-grow">
      {open && <div className={hidden}><AddJob setOpen={setOpen}/></div>}
      <div className="relative flex flex-row top-30 p-5 mx-auto snap-y">
        {status.map((type, i) =>
          <JobList key={i} status={type} jobs={jobs[type]} open={open} setOpen={setOpen}/>
        )}
      </div>
    </div>


  )
}

export default MainPage;

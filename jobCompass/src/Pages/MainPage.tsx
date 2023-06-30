import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getUserJob} from "../helpers/jobs";
import JobList from "../Components/JobList";
// import { JobListType } from "../helpers/propTypes";
import { Obj } from "../helpers/propTypes";
// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }

const status = ['saved', 'applied', 'reject', 'phone interview', 'tech interview', 'final interview', 'offered']
function MainPage() {
  const { userId } = useParams()
  const [jobs, setJobs] = useState<Obj>({});
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
      <div className="relative flex flex-row top-30 p-5 mx-auto snap-y">
        {status.map((type, i) =>
          <JobList key={i} status={type} jobs={jobs[type]}/>
        )}
      </div>
    </div>


  )
}

export default MainPage;

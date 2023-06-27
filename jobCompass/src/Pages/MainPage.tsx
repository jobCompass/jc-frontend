import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getUserJob} from "../helpers/jobs";
import JobList from "../Components/JobList";
// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }
function MainPage() {
  const { userId } = useParams()
  const [jobs, setJobs] = useState([]);
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
    <div className="relative top-30 p-5 mx-auto">
      {jobs.length > 0 && jobs.map((col,i) => <JobList key={i} list={col} />)}
    </div>

  )
}

export default MainPage;

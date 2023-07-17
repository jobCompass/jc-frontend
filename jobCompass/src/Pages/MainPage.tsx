import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {getUserJob} from "../helpers/jobs";
import JobList from "../Components/JobList";
import AddJob from "../Components/AddJob";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { open, changeStatus, getJobList} from "../features/jobs/jobSlice";


// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }
const hidden = "fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
const status = ['saved', 'applied', 'reject', 'phone interview', 'tech interview', 'final interview', 'offered']

function MainPage() {
  const { userId } = useParams()

  const openStatus = useAppSelector((state) => state.jobs.open)
  const jobs = useAppSelector((state) => state.jobs.joblist)
  const dispatch = useAppDispatch()
  //send request to get jobs

  useEffect(() => {
    if (userId !== undefined){
      console.log('in ', userId);
      getUserJob(userId)
        .then(result => {
          dispatch(getJobList(result))
        })
    }
  }, [dispatch, userId])


  return (
    <div className="flex flex-grow">
      {openStatus &&
       <div className={hidden}><AddJob status={status} toggleOpen={() => dispatch(open())}/></div>
      }
      <div className="relative flex flex-row top-30 p-5 mx-auto snap-y">
        {status.map((type, i) =>
          <JobList key={i} status={type} jobs={jobs[type]} toggleOpen={() => dispatch(open())} saveType = {() => dispatch(changeStatus(type))}/>
        )}
      </div>
    </div>


  )
}

export default MainPage;

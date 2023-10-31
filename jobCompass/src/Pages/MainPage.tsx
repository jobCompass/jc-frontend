
import { useEffect } from "react";
import {getUserJob} from "../helpers/jobs";
import JobList from "../Components/JobList";
import AddJob from "../Components/AddJob";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { open, changeStatus, getJobList, deleteJob} from "../features/jobs/jobSlice";
import JobDetail from "../Components/JobDetail";
import Alert from "../Utilities/Alert";
import { toggleAlert } from "../features/alert/alertSlice";
import { deleteOneJob } from "../helpers/jobs";
import NavBar from "../Components/NavBar";

const hidden = "fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
const status = ['saved', 'applied', 'reject', 'screen', 'tech interview', 'final interview', 'offered']
const colors = ['red', 'blue', 'yellow', 'pink', 'green',  'oringe','steelblue','skyblue','navy','chocolate', 'purple','salmon','tomato','gold','khaki','lavender','thistle','plum','yellowgreen','lightcyan']

function MainPage() {

  const userId = useAppSelector((state) => state.users.id)
  const openStatus = useAppSelector((state) => state.jobs.open)
  const curJob = useAppSelector((state) => state.details)
  const jobs = useAppSelector((state) => state.jobs.joblist)
  const dispatch = useAppDispatch()
  const alert = useAppSelector((state) => state.alert)
  //send request to get jobs
  const handleDelete = () => {
    if (userId && curJob.index > -1 && curJob.job.id) {
      deleteOneJob(userId, curJob.job.id)
      .then(() =>  {
        dispatch(toggleAlert())
        dispatch(deleteJob({index:curJob.index, status:curJob.job.status}))
      })
    } else {
      console.log('not enough info', userId, curJob)
    }
  }
  useEffect(() => {
    if (userId !== undefined){
      // console.log('in ', userId);
      getUserJob(userId)
        .then(result => {

          dispatch(getJobList(result))
        })
    }
  }, [dispatch, userId])


  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-row">
      {openStatus &&
       <div className={hidden}><AddJob status={status} toggleOpen={() => dispatch(open())}/></div>
      }
      {curJob.open &&
      <div className={hidden}><JobDetail job={curJob.job} color={colors[curJob.index]}/></div>
      }
      {alert.open && <div className={hidden}><Alert {...alert.alert} onClose={() => dispatch(toggleAlert())} onSuccess={handleDelete}/></div>}
      <div className="relative flex flex-row top-30 p-5 mx-auto snap-y">
        {status.map((type, i) => {
          const temp = type.split(" ")[0]
          return <JobList key={i} status={temp} jobs={jobs[temp] || []} toggleOpen={() => dispatch(open())} saveType = {() => dispatch(changeStatus(type))}/>
        }

        )}
      </div>
      </div>
    </div>

  )
}

export default MainPage;

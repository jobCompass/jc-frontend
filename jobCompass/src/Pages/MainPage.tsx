
import { useEffect, useState } from "react";
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

const status = ['saved', 'applied', 'reject', 'screen', 'tech interview', 'final interview', 'offered']
const colors = ['red', 'blue', 'yellow', 'pink', 'green',  'oringe','steelblue','skyblue','navy','chocolate', 'purple','salmon','tomato','gold','khaki','lavender','thistle','plum','yellowgreen','lightcyan']

function MainPage() {
  const [selected, setSelected] = useState(0)
  const userId = useAppSelector((state) => state.users.id)
  const openStatus = useAppSelector((state) => state.jobs.open)
  const curJob = useAppSelector((state) => state.details)
  const jobs = useAppSelector((state) => state.jobs.joblist)
  const dispatch = useAppDispatch()
  const alert = useAppSelector((state) => state.alert)

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

   //send request to get jobs when user change or first render
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
      <div className="flex flex-col md:flex-row">
      {openStatus &&
       <div className="popup"><AddJob status={status} toggleOpen={() => dispatch(open())}/></div>
      }
      {curJob.open &&
      <div className="popup"><JobDetail job={curJob.job} color={colors[curJob.index]}/></div>
      }
      {alert.open && <div className="popup flex flex-col justify-center items-center">
        <Alert {...alert.alert} onClose={() => dispatch(toggleAlert())} onSuccess={handleDelete}/>
      </div>}
      <div className="hidden relative md:flex flex-row top-30 p-5 mx-auto snap-y">
        {status.map((type, i) => {
          const temp = type.split(" ")[0]
          return <JobList key={i} status={temp} jobs={jobs[temp] || []} toggleOpen={() => dispatch(open())} saveType = {() => dispatch(changeStatus(type))}/>
        }

        )}
      </div>
      <div className="md:hidden w-full mt-4">
        <select className="w-full rounded-md text-sm" onChange={(e) => setSelected(parseInt(e.target.value))}>
          {status.map((type,i) =>
            <option key={i} value={i}>{type.toUpperCase()}</option>
          )}
          </select>
          <JobList key={selected} status={status[selected]} jobs={jobs[status[selected]] || []} toggleOpen={() => dispatch(open())} saveType = {() => dispatch(changeStatus(status[selected]))}/>
      </div>


      </div>

    </div>

  )
}

export default MainPage;

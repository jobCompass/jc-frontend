/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {getUserJob} from "../helpers/jobs";
import JobList from "../Components/JobList";
import AddJob from "../Components/AddJob";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { open, changeStatus, getJobList, deleteJob} from "../store/features/jobSlice";
import JobDetail from "../Components/JobDetail";
import Alert from "../Utilities/Alert";
import { toggleAlert } from "../store/features/alertSlice";
import { deleteOneJob } from "../helpers/jobs";
import NavBar from "../Components/NavBar";
import { APPLY_STATUS } from "../const/const";

const colors = ['red', 'blue', 'yellow', 'pink', 'green',  'oringe','steelblue','skyblue','navy','chocolate', 'purple','salmon','tomato','gold','khaki','lavender','thistle','plum','yellowgreen','lightcyan']

const MainPage:React.FC = ()=> {
  const [selected, setSelected] = useState<string>('')
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
        .then(result => dispatch(getJobList(result)))
        .catch(error => console.error(error));
    }
  }, [userId])


  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-col md:flex-row">
      {openStatus &&
       <div className="popup"><AddJob toggleOpen={() => dispatch(open())}/></div>
      }
      {curJob.open &&
      <div className="popup"><JobDetail job={curJob.job} color={colors[curJob.index]}/></div>
      }
      {alert.open &&
      <div className="popup flex flex-col justify-center items-center">
        <Alert {...alert.alert} onClose={() => dispatch(toggleAlert())} onSuccess={handleDelete}/>
      </div>
      }
      <div className="hidden relative md:flex flex-row top-30 p-5 mx-auto snap-y">
        {Object.keys(APPLY_STATUS).map((type, i) =>
          <JobList
           key={i}
           status={type.toLowerCase()}
           name={APPLY_STATUS[type]}
           jobs={jobs[type.toLowerCase()] || []}
           toggleOpen={() => dispatch(open())}
           saveType = {() => dispatch(changeStatus(type))}
          />
        )}
      </div>
      <div className="md:hidden w-full mt-4">
        <select
         className="w-full rounded-md text-sm"
         onChange={(e) => setSelected(e.target.value)}
        >
          {Object.keys(APPLY_STATUS).map((type,i) =>
            <option className="uppercase" key={i} value={type}>{APPLY_STATUS[type]}</option>
          )}
        </select>
        <JobList
          status={selected}
          name={APPLY_STATUS[selected]}
          jobs={jobs[selected] || []}
          toggleOpen={() => dispatch(open())}
          saveType = {() => dispatch(changeStatus(selected))}
        />
      </div>
      </div>
    </div>

  )
}

export default MainPage;

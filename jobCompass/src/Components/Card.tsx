import { useState } from 'react';
import { JobType} from "../helpers/propTypes";
import { toggle, setJob } from "../features/jobs/detailSlice";
import { useAppDispatch } from "../store/hooks";
import {RiDeleteBin6Line } from "react-icons/ri";
import { toggleAlert, setAlert } from '../features/alert/alertSlice';
import Avatar from 'react-avatar';
const border = "border rounded-md border-gray-200 shadow-lg"
const hover ="hover:ring-1 hover:ring-gray-200";
const focus ="focus:outline-none focus:ring-4";
const colors = ['red', 'blue', 'yellow', 'pink', 'green',  'oringe','steelblue','skyblue','navy','chocolate', 'purple','salmon','tomato','gold','khaki','lavender','thistle','plum','yellowgreen','lightcyan']

export default function Card ({index, job}:{index:number, job:JobType}) {
  const [isHover, setHover] = useState(false)
  // const {userId} = useParams()
  const dispatch = useAppDispatch()
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.clearData()
    e.dataTransfer.setData('id', e.currentTarget.id)
    e.dataTransfer.setData('list', job.status)
  }
  // const deleteCurrent = (userId:string, jobId:string) => {

  //   deleteOneJob(userId, jobId)
  //     .then(() =>  dispatch(deleteJob({index, status:job.status})))

  // }

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('delete cicked');
    const alertObj = {
      title:"Delete Job",
      message:"Are you sure you want delete this job?",
      success:"Delete",
      close:"Cancel",
    }
    dispatch(setJob({index, job}))
    dispatch(setAlert(alertObj))
    dispatch(toggleAlert())
    //pop up alert to comfirm user want to delete this job

  }
  return (

      <li
        draggable
        onDragStart={handleDragStart}
        id = {job.id}
        className={`${border} mx-2 my-1 cursor-pointer ${hover} ${focus}`}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() => {
          dispatch(setJob({index,job}))
          dispatch(toggle())
        }}
      >


        <div className="m-2 flex flex-row text-sm text-left relative">
          <div className="mr-2">
            <Avatar color={colors[index]} name={job.company} size="20" textSizeRatio={1.5} round/>
          </div>

        <div className="flex flex-col mr-2">
        <strong>{job.title.toLocaleUpperCase()}</strong>
        <div>{job.company}</div>
        </div>
        <div className="absolute right-0">
          {isHover &&
                  <button
                  className={`w-fit border shadow-sx rounded-full cursor-pointer border-gray-200 self-end ${focus} ${hover}`}
                  name="delete"
                  onClick={handleDelete}
                  >
                    <RiDeleteBin6Line style={{margin:'0.3rem'}} name="delete"/>
                  </button>
          }
        </div>
        </div>
        <div className="mr-2">
          <div className="text-[0.6rem] text-right">{job.update} ago</div>
        </div>


      </li>

  )
}
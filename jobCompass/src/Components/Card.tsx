import { useState } from 'react';
import { JobType} from "../helpers/propTypes";
import { toggle, setJob } from "../store/features/detailSlice";
import { useAppDispatch } from "../store/hooks";
import {RiDeleteBin6Line } from "react-icons/ri";
import { toggleAlert, setAlert } from '../store/features/alertSlice';
import Avatar from 'react-avatar';
import { getBgColor, textColor } from '../helpers/colors';
const border = "border rounded-md border-gray-200 shadow-lg"
const hover ="hover:ring-1 hover:ring-gray-200";
const focus ="focus:outline-none focus:ring-4";

export default function Card ({index, job}:{index:number, job:JobType}) {
  const [isHover, setHover] = useState(false)
  const dispatch = useAppDispatch()
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.clearData()
    e.dataTransfer.setData('id', e.currentTarget.id)
    e.dataTransfer.setData('list', job.status)
  }
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
  }

  const bgColor = job.bgColor !== '#f5f6f7' ? getBgColor(job.bgColor) : job.bgColor
  const getTextColor =job.bgColor !== '#f5f6f7' ? textColor(job.bgColor) : '#000000'

  return (

    <li
      draggable
      onDragStart={handleDragStart}
      id = {job.id}
      style={{backgroundColor:bgColor, color:getTextColor}}
      className={`${border} my-1 mx-2 cursor-pointer ${hover} ${focus} bg-opacity-0 h-24`}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onClick={() => {
        dispatch(setJob({index,job}))
        dispatch(toggle())
      }}
    >
      <div className='h-full m-2 flex justify-start relative'>
        <div className="w-8 mr-1">
          {job.logo ?
            <img src={job.logo} alt={`logo for ${job.company}`} height={30} width={30} className='object-fill rounded-full'/>
          : <Avatar color={job.bgColor} name={job.company} size="30" textSizeRatio={1.5} round/>
          }
        </div>

        <div className="flex flex-col px-1 gap-1">
          <p className='uppercase font-semibold'>{job.title}</p>
          <div className="flex justify-between items-baseline">
            <div className='capitalize'>{job.company}</div>
          </div>
        </div>
        <div className="absolute right-0 top-5">
          {isHover &&
                  <button
                  className={`p-0 shadow-sx rounded-full cursor-pointer border-gray-200 self-end ${focus} ${hover}`}
                  name="delete"
                  onClick={handleDelete}
                  style={{color: getTextColor, borderColor:getTextColor}}
                  >
                    <RiDeleteBin6Line style={{margin:'0.3rem'}} name="delete"/>
                  </button>
          }
        </div>
        <div className="absolute bottom-3 right-0 text-[0.6rem] text-right">{job.update} ago</div>

      </div>
    </li>

  )
}
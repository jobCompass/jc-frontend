
import { JobType} from "../helpers/propTypes";
import { toggle, setJob } from "../features/details/detailSlice";
import { useAppDispatch } from "../store/hooks";

const border = "shadow-sx border rounded-md border-gray-200"
const hover ="hover:ring-1 hover:ring-gray-200";
const focus ="focus:outline-none focus:ring-4";
export default function Card ({job}:{job:JobType}) {
  const dispatch = useAppDispatch()


  return (
    <div
      className={`${border} mx-2 my-1 cursor-pointer ${hover} ${focus}`}
      onClick={()=>{
        dispatch(setJob(job))
        dispatch(toggle())}}
    >
      <div className="text-sm text-left">
       <div className="font-bold">{job.title.toLocaleUpperCase()}</div>
       <div className="">{job.company}</div>
      </div>

      <div className="text-xs text-right">{job.update} ago</div>
    </div>
  )
}
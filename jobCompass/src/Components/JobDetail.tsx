/* eslint-disable @typescript-eslint/no-empty-function */
import Button from "../Utilities/Button";
import Input from "../Utilities/Input";
import Modal from "../Utilities/Modal";
import { JobType } from "../helpers/propTypes";
import { useAppDispatch } from "../store/hooks";
import { toggle } from "../features/details/detailSlice";
import convertTime from "../helpers/convertTime";
export default function JobDetail ({job}:{job:JobType}) {
  const dispatch = useAppDispatch()
  // const timeline = Object.entries(job.timeline).map((el) => ({[el[0]]:el[1]}))
  return (
    <Modal addClass="min-w-max max-w-4xl w-4/5 p-0" innerClass="mt-2">
      <div className="flex px-2">
        <div className="flex basis-3/4 flex-col px-2 pr-5">
          <div className="text-right">
            <Button
             type="light"
             text="Close"
             class="max-w-fit px-2 py-1 text-sm font-semibold"
             onClick = {() => dispatch(toggle())}
            />
          </div>
          <div className="flex items-start mt-5 mb-10">
            <div className="self-center m-2 p-2">left icon</div>
            <div className="text-left">
              <h1 className="font-semibold text-4xl">{job.title}</h1>
              <h3 className="text-xl">{job.company}</h3>
            </div>
          </div>
          <hr />
          <div className="my-5 mx-2">
            <form>
              <div className="flex m-2 justify-between">
                <Input height="mb-4 w-1/2 mr-2" type="text" id="company" defaultValue={job.company} placeholder="" register={() => {}}/>
                <Input height="mb-4 w-1/2" type="text" id="job_title" defaultValue={job.title} placeholder="" register={() => {}}/>
              </div>
              <div className="flex m-2 justify-between">
                <Input height="mb-4 w-1/2 mr-2" type="text" id="post_url" defaultValue={job.url} placeholder="+ add URL" register={() => {}}/>
                <Input height="mb-4 w-1/2" type="text" id="salary" defaultValue={""} placeholder="+ add salary" register={() => {}}/>
              </div>
              <Input height="mb-4 m-2" type="text" id="location" defaultValue={job.location} placeholder="+ add location" register={() => {}}/>
              <Input height="mb-4 m-2" inputClass="h-72" type="text" id="description" placeholder="Add job decription" register={() => {}}/>

            </form>

          </div>
        </div>
        <div className="pt-5 w-1/3 flex-col">
          <div className="font-xs font-semibold">Timeline</div>
          <hr/>
          {Object.keys(job.timeline).map((active,i)=>
            <li key={i} className="flex flex-row justify-between">
             <div className="flex">
               <div className="mr-2 w-[8px] h-[8px] rounded-full bg-slate-400 self-center"/>
               <div className="flex flex-col ">
                 <div className="text-sm">{active} Job</div>
                 <div className="text-xs font-light">You {active} Job</div>
               </div>
             </div>
               <div className="text-xs self-center font-thin">
                 {convertTime(job.timeline[active])}
               </div>
           </li>
          )}
        </div>
      </div>
    </Modal>
  )
}
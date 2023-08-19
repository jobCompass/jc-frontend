/* eslint-disable @typescript-eslint/no-empty-function */
import Button from "../Utilities/Button";
import Input from "../Utilities/Input";
import Modal from "../Utilities/Modal";
import { JobType } from "../helpers/propTypes";
import { useAppDispatch } from "../store/hooks";
import convertTime from "../helpers/convertTime";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateJob } from "../helpers/jobs";
import { toggle } from "../features/jobs/detailSlice";
import { updateOneJob } from "../features/jobs/jobSlice";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function JobDetail ({job}:{job:JobType}) {
  const dispatch = useAppDispatch()
  const {userId} = useParams()
  const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:job})

  const onSubmit: SubmitHandler<JobType> = (data) => {
    // console.log('added data:', data)
    if (userId) {
      updateJob(userId, data)
       .then((updated) => {
        if (updated !== undefined) {
          dispatch(updateOneJob(data))
        }
       })
       .then(() => dispatch(toggle()))
       .catch((error) => console.error('err in update job detail:', error))
    }
  }
  return (
    <Modal addClass="min-w-2xl w-fit max-w-4xl w-4/5 p-0" innerClass="mt-2">
      <form className="flex px-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex basis-3/4 flex-col px-2 pr-5">
          <div className="text-right">
            <input
             type="submit"
             value="Save"
             className="border-slate-700 max-w-fit px-2 py-1 text-sm border-1 font-semibold bg-blue3 text-white hover:opacity-80 active:opacity-100 shadow-sx border rounded-md my-2 focus:outline-none focus:ring-4"
            />
            <button
             className="ml-2 max-w-fit rounded-md px-2 py-1 text-sm font-semibold border border-gray-400 hover:bg-gray-100 shadow-sx  focus:outline-none focus:ring-4"
             onClick = {() => dispatch(toggle())}
            >Close</button>
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

              <div className="flex m-2 justify-between">
                <Input required={true} height="mb-4 w-1/2 mr-2" type="text" id="company" defaultValue={job.company} placeholder="" register={register} erro={errors.company}/>
                <Input required={true} height="mb-4 w-1/2" type="text" id="job_title" defaultValue={job.title} placeholder="" register={register} erro={errors.title}/>
              </div>
              <div className="flex m-2 justify-between">
                <Input height="mb-4 w-1/2 mr-2" type="text" id="post_url" defaultValue={job.url || ""} placeholder="+ add URL" register={register} required={false} />
                <Input height="mb-4 w-1/2" type="text" id="salary" defaultValue={job.salary || ""} placeholder="+ add salary" register={register} required={false} />
              </div>
              <div className="flex m-2 justify-between">
              <Input height="mb-4 mr-2 w-1/2" type="select" id="type" >
                <select {...register('type')} defaultValue={job.type} className="block w-full appearance-none border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  {['remote', 'hybrid', 'on-site'].map((el, i) => <option key={i}>{el.replace("-", " ").toUpperCase()}</option>)}
                </select>
              </Input>
              <Input height="mb-4 w-1/2" type="text" id="location" defaultValue={job.location || ""} placeholder="+ add location" register={register} required={false}/>
              </div>
              {/* <Input height="mb-4 m-2" inputClass="h-72" type="textarea" id="description" defaultValue={job.note || ""} placeholder="Add job decription" register={register} required={false} /> */}
              <div className="h-48 pb-8 max-w-4xl">

              <ReactQuill
                style={{height:'100%', textAlign:"left"}}
                modules={{
                  toolbar:[
                    ['bold', 'italic', 'underline'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['link']
                  ]
                }}
              />

                 </div>
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
      </form>
    </Modal>
  )
}
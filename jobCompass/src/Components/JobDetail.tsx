/* eslint-disable @typescript-eslint/no-empty-function */

import Input from "../Utilities/Input";
import Modal from "../Utilities/Modal";
import { JobType } from "../helpers/propTypes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import convertTime from "../helpers/convertTime";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateJob } from "../helpers/jobs";
import { toggle } from "../store/features/detailSlice";
import { updateOneJob } from "../store/features/jobSlice";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useEffect } from "react";
import Avator from 'react-avatar';

const JobDetail:React.FC<{job:JobType, color:string}> = ({job, color}) =>{
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.users.id)
  const {register, handleSubmit,setValue, watch, formState:{errors}} = useForm({defaultValues:job})
  useEffect(() => {
    register("description", { required: false })
  }, [register])

  const handleChange = (quillInput:string) => {
    setValue("description", quillInput)
  }

  const onSubmit: SubmitHandler<JobType> = (data) => {
     console.log('added data:', data)
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
  const quillInput = watch("description");
  return (
    <Modal addClass="md:min-w-2xl md:w-fit md:max-w-4xl md:w-4/5 md:p-0" innerClass="md:mt-2 h-screen md:h-full">
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
          <div className="flex items-start md:mt-5 md:mb-10">
            <div className="self-center mx-4">
              {job.logo ?
              <img src={job.logo} alt={`logo for ${job.company}`} height={60} width={60} className="rounded-full"/>
              :
              <Avator color={color} name={job.company} round size="60" textSizeRatio={1}/>
              }
              </div>
            <div className="text-left">
              <h1 className="font-semibold text-lg md:text-4xl">{job.title}</h1>
              <h3 className="tex-sm md:text-xl">{job.company}</h3>
            </div>
          </div>
          <hr />
          <div className="md:my-5 md:mx-2">

              <div className="flex md:m-2 justify-between">
                <Input required={true} height="detail_input mr-2" type="text" id="company" defaultValue={job.company} placeholder="" register={register} erro={errors.company}/>
                <Input required={true} height="detail_input" type="text" id="job_title" defaultValue={job.title} placeholder="" register={register} erro={errors.title}/>
              </div>
              <div className="flex md:m-2 justify-between">
                <Input height="detail_input mr-2" type="text" id="post_url" defaultValue={job.url || ""} placeholder="+ add URL" register={register} required={false} />
                <Input height="detail_input" type="text" id="salary" defaultValue={job.salary || ""} placeholder="+ add salary" register={register} required={false} />
              </div>
              <div className="flex md:m-2 justify-between">
              <Input height="detail_input mr-2" type="select" id="type" >
                <select {...register('type')} defaultValue={job.type} className="block w-full appearance-none border rounded border-gray-400 hover:border-gray-500 md:px-4 md:py-2 md:pr-8 text-xs md:text-sm shadow leading-tight focus:outline-none focus:shadow-outline">
                  {['remote', 'hybrid', 'on-site'].map((el, i) => <option key={i}>{el.replace("-", " ").toUpperCase()}</option>)}
                </select>
              </Input>
              <Input height="detail_input" type="text" id="location" defaultValue={job.location || ""} placeholder="+ add location" register={register} required={false}/>
              </div>
              <div className="h-48 pb-8 max-w-4xl">
                <ReactQuill
                  style={{height:'100%', textAlign:"left"}}
                  value={quillInput}
                  onChange={handleChange}
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
          <div className="text-sm md:text-lg font-semibold">Timeline</div>
          <hr/>
          {Object.keys(job.timeline).map((active,i)=>
            <li key={i} className="flex flex-row justify-between">
             <div className="flex">
               <div className="mr-2 w-[8px] h-[8px] rounded-full bg-slate-400 self-center"/>
               <div className="flex flex-col ">
                 <div className="text-xs md:text-sm capitalize">{active} Job</div>
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

export default JobDetail;
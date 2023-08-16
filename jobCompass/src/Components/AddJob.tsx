import Input from "../Utilities/Input"
import Modal from "../Utilities/Modal"
import Break from "../Utilities/Breakline"
import Button from "../Utilities/Button"
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useForm, SubmitHandler } from 'react-hook-form';
import { addJob } from "../helpers/jobs";
import { addOneJob } from "../features/jobs/jobSlice";

// import { JobType } from "../helpers/propTypes";
type FormValues = {
  company: string;
  job_title: string;
  list: string;
}
export default function AddJob ({status, toggleOpen} : {status:Array<string>,toggleOpen: () => void}) {

  const dispatch = useAppDispatch()
  const currentList= useAppSelector((state) => state.jobs.clickStatus)
  const userId = useAppSelector((state) => state.users.id)
  // const {userId} = useParams()
  console.log('id', userId)
  const {register, handleSubmit, formState: {errors}}= useForm({defaultValues: {company:'', job_title:'', list:currentList}})
  const onSubmit: SubmitHandler<FormValues>=(data) => {
    // axio to the server,
    data.list = data.list.toLowerCase()
    if (userId) {
      return addJob(userId, data)
      .then(newJob =>{
        if (newJob !== undefined) {
          dispatch(addOneJob(newJob.data))
        }
      })
      .then(() => toggleOpen())
      .catch(err => console.log('add one job err: ', err))
    } else {
      alert('not login')
    }
  }


  return (
    <Modal>
      <form
        className='px-8 pt-6 pb-8 mb-4'
        onSubmit = {handleSubmit(onSubmit)}
      >
        <div className="mb-4 text-left text-lg font-bold">Add New Position</div>
        <Input
          height="mb-4"
          type="text"
          id='company'
          placeholder="company"
          required={true}
          register={register}
          erro = {errors.company}
        />

        <Input
          height="mb-4"
          type="text"
          id="job_title"
          placeholder="Job Title"
          required={true}
          register={register}
          erro = {errors.job_title}
        />
        <Input height="mb-4" type="select" id="list" erro = {errors.list}>
          <select {...register('list')} defaultValue={currentList} className="block w-full appearance-none border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            {status.map((type, i)=> <option key={i}>{type.toUpperCase()}</option>)}
          </select>
        </Input>
        <Break text={null}/>
        <Button text={"Discard"} color="light" onClick={toggleOpen}/>
        {/* <Input height="mb-2" type="submit" value="Save" /> */}
        <input
          className="mx-2 bg-blue3 text-white hover:opacity-80 active:opacity-100 shadow-sx border rounded-md px-4 py-2 text-m my-2 focus:outline-none focus:ring-4"
          type="submit"
          value="Save"
        />
      </form>


    </Modal>

  )
}
import Input from "../Utilities/Input"
import Modal from "../Utilities/Modal"
import Break from "../Utilities/Breakline"
import Button from "../Utilities/Button"
import { useAppSelector } from "../store/hooks";
import { useForm, SubmitHandler } from 'react-hook-form';


type FormValues = {
  company: string;
  job_title: string;
  list: string;
}
export default function AddJob ({status, toggleOpen} : {status:Array<string>,toggleOpen: () => void}) {
  const currentList= useAppSelector((state) => state.jobs.clickStatus)
  const {register, handleSubmit, formState: {errors}}= useForm({defaultValues: {company:'', job_title:'', list:currentList}})
  const onSubmit: SubmitHandler<FormValues>=(data) => {
    console.log(data + 'is going to add!')
    // axio to the server,
    // add to the current list
    // then close the modal
    toggleOpen()
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
          register={register}
          erro = {errors.company}
        />

        <Input
          height="mb-4"
          type="text"
          id="job_title"
          placeholder="Job Title"
          register={register}
          erro = {errors.job_title}
        />
        <Input height="mb-4" type="select" id="list" erro = {errors.list}>
          <select {...register('list')} defaultValue={currentList} className="block w-full appearance-none border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            {status.map((type, i)=> <option key={i}>{type.toUpperCase()}</option>)}
          </select>
        </Input>
        <Break text={null}/>
        <Button text={"Discard"} type="light" onClick={toggleOpen}/>
        <input type="submit"></input>
        {/* <input type="submit"><Button text={"Save"} type="dark"/></input> */}


      </form>


    </Modal>

  )
}
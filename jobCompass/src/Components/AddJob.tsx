import Input from "../Utilities/Input"
import Modal from "../Utilities/Modal"
import Break from "../Utilities/Breakline"
import Button from "../Utilities/Button"
export default function AddJob ({setOpen} : {setOpen: (open:boolean)=>void}) {
  return (

    <Modal>
      <form className='px-8 pt-6 pb-8 mb-4'>
        <div className="mb-4 text-left text-lg font-bold">Add New Position</div>
        <Input
          height="mb-4"
          type="text"
          label="Company"
          id='company'
          placeHolder="company"
        />
        <Input
          height="mb-4"
          type="text"
          label="Job Title"
          id="job_title"
          placeHolder="Job Title"
        />

      </form>
      <Break text={null}/>
      <Button text={"Discard"} type="light" onClick={() => setOpen(false)}/>
      <Button text={"Save"} type="dark"/>

    </Modal>

  )
}
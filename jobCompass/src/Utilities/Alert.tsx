
import { AlertProps } from "../helpers/propTypes"
export default function Alert(props:AlertProps) {

  return (
    <div role="alert" className="bg-white w-full md:w-1/3 rounded-md shadow-lg ring-gray-500/30 ring-2">
      <p className="font-bold text-2xl my-4">{props.title}</p>
      <p>{props.message}</p>
      <div className="flex justify-center mt-5">
        {props.success && <button className="btn-dark mr-2" onClick={props.onSuccess}>{props.success}</button>}
        {props.close &&  <button className="btn-light ml-2" onClick={props.onClose}>{props.close}</button>}

      </div>
    </div>
  )
}

{/* <Alert title="alert" message="delete?" onSuccess={() => console.log('success cicked')} onClose={() => console.log('close')} /> */}


import { AlertProps } from "../helpers/propTypes"
export default function Alert(props:AlertProps) {

  return (
    <div role="alert">
      <p className="font-bold">{props.title}</p>
      <p>{props.message}</p>
      <div className="flex justify-center mt-5">
        {props.success && <button className="btn-dark" onClick={props.onSuccess}>{props.success}</button>}
        {props.close &&  <button className="btn-light" onClick={props.onClose}>{props.close}</button>}

      </div>
    </div>
  )
}

{/* <Alert title="alert" message="delete?" onSuccess={() => console.log('success cicked')} onClose={() => console.log('close')} /> */}

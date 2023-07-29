import Button from "./Button"
import { AlertProps } from "../helpers/propTypes"
export default function Alert(props:AlertProps) {

  return (
    <div role="alert" className="border border-blue2 bg-white px-4 py-3 ruonded">
      <div className="p-1"></div>
      <p className="font-bold">{props.title}</p>
      <p>{props.message}</p>
      <div className="flex">
        {props.success && <Button text={props.success} color="dark" onClick={props.onSuccess}/>}
        {props.close &&  <Button text={props.close} color="light" onClick={props.onClose} />}

      </div>
    </div>
  )
}

{/* <Alert title="alert" message="delete?" onSuccess={() => console.log('success cicked')} onClose={() => console.log('close')} /> */}

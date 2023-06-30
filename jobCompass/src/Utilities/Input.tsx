
type InputProps = {
  height: string,
  type: string,
  labelClass?: string | null,
  label: string,
  inputClass?: string,
  id: string,
  placeHolder: string,
}

export default function Input (props:InputProps) {
  return (
    <div className={props.height}>
      <label className={`block text-gray-700 text-sm text-left mb-2 ${props.labelClass}`} htmlFor={props.label.toLowerCase()}>
        {props.label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${props.inputClass}`}
        id={props.id}
        type={props.type}
        placeholder={props.placeHolder}
      />
</div>
  )
}
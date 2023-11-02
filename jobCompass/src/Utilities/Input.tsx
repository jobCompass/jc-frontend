
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 height:string,
 label?:string,
 labelClass?:string,
 inputClass?:string,
 children?: React.ReactNode,
 erro?: undefined | object,
 register?:any
}
export default function Input (props:InputProps) {
  const label = props.id ? props.id[0].toUpperCase() + props.id.slice(1).split('_').join(' ') : null
  return (
    <div className={props.height}>
      <label htmlFor={props.id} className={`block text-gray-700 text-xs md:text-sm text-left mb-2 ${props.labelClass}`} >
        {props.label || label}
      </label>

      {props.type === 'select' ? props.children :
      <input
      className={`text-xs md:text-sm shadow appearance-none border rounded w-full md:py-2 md:px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${props.inputClass}`}
      id={props.id}
      type={props.type}
      aria-invalid={props.erro}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      {...props.register(props.id, {
        required: props.required}
      )}
    />
      }
      {props.erro && <div className="text-right text-xs text-red-500">{`${props.label || label} is required`}</div>}
    </div>
  )
}


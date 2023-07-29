
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  text:string,
  color?:string,
  class?: string,
}


export default function Button (props: ButtonProps) {
  let defaultStyle = "shadow-sx border rounded-md px-4 py-2 text-m my-2 focus:outline-none focus:ring-4";
  if (props.color === 'light') {
    defaultStyle += " bg-white border-blue3 border-2 hover:bg-gray-100 active:bg-white";
  } else if (props.color === 'dark') {
    defaultStyle += " bg-blue3 text-white hover:opacity-80 active:opacity-100";
  }
  return (
    <button className={`${defaultStyle} ${props.class}`} onClick={props.onClick}>{props.text}</button>
  )

}


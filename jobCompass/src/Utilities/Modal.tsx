


export default function Modal({
  children, addClass, innerClass
}: {
  children: React.ReactNode,
  addClass?:string,
  innerClass?:string,
}){
  return (
    <div className={`${addClass} relative top-20 mx-auto p-5 border-2 w-96 shadow-lg rounded-md bg-white`}>
      <div className={`${innerClass} mt-2 text-center`}>

        {children}
      </div>
    </div>
  )
}

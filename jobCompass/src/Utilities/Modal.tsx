


export default function Modal({
  children, addClass, innerClass
}: {
  children: React.ReactNode,
  addClass?:string,
  innerClass?:string,
}){
  return (
    <div className={`${addClass} mt-8 md:mt-auto md:relative md:top-20 md:mx-auto md:p-5 md:border-2 md:w-96 md:shadow-lg md:rounded-md bg-white`}>
      <div className={`${innerClass} md:mt-2 text-center`}>

        {children}
      </div>
    </div>
  )
}

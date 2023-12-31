
export default function Break({text}: {text:string | null}) {
  return (
    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-400" />
      <span className="flex-shrink mx-4 text-gray-400">
        {text}
      </span>
      <div className="flex-grow border-t border-gray-400" />
    </div>
  )
}
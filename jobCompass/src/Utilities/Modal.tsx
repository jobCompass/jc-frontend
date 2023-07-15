

import logo from '../assets/logo.svg';

export default function Modal({
  children,
}: {
  children: React.ReactNode,
}){
  return (
    <div className="relative top-20 mx-auto p-5 border-2 w-96 shadow-lg rounded-md bg-white">
      <div className="mt-2 text-center ">
        <a
          className="mx-auto flex items-center justify-center h-12 w-12 rounded-full"
          href="/"
        >
          <img src={logo} alt="logo"  />
        </a>
        {children}
      </div>
    </div>
  )
}

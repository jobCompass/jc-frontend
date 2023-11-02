

import logo from '../assets/logo.svg';
export default function Logo ({size, align, href}:{size:string, align:string, href?:string}) {

  let style =""
  if (align === "center") {
    style += "mx-auto flex items-center justify-center"
  }
  return (
    <a
      className={style}
      href={href || "/"}
    >
      <img src={logo} alt="logo" className="rounded-full" height={size} width={size} />
    </a>
  )
}
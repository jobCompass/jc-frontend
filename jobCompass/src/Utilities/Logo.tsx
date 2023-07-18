

import logo from '../assets/logo.svg';
export default function Logo () {
  return (
    <a
      className="mx-auto flex items-center justify-center h-12 w-12 rounded-full"
      href="/"
    >
      <img src={logo} alt="logo"  />
    </a>
  )
}
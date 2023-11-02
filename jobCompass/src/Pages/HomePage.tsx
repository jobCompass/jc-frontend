import bigLogo from '../assets/Vector.png';
import Google from '../Components/Google';
import { logInWithEmailAndPassword } from '../helpers/auth';


function HomePage() {

  const handleDemoClicked = () => {
    try {
      logInWithEmailAndPassword("demo@jobcompass.com", "123456");
    } catch(error) {
      console.log('login demo error:', error)
    }
  }

  return (
    <div className="top-30 w-screen md:max-w-fit md:m-auto ">
      <div className="flex flex-col justify-center px-10">
        <img className="hidden md:block logo" src={bigLogo} alt="logo"/>
        <img className='md:hidden p-8' src={bigLogo} alt="logo"/>
        <a href="/signup">
          <button className="btn-dark w-full"> Sign Up</button>
        </a>
        <a href="/login">
          <button className="btn-light w-full">Log In</button>
        </a>
      </div>
      <Google />
      <div className='px-10 md:px-auto'>
        <button className="btn-light w-full md:mx-0" onClick={handleDemoClicked}>
          Try our Demo
        </button>
      </div>

    </div>

  )
}

export default HomePage;

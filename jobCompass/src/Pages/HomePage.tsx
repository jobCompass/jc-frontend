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
    <div className="top-30 w-screen max-w-fit m-auto">
      <div className="flex flex-col justify-center">
        <img className="logo" src={bigLogo} alt="logo"/>

        <a href="/signup">
          <button className="btn-dark w-full"> Sign Up</button>
        </a>
        <a href="/login">
          <button className="btn-light w-full">Log In</button>
        </a>
      </div>
      <Google />
      <div>

        <button className="btn-light w-full" onClick={handleDemoClicked}>
          Try our Demo
        </button>
      </div>

    </div>

  )
}

export default HomePage;

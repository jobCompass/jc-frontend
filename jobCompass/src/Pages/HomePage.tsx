import bigLogo from '../assets/Vector.png';
import Button from '../Utilities/Button';
import Google from '../Components/Google';
import { logInWithEmailAndPassword } from '../helpers/auth';

// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }
function HomePage() {

  // const buttonOnclick=(e:eventType) => {
  //   e.preventDefault();
  //   console.log("button clicked!", e.target.innerHTML)
  // }
  const handleDemoClicked = () => {
    logInWithEmailAndPassword("demo@jobcompass.com", "123456")
  }

  return (
    <div className="top-30 w-screen max-w-fit m-auto">
      <div className="flex flex-col justify-center">
        <img className="logo" src={bigLogo} alt="logo"/>

        <a href="/signup">
          <Button color="dark" class="w-full" text="Sign Up"/>
        </a>
        <a href="/login">
          <Button color="light" class="w-full" text="Log in"/>
        </a>
      </div>
      <Google />
      <div>

          <Button color="light" class="w-full" text="Try our demo" onClick={handleDemoClicked}/>


      </div>

    </div>

  )
}

export default HomePage;

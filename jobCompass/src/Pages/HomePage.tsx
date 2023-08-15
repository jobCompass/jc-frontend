import bigLogo from '../assets/Vector.png';
import Button from '../Utilities/Button';
import Google from '../Components/Google';

// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }
function HomePage() {

  // const buttonOnclick=(e:eventType) => {
  //   e.preventDefault();
  //   console.log("button clicked!", e.target.innerHTML)
  // }


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

    </div>

  )
}

export default HomePage;

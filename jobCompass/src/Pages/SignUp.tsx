import Modal from '../Utilities/Modal';
import Button from '../Utilities/Button';
import Google from '../Components/Google';
import Input from '../Utilities/Input';
type SignUpProps = {
  elem: string;
}
export default function SignUp({elem}: SignUpProps){
  function handleSubmit () {
    if (elem === 'login') {
      console.log("it's login")
    } else {
      console.log('signup submitted!')
    }

  }
  return (
    <div className="min-h-screen w-screen bg-blue1">
      <Modal>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Input
            height="mb-4"
            type="text"
            label="Email"
            id="email"
            placeHolder="Emaill Address"
          />
          <Input
            height="mb-6"
            type="password"
            label="Password"
            inputClass=""
            id="password1"
            placeHolder="***************"
          />
          {elem === 'signup' &&
          <Input
            height="mb-6"
            type="password"
            label="Comfirm Password"
            inputClass=""
            id="password2"
            placeHolder="***************"
          />}
          <div className="flex items-center justify-around">
            <span onClick={handleSubmit}>
              <Button
                type="dark"
                class=""
                text={elem === 'signup' ? "Sign Up" : "Log In"}
              />
            </span>
            <a href="/">
              <Button text="Back" type="light" class=""/>
            </a>
          </div>
          <div className="align-baseline font-bold text-right text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
          </div>
        <Google />
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
          {/* <h3 className="text-lg leading-6 font-large text-gray-900">Welcome to JobCompass!</h3>
          <div className="mt-2 px-7 py-3">
            <form>
              <>
            </form>
            <p className="text-s text-red-500">
              Account has been successfully registered!
            </p>
          </div>
          <span onClick={handleSubmit}>
            <Button
              type="dark"
              class=""
              text={elem === 'signup' ? "Sign Up" : "Log In"}
            />

            </span>
            <a href="/">
              <Button text="Back" type="light" class=""/>
            </a>
            <Google /> */}
        </Modal>
    </div>

  )
}
import Modal from '../Utilities/Modal';
import Button from '../Utilities/Button';
import Google from '../Components/Google';
import Input from '../Utilities/Input';
import { useNavigate } from 'react-router-dom';
type SignUpProps = {
  elem: string;
}
export default function SignUp({elem}: SignUpProps){
  const navigate = useNavigate()
  function reSetPassword() {
    console.log("reset button clicked!")
  }
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

        <form className="px-8 pt-6 pb-8 mb-4">
          <div className="mb-4 text-left text-lg font-bold">{elem === 'login' ? "Log In" : "Sign up"}</div>
          <Input
            height="mb-4"
            type="text"
            label="Email"
            id="email"
            placeHolder="Emaill"
          />
          {elem === 'signup' &&
          <>
            <Input height="mb-4" type="text" label="Full Name" id="full_name" placeHolder="Full Name" />
            <Input height="mb-4" type="text" label="Phone Number" id="phone" placeHolder="+1(123) 123-1230" />
          </>

          }
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

            <div onClick={handleSubmit}>
              <Button
                type="dark"
                class="w-full"
                text={elem === 'signup' ? "Sign Up" : "Log In"}
              />
            </div>
            {elem === 'login'?
            <div className="align-baseline cursor-pointer font-bold text-right text-sm text-blue-500 hover:text-blue-800" onClick={reSetPassword}>
                Forgot Password?
            </div>
            :
            <div className="align-baseline text-sm" >
              Already have a ccount?
              <span className="mx-1 text-blue-400 cursor-pointer hover:text-blue-800" onClick={() => navigate('/signup')}>
                Log In
              </span>
              instead
          </div>

          }
          <Google />
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 JobCompass. All rights reserved.
        </p>
      </Modal>
    </div>
  )
}
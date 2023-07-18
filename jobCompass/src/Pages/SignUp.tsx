import Modal from '../Utilities/Modal';
// import Button from '../Utilities/Button';
import Google from '../Components/Google';
import Input from '../Utilities/Input';
import { useNavigate } from 'react-router-dom';

import { useForm, SubmitHandler } from 'react-hook-form';
import Logo from '../Utilities/Logo';
type SignUpProps = {
  elem: string;
}

type FormValues = {
  email: string;
  full_name?: string;
  phone?:string;
  password1?: string;
  password2?:string;
}

export default function SignUp({elem}: SignUpProps){
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}}= useForm({defaultValues: {email:"", full_name:"", phone:"", password1:"", password2:""}})
  const onSubmit: SubmitHandler<FormValues>=(data) => {
    if (elem === 'login') {
      console.log("it's login"+data)
    } else {
      console.log('signup'+data)
    }
    // axio to the server,
    // add to the current list
    // then close the modal

  }
  function reSetPassword() {
    console.log("reset button clicked!")
  }
  console.log(errors.email)
  return (
    <div className="relative inset-0 min-h-screen w-screen bg-blue1 ">
      <Modal>
        <Logo />
        <form className="px-8 pt-6 pb-8 mb-4"  onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-left text-lg font-bold">{elem === 'login' ? "Log In" : "Sign up"}</div>
          <Input
            height="mb-4"
            type="text"
            id="email"
            placeholder="Emaill"
            register={register}
            erro = {errors.email}
          />
          {elem === 'signup' &&
          <>
            <Input height="mb-4" type="text" label="Full Name" id="full_name" placeholder="Full Name" register={register} erro = {errors.full_name}/>
            <Input height="mb-4" type="text" label="Phone Number" id="phone" placeholder="+1(123) 123-1230" register={register} erro = {errors.phone}/>
          </>
          }
          <Input
            height="mb-6"
            type="password"
            id="password1"
            placeholder="***************"
            register={register}
            erro={errors.password1}
          />
          {elem === 'signup' &&
          <Input
            height="mb-6"
            type="password"
            label="Comfirm Password"
            id="password2"
            placeholder="***************"
            register={register}
            erro={errors.password2}
          />}

            <input
              className="bg-blue3 text-white hover:opacity-80 active:opacity-100 shadow-sx border rounded-md px-4 py-2 text-m my-2 focus:outline-none focus:ring-4"
              type="submit"
              value={elem === 'signup' ? "Sign Up" : "Log In"}
            />

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
import Modal from '../Utilities/Modal';
import Google from '../Components/Google';
import Input from '../Utilities/Input';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Logo from '../Utilities/Logo';
import { logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset } from '../helpers/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAlert, toggleAlert } from '../store/features/alertSlice';
import Alert from '../Utilities/Alert';
// import { useState } from 'react';
type SignUpProps = {
  elem: string;
}

type FormValues = {
  email: string;
  full_name?: string;
  phone?:string;
  password1: string;
  password2?:string;
}

export default function SignUp({elem}: SignUpProps){
  // const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const alert = useAppSelector((state) => state.alert)
  const {register, handleSubmit, formState: {errors}, getValues}= useForm({defaultValues: {email:"", full_name:"", phone:"", password1:"", password2:""}})
  const text = elem === 'signup' ? "Log In" : "Sign Up";
  const handleAlert = (data:string) => {
    const msg = data.split('/')[1].split("-").map(word => (word[0].toUpperCase() + word.slice(1))).join(' ')
    dispatch(setAlert({type:'error', title:'Error', message:msg}))
    dispatch(toggleAlert())
  }

  const onSubmit: SubmitHandler<FormValues>=(data) => {
    if (elem === 'login') {
      console.log("it's login"+JSON.stringify(data))
      logInWithEmailAndPassword(data.email, data.password1)
       .then((res) => {
        console.log('res??? login', res);
        if (res) { handleAlert(res) }
       })
    } else {
      if (data.password1 !== data.password2) {
        dispatch(setAlert({type:"error", title: "Error", message:"Passwords not match"}))
        dispatch(toggleAlert())
        return
      }
      if (data.full_name) {
        registerWithEmailAndPassword(data.full_name, data.email, data.password1)
         .then((res) => {
          if (res) { handleAlert(res) }
         })
      }
    }
  }
  const reSetPassword=()=>{
    const email = getValues('email')
    if (!email.length) {
      dispatch(setAlert({type:"error", title: "Error", message:"Please enter your email"}))
      dispatch(toggleAlert())
    } else {
      sendPasswordReset(email)
    }

  }

  return (
    <div className="relative inset-0 min-h-screen w-screen md:bg-blue1 ">
      <Modal>
        <Logo size="60" align="center"/>
        {alert.open &&
         <div className="popup flex flex-col justify-center items-center">
          <Alert {...alert.alert} onClose={() => dispatch(toggleAlert())} close="Get it"/>
        </div>}

        <form className="px-8 pt-6 pb-8 mb-4"  onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-left text-lg font-bold">{elem === 'login' ? "Log In" : "Sign up"}</div>
          <Input
            height="mb-4"
            type="text"
            id="email"
            required={true}
            placeholder="Emaill"
            register={register}
            erro = {errors.email}
          />
          {elem === 'signup' &&
          <>
            <Input height="mb-4" type="text" required={true} label="Full Name" id="full_name" placeholder="Full Name" register={register} erro = {errors.full_name}/>
            <Input height="mb-4" type="text" label="Phone Number" id="phone" placeholder="+1(123) 123-1230" register={register} erro = {errors.phone}/>
          </>
          }
          <Input
            height="mb-6"
            type="password"
            label="Password"
            id="password1"
            required={true}
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
            required={true}
            placeholder="***************"
            register={register}
            erro={errors.password2}
          />}

            <input
              className="bg-blue3 text-white hover:opacity-80 active:opacity-100 shadow-sx border rounded-md px-4 py-2 text-m my-2 focus:outline-none focus:ring-4"
              type="submit"
              value={elem === 'signup' ? "Sign Up" : "Log In"}
            />

            {elem === 'login' &&
            <div className="mb-10 align-baseline cursor-pointer font-bold text-right text-sm text-blue-500 hover:text-blue-800" onClick={reSetPassword}>
                Forgot Password?
            </div>
            }
            <div className="align-baseline text-sm" >
              {elem === 'signup' ? "Already" : "Don/'t"} have a ccount?
              <span
               className="mx-1 text-blue-400 cursor-pointer hover:text-blue-800"
               onClick={() => navigate(`/${text.replace(' ','').toLowerCase()}`)}
              >
                {elem === 'signup' ? "Log In" : "Sign Up"}
              </span>
              instead
          </div>


          <Google />
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 JobCompass. All rights reserved.
        </p>
      </Modal>
    </div>
  )
}
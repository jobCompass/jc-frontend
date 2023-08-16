import Modal from '../Utilities/Modal';
// import Button from '../Utilities/Button';
import Google from '../Components/Google';
import Input from '../Utilities/Input';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Logo from '../Utilities/Logo';
import { registerWithEmailAndPassword } from '../helpers/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAlert, toggleAlert } from '../features/alert/alertSlice';
import Alert from '../Utilities/Alert';
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
const hidden = "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full"

export default function SignUp({elem}: SignUpProps){
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const alert = useAppSelector((state) => state.alert)
  const {register, handleSubmit, formState: {errors}}= useForm({defaultValues: {email:"", full_name:"", phone:"", password1:"", password2:""}})
  const text = elem === 'signup' ? "Log In" : "Sign Up";
  const onSubmit: SubmitHandler<FormValues>=(data) => {

    if (elem === 'login') {
      console.log("it's login"+data)
    } else {
      console.log('signup'+ JSON.stringify(data))
      if (data.password1 !== data.password2) {

        dispatch(setAlert({type:"error", title: "Error", message:"Passwords not match"}))
        dispatch(toggleAlert())
        return
      }
      if (data.full_name) {
        registerWithEmailAndPassword(data.full_name, data.email, data.password1)
         .then((res) => {
          if (typeof(res) === 'string') {
            // const msg = res.split(":")[1].split('(')[0];
            console.log(res)
            // alert(msg)
          }
         })

      }

    }
  }
  function reSetPassword() {
    console.log("reset button clicked!")
  }

  return (
    <div className="relative inset-0 min-h-screen w-screen bg-blue1 ">
      <Modal>
        <Logo size="10" align="center"/>
        {alert.open &&
         <div className={hidden}>
          <Modal>
          <Alert {...alert.alert} onClose={() => dispatch(toggleAlert())} close="Get it"/>

          </Modal>
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
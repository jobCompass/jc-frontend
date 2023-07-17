import Break from '../Utilities/Breakline';
import google from '../assets/google.png';
import {signInWithGoogle} from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from "../store/hooks";
import { addId } from '../features/users/userSlice';
export default function Google () {
  const naviagte = useNavigate()
  const dispatch = useAppDispatch()
  async function signIn () {
    try {
      const google = await signInWithGoogle();
      console.log('google in signin: ', google);
      dispatch(addId(google.uid))
      naviagte(`/${google.uid}`)
    } catch(error) {
      console.error(error);
    }
  }
  return (
    <>
      <Break text={`or`} />
      <img
       className="mx-auto cursor-pointer hover:opacity-60 active:opacity-100 focus:outline-none focus:ring-4"
       src={google}
       onClick={signIn}
       alt="google"
      />
    </>
  )
}
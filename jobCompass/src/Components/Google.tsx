import Break from '../Utilities/Breakline';
import google from '../assets/google.png';
import {signInWithGoogle} from '../helpers/auth';

export default function Google () {
  async function signIn () {
    try {
      const google = await signInWithGoogle();
      if(typeof google === 'string') {
        // redirect to user's homepage
        console.log('to homepage')
      } else {
        //redirect to signup page
        console.log('to signup page');
      }
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
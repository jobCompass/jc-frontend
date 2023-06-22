import Modal from '../Utilities/Modal';
import Button from '../Utilities/Button';
// import Google from '../Components/Google';

export default function SignUp(){
  function handleSubmit () {
    console.log('submitted!')
  }
  return (
    <div className="min-h-screen w-screen bg-blue1">
      <Modal>
          <h3 className="text-lg leading-6 font-large text-gray-900">Welcome to JobCompass!</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-s text-red-500">
              Account has been successfully registered!
            </p>
          </div>
          <span onClick={handleSubmit}>
            <Button
              type="dark"
              class=""
              text="Sign Up"
            />

            </span>
            <a href="/">
              <Button text="Back" type="light" class=""/>
            </a>
            {/* <Google /> */}
        </Modal>
    </div>

  )
}
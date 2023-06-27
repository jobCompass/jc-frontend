import { useParams } from "react-router-dom";

// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }
function MainPage() {
  const { userId } = useParams()

  // const buttonOnclick=(e:eventType) => {
  //   e.preventDefault();
  //   console.log("button clicked!", e.target.innerHTML)
  // }


  return (
    <div className="relative top-30 p-5 mx-auto">
      {userId}

    </div>

  )
}

export default MainPage;

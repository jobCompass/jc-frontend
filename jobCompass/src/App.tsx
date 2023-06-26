// import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage.tsx';
import SignUp from './Pages/SignUp.tsx';
import MainPage from './Pages/MainPage.tsx';
// import axios from 'axios';
import './App.css'

function App() {
  // const [data, setData] = useState('')
  // const url ="https://app-6lov3rzemq-uc.a.run.app/";
  // useEffect(() => {
  //   axios.get(url)
  //     .then((res) => {
  //       setData(res.data)
  //     })
  //     .catch(err => console.error(err))
  // }, [])

  return (
    // <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:userId" element={<MainPage />} />
      </Routes>
    </BrowserRouter>

     //   <HomePage /> */}
    /* { !data ? null : <div>{data}</div>}
    </div> */
  )
}

export default App

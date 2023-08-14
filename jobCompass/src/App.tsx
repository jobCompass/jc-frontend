import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './Pages/HomePage.tsx';
import SignUp from './Pages/SignUp.tsx';
import MainPage from './Pages/MainPage.tsx';
import { useAppDispatch, useAppSelector } from './store/hooks.ts';
import { addId } from './features/users/userSlice.ts';
import './App.css'
import { handleAuthChanged } from './helpers/auth.ts';

function App() {
  const user = useAppSelector((state) => state.users.id)
  const dispatch = useAppDispatch();
  // const url ="https://app-6lov3rzemq-uc.a.run.app/";
  useEffect(() => {
    handleAuthChanged((curUser) => {
      if (curUser) {
        console.log('curUser', curUser.uid)
        dispatch(addId(curUser.uid))
      } else {
        dispatch(addId(""))
      }
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      {user.length > 0 && <Navigate to={`/${user}`} replace/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp elem="signup" />} />
        <Route path="/login" element={<SignUp elem="login" />} />
        <Route path="/:userId" element={user.length ? <MainPage /> : <Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

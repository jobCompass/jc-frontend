
import Logo from "../Utilities/Logo";
import { searchJobs } from "../store/features/jobSlice";
import { logout } from "../helpers/auth";
import { useAppDispatch } from "../store/hooks";
import { deleteId } from '../store/features/userSlice';
export default function NavBar () {
  const dispatch = useAppDispatch();
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchJobs(value))
  }
  const handleLogOut = () => {
    logout()
      .then(() => {
        dispatch(deleteId())
      })
      .catch(error => console.error(error))
  }
  return (
    <div className="flex justify-left items-center text-left md:ml-5 mt-5 h-4">
      <Logo size="30" align="left"/>
      <input
       onChange={handleSearch}
       type="text"
       className="ml-2 h-6 text-sm border p-1 border-dashed"
       placeholder="Filter"
      />
      <button
       onClick={handleLogOut}
       className="text-xs mx-2 pt-1 pb-1 border-gray-500 hover:bg-gray-100 "
      >
        Log Out
      </button>
    </div>
  )
}
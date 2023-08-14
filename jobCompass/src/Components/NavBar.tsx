
import Button from "../Utilities/Button";
import { searchJobs } from "../features/jobs/jobSlice";
import { useAppDispatch } from "../store/hooks";
export default function NavBar () {
  const dispatch = useAppDispatch()
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchJobs(value))
  }
  return (
    <div className="text-left ml-5 mt-4 h-4">
      <input
       onChange={handleSearch}
       type="text"
       className="h-6 text-sm border p-1 border-dashed"
       placeholder="Filter"
      />
      <Button text="Log Out" class="text-sm m-1 py-0.5 border-gray-500 hover:bg-gray-100 "/>
    </div>
  )
}
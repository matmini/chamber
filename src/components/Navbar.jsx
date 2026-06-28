import { Link } from 'react-router-dom';
export default function Navbar() {
  return(
    <div id="navbar" 
        className="px-20 w-full h-16 flex items-center justify-end border-b border-gray-200">
      <Link to={`/listings/create`} className="">Add a listing</Link>
    </div>
  )
}
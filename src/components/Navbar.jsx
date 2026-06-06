import '../css/navbar.css' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
export default function Navbar() {
  return(
    <div className="navbar">
      <div className="navbar-left">
        <p>chamber</p>
        <FontAwesomeIcon icon={faPlus} style={{color: "rgb(0, 0, 0)",}} />

      </div>
      <div className="navbar-right">
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#111' }} />      
      </div>
    </div>
  )
}
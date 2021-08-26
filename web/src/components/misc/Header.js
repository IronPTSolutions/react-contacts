import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/contacts-service"

function Header() {
  const history = useHistory()
  const auth = useContext(AuthContext)

  function handleLogout() {
    service.logout()
      .then(() => {
        auth.logout()
        history.push("/login")
      })
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Contacts</a>

        <div>
          <span className="me-3">{auth.user?.name}</span>
          {auth.user && (
            <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header

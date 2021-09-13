import { useContext } from "react"
import { Link, NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/contacts-service"

function Header() {
  const history = useHistory()
  const { user, logout } = useContext(AuthContext)

  const handleLogout = () =>{
    service.logout()
      .then(() => {
        logout();
        history.push("/login")
      })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Contacts</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-nav">
          {user && (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
              </ul>
            
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className="nav-link" href="#" id="profile-dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img alt={user.name} src={user.avatar} className="avatar avatar-sm" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
                    <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user" /> {user.email}</Link></li>
                    <li><button className="dropdown-item" role="link" onClick={handleLogout}><i className="fa fa-sign-out" /> Logout</button></li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header

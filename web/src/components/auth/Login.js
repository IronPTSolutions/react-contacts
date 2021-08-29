import { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/contacts-service"


function Login() {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState()

  function handleChange(ev) {
    setData({
      ...data,
      [ev.target.name]: ev.target.value
    })
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    service.login(data.email, data.password)
      .then((user) => {
        auth.login(user)
        history.push("/")
      })
      .catch(() => {
        setError("login incorrecto")
      })
  }

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          Email
          <input
            name="email"
            type="text"
            onChange={handleChange}
            value={data.email}
          />
        </div>

        <div>
          Password
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={data.password}
          />
        </div>

        <button type="submit">Login</button>

        <div>
        <a href="http://localhost:3001/api/authenticate/google">Google login</a>
        </div>
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  )
}

export default Login

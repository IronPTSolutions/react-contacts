import { useState } from "react"
import { useHistory } from "react-router-dom"
import service from "../../services/contacts-service"

function SignUp() {
  const history = useHistory()
  const [error, setError] = useState()

  /*

  Vemos una alternativa simplificada de hacer formularios y gestión de errores.
  No tenemos value ni handleChange.

  Al hacer submit del formulario recogemos todos sus campos en ese momento (ev.target...)
  y en el catch de la petición al API recogemos los errores que nos devuelva esta.

  Al devolver el API los errores con un formato concreto, sabremos qué campo tiene el error
  para renderizarlo.

  */

  function handleSubmit(ev) {
    ev.preventDefault()

    service.createUser({
      name: ev.target.name.value,
      email: ev.target.email.value,
      password: ev.target.password.value,
      avatar: ev.target.avatar.files[0]
    })
      .then(() => {
        history.push("/login")        
      })
      .catch(err => {
        setError(err.response.data.errors)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Email
          <input type="email" name="email"></input>
          <small style={{color: 'red'}}>
            {error?.email}
          </small>
        </div>

        <div>
          Name
          <input type="text" name="name"></input>
          <small style={{color: 'red'}}>
            {error?.name}
          </small>
        </div>

        <div>
          Password
          <input type="password" name="password"></input>
          <small style={{color: 'red'}}>
            {error?.password}
          </small>
        </div>

        <div>
          Avatar
          <input type="file" name="avatar"></input>
          <small style={{color: 'red'}}>
            {error?.avatar}
          </small>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default SignUp

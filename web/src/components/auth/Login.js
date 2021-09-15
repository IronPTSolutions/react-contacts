import { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/contacts-service"
import { useForm } from "react-hook-form";


function Login() {

  const history = useHistory()
  const auth = useContext(AuthContext)

  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'all' });
  const onLoginFormSubmit = data => {
    service.login(data.email, data.password)
      .then(user => {
        auth.login(user)
        history.push('/')
      })
      .catch(error => {
        const { message, errors } = error.response?.data || error;
        if (errors) {
          Object.keys(errors).forEach(input => {
            setError(input, { type: 'manual', message: errors[input] });
          })
        } else {
          setError('email', { type: 'manual', message: message });
        }
      })
  };

  return (
    <div className="row row-cols-3">
      <div className="col mx-auto">
        <form className="mt-3 mb-3" onSubmit={handleSubmit(onLoginFormSubmit)}>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-envelope fa-fw"></i></span>
            <input type="email" {...register("email", { required: 'Email is required' })}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="user@example.org" />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
            <input type="password" {...register("password", { required: 'Password is required' })}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit" disabled={Object.keys(errors).length !== 0}>Login</button>
            <hr />
            <a href={`${process.env.REACT_APP_API_BASE_URL}/authenticate/google`} className="btn btn-danger" role="button"><i className="fa fa-google" /> Login with Google</a>
            <Link to="/signup" className="btn btn-secondary" role="button">Sign Up</Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login

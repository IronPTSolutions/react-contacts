import http from './base-api-service';

const logout = () => http.post('/logout')

const login = (email, password) => http.post('/login', { email, password })

const list = () => http.get('/contacts');

const details = (id) => http.get(`/contacts/${id}`);

const remove = (id) => http.delete(`/contacts/${id}`);

const create = (contact) => http.post('/contacts', contact)

const getUser = (id) => http.get(`/users/${id}`)

const createUser = (user) => {
  const data = new FormData()

  data.append('name', user.name)
  data.append('email', user.email)
  data.append('password', user.password)
  data.append('avatar', user.avatar)

  return http.post('/users', data)
}

const service = {
  list,
  remove,
  create,
  details,
  login,
  logout,
  getUser,
  createUser
};
export default service;

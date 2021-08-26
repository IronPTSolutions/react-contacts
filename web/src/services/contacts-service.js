import http from './base-api-service';

const logout = () => http.post('/logout')

const login = (email, password) => http.post('/login', { email, password })

const list = () => http.get('/contacts');

const details = (id) => http.get(`/contacts/${id}`);

const remove = (id) => http.delete(`/contacts/${id}`);

const create = (contact) => http.post('/contacts', contact)

const getUser = (id) => http.get(`/users/${id}`)

const createUser = (user) => http.post(`/users`, user)

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

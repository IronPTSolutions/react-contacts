import React, { useEffect, useState } from 'react'
import service from '../services/contacts-service'

export const AuthContext = React.createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    service.getUser('me')
      .then((user) => {
        setUser(user)
      })
  }, [])

  function login(user) {
    setUser(user)
  }

  function logout() {
    setUser(null)
  }

  const value = {
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
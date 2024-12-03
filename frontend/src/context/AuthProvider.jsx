import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext()

// to completed
const AuthProvider = ({children}) => {
    const [token, setToken] = useState()

    const getTokenFromLs = localStorage.getIteam("token")
      if(token){
        setToken(getTokenFromLs)
      }

  return (
    <AuthContext.Provider value = {[token, setToken]}>
        {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, AuthContext}

import { createContext, useContext, useState, useEffect } from "react"

const AuthContent = createContext()

export function useAuth() {
	return useContext(AuthProvider)
}

const AuthProvider = ({ children }) => {
	// useEffect(() => {
	  
	
	//   return () => {
	// 	second
	//   }
	// }, [third])
	
    return(
	<AuthContent.Provider value={{  
            
        }}>
		{children}
	</AuthContent.Provider>
    )
}

export default AuthProvider
import { createContext, useContext, useState, useEffect } from "react"
import { useCookies  } from 'react-cookie';

import axios from "axios"
const AuthContent = createContext()

export function useAuth() {
	return useContext(AuthContent)
}

const AuthProvider = ({ children }) => {
	const authApi = axios.create({
		baseURL: "http://localhost:9000/",
		withCredentials: true,
	})
	const [user, setUser] = useState(null)
	const [cart, setCart] = useState([])
	const [cookies, setCookie, removeCookie] = useCookies(['cart']);

	const getUser = async () => {
		try {
			// authApi
			// 	.post("/api/getOrderHistory")
			// 	.then((response) => {
			// 	})
			authApi
				.get("/auth/login/success")
				.then((response) => {
					setUser(response.data.user._json)
				})
				.catch((e) => {
					setUser()
				})
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<AuthContent.Provider value={{ user, setUser, cart, setCart, cookies, setCookie, removeCookie, authApi }}>
			{children}
		</AuthContent.Provider>
	)
}

export default AuthProvider

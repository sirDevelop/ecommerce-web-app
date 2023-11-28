import { createContext, useContext, useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useCookies  } from 'react-cookie';

import axios from "axios"
const ParentContent = createContext()

export function useGlobal() {
	return useContext(ParentContent)
}

const ParentComponent = ({ children }) => {
	const pathName = useLocation().pathname
	const navigate = useNavigate()
	const authApi = axios.create({
		baseURL: "http://localhost:9000/",
		withCredentials: true,
	})
	const [user, setUser] = useState(null)
	const [cart, setCart] = useState([])
	const [cookies, setCookie, removeCookie] = useCookies(['cart']);

	const getUser = () => {
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
					if(pathName.indexOf("orders") !== -1) navigate("/")
					setUser()
				})
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if (cookies && cookies.cart) {
			setCart(cookies.cart);
		}
		getUser()
	}, [])
	useEffect(() => {
		setCookie("cart", cart, { path: "/" })
	}, [cart])

	return (
		<ParentContent.Provider value={{ user, setUser, cart, setCart, cookies, setCookie, removeCookie, authApi }}>
			{children}
		</ParentContent.Provider>
	)
}

export default ParentComponent

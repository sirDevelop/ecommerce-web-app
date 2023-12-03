import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { useMain } from "./MainAdminComponent"

const AuthContent = React.createContext()

export function useAuth() {
	return useContext(AuthContent)
}

const AuthProvider = ({ children }) => {
	const errorHandler = (message) => {
		switch (message) {
			case "invalid":
				Toast.fire({
					icon: "error",
					title: "User data is invalid!",
				})
				break
			case "duplicate":
				Toast.fire({
					icon: "error",
					title: "User with duplicate email already exists!",
				})
				break

			default:
				Toast.fire({
					icon: "error",
					title: "Something went wrong!",
				})
		}
	}
	const cookies = new Cookies()
	const navigate = useNavigate()
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer)
			toast.addEventListener("mouseleave", Swal.resumeTimer)
		},
	})
	const [user, setUser] = useState({})
	const { loadingLogin, setLoadingLogin } = useMain()
	const [loggedIn, setLoggedIn] = useState(true)
	const authApi = axios.create({
		baseURL: "http://localhost:9000/",
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${cookies.get("cs")}`,
		},
	})
	useEffect(() => {
		if (loggedIn === undefined && !loadingLogin) {
			authApi
				.get(`/api/users/get/`)
				.then((data) => {
					setUser(data.data)
					setLoggedIn(true)
				})
				.catch((Error) => {
					if (
						Error &&
						Error.response &&
						Error.response.data &&
						Error.response.data.message
					)
						errorHandler(Error.response.data.message)
					navigate("/admin/login")
					setLoggedIn(false)
				})
				.finally(() => setLoadingLogin(false))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authApi, loadingLogin, loggedIn, user])
	const login = (user, pass) => {
		if (user.length && pass.length) {
			if (!loadingLogin) {
				setLoadingLogin(true)
				authApi
					.post(`/api/users/login/`, { email: user, password: pass })
					.then((data) => {
						setUser(data.data)
						cookies.set("cs", data.data.csrf, {
							path: "/admin",
							sameSite: "Strict",
							secure: true,
						})
						setLoggedIn(true)
						navigate("/admin/dashboard")
					})
					.catch((Error) => {
						if (
							Error &&
							Error.response &&
							Error.response.data &&
							Error.response.data.message
						)
							errorHandler(Error.response.data.message)
						else
							Toast.fire({
								icon: "error",
								title: "Something went wrong!",
							})
					})
					.finally(() => {
						setLoadingLogin(false)
					})
			}
		}
	}
	const register = (email, password, token, chatId) => {
		if (email.length && password.length) {
			if (!loadingLogin) {
				setLoadingLogin(true)
				authApi
					.post(`/api/users/register/`, {
						email,
						password,
						tlgToken: token,
						chatId,
					})
					.then((data) => {
						setUser(data.data)
						cookies.set("cs", data.data.csrf, {
							path: "/admin",
							sameSite: "Strict",
							secure: true,
						})
						setLoggedIn(true)
						navigate("/admin/dashboard")
					})
					.catch((Error) => {
						if (
							Error &&
							Error.response &&
							Error.response.data &&
							Error.response.data.message
						)
							errorHandler(Error.response.data.message)
						else
							Toast.fire({
								icon: "error",
								title: "Something went wrong!",
							})
					})
					.finally(() => {
						setLoadingLogin(false)
					})
			}
		}
	}
	const logout = () => {
		if (!loadingLogin) {
			authApi
				.get(`/api/users/logout/`)
				.then(() => {
					setUser({})
					setLoggedIn(false)
					cookies.remove("cs")
					navigate("/admin/login")
				})
				.catch(() => {
					Toast.fire({
						icon: "error",
						title: "Something went wrong!.",
					})
				})
		}
	}
	return (
		<AuthContent.Provider
			value={{
				authApi,
				login,
				register,
				logout,
				loggedIn,
				loadingLogin,
				user,
				setUser,
			}}
		>
			{children}
		</AuthContent.Provider>
	)
}

export default AuthProvider

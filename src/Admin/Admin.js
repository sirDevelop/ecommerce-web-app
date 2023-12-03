import { Routes, Route, useLocation } from "react-router-dom"
import AuthProvider from "./Components/useAuth"
import Login from "./Pages/Login"
import Preloader from "./Components/Preloader"
import { useMain } from "./Components/MainAdminComponent"
import NavBar from "./Components/NavBar"
import Container from "react-bootstrap/esm/Container"
import { Fade } from "react-reveal"
import Dashboard from "./Pages/Dashboard"
import CatalogItems from "./Pages/CatalogItems"
import { useState, useEffect } from "react"
import "./index.css"
const Admin = () => {
	const { loadingLogin } = useMain()
	
	return (
		<AuthProvider>
			{loadingLogin === undefined ? (
				<Preloader />
			) : (
				// fade is an animation effect
				<Fade>
					<NavBar />
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/catalogItems" element={<CatalogItems />} />
					</Routes>
				</Fade>
			)}
		</AuthProvider>
	)
}

export default Admin

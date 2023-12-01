import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "./Components/useAuth"
import Login from "./Pages/Login"
import Preloader from "./Components/Preloader"
import { useMain } from "./Components/MainComponent"
import NavBar from "./Components/NavBar"
import Container from "react-bootstrap/esm/Container"
import { Fade } from "react-reveal"
import Dashboard from "./Pages/Dashboard"
import CatalogItems from "./Pages/CatalogItems"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./index.css"
const Admin = () => {
	const { loadingLogin } = useMain()
	const { pageName } = useParams()
	const [mainComponent, setMainComponent] = useState("")
	useEffect(() => {
		switch (pageName) {
			case "login":
				setMainComponent(<Login />)
				break;
			case "catalogItems":
				setMainComponent(<CatalogItems />)
				break;
			case "Dashboard":
				setMainComponent(<Dashboard />)
				break;
			default:
				setMainComponent(<Dashboard />)
		}
	}, [pageName])
	
	return (
		<AuthProvider>
			{loadingLogin === undefined ? (
				<Preloader />
			) : (
				// fade is an animation effect
				<Fade>
					<NavBar />
					{mainComponent}
				</Fade>
			)}
		</AuthProvider>
	)
}

export default Admin

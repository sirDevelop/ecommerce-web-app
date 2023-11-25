import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCartArrowDown,
	faSignInAlt,
	faSpinner,
	faUserAlt,
	faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation } from "react-router-dom"
// import { useGlobals } from "./useGlobals"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import { Badge } from "react-bootstrap"

const Navigation = () => {
	// const pathName = useLocation().pathname
	// const { cart, setCartOpen, loggedIn, openLogin, loadingLogin, logout } =
	// 	useGlobals()

	return (
		<>
		{/* <Navbar
			className="bg-body-tertiary mb-3 rounded-bottom-5"
			bg="dark"
			data-bs-theme="dark"
			expand={"md"}
		>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>About</li>
                <li>Login With Google</li>
            </ul>
			
		</Navbar> */}
		<Navbar className="bg-body-tertiary rounded-top rounded-pill" data-bs-theme="dark">
		<Container>
			<Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
			<Navbar.Toggle />
            <Navbar.Brand as={Link} to="/about">About</Navbar.Brand>
            <Navbar.Brand as={Link} to="/catalog">Catalog</Navbar.Brand>
			<Navbar.Collapse className="justify-content-end">
			<Navbar.Text>
				<Button variant="outline-info" onClick={() => {
					window.location = "http://localhost:9000/auth/google"}
					}>
					Sign In
				</Button>
			</Navbar.Text>
			</Navbar.Collapse>
		</Container>
		</Navbar>
		</>
	)
}

export default Navigation
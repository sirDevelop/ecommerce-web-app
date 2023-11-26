import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCartArrowDown,
	faSignInAlt,
	faSpinner,
	faUserAlt,
	faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { Link, Navigate, useLocation } from "react-router-dom"
// import { useGlobals } from "./useGlobals"
import { MdOutlineAccountCircle } from "react-icons/md";

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Dropdown from "react-bootstrap/Dropdown"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Offcanvas from "react-bootstrap/Offcanvas"
import { Badge } from "react-bootstrap"
import { useAuth } from "./AuthProvider"

const Navigation = () => {
	const { user, setUser, authApi } = useAuth()
	let cartQuantity = 0
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
			<Navbar
				className="bg-body-tertiary rounded-top rounded-pill"
				data-bs-theme="dark"
			>
				<Container>
					<Navbar.Brand as={Link} to="/">
						Home
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Brand as={Link} to="/about">
						About
					</Navbar.Brand>
					<Navbar.Brand as={Link} to="/catalog">
						Catalog
					</Navbar.Brand>
					<Navbar.Collapse className="justify-content-end">
						{user ? (
							<>
								<Nav>
									<NavDropdown
										data-toggle="dropdown"
										id="nav-dropdown-dark-example"
										title={<>{user.name}<MdOutlineAccountCircle className="text-white mx-2" size={42} /></>}
										menuVariant="dark"
									>
									<NavDropdown.Item as={Link}
									to="/orders"
									> Cart <FontAwesomeIcon icon={faCartArrowDown} /><Badge bg="secondary">{cartQuantity}</Badge></NavDropdown.Item>
									<NavDropdown.Item as={Link}
									to="/orders">
										Order History
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={() => {
										authApi
											.get("logout")
											.then((response) => {
												setUser()
											})
									}}>
										Sign out
									</NavDropdown.Item>
									</NavDropdown>
								</Nav>
							</>
						) : (
							<Button
								as={Link}
								to="http://localhost:9000/auth/google/callback"
								variant="outline-info"
								// onClick={() => {
								// 	window.open(
								// 		`http://localhost:9000/auth/google/callback`,
								// 		"_self"
								// 	)
								// }}
							>
								Sign In With Google
							</Button>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Navigation

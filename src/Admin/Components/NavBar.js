import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import { useAuth } from "./useAuth"
import { Link, useLocation } from "react-router-dom"

const NavBar = () => {
	const { loggedIn, logout } = useAuth()
	const pathName = useLocation().pathname
	return loggedIn ? (
		<Navbar
			expand="lg"
			className="admin navbar rounded-pill shadow border px-5 mt-4"
			data-bs-theme="dark"
		>
			<Container>
				<Navbar.Brand as={Link} to="/admin/dashboard">
					Ecommerce Dashboard
				</Navbar.Brand>
				<Navbar.Toggle/>
				<Navbar.Collapse>
					<Nav>
						<Nav.Link as={Link} to="/admin/dashboard" className={`${pathName.indexOf("dashboard") !== -1 ? "active":""}`}>
							Dashboard
						</Nav.Link>
					</Nav>
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/admin/catalogItems" className={`${pathName.indexOf("catalogItems") !== -1 ? "active" : ""}`}>
							Catalog Items
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<Button
						variant="outline-secondary"
						className="gray-border-gradient"
						onClick={logout}
					>
						Sign out
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	) : (
		<></>
	)
}

export default NavBar

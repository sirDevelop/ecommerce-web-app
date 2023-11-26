import Navigation from "./Components/Navigation"
import About from "./Pages/About"
import Home from "./Pages/Home"
import Catalog from "./Pages/Catalog"
import Orders from "./Pages/Orders"
import Footer from "./Components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import AuthProvider from "./Components/AuthProvider"

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="d-flex flex-column min-vh-100">
					<Navigation />
					<Container className="my-5">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/catalog" element={<Catalog />} />
							<Route path="/orders" element={<Orders />} />
						</Routes>
					</Container>
					<Footer />
				</div>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App

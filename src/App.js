import Navigation from "./Components/Navigation"
import About from "./Pages/About"
import Home from "./Pages/Home"
import Catalog from "./Pages/Catalog"
import Orders from "./Pages/Orders"
import Payment from "./Pages/Payment"
import Footer from "./Components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import ParentComponent from "./Components/ParentComponent"

function App() {
	return (
		<BrowserRouter>
			<ParentComponent>
				<div className="d-flex flex-column min-vh-100">
					<Navigation />
					<Container className="my-5">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/catalog" element={<Catalog />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/orders/:tag" element={<Orders />} />
							{/* {["/payment/*", "/payment/:status/:code/:session"].map((path) => {
								return <Route path={path} element={<Payment />} />
							})} */}
							<Route path="/payment/:status/:code/:session" element={<Payment />} />
						</Routes>
					</Container>
					<Footer />
				</div>
			</ParentComponent>
		</BrowserRouter>
	)
}

export default App

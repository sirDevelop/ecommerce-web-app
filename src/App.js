import Navigation from "./Components/Navigation"
import About from "./Pages/About"
import Home from "./Pages/Home"
import Admin from "./Admin/Admin"
import MainComponent from "./Admin/Components/MainComponent"
import Catalog from "./Pages/Catalog"
import Orders from "./Pages/Orders"
import Payment from "./Pages/Payment"
import Footer from "./Components/Footer"
import { Routes, Route, useLocation } from "react-router-dom"
import { Container } from "react-bootstrap"
import ParentComponent from "./Components/ParentComponent"

function App() {
	const pathname = useLocation().pathname
	return (
		<ParentComponent>
			<div className={`${pathname.indexOf("admin") === -1 ? "d-flex flex-column min-vh-100":""}`}>
				{pathname.indexOf("admin") === -1 ? <Navigation />:<></>}
				<Container className={`${pathname.indexOf("admin") === -1 ? "my-5" : ""}`}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/admin/*" element={<MainComponent><Admin /></MainComponent>} />
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
				{pathname.indexOf("admin") === -1 ? <Footer /> : <></>}
			</div>
		</ParentComponent>
	)
}

export default App

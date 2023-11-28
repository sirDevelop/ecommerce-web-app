import React, { useEffect, useState } from "react"
import { useGlobal } from "../Components/ParentComponent"
import { Col, Container, Row, Tabs, Tab, Card } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

const Orders = () => {
	const { tag } = useParams()
	const navigate = useNavigate()
	const { cart, setCart, cookies, authApi, user } = useGlobal()
	const [orderHistory, setOrderHistory] = useState([])

	useEffect(() => {
		getOrderHistory()
	}, [])

	const getOrderHistory = () => {
		try {
			authApi.post("/api/orders/getOrderHistory").then((response) => {
				setOrderHistory(response.data.orderHistory)
			})
		} catch (err) {
			console.log(err)
		}
	}
	const checkoutOrder = () => {
		authApi
			.post("/api/orders/checkoutOrder", { cart: JSON.stringify(cart) })
			.then((response) => {
				if (response.status === 200) {
					setCart([])
					if (response.data.url)
						window.open(response.data.url, "_self")
				}
			})
			.catch((err) => {
				console.error("Something went wrong with cart checkout " + err)
			})
	}

	return (
		<>
			<Container>
				<Row>
					<Col lg={12}>
						<Tabs
							defaultActiveKey="cart"
							activeKey={tag ? tag : "cart"}
							onSelect={(e) => navigate("/orders/" + e)}
							className="mb-3"
						>
							<Tab eventKey="cart" title="Cart">
								<Container className="border border-white mb-2">
									{cart && cart.length ? (
										cart.map((item, i) => {
											return (
												<Row className="m-2">
													<Col className="fw-bold">{item.title}</Col>
													<Col>
														{item.quantity}{" "}
													</Col>
													<Col>${item.price} </Col>
												</Row>
											)
										})
									) : (
										<Container>
											<p>
												Wow, such empty. Please visit the
												Catalog tab to add something.
											</p>
											<Row
												key={1}
												sm={12}
												className="text-center"
											>
												<Card.Img
													variant="top"
													src="./images/doge.png"
													className="w-25"
												/>
											</Row>
										</Container>

									)}
									{cart && cart.length ? (
										<>
											<Row className="m-2">
												<Col className="fw-bold">Total</Col>
												<Col>
													{cart.reduce((prevQuantity, object) => { return prevQuantity + object.quantity }, 0)}
												</Col>
												<Col>${cart.reduce((prevPrice, object) => { return prevPrice + object.quantity * object.price }, 0).toFixed(2)} </Col>
											</Row>
											<Row className="m-2 my-3">
											<Col>
													<button className="btn btn-secondary mr-2" onClick={() => {
														setCart([])
													}}>
														Clear Cart
													</button>
												
													<button className="btn btn-success mx-2" onClick={checkoutOrder}>
														Checkout Order
													</button>
												</Col>
											</Row>
										</>
									) : (
										<></>
									)}
								</Container>

							</Tab>
							<Tab eventKey="history" title="Order History">
								<Container className="mb-3">
									<Row>
										<Col className="fw-bold">Order Date</Col>
										<Col className="fw-bold">Quantity </Col>
										<Col className="fw-bold">Price </Col>
									</Row>
								</Container>

								{orderHistory && orderHistory.length ? (
									orderHistory.map((order, i) => {
										return (
											<>
												<Container key={i} className="border border-secondary mb-2 rounded shadow">
													<Row>
														<Col className="fw-bold">
															{new Date(
																order.createdAt
															).toLocaleDateString(
																"en-us",
																{
																	weekday: "long",
																	month: "short",
																	day: "numeric",
																	hour: "numeric",
																	minute: "numeric",
																	hour12: true,
																}
															)}
														</Col>
													</Row>
													{
														JSON.parse(order.cart).map(
															(cartValue, i) => {
																return (
																	<Row key={i}>
																		<Col>
																			{
																				cartValue.title
																			}{" "}
																		</Col>
																		<Col>
																			{
																				cartValue.quantity
																			}{" "}
																		</Col>
																		<Col>
																			${
																				cartValue.price
																			}{" "}
																		</Col>
																	</Row>
																)
															}
														)
													}

													<Row>
														<Col>
															Total
														</Col>
														<Col>
															{JSON.parse(order.cart).reduce((prevQuantity, object) => { return prevQuantity + object.quantity }, 0)}
														</Col>
														<Col>
															${JSON.parse(order.cart).reduce((prevPrice, object) => { return prevPrice + object.quantity * object.price }, 0.0).toFixed(2)}
														</Col>
													</Row>
												</Container>
											</>
										)
									})
								) : (
									<></>
								)}
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container >
		</>
	)
}

export default Orders

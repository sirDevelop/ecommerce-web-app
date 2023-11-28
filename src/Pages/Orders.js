import React, { useEffect, useState } from "react"
import { useAuth } from "../Components/AuthProvider"
import { Col, Container, Row, Tabs, Tab, Card } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

const Orders = () => {
	const { tag } = useParams()
	const navigate = useNavigate()
	const { cart, setCart, cookies, setCookie, authApi } = useAuth()
	const [orderHistory, setOrderHistory] = useState([])

	useEffect(() => {
		if (cookies && cookies.cart) {
			setCart(cookies.cart);
		}
		getOrderHistory()
	}, [])

	const getOrderHistory = async () => {
		try {
			authApi.post("/api/orders/getOrderHistory").then((response) => {
				setOrderHistory(response.data.orderHistory)
			})
		} catch (err) {
			console.log(err)
		}
	}
	const checkoutOrder = () => {
		// cart.map((item) => {

		// })

		// authApi
		//     .post("/api/create-checkout-session", async (req, res) => {
		//         const { product } = req.body;
		//         const session = await stripe.checkout.sessions.create({
		//             payment_method_types: ["card"],
		//             line_items: [
		//                 {
		//                     price_data: {
		//                         currency: "usd",
		//                         product_data: {
		//                             name: product.name,
		//                         },
		//                         unit_amount: product.price * 100,
		//                     },
		//                     quantity: product.quantity,
		//                 },
		//             ],
		//             mode: "payment",
		//             success_url: "http://localhost:3000/success",
		//             cancel_url: "http://localhost:3000/cancel",
		//         });
		//         res.json({ id: session.id });
		//     });

		authApi
			.post("/api/orders/checkoutOrder", { cart: JSON.stringify(cart) })
			.then((response) => {
				if (response.status === 200) {
					// uncomment once checkout order is working and we can redirect to stripe screen
					// setCart([])
					// setCookie('cart', [], { path: '/' });
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
								<>
									{cart && cart.length ? (
										cart.map((item, i) => {
											return (
												<>
													<Container>
														<Row className="m-2">
															<Col className="fw-bold">{item.title}</Col>
															<Col>
																{item.quantity}{" "}
															</Col>
															<Col>${item.price} </Col>
														</Row>
													</Container>
												</>
											)
										})

									) : (
										<>
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
										</>
									)}
								</>
								{cart && cart.length ? (
									<>
										<Container>
											<Row className="m-2">
												<Col className="fw-bold">Total</Col>
												<Col>
													{cart.reduce((prevQuantity, object) => { return prevQuantity + object.quantity }, 0)}
												</Col>
												<Col>${cart.reduce((prevPrice, object) => { return prevPrice + object.quantity* object.price }, 0)} </Col>
											</Row>
										</Container>
										<Row className="m-4">
											<Col>
												<button className="btn btn-success" onClick={checkoutOrder}>
													Checkout Order
												</button>
											</Col>
										</Row>
									</>
								) : (
									<></>
								)}
							</Tab>
							<Tab eventKey="history" title="Order History">
								<Row>
									<Col className="fw-bold">Order Date</Col>
									<Col className="fw-bold">Quantity </Col>
									<Col className="fw-bold">Price </Col>
								</Row>
								{orderHistory && orderHistory.length ? (
									orderHistory.map((order, i) => {
										return (
											<>
												<Row>
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
												</Row>
												{
												JSON.parse(order.cart).map(
													(cartValue, cartIndex) => {
														return (
															<Row>
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
													<Col className="fw-bold">
														Total
													</Col>
													<Col>
													{JSON.parse(order.cart).reduce((prevQuantity, object) => { return prevQuantity + object.quantity }, 0)}
													</Col>
													<Col>
                                                    ${JSON.parse(order.cart).reduce((prevPrice, object) => { return prevPrice + object.quantity* object.price }, 0.0)}
													</Col>
												</Row>
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

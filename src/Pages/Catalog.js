import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { BarLoader, BounceLoader } from "react-spinners"
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import Fade from "react-reveal"
import { useAuth } from "../Components/AuthProvider";
const Catalog = () => {
	const { cart, setCart, setCookie, authApi } = useAuth();
	const [page, setPage] = useState(0)

	const itemHandler = (data) => {
		setTimeout(() => {
			setCatalogItems([...catalogItems, ...data.getCatalogItems])
			setPage(data.page)
		}, 500);
	}
	const apiInstance = axios.create({ baseURL: "http://localhost:9000/api/" })
	const [appIsLoaded, setAppIsLoaded] = useState(false)
	useEffect(() => {
		if (!appIsLoaded) {
			apiInstance.post("catalog/getAllItems", {}).then((response) => {
				itemHandler(response.data)
			}).finally(() => {
				setAppIsLoaded(true)
			})

			// apiInstance.post("catalog/createCatalogItems", {}).then((response) =>{
			// 	console.log(response.data);
			// })
		}

	}, []);

	const [catalogItems, setCatalogItems] = useState([])
	const loadMoreItems = () => {
		apiInstance.post("catalog/getAllItems", { loadMore: true, page }).then((response) => {
			itemHandler(response.data)
		})
	}
	// buy now
	// add to cart

	return (
		<div className="text-center">
			<Container>
				<Row className="">
					{catalogItems.length ?
						<Fade>
							<Row className="">
								{catalogItems.map((val, i) => {
									return (
										<Col
											key={i}
											lg={4}
											md={6}
											sm={12}
											className="p-2 d-flex flex-wrap"
										>
											<Card className="border-1 shadow d-flex flex-column p-2">
												<Card.Img
													variant="top"
													style={{ height: "200px", objectFit: "cover", objectPosition: "0 100%" }}
													src={val.imageURL}
													className=""
												/>
												<Card.Body>
													<Card.Title className="fw-bold">{val.itemName}</Card.Title>
													<Card.Text>
														{
															val.description && val.description.length > 300 ?
																val.description.substring(0, 300) + "..." : val.description
														}
													</Card.Text>
													<Card.Text>
														{val.quantity ? <p className="text-success fst-italic">In Stock</p> : <p className="text-danger fst-italic">Out of Stock</p>}
													</Card.Text>
													<Card.Text className="fw-bold">
														${val.price}
													</Card.Text>
												</Card.Body>
												<Card.Footer>
													{val.quantity ?
														<>
															<Button disabled={val.disabled} onClick={() => {
																	setCatalogItems(
																		[
																			...catalogItems.map((catalogItem, catalogItemIndex) => {
																				return catalogItemIndex === i ? {...catalogItem, disabled: true} : catalogItem
																			})
																		]
																	)
																	authApi.post('/api/orders/oneClickBuy', {catalogId : val._id}).then((response) => {
																		if (response.data.url) window.open(response.data.url, "_self")
																	})
																}
															} className="mx-2 mt-2">1-Click Buy</Button>
													<Button className="mx-2 mt-2"
														onClick={() => {
															let currentOption =
																cart.filter(
																	(cart) =>
																		cart.id ===
																		val._id
																)
															let quantity =
																currentOption.length
																	? currentOption[0]
																		.quantity +
																	1
																	: 1
															if (quantity === 1) {
																setCart([
																	// ...cart chooses every cart item except the current id
																	...cart,
																	{
																		id: val._id,
																		quantity,
																		title: val.itemName,
																		price: val.price,
																		category: val.category,
																	},
																])
																setCookie('cart', cart, { path: '/' });
															} else {
																setCart([
																	// chooses every cart item except the current id
																	...cart.map(
																		(cartVal) => {
																			if (
																				cartVal.id ===
																				val._id
																			)
																				return {
																					id: val._id,
																					quantity,
																					title: val.itemName,
																					price: val.price,
																					category: val.category,
																				}
																			else
																				return cartVal
																		}
																	),
																])
																setCookie('cart', cart, { path: '/' });
															}
														}}
														variant="primary"
													>Add to Cart</Button></> :
												<></>
													}

											</Card.Footer>
										</Card>
										</Col>
							)
								})}
						</Row>
						</Fade>
				: (
				<>
					{[0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
						return (
							<Col
								key={i}
								lg={4}
								md={6}
								sm={12}
								className="p-2 d-flex flex-wrap"
							>
								<Fade when={!appIsLoaded}>
									<Card className="border-1 shadow d-flex flex-column p-2">
										<BounceLoader
											color="#cc0000"
											className="mx-auto"
										/>
										<Card.Body>
											<Card.Text>
												<BarLoader
													color="#cc0000"
													className="mx-auto"
												/>
											</Card.Text>
										</Card.Body>
									</Card>
								</Fade>
							</Col>
						)
					})}
				</>
						)}
			</Row>
		</Container>
		</div >
	)
}

export default Catalog

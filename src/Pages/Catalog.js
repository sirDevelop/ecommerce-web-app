import { Container, Row, Col, Card, Button, Form, ButtonGroup } from "react-bootstrap"
import { BarLoader, BounceLoader } from "react-spinners"
import classNames from "classnames";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useGlobal } from "../Components/ParentComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ReactSlider from 'react-slider'
import Swal from 'sweetalert2'
import MultiRangeSlider from "multi-range-slider-react";

const Catalog = () => {
	const { cart, setCart, authApi } = useGlobal();
	const [catalogItems, setCatalogItems] = useState([])
	const [page, setPage] = useState(1)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [isMoreAvailable, setIsMoreAvailable] = useState(true)
	const [category, setCategory] = useState("All")
	const [descendingPrice, setDescendingPrice] = useState(false)
	const [maxPriceRange, setMaxPriceRange] = useState(0)
	const [priceRange, setPriceRange] = useState({min: 0, max: 0})
	const prevPriceRange = useRef(0)

	const itemHandler = (data) => {
		setIsMoreAvailable(data.moreItemsAvailable)
		setMaxPriceRange(data.maxPriceValue)
		setCatalogItems([...catalogItems, ...data.getCatalogItems])
		setPage(page + 1)
	}

	const apiInstance = axios.create({ baseURL: "http://localhost:9000/api/" })
	const [appIsLoaded, setAppIsLoaded] = useState(false)

	useEffect(() => {
		if (!appIsLoaded) {
			apiInstance.post("catalog/getItems", { category, page, descendingPrice, priceRange }).then((response) => {
				itemHandler(response.data)
			}).finally(() => {
				setAppIsLoaded(true)
			})
		}
	}, [appIsLoaded]);
	useEffect(() => {
		setPage(1)
		setCatalogItems([])
		setAppIsLoaded(false)
	}, [category, descendingPrice, priceRange])
	useEffect(() => {
		if (catalogItems.length && prevPriceRange.current === 0){
			prevPriceRange.current = maxPriceRange
			setPriceRange({ ...priceRange, max: maxPriceRange })
		}
	}, [maxPriceRange])
	



	const loadMoreItems = () => {
		if (!isLoadingMore) {
			setIsLoadingMore(true)
			apiInstance.post("catalog/getItems", { category, page, descendingPrice, priceRange }).then((response) => {
				itemHandler(response.data)
			}).finally(() => { setIsLoadingMore(false) })
		}
	}

	const addToCart = (val) =>{
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
			}
		
	}

	const removeFromCart = (val) => {
		let currentOption =
			cart.filter(
				(cart) =>
					cart.id ===
					val._id
			)
		let quantity =
			currentOption.length
				? currentOption[0]
					.quantity - 1
				: 1

		setCart([
			// chooses every cart item except the current id
			...cart.filter(cartVal => cartVal.id ===
				val._id && cartVal.quantity > 1 || cartVal.id !== val._id).map(
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

	}
	const changeCartItemQuantity = (val, newQuantity) => {
		if(newQuantity <=0) {
			// don't do anthing
			newQuantity = 0
			Swal.fire({
				title: "Error",
				text: "Please enter a valid quantity",
				icon: "error"
			  });
		}

		if(newQuantity > val.quantity) {
			// set newQuantity to max quantity
			newQuantity = val.quantity
			Swal.fire("Max units in stock is " + val.quantity);
		}

		let currentOption =
			cart.filter(
				(cart) =>
					cart.id ===
					val._id
			)
		let quantity =
			currentOption.length
				? parseInt(newQuantity)
				: 1

		setCart([
			// chooses every cart item except the current id
			...cart.filter(cartVal => cartVal.id ===
				val._id && newQuantity > 0 || cartVal.id !== val._id).map(
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

	}
	return (
		<div className="text-center">
			<Container>
				<Row>

					<Col sm={3} className="p-2">
						<Form.Label className="text-white">Category</Form.Label>
						<Form.Select size="lg" defaultValue={category} onChange={(e) => { setCategory(e.target[e.target.selectedIndex].text) }}>
							{['All', 'Decorative', 'Office', 'Ceramics', 'Travel', 'Artwork', 'Outdoors', 'Home Goods', 'Skincare', 'Metaphysical', 'Electronics'].map((item, i) => {
								return <option key={i} value={{ item }}>{item}</option>
							})}
						</Form.Select>
					</Col>
					<Col sm={3} className="p-2">
						<Form.Label className="text-white">Sort by Price</Form.Label>
						<Form.Select size="lg" defaultValue={descendingPrice} onChange={(e) => { setDescendingPrice(e.target[e.target.selectedIndex].value === "descending" ? true:false) }}>
							<option value="ascending">Ascending</option>
							<option value="descending">Descending</option>
						</Form.Select>
					</Col>
					<Col sm={3} className="p-2">
						<Form.Label className="text-white">Price Range</Form.Label>
						{catalogItems.length ? 
						<MultiRangeSlider
							//default value
							min={0}
							max={maxPriceRange}
							step={1}
							//modified by client value
							minValue={priceRange.min}
							maxValue={priceRange.max}
							className="bg-white"
							onChange={(e) => {
								setPriceRange({ ...priceRange, min: e.minValue, max: e.maxValue })
							}}
						/>:""}
						


					</Col>
					{catalogItems.length ?
						<Row className="">
							{catalogItems.map((val, i) => {
								// the item if its in the cart, then its a null
								let isInCart = cart.filter((item) => item.id === val._id)
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
													{val.quantity ? <span className="text-success fst-italic">In Stock</span> : <span className="text-danger fst-italic">Out of Stock</span>}
												</Card.Text>
												<Card.Text className="fw-bold">
													${val.price}
												</Card.Text>
											</Card.Body>
											<Card.Footer>
												<>
													<Button disabled={val.disabled || val.quantity <= 0} onClick={() => {
														setCatalogItems(
															[
																...catalogItems.map((catalogItem, catalogItemIndex) => {
																	return catalogItemIndex === i ? { ...catalogItem, disabled: true } : catalogItem
																})
															]
														)
														authApi.post('/api/orders/oneClickBuy', { catalogId: val._id }).then((response) => {
															if (response.data.url) window.open(response.data.url, "_self")
														})
													}
													} className="mx-2 mt-2 btn btn-warning  bg-gradient">1-Click Buy</Button>

													{
														isInCart.length ?
															<>
																<ButtonGroup className="mt-2" style={{ width: "40%" }}>
																	<Button className="bg-gradient" onClick={() => { removeFromCart(val) }} variant="primary">-</Button>
																	<Form.Control
																		type="text"
																		className="text-center"
																		value={isInCart[0].quantity}
																		onChange={(e) => {
																			changeCartItemQuantity(val, e.target.value)
																		}}

																	/>
																	<Button className="bg-gradient" onClick={() => { addToCart(val) }} variant="primary">+</Button>
																</ButtonGroup>
															</>
															:
															<Button disabled={val.quantity <= 0} className="mx-2 mt-2 btn btn-primary  bg-gradient"
																onClick={() => { addToCart(val) }}
															>Add to Cart</Button>
													}
												</>
											</Card.Footer>
										</Card>
									</Col>
								)
							})}
						</Row>
						: (
							<>
								{Array.from(Array(12), () => 0).map((_, i) => {
									return (
										<Col
											key={i}
											lg={4}
											md={6}
											sm={12}
											className="p-2 d-flex flex-wrap"
										>
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
										</Col>
									)
								})}
							</>
						)}
				</Row>
			</Container>
			{isMoreAvailable ?
				<Button
					className="btn btn-success mt-4 btn-lg bg-gradient"
					disabled={isLoadingMore}
					onClick={() => {
						loadMoreItems()
					}}
				>
					{!isLoadingMore ? "Load more" : <FontAwesomeIcon icon={faSpinner} spin />}
				</Button> : <></>}
		</div>
	)
}

export default Catalog

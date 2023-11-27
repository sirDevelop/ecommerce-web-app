import React, { useEffect, useState } from 'react'
import { useAuth } from '../Components/AuthProvider'
import { Col, Container, Row, Tabs, Tab, Card } from 'react-bootstrap'

const Orders = () => {
    const { cart, setCart, key, setKey, authApi } = useAuth()
    const [orderHistory, setOrderHistory] = useState([])


    const getOrderHistory = async () => {
        try {
            authApi
                .post("/api/orders/getOrderHistory")
                .then((response) => {
                    setOrderHistory(response.data.orderHistory)
                })
        } catch (err) {
            console.log(err)
        }
    }
    const checkoutOrder = () => {
        // let totalPrice = 0;
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
                    setCart([])
                }
            })
            .catch((err) => {
                console.error("Something went wrong with cart checkout " + err);
            })
    }
    useEffect(() => {
        getOrderHistory()
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col lg={12}>
                        <Tabs
                            defaultActiveKey="cart"
                            activeKey={key}
                            id="cart-order-history-tabs"
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="cart" title="Cart">
                                {cart && cart.length ?
                                    cart.map((item, i) => {
                                        return (
                                            <>
                                                <Container>
                                                    <Row>
                                                        <Col>{item.title}</Col>
                                                        <Col>{item.quantity} </Col>
                                                        <Col>{item.price} </Col>
                                                    </Row>
                                                </Container>
                                            </>
                                        )
                                    })
                                    :
                                    <>
                                        <p>Wow, such empty. Please visit the Catalog tab to add something.</p>
                                        <Row key={1} sm={12} className="text-center">
                                            <Card.Img
                                                variant="top"
                                                src="./images/doge.png"
                                                className="w-25"
                                            />
                                        </Row>
                                    </>
                                }
                                {cart && cart.length ?
                                    <button onClick={checkoutOrder}>Checkout Order</button> : <></>}
                            </Tab>
                            <Tab eventKey="orderHistory" title="Order History">
                                <Row>
                                    <Col className='fw-bold'>Order Date</Col>
                                    <Col className='fw-bold'>Quantity </Col>
                                    <Col className='fw-bold'>Price </Col>
                                </Row>
                                {orderHistory && orderHistory.length ? orderHistory.map((order, i) => {
                                    let totalPrice = 0
                                    return (
                                        <>
                                            <Row>
                                                {
                                                    new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString("en-us", {
                                                        weekday: "long",
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true,
                                                    })
                                                }
                                            </Row>

                                            {JSON.parse(order.cart).map((cartValue, cartIndex) => {
                                                totalPrice += cartValue.price * cartValue.quantity
                                                return (
                                                    <Row>
                                                        <Col>{cartValue.title} </Col>
                                                        <Col>{cartValue.quantity} </Col>
                                                        <Col>{cartValue.price} </Col>
                                                    </Row>
                                                )
                                            })}

                                            <Row>
                                                <Col className='fw-bold'>Total</Col>
                                                <Col></Col>
                                                <Col>{Math.round((totalPrice + Number.EPSILON) * 100) / 100}</Col>
                                            </Row>

                                        </>)
                                }) : <></>
                                }
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Orders
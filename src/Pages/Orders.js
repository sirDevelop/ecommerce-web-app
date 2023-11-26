import React, { useEffect, useState } from 'react'
import { useAuth } from '../Components/AuthProvider'
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap'

const Orders = () => {
    const { cart, setCart, authApi } = useAuth()
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

    useEffect(() => {
        getOrderHistory()
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div>Cart</div>
                        <button onClick={() => {
                            // console.log(cart);
                            
                            authApi
                                .post("/api/orders/checkoutOrder", {cart: JSON.stringify(cart)})
                                .then((response) => {
                                    // setCart([])
                                    console.log("rd", response);
                                    
                                })
                        }}>Checkout Order</button>

                        <div>Order History</div>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            >
                            <Tab eventKey="home" title="Home">
                                Tab content for Home
                            </Tab>
                            <Tab eventKey="profile" title="Profile">
                                Tab content for Profile
                            </Tab>
                            <Tab eventKey="contact" title="Contact" disabled>
                                Tab content for Contact
                            </Tab>
                            
                            {orderHistory && orderHistory.length? orderHistory.map((order) => {
                                <div>
                                    {JSON.parse(order.cart).map((cartValue, cartIndex) => {
                                        console.log(cartValue)
                                        return <>
                                            {cartValue.title}
                                        </>
                                    })}
                                    
                                </div>
                            }):<></>
                            }
                        </Tabs>
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default Orders
import { Container, Row, Col, Card } from "react-bootstrap"
import classNames from "classnames";

const Home = () => {
    const sectionInfo = [
        {
            heading: "Welcome to MouthWatering Deals – Unleash the Thrill of Unbeatable Savings!",
            description: `Discover a shopping experience like no other at MouthWatering Deals, 
            your ultimate destination for incredible discounts on a vast array of products. 
             From cutting-edge electronics to trendy fashion, home essentials, and beyond, 
             we bring you unbeatable prices that will leave you craving more. 
             Dive into the world of MouthWatering Deals and let the savings feast begin!`,
            imageURL: "./images/homepage/inventory1.jpg"
        },
        {
            heading: "Why Choose MouthWatering Deals?",
            description: `Heavily Discounted Rates: Brace yourself for savings that will make your jaw drop. At MouthWatering Deals, we believe in making every purchase a delightful experience, and that starts with prices that are hard to resist.`,
            imageURL: "./images/homepage/inventory2.jpg"
        }
        ,
        {
            heading: "Curated Selection: Our collection is a carefully curated assortment of must-haves. Whether you're upgrading your tech, refreshing your wardrobe, or enhancing your living space, we've got the perfect deal waiting for you.",
            description: `Daily Deals, Every Day:** Don't miss out on our daily specials! We consistently refresh our deals to keep the excitement alive. Check back often to snag the hottest products at prices that feel almost too good to be true.`,
            imageURL: "./images/homepage/inventory3.jpg"
        }
        ,
        {
            heading: "Explore Our Categories:",
            description: `Electronics: Stay ahead of the curve with our cutting-edge gadgets and tech essentials.
            - Fashion: Express your style without breaking the bank. Shop the latest trends at irresistible prices.
            - Home & Living: Transform your space with quality home essentials and decor that won't cost a fortune.
            - Beauty & Wellness: Treat yourself to self-care without compromising your budget. Discover wellness products at unbelievable prices.`,
            imageURL: "./images/homepage/store1.jpg"
        }
        ,
        {
            heading: "Join the Savings Revolution:",
            description: `MouthWatering Deals isn't just a shopping platform; it's a community of smart shoppers who know how to make the most of every penny. Join us in celebrating the joy of incredible deals and redefine the way you shop.`,
            imageURL: "./images/homepage/store2.jpg"
        },
        {
            heading: "Customer Happiness Guarantee:",
            description: `Your satisfaction is our priority. If you have any questions or need assistance, our dedicated customer support team is just a message away. We're here to ensure your MouthWatering Deals experience is seamless and enjoyable.`,
            imageURL: "./images/homepage/customer_satisfaction.jpg"
        }
        ,
        {
            heading: "Ready to Save Big? Dive In!",
            description: `Start exploring MouthWatering Deals now. Your next favorite product is just a click away. Get ready to indulge in a shopping spree where prices are low, and satisfaction is sky-high. Happy shopping!`,
            imageURL: "./images/homepage/store3.jpg"
        }
    ]

    return (
        <div>
            <div className="text-center">
                <Container>
                    {
                        sectionInfo.map((val, i) => {
                            return (
                                <Row className="" key={i}>
                                    <Col
                                        lg={12}
                                        className="m-3 p-2 d-flex flex-wrap"
                                    >
                                        <Card className={classNames("border-1", "shadow", "d-flex", "flex-column", "pb-3",{
                                            "bg-info": (i % 2 == 0),
                                            "bg-warning": (i % 2 == 1),
                                        })}>
                                            <Card.Body>
                                                <Card.Title>{val.heading}</Card.Title>
                                                <Card.Text>
                                                    {val.description}
                                                </Card.Text>
                                            </Card.Body>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Card.Img
                                                    variant="top"
                                                    src={val.imageURL}
                                                    className="w-25 text-center"
                                                />
                                            </div>
                                        </Card>

                                    </Col>

                                </Row>
                            )
                        })
                    }

                </Container>
            </div>
        </div>
    )
}

export default Home

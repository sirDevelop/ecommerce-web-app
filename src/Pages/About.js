import parse from 'html-react-parser';

import { Container, Row, Col, Card } from "react-bootstrap"

const About = () => {
	const sectionInfo = [{
		heading: "Welcome to MouthWatering Deals", description: `
        <strong> Where Prices Drop, and Satisfaction Soars! </strong>
        <br/><br/>
        At MouthWatering Deals, we're not just an ecommerce platform; we're a revolution in the way you shop. Imagine a place where your budget stretches farther, and every click is a step towards unbeatable savings. That's the world we've created for you.
        <br/><br/>
        <strong>Our Promise: Unbeatable Prices, Unforgettable Deals:</strong>
        <br/><br/>
        Get ready to embark on a shopping spree like no other. At MouthWatering Deals, we specialize in offering a vast array of products, ranging from fashion and electronics to home essentials and beyond – all at prices that will leave you in awe. Our commitment to providing heavily discounted rates means you can indulge in guilt-free shopping without breaking the bank.
        <br/><br/>
        <strong>Why MouthWatering Deals?</strong>
        <br/><br/>
        <strong>Discounts Galore:</strong> We pride ourselves on being the go-to destination for jaw-dropping deals. Our team works tirelessly to bring you discounts that you won't find anywhere else. Get ready to be pleasantly surprised with every visit.
        <br/><br/>
        <strong>Diverse Selection:</strong> From the latest tech gadgets to stylish fashion finds and everything in between, our inventory is a treasure trove of must-haves. Discover products that match your style, needs, and budget.
        <br/><br/>
        <strong>Quality Meets Affordability:</strong> Don't let the low prices fool you – we're serious about quality. Every item at MouthWatering Deals undergoes stringent quality checks to ensure that you receive not only unbeatable deals but also products that stand the test of time.
        <br/><br/>
        <strong>Join the Savings Revolution:</strong>
        <br/><br/>
        MouthWatering Deals is more than just a shopping destination; it's a community of savvy shoppers who know that great value doesn't have to come with a hefty price tag. Join us in celebrating the joy of finding incredible deals and making every purchase a delightful experience.
        <br/><br/>
        <strong>Customer Satisfaction is Our Priority:</strong>
        <br/><br/>
        Our customer support team is dedicated to ensuring your experience with MouthWatering Deals is smooth and satisfying. Have a question? Need assistance with an order? We're here for you every step of the way.
        <br/><br/>
        <strong>Start Saving, Start Shopping:</strong>
        <br/><br/>
        MouthWatering Deals invites you to redefine the way you shop. Dive into a world of discounts, explore unbeatable deals, and revel in the thrill of discovering fantastic products at prices that will make your wallet smile.
        <br/><br/>
        Thank you for choosing MouthWatering Deals - where every deal is a delight! Happy shopping!
	`}]

	return (
		<div className="text-center">
			<Container>
				<Row>
					<Col
						lg={12}
						className="p-2 d-flex flex-wrap"
					>
						{
							sectionInfo.map((val, i) => {
								return (

									<Card className="border-1 shadow d-flex flex-column p-2 bg-light lead">
										{/* <Card.Img
												variant="top"
												src={val.imageURL}
											/> */}
										<Card.Body>
											<Card.Title className='display-3'>{val.heading}</Card.Title>
											<Card.Text>
												{parse(val.description)}
											</Card.Text>
										</Card.Body>
									</Card>
								)
							})
						}
					</Col>

				</Row>
			</Container>
		</div>
	)
}

export default About

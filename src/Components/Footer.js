import { Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faTwitterSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	const socials = [
		{
			icon: faEnvelope,
			url: "mailto: mouthWateringDeals@gmail.com",
		},
		{
			icon: faFacebookSquare,
			url: "https://facebook.com/mouthWateringDeals",
		},
		{
			icon: faTwitterSquare,
			url: "https://www.twitter.com/mouthWateringDeals",
		},
		{
			icon: faInstagram,
			url: "https://www.instagram.com/mouthWateringDeals",
		},
	];

	return (
		<footer
			className="bg-body-tertiary mt-auto rounded-top-5 text-white py-3"
			bg="dark"
			data-bs-theme="dark"
		>
			<Container>
				<Row>
					<Col lg={3}>
						<h3> Mouth Watering Deals </h3>
						<p>
							The Best Deals, delivered straight to you
						</p>
					</Col>
					<Col lg={3}></Col>
					<Col lg={3}></Col>
					<Col lg={3}>
						<Row>
						{socials.map((social, i) => {
							return (
								<Col sm={3} >
									<a href={social.url} target="_blank" className="mx-3">
										<FontAwesomeIcon icon={social.icon} size="2x" />
									</a>
								</Col>
							)
						})
						}
						</Row>
				
                    </Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer

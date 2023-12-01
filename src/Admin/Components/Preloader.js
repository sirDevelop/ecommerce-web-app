import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { faTelegram } from "@fortawesome/free-brands-svg-icons"
import { useAuth } from "../Components/useAuth"
const Preloader = () => {
	const { loadingLogin } = useAuth()
	return loadingLogin === undefined ? (
		<Container className="login">
			<Row>
				<Col sm={12} className="d-flex align-items-center min-vh-100">
					<Form
						className="mx-auto w-50 min-h-50 border border-info rounded shadow p-5 py-3 text-center text-light"
						onSubmit={(e) => {
							e.preventDefault()
						}}
					>
						<FontAwesomeIcon
							className="mb-3"
							size="6x"
							icon={faTelegram}
						/>
						<InputGroup className="mb-3">
							<InputGroup.Text className="bg-transparent text-white">
								<FontAwesomeIcon icon={faSpinner} spin />
							</InputGroup.Text>
							<Form.Control
								as={Col}
								sm={12}
								disabled
								className="bg-transparent text-white"
							>
								<FontAwesomeIcon icon={faSpinner} spin />
							</Form.Control>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text className="bg-transparent text-white">
								<FontAwesomeIcon icon={faSpinner} spin />
							</InputGroup.Text>
							<Form.Control
								as={Col}
								sm={12}
								disabled
								className="bg-transparent text-white"
							>
								<FontAwesomeIcon icon={faSpinner} spin />
							</Form.Control>
						</InputGroup>
						<Button
							disabled
							className={`mt-3 mx-2 shadow blue-gradient border-0 rounded`}
						>
							<FontAwesomeIcon icon={faSpinner} spin />
						</Button>
						<Button
							disabled
							className={`mt-3 mx-2 shadow green-gradient border-0 rounded`}
						>
							<FontAwesomeIcon icon={faSpinner} spin />
						</Button>
						<Button type="submit" className="d-none" />
					</Form>
				</Col>
			</Row>
		</Container>
	) : (
		<></>
	)
}

export default Preloader

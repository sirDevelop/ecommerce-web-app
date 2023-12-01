import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCheckDouble,
	faEnvelope,
	faKey,
	faSpinner,
	faUser,
} from "@fortawesome/free-solid-svg-icons"
import { faTelegram } from "@fortawesome/free-brands-svg-icons"
import { Fade } from "react-reveal"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../Components/useAuth"
import { useMain } from "../Components/MainComponent"
import { useNavigate } from "react-router-dom"
const Login = () => {
	const navigate = useNavigate()
	const { loadingLogin } = useMain()
	const Email = useRef()
	const Password = useRef()
	const RepeatPassword = useRef()
	const Token = useRef()
	const ChatId = useRef()
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rePassword: "",
		token: "",
		chatId: "",
	})
	const [registerOpen, setRegisterOpen] = useState(false)
	const { login, register, loggedIn } = useAuth()
	const formSubmit = () => {
		let error = true
		!formData.email.length
			? Email.current.focus()
			: !formData.password.length
			? Password.current.focus()
			: registerOpen && !formData.rePassword.length
			? RepeatPassword.current.focus()
			: (error = false)
		if (!error)
			registerOpen
				? register(
						formData.email,
						formData.password,
						formData.token,
						formData.chatId
				  )
				: login(formData.email, formData.password)
	}
	useEffect(() => {
		formSubmit()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [registerOpen])
	useEffect(() => {
		loggedIn ? navigate("/") : <></>
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn])

	return (
		<Container className="login">
			<Row>
				<Col sm={12} className="d-flex align-items-center min-vh-100">
					<Form
						className="mx-auto w-50 min-h-50 border border-info rounded shadow p-5 py-3 text-center text-light"
						onSubmit={(e) => {
							e.preventDefault()
							formSubmit()
						}}
					>
						<FontAwesomeIcon
							className="mb-3"
							size="6x"
							icon={faKey}
						/>
						<InputGroup className="mb-3">
							<InputGroup.Text className="bg-transparent text-white">
								<FontAwesomeIcon icon={faEnvelope} />
							</InputGroup.Text>
							<Form.Control
								name="email"
								disabled={loadingLogin}
								ref={Email}
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								className="bg-transparent text-white"
								placeholder="Username"
								aria-label="Username"
							/>
						</InputGroup>
						<InputGroup>
							<InputGroup.Text className="bg-transparent text-white">
								<FontAwesomeIcon icon={faKey} />
							</InputGroup.Text>
							<Form.Control
								name="password"
								disabled={loadingLogin}
								type="password"
								ref={Password}
								value={formData.password}
								onChange={(e) =>
									setFormData({
										...formData,
										password: e.target.value,
									})
								}
								className="bg-transparent text-white"
								placeholder="Password"
								aria-label="Password"
							/>
						</InputGroup>
						{/* when registerOpen whole input group shows, oth */}
						<Fade
							bottom
							collapse
							when={registerOpen}
							onReveal={() => {
								if (
									formData.email.length &&
									formData.password.length
								)
									setTimeout(() => {
										RepeatPassword.current.focus()
									}, 500)
								else
									!formData.email.length ? (
										Email.current.focus()
									) : !formData.password.length ? (
										Password.current.focus()
									) : (
										<></>
									)
							}}
						>
							<InputGroup
								className={`${registerOpen ? "mt-3" : ""}`}
							>
								<InputGroup.Text className="bg-transparent text-white">
									<FontAwesomeIcon icon={faCheckDouble} />
								</InputGroup.Text>
								<Form.Control
									disabled={loadingLogin}
									type="password"
									value={formData.rePassword}
									onChange={(e) =>
										setFormData({
											...formData,
											rePassword: e.target.value,
										})
									}
									ref={RepeatPassword}
									className="bg-transparent text-white"
									placeholder="Repeat Password"
									aria-label="Repeat Password"
								/>
							</InputGroup>
							<InputGroup
								className={`${registerOpen ? "mt-3" : ""}`}
							>
								<InputGroup.Text className="bg-transparent text-white">
									<FontAwesomeIcon icon={faKey} />
								</InputGroup.Text>
								<Form.Control
									disabled={loadingLogin}
									value={formData.token}
									onChange={(e) =>
										setFormData({
											...formData,
											token: e.target.value,
										})
									}
									ref={Token}
									className="bg-transparent text-white"
									placeholder="Token"
									aria-label="Token"
								/>
							</InputGroup>
							<InputGroup
								className={`${registerOpen ? "mt-3" : ""}`}
							>
								<InputGroup.Text className="bg-transparent text-white">
									<FontAwesomeIcon icon={faUser} />
								</InputGroup.Text>
								<Form.Control
									disabled={loadingLogin}
									value={formData.chatId}
									onChange={(e) =>
										setFormData({
											...formData,
											chatId: e.target.value,
										})
									}
									ref={ChatId}
									className="bg-transparent text-white"
									placeholder="Chat ID"
									aria-label="Chat ID"
								/>
							</InputGroup>
						</Fade>
						<Button
							disabled={loadingLogin}
							className={`mt-3 mx-2 shadow blue-gradient border-0 rounded`}
							onClick={(e) => {
								e.preventDefault()
								if (registerOpen) setRegisterOpen(false)
								else formSubmit()
							}}
						>
							{loadingLogin ? (
								<FontAwesomeIcon icon={faSpinner} spin />
							) : (
								"Login"
							)}
						</Button>
						<Button
							disabled={loadingLogin}
							className={`mt-3 mx-2 shadow green-gradient border-0 rounded`}
							onClick={(e) => {
								e.preventDefault()
								if (!registerOpen) setRegisterOpen(true)
								else formSubmit()
							}}
						>
							{loadingLogin ? (
								<FontAwesomeIcon icon={faSpinner} spin />
							) : (
								"Sign Up"
							)}
						</Button>
						<Button type="submit" className="d-none" />
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default Login

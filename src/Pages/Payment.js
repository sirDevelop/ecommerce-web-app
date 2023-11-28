import { useGlobal } from "../Components/ParentComponent"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
const Payment = () => {
	const { authApi } = useGlobal()
	// gets the parameters from the URL
	const { status, code, session } = useParams()
	const [paid, setPaid] = useState()
	useEffect(() => {
		if (code && session && status === "success")
			authApi
				.post("/api/orders/verify/", { code, session })
				.then((response) => {
					setPaid(response.data.status === "paid" ? true : false)
				})
	}, [])

	// return (status === "success" ?
	// 	<div>{paid === null || paid === undefined ? "Checking your payment status" : paid ? "Successful!" : "Failed"}
	// 	</div>
	// 	 : <>Payment failed</>
	// )

	return status === "success" ? (
		<div className="d-flex justify-content-center align-items-center">
			<div className="card col-md-4 bg-white shadow-md p-5">
				<div className="mb-4 text-center">
					<svg
						// xmlns="http://www.w3.org/2000/svg"
						width="75"
						height="75"
						fill="currentColor"
						className="bi bi-check-circle text-success"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
						<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
					</svg>
				</div>
				<div className="text-center">
					<h1>Thank You!</h1>
					<p>We appreciate your business, please come again </p>

					{/* This is NOT WORKING */}
					<Button
						className="btn btn-success text-white btn-outline-success"
						as={Link}
						to="/"
					>
						Back Home
					</Button>
				</div>
			</div>
		</div>
	) : (
		<div className="d-flex justify-content-center align-items-center">
			<div className="card col-md-4 bg-white shadow-md p-5">
				<div className="mb-4 text-center">
					<svg
						// xmlns="http://www.w3.org/2000/svg"
						width="75"
						height="75"
						fill="currentColor"
						className="bi bi-x text-danger"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
						<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
					</svg>
				</div>
				<div className="text-center">
					<h1>Oops! Something went wrong </h1>
					<p>
						We were unable to process your payment, please try again
						later. Contact support at mouthWateringDeals@gmail.com
						if this persists.{" "}
					</p>

					<Button
						className="btn btn-danger text-white btn-outline-danger"
						as={Link}
						to="/"
					>
						Back Home
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Payment

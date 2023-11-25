import { Container, Row, Col, Card } from "react-bootstrap"
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";

const Catalog = () => {
	const [page, setPage] = useState(0)
	const itemHandler = (data) => {
		setCatalogItems([...catalogItems, data.getCatalogItems])
		setPage(data.page)
	}
	const apiInstance = axios.create({baseURL: "http://localhost:9000/api/"})
	useEffect(() => {
		apiInstance.post("catalog/getAllItems", {}).then((response) =>{
			itemHandler(response.data)
		})
    },[]);
	const [catalogItems, setCatalogItems] = useState([])
	const loadMoreItems = () => {
		apiInstance.post("catalog/getAllItems", {loadMore: true, page}).then((response) =>{
			itemHandler(response.data)
		})
	}

	return (
		<div>
            Catalog
		</div>
	)
}

export default Catalog

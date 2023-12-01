import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { useAuth } from "../Components/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faX, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, Row, Button, Table } from "react-bootstrap"

// To bypass login, go to http://localhost:3000/catalogItems
// can delete whole server folder, using backend of ecommerce website

const CatalogItems = () => {
    const { authApi } = useAuth()
    const [itemsFromDatabase, setItemsFromDatabase] = useState([])
    const [isMoreAvailable, setIsMoreAvailable] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        authApi.post("api/catalog/getItems/", { category: "All", page: 1 }).then((response) => {
            setIsMoreAvailable(response.data.moreItemsAvailable)
            setItemsFromDatabase(response.data.getCatalogItems)
        })
    }, [])

    useEffect(() => {
        if (page > 1) {
            setIsLoadingMore(true)
            authApi.post("api/catalog/getItems/", { category: "All", page }).then((response) => {
                setIsLoadingMore(false)
                setIsMoreAvailable(response.data.moreItemsAvailable)
                setItemsFromDatabase([...itemsFromDatabase, ...response.data.getCatalogItems])
            })
        }
    }, [page])

    const editItem = (i) => {
        Swal.fire({
            html: `
				<input id="swal-itemName" value="${itemsFromDatabase[i].itemName}" class="swal2-input">
                <input id="swal-imageURL" value="${itemsFromDatabase[i].imageURL}" class="placeholder-dark swal2-input" placeholder="Image URL">
				<textarea id="swal-description" class="swal2-textarea">${itemsFromDatabase[i].description}</textarea>
                <input id="swal-price" value="${itemsFromDatabase[i].price}" class="swal2-input">
				<select id="swal-category" class="swal2-select">
				${['All', 'Decorative', 'Office', 'Ceramics', 'Travel', 'Artwork', 'Outdoors', 'Home Goods', 'Skincare', 'Metaphysical', 'Electronics'].map((category, categoryIndex) => {
                return `<option ${itemsFromDatabase[i].category === category ? "selected" : ""} value="${category}" key="${categoryIndex}">${category}</option>`
            })}
				</select>
				<input id="swal-quantity" value="${itemsFromDatabase[i].quantity}" class="swal2-input">
			`,
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Save",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let itemName = document.getElementById("swal-itemName").value,
                    description = document.getElementById("swal-description").value,
                    category = document.getElementById("swal-category").value,
                    price = document.getElementById("swal-price").value,
                    quantity = document.getElementById("swal-quantity").value,
                    imageURL = document.getElementById("swal-imageURL").value
                return {
                    itemName,
                    description,
                    category,
                    price,
                    quantity,
                    imageURL
                };
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ didOpen: () => { Swal.showLoading(); }, })
                const { itemName, description, category, price, quantity, imageURL } = result.value
                authApi.post("api/catalog/editCatalogItem/", { id: itemsFromDatabase[i]._id, itemName, description, category, price, quantity, imageURL }).then((response) => {
                    if (response.status === 200) {
                        setItemsFromDatabase(itemsFromDatabase.map((val, index) => {
                            if (i === index) {
                                // the values override the existing ones
                                return { ...val, itemName, description, category, price, quantity }
                            }
                            return val
                        }))
                        Swal.fire({
                            title: "Edited!",
                            text: "Item has been updated!.",
                            icon: "success",
                        })
                    }
                }).catch(err => {
                    Swal.fire({
                        title: "Something went wrong!",
                        icon: "warning",
                    })
                })
            }
        })

    }
    const deleteItem = (i) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()

        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ didOpen: () => { Swal.showLoading(); }, })
                authApi.post("api/catalog/deleteCatalogItem/", { id: itemsFromDatabase[i]._id }).then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: "Deleted!",
                            text: itemsFromDatabase[i].itemName + " has been deleted!.",
                            icon: "success",
                        }).then(() => {
                            setItemsFromDatabase(itemsFromDatabase.filter((val, index) => i !== index))
                        })
                    }
                }).catch(err => {
                    Swal.fire({
                        title: "Something went wrong!",
                        icon: "warning",
                    })
                })

            }
        })
    }
    const addAllItems = (i) => {
        Swal.fire({
            title: "Add all catalog items back",
            text: "Are you sure?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add all items!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ didOpen: () => { Swal.showLoading(); }, })
                authApi.post("api/catalog/createCatalogItems/").then((response) => {
                    if (response.status === 200) {
                        setPage(1)
                        authApi.post("api/catalog/getItems/", { category: "All", page: 1 }).then((response) => {
                            setIsMoreAvailable(response.data.moreItemsAvailable)
                            setItemsFromDatabase(response.data.getCatalogItems)
                        }).then(() => {
                            Swal.fire({
                                title: "Added back all items!",
                                icon: "success",
                            })
                        })
                    }
                }).catch(err => {
                    Swal.fire({
                        title: "Something went wrong adding all catalog items!",
                        icon: "warning",
                    })
                })

            }
        })
    }

    const deleteAllItems = () => {
        Swal.fire({
            title: "Are you sure you want to delete all items?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete all items!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ didOpen: () => { Swal.showLoading(); }, })
                authApi.post("api/catalog/deleteAllItems/").then((response) => {
                    if (response.status === 200) {
                        setItemsFromDatabase([])
                        Swal.fire({
                            title: "Deleted All Items!",
                            icon: "success",
                        })
                    }
                }).catch(err => {
                    Swal.fire({
                        title: "Something went wrong deleting all items!",
                        icon: "warning",
                    })
                })

            }
        })
    }

    const addItem = () => {
        Swal.fire({
            html: `
				<input id="swal-itemName" class="placeholder-dark swal2-input" placeholder="Item Name">
				<input id="swal-imageURL" class="placeholder-dark swal2-input" placeholder="Image URL">
				<textarea id="swal-description" class="placeholder-dark swal2-textarea"  placeholder="Description"></textarea>
                <input id="swal-price" class="placeholder-dark swal2-input" placeholder="Price">
				<select id="swal-category" class="swal2-select"  placeholder="Item Name">
                    ${['All', 'Decorative', 'Office', 'Ceramics', 'Travel', 'Artwork', 'Outdoors', 'Home Goods', 'Skincare', 'Metaphysical', 'Electronics'].map((category, i) => {
                return `<option value="${category}" key="${i}">${category}</option>`
            })}
				</select>
				<input id="swal-quantity" class="placeholder-dark swal2-input"  placeholder="Quantity">
			`,
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Save",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
                let itemName = document.getElementById("swal-itemName").value,
                    description = document.getElementById("swal-description").value,
                    category = document.getElementById("swal-category").value,
                    price = document.getElementById("swal-price").value,
                    imageURL = document.getElementById("swal-imageURL").value,
                    quantity = document.getElementById("swal-quantity").value
                return {
                    itemName,
                    description,
                    category,
                    price,
                    quantity,
                    imageURL
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ didOpen: () => { Swal.showLoading() } })
                const { itemName, description, category, price, quantity, imageURL } = result.value
                authApi.post("api/catalog/addCatalogItem/", { itemName, description, category, price, quantity, imageURL }).then((response) => {
                    if (response.status === 200) {
                        if (!isMoreAvailable) setItemsFromDatabase([...itemsFromDatabase, response.data.result])
                        Swal.fire({
                            title: "Added New Item!",
                            icon: "success",
                        })
                    }
                }).catch(err => {
                    Swal.fire({
                        title: "Something went wrong when adding new item!",
                        icon: "warning",
                    })
                })
            }
        })
    }
    const Buttons = () => {
        return <div className="text-center">
            <Button className="btn mx-2 btn-success" onClick={() => addItem()}>Add New Item</Button>
            {isMoreAvailable ? <Button className="btn mx-2 btn-secondary" onClick={() => { if (!isLoadingMore) setPage(page + 1) }}>{!isLoadingMore ? "Load More" : <FontAwesomeIcon icon={faSpinner} spin />}</Button> : <></>}
            <Button className="btn mx-2 btn-warning" onClick={() => addAllItems()}>Rebuild Catalog</Button>

            <Button className="btn mx-2 btn-danger" onClick={() => deleteAllItems()}>Delete All Items</Button>
        </div>
    }
    return (
        <Container className="mt-3" data-bs-theme="dark">
            <Row>
                <Buttons />
                <Table striped bordered hover className="text-center mt-3">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsFromDatabase.map((catalogItem, catalogItemIndex) => {
                            const { itemName, price, category, quantity } = catalogItem
                            return (
                                <tr key={catalogItemIndex}>
                                    <td>{itemName}</td>
                                    <td>{price}</td>
                                    <td>{category}</td>
                                    <td>{quantity}</td>
                                    <td className="text-center">
                                        <FontAwesomeIcon className="cursor-pointer mx-2" onClick={() => editItem(catalogItemIndex)} icon={faPencil} />
                                        <FontAwesomeIcon className="cursor-pointer mx-2" onClick={() => deleteItem(catalogItemIndex)} icon={faX} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Buttons />
            </Row>
        </Container>
    )
}

export default CatalogItems
import { fetchProductDetail, fetchProducts } from "../services/mercado-libre-api.service.js"

export const getAllItems = async (request, response) => {
    try {
        const queryParams = request.query

        const { q: query, limit } = queryParams

        const products = await fetchProducts({ query, limit })

        let categories = []

        const itemsList = products.map((product) => {
            categories = [
                ...categories,
                product.category_id
            ]

            return {
                id: product.id,
                title: product.title,
                price: {
                    currency: product.currency_id,
                    amount: product.price,
                    decimals: 2
                },
                picture: product.thumbnail,
                condition: product.condition,
                free_shipping: product.shipping.free_shipping,
            }
        })

        const objToReturn = {
            author: {
                name: "string",
                lastname: "string"
            },
            categories: categories,
            items: itemsList
        }

        response.status(200).json(objToReturn)

    } catch (error) {
        console.error(error)
    }
}

export const getOneItem = async (request, response) => {
    const itemId = request.params.id

    const productDetail = await fetchProductDetail(itemId)


    const objToReturn = {
        author: {
            name: "string",
            lastname: "string"
        },
        item: {
            id: productDetail.id,
            title: productDetail.title,
            price: {
                currency: productDetail.currency_id,
                amount: productDetail.price,
                decimals: 2
            },
            picture: productDetail.thumbnail,
            condition: productDetail.condition,
            free_shipping: productDetail.shipping.free_shipping,
            sold_quantity: 223,
            description: productDetail.description.plain_text
        }
    }

    response.json(objToReturn)
}
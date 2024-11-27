const BASE_API_URL = "https://api.mercadolibre.com"

export const fetchProducts = async ({ query = 'query', limit }) => {
    try {
        let queryParams = `?q=${query}`

        if (limit) queryParams += `&limit=${limit}`

        const response = await fetch(`${BASE_API_URL}/sites/MLA/search${queryParams}`)
        const data = await response.json()
        const products = data.results

        return products

    } catch (error) {
        throw new Error(error)
    }
}


export const fetchProductDetail = async (productId) => {
    try {
        const response = await fetch(`${BASE_API_URL}/items/${productId}`)
        const productBaseData = await response.json()

        const descriptionResponse = await fetch(`${BASE_API_URL}/items/${productId}/description`)
        const productDescription = await descriptionResponse.json()
        console.log('PRODUCT_DESCRIPTION:', productDescription)

        return {
            ...productBaseData,
            description: productDescription
        }

    } catch (error) {
        throw new Error(error)
    }
}
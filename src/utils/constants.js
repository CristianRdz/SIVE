// Obtenemos la url de la api
const API_URL = "http://192.168.186.132:8080"

const STORAGE_URL = `${API_URL}/api/product/loadfile/`
// exportamos las constantes

const loadFirstImage = (product) => {
    if (product.images.length > 0) {
        return `${STORAGE_URL}${product.images[0].diskReference}`
    } else {
        return 'https://i.stack.imgur.com/y9DpT.jpg'
    }
}

const loadALLImages = (product) => {
    if (product.images.length > 0) {
        return product.images.map(image => {
            return `${STORAGE_URL}${image.diskReference}`
        })
    } else {
        return 'https://i.stack.imgur.com/y9DpT.jpg'
    }
}

const loadImage = (image) => {
    return image ? `${STORAGE_URL}${image.diskReference}` : 'https://i.stack.imgur.com/y9DpT.jpg'
}   

export {
    API_URL,
    STORAGE_URL,
    loadFirstImage,
    loadALLImages,
    loadImage
}
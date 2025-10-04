const BASE_URL = 'https://72ee35158b5d.ngrok-free.app'

const endpoints = {
    sharks: {
        getAll: `${BASE_URL}/Sharks`
    },
    tracking: {
        getBySharkId: (sharkId) => `${BASE_URL}/Tracking/shark/${sharkId}`,
        predict: (sharkId, iterations = 1) => `${BASE_URL}/Tracking/shark/${sharkId}/predict?iterations=${iterations}`
    }
}

export default endpoints
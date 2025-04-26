import axios from 'axios'

const backendURL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
    baseURL: `${backendURL}/api/link`
})


export const getLinks = async () => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found!")
    try {
        const response = await api.get("/", {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response?.data?.message || "Failed to fetch links")
    }
}

export const addLink = async (linkData) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found!")
    try {
        const response = await api.post("/", linkData, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response?.data?.message || 'Failed to add the link')
    }
}

export const deleteLink = async (id) => {
    const token = localStorage.getItem("token")
    if(!token) throw new Error("Token not found")
    try {
        const response = await api.delete(`/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response?.data?.message || 'Failed to delete the link')
    }
}
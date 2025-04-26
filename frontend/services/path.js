import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL;

const path = axios.create({
    baseURL: `${backendURL}/api/path`
});


export const getPath = async (id) => {
    try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No token found!")
        const response = await path.get(`/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch to path data')
    }
}

export const getPaths = async () => {
    try {
        const response = await path.get("/")
        const data = response.data;
        return Array.isArray(data) ? data : data.paths;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to get your paths')
    }
}

export const savePath = async (pathData) => {
    try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("No token found!")

        const response = await path.post("/", pathData, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to get your paths')
    }
}
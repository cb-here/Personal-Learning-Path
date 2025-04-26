import axios from 'axios'

const user = axios.create({
  baseURL: "http://localhost:5000/api/auth"
})

const course = axios.create({
  baseURL: "http://localhost:5000/api/course"
})

const discuss = axios.create({
  baseURL: "http://localhost:5000/api/discuss"
})

const code = axios.create({
  baseURL: "http://localhost:5000/api/code"
})

export const userRegister = async (userData) => {
  try {
    const response = await user.post("/register", userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Something went wrong!')
  }
}

export const userLogin = async (userData) => {
  try {
    const response = await user.post("/login", userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Something went wrong!')
  }
}

export const userProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await user.get("/profile", {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {

    const errorMessage = error.response?.data?.message || "Something went wrong!";

    if (errorMessage === "Session expired! Please log in again.") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    throw new Error(errorMessage);
  }
};

export const fetchReccomendations = async () => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token found!")

    const response = await course.get("/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong!");
  }
}



export const fetchDiscussions = async () => {
  const response = await discuss.get("/")
  return response.data
}

export const getDiscussionById = async (id) => {
  const response = await discuss.get(`/${id}`)
  return response.data
}

export const createDiscussion = async (discussionData) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No token found!")

  const response = await discuss.post("/",
    discussionData,
    {
      headers: { Authorization: `Bearer ${token}` }
    })
  return response.data
}

export const postComment = async (commentData, id) => {
  const token = localStorage.getItem("token")
  if (!token) throw new Error("No token found!")
  try {
    const response = await discuss.post(`/${id}/comment`, commentData,{
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch(error) {
      throw new Error("Failed to comment")
  }
}

export const runCode = async (codeData) => {
  const response = await code.post("/run", codeData)
  return response.data.output || response.data.message
}




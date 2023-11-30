import axios from 'axios'
const baseUrl = "http://localhost:3003/api/blogs";


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewBlog = async (credentials) => {
      console.log("Entering login function");
      console.log("Credentials:", credentials);
  const request = await axios.post(baseUrl, credentials);
  return response.data;
};


export default { getAll,createNewBlog }
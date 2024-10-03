import axios from "axios";

const API_URL = "http://localhost:8080/api/book";

// Function to get the JWT token from local storage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user object from local storage
  return user?.jwt; // Return JWT token if it exists
};

// Function to create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add an interceptor to set the authorization header for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all books with authorization
const getAllBooks = () => {
  return axiosInstance.get("/all");
};

const getBookByIsbn = (id) => {
  return axiosInstance.get(`/${id}`);
};  

// Add a new book with authorization
const addBook = (bookItem) => {
  console.log(bookItem);
  return axiosInstance.post("/add", bookItem);
};

// Update a book with authorization
const updateBook = (id, updatedBook) => {
  return axiosInstance.put(`/update/${id}`, updatedBook);
};

// Delete a book with authorization
const deleteBook = (id) => {
  return axiosInstance.delete(`/delete/${id}`);
};

// Exporting the BookService object with methods
const BookService = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookByIsbn,
};

export default BookService;

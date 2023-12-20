import axios from "axios";

export default axios.create({
	baseURL: 'http://localhost:8080/api/v1'
	//  baseURL: 'https://booking-server-gl3a.onrender.com/api/v1'
})

export const getHeader = () => {
	const token = localStorage.getItem("token");
	return {
		Authorization: `Bearer ${token}`
		// "Content-Type": "application/json"
	}
}
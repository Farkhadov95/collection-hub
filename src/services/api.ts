import axios from "axios";

const URL = "https://collection-hub-server.adaptable.app/";

export default axios.create({
    baseURL: URL
});

export const getHeaders = () => {
    const token = localStorage.getItem('X-Auth-Token');
    if (!token) throw new Error('Unauthorized request');
    return {
        "Content-Type": "application/json",
        "X-Auth-Token": token,
    }
}

import react from "react";
import axios from "axios";
const UrlApi='http://localhost:8000/';
const baseUrl=axios.create({
        baseURL:UrlApi
});
export default baseUrl;
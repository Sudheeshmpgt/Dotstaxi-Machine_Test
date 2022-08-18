import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs"

const baseURL = 'http://localhost:9000/api/'

let authTokens = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
console.log(authTokens)

const instance = axios.create({
    baseURL,
    //headers:{Authorization: `Bearer ${authTokens?.accessToken}`}      
});

// instance.interceptors.request.use(async req=>{
//     if(!authTokens){
//         authTokens = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
//         req.headers.Authorization = `Bearer ${authTokens?.accessToken}`
//     }
//     const user = jwtDecode(authTokens?.accessToken)
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
//     console.log(isExpired)
//     if(!isExpired) return req

//     const response = await axios.post(`${baseURL}token`, {
//         refreshToken: authTokens.refreshToken
//     })

//     console.log(response)
//     return req
// })


export default instance;
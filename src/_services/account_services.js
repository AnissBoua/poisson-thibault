/** Import des modules nécessaires */
import Axios from "@/_services/caller_services"


let login = (credentials) => {
    console.log(credentials);
    return Axios.post('/api/token/', credentials)
}
let register = (credentials)=> {
    console.log(credentials);
    return Axios.post('/api/register/', credentials)
}
let logout = () => {
    localStorage.removeItem('token')
}

let getToken = () => {
    return localStorage.getItem('token')
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const accountService = {
    login,
    register,
    logout,
    saveToken,
    getToken,
    isLogged
}
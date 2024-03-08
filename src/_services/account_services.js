/** Import des modules nécessaires */
import Axios from "@/_services/caller_services"


let login = (credentials) => {
    return Axios.post('/auth', credentials)
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
    logout,
    saveToken,
    getToken,
    isLogged
}
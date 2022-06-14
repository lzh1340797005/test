import axios from "axios";

const baseURL = "http://localhost:3000"

export function request(config){
    const install = axios.create({
        baseURL,
        timeout:200000
    })
    install.interceptors.request.use(data =>{
        return data
    },err =>{
        return err
    })
    install.interceptors.response.use(data =>{
        return data
    },err =>{
        throw err
    })
    return install(config)
}
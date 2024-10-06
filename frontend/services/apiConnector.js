import axios from "axios"
export const axiosInstances = axios.create({}) ;
export const apiConnector = (method,url,bodyData,header,params) =>{
   return axiosInstances({
    method: `${method}`,
    url : `${url}`,
    data: bodyData ? bodyData : null ,
    headers : header ? header : null ,
    params : params ? params: null,
   }) ;
}
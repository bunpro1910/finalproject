import instance from "@/data/Instance"

export default  {
    getUser : ()=> instance.get('/user') ,
    getUserMc : ()=> instance.get('/user/mc') ,
    createUser : (formdata)=> instance.post('/user',formdata) ,
    updateUser : (id,formdata)=> instance.put(`/user/${id}`,formdata) ,
    changepass : (id,formdata)=> instance.put(`/user/changepass/${id}`,formdata) ,
    getUserById : (id)=> instance.get(`/user/${id}`) ,
    deleteUser : (id)=> instance.delete(`/user/${id}`) 
}
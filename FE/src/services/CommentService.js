import instance from "@/data/Instance"

export default  {
    getComment : ()=> instance.get('/comment') ,
    createComment : (formdata)=> instance.post('/comment',formdata) ,
    deleteComment : (id)=> instance.delete(`/comment/${id}`) ,
    getCommentById : (id)=> instance.get(`/comment/${id}`) ,
    updateComment : (id,formdata)=> instance.put(`/comment/${id}`,formdata) 
}
import instance from "@/data/Instance"

export default  {
    deleteFile : (id)=> instance.delete(`/upload/deletefile/${id}`) ,
    
}
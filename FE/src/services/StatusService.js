import instance from "@/data/Instance"

export default  {
    getStatus : ()=> instance.get('/status') ,
 
}
import instance from "@/data/Instance";

export default  {
    getAcademicyear : ()=> instance.get('/academicyear') ,
    createAcademicyear : (formdata)=> instance.post('/academicyear',formdata) ,
    updateAcademicyear : (id,formdata)=> instance.put(`/academicyear/${id}`,formdata) ,
    deleteAcademicyear : (id)=> instance.delete(`/academicyear/${id}`) ,
    getAcademicyearById : (id)=> instance.get(`/academicyear/${id}`) 
}
import instance from "@/data/Instance"

export default  {
    getCategory : ()=> instance.get('/categories') ,
    getCategoryByAcademic : (id)=> instance.get(`/categories?academicyearid=${id}`) ,
    createCategory : (formdata)=> instance.post('/categories',formdata) ,
    downloadfile : (id)=> instance.get(`/categories/download/${id}`,{ responseType: 'blob' }) ,
    updateCategory : (id,formdata)=> instance.put(`/categories/${id}`,formdata) ,
    deleteCategory : (id)=> instance.delete(`/categories/${id}`) ,
    getCategoryById : (id)=> instance.get(`/categories/${id}`) 
}
import instance from "@/data/Instance"

export default  {
    getProduct : (academicyear)=> instance.get(`/products?academicyear=${academicyear}`) ,
    getProductwithpage : (page)=> instance.get(`/products?page=${page}`) ,
    getProductByFacultyId : (id)=> instance.get(`/products?facultyid=${id}`) ,
    downloadfile : (id)=> instance.get(`/products/download/${id}`,{ responseType: 'blob' }) ,
    createProduct : (formdata)=> instance.post('/products',formdata) ,
    updateProduct : (id,formdata)=> instance.put(`/products/${id}`,formdata) ,
    deleteProduct : (id)=> instance.delete(`/products/${id}`) ,
    getProductById : (id)=> instance.get(`/products/${id}`) ,
    getProductByFacId : (id)=> instance.get(`/products/fac/${id}`), 
    getProductByStudent : (id)=> instance.get(`/products/student/${id}`) 
}
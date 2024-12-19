import instance from "@/data/Instance"

export default  {
    getProduct : ()=> instance.get(`/products`) ,
    getProductwithpage : (page)=> instance.get(`/products?page=${page}`) ,
    getProductwithname : (name)=> instance.get(`/products?productname=${name}`) ,
    createProduct : (formdata)=> instance.post('/products',formdata) ,
    updateProduct : (id,formdata)=> instance.put(`/products/${id}`,formdata) ,
    deleteProduct : (id)=> instance.delete(`/products/${id}`) ,
    getProductById : (id)=> instance.get(`/products/${id}`) ,

  
}
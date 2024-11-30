import instance from "@/data/Instance"

export default  {
    getSubmission : ()=> instance.get('/submission') ,
    createSubmission : (formdata)=> instance.post('/submission',formdata) ,
    getSubmissionById : (id)=> instance.get(`/submission/${id}`) ,
    updateSubmission : (id,formdata)=> instance.put(`/submission/${id}`,formdata) ,
    updateStatus : (id,formdata)=> instance.put(`/submission/status/${id}`,formdata) ,
    deleteSubmission : (id)=> instance.delete(`/submission/${id}`) ,
    getSubmissionBydeadline : (id)=> instance.get(`/submission/getbydeadline/${id}`),
    downloadfile : (id)=> instance.get(`/submission/download/${id}`,{ responseType: 'blob' }) ,
}
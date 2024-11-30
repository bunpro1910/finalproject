'use client'
import React, { useEffect, useRef, useState } from 'react'
import '../../app/globals.css'
import FacultyService from '@/services/CategoryService'
import ContributionService from '@/services/ProductService'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import SubmissionService from '@/services/SubmissionService'
import DeadlineService from '@/services/OrderService'
import { MdDelete } from "react-icons/md";

export default function NewArticle({ id }) {
    const [deadline, setDeadline] = useState()
    const [formData, setFormDate] = useState([])
    const [image, setImage] = useState([])
    const router = useRouter()
    const fileInputRef = useRef(null);
    const removeFileAtIndex = (index) => {
        setFormDate(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleDeletefile = (index) => (e) => {

        removeFileAtIndex(index)
    }
    const handleFileChange = (e) => {


        const selectedFile = e.target.files;
        console.log(selectedFile)
        if (selectedFile) {

            [...selectedFile].map(x => {
                console.log(x)
                if (x.type.startsWith('image/')) {

                    setFormDate(oldArray => [...oldArray, { file: x, type: 'image' }]);

                } else {
                    setFormDate(oldArray => [...oldArray, { file: x, type: 'docs' }]);

                }
            })
        }
    };

    useEffect(() => {
        DeadlineService.getDeadlineById(id).then(x => setDeadline(x.data)).catch(e => {
            
        })
        return () => {

        }
    }, [formData])
    const onSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        formData.map((x,i)=>{
            formdata.append(`file`,x.file)
        })
        SubmissionService.createSubmission(formdata).then(x => { toast.success(`add success`); router.push(`/Student/DetailArticle/${deadline?.d}`) }).catch(e => {
            console.log(e)
            toast.error(`add failed`)
        })

    }
    console.log(formData)
    if (!deadline) {
        return
    }
    return (
        <>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
            />
            <meta
                name="description"
                content="magazine"
            />
            <meta name="author" content="Kodinger" />
            <meta
                name="keyword"
                content="magz, html5, css3, template, magazine template"
            />
            {/* Shareable */}
            <meta
                property="og:title"
                content="HTML5 & CSS3 magazine template is based on Bootstrap 3"
            />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="http://github.com/nauvalazhar/Magz" />
            <meta
                property="og:image"
                content="https://raw.githubusercontent.com/nauvalazhar/Magz/master//home/images/preview.png"
            />
            <title>Add New Artical  &amp; -Student </title>
            {/* Bootstrap */}
            <link rel="stylesheet" href="/home/scripts/bootstrap/bootstrap.min.css" />
            {/* IonIcons */}
            <link rel="stylesheet" href="/home/scripts/ionicons//home/css/ionicons.min.css" />
            {/* Toast */}
            <link rel="stylesheet" href="/home/scripts/toast/jquery.toast.min.css" />
            {/* OwlCarousel */}
            <link
                rel="stylesheet"
                href="/home/scripts/owlcarousel/dist/assets/owl.carousel.min.css"
            />
            <link
                rel="stylesheet"
                href="/home/scripts/owlcarousel/dist/assets/owl.theme.default.min.css"
            />
            {/* Magnific Popup */}
            <link
                rel="stylesheet"
                href="/home/scripts/magnific-popup/dist/magnific-popup.css"
            />
            <link rel="stylesheet" href="/home/scripts/sweetalert/dist/sweetalert.css" />
            {/* Custom style */}
            <link rel="stylesheet" href="/home/css/style.css" />
            <link rel="stylesheet" href="/home/css/skins/all.css" />
            <link rel="stylesheet" href="/home/css/demo.css" />
            <div className="container2">
                <h1 className="mt-5" style={{ fontSize: '24px', color: 'darkslategray', lineHeight: '2.5' }}>Add New Article For This Year Magazine</h1>
                <h1 className="mt-5" style={{ fontSize: '1.5rem' }}>Closure Date:  {deadline.closureDate && new Date(deadline.closureDate).toLocaleString()}</h1>
                <h1 className="mt-5" style={{ fontSize: '1.5rem' }}>Closure Date:  {deadline.finalclosureDate && new Date(deadline.finalclosureDate).toLocaleString()}</h1>
                <h1 className="faculty" style={{ fontSize: '1.5rem' }}>{deadline.name}</h1>
                <form className="mt-3" onSubmit={onSubmit}>
                    <input type="hidden" name='deadlineid' value={deadline.id} />
                    <div className="mb-3">
                        <label htmlFor="articleTitle" className="form-label">Article Title:</label>
                        <div className="textbox-container">
                            <input type="text" name='title' placeholder="Enter your article Title" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ArticleContent" className="form-label">Article Content:</label>
                        <div className="textbox-container">
                            <input type="text" name='content' placeholder="Enter your article content" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="articlePhoto" className="form-label">File Submission:</label>
                        <p className='' alt="" >{formData.length} files submited</p>
                        <div className='w-full grid grid-cols-2 gap-10 mb-5'>
                       
                            {formData.map((x, i) => {
                                if (x.type == 'image') {
                                    return <div className='flex items-center gap-2 border-2 p-5 justify-center'>
                                        <img src={URL.createObjectURL(x.file)} className='max-w-[200px]' alt="" />
                                        <button type='button' onClick={handleDeletefile(i)} className='p-4 text-5xl hover:text-red-500'><MdDelete /></button>
                                    </div>
                                }
                            })}

                        </div>
                        {formData.map((x, i) => {
                            if (x.type == 'docs') {
                                return <div className='flex gap-2 items-center border-2 p-5'>
                                    <p className='' alt="" >{x.file.name}</p>
                                    <button type='button' onClick={handleDeletefile(i)} className='p-4 text-5xl hover:text-red-500'><MdDelete /></button>
                                </div>
                            }
                        })}
                        <input value={''} onChange={handleFileChange} type="file" className="form-control" id="articlePhoto" accept="image/png, image/jpeg, application/msword, application/pdf" multiple />
                    </div>
                    <div>Accepted file formats:</div>
                    <div className="mb-3 document-files">
                        Document files: <span>.doc .docx pdf </span>
                    </div>
                    <div className="mb-3 image-files">
                        Image files: <span>.jpg .jpeg .png</span>
                    </div>
                    <div className="mb-3">--------------------------------</div>

                    <button type="submit" className="btn bg-primary mr-2">Submit</button>
                    <button type="button" onClick={(e) => { router.push(`/Student/DetailArticle/${id}`) }} className="btn bg-error">Cancel</button>
                </form>
            </div>
        </>
    )
}

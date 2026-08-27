import { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewNote = () => {

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
    });

    

    const changeInput = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        
        try{
            await axios.post("http://localhost:8000/notes", formData);

            alert("Note created successfully!");

            navigate('/');
        }
        catch(err){
            console.log(err);

            alert("Failed to create note");
        }
    }


  return (
    <div className='flex justify-center mt-5'>
        <form 
            onSubmit={handleForm}
            className='bg-gray-300 w-[75%] px-18 py-10 rounded-lg flex flex-col gap-4'
        >

            <h1 className='text-center text-2xl font-semibold mb-5'>Create New Note</h1>

            <div className='flex flex-col gap-2'>
                <label className='font-semibold'>Title</label>
                <input 
                    onChange={changeInput}
                    value={formData.title}
                    type="text" 
                    name="title" 
                    placeholder='Title here...' 
                    className='rounded bg-white p-2'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-semibold'>Category</label>
                <input 
                    onChange={changeInput}
                    value={formData.category}
                    type="text" 
                    name="category" 
                    placeholder='Category here...' 
                    className='rounded bg-white p-2'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-semibold'>Content</label>
                <textarea 
                    onChange={changeInput}
                    value={formData.content}
                    type="text" 
                    name="content" 
                    placeholder='Write your note here...' 
                    className='rounded bg-white p-2' 
                    rows={5}
                />
            </div>
            <button
                type='submit'
                className='bg-rose-500 p-2 rounded text-white font-semibold cursor-pointer text-lg'
            >Add Note</button>
            
        </form>
    </div>
  )
}

export default NewNote
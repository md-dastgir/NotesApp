import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const AllNotes = () => {


  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try{
      const res = await axios.get("http://localhost:8000/notes");

      setNotes(res.data);
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getNotes();
  }, [])


  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:8000/notes/${id}`);

      // UI se bhi note remove
      setNotes(
        notes.filter((note) => note._id !== id)
      );
    }
    catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();


  return(
    <div className="p-5 min-h-screen flex flex-col gap-8 bg-slate-500">

      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold mt-3">All Notes</h1>
        <Link to="/new">
          <button 
            onClick='/new'
            className="bg-white px-4 py-2 rounded-lg text-xl font-semibold cursor-pointer hover:scale-105 duration-300 ease-in-out"
          >Create New Note</button>
        </Link>
      </div>

      <div className="flex flex-col gap-6 h-full w-full">
        {notes.map((note) => (
          <div key={note._id} className="bg-white relative shadow-sm flex flex-col gap-1 w-full min-h-[200px] rounded px-5 py-3">
            <h2 className="text-2xl font-semibold">{note.title}</h2>
            <p>{note.content}</p>
            <p className="text-gray-700x">{note.category}</p>
            <div className="absolute bottom-5 flex gap-2">
              <button 
                onClick={() => navigate(`/edit/${note._id}`)}
                className="cursor-pointer hover:scale-105 duration-200 ease-in-out bg-slate-950 text-white rounded px-3 py-1"
              >Edit</button>

              <button 
                onClick={() => handleDelete(note._id)}
                className="cursor-pointer hover:scale-105 duration-200 ease-in-out bg-rose-500 text-white rounded px-3 py-1"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllNotes
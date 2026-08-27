import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
    });

    // Input change
    const changeInput = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Existing note get karna
    const getNote = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/notes/${id}`
            );

            setFormData({
                title: response.data.title,
                content: response.data.content,
                category: response.data.category
            });

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getNote();
    }, [id]);


    // Update note
    const handleForm = async (e) => {
        e.preventDefault();

        console.log("ID:", id);
    console.log("FORM DATA:", formData);


        try {
            await axios.put(
                `http://localhost:8000/notes/${id}`,
                formData
            );

            alert("Note updated successfully!");

            navigate("/");

        } catch (err) {
            console.log(err);

            alert("Failed to update note");
        }
    };


    return (
        <div className="flex justify-center mt-5">

            <form
                onSubmit={handleForm}
                className="bg-taupe-300 w-[75%] px-18 py-10 rounded-lg flex flex-col gap-4"
            >

                <h1 className="text-center text-2xl font-semibold mb-5">
                    Update Note
                </h1>


                <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                        Title
                    </label>

                    <input
                        onChange={changeInput}
                        value={formData.title}
                        type="text"
                        name="title"
                        className="rounded bg-white p-2"
                    />
                </div>


                <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                        Category
                    </label>

                    <input
                        onChange={changeInput}
                        value={formData.category}
                        type="text"
                        name="category"
                        className="rounded bg-white p-2"
                    />
                </div>


                <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                        Content
                    </label>

                    <textarea
                        onChange={changeInput}
                        value={formData.content}
                        name="content"
                        className="rounded bg-white p-2"
                        rows={5}
                    />
                </div>


                <button
                    type="submit"
                    className="bg-green-500 p-2 rounded text-white font-semibold cursor-pointer text-lg"
                >
                    Edit Note
                </button>

            </form>

        </div>
    );
};

export default EditNote;
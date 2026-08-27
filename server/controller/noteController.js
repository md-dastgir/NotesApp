const Note = require('../models/notes');


// Create Note
const createNote = async (req, res) => {
    try{
        const { title, content, category } = req.body;

        const note = await Note.create({
            title,
            content,
            category
        })

        res.status(201).json(note);
    }
    catch(err){
        console.log({
            message : "Note is not created!",
            error : err.message,
        })
    }
};


// Fetch All Notes
const getNotes = async (req, res) => {
    try{
        const notes = await Note.find();

        res.status(200).json(notes);
    }
    catch(err){
        res.status(500).json({
            message: "Notes not fetch",
            error: err.message
        });
    }
};


// Fetch specific Note
const getNote = async (req, res) => {
    try{
        const { id } = req.params;

        const note = await Note.findById(id);

        if(!note){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);
    }
    catch(err){
        res.status(500).json({
            message: "Note not found",
            error: err.message
        });
    }
};


// Update Note
const updateNote = async (req, res) => {
    try{
        const { id } = req.params;

        const { title, content, category } = req.body;

        const updtNote = await Note.findByIdAndUpdate(
            id,
            {
                title,
                content,
                category
            },
            {
                new: true,
                runValidators: true
            }
        );

        if(!updtNote){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(updtNote);
    }
    catch(err){
        res.status(500).json({
            message : "Note not found",
            error : err.message
        })
    }
};


// Delete Note
const deleteNote = async (req, res) => {
    try{
        const { id } = req.params;

        const dltNote = await Note.findByIdAndDelete(id);

        if(!dltNote){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(dltNote);
    }
    catch(err){
        res.status(500).json({
            message : "Note not found",
            error : err.message
        })
    }
};



module.exports = { 
    createNote, 
    getNotes, 
    getNote, 
    updateNote,
    deleteNote
};
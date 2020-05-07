const notesCtrl = {};
const Note = require('../models/Note');


notesCtrl.renderNoteform = (req,res) =>{
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req,res) =>{
    const {title,description} = req.body;
    const newNote = new Note({title,description});
    newNote.user = req.user.id;
    await   newNote.save();
    req.flash('success_msg','nota añadoda sactisfactoriamente');
    res.redirect('/notes');
};

notesCtrl.renderNotes = async (req,res) =>{
    const notes = await Note.find({user:req.user.id}).lean();
    if(note.user != req.user.id){
        req.flash('error_msg','no estas autorizado');
        return res.redirect('/notes')
    } 
    res.render('notes/all-notes',{notes});
}; 
 
notesCtrl.renderEditForm = async (req,res) =>{
    const note = await Note.findById(req.params.id).lean();
    res.render("notes/edit-note", { note });
};  

notesCtrl.updateNote= async (req,res) =>{
    const {title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title,description})
    req.flash('success_msg','nota actualizada sactisfactoriamente');
    res.redirect("/notes");
}; 

notesCtrl.deletenote= async (req,res) =>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg','nota eliminada sactisfactoriamente');
    res.redirect("/notes");
}; 

module.exports = notesCtrl;
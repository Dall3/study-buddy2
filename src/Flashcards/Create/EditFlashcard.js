// EditFlashcard.js

import React from "react";
import { useState } from "react";
import "./EditFlaschard.css";

function EditFlashcard({ flashcard, onCancel, onSave}) {
    const [editedQuestion, setEditedQuestion] = useState(flashcard.question);
    const [editedAnswer, setEditedAnswer] = useState(flashcard.answer);
    const [editedSubject, setEditedSubject] = useState(flashcard.subject);
    const [editedCourse, setEditedCourse] = useState(flashcard.course);
    const [editedImage, setEditedImage] = useState(flashcard.image);
    const [editedCategory, setEditedCategory] = useState(flashcard.category);

    const handleSave = () => {
        onSave(flashcard.id, editedQuestion, editedAnswer, editedSubject, 
            editedCourse, editedImage, editedCategory);
    };

    return (
        <div className="edit-flashcard">
        <h2>Edit flashcard</h2>
        <form>
            <label htmlFor="edited-question-field">Question:</label>
            <input
                id="edited-question-field"
                type="text"
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}></input>
        </form>
        </div>
    )
}

export default EditFlashcard;
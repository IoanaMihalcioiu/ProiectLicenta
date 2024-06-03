import React, { useState } from 'react';


function EditStudent({ student, onSave, onClose }) {
    const [name, setName] = useState(student.name);
    const [email, setEmail] = useState(student.email);

    

    const handleSave = () => {
        onSave(student.id, name, email);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Student</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder={student.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder={student.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={handleSave}>Save</button>
                </form>
            </div>
        </div>
    );
}

export default EditStudent;

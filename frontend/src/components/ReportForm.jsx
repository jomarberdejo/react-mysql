import React, { useRef } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

const ReportForm = () => {
    const queryClient = useQueryClient();
    const severityRef = useRef();
    const descriptionRef = useRef();
    const fileRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('severity', severityRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('userId', 1);
        formData.append('file', fileRef.current.files[0]);

        try {
            const result = await axios.post('http://localhost:4000/api/reports/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = await result.data;

            console.log(data.message);
            queryClient.invalidateQueries(['reports']);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="severity" id="severity" ref={severityRef}>
                    <option value="Uncategorized">Uncategorized</option>
                    <option value="Mild">Mild</option>
                    <option value="Severe">Severe</option>
                </select>
                <input type="text" placeholder='Description' ref={descriptionRef}/>
                <input type="file" ref={fileRef} />
                <button type='submit'>Report Now</button>
            </form>
        </div>
    );
};

export default ReportForm;

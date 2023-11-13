import { useState, useRef } from 'react'
import { useQueryClient } from "@tanstack/react-query"
import axios from 'axios'

const ReportForm = () => {
  const queryClient = useQueryClient();

  
  const severityRef= useRef()
  const descriptionRef= useRef()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const values = {
        severity: severityRef.current.value,
        description: descriptionRef.current.value,
        userId: 1,
    };
    try{
      const result = await axios.post('http://localhost:4000/api/reports/', values)
      const data = await result.data;

      console.log(data.message)
            queryClient.invalidateQueries(['reports'])
    } 
    catch(err){
      console.error(err)
    }
      
}


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <select name="severity" id="severity" ref = {severityRef}>
            <option value="Uncategorized">Uncategorized</option>
              <option value="Mild">Mild</option>
              <option value="Severe">Severe</option>
              
            </select>
            <input type="text" placeholder='Description' ref = {descriptionRef}/>
            <button type='submit'>Report Now</button>
        </form>
    </div>
  )
}

export default ReportForm
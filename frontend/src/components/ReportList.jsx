import React, { useRef } from 'react'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
const ReportList = (props) => {

  const queryClient = useQueryClient()
  const reportIdRef = useRef()
  const severityRef= useRef()
  const descriptionRef= useRef()

  const handleDelete = async (id) =>{
    console.log(id)
    try{
      const result = await axios.delete(`http://localhost:4000/api/reports/${id}`)
      const data = await result.data;

      console.log(data.message)
      queryClient.invalidateQueries(['reports'])
    }
    catch(err){
      console.error(err)
    }
  }

  const handleEdit = async (id) => {
    try{
      const result = await axios.get(`http://localhost:4000/api/reports/${id}`)
      const data = await result.data;
      reportIdRef.value = data[0].report_id
      severityRef.current.value = data[0].severity
      descriptionRef.current.value = data[0].description
    }
    catch(err){
      console.log(err)
    }
    
  }

  const handleSave = async (event) => {
    event.preventDefault()
    const id = reportIdRef.value;
    console.log(id)
    const values = {
      severity: severityRef.current.value,
      description: descriptionRef.current.value,

    }
    try{
      const result = await axios.patch(`http://localhost:4000/api/reports/${id}`, values )
      const data = await result.data;

      console.log(data)
      queryClient.invalidateQueries(['reports'])
    }

    catch(err){
      console.log(err)
    }
  }
  const imageUrl = `http://localhost:4000/${props.file_path}`
  return (
    <>


    <h1>{props.severity}</h1>
    <p>{props.description}</p>
    <p>{props.reported_at}</p>
    <p>{props.firstname}</p>
    <img src={imageUrl} alt= {imageUrl } />

    <button
    className='border border-blue-200 cursor-pointer'
    onClick= {()=> handleEdit(props.report_id)}>Edit</button>

    <button
    className='border border-blue-200 cursor-pointer'
    onClick= {()=> handleDelete(props.report_id)}>Delete</button>


<form onSubmit={handleSave}>
            <select name="severity" id="severity" ref = {severityRef}>
            <option value="Uncategorized">Uncategorized</option>
              <option value="Mild">Mild</option>
              <option value="Severe">Severe</option>
              
            </select>
            <input type="text" placeholder='Description' ref = {descriptionRef}/>
            <button
            className='border border-blue-200 block'
            type='submit'>Update Report</button>
        </form>
    
    </>
  )
}

export default ReportList
import React from 'react'

const StudentList = (props) => {
  console.log(props)
  return (
    <h1>{props.fullname}</h1>
  )
}

export default StudentList
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';
import StudentList from "./StudentList";


const Students = () => {

    const fetchStudents = async () => {
        const result = await axios.get('http://localhost:4000/api/students/');
        const data = await result.data;
        return data;
    }

   const {data: studentList} = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
   })



  return (
    <>
         <h1>Students</h1>
        {
            studentList?.map(student => (
                <StudentList {...student}/> 
            ))
        }

    </> 
   
  )
}

export default Students
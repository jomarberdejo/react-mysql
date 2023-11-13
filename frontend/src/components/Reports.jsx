import { useQuery } from "@tanstack/react-query"
import axios from 'axios';
import ReportList from "./ReportList";
import ReportForm from "./ReportForm";


const Reports = () => {

    const fetchReports = async () => {
        const result = await axios.get('http://localhost:4000/api/reports/');
        const data = await result.data;
        return data;
    }

   const {data: reportList} = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
   })



  return (
    <>
        <ReportForm/>
         <h1>Reports</h1>
        {
            reportList?.map(report => (
                <ReportList key={report.report_id} {...report}/> 
            ))
        }

    </> 
   
  )
}

export default Reports
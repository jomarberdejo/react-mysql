import {useRef} from 'react'
import axios from 'axios'
const Signup = () => {
    const firstnameRef= useRef()
    const lastnameRef= useRef()
    const locationRef= useRef()
    const emailRef= useRef()
    const passwordRef= useRef()
  
    const handleSignUp = async(e) =>{
        e.preventDefault()
        

        try{
            const userInfo = {
                firstname: firstnameRef.current.value,
                lastname: lastnameRef.current.value,
                location: locationRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
    
            }
            const result = await axios.post('http://localhost:4000/api/users/', userInfo)
            const data = await result.data;
            
            console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <form onSubmit={handleSignUp}>
        <input type="text" placeholder='Firstname' ref={firstnameRef} />
          
            <input type="text" placeholder='Lastname' ref={lastnameRef} />
            
            <input type="text" placeholder='Location' ref={locationRef} />
         
            <input type="email" placeholder='Email' ref={emailRef}/>
          
            <input type="password" placeholder='Password' ref={passwordRef}/>
          
            
            
            <button 
            className='border border-blue-400 bg-black text-white'
            type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Signup
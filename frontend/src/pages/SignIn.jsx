import React from 'react'

const SignIn = () => {
  return (
    <div>
        <form>
            <input type="email" />
            
            <input type="password" />
            
            <button 
            className='border border-blue-400 bg-black text-white'
            type='submit'>Login</button>
        </form>
    </div>
  )
}

export default SignIn
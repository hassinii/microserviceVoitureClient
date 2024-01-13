import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import ApiConfig from '../services';
import ApiSecurity from '../services/security';

export default function Login() {
    const { toggleAuth } = useContext(AuthContext);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError] = useState("")

    const data = {
        'userName' :username,
        'userPassword':password
    }
    const navigate = useNavigate()

    const handleLogin = async () =>{
        console.log(data);
        axios.post(ApiSecurity+"/authenticate",data)
        .then(res =>{
            sessionStorage.setItem("isAuthenticated",true)
            localStorage.setItem("token",res.data.jwtToken)
            toggleAuth()
            navigate('/clients');
        }).catch(error =>{
            console.log(error);
            setError("Username or password incorrect")
            setTimeout(() => {
                setError("")
            }, 2000);
        })
       
    }
   
    
  return (
    <div >
    <div className='card col-md-4 offset-md-4 mt-3'>
        <div className='card-header'>
            <div className='card-title'>
                <h6>Login</h6>
            </div>
        </div>

        <div className='card-body'>
            <div >
                <label className='form-label'>Username</label>
                <input className='form-control' placeholder='username' onChange={(e) =>{
                    setUsername(e.target.value)
                }}/>

            </div>

            <div >
                <label className='form-label'>password</label>
                <input className='form-control' type='password' placeholder='password' onChange={(e) =>{
                    setPassword(e.target.value)
                }}/>
            </div>
            <div className='text-align-center justify-content-center d-flex text-danger'>
                <span>{error}</span>
            </div>

            <div>
                <button className='btn btn-primary mt-3' onClick={handleLogin}>sign in</button>
            </div>
        </div>
    </div>
    </div>
  )
}

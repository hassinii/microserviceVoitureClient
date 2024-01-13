import React, { useState } from 'react'
import axios from 'axios'
export default function Create() {

    const [name, setName] = useState("")
    const [age, setAge] = useState("")

    

    const handleSubmit = async () => {
        const dataJson ={
            'nom':name,
            'age' :age
        }
        await axios.post("http://localhost:8088/clients/save", dataJson)
            .then(response => {
                console.log(response.status);
                console.log(response.data);
                window.location.href ='/clients'
            }).catch(error => {
                console.log(error);
            })

    }

  return (
    <div className='card col-md-4 offset-md-4 mt-3'>
        <div className='card-header'>
            <div className='card-title'>
                <h6>Create new Client</h6>
            </div>

            <div className='card-body'>
                <div>
                    <label className='form-label'>Name</label>
                    <input className='form-control'  type='text' placeholder='name' onChange={(e) =>{
                        setName(e.target.value)
                    }}/>

                    <label className='form-label'>Age</label>
                    <input  className='form-control' placeholder='age' onChange={(e) =>{
                        setAge(e.target.value)
                    }}/>

                    <button className='btn btn-primary mt-3' onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>

    </div>
  )
}

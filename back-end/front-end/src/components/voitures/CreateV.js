import React, { useState,useEffect } from 'react'
import axios from 'axios'
import API_CLIENT from '../../services/client'
export default function CreateV() {

    const [marque, setMarque] = useState("")
    const [modele, setModele] = useState("")
    const [matricule, setMatricule] = useState("")
    const [client, setClient] = useState("")
    const [data, setDate] = useState([])


    const getData = async () => {
        // console.log(REACT_APP_API);
        await axios.get("http://localhost:8088" + "/clients")
            .then(response => {
                console.log(response.data);
                setDate(response.data)
            }).catch(error => {
                console.log(error);
            })
    }


    const handleSubmit = async () => {
        const dataJson ={
            'matricule':matricule,
            'marque' :marque,
            'model':modele,
            'clientId':client
        }
        await axios.post("http://localhost:8089/voitures", dataJson)
            .then(response => {
                console.log(response.status);
                console.log(response.data);
                window.location.href='/cars'

            }).catch(error => {
                console.log(error);
            })

    }

    useEffect(() => {
        getData()
    })

  return (
    <div className='card col-md-4 offset-md-4 mt-3'>
        <div className='card-header'>
            <div className='card-title'>
                <h6>Créer une nouvelle voiture</h6>
            </div>

            <div className='card-body'>
    <div>
        <label className='form-label'>Marque</label>
        <input className='form-control' type='text' placeholder='Marque' onChange={(e) => {
            setMarque(e.target.value)
        }} />

        <label className='form-label'>Modèle</label>
        <input className='form-control' placeholder='Modèle' onChange={(e) => {
            setModele(e.target.value)
        }} />

        <label className='form-label'>Matricule</label>
        <input className='form-control' placeholder='Matricule' onChange={(e) => {
            setMatricule(e.target.value)
        }} />

        <label className='form-label'>Client</label>
        <select className='form-control' onChange={(e) => {
            setClient(e.target.value)
        }}>
            <option value='' disabled selected>Select Client</option>

            {data.map((e, index) => (
                <option value={e.id}>{e.nom}</option>
            ))}

            {/* Ajoutez d'autres options au besoin */}
        </select>

        <button className='btn btn-success mt-3' onClick={handleSubmit}>Create</button>
    </div>
</div>

            
        </div>

    </div>
  )
}
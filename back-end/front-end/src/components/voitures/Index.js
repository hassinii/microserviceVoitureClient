import axios from 'axios'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPerson, faEye } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import ApiConfig from '../../services'
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import API_CLIENT from '../../services/client'
import API_Voiture from '../../services/voiture'
import $ from 'jquery';
import 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-responsive-dt/js/responsive.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import logoP from '../../assets/person.png'

import logo from '../../assets/car.png'
import logo1 from '../../assets/car1.png'
import logo2 from '../../assets/car2.png'
import logo3 from '../../assets/car3.png'
import logo4 from '../../assets/car4.png'
import logo5 from '../../assets/car5.png'
import logo6 from '../../assets/car2.png'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };







export default function Index() {
    
    const [isUpdate, setUpdate] = useState(false)
    const [data, setDate] = useState([])
    const [open,setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [load,setLoad] = useState(false)
    const [dataJson, setDataJson] = useState({
        'id':null,
        'matricule': "",
        'marque': "",
        'model':"",
        'client':null,
        'clientId':null
      });

    const [images,setImages] = useState([logo,logo1,logo2,logo5,logo4,logo3])

    const [users, setUsers] = useState([])
    const [successUpdate, setSuccessUpdate] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)
    const [loadDataTable, setLoadDataTable] = useState(false)
    const [client, setClient] = useState("")
    const [ageClient,setAgeClient] = useState('')
    const [ showw, setShoww] = useState(false)
    const [errorClient, setErrorClient] = useState(false)


    
    const getData = async () =>{
        await axios.get(ApiConfig+"/SERVICE-VOITURE/voitures")
        .then(response =>{
            console.log(response.data);
            setDate(response.data)
            setLoadDataTable(!loadDataTable)
        }).catch(error =>{
            console.log(error);
        })
    }

    const loadUsers =  async() =>{
        axios.get(API_CLIENT+"/clients")
        .then(response =>{
            setUsers(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

    const edit = async (id) =>{
        console.log("edit voitures "+ id);
        await axios.get(ApiConfig+"/SERVICE-VOITURE/voitures/"+id)
        .then(response =>{
            console.log(response.data);
            setDataJson({
                ...dataJson,
                'id':response.data.id,
                'matricule': response.data.matricule,
                'model': response.data.model,
                'marque': response.data.marque,
                'client': response.data.client,
                'clientId': response.data.clientId
              });
            setOpen(true)
            setUpdate(true)
            
        })
        .catch(error =>{
            console.log(error);
        })
    }

     
    const showClient = async(id) =>{
        axios.get(API_Voiture+"/voitures/"+id)
        .then(response =>{
            setClient(response.data.client.nom)
            setAgeClient(response.data.client.age)
            setShoww(true)
        }).catch(error =>{
            setShoww(true)
            setErrorClient(true)
            console.log(error);
        })
    }


    useEffect(() =>{
        getData()
        loadUsers()
    },[load])

    

  return (
    <>
    <div className='card m-3'>
        <center><div className='card-header'>Liste des voitures </div></center>
        <div className='card-body'>
            <Stack sx={{ width: '100%' }} spacing={2}>
            {
                    success && 
                    <Alert variant="filled" severity="success" className='mb-2'>
                        New car created successfully!
                    </Alert>
                }
                {
                    successUpdate && 
                    <Alert variant="filled" severity="success" className='mb-2'>
                        Car updated successfully!
                    </Alert>
                }
                {
                    successDelete && 
                    <Alert variant="filled" severity="success" className='mb-2'>
                        Car deleted successfully!
                    </Alert>
                }
            </Stack>
            <div className='justify-content-end d-flex'>
            <button className='btn btn-primary mb-2' onClick={() =>{window.location.href = '/voiture/create'}}>creer une nouvelle voiture </button>
            </div>
            <table className='table table-bordered table-responsive' id='myTable'>
                <thead className='table-info'>
                <tr>
                  
                    <td>Marque</td>
                    <td>Model</td>
                    <td>Matricule</td>
                    <td>Actions</td>
                </tr>
                </thead>

                <tbody>
                    {data.map((e, index) => (
                        <tr key={index}>
                           
                            <td>{e.marque}</td>
                            <td>{e.model}</td>
                            <td>{e.matricule}</td>
                            <td>
                            
                            <button className='btn btn-primary m-2' onClick={() =>edit(e.id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>

                            <button className='btn btn-info m-2' onClick={() =>{showClient(e.id)}}>
                                <FontAwesomeIcon icon={faEye} />
                            </button>


                            <button className='btn btn-danger m-2' onClick={() =>{
                                setShow(true)
                                setDeleteId(e.id)
                            }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>


    </>
  )
}

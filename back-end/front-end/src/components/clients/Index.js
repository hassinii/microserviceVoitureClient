import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faEdit, faEye, faShower, faTrash, faVideo } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Card } from '@mui/material'
import ApiConfig from '../../services'
import API_CLIENT from '../../services/client'

import Alert from '@mui/material/Alert';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import logoP from '../../assets/person.png'




// import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import IconButton from '@mui/material/IconButton';



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


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export default function Index() {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    const [isUpdate, setUpdate] = useState(false)
    const [data, setDate] = useState([])
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [load, setLoad] = useState(false)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [id, setId] = useState(100)
    const [successUpdate, setSuccessUpdate] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)
    const [cars, setCars] = useState([])
    const [showCar, setShowCar] = useState(false)
    const [images, setImages] = useState([logo, logo1, logo2, logo5, logo4, logo3])
    const [client, setClient] = useState('')
    const [errorServiceCar, setErrorServiceCar] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setDataJson({
            ...dataJson,
            'id': null,
            'nom': "",
            'age': ""
        });
        setUpdate(false)
    };

    const [dataJson, setDataJson] = useState({
        'id': id,
        'nom': name,
        'age': age
    });


    const handleSubmit = async () => {
        console.log(dataJson);
        await axios.post("http://localhost:8088/clients/save", dataJson)
            .then(response => {
                console.log(response.status);
                console.log(response.data);
                handleClose()
                setLoad(!load)
                setSuccess(true)

            }).catch(error => {
                console.log(error);
            })

        setTimeout(() => {
            setSuccess(false);
        }, 3000);

    }

    const getData = async () => {
        // console.log(REACT_APP_API);
        await axios.get("http://localhost:8888" + "/SERVICE-CLIENT/clients")
            .then(response => {
                console.log(response.data);
                setDate(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    const handleDelete = async (id) => {
        console.log(deleteId);
        axios.delete(API_CLIENT + "/clients/delete/" + id)
            .then(res => {
                setSuccessDelete(true)
            }).catch(error => {
                console.log(error);
            })
        setShow(false)


        setTimeout(() => {
            setSuccessDelete(false)
        }, 2000)

        setLoad(!load)
    }

    const edit = async (id) => {
        console.log("edit client " + id);
        await axios.get(ApiConfig + "/SERVICE-CLIENT/clients/" + id)
            .then(response => {
                console.log(response.data);
                setDataJson({
                    ...dataJson,
                    'id': response.data.id,
                    'nom': response.data.nom,
                    'age': response.data.age
                });
                setOpen(true)
                setUpdate(true)

            })
            .catch(error => {
                console.log(error);
            })
    }

    const update = async () => {
        console.log("update of data");
        console.log(dataJson);

        axios.put(API_CLIENT + "/clients/update", dataJson)
            .then(response => {
                console.log(response.data);

            }).catch(error => {
                console.log(error);
            })
        setOpen(false)
        setSuccessUpdate(true)
        setLoad(!load)

        setDataJson({
            ...dataJson,
            'age': "",
            'id': 100,
            'nom': ""
        })
        setUpdate(false)
        setTimeout(() => {
            setSuccessUpdate(false);
        }, 3000);
    }

    const handleCancel = () => {
        setShow(false)
    }

    const showCars = async (id) => {
        console.log(id);
        axios.get(API_CLIENT + "/clients/client/" + id)
            .then(res => {
                console.log(res.data);
                setCars(res.data.voitures)
                setClient(res.data.client.nom)
                setShowCar(true)
            }).catch(error => {
                console.log(error);
                setShowCar(true)
                setErrorServiceCar(true)
            })
    }

    const closeDialog = () => {
        setShowCar(false)
        setErrorServiceCar(false)

    }


    useEffect(() => {
        getData()
    }, [load])
    return (
        <>
            <div className='card m-3'>
                <center><div className='card-header'>Liste Des Clients </div></center>
                <div className='card-body'>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {
                            success &&
                            <Alert variant="filled" severity="success" className='mb-2'>
                                New client created successfully!
                            </Alert>
                        }
                        {
                            successUpdate &&
                            <Alert variant="filled" severity="success" className='mb-2'>
                                Client updated successfully!
                            </Alert>
                        }
                        {
                            successDelete &&
                            <Alert variant="filled" severity="error" className='mb-2'>
                                Client deleted successfully!
                            </Alert>
                        }
                    </Stack>
                    <div className='justify-content-end d-flex'>
                        <button className='btn btn-primary mb-2' onClick={() =>{window.location.href = '/client/create'} }>creer un nouveaux client</button>
                    </div>
                    <table className='table table-bordered table-responsive'>
                        <thead className='table-info'>
                            <tr>

                                <td>Name</td>
                                <td>Age</td>
                                <td>Actions</td>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((e, index) => (
                                <tr key={index}>
                                    <td>{e.nom}</td>
                                    <td>{e.age}</td>
                                    <td>

                                        <button className='btn btn-primary m-2' onClick={() => edit(e.id)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>

                                        <button className='btn btn-info m-2' onClick={() => { showCars(e.id) }}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>


                                        <button className='btn btn-danger m-2' onClick={() => {
                                            handleDelete(e.id)
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

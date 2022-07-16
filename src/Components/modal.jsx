import React, { useEffect, useState} from 'react';
import "/node_modules/primeflex/primeflex.css";
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import '../styles/modal.scss';
import { useDispatch } from 'react-redux'
import { memoryCatReducer } from '../Slice/memoryCatSlice'


const Modal = (props) => {
    const [imageData, setImageData] = useState({original_filename:'',breeds:[],url:'', categories: []});
    const [title, setTitle] = useState('');
    const dispatch = useDispatch()

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'J0da18173-45bc-4bd8-9871-b7041c31ebea'
    }
    useEffect(()=>{
        if(props.id_image){
            getImage(props.id_image);
        }
    }, [props.id_image]);

    useEffect(()=>{
        titles(props.category);
    }, [imageData])

   

    function getImage(id_image){
        axios.get(`https://api.thecatapi.com/v1/images/${id_image}`, {
            headers: headers
          })
          .then(function (response) {
            setImageData(response.data)    
            dispatch(memoryCatReducer(response.data));
          })
          .catch(function (error) {
            return error;
          });
    }

    const titles = (category) =>{
        if(category == 1){
            setTitle(imageData.name ? imageData.name:'No title available');
        }else{
            setTitle(imageData.original_filename ? imageData.original_filename:'No title available');
        }
    }


    return(
        <React.Fragment>
            <Dialog header={title} visible={props.open} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}} onHide={props.onClose} className="flex justify-content-center align-content-center">
                <div className='col-12 flex justify-content-center align-content-center'>
                    <div className="col-6 h-13rem flex justify-content-center align-content-center">
                        <img className='max-w-full max-h-full' src={imageData.url} alt="" />
                    </div>    
                </div>
                <div className='col-12 flex justify-content-center align-content-center'>
                    <div className="col-6 h-10rem flex justify-content-center align-content-center">
                        {
                            imageData.breeds ? 
                        imageData.breeds.map(element =>(
                            <div>{!element.description || element.description == '' ? 
                            "No information available at the moment, we are working on it :)":element.description}</div>
                        )): (<div>No information available at the moment, we are working on it :)</div>)
                        }
                    </div>    
                </div>
            </Dialog>
        </React.Fragment>
    )
}

export default Modal;

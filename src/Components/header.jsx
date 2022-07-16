import React, { useEffect, useState} from 'react';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import Content from './content';
import Logo from './../assets/img/cat_logo.jpg';
const Header = () => {
    const [breed, setSelectedBreed] = useState(null);
    const [breeds, setBreeds] = useState([]);
    const [content, setContent] = useState(1);
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'J0da18173-45bc-4bd8-9871-b7041c31ebea'
    }

   
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command:() =>{
                setContent(1);
            }
        },
        {
            label: 'History',
            icon: 'pi pi-fw pi-history',
            command:() =>{
                setContent(2);
            }
        }
    ];


    useEffect(()=>{
        axios.get('https://api.thecatapi.com/v1/breeds', {
            headers: headers
          })
          .then(function (response) {
            setBreeds(response.data);
          })
          .catch(function (error) {
            return error;
          });
    },[])

    const onCityChange = (e) => {
        setSelectedBreed(e.value);
    }

    const start = <img alt="logo" src={Logo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end =  <Dropdown value={breed} options={breeds} onChange={onCityChange} optionLabel="name" placeholder="Buscar por raza" />;
    
    
    return (
        <React.Fragment>
            <Menubar model={items} start={start} end={end} />
            <Content breed={breed} content={content}/>
        </React.Fragment>
    );
}

export default Header;
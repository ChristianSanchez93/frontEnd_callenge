import React, { useEffect, useState} from 'react';
import Modal from './modal';
import axios from 'axios';
import "/node_modules/primeflex/primeflex.css";
import '../styles/content.scss';
import { Carousel } from 'primereact/carousel';
import { useSelector} from 'react-redux'

const Content = (props) => {
    const [images, setImages] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(false);
    const [id_image, setIdImage] = useState(false);
    const memory = useSelector(state => state.memory.catsClicked);

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 6,
            numScroll: 6
        },
        {
            breakpoint: '820px',
            numVisible: 3,
            numScroll: 2
        },
        {
            breakpoint: '600px',
            numVisible: 3,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'J0da18173-45bc-4bd8-9871-b7041c31ebea'
    }
    useEffect(()=>{
        getBreeds(false);
        getImages(true, {limit: 6});
    },[]);

    useEffect(()=>{
        if(props.breed != null){
            getBreeds(true, {q:props.breed.name});
        }
    }, [props.breed])


    function getBreeds(specific, params = {}){
        let url = !specific ? 'https://api.thecatapi.com/v1/breeds':'https://api.thecatapi.com/v1/breeds/search';
        axios.get(url, {params: params},{
            headers: headers
          })
          .then(function (response) {
            !specific ? setImages(response.data):getImages(false,{breed_id: response.data[0].id});
          })
          .catch(function (error) {
            return error;
          });
    };

    function getImages(specific, params = {}){
        axios.get('https://api.thecatapi.com/v1/images/search',{
            params: params
          }, {
            headers: headers
          })
          .then(function (response) {
            !specific ? setImages(response.data):setFeatured(response.data);
            
          })
          .catch(function (error) {
            return error;
          });
    }

    const imageClick = (id_image, category) => {
        setOpen(true);
        setCategory(category);
        setIdImage(id_image);
    } 

    const onClose = () =>{
        setOpen(false);
    }

    const featureTemplate = (featured) => {
        return (
            <div className="border-circle w-8rem h-8rem">
                <img className='max-w-full max-h-full border-circle w-8rem h-8rem' src={featured.url} alt="" onClick={() => imageClick(featured.id, 1)} />
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="card">
                <div className="grid justify-content-center align-content-center w-full">
                    <div className="col-8">
                        <div className="grid featured">
                            <Carousel value={featured} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
                            itemTemplate={featureTemplate} header={<h5>Featured cats</h5>} />
                        </div>
                    </div>
                    
                </div>
                <div className="grid justify-content-center align-content-center w-full">
                    <div className="col-10">
                        <div className="flex flex-wrap justify-content-center align-content-center column-gap-8 row-gap-6 main-content">
                            {
                                props.content == 1 ?
                                images.map(element => (
                                    element.image || element.url ? 
                                    <div className="col-12 sm:col-12 md:col-3 lg:col-3 h-13rem flex justify-content-center align-content-center"><img className='max-w-full max-h-full' src={element.image ? element.image.url:element.url} alt="" onClick={() => imageClick(element.image ? element.image.id:element.id, 2)} /></div>:''
                                ))
                                :
                                memory.map(element => (
                                    element.image || element.url ? 
                                    <div className="col-12 sm:col-12 md:col-3 lg:col-3 h-13rem flex justify-content-center align-content-center"><img className='max-w-full max-h-full' src={element.image ? element.image.url:element.url} alt="" onClick={() => imageClick(element.image ? element.image.id:element.id, 2)} /></div>:''
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal open ={open} category={category} id_image={id_image} onClose={onClose}/>
        </React.Fragment>
    );
}

export default Content;
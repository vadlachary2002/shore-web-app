import React, { useState, useRef } from 'react';
import './Highlights.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getHighlights } from '../../services/Jobs';
import { useHistory } from 'react-router-dom';

interface Props{
  updateSearch?: (field:string,value:string|string[]|number)=>void
}

const Highlights = (props: Props) => {
  
  const { updateSearch } = props;
  const [ highlights, setHighlights] = useState([]);
  const [ error, setError ] = useState('');
  const sliderRef = useRef(null);
  const history = useHistory();

  const onClick = (title:string)=>{
    if(updateSearch){
      updateSearch('jobTitle',title);
      return;
    }
    history.replace({
      pathname:'/search',
      state: {jobTitle: title}
    });
  };

  const fetchHighlights = async ()=>{
    const res = await getHighlights();
    if(!res){
      setError('something went wrong');
      return ;
    }
    setHighlights(res);
  };
  React.useEffect(()=>{
    fetchHighlights();
  },[]);
  const slides = Math.round(window.screen.width/220);
  const slideSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: slides,
    slidesToScroll: 1,
    autoPlay: true,
    autoPlaySpeed: 1000 
  };
  return (
    <div className='highlights'>
      {highlights.length<=slides?
        <div className="special-h">{
          highlights.map((element:any)=>(
            <div key={element._id} className="special-items">
              <div className='item' onClick={()=>onClick(element._id)} >
                <span className='text'>{element._id}</span>
                <span className='count'>{element.count}</span>
              </div>
            </div>
          ))}</div>:
        <Slider {...slideSettings} ref={sliderRef}>
          {highlights.map((element:any)=>(
            <div key={element._id}>
              <div className='item' onClick={()=>onClick(element._id)} >
                <span className='text'>{element._id}</span>
                <span className='count'>{element.count}</span>
              </div>
            </div>
          ))}
        </Slider>
      }
    </div> 
  );
};

export default Highlights;
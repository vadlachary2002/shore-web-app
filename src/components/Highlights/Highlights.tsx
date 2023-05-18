import React from 'react';
import './Highlights.scss';

const Highlights = () => {
  return (
    <div className='highlights'>
      <div className='item'>
        <span className='text'>Medical Doctor</span>
        <span className='count'>9</span>
      </div>
      <div className='item'>
        <span className='text'>Lab Manager</span>
        <span className='count'>19</span>
      </div>
      <div className='item'>
        <span className='text'>Staff Scientist</span>
        <span className='count'>102</span>
      </div>
      <div className='item'>
        <span className='text'>Research Scientist</span>
        <span className='count'>37</span>
      </div>
      <div className='item'>
        <span className='text'>Technician</span>
        <span className='count'>63</span>
      </div>
    </div>
  );
};

export default Highlights;
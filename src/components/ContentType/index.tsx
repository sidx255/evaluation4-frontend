import React from 'react';
import './ContentType.css';


const ContentType = () => {
  return (
    <div className='content-type'>
      <div className='content-type__header'>
        <div className='content-type__header__left'>
          <p className='content-type__header__left__text'>CONTENT TYPES</p>
        </div>
        <div className='content-type__header__right'>
          <p className='content-type__header__right__text'>CREATE</p>
        </div>
      </div>
      <div className='content-type__body'>
        <div className='content-type__body__left'>
          <p className='content-type__body__left__text'>CONTENT TYPES</p>
        </div>
        <div className='content-type__body__right'>
          <p className='content-type__body__right__text'>CREATE</p>
        </div>
      </div>
    </div>
  );
};

export default ContentType;
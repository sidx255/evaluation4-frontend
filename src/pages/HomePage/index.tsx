import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';

import Collections from '../../components/Collections/index';
import Modal from 'react-modal';

import makeRequest from '../../utils/makeRequest';

import pencil from '../../assets/pencil.png';
import trash from '../../assets/trash.png';
import edit from '../../assets/edit.png';


 
const HomePage: React.FC = () => {
  const [collection, setCollection] = React.useState<any>([]);
  const [details, setDetails] = React.useState<any>([]);
  const [detailscount, setDetailsCount] = React.useState<any>(0);
  const [contentType, setContentType] = React.useState<any>(false);
  const [fields, setFields] = React.useState('');

  // get object keys length
  const getKeysLength = (obj: any) => {
    return Object.keys(obj).length;
  };

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // Use state hook to store collection name
  const [collectionName, setCollectionName] = React.useState('');


  // const [showModal, setShowModal] = useState(false);

  // const handleOpen = () => setShowModal(true);
  // const handleClose = () => setShowModal(false);


  // Handle input change event
  const handleInputChange = (e: any) => {
    setCollectionName(e.target.value);
  };

  // // Handle form submit event
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Do something with collection name here
    console.log(collectionName);
    // Close modal
    setModalIsOpen(false);
  };

  // const handleFieldInputChange = (e: any) => {
  //   setFields(e.target.value);
  // };

  // // Handle form submit event
  // const handleFieldAdd = (e: any) => {
  //   e.preventDefault();
  //   // Do something with collection name here
  //   console.log(fields);
  //   // Close modal
  //   setModalIsOpen(false);
  // };

  // modal for adding entity
  const [modalIsOpen2, setModalIsOpen2] = React.useState(false);
  const [record, setRecord] = React.useState<any>([]);

  // handle entity input change
  const handleEntityInputChange = (e: any) => {
    setRecord(e.target.value);
  };

  // handle entity submit
  const handleEntitySubmit = (e: any) => {
    e.preventDefault();
    // Do something with collection name here
    console.log(record);
    // Close modal
    setModalIsOpen2(false);
  };



  const entity = () => {
    axios.get(`http://localhost:4000/content/fields/${collection.collection_id}`,{
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }})
      .then((res: any) => {
        // console.log(res);
        setDetails(res.data);
        setDetailsCount(res.data.length);
      }).catch((err: any) => {
        console.log(err);
      });
  };
  

  const handleNewType = (collection_name:any) => {
    // post request to create a new collection
    // axios.post('http://localhost:4000/collections', {
    //   collection_name: collection_name
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'authorization': localStorage.getItem('token')
    //   }})
    // console.log('XXXXXXXX');
    axios({
      method: 'post',
      url: 'http://localhost:4000/collections',
      data: { collection_name: collection_name },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then((res: any) => {
        console.log(res);
      }
      ).catch((err: any) => {
        console.log(err);
      }
      );
  };

  const addField = (field_name: any) => {
    const lastkey = Object.keys(fields).length;
    // post request to create a new field
    axios.post(`http://localhost:4000/fields/${collection.collection_id}`, {
      
      collection_id: collection.collection_id,
      fields:{
        [lastkey]: field_name
      }

    }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }
    }).then((res: any) => {
      console.log(res);
    }).catch((err: any) => {
      console.log(err);
    }
    );
  };

  const addEntity = (entity: any) => {
    // post request to create a new entity
    axios.post('http://localhost:4000/content/', {
      collection_id: collection.collection_id,
      values:
        entity
    }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }}).then((res: any) => {
      console.log(res);
    }).catch((err: any) => {
      console.log(err);
    }
    );
  };

  const deleteEntity = (content_id: any) => {
    // delete request to delete an entity
    axios.delete(`http://localhost:4000/content/${content_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }})
      .then((res: any) => {
        console.log(res);
        
      }).catch((err: any) => {
        console.log(err);
      }
      );
  };




  // const getFields = () => {
  //   axios.get(`http://localhost:4000/content/fields/${collection.collection_id}`)

  useEffect(() => {
    entity();
  }, [collection]);

  // console.log(details);


  return (
    <div className='body'>
      <div className='sidebar'>
        <div className='sidebar__header'>
          <div className='header'>
            <p className='header-text'>CMS+</p>
          </div>
          <div className='collection-type'>
            <p className='collection-type-text'>COLLECTION TYPES</p>
          </div>
          <div className='sidebar__info'>
            <Collections setCollection={setCollection}/>
          </div>
          <div className='content-type' >
            <p className='content-type-text' onClick={()=>setContentType(!contentType)}>CONTENT TYPE BUILDER</p>
          </div>
        </div>
      </div>
      {
        contentType?(
          <div className='middlebar'>
            <div className='middlebar__header'>
              <p>Content Types</p>
            </div>
            <div className='middlebar__body'>
              <div className='new-type' onClick={()=>{setModalIsOpen(true);}}>
                <Modal isOpen={modalIsOpen}>
                  <h2>Create Collection</h2>
                  <form onSubmit={handleSubmit}>
                    <label>Collection Name:</label>
                    <input type="text" value={collectionName} onChange={handleInputChange} />
                    <button type="submit" onClick={()=> {handleNewType(collectionName);}}>Create</button>
                  </form>
                  <button onClick={() => {setModalIsOpen(false);}}>Close</button>
                </Modal>
                <p className='new-type-text'>+ New Type</p>
              </div>

              <Collections setCollection={setCollection}/>
            </div>
          </div>
        ):(
          <div className='middlebar'>
          </div>
        )
      }
        
      {/* ----------------------------------------------------------*/}
      {!contentType?(
        <div className='main'>
          <div className='main_header'>
            <p>{collection.collection_name}</p>
          </div>
          <div className='main__info'>
            <div className='main__info__header'>
              <p className='entity-count'>{detailscount} entities found</p>
              <div className='edit-button'>
                <img src={pencil} alt='edit' onClick={()=>{setModalIsOpen2(true);}} />

                <Modal isOpen={modalIsOpen}>
                  <h2>Add entity</h2>
                  <form onSubmit={handleEntitySubmit}>

                    <label>Entity Name:</label>
                    <input type="text" value={record} onChange={handleEntityInputChange} />
                    <button type="submit" onClick={()=> {addEntity(record);}}>Create</button>
                  </form>
                  <button onClick={() => {setModalIsOpen2(false);}}>Close</button>
                </Modal>

              </div>
            </div>
            <div className='main__info__body'>
              <p className='attributes'>{
                details[0]?.fields?Object.keys(details[0].fields).map((key: any) => (
                  <p key={details} className='attribute-item'>{key}</p>
                ))
                  :<p>no data</p>
              }</p>

              {
                details.map((detail: any) => (
                  console.log(detail.fields),
                  <div className='main__info__body__item' key={detail.content_id}>
                    <p className='main__info__body__item__text'>{
                    }
                    </p>
                    <div className='entries'>
                      {
                        Object.keys(detail.fields).map((key: any) => (
                          <p key={detail}> {detail.fields[key]} </p>
                        ))
                      }
                    </div>
                    <div className='trash-button'>
                      <img src={trash} alt='trash' onClick={() => {deleteEntity(details[0].content_id);}}/>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      // {/* ----------------------------------------------------------*/}
      ):(
        <div className='main'>
          <div className='main_header'>
            <p>{collection.collection_name}</p>
          </div>
          <div className='count-fields'>
            <p>{getKeysLength(collection)} fields</p>
          </div>
          <div className='add-field'>
            <p className='field-text'>Add another field</p>
          </div>
          <div className='main__info'>
            {
              details.map((detail: any) => (
                <div className='body-item' key={detail.content_id}>
                  <table className='body-item-text'>{
                    Object.keys(detail.fields).map((key: any) => (
                      <tr className='items' key={detail}>
                        <td>{key}</td>
                        <td>string</td>
                      </tr>
                        
                    ))
                  }
                  </table>
                  
                </div>
              ))}
          </div>
        </div>  
      )}
    </div>
  );
};

export default HomePage;
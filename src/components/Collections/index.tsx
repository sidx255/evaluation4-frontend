
import React, { useEffect } from 'react';
// import './index.css';

import './Collections.css';

import makeRequest from '../../utils/makeRequest';
import {GET_COLLECTIONS} from '../../constants/apiEndPoints';

// make a request to the backend to get the collections
// and then render them in the sidebar


const Collections = ({setCollection}:any) => {
  const [collections, setCollections] = React.useState([]);
  useEffect(() => {
    makeRequest(GET_COLLECTIONS, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${localStorage.getItem('token')}`
      }
    })
      .then((res: any) => {
        setCollections(res);
        // console.log(collections);
      }).catch((err: any) => {
        console.log(err);
      });

  }, []);
    
  return (
    <div>
      <div className='collections'>
        {collections.map((collection: any, idx:any) => {
          return (
            <div key={collection.id} className="collections-text">
              <p onClick={()=> setCollection(collection)}>* {collection.collection_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
    
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {Users} from './user.js'
import Table from './table.js';
import Paginations from './pagination.js'

function DataTable() {
    const [posts, setPosts] = useState(Users)

    // const fetchData = async() => {        
    //     try{
    //         let config = {
    //             'x-rapidapi-key': '21ea0d55femsh60bf23d51e4808ap1e978ajsn9a44686d7506',
    //             'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    //           }
    //         const res = await axios.get('https://rapidapi.com/wirefreethought/api/geodb-cities', {headers: config})
    //         console.log('resss', res);            
    //         setPosts(res.data)            
    //     }
    //     catch(err){
    //         console.log('err', err);
    //     }
    // }   

// const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  headers: {
    'x-rapidapi-key': '21ea0d55femsh60bf23d51e4808ap1e978ajsn9a44686d7506',
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  }
};

const fetchData = async() => {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}


    useEffect(()=>{
        fetchData()
    },[])

  //   const options = async () => {
  //       axios({
  //           url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  //           method: 'get',
  //           headers: {
  //               'x-rapidapi-key': '21ea0d55femsh60bf23d51e4808ap1e978ajsn9a44686d7506',
  //               'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  //           }
  //        })
      
  //     try {
  //         const response = await axios.request(options);
  //         console.log(response.data);
  //     } catch (error) {
  //         console.error(error);
  //     }
  //   }

  //   useEffect(()=>{
  //     options()
  // },[])

    // useEffect(()=>{
    //     axios.get(
    //       "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    //       {
    //         headers: {
    //           'x-rapidapi-key': '21ea0d55femsh60bf23d51e4808ap1e978ajsn9a44686d7506',
    //           'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((err) => {
    //       console.log("API call error:", err.message);
    //     });
    // },[])

    const Keys = ['name', 'city', 'country', 'countryCode', 'regionCode']    

    const handleKeyDown = (event) => {
        if(event.key==='Enter'){
          // console.log('eewew', event.target.value);
           const result =  Users.filter((item)=>Keys.some((key)=>item[key].toLowerCase().includes(event.target.value)))
            // console.log('result', result);            
            setPosts(result)
        }
    }

  const [currentPage, setCurrentPage] = useState(1);
  let NUM_OF_RECORDS = posts.length;
  let LIMIT = 5;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = posts.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );
// console.log('currentData', currentData);

    return (
        <>
        <div className={'search_bar py-4 '}>
            <input 
            type='text'
            placeholder='search...'
            onKeyDown={handleKeyDown}
            className='search'
            />                       
        </div>
        <Table data={currentData} />
        <Paginations 
          totalRecords={NUM_OF_RECORDS}
          pageLimit={LIMIT}
          pageNeighbours={5}
          onPageChanged={onPageChanged}
          currentPage={currentPage}
        />
        </>
    )
}

export default DataTable

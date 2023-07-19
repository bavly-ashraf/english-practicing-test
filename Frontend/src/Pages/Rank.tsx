import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Rank = () => {
    // receiving state from Link (react-router-dom) using useLocation
    const {state} = useLocation();
    // rank state
    const [rank,setRank] = useState<number>(0);
    
    // using POST request to send score to back and get rank then setRank with fetched data
    useEffect(()=>{
        axios.post("http://localhost:3000/rank",{userScore:state})
        .then(response=>{setRank(response.data)})
        .catch(()=>alert("sorry can't connect to the server, please check your connection and try again"));
    },[]);

    return ( 
        <>
        <div className="container">
            <div className="row text-center m-2">
            <span className="badge bg-primary mt-5 m-auto fs-2" style={{height:"5rem",width:"15rem"}}>Your rank is <br /> {rank}</span>
            </div>
            <div className="row justify-content-center m-5">
                {/* using conditional rendering to render an svg according to user rank */}
                <img className='w-25' src={rank >= 90? "../src/assets/Images/gold-medal-svgrepo-com.svg": rank<50? "../src/assets/Images/football-field-svgrepo-com.svg": rank >= 50 && rank< 75? "../src/assets/Images/bronze-medal-svgrepo-com.svg" : "../src/assets/Images/silver-medal-svgrepo-com.svg"} alt='rank status' />
            </div>
            <div className="row">
                {/* link to get back to words path to try again */}
                <Link to='/words'><button className='btn btn-warning w-100'>Try again!!</button></Link>
            </div>
        </div>
        </> 
    );
}
 
export default Rank;
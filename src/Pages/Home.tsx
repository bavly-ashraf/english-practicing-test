import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <>
            <div className='container-fluid pb-2'>
                <h1 className='text-success text-center'>Part of speech practice</h1>
            </div>
            <div className='container d-flex flex-column justify-content-center' style={{height:"70vh"}}>
                <div className='row justify-content-center'>
                    <h2 className='col-12 text-center text-primary'>Welcome to the practice area!!</h2>
                    {/* link to get to words path to start practicing */}
                    <Link to='/words' className='col-4'><button className='btn btn-success w-100'>Start!!</button></Link>
                </div>
            </div>
        </>
    );
}
 
export default Home;
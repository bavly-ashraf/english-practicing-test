import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Words from '../Pages/Words';
import Rank from '../Pages/Rank';
import Home from '../Pages/Home';

const AppRoutes = () => {
    return ( <>
    {/* routes using react-router-dom v5 */}
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/words' element={<Words />} />
        <Route path='/rank' element={<Rank />} />
    </Routes>
    </> );
}
 
export default AppRoutes;
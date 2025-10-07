import React, { useState, useEffect } from "react";
import './Tools.scss';
import Zip2Terr from "./Zip2Terr";
import BlurbGenerator from "./BlurbGenerator";
import PharmaData from "./PharmaData";



const Tools = () => {



    return (
        <>
        <div className='tools-container'>
        <Zip2Terr/>
        <PharmaData/>
        </div>
        <BlurbGenerator />
        </>
    );
}

export default Tools;
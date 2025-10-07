import { useState } from "react";
import SPs from '../../assets/specialtyPharmacies.json';

const PharmaData = () => {
    const [spInput, setSpInput] = useState('');
    const [spName, setSpName] = useState('');
    const [spPhone, setSpPhone] = useState('');
    const [spFax, setSpFax] = useState('');
    const [spWeb, setSpWeb] = useState('');



    const findSPByName = (e) => {
        e.preventDefault();
        let foundSp = SPs.find(sp => sp["name"].toLowerCase().includes(spInput.toLowerCase()));
        setSpName(foundSp["name"]);
        setSpPhone(foundSp["phone"]);
        setSpFax(foundSp["fax"]);
        setSpWeb(foundSp["website"]);
        
    }

    return (
        <div className='tools'>
        <h2 className='title'>Find a Specialty Pharmacy</h2>
        <form type='submit' onSubmit={findSPByName}>
        <input type='text' placeholder='Search...' value={spInput} onChange={(e) => setSpInput(e.target.value)} />
        <p className="code">Name: {spName}</p>
        <p className="code">Phone: {spPhone}</p>
        <p className="code">Fax: {spFax}</p>
        <p className="code">Website: {spWeb}</p>
        <button className='btn-search' type='submit'>Search</button>
        </form>
        </div>
    )
}

export default PharmaData;
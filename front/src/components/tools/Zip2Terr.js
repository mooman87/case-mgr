import { useState } from 'react';
import zip2t from '../../assets/z2t.json';

const Zip2Terr = () => {
    const [zipInput, setZipInput] = useState('');
    const [caseManager, setCaseManager]= useState('');
    const [matchedExt, setMatchedExt] = useState('');

    const cleanZip2T = () => {
        for (let i = 0; i < zip2t.length; i++) {
            if (typeof zip2t[i]["Zipcode"] === "number") {
                zip2t[i]["Zipcode"] = zip2t[i]["Zipcode"].toString();
                while (zip2t[i]["Zipcode"].length < 5) {
                    zip2t[i]["Zipcode"] = "0" + zip2t[i]["Zipcode"];
                }
            }
        }
    }
    
    const findCMByZip = (e) => {
        e.preventDefault();
        cleanZip2T();
        let foundCm  = zip2t.find(cm => cm["Zipcode"] === zipInput);
        setCaseManager(foundCm["CM Name"]);
        setMatchedExt(foundCm["CM Ext"]);
        }

        return (
            <div className='tools'>
                <h2 className='title'>Find a Case Manager</h2>
                <form type='submit' onSubmit={findCMByZip}>
                    <input type='text' placeholder='Search...' value={zipInput} onChange={(e) => setZipInput(e.target.value)} />
                    <p className="code">If you have any questions regarding these benefit options, please contact your Case Manager, {caseManager}, at 800-xxx-xxxx, ext. {matchedExt}</p>
                    <button className='btn-search' type='submit'>Search</button>
                </form>
            </div>
        )
}

export default Zip2Terr;
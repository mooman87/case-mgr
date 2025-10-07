import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const blurbOptions = [
  {
    type: "Deductible",
    blurb: "Deductible does/does not apply.",
  },
  {
    type: "One Copay per DOS",
    blurb: "One copay applies per date of service.",
  },
  {
    type: "Prior Auth",
    blurb: "Prior authorization is/is not required.",
  },
  {
    type: "Prior Auth (Confirmed w/TWO reps)",
    blurb: "Prior authorization is/is not required. This was confirmed by ____(ref#) and ____(ref#).",
  },
  {
    type: "Not Covered (Medical)",
    blurb: "This product is not covered under the member's medical benefits.",
  },
  {
    type: "Not Covered (Pharmacy)",
    blurb: "This product is not covered under the member's pharmacy benefits.",
  },
  {
    type: "Third party",
    blurb: "Due to third party restrictions, we were unable to verify coverage for this product.",
  },
];

const BlurbGenerator = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [blurb, setBlurb] = useState("");
  const [benefitSummary, setBenefitSummary] = useState([]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case "Deductible":
        setBlurb(blurbOptions[0].blurb);
        break;
      case "One Copay per DOS":
        setBlurb(blurbOptions[1].blurb);
        break;
      case "Prior Auth":
        setBlurb(blurbOptions[2].blurb);
        break;
      case "Prior Auth (Confirmed w/TWO reps)":
        setBlurb(blurbOptions[3].blurb);
        break;
      case "Not Covered (Medical)":
        setBlurb(blurbOptions[4].blurb);
        break;
      case "Not Covered (Pharmacy)":
        setBlurb(blurbOptions[5].blurb);
        break;
      case "Third party":
        setBlurb(blurbOptions[6].blurb);
        break;
      default:
        setBlurb("");
        break;
    }
  };

  const handleAddBlurb = (e) => {
    e.preventDefault();
    setBenefitSummary([...benefitSummary, blurb]);
  };

  const copyBenefitSummary = (e) => {
    e.preventDefault();
    try {
      navigator.clipboard.writeText(benefitSummary);
      alert("Copied to clipboard!");
    }
    catch (err) {
      alert("An error occurred. Please try again.");
  }
  };

  return (
    <div className='tools-container'>
    <div className="tools">
      <h2 className="title">Blurb Generator</h2>
      <form type="submit">
        <select className="code" value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select a blurb</option>
          {blurbOptions.map((option) => (
            <option key={option.type} value={option.type}>
              {option.type}
            </option>
          ))}
        </select>
        <p className="code">{blurb}</p>
        <div className='add-blurb'><Fab onClick={handleAddBlurb} className='Add'><AddIcon /></Fab></div>
      </form>
    </div>
    <div className='tools'>
      <h2 className='title'>Copy Benefits Summary</h2>
      <p className='code'>{benefitSummary}</p>
      <div className='copy-blurb'><Fab onClick={copyBenefitSummary} className='Copy'><ContentCopyIcon /></Fab></div>
    </div>
    </div>
  );
};

export default BlurbGenerator;

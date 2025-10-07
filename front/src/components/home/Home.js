import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Case from "./Case";
import CaseEditor from "./CaseEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../util/domain";


function Home() {
  const [cases, setCases] = useState([]);
  const [caseEditorOpen, setCaseEditorOpen] = useState(false);
  const [editCaseData, setEditCaseData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) setCases([]);
    else getCases();
  }, [user]);

  async function getCases() {
    const casesRes = await Axios.get(`${domain}/cases/`);
    setCases(casesRes.data);
  }

  function editCase(caseData) {
    setEditCaseData(caseData);
    setCaseEditorOpen(true);
  }

  function renderCases() {
    let sortedCases = [...cases];
    sortedCases = sortedCases.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedCases.map((cases, i) => {
      return (
        <Case
          key={i}
          cases={cases}
          getCases={getCases}
          editCase={editCase}
        />
      );
    });
  }

  return (
    <div className="home">
      {!caseEditorOpen && user && (
        <button
          className="btn-editor-toggle"
          onClick={() => setCaseEditorOpen(true)}
        >
          Add case
        </button>
      )}
      {caseEditorOpen && (
        <CaseEditor
          setCaseEditorOpen={setCaseEditorOpen}
          getCases={getCases}
          editCaseData={editCaseData}
        />
      )}
      {cases.length > 0
        ? renderCases()
        : user && (
            <p className="no-cases-msg">No cases have been added yet.</p>
          )}
      {user === null && (
        <div className="no-user-message">
          {/* <img className="logo" src={logo} alt='crx logo'/> */}
          <h1 style={{fontFamily: "Courier New"}}>{`{YOUR LOGO HERE}`}</h1>
          <h2>Welcome to Case Manager</h2>
          <Link to="/register">Register here</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
import Axios from "axios";
import React from "react";
import domain from "../../util/domain";
import "./Case.scss";

function Case({ cases, getCases, editCase }) {
  async function deleteCase() {
    if (window.confirm("Do you want to delete this cases?")) {
      await Axios.delete(`${domain}/cases/${cases._id}`);

      getCases();
    }
  }

  return (
    <div className="cases">
      {cases.caseNumber && <h2 className="title">{cases.caseNumber}</h2>}
      {cases.caseType && (
        <p className="description">{cases.caseType}</p>
      )}
      {cases.caseStatus && (
        <p className="description">{cases.caseStatus}</p>
      )}
      {cases.caseNotes && (
        <pre className="code">
          <code>{cases.caseNotes}</code>
        </pre>
      )}
      <button className="btn-edit" onClick={() => editCase(cases)}>
        Edit
      </button>
      <button className="btn-delete" onClick={deleteCase}>
        Delete
      </button>
    </div>
  );
}

export default Case;
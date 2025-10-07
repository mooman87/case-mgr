import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./CaseEditor.scss";
import ErrorMessage from "../misc/ErrorMessage";
import domain from "../../util/domain";

function CaseEditor({ getCases, setCaseEditorOpen, editCaseData }) {
  const { caseID } = useParams();
  const [caseNumber, setCaseNumber] = useState("");
  const [caseType, setCaseType] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const [caseNotes, setCaseNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (editCaseData) {
      setCaseNumber(editCaseData.number ? editCaseData.number : "");
      setCaseType(editCaseData.type ? editCaseData.type : "");
      setCaseStatus(editCaseData.status ? editCaseData.status : "");
      setCaseNotes(editCaseData.notes ? editCaseData.notes : "");
    }

    let isMounted = true;

    const getCaseData = async () => {
      try {
        const response = await Axios.get(`${domain}/cases/${editCaseData._id}`);
        if(isMounted) {
          setCaseNumber(response.data.number ? response.data.number : "");
          setCaseType(response.data.type ? response.data.type : "");
          setCaseStatus(response.data.status ? response.data.status : "");
          setCaseNotes(response.data.notes ? response.data.notes : "");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.data.errorMessage) {
            setErrorMessage(err.response.data.errorMessage);
          }
        }
        return;
      }
    };

    getCaseData();

    return () => { isMounted = false; };

  }, [caseID, editCaseData]);


  async function saveCase(e) {
    e.preventDefault();

    const caseData = {
      caseNumber: caseNumber ? caseNumber : undefined,
      caseType: caseType ? caseType : undefined,
      caseStatus: caseStatus ? caseStatus : undefined,
      caseNotes: caseNotes ? caseNotes : undefined,
    }

    try {
      if (!editCaseData) await Axios.post(`${domain}/cases/`, caseData);
      else
        await Axios.put(
          `${domain}/cases/${editCaseData._id}`,
          caseData
        );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    getCases();
    closeEditor();
  }

  function closeEditor() {
    setCaseEditorOpen(false);
    setCaseNotes("");
    setCaseType("");
    setCaseStatus("");
    setCaseNumber("");
  }

  return (
    <div className="case-editor">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className="form" onSubmit={saveCase}>
        <label htmlFor="editor-title">Case number</label>
        <input
          id="editor-title"
          type="text"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
        />

        <label htmlFor="editor-description">Case Type</label>
        <input
          id="editor-description"
          type="text"
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
        />
        <label htmlFor ="editor-status">Case Status</label>
        <input
          id="editor-status"
          type="text"
          value={caseStatus}
          onChange={(e) => setCaseStatus(e.target.value)}
        />
        <label htmlFor="editor-code">Case Notes</label>
        <textarea
          id="editor-code"
          value={caseNotes}
          onChange={(e) => setCaseNotes(e.target.value)}
        />

        <button className="btn-save" type="submit">
          Save
        </button>
        <button className="btn-cancel" type="button" onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CaseEditor;
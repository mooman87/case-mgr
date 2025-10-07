import React, { useRef, useEffect, useState } from "react";
import {GoogleCharts} from 'google-charts';
import axios from 'axios';
import domain from '../../util/domain';
import './Dashboard.scss';


const Dashboard = () => {
  const caseStatusPieRef = useRef(null);
  const taskDistributionBarRef = useRef(null);
  const [taskData, setTaskData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    axios.get(`${domain}/cases/`)
      .then(res => {
        let caseData = res.data;
        let taskData = {};
        let statusData = {};
        caseData.forEach(caseObj => {
          if (taskData[caseObj.caseType]) {
            taskData[caseObj.caseType] += 1;
          } else {
            taskData[caseObj.caseType] = 1;
          }
          if (statusData[caseObj.caseStatus]) {
            statusData[caseObj.caseStatus] += 1;
          } else {
            statusData[caseObj.caseStatus] = 1;
          }
        })
        setTaskData(taskData);
        setStatusData(statusData);
        })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    setCaseCount(Object.values(statusData).reduce((a, b) => a + b, 0));
  }, [statusData]);

  GoogleCharts.load(() => {
    GoogleCharts.api.charts.load('current', {packages: ['corechart']});
    GoogleCharts.api.charts.setOnLoadCallback(() => {
      drawCaseStatusPie();
      drawTaskDistributionBar();
    });
  });
  
  
  GoogleCharts.load(drawCaseStatusPie);
  GoogleCharts.load(drawTaskDistributionBar);
  
  function drawCaseStatusPie() {
    const data = GoogleCharts.api.visualization.arrayToDataTable([["Status", "# of Cases"], ...Object.entries(statusData)]);
  
    const options = {
      title: "Cases worked by status",
      pieHole: 0,
      colors: ["#717fd1", "#ac71d1", "#c94d40", "#2ecc71"]
    };
  
    const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById("pie"));
  
    chart.draw(data, options);
    }
  
  function drawTaskDistributionBar() {
    const data = GoogleCharts.api.visualization.arrayToDataTable([
      ["Task", "# of Cases"],
      ...Object.entries(taskData)
    ]);
  
    const options = {
      title: "Cases worked by status",
      colors: ["#ac71d1", "#717fd1", "#c94d40", "#2ecc71"],
      legend: { position: "bottom" },
      vAxis: { title: "Task" },
      hAxis: { title: "Number of Cases" },
      animation: {
        startup: true,
        duration: 1000,
        easing: 'out',
      }
  
    };
  
    const chart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById("bar"));
  
    chart.draw(data, options);
  }
  


  return (
    <div className="dash-charts">
      <div ref={caseStatusPieRef} id='pie' />
      <div ref={taskDistributionBarRef} id='bar' />
      <p className='code'>Total Cases: {caseCount}</p>
    </div>
  );
};

export default Dashboard;

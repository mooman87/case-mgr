import React, { useRef } from "react";
import {GoogleCharts} from 'google-charts';
import './Dashboard.scss';


const DashboardDemo = () => {
  const caseStatusPieRef = useRef(null);
  const taskDistributionBarRef = useRef(null);

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
    const data = GoogleCharts.api.visualization.arrayToDataTable([
        ["Status", "# of Cases"],
        ["PA Follow Up", 32],
        ["PA Information Sent to MDO", 14],
        ["SP Follow Up in Progress", 17],
        ["Follow Up Requested", 5],
        ["Claim Appeal in Progress", 2] ]);
  
    const options = {
      title: "Cases worked by status",
      pieHole: 0,
      colors: ["#717fd1", "#ac71d1", "#c94d40", "#2ecc71"],
    };
  
    const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById("pie"));
  
    chart.draw(data, options);
    }
  
  function drawTaskDistributionBar() {
    const data = GoogleCharts.api.visualization.arrayToDataTable([
      ["Task", "# of Cases"],
      ["PA Follow Up", 20],
      ["Benefit Verification", 14],
      ["SP Triage", 7],
      ["Welcome Calls", 5],
      ["Case Follow Up", 42]

    ]);
  
    const options = {
      title: "Completed tasks by type",
      colors: ["#ac71d1", "#717fd1", "#c94d40", "#2ecc71"],
      legend: { position: "bottom" },
      vAxis: { title: "Number of Cases" },
      hAxis: { title: "Tasks" },
      animation: {
        startup: true,
        duration: 2000,
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
    </div>
  );
};

export default DashboardDemo;

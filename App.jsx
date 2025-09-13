import React, { useState } from "react";

export default function App() {
  const names = ["Newry sheetala","Ozone G block","Ozone F block","Ozone E1","Ozone D1","Ozone E2","Ozone D2","Ozone E6","Ozone E4","Ozone E3","Ozone D3","Ozone E2","Pearl Park view","Indiabulls","Isha","Rams sarovar","Mugunthan","KG Eyes","Ruby pride","Coromandel coral","Khurinjis","Paramount","Appaswasmy mapleyon","Akash Ganga to Natwest vijay","Ars Elite to Kirsha emerald","Sindur green","Sis Danube","Newry shanmita","Casagrand","Oliyas","Newry shernika"];

  const initialFormData = names.reduce((acc, name, index) => {
    acc[name] = (index === 0 || index === names.length - 1) ? "1" : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [finalResult, setFinalResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let cumulative = 0;
    const result = {};
    names.forEach((name) => {
      cumulative += Number(formData[name] || 0);
      result[name] = cumulative;
    });
    setFinalResult(result);
  };

  const handleDownloadImage = () => {
    if (!finalResult) return;

    // Create table content as SVG (acts like an image)
    let rows = Object.keys(finalResult).map(
      (key) =>
        `<tr>
          <td style="border:1px solid #000; padding:5px;">${key}</td>
          <td style="border:1px solid #000; padding:5px; text-align:center;">${finalResult[key]}</td>
        </tr>`
    ).join("");

    let svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="360" height="${Object.keys(finalResult).length * 30 + 60}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial; font-size:14px; background:#fff; padding:10px; text-align:center;">
            <h3 style="margin-bottom:10px;">Final Result</h3>
            <table style="width:100%; border-collapse:collapse; text-align:center;">
              <thead>
                <tr>
                  <th style="border:1px solid #000; padding:5px;">Name</th>
                  <th style="border:1px solid #000; padding:5px;">Value</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        </foreignObject>
      </svg>
    `;

    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "final_result.svg";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding:"20px", fontFamily:"Arial", background:"#f4f4f4", minHeight:"100vh" }}>
      <h1 style={{ textAlign:"center" }}>Cluster 3</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth:"500px", margin:"0 auto" }}>
        {names.map((name) => (
          <div key={name} style={{ marginBottom:"10px" }}>
            <label>{name}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder="Enter number"
              style={{ width:"100%", padding:"8px", marginTop:"4px", borderRadius:"6px", border:"1px solid #444" }}
            />
          </div>
        ))}
        <button type="submit" style={{ width:"100%", padding:"12px", border:"none", borderRadius:"6px", background:"#007bff", color:"#fff", fontWeight:"bold", cursor:"pointer" }}>Submit</button>
      </form>

      {finalResult && (
        <div style={{ maxWidth:"500px", margin:"20px auto" }}>
          <h2 style={{ textAlign:"center", marginBottom:"10px" }}>Final Result</h2>
          <table style={{ width:"100%", borderCollapse:"collapse", textAlign:"center" }}>
            <thead>
              <tr>
                <th style={{ border:"1px solid #000", padding:"8px" }}>Name</th>
                <th style={{ border:"1px solid #000", padding:"8px" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(finalResult).map((key) => (
                <tr key={key}>
                  <td style={{ border:"1px solid #000", padding:"8px" }}>{key}</td>
                  <td style={{ border:"1px solid #000", padding:"8px", textAlign:"center" }}>{finalResult[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDownloadImage} style={{ marginTop:"15px", width:"100%", padding:"12px", border:"none", borderRadius:"6px", background:"#28a745", color:"#fff", fontWeight:"bold", cursor:"pointer" }}>Download Image</button>
        </div>
      )}
    </div>
  );
}

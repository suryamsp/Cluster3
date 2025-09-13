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

    const padding = 20;
    const lineHeight = 30;
    const gap = 10; // gap between title and value
    const canvasWidth = 800;
    const canvasHeight = Object.keys(finalResult).length * lineHeight + padding * 2;

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw table header
    ctx.fillStyle = "#e0e0e0";
    ctx.font = "16px Arial";
    ctx.textBaseline = "top";
    ctx.fillText("Title", padding, padding);
    ctx.fillText("PPS Value", canvasWidth/2 + gap, padding);

    // Draw a line below header
    ctx.strokeStyle = "#555";
    ctx.beginPath();
    ctx.moveTo(padding, padding + lineHeight - 5);
    ctx.lineTo(canvasWidth - padding, padding + lineHeight - 5);
    ctx.stroke();

    // Draw each row
    let y = padding + lineHeight;
    Object.entries(finalResult).forEach(([title, value]) => {
      ctx.fillText(title, padding, y);
      ctx.fillText(value, canvasWidth/2 + gap, y);
      y += lineHeight;
    });

    // Download
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "final_result.png";
    link.click();
  };

  return (
    <div style={{ padding:"20px", fontFamily:"Arial", background:"#121212", color:"#e0e0e0", minHeight:"100vh" }}>
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
              style={{ width:"100%", padding:"8px", marginTop:"4px", borderRadius:"6px", border:"1px solid #444", background:"#2b2b2b", color:"#e0e0e0" }}
            />
          </div>
        ))}
        <button type="submit" style={{ width:"100%", padding:"12px", border:"none", borderRadius:"6px", background:"#007bff", color:"#fff", fontWeight:"bold", cursor:"pointer" }}>Submit</button>
      </form>

      {finalResult && (
        <div style={{ maxWidth:"600px", margin:"20px auto", display:"flex", flexDirection:"column", gap:"10px" }}>
          {/* Table style */}
          <div style={{ background:"#1e1e1e", padding:"10px", borderRadius:"8px" }}>
            <div style={{ display:"flex", gap:"10px", fontWeight:"bold", paddingBottom:"5px", borderBottom:"1px solid #555" }}>
              <span style={{ flex:1 }}>Title</span>
              <span style={{ flex:1 }}>PPS Value</span>
            </div>
            {Object.entries(finalResult).map(([title, value]) => (
              <div key={title} style={{ display:"flex", gap:"10px", padding:"5px 0" }}>
                <span style={{ flex:1 }}>{title}</span>
                <span style={{ flex:1 }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Download button */}
          <button onClick={handleDownloadImage} style={{ width:"100%", padding:"12px", border:"none", borderRadius:"6px", background:"#28a745", color:"#fff", fontWeight:"bold", cursor:"pointer" }}>Download Image</button>
        </div>
      )}
    </div>
  );
}

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
    const canvasWidth = 800;
    const canvasHeight = Object.keys(finalResult).length * lineHeight + padding * 5 + lineHeight; // extra for title + headers

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Table title (centered)
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textBaseline = "top";
    const titleText = "Cluster 3 Result";
    const titleWidth = ctx.measureText(titleText).width;
    ctx.fillText(titleText, (canvasWidth - titleWidth) / 2, padding);

    // Column headers
    const startY = padding + lineHeight + 10;
    ctx.fillStyle = "#e0e0e0";
    ctx.font = "16px Arial";

    const col1X = padding;
    const col2X = canvasWidth / 2 + 10;
    ctx.fillText("Title", col1X + 50, startY); // adjust for visual centering
    ctx.fillText("PPS Value", col2X, startY);

    // Horizontal line below headers
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, startY + lineHeight - 5);
    ctx.lineTo(canvasWidth - padding, startY + lineHeight - 5);
    ctx.stroke();

    let y = startY + lineHeight;

    Object.entries(finalResult).forEach(([title, value]) => {
      // Draw text
      ctx.fillStyle = "#e0e0e0";
      ctx.fillText(title, col1X, y + 5);
      ctx.fillText(value, col2X, y + 5);

      // Horizontal line for each row
      ctx.strokeStyle = "#555";
      ctx.beginPath();
      ctx.moveTo(padding, y + lineHeight);
      ctx.lineTo(canvasWidth - padding, y + lineHeight);
      ctx.stroke();

      y += lineHeight;
    });

    // Vertical line separating columns
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, startY - 5);
    ctx.lineTo(canvasWidth / 2, canvasHeight - padding);
    ctx.stroke();

    // Download
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "final_result_table.png";
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
        <div style={{ maxWidth:"700px", margin:"20px auto", display:"flex", flexDirection:"column", gap:"10px" }}>
          {/* HTML Table */}
          <table style={{ width:"100%", borderCollapse:"collapse", background:"#1e1e1e", color:"#e0e0e0" }}>
            <thead>
              <tr>
                <th colSpan={2} style={{ border: "1px solid #555", padding:"10px", textAlign:"center", fontSize:"18px" }}>Cluster 3 Result</th>
              </tr>
              <tr>
                <th style={{ border: "1px solid #555", padding:"8px", textAlign:"center" }}>Title</th>
                <th style={{ border: "1px solid #555", padding:"8px", textAlign:"center" }}>PPS Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(finalResult).map(([title, value]) => (
                <tr key={title}>
                  <td style={{ border: "1px solid #555", padding:"8px", textAlign:"left" }}>{title}</td>
                  <td style={{ border: "1px solid #555", padding:"8px", textAlign:"center" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Download Button */}
          <button onClick={handleDownloadImage} style={{ width:"100%", padding:"12px", border:"none", borderRadius:"6px", background:"#28a745", color:"#fff", fontWeight:"bold", cursor:"pointer" }}>Download Image</button>
        </div>
      )}
    </div>
  );
}

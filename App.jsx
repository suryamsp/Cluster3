import React, { useState } from "react";

export default function App() {
  const names = [
    "Newry sheetala",
    "Ozone G block",
    "Ozone F block",
    "Ozone E1",
    "Ozone D1",
    "Ozone E2",
    "Ozone D2",
    "Ozone E6",
    "Ozone E4",
    "Ozone E3",
    "Ozone D3",
    "Ozone E2",
    "Pearl Park view",
    "Indiabulls",
    "Isha",
    "Rams sarovar",
    "Mugunthan",
    "KG Eyes",
    "Ruby pride",
    "Coromandel coral",
    "Khurinjis",
    "Paramount",
    "Appaswasmy mapleyon",
    "Akash Ganga to Natwest vijay",
    "Ars Elite to Kirsha emerald",
    "Sindur green",
    "Sis Danube",
    "Newry shanmita",
    "Casagrand",
    "Oliyas",
    "Newry shernika"
  ];

  // Only first and last input default to "1"
  const initialFormData = names.reduce((acc, name, index) => {
    acc[name] = (index === 0 || index === names.length - 1) ? "1" : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [finalResult, setFinalResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
      setFinalResult(null); // reset result when changing input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = {};
    let cumulative = 0;
    names.forEach((name) => {
      const val = Number(formData[name] || 0);
      cumulative += val;
      result[name] = cumulative;
    });
    setFinalResult(result);
    setFormData(initialFormData); // reset form (first & last = 1)
  };

  const handleDownload = () => {
    if (!finalResult) return;
    let content = "Final Result:\n";
    Object.keys(finalResult).forEach((key) => {
      content += `${key} = ${finalResult[key]}\n`;
    });
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "final_result.txt";
    link.click();
  };

  return (
    <div className="form-container">
      <style>{`
        body { margin:0; background:#121212; color:#e0e0e0; font-family:Arial,sans-serif; }
        .form-container { width:95%; max-width:500px; margin:20px auto; padding:20px; border-radius:12px; background:#1e1e1e; box-shadow:0 2px 8px rgba(0,0,0,0.5);}
        h1 { text-align:center; margin-bottom:20px; font-size:1.6rem; color:#fff; }
        .form-row { display:flex; flex-direction:column; margin-bottom:12px; }
        label { margin-bottom:5px; font-size:0.95rem; font-weight:600; color:#ccc; }
        input { padding:10px; border:1px solid #444; border-radius:8px; background:#2b2b2b; color:#e0e0e0; font-size:1rem; }
        input::placeholder { color:#888; }
        button { display:block; width:100%; margin-top:12px; padding:14px; border:none; border-radius:8px; cursor:pointer; font-size:1rem; font-weight:bold; }
        .submit-btn { background-color:#007bff; color:white; }
        .submit-btn:hover { background-color:#0056b3; }
        .download-btn { background-color:#28a745; color:white; }
        .download-btn:hover { background-color:#1e7e34; }
        .result-box { margin-top:20px; }
        .result-box h3 { margin-bottom:10px; font-size:1.2rem; text-align:center; color:#fff; }
        table { width:100%; border-collapse:collapse; margin-bottom:15px; }
        th, td { border:1px solid #555; padding:10px; text-align:center; font-size:0.9rem; }
        th { background-color:#2b2b2b; }
        td { background-color:#1e1e1e; }
        @media(max-width:480px) { .form-container { padding:15px; } input { padding:8px; font-size:0.85rem; } button { padding:10px; font-size:0.85rem; } table th, table td { padding:6px; font-size:0.8rem; } }
      `}</style>

      <h1>Cluster 3</h1>

      <form onSubmit={handleSubmit}>
        {names.map((name) => (
          <div key={name} className="form-row">
            <label>{name}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder="Enter number"
            />
          </div>
        ))}

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {finalResult && (
        <div className="result-box">
          <h3>Final Result</h3>
          <table>
            <thead>
              <tr><th>Title</th><th>PPS Value</th></tr>
            </thead>
            <tbody>
              {Object.keys(finalResult).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{finalResult[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDownload} className="download-btn">Download Result</button>
        </div>
      )}
    </div>
  );
}

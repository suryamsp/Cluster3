import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    Nuri: "",
    Ozone: "",
    Indiabulls: "",
  });

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

    const nuriVal = Number(formData.Nuri || 0);
    const ozoneVal = Number(formData.Ozone || 0);
    const indiabullsVal = Number(formData.Indiabulls || 0);

    const result = {
      Nuri: nuriVal,
      Ozone: nuriVal + ozoneVal,
      Indiabulls: nuriVal + ozoneVal + indiabullsVal,
    };

    setFinalResult(result);
    setFormData({ Nuri: "", Ozone: "", Indiabulls: "" });
  };

  const handleDownload = () => {
    if (!finalResult) return;
    const content = `Final Result:\nNuri = ${finalResult.Nuri}\nOzone = ${finalResult.Ozone}\nIndiabulls = ${finalResult.Indiabulls}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "final_result.txt";
    link.click();
  };

  return (
    <div className="form-container">
      <style>{`
        body {
          margin: 0;
          background: #121212;
          color: #e0e0e0;
          font-family: Arial, sans-serif;
        }
        .form-container {
          width: 95%;
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 12px;
          background: #1e1e1e;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 1.6rem;
          color: #ffffff;
        }
        .form-row {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }
        label {
          margin-bottom: 5px;
          font-size: 1rem;
          font-weight: 600;
          color: #ccc;
        }
        input {
          padding: 12px;
          border: 1px solid #444;
          border-radius: 8px;
          background: #2b2b2b;
          color: #e0e0e0;
          font-size: 1rem;
        }
        input::placeholder {
          color: #888;
        }
        button {
          display: block;
          width: 100%;
          margin-top: 12px;
          padding: 14px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
        }
        .submit-btn {
          background-color: #007bff;
          color: white;
        }
        .submit-btn:hover {
          background-color: #0056b3;
        }
        .download-btn {
          background-color: #28a745;
          color: white;
        }
        .download-btn:hover {
          background-color: #1e7e34;
        }
        .result-box {
          margin-top: 20px;
        }
        .result-box h3 {
          margin-bottom: 10px;
          font-size: 1.2rem;
          text-align: center;
          color: #ffffff;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        th, td {
          border: 1px solid #555;
          padding: 12px;
          text-align: center;
          font-size: 1rem;
        }
        th {
          background-color: #2b2b2b;
        }
        td {
          background-color: #1e1e1e;
        }
        @media (max-width: 480px) {
          .form-container {
            padding: 15px;
          }
          input {
            padding: 10px;
            font-size: 0.9rem;
          }
          button {
            padding: 12px;
            font-size: 0.9rem;
          }
          table th, table td {
            padding: 8px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <h1>Cluster 3</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-row">
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder="Enter number"
            />
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {finalResult && (
        <div className="result-box">
          <h3>Final Result</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nuri</td>
                <td>{finalResult.Nuri}</td>
              </tr>
              <tr>
                <td>Ozone</td>
                <td>{finalResult.Ozone}</td>
              </tr>
              <tr>
                <td>Indiabulls</td>
                <td>{finalResult.Indiabulls}</td>
              </tr>
            </tbody>
          </table>

          <button onClick={handleDownload} className="download-btn">
            Download Result
          </button>
        </div>
      )}
    </div>
  );
}

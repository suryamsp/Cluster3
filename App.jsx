  import React, { useState } from "react";

export default function App() {
  const names = [
    "casagrand", "Emmbassy" ,"FREN", "H", "G", "F",
    "E", "D", "C", "B", "A", "single order", "AKS", "Glo and mallis", "color Homes"
  ];

  const initialFormData = names.reduce((acc, name) => {
    acc[name] = "";
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

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        background: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Cluster 3</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
        }}
      >
        {names.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <label style={{ fontWeight: "bold", fontSize: "13px" }}>{name}</label>
            <input
              type="number"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder="Enter number"
              style={{
                width: "90%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #444",
              }}
            />
          </div>
        ))}

        <div style={{ gridColumn: "span 2" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              background: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>

      {finalResult && (
        <div style={{ maxWidth: "600px", margin: "20px auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Final Result</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Name</th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(finalResult).map((key) => (
                <tr key={key}>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>{key}</td>
                  <td style={{ border: "1px solid #000", padding: "8px" }}>{finalResult[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

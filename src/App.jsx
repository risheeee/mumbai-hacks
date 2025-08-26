// App.jsx
import React, { useState } from "react";
import "./App.css";

function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileUploaded(true);
    }
  };

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <h1 className="logo">MumbaiHacks Health Companion</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#monitoring">Monitoring</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#insurance">Insurance</a></li>
            <li><a href="#caregiver">Caregiver</a></li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main>
        {!fileUploaded ? (
          <section id="home">
            <div className="content-box">
              <h2>Welcome! Upload Your Discharge Report</h2>
              <p>
                To get started, please upload your post-discharge report for
                analysis.
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileUpload}
              />
            </div>
          </section>
        ) : (
          <>
            {/* DASHBOARD */}
            <section id="dashboard">
              <div className="content-box">
                <h2>Dashboard</h2>
                <p>
                  Overview of your health status based on the uploaded report:{" "}
                  <b>{fileName}</b>
                </p>
                <div className="stats">
                  <div className="stat-card">Recovery Progress: 75%</div>
                  <div className="stat-card">Next Checkup: In 5 days</div>
                </div>
              </div>
            </section>

            {/* MONITORING */}
            <section id="monitoring">
              <div className="content-box">
                <h2>Monitoring After Discharge</h2>
                <p>Track your vital signs and symptoms.</p>
                <div className="monitoring-cards">
                  <div className="card">Blood Pressure: Normal</div>
                  <div className="card">Heart Rate: 72 bpm</div>
                  <div className="card">Medication Reminders: On</div>
                </div>
              </div>
            </section>

            {/* REPORTS */}
            <section id="reports">
              <div className="content-box">
                <h2>Reports / Analysis</h2>
                <p>View detailed reports and analysis from your data.</p>
                <table className="reports-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2025-08-20</td>
                      <td>Blood Sugar</td>
                      <td>120 mg/dL</td>
                    </tr>
                    <tr>
                      <td>2025-08-22</td>
                      <td>BP</td>
                      <td>122/80</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* INSURANCE */}
            <section id="insurance">
              <div className="content-box">
                <h2>Insurance Claim Assistance</h2>
                <p>Get help with filing insurance claims.</p>
                <form className="insurance-form">
                  <input type="text" placeholder="Claim ID" />
                  <textarea placeholder="Description" rows="3" />
                  <button type="button">Submit Claim</button>
                </form>
              </div>
            </section>

            {/* CAREGIVER */}
            <section id="caregiver">
              <div className="content-box">
                <h2>Caregiver Mode</h2>
                <p>
                  Switch to caregiver view for managing multiple patients and
                  alerts.
                </p>
                <button>Enable Caregiver Mode</button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* FLOATING CHATBOT */}
      {fileUploaded && (
        <>
          <div className="chat-fab" onClick={() => setChatOpen(!chatOpen)}>
            💬
          </div>

          {chatOpen && (
            <div className="chat-overlay">
              <header>
                <span>AI Health Companion</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setChatOpen(false)}
                >
                  ✕
                </span>
              </header>

              <div style={{ padding: "12px" }}>
                <div className="chips" style={{ marginBottom: 10 }}>
                  <span className="chip">I felt dizzy after meds</span>
                  <span className="chip">What should I eat tonight?</span>
                  <span className="chip">Translate to Marathi</span>
                  <span className="chip">Remind my caregiver</span>
                </div>
              </div>

              <textarea
                placeholder="Type here… e.g., 'Had mild chest tightness after a 10-min walk'"
                rows={3}
              ></textarea>

              <div className="chat-actions">
                <button className="btn-primary">Send</button>
                <button className="btn-ghost">Voice</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* FOOTER */}
      <footer>
        <p>
          © 2025 MumbaiHacks Team — Agentic AI for Post-Discharge & Chronic Care
        </p>
      </footer>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  // ON-LOAD ANIMATION FOR HOME SECTION
  const [isHomeVisible, setIsHomeVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsHomeVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // SCROLL ANIMATION FOR ALL OTHER SECTIONS
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach((el) => observer.observe(el));
    
    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [fileUploaded]); // Re-run this effect when the file is uploaded to find the new sections

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileUploaded(true);
    }
  };

  return (
    <div className="App">
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

      <main>
        {!fileUploaded ? (
          <section id="home" className="upload-section">
            <div className="upload-box">
              <h2 className={`animate-on-scroll ${isHomeVisible ? "is-visible" : ""}`}>
                Transform Your Recovery Journey
              </h2>
              <p className={`animate-on-scroll ${isHomeVisible ? "is-visible" : ""}`} style={{transitionDelay: '200ms'}}>
                Upload your discharge report and unlock personalized health insights, monitoring, and care coordination.
              </p>
              <div className={`animate-on-scroll ${isHomeVisible ? "is-visible" : ""}`} style={{transitionDelay: '400ms'}}>
                <label htmlFor="file-upload" className="btn btn-accent">
                  🏥 Upload Your Report
                </label>
                <input id="file-upload" type="file" style={{display: 'none'}} onChange={handleFileUpload} />
              </div>
            </div>
          </section>
        ) : (
          <>
            <section id="dashboard">
              <div className="content-box animate-on-scroll">
                <h2>🎯 Your Health Dashboard</h2>
                <p style={{color: 'var(--text-dark)', fontSize: '1.1rem'}}>Comprehensive overview based on your uploaded report: <b>{fileName}</b></p>
                <div className="stats">
                  <div className="stat-card">
                    <div style={{fontSize: '2rem', marginBottom: '8px'}}>75%</div>
                    <div>Recovery Progress</div>
                  </div>
                  <div className="stat-card">
                    <div style={{fontSize: '2rem', marginBottom: '8px'}}>5</div>
                    <div>Days Until Checkup</div>
                  </div>
                  <div className="stat-card">
                    <div style={{fontSize: '2rem', marginBottom: '8px'}}>✅</div>
                    <div>All Vitals Normal</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="monitoring">
              <div className="content-box animate-on-scroll">
                <h2>📊 Continuous Monitoring</h2>
                <p style={{color: 'var(--text-dark)', fontSize: '1.1rem'}}>Real-time tracking of your vital signs and recovery metrics.</p>
                <div className="monitoring-cards">
                  <div className="card">
                    <div style={{fontSize: '1.5rem', marginBottom: '8px'}}>💓</div>
                    <div><strong>Heart Rate</strong></div>
                    <div>72 bpm - Normal</div>
                  </div>
                  <div className="card">
                    <div style={{fontSize: '1.5rem', marginBottom: '8px'}}>🩺</div>
                    <div><strong>Blood Pressure</strong></div>
                    <div>120/80 - Optimal</div>
                  </div>
                  <div className="card">
                    <div style={{fontSize: '1.5rem', marginBottom: '8px'}}>💊</div>
                    <div><strong>Medications</strong></div>
                    <div>All reminders active</div>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="reports">
              <div className="content-box animate-on-scroll">
                <h2>📈 Detailed Analytics</h2>
                <p style={{color: 'var(--text-dark)', fontSize: '1.1rem'}}>Comprehensive reports and trend analysis from your health data.</p>
                <table className="reports-table">
                  <thead>
                    <tr>
                      <th>📅 Date</th>
                      <th>📊 Metric</th>
                      <th>📋 Value</th>
                      <th>🎯 Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2025-08-20</td>
                      <td>Blood Sugar</td>
                      <td>120 mg/dL</td>
                      <td style={{color: '#4CAF50'}}>Normal</td>
                    </tr>
                    <tr>
                      <td>2025-08-22</td>
                      <td>Blood Pressure</td>
                      <td>122/80</td>
                      <td style={{color: '#4CAF50'}}>Excellent</td>
                    </tr>
                    <tr>
                      <td>2025-08-24</td>
                      <td>Weight</td>
                      <td>70 kg</td>
                      <td style={{color: '#FF9800'}}>Monitor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="insurance">
              <div className="content-box animate-on-scroll">
                <h2>🛡️ Insurance Made Simple</h2>
                <p style={{color: 'var(--text-dark)', fontSize: '1.1rem'}}>Streamlined insurance claim processing with AI assistance.</p>
                <form className="insurance-form">
                  <input type="text" placeholder="Enter your Claim ID" />
                  <input type="text" placeholder="Treatment Description" />
                  <textarea placeholder="Additional notes or concerns..." rows="4" />
                  <button type="button" className="btn btn-accent">
                    🚀 Submit Claim
                  </button>
                </form>
              </div>
            </section>

            <section id="caregiver">
              <div className="content-box animate-on-scroll">
                <h2>👥 Caregiver Dashboard</h2>
                <p style={{color: 'var(--text-dark)', fontSize: '1.1rem'}}>Comprehensive care coordination for healthcare providers and family members.</p>
                <div style={{textAlign: 'center', margin: '32px 0'}}>
                  <div style={{fontSize: '3rem', marginBottom: '16px'}}>👨‍⚕️</div>
                  <p style={{marginBottom: '24px', color: 'var(--text-dark)', fontSize: '1.1rem'}}>
                    Monitor multiple patients, receive alerts, and coordinate care seamlessly.
                  </p>
                  <button className="btn btn-accent">
                    🔄 Enable Caregiver Mode
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
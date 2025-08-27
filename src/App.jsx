import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, FileText, Heart, Shield, Users, Bot, User } from 'lucide-react';
import "./App.css";

// Floating Chatbot Component
const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Healthcare AI Assistant. I can help you with post-discharge care, medication reminders, insurance claims, and caregiver support. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Demo responses for hackathon
  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('medication') || message.includes('medicine') || message.includes('pills') || message.includes('dose')) {
      return {
        text: "📋 Based on your discharge summary, you're prescribed:\n• Metformin 500mg - twice daily (8 AM, 8 PM)\n• Lisinopril 10mg - once daily (morning)\n• Aspirin 75mg - once daily\n\nNext doses due in 2 hours. Would you like me to set reminders?",
        suggestions: ["Set medication reminders", "View side effects", "Mark as taken"]
      };
    }
    
    if (message.includes('insurance') || message.includes('claim') || message.includes('mediclaim') || message.includes('bill')) {
      return {
        text: "💰 Insurance Claim Analysis:\n• Total Bill: ₹45,230\n• Insurance Coverage: ₹40,000 (approved)\n• Your Copay: ₹5,230\n• Claim ID: HC2025-0827\n\nI can auto-fill your claim form with extracted data. Shall I proceed?",
        suggestions: ["Submit claim", "Check policy details", "Appeal coverage"]
      };
    }
    
    if (message.includes('caregiver') || message.includes('family') || message.includes('support') || message.includes('emergency')) {
      return {
        text: "👥 Caregiver Dashboard Active:\n• Emergency Contacts: Dr. Sharma, Family notified\n• Care Schedule: Daily vitals, wound care every 48hrs\n• Next Appointment: March 15th, 10 AM\n\nWould you like me to share your care plan with family members?",
        suggestions: ["Share care plan", "Add caregiver", "Emergency alert"]
      };
    }
    
    if (message.includes('monitor') || message.includes('vitals') || message.includes('health') || message.includes('bp')) {
      return {
        text: "📊 Current Health Status:\n• Blood Pressure: 128/82 mmHg (Good)\n• Heart Rate: 72 bpm (Normal)\n• Blood Sugar: 95 mg/dL (Excellent)\n• Temperature: 98.6°F (Normal)\n\nAll vitals are stable! Next check scheduled for tomorrow 9 AM.",
        suggestions: ["Update vitals", "View trends", "Schedule check-up"]
      };
    }

    if (message.includes('upload') || message.includes('document') || message.includes('report') || message.includes('extract')) {
      return {
        text: "🔍 Document Analysis Complete:\n• Patient: John Doe\n• Diagnosis: Type 2 Diabetes Management\n• Discharge: March 10, 2025\n• Follow-up: Dr. Patel - March 15, 2025\n\nAll medications, restrictions, and care instructions extracted successfully!",
        suggestions: ["View extracted data", "Upload new document", "Verify information"]
      };
    }

    if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
      return {
        text: "👋 Welcome to your Healthcare AI Assistant! I'm powered by advanced document processing and can help you navigate your post-discharge journey.\n\nI can assist with medication management, insurance processing, caregiver coordination, and health monitoring.",
        suggestions: ["Check my medications", "Process insurance claim", "Monitor my health", "Caregiver support"]
      };
    }
    
    // Default response
    return {
      text: "🤖 I'm here to help with your post-discharge healthcare needs! Try asking me about:\n\n• Medication schedules and reminders\n• Insurance claim processing\n• Health monitoring and vitals\n• Caregiver coordination\n\nWhat would you like to know?",
      suggestions: ["My medications", "Insurance status", "Health vitals", "Caregiver mode"]
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Floating Chat Button */}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-content">
              <Bot size={20} />
              <span>Healthcare AI Assistant</span>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.text.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < message.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  {message.suggestions && (
                    <div className="message-suggestions">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="suggestion-btn"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <Bot size={16} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about medications, insurance, monitoring..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={sendMessage} disabled={!inputMessage.trim()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

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
                <div className="insurance-form">
                  <input type="text" placeholder="Enter your Claim ID" />
                  <input type="text" placeholder="Treatment Description" />
                  <textarea placeholder="Additional notes or concerns..." rows="4" />
                  <button type="button" className="btn btn-accent">
                    🚀 Submit Claim
                  </button>
                </div>
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

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}

export default App;
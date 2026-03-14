import React, { useState } from 'react';

const App = () => {
  // Mock State for the UI Layout
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("English");

  return (
    <div style={styles.container}>
      {/* Header: Timer and Candidate Info */}
      <header style={styles.header}>
        <div style={styles.brand}>JAMB 2026 MOCK - PROCTORED</div>
        <div style={styles.timer}>Time Left: 01:59:45</div>
      </header>

      <div style={styles.mainLayout}>
        {/* Left Side: Question Area */}
        <section style={styles.questionArea}>
          <div style={styles.subjectTabs}>
            {["English", "Math", "Physics", "Chemistry"].map(sub => (
              <button key={sub} onClick={() => setSelectedSubject(sub)} style={styles.tab}>
                {sub}
              </button>
            ))}
          </div>

          <div style={styles.questionCard}>
            <h3>Question {currentQuestion}</h3>
            <p>What is the chemical symbol for Gold?</p>
            <div style={styles.options}>
              <label><input type="radio" name="q1" /> A. Ag</label><br/>
              <label><input type="radio" name="q1" /> B. Au</label><br/>
              <label><input type="radio" name="q1" /> C. Pb</label><br/>
              <label><input type="radio" name="q1" /> D. Fe</label>
            </div>
          </div>

          <div style={styles.navButtons}>
            <button style={styles.btn}>Previous</button>
            <button style={styles.btnPrimary}>Next</button>
          </div>
        </section>

        {/* Right Side: Proctoring & Navigation Grid */}
        <aside style={styles.sidebar}>
          <div style={styles.proctorBox}>
            <div style={styles.cameraPlaceholder}>
               {/* This is where ProctorFeed.jsx will go */}
               [Live AI Proctoring Feed]
            </div>
            <p style={{color: 'red'}}>Violations: 0 / 3</p>
          </div>

          <div style={styles.grid}>
             {/* Question Number Grid (1-40) */}
             {Array.from({ length: 40 }, (_, i) => (
               <div key={i} style={styles.gridItem}>{i + 1}</div>
             ))}
          </div>
          
          <button style={styles.submitBtn}>SUBMIT EXAM</button>
        </aside>
      </div>
    </div>
  );
};

// Simple Styles for the Interface
const styles = {
  container: { fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', height: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#007bff', color: 'white' },
  mainLayout: { display: 'flex', padding: '20px', gap: '20px' },
  questionArea: { flex: 3, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  sidebar: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
  subjectTabs: { display: 'flex', gap: '10px', marginBottom: '20px' },
  tab: { padding: '10px', cursor: 'pointer', border: 'none', backgroundColor: '#ddd' },
  questionCard: { minHeight: '200px' },
  options: { marginTop: '20px', lineHeight: '2.5' },
  navButtons: { marginTop: '30px', display: 'flex', gap: '20px' },
  btn: { padding: '10px 20px', cursor: 'pointer' },
  btnPrimary: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' },
  proctorBox: { backgroundColor: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center' },
  cameraPlaceholder: { width: '100%', height: '150px', backgroundColor: '#333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px', maxHeight: '300px', overflowY: 'auto' },
  gridItem: { padding: '10px', border: '1px solid #ccc', textAlign: 'center', cursor: 'pointer', fontSize: '12px' },
  submitBtn: { padding: '15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
};

export default App;
          

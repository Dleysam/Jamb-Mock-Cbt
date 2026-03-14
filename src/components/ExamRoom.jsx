import React, { useState, useEffect } from 'react';
import ProctorFeed from './ProctorFeed';

const ExamRoom = ({ questions, subjects }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [violations, setViolations] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [isFinished, setIsFinished] = useState(false);

  // 1. The Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) autoSubmit();
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 2. Violation Handler (The 3-Strike Rule)
  const handleViolation = (reason) => {
    const newCount = violations + 1;
    setViolations(newCount);
    
    if (newCount >= 3) {
      alert("CRITICAL VIOLATION: 3 strikes reached. Exam auto-submitting...");
      autoSubmit();
    } else {
      alert(`PROCTOR WARNING: ${reason}. Violation ${newCount}/3.`);
    }
  };

  const autoSubmit = () => setIsFinished(true);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    return <div style={styles.resultPage}>Exam Completed. Final Score calculation in progress...</div>;
  }

  const currentQ = questions[currentIdx];

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div>Candidate: D. Samson Olaleye</div>
        <div style={styles.timer}>TIMER: {formatTime(timeLeft)}</div>
        <div style={{color: violations > 0 ? 'red' : 'white'}}>VIOLATIONS: {violations}/3</div>
      </div>

      <div style={styles.main}>
        {/* Left: Question Area */}
        <div style={styles.questionSection}>
          <div style={styles.card}>
            <h3>Question {currentIdx + 1} of {questions.length}</h3>
            <p dangerouslySetInnerHTML={{ __html: currentQ?.question }}></p>
            
            <div style={styles.options}>
              {['a', 'b', 'c', 'd'].map(opt => (
                <label key={opt} style={styles.optionLabel}>
                  <input 
                    type="radio" 
                    name={`q-${currentIdx}`}
                    checked={answers[currentIdx] === opt}
                    onChange={() => setAnswers({...answers, [currentIdx]: opt})}
                  />
                  {currentQ?.option[opt]}
                </label>
              ))}
            </div>
          </div>

          <div style={styles.nav}>
            <button onClick={() => setCurrentIdx(i => Math.max(0, i-1))} style={styles.btn}>Previous</button>
            <button onClick={() => setCurrentIdx(i => Math.min(questions.length-1, i+1))} style={styles.btnPrimary}>Next</button>
          </div>
        </div>

        {/* Right: Proctoring & Grid */}
        <div style={styles.sideBar}>
          <ProctorFeed onViolation={handleViolation} />
          
          <div style={styles.grid}>
            {questions.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentIdx(i)}
                style={{
                  ...styles.gridItem,
                  backgroundColor: answers[i] ? '#28a745' : i === currentIdx ? '#007bff' : '#fff',
                  color: (answers[i] || i === currentIdx) ? '#fff' : '#000'
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <button onClick={autoSubmit} style={styles.submitBtn}>SUBMIT NOW</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f2f5' },
  topBar: { display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#1a237e', color: 'white', fontWeight: 'bold' },
  main: { display: 'flex', flex: 1, padding: '20px', gap: '20px', overflow: 'hidden' },
  questionSection: { flex: 3, display: 'flex', flexDirection: 'column', gap: '20px' },
  sideBar: { flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' },
  card: { backgroundColor: 'white', padding: '30px', borderRadius: '10px', flex: 1, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflowY: 'auto' },
  optionLabel: { display: 'block', padding: '10px', border: '1px solid #eee', marginBottom: '10px', borderRadius: '5px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px', overflowY: 'auto', padding: '10px', backgroundColor: '#fff', borderRadius: '10px' },
  gridItem: { padding: '8px', border: '1px solid #ddd', textAlign: 'center', cursor: 'pointer', borderRadius: '4px', fontSize: '12px' },
  btn: { padding: '10px 25px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' },
  btnPrimary: { padding: '10px 25px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white' },
  submitBtn: { padding: '15px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }
};

export default ExamRoom;
    

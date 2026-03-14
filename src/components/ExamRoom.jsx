import React, { useState, useEffect } from 'react';
import ProctorFeed from './ProctorFeed';
import QuestionCard from './QuestionCard';
import ResultPage from './ResultPage'; // Import the new ResultPage

const ExamRoom = ({ questions, subjects }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [violations, setViolations] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours
  const [isFinished, setIsFinished] = useState(false);
  const [activeSubject, setActiveSubject] = useState(subjects[0]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) autoSubmit();
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleViolation = (reason) => {
    const newCount = violations + 1;
    setViolations(newCount);
    if (newCount >= 3) {
      alert("CRITICAL: 3 violations. Submitting exam now.");
      autoSubmit();
    } else {
      alert(`WARNING: ${reason} (${newCount}/3)`);
    }
  };

  const autoSubmit = () => setIsFinished(true);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // When the exam ends, show the ResultPage with corrections
  if (isFinished) {
    return (
      <ResultPage 
        questions={questions} 
        userAnswers={answers} 
        onRestart={() => window.location.reload()} 
      />
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div style={styles.brand}>JAMB 2026 MOCK</div>
        <div style={styles.timer}>TIME: {formatTime(timeLeft)}</div>
        <div style={{ color: violations > 0 ? '#ff5252' : '#fff' }}>
          STRIKES: {violations}/3
        </div>
      </div>

      <div style={styles.subjectTabs}>
        {subjects.map(sub => (
          <button 
            key={sub} 
            onClick={() => setActiveSubject(sub)}
            style={{
              ...styles.tab,
              backgroundColor: activeSubject === sub ? '#fff' : 'transparent',
              color: activeSubject === sub ? '#1a237e' : '#fff'
            }}
          >
            {sub}
          </button>
        ))}
      </div>

      <div style={styles.main}>
        <div style={styles.questionSection}>
          <QuestionCard 
            questionData={questions[currentIdx]}
            questionNumber={currentIdx + 1}
            totalQuestions={questions.length}
            selectedOption={answers[currentIdx]}
            onOptionSelect={(opt) => setAnswers({...answers, [currentIdx]: opt})}
          />

          <div style={styles.nav}>
            <button onClick={() => setCurrentIdx(i => Math.max(0, i-1))} style={styles.btn}>Previous</button>
            <button onClick={() => setCurrentIdx(i => Math.min(questions.length-1, i+1))} style={styles.btnPrimary}>Next</button>
          </div>
        </div>

        <div style={styles.sideBar}>
          <ProctorFeed onViolation={handleViolation} />
          
          <div style={styles.gridContainer}>
            <p style={{fontSize: '12px', fontWeight: 'bold'}}>Question Navigation</p>
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
          </div>
          <button onClick={autoSubmit} style={styles.submitBtn}>FINISH EXAM</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f2f5', overflow: 'hidden' },
  topBar: { display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#1a237e', color: 'white', alignItems: 'center' },
  brand: { fontSize: '18px', fontWeight: 'bold' },
  subjectTabs: { display: 'flex', backgroundColor: '#283593', padding: '0 20px' },
  tab: { padding: '12px 20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
  main: { display: 'flex', flex: 1, padding: '15px', gap: '15px', overflow: 'hidden' },
  questionSection: { flex: 3, display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' },
  sideBar: { flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '250px' },
  nav: { display: 'flex', justifyContent: 'space-between', padding: '10px 0' },
  gridContainer: { backgroundColor: '#fff', padding: '10px', borderRadius: '8px', flex: 1, overflowY: 'auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', marginTop: '10px' },
  gridItem: { padding: '8px 0', border: '1px solid #ddd', textAlign: 'center', cursor: 'pointer', borderRadius: '4px', fontSize: '11px' },
  btn: { padding: '12px 25px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' },
  btnPrimary: { padding: '12px 25px', cursor: 'pointer', borderRadius: '6px', border: 'none', backgroundColor: '#007bff', color: 'white' },
  submitBtn: { padding: '15px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};

export default ExamRoom;
          

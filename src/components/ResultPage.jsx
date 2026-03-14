import React from 'react';

const ResultPage = ({ questions, userAnswers, onRestart }) => {
  // 1. Calculate Score
  let correctCount = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      correctCount++;
    }
  });

  // JAMB Score Scaling: (Correct / Total) * 400
  const aggregateScore = Math.round((correctCount / questions.length) * 400);

  return (
    <div style={styles.container}>
      <div style={styles.scoreCard}>
        <h1>Exam Result</h1>
        <div style={styles.scoreCircle}>
          <span style={styles.scoreNumber}>{aggregateScore}</span>
          <span style={styles.scoreLabel}>/ 400</span>
        </div>
        <p>You got {correctCount} out of {questions.length} questions correctly.</p>
        <button onClick={onRestart} style={styles.restartBtn}>Try Another Mock</button>
      </div>

      <div style={styles.correctionSection}>
        <h2>Corrections & Review</h2>
        <p>Review the questions you missed below:</p>
        
        {questions.map((q, index) => {
          const isCorrect = userAnswers[index] === q.answer;
          // Only show failed questions for review
          if (isCorrect) return null;

          return (
            <div key={index} style={styles.correctionCard}>
              <p style={styles.qText}><b>Q{index + 1}:</b> <span dangerouslySetInnerHTML={{ __html: q.question }} /></p>
              <div style={styles.answerComparison}>
                <div style={styles.wrongBox}>
                  <strong>Your Answer:</strong> {userAnswers[index] ? q.option[userAnswers[index]] : "Skipped"}
                </div>
                <div style={styles.rightBox}>
                  <strong>Correct Answer:</strong> {q.option[q.answer]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f8f9fa' },
  scoreCard: { textAlign: 'center', backgroundColor: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  scoreCircle: { width: '150px', height: '150px', borderRadius: '50%', border: '8px solid #007bff', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '20px auto' },
  scoreNumber: { fontSize: '40px', fontWeight: 'bold', color: '#007bff' },
  scoreLabel: { fontSize: '14px', color: '#666' },
  restartBtn: { padding: '12px 30px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' },
  correctionSection: { marginTop: '40px' },
  correctionCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginBottom: '15px', borderLeft: '5px solid #dc3545' },
  qText: { fontSize: '16px', marginBottom: '15px' },
  answerComparison: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  wrongBox: { backgroundColor: '#fff5f5', padding: '10px', borderRadius: '5px', color: '#c53030', fontSize: '14px' },
  rightBox: { backgroundColor: '#f0fff4', padding: '10px', borderRadius: '5px', color: '#2f855a', fontSize: '14px' }
};

export default ResultPage;

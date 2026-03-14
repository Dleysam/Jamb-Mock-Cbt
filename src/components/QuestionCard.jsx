import React from 'react';

const QuestionCard = ({ questionData, questionNumber, totalQuestions, selectedOption, onOptionSelect }) => {
  if (!questionData) return <div style={styles.card}>Loading question...</div>;

  const options = ['a', 'b', 'c', 'd'];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.badge}>Question {questionNumber} of {totalQuestions}</span>
      </div>

      <div style={styles.questionBox}>
        {/* Use dangerouslySetInnerHTML because Aloc API often sends HTML symbols like &pi; or <b> */}
        <p 
          style={styles.questionText} 
          dangerouslySetInnerHTML={{ __html: questionData.question }} 
        />
      </div>

      <div style={styles.optionsGrid}>
        {options.map((key) => (
          <div 
            key={key} 
            onClick={() => onOptionSelect(key)}
            style={{
              ...styles.optionItem,
              backgroundColor: selectedOption === key ? '#e7f1ff' : '#fff',
              borderColor: selectedOption === key ? '#007bff' : '#ddd'
            }}
          >
            <div style={{
              ...styles.radioCustom,
              backgroundColor: selectedOption === key ? '#007bff' : 'transparent',
              borderColor: selectedOption === key ? '#007bff' : '#ccc'
            }}>
              {selectedOption === key && <div style={styles.innerDot} />}
            </div>
            <span style={styles.optionLetter}>{key.toUpperCase()}.</span>
            <span 
              style={styles.optionText} 
              dangerouslySetInnerHTML={{ __html: questionData.option[key] }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', minHeight: '350px' },
  header: { marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  badge: { backgroundColor: '#1a237e', color: '#fff', padding: '5px 12px', borderRadius: '15px', fontSize: '12px' },
  questionBox: { marginBottom: '25px' },
  questionText: { fontSize: '18px', lineHeight: '1.6', color: '#333', fontWeight: '500' },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  optionItem: { display: 'flex', alignItems: 'center', padding: '15px', border: '2px solid', borderRadius: '8px', cursor: 'pointer', transition: '0.2s all' },
  radioCustom: { width: '20px', height: '20px', borderRadius: '50%', border: '2px solid', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  innerDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff' },
  optionLetter: { fontWeight: 'bold', marginRight: '10px', color: '#555' },
  optionText: { fontSize: '16px', color: '#444' }
};

export default QuestionCard;
          

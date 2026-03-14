import React, { useState } from 'react';

const SubjectSelection = ({ onStartExam }) => {
  const [selected, setSelected] = useState(["English"]);
  const electives = ["Mathematics", "Biology", "Physics", "Chemistry", "Government", "Economics", "Literature", "CRK"];

  const toggleSubject = (sub) => {
    if (selected.includes(sub)) {
      // Don't allow deselecting English
      if (sub === "English") return; 
      setSelected(selected.filter(item => item !== sub));
    } else {
      // Limit to 4 subjects total
      if (selected.length < 4) {
        setSelected([...selected, sub]);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Select Your Subject Combination</h2>
      <p>You must select <b>Use of English</b> and 3 other subjects.</p>
      
      <div style={styles.grid}>
        {electives.map(sub => (
          <div 
            key={sub} 
            onClick={() => toggleSubject(sub)}
            style={{
              ...styles.card, 
              backgroundColor: selected.includes(sub) ? '#28a745' : '#fff',
              color: selected.includes(sub) ? '#fff' : '#333'
            }}
          >
            {sub}
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <h3>Selected: {selected.join(", ")}</h3>
        <button 
          disabled={selected.length !== 4}
          onClick={() => onStartExam(selected)}
          style={{
            ...styles.startBtn,
            backgroundColor: selected.length === 4 ? '#007bff' : '#ccc'
          }}
        >
          START PROCTORED EXAM
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center', maxWidth: '600px', margin: 'auto' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' },
  card: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' },
  footer: { marginTop: '30px', padding: '20px', borderTop: '1px solid #eee' },
  startBtn: { padding: '15px 40px', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer' }
};

export default SubjectSelection;
      

import React, { useState } from 'react';
import SubjectSelection from './SubjectSelection';
import ExamRoom from './ExamRoom'; // To help me bring the main exam page
import { fetchSubjectQuestions } from '../services/alocService';

const ExamManager = () => {
  const [stage, setStage] = useState('selection'); 
  const [examData, setExamData] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]); // Store the actual subjects picked
  const [error, setError] = useState(null);

  const startExamFlow = async (selectedSubjects) => {
    setStage('loading');
    setSelectedSubs(selectedSubjects);
    try {
      const requests = selectedSubjects.map(subject => fetchSubjectQuestions(subject));
      const results = await Promise.all(requests);
      const flattenedQuestions = results.flat(); 
      
      if (flattenedQuestions.length > 0) {
        setExamData(flattenedQuestions);
        setStage('exam');
      } else {
        throw new Error("No questions found.");
      }
    } catch (err) {
      setError("Failed to load questions. Please check your internet.");
      setStage('selection');
    }
  };

  return (
    <div style={{ padding: '0px' }}> {/* Removed padding for full-screen feel */}
      {stage === 'selection' && (
        <SubjectSelection onStartExam={startExamFlow} />
      )}

      {stage === 'loading' && (
        <div style={styles.center}>
          <div className="loader"></div>
          <h2>Securing Exam Environment...</h2>
          <p>Fetching {selectedSubs.join(", ")} Questions...</p>
        </div>
      )}

      {stage === 'exam' && (
        <ExamRoom 
          questions={examData} 
          subjects={selectedSubs} 
        />
      )}

      {error && (
        <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

const styles = {
  center: { textAlign: 'center', marginTop: '100px' }
};

export default ExamManager;
      

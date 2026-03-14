import React, { useState } from 'react';
import SubjectSelection from './SubjectSelection';
import { fetchSubjectQuestions } from '../services/alocService';

const ExamManager = () => {
  const [stage, setStage] = useState('selection'); // stages: selection, loading, exam, finished
  const [examData, setExamData] = useState([]);
  const [error, setError] = useState(null);

  const startExamFlow = async (selectedSubjects) => {
    setStage('loading');
    try {
      // Fetch questions for all 4 subjects in parallel
      const requests = selectedSubjects.map(subject => fetchSubjectQuestions(subject));
      const results = await Promise.all(requests);
      
      // Combine all questions into one array or keep them grouped
      const flattenedQuestions = results.flat(); 
      
      if (flattenedQuestions.length > 0) {
        setExamData(flattenedQuestions);
        setStage('exam');
      } else {
        throw new Error("No questions found. Check your API token.");
      }
    } catch (err) {
      setError("Failed to load questions. Please try again.");
      setStage('selection');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {stage === 'selection' && (
        <SubjectSelection onStartExam={startExamFlow} />
      )}

      {stage === 'loading' && (
        <div style={styles.center}>
          <div className="loader"></div>
          <h2>Securing Exam Environment...</h2>
          <p>Fetching 2026 JAMB Questions & Initializing AI Proctor...</p>
        </div>
      )}

      {stage === 'exam' && (
        <div>
          {/* We will plug the ExamRoom UI here in the next step */}
          <h2 style={{color: 'green'}}>Exam Live: {examData.length} Questions Loaded</h2>
          <p>AI Proctoring Active: Stay within camera view.</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  center: { textAlign: 'center', marginTop: '100px' }
};

export default ExamManager;

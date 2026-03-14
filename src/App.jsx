import React from 'react';
import ExamManager from './components/ExamManager';

const App = () => {
  return (
    <div style={styles.appWrapper}>
      {/* Global CSS for the loading animation */}
      <style>
        {`
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #007bff;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* The Manager handles switching between Selection, Loading, and ExamRoom */}
      <main style={styles.mainContent}>
        <ExamManager />
      </main>

      <footer style={styles.footer}>
        <p>Candidate: Damilola Samson Olaleye | JAMB 2026 Proctored Mock</p>
        <p style={{fontSize: '10px'}}>Powered by Aloc API & TensorFlow.js</p>
      </footer>
    </div>
  );
};

const styles = {
  appWrapper: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  footer: {
    padding: '15px',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
    color: '#333'
  }
};

export default App;

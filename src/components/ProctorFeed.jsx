import React, { useRef, useEffect, useState } from 'react';

const ProctorFeed = ({ onViolation }) => {
  const videoRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);

  useEffect(() => {
    // 1. Access the Camera
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 320, height: 240 }, 
          audio: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera and Mic access are required for this proctored exam.");
      }
    };

    setupCamera();

    // Cleanup: Turn off camera when exam ends
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // Inside the component...
const playWarningSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); 
  audio.play();
};

const triggerViolation = (reason) => {
  playWarningSound();
  onViolation(reason); // This sends the signal back to the ExamManager
};
  

  return (
    <div style={styles.proctorContainer}>
      <div style={styles.videoWrapper}>
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          style={styles.video}
        />
        {/* Visual indicator that AI is watching */}
        <div style={styles.dot}>● REC</div>
      </div>
      <p style={styles.statusText}>
        {streamActive ? "AI Proctoring: Active" : "Initializing Camera..."}
      </p>
    </div>
  );
};

const styles = {
  proctorContainer: { backgroundColor: '#000', padding: '10px', borderRadius: '10px', textAlign: 'center' },
  videoWrapper: { position: 'relative', width: '100%', borderRadius: '5px', overflow: 'hidden' },
  video: { width: '100%', height: 'auto', transform: 'scaleX(-1)' }, // Mirror view
  dot: { position: 'absolute', top: '10px', left: '10px', color: 'red', fontSize: '12px', fontWeight: 'bold' },
  statusText: { color: '#fff', fontSize: '11px', marginTop: '5px' }
};

export default ProctorFeed;


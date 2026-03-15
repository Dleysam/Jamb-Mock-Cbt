# Jamb-Mock-Cbt

# Proctoring
A professional-grade Computer Based Test (CBT) platform designed for the 2026 JAMB Mock, featuring integrated Artificial Intelligence to monitor exam integrity.

# 🚀 Live Demo
Click here to view the live application (https://jamb-mock-cbt-guhw.vercel.app/)

# 🧠 Key Features
Real-time AI Proctoring: Uses TensorFlow.js and MoveNet to detect unauthorized body movements and head position violations.
Acoustic Monitoring: Integrated audio analysis to flag noise violations above a 65dB threshold.
3-Strike Integrity System: Automated warning system that auto-submits the exam upon the third violation.
Live Aloc API Integration: Fetches real-time JAMB past questions across multiple subjects including English, Mathematics, Physics, and more.
Automated Scoring: Instant calculation of aggregate scores (scaled to 400) with a detailed correction breakdown for failed questions.

# 🛠️ Tech Stack
Frontend: React.js (Vite)
AI/ML: TensorFlow.js
API: Aloc Question API
Styling: Modern CSS-in-JS (Responsive for Mobile/Desktop)
Deployment: Vercel

# 📂 Project Architecture
The project follows a modular "Services & Components" architecture:
services/alocService.js: Handles secure API communication.
services/proctorService.js: Contains the mathematical logic for noise and movement detection.
components/ProctorFeed.jsx: Manages hardware (Camera/Mic) permissions and live streaming.
components/ResultPage.jsx: Logic for score scaling and student feedback.

#👤 Author
Damilola Samson Olaleye (AI & Machine Learning Engineer)

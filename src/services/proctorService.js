export const checkNoiseLevel = (audioData, threshold = 65) => {
  // A simple volume check logic
  const volume = audioData.reduce((a, b) => a + b) / audioData.length;
  return volume > threshold; 
};

export const checkBodyMovement = (pose, boundary = 100) => {
  if (!pose) return false;
  const nose = pose.keypoints.find(k => k.name === 'nose');
  // If nose moves too far from the center of the screen
  return (nose.x < boundary || nose.x > (640 - boundary));
};


const ALOC_TOKEN = import.meta.env.VITE_ALOC_TOKEN; // questions bank
const BASE_URL = "https://questions.aloc.com.ng/api/v2/q/40"; // Fetching 40 questions at once

export const fetchSubjectQuestions = async (subject) => {
  try {
    const response = await fetch(`${BASE_URL}?subject=${subject.toLowerCase()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': ALOC_TOKEN
      }
    });
    const result = await response.json();
    return result.data; // This returns the array of 40 questions
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};


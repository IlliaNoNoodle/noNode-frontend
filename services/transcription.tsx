import axios from 'axios';

interface Audio {
  id: string;
  transcription?: {
    text: string;
  };
}

// Отримання транскрипції та створення зведення
export async function handleTranscriptionSummary(audioId: string, allAudios: Audio[]) {
    // Find the audio record by ID
    const audio = allAudios.find((item: Audio) => item.id === audioId);
  
    if (!audio || !audio.transcription?.text) {
      console.error('Transcription not found for audio ID:', audioId);
      return;
    }
  
    const transcriptionText = audio.transcription.text;
  
    // Send transcription to the backend
    try {
      const response = await axios.post(
        'http://localhost:8080/transcription/summary',
        { transcription: transcriptionText },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // Log and process any response
      console.log('Backend Response:', response.data);
      processSummary(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
          request: {
            method: error.config?.method,
            url: error.config?.url,
            data: error.config?.data,
          },
        });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

interface SummaryResponse {
  // Add expected response properties here
  summary: string;
  // other properties...
}

// Обробка результатів зведення
function processSummary(response: any) {
    console.log('Full Response Received:', response);
  
    // Check if the response has a 'summary' field
    if (response?.summary) {
      console.log('Processed Summary:', response.summary);
  
      // Add logic to handle the summary
      // For example: Update UI, save to state, etc.
    } else {
      console.warn('Response does not include a "summary" field.');
    }
  
    // Additional logic for other fields, if available
    if (Object.keys(response).length > 0) {
      console.log('Additional Response Data:', response);
    } else {
      console.error('Empty or unexpected response:', response);
    }
  }

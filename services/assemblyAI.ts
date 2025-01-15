import * as FileSystem from 'expo-file-system';

const ASSEMBLY_AI_API_KEY = '267c9ccd3c3c45a9ae83664e4b2f1b15';
const BASE_URL = 'https://api.assemblyai.com/v2';

interface TranscriptResponse {
  id: string;
  error?: string;
}

export const uploadAudioToAssemblyAI = async (audioUri: string, speakersCount: number = 2) => {
  try {
    console.log('Starting upload process for:', audioUri);
    const fileInfo = await FileSystem.getInfoAsync(audioUri);
    console.log('File info:', fileInfo);

    const uploadResponse = await FileSystem.uploadAsync(`${BASE_URL}/upload`, audioUri, {
      fieldName: 'file',
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        'authorization': ASSEMBLY_AI_API_KEY,
        'content-type': 'audio/m4a'
      }
    });

    if (!uploadResponse.status || uploadResponse.status !== 200) {
      throw new Error(`Upload failed with status ${uploadResponse.status}`);
    }

    const uploadResult = JSON.parse(uploadResponse.body);

    const transcriptResponse = await fetch(`${BASE_URL}/transcript`, {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLY_AI_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: uploadResult.upload_url,
        language_code: 'en',
        language_detection: false,
        speaker_labels: true,
        speakers_expected: speakersCount,
      })
    });

    const transcriptResult: TranscriptResponse = await transcriptResponse.json();
    
    if (transcriptResult.error) {
      throw new Error(transcriptResult.error);
    }

    return transcriptResult.id;

  } catch (error) {
    console.error('Error in uploadAudioToAssemblyAI:', error);
    throw error;
  }
};

export const getTranscriptionResult = async (transcriptId: string) => {
  try {
    const pollingEndpoint = `${BASE_URL}/transcript/${transcriptId}`;
    const response = await fetch(pollingEndpoint, {
      headers: {
        'authorization': ASSEMBLY_AI_API_KEY
      }
    });
    
    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }
    
    return result;
  } catch (error) {
    console.error('Error getting transcription result:', error);
    throw error;
  }
}; 
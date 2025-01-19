import axios from 'axios';

const ASSEMBLY_API_KEY = '267c9ccd3c3c45a9ae83664e4b2f1b15';

interface AudioUploadResponse {
  upload_url: string;
}

interface TranscriptionResponse {
  id: string;
}

interface TranscriptionResult {
  text: string;
  speakers: Array<{
    speaker: string;
    text: string;
  }>;
  status: string;
}

export const uploadAudioToAssemblyAI = async (audioUri: string): Promise<string> => {
  try {
    const audioData = new FormData();
    audioData.append('file', {
      uri: audioUri,
      type: 'audio/m4a',
      name: 'audio.m4a',
    } as any);

    const uploadResponse = await axios.post<AudioUploadResponse>('https://api.assemblyai.com/v2/upload', audioData, {
      headers: { authorization: ASSEMBLY_API_KEY },
    });

    const audioUrl = uploadResponse.data.upload_url;

    const transcriptionResponse = await axios.post<TranscriptionResponse>(
      'https://api.assemblyai.com/v2/transcript',
      {
        audio_url: audioUrl,
        speaker_labels: true,
      },
      {
        headers: { authorization: ASSEMBLY_API_KEY },
      }
    );
    console.log(transcriptionResponse.data, "transcriptionResponse")
    return transcriptionResponse.data.id;
  } catch (error) {
    console.error('Error uploading or transcribing audio:', error);
    throw error;
  }
};

export const getTranscriptionResult = async (transcriptionId: string): Promise<TranscriptionResult> => {
  try {
    const response = await axios.get<TranscriptionResult>(`https://api.assemblyai.com/v2/transcript/${transcriptionId}`, {
      headers: { authorization: ASSEMBLY_API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transcription result:', error);
    throw error;
  }
};

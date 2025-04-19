import React, { useEffect, useRef, useState } from 'react';

function F2FInterview() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const recognitionRef = useRef(null);
  const [showTranscription, setShowTranscription] = useState(false);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const getVideo = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('getUserMedia not supported on your browser!');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        const container = document.getElementById('camera-container');
        if (container) {
          container.innerHTML = '<p>No camera access</p>';
        }
      }
    };

    getVideo();

    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        console.log('Recording stopped.');
        setShowTranscription(true);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      startSpeechRecognition();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const startSpeechRecognition = () => {
    const speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = false;
    speechRecognizer.interimResults = false;
    speechRecognizer.lang = 'en-US';

    speechRecognizer.onresult = (event) => {
      let fullTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript + ' ';
      }
      setTranscription(fullTranscript.trim());
    };

    speechRecognizer.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
    };

    speechRecognizer.onend = () => {
      console.log('Speech recognition ended.');
    };

    recognitionRef.current = speechRecognizer;
    speechRecognizer.start();
  };

  return (
    <div className="p-6 pl-19">
      <div id="camera-container" >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="440"
          height="480"
        />
      </div>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 ml-5"
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {showTranscription && transcription && (
        <div className="flex flex-col items-start mt-4 ml-5">
          <p className="bg-gray-100 p-2 rounded text-black max-w-md">
            <strong>Transcript:</strong> {transcription}
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default F2FInterview;

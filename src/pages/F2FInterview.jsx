import React, { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API setup
const apiKey = "AIzaSyCGZYD-kc9BNy94EyKRzAkifTmD1FXbJC4";
const genAI = new GoogleGenerativeAI(apiKey);
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
};

function F2FInterview() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const recognitionRef = useRef(null);
  const [showTranscription, setShowTranscription] = useState(false);
  const [questions, setQuestions] = useState([]);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const getVideo = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("getUserMedia not supported on your browser!");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        const container = document.getElementById("camera-container");
        if (container) {
          container.innerHTML = "<p>No camera access</p>";
        }
      }
    };

    getVideo();

    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        console.log("Recording stopped.");
        setShowTranscription(true);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      startSpeechRecognition();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
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
    speechRecognizer.lang = "en-US";

    speechRecognizer.onresult = (event) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript + " ";
      }
      setTranscription(fullTranscript.trim());
    };

    speechRecognizer.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
    };

    speechRecognizer.onend = () => {
      console.log("Speech recognition ended.");
    };

    recognitionRef.current = speechRecognizer;
    speechRecognizer.start();
  };

  const generateQuestionsFromTranscript = async () => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-pro-exp-03-25",
        generationConfig,
      });

      const chat = model.startChat({ history: [] });

      const prompt = `Based on the following paragraph, generate 5 questions:\n${transcription}`;

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = await response.text();

      const questionsList = text
        .split(/\n+/)
        .filter((line) => line.trim() !== "");

      setQuestions(questionsList);
    } catch (error) {
      console.error("Error generating questions:", error);
    }
  };

  return (
    <div className="p-6 pl-19">
      <div id="camera-container">
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
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {showTranscription && transcription && (
        <div className="flex flex-col items-start mt-4 ml-5">
          <p className="bg-gray-100 p-2 rounded text-black max-w-md">
            <strong>Transcript:</strong> {transcription}
          </p>
          <button
            onClick={generateQuestionsFromTranscript}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2"
          >
            Submit
          </button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-4 ml-5 bg-green-100 p-4 rounded text-black max-w-xl">
          <strong>Generated Questions:</strong>
          <ul className="list-disc list-inside mt-2">
            {questions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default F2FInterview;

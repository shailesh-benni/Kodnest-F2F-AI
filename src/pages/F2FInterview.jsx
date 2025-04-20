// src/components/F2FInterview.jsx
import React, { useEffect, useRef, useState } from "react";
import { genAI, generationConfig } from "../utils/geminiConfig"; // imported from new file
import { v4 as uuidv4 } from "uuid";

function F2FInterview() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [showTranscription, setShowTranscription] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [answerTranscription, setAnswerTranscription] = useState("");
  const [qaHistory, setQaHistory] = useState([]);
  const [expandedQAIndex, setExpandedQAIndex] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
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
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startSpeechRecognition = (setTranscript) => {
    const speechRecognizer = new window.webkitSpeechRecognition();
    speechRecognizer.continuous = false;
    speechRecognizer.interimResults = false;
    speechRecognizer.lang = "en-US";

    speechRecognizer.onresult = (event) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript + " ";
      }
      setTranscript(fullTranscript.trim());
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

      const prompt = `
You are an interviewer preparing questions for a candidate based on their self-introduction.

Here is the candidate's introduction:
"${transcription}"

Based on this, generate 5 technical or experience-based interview questions. 
Do not repeat the paragraph or give any explanation. Only give the questions in simple numbered format.
`;

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = await response.text();

      let questionsList = text
        .split(/\n+/)
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter((line) => line !== "");

      setQuestions(questionsList);
      setShowQuestion(true);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error("Error generating questions:", error);
    }
  };

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

      mediaRecorderRef.current.onstop = async () => {
        console.log("Recording stopped.");
        setShowTranscription(true);
        if (questions) {
          setIsAnswering(false);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      startSpeechRecognition(setTranscription);
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

  const handleGiveAnswer = async () => {
    setIsAnswering(true);
    startSpeechRecognition(setAnswerTranscription);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      mediaRecorderRef.current.onstop = () => {
        console.log("Recording stopped.");
        setIsAnswering(false);
      };
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting answer recording:", error);
    }
  };

  const handleNextQuestion = () => {
    stopRecording();
    if (recognitionRef.current) recognitionRef.current.stop();

    const currentQA = {
      question: questions[currentQuestionIndex],
      answer: answerTranscription,
    };
    setQaHistory((prev) => [...prev, currentQA]);
    setExpandedQAIndex(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerTranscription("");
    } else {
      alert("Interview completed!");
      setCurrentQuestionIndex(0);
      setQuestions(null);
      setShowQuestion(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedQAIndex(expandedQAIndex === index ? null : index);
  };

  return (
    <div className="p-6 ml-20">
      <h1 className="items-center flex flex-col pb-5 font-semibold text-3xl">It's Time to Test Your Skills</h1>
      <div className="flex flex-wrap gap-4">
        <div>
          <div id="camera-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              width="440"
              height="480"
              className="rounded shadow"
            />
          </div>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 ml-30 rounded mt-4"
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          {showTranscription && transcription && (
            <div className="flex flex-col items-start mt-4">
              <p className="bg-yellow-100 p-2 rounded text-black max-w-md">
                <strong className="font-semibold">Transcript:</strong> {transcription}
              </p>
              <button
                onClick={generateQuestionsFromTranscript}
                className="bg-yellow-400 hover:bg-yellow-500 ml-90 text-black font-semibold py-1 px-2 rounded mt-2"
              >
                Submit
              </button>
            </div>
          )}
        </div>

        {showQuestion && questions && (
          <div className="bg-yellow-100 p-4 rounded text-black w-[600px] ml-15">
            {qaHistory.length > 0 && (
              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-2">Previous Q&A:</h2>
                {qaHistory.map((qa, idx) => (
                  <div key={idx} className="bg-white rounded p-2 mb-2 shadow-sm">
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="text-left w-full flex justify-between items-center"
                    >
                      <span><strong>Q{idx + 1}:</strong> {qa.question.slice(0, 30)}...</span>
                      <span>{expandedQAIndex === idx ? "▲" : "▼"}</span>
                    </button>
                    {expandedQAIndex === idx && (
                      <div className="mt-2 pl-2">
                        <p><strong>Question:</strong> {qa.question}</p>
                        <p><strong>Answer:</strong> {qa.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {questions[currentQuestionIndex] && (
              <div>
                <p key={uuidv4()}>
                  <strong>Question:</strong> {questions[currentQuestionIndex]}
                </p>
              </div>
            )}

            {isAnswering && answerTranscription && (
              <div className="flex flex-col items-start mt-4">
                <p className="bg-yellow-100 p-2 rounded text-black max-w-md">
                  <strong>Answer Transcript:</strong> {answerTranscription}
                </p>
              </div>
            )}

            {!isAnswering && (
              <div className="mt-4">
                <button
                  onClick={handleGiveAnswer}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
                >
                  Give Answer
                </button>
              </div>
            )}

            {!isAnswering && answerTranscription && (
              <div className="mt-4">
                <button
                  onClick={handleNextQuestion}
                  className="bg-yellow-400 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default F2FInterview;

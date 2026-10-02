import React, { useState, useRef, useEffect } from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer';
import { motion } from "motion/react"
import {FaMicrophone, FaMicrophoneSlash} from "react-icons/fa";
import axios from 'axios';
import { ServerUrl } from '../App';
import { BsArrowRight } from 'react-icons/bs';   


function Step2Interview({ interviewData, onFinish }) {
    const interviewId = interviewData?.interviewId || localStorage.getItem("currentInterviewId");
    const questions = interviewData?.questions || interviewData?.interview?.questions || [];
    const userRole = interviewData?.userRole;

    console.log("Step2 - InterviewId:", interviewId);
    console.log("Step2 - Questions:", questions);

    const [isIntroPhase, setIsIntroPhase] = useState(true);

    const [isMicOn, setIsMicOn] = useState(true);
    const isMicOnRef = useRef(true);
    const recognitionRef = useRef(null);
    const [isAiPlaying, setIsAiPlaying] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [timeLeft, setTimeLeft] = useState(
        questions[0]?.timeLimit || 60
    );

    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);
    const submittedQuestionRef = useRef(null);
    const questionFlowRef = useRef(0);
    const [voiceGender, setVoiceGender] = useState("female");
    const [subtitle, setSubtitle] = useState("");


    const videoRef = useRef(null);
    const isRecognitionRunningRef = useRef(false);

    const currentQuestion = questions[currentIndex];
    useEffect(() => {
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices.length) return;

        const femaleVoice = voices.find(v => 
            v.name.toLowerCase().includes("zira") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("female")
        );
        if (femaleVoice) {
            setSelectedVoice(femaleVoice);
            setVoiceGender("female");
            return;
        }

        const maleVoice = voices.find(v => 
            v.name.toLowerCase().includes("david") ||
            v.name.toLowerCase().includes("mark") ||
            v.name.toLowerCase().includes("male")
        );

        if (maleVoice) {
            setSelectedVoice(maleVoice);
            setVoiceGender("male");
            return;
        }

        setSelectedVoice(voices[0]);
        setVoiceGender("female");
    }; 
            loadVoices();
                window.speechSynthesis.onvoiceschanged = loadVoices;
        }, []);

        const speakText = (text) => {
            return new Promise((resolve) => {
                if (!window.speechSynthesis || !selectedVoice) {
                    resolve();
                    return;
                }

                window.speechSynthesis.cancel();

                const humanText = text
                    .replace(/,/g, ", ... ")
                    .replace(/\./g, ". ... ");

                const utterance = new SpeechSynthesisUtterance(humanText);

                utterance.voice = selectedVoice;
                utterance.rate = 0.95;
                utterance.pitch = 1.05;
                utterance.volume = 1;

                utterance.onstart = () => {
                    setIsAiPlaying(true);
                    stopMic();
                    videoRef.current?.play();
                };

                utterance.onend = () => {
                    videoRef.current?.pause();
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                    }
                    setIsAiPlaying(false);

                    // Mic is started only by the question-flow effect.
                    // Starting it here as well causes SpeechRecognition races
                    // when moving from one question to the next.
                    setTimeout(() => {
                        setSubtitle("");
                        resolve();
                    }, 300); 
                };

                setSubtitle(text);

                window.speechSynthesis.speak(utterance);
            });
        };

        useEffect(() => {
            // Every question gets a fresh submit lock.
            submittedQuestionRef.current = null;
            isSubmittingRef.current = false;

            if (!selectedVoice) return;

            let cancelled = false;

            const runInterviewStep = async () => {
                if (isIntroPhase) {
                    await speakText(
                        "I'll ask you a few questions. Just answer naturally, take your time. Let's begin."
                    );

                    if (!cancelled) {
                        setIsIntroPhase(false);
                    }
                    return;
                }

                if (!currentQuestion) return;

                // Fully reset the previous recognition session before every question.
                resetMic();

                await new Promise(resolve => setTimeout(resolve, 500));
                if (cancelled) return;

                if (currentIndex === questions.length - 1) {
                    await speakText(
                        "This is the last question. Give it your best shot!"
                    );
                    if (cancelled) return;
                }

                await speakText(currentQuestion.question);
                if (cancelled) return;

                // Give Chrome SpeechRecognition a clean event-loop turn after TTS.
                await new Promise(resolve => setTimeout(resolve, 500));
                if (!cancelled && isMicOnRef.current) {
                    startMicWithRetry();
                }
            };

            runInterviewStep();

            return () => {
                cancelled = true;
                window.speechSynthesis.cancel();
                resetMic();
            };
        }, [selectedVoice, isIntroPhase, currentIndex]);

            useEffect(() => {
                if (isIntroPhase) return;
                if (!currentQuestion) return;
                const timer = setInterval(() => {
                    setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(timer);
                }, [isIntroPhase, currentIndex]);

                
                useEffect(() => {
                    if (currentQuestion) {
                        setTimeLeft(currentQuestion.timeLimit || 60);
                    }
                }, [currentIndex, isIntroPhase]);

                useEffect(() => {
                if (!("webkitSpeechRecognition" in window)) return;

                const recognition = new  window.webkitSpeechRecognition();

                recognition.lang = "en-US";
                recognition.continuous = true;
                recognition.interimResults = false;

                recognition.onresult = (event) => {
                    const transcript = event.results[event.results.length - 1][0].transcript;
                    setAnswer((prev) => prev + " " + transcript);
                };
                recognition.onend = () => {
                    isRecognitionRunningRef.current = false;
                };

                recognition.onerror = (event) => {
                    console.warn("Speech recognition error:", event.error);
                    isRecognitionRunningRef.current = false;
                };

                recognitionRef.current = recognition;
                }, []);

                const startMic = () => {
                    const recognition = recognitionRef.current;

                    if (!recognition || isAiPlaying || isRecognitionRunningRef.current) {
                        return false;
                    }

                    try {
                        recognition.start();
                        isRecognitionRunningRef.current = true;
                        return true;
                    } catch (err) {
                        console.warn("Speech recognition couldn't start:", err);
                        isRecognitionRunningRef.current = false;
                        return false;
                    }
                };

                const startMicWithRetry = () => {
                    if (!isMicOnRef.current || isAiPlaying) return;

                    if (startMic()) return;

                    setTimeout(() => {
                        if (!isMicOnRef.current || isAiPlaying) return;
                        startMic();
                    }, 200);
                };

                const stopMic = () => {
                    const recognition = recognitionRef.current;

                    if (!recognition) {
                        isRecognitionRunningRef.current = false;
                        return;
                    }

                    try {
                        recognition.stop();
                    } catch (err) {
                        // Recognition may already be stopped.
                    }

                    isRecognitionRunningRef.current = false;
                };

                const resetMic = () => {
                    const recognition = recognitionRef.current;

                    if (!recognition) {
                        isRecognitionRunningRef.current = false;
                        return;
                    }

                    try {
                        recognition.abort();
                    } catch (err) {
                        // Recognition may already be stopped.
                    }

                    isRecognitionRunningRef.current = false;
                };

            const toggleMic = () => {
                const nextMicState = !isMicOn;
                isMicOnRef.current = nextMicState;

                if (nextMicState) {
                    startMicWithRetry();
                } else {
                    resetMic();
                }

                setIsMicOn(nextMicState);
            };
            const submitAnswer = async () => {
    const questionId =
        currentQuestion?._id ||
        currentQuestion?.id ||
        `question-${currentIndex}`;

    // Hard lock: a question can be submitted only once.
    // This protects against timer + button + stale speech callbacks firing together.
    if (
        isSubmittingRef.current ||
        submittedQuestionRef.current === questionId
    ) {
        console.log("Submit ignored - question already submitting/submitted:", questionId);
        return;
    }

    const targetInterviewId =
        interviewData?._id ||
        interviewData?.interviewId ||
        interviewData?.interview?.id ||
        interviewData?.interview?._id ||
        localStorage.getItem("currentInterviewId");

    const targetQuestionId =
        currentQuestion?._id ||
        currentQuestion?.id;

    if (!targetInterviewId || !targetQuestionId) {
        console.error("Missing IDs:", {
            targetInterviewId,
            targetQuestionId
        });
        return;
    }

    stopMic();
    isSubmittingRef.current = true;
    submittedQuestionRef.current = questionId;
    setIsSubmitting(true);

    try {
        const result = await axios.post(
            ServerUrl + "/api/interview/answer",
            {
                interviewId: targetInterviewId,
                questionId: targetQuestionId,
                answer: answer || ""
            },
            { withCredentials: true }
        );

        const evaluatedFeedback = result.data?.feedback || "Answer submitted successfully.";
        setFeedback(evaluatedFeedback);

        await speakText(evaluatedFeedback);

        // The final answer has now been saved successfully.
        // Generate the report only after the answer API has completed.
        if (currentIndex === questions.length - 1) {
            try {
                const reportResult = await axios.post(
                    ServerUrl + "/api/interview/report",
                    { interviewId: targetInterviewId },
                    { withCredentials: true }
                );

                onFinish(reportResult.data);
                return;
            } catch (reportError) {
                console.error(
                    "Final report error:",
                    reportError.response?.data || reportError.message
                );
            }
        }

        isSubmittingRef.current = false;
        setIsSubmitting(false);
    } catch (error) {
        console.error(
            "Submit error:",
            error.response?.data || error.message
        );

        // Allow retry only when the API itself failed.
        submittedQuestionRef.current = null;
        isSubmittingRef.current = false;
        setIsSubmitting(false);
    }
};
        const handleNext = async () => {
            // Never move forward while the current answer is still being submitted.
            if (isSubmittingRef.current) return;

            if (currentIndex + 1 >= questions.length) {
                return;
            }

            // Stop every old async activity before changing the question.
            resetMic();
            window.speechSynthesis.cancel();

            setAnswer("");
            setFeedback("");
            submittedQuestionRef.current = null;

            await speakText("Alright, let's move to the next question.");

            setCurrentIndex((prevIndex) => prevIndex + 1);
        };

            useEffect(() => {
                if (isIntroPhase) return;
                if (!currentQuestion) return;

                if (
                    timeLeft === 0 &&
                    !isSubmittingRef.current &&
                    !submittedQuestionRef.current &&
                    !feedback
                ) {
                    submitAnswer();
                }
                }, [timeLeft]);

                useEffect(() => {
                return () => {
                    if (recognitionRef.current) {
                    recognitionRef.current.stop();
                    recognitionRef.current.abort();
                    }
                    window.speechSynthesis.cancel();
                }
                }, []);



          const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;
    return (
        <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6'>

            <div className='w-full max-w-[1200] min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>

                <div className='w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>

                    <div className='w-full max-w-sm rounded-2xl overflow-hidden shadow-xl'>

                        <video 
                            src={videoSource}
                            key={videoSource}
                            ref={videoRef}
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-auto object-cover"
                        />

                    </div>

                    {subtitle && (
                    <div className='w-full max-w-md bg-gray-50 border
                         border-gray-200 rounded-xl p-4 shadow-sm'>
                        <p className='text-gray-700 text-sm sm:text-base 
                            font-medium text-center leading-relaxed'>{subtitle}</p>
                    </div>
                    )}

                    <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>

                        <div className='flex justify-between items-center'>

                            <span className='text-sm text-gray-500'>
                                Interview Status
                            </span>
                            {
                             isAiPlaying && <span className='text-sm font-semibold text-emerald-600'>
                               {isAiPlaying? "AI speaking": ""} 
                            </span>
                            } 

                        </div>

                        <div className='h-px bg-gray-200'></div>
                            
                        <div className='flex justify-center'>
                               <Timer
                              timeLeft={timeLeft}
                              totalTime={currentQuestion?.timeLimit || 60}
                              />
                        </div>

                        <div className='h-px bg-gray-200'></div>
                        <div className='grid grid-cols-2 gap-6 text-center'>
                        <div>
                            <span className='text-2xl font-bold text-emerald-600'>{currentIndex + 1}</span>
                            <span className='text-xs text-gray-400'>Current Question</span>
                        </div>
                        <div className='h-px bg-gray-200'></div>
                        <div>
                            <span className='text-2xl font-bold text-emerald-600'>{questions.length}</span>
                            <span className='text-xs text-gray-400'>Total Questions</span>
                        </div>
                    </div>
                    </div>

                </div>
              <div className='w-full lg:w-[65%] p-6 sm:p-8 flex flex-col'>

                  <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
                      AI Smart Interview
                  </h2>

                  {!isIntroPhase && (
                      <div className='relative mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-200 shadow-sm'>

                      <p className='text-xs sm:text-sm text-gray-400 mb-2'>
                          Question {currentIndex + 1} of {questions.length}
                      </p>

                      <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed'>
                            {currentQuestion?.question}
                      </div>

                  </div>)
}
                  <textarea
                     placeholder="Type your answer here..."
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                    className="flex-1 min-h-[200px] bg-gray-100 p-4 sm:p-6 rounded-2xl 
                    resize-none outline-none border border-gray-200 
                    focus:ring-2 focus:ring-emerald-500 transition text-gray-800"
                />

              {!feedback ? (
                    <div className="flex items-center gap-4 sm:gap-6 mt-6">

                        <motion.button
                            onClick={toggleMic}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center 
                                    rounded-full bg-black text-white shadow-lg"
                        >
                            {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20}  />}
                        </motion.button>

                        <motion.button
                            onClick={submitAnswer}
                            disabled={isSubmitting}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 
                                    text-white py-3 sm:py-4 rounded-2xl shadow-lg 
                                    hover:opacity-90 transition font-semibold 
                                    disabled:bg-gray-500"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Answer"}
                        </motion.button>

                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 bg-emerald-50 border border-emerald-200 
                                p-3 rounded-xl shadow-sm"
                    >
                        <p className="text-emerald-700 font-medium mb-4">
                            {feedback}
                        </p>

                        <button
                                onClick={handleNext}
                            className="w-full bg-gradient-to-r from-emerald-600 
                                    to-teal-500 text-white py-3 rounded-xl 
                                    shadow-md hover:opacity-90 transition 
                                    flex items-center justify-center gap-1"
                        >
                            Next Question <BsArrowRight  size={18} />
                        </button>

                    </motion.div>
                )}

              </div>
            </div>
        </div>
    );
}

export default Step2Interview;
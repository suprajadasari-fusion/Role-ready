import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Monitor, 
  MessageSquare, 
  Send, 
  Sparkles, 
  X, 
  Maximize2, 
  Minimize2,
  Volume2,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface LiveCallModalProps {
  isOpen: boolean;
  participantName: string;
  participantRole: string;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const LiveCallModal: React.FC<LiveCallModalProps> = ({
  isOpen,
  participantName,
  participantRole,
  onClose,
  onShowToast,
  isDarkMode = true
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: participantName, text: "Hello Dr. Sharma! Excited to review my AI engineering pathway.", time: "12:00 PM" },
    { sender: "System AI", text: "✓ HD Encrypted Call Established. Live AI Speech Transcription Active.", time: "12:00 PM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [sessionNote, setSessionNote] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      setCallSeconds(0);
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  if (!isOpen) return null;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: "You (Mentor)", text: inputMsg.trim(), time: now }]);
    setInputMsg("");
  };

  const handleSaveNotes = () => {
    if (!sessionNote.trim()) {
      onShowToast("Please enter session notes before saving.");
      return;
    }
    setNotesSaved(true);
    onShowToast(`Session notes for ${participantName} saved to Student Portfolio!`);
  };

  const handleEndCall = () => {
    onShowToast(`Video Call Ended with ${participantName}. Call Duration: ${formatTimer(callSeconds)}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans text-white">
      <div className={`w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative ${
        isFullscreen ? 'fixed inset-0 h-screen max-w-none rounded-none' : ''
      }`}>
        
        {/* Top Navigation Bar */}
        <div className="h-16 px-6 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white">{participantName}</h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE • 1080p Encrypted
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">{participantRole}</p>
            </div>
          </div>

          {/* Call Duration & Actions */}
          <div className="flex items-center gap-4">
            <div className="bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {formatTimer(callSeconds)}
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleEndCall}
              className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition cursor-pointer"
              title="Close Room"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Main Workspace (Video + Chat Panel) */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Video Feeds Container */}
          <div className="flex-1 bg-slate-950 p-4 flex flex-col relative justify-between overflow-hidden">
            
            {/* Participant Video View */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 flex items-center justify-center group">
              {isScreenSharing ? (
                /* Screen Share Simulation */
                <div className="w-full h-full bg-slate-900 p-6 flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    <Monitor className="w-12 h-12 animate-pulse" />
                  </div>
                  <h4 className="font-semibold text-base text-white">Sharing Screen: Neural Network Architecture Review.pdf</h4>
                  <p className="text-sm font-normal text-slate-400 max-w-sm text-center">Live screen broadcast active for 1-on-1 counseling session.</p>
                </div>
              ) : (
                /* Participant Avatar / Camera Video Simulation */
                <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-4xl font-bold shadow-2xl border-4 border-slate-800">
                      {participantName.split(" ").map(n => n[0]).join("")}
                    </div>
                    {/* Audio wave indicator */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                      <Volume2 className="w-3 h-3 animate-bounce" /> Speaking
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{participantName}</h3>
                  <p className="text-xs text-slate-400 font-normal">{participantRole}</p>
                </div>
              )}

              {/* Local PiP Camera Feed */}
              <div className="absolute top-4 right-4 w-44 h-32 rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700/80 shadow-2xl flex flex-col items-center justify-center transition-all hover:scale-105">
                {isVideoOff ? (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
                    <span className="text-xs font-medium">Camera Paused</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex flex-col items-center justify-center relative p-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                      YOU
                    </div>
                    <span className="text-xs font-medium text-slate-300 mt-1">Dr. Rajesh (You)</span>
                    <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                )}
              </div>

              {/* Status overlay badge */}
              <div className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>AI Live Transcript & Holland Code DNA Active</span>
              </div>
            </div>

            {/* Bottom Floating Control Bar */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  onShowToast(isMuted ? "Microphone Unmuted" : "Microphone Muted");
                }}
                className={`p-3.5 rounded-2xl font-medium transition shadow-lg cursor-pointer flex items-center gap-2 ${
                  isMuted ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
                title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-blue-400" />}
              </button>

              <button
                onClick={() => {
                  setIsVideoOff(!isVideoOff);
                  onShowToast(isVideoOff ? "Camera Enabled" : "Camera Disabled");
                }}
                className={`p-3.5 rounded-2xl font-medium transition shadow-lg cursor-pointer flex items-center gap-2 ${
                  isVideoOff ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
                title={isVideoOff ? "Start Video" : "Stop Video"}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5 text-blue-400" />}
              </button>

              <button
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  onShowToast(isScreenSharing ? "Stopped Screen Sharing" : "Started Screen Sharing");
                }}
                className={`p-3.5 rounded-2xl font-medium transition shadow-lg cursor-pointer flex items-center gap-2 ${
                  isScreenSharing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
                title="Share Screen"
              >
                <Monitor className="w-5 h-5 text-blue-400" />
              </button>

              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`p-3.5 rounded-2xl font-medium transition shadow-lg cursor-pointer flex items-center gap-2 ${
                  isChatOpen ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
                title="Toggle In-Call Chat & Notes"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={handleEndCall}
                className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm transition shadow-lg cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <PhoneOff className="w-5 h-5" />
                <span>End Call</span>
              </button>
            </div>
          </div>

          {/* Side Drawer: Chat & Session Takeaways */}
          {isChatOpen && (
            <div className="w-80 md:w-96 bg-slate-900 border-l border-slate-800 flex flex-col justify-between">
              
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                <h4 className="font-semibold text-sm flex items-center gap-2 text-white">
                  <MessageSquare className="w-4 h-4 text-blue-400" /> Live Chat & AI Takeaways
                </h4>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Feed Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl space-y-1 ${
                      msg.sender.includes("You")
                        ? 'bg-blue-600/30 border border-blue-500/40 ml-4 text-white'
                        : msg.sender.includes("System")
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-800 border border-slate-700/80 mr-4 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-medium opacity-80">
                      <span>{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="text-sm font-normal leading-relaxed">{msg.text}</p>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Live Session Notes Box */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-medium text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-400" /> In-Call Session Takeaways
                  </label>
                  {notesSaved && (
                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Saved
                    </span>
                  )}
                </div>
                <textarea
                  rows={2}
                  value={sessionNote}
                  onChange={(e) => {
                    setSessionNote(e.target.value);
                    setNotesSaved(false);
                  }}
                  placeholder="Record action items for student portfolio..."
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-normal text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Save Notes to Portfolio
                </button>
              </div>

              {/* Chat Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Send live message..."
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-normal text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

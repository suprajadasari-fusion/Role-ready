import React, { useState, useEffect, useRef } from 'react';
import { 
  FiVideo, 
  FiVideoOff, 
  FiMic, 
  FiMicOff, 
  FiPhoneOff, 
  FiMaximize, 
  FiMinimize,
  FiUsers, 
  FiClock, 
  FiAlertCircle, 
  FiRefreshCw, 
  FiX,
  FiTv,
  FiShield
} from 'react-icons/fi';

interface VideoCallModalProps {
  isOpen: boolean;
  sessionTitle: string;
  hostName: string;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isOpen,
  sessionTitle,
  hostName,
  onClose,
  onShowToast,
  isDarkMode = false
}) => {
  const [callState, setCallState] = useState<'idle' | 'requesting' | 'connecting' | 'connected' | 'error' | 'ended'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  
  const streamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const localPcRef = useRef<RTCPeerConnection | null>(null);
  const remotePcRef = useRef<RTCPeerConnection | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync Browser Fullscreen Events (e.g. Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Request Fullscreen Mode
  const enterBrowserFullscreen = () => {
    if (modalContainerRef.current && !document.fullscreenElement) {
      modalContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.log("Automatic fullscreen request prevented by browser:", err);
      });
    }
  };

  const exitBrowserFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  // Start Call & Request Permissions
  const startCall = async () => {
    setCallState('requesting');
    setErrorMessage('');
    setIsMicMuted(false);
    setIsCameraOff(false);
    setIsScreenSharing(false);
    setCallSeconds(0);

    if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCallState('error');
      setErrorMessage("Camera and Microphone API is not supported in this browser environment.");
      return;
    }

    try {
      // 1. Request Camera & Microphone Permissions
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 } }, 
        audio: true 
      });

      streamRef.current = mediaStream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }

      setCallState('connecting');

      // 2. Establish WebRTC Loopback Peer Connection
      const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      const localPc = new RTCPeerConnection(configuration);
      const remotePc = new RTCPeerConnection(configuration);

      localPcRef.current = localPc;
      remotePcRef.current = remotePc;

      // Handle ICE Candidates
      localPc.onicecandidate = (event) => {
        if (event.candidate) {
          remotePc.addIceCandidate(event.candidate).catch(console.error);
        }
      };

      remotePc.onicecandidate = (event) => {
        if (event.candidate) {
          localPc.addIceCandidate(event.candidate).catch(console.error);
        }
      };

      // Handle Remote Stream Track
      remotePc.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Add Local Stream Tracks to WebRTC Peer Connection
      mediaStream.getTracks().forEach((track) => {
        localPc.addTrack(track, mediaStream);
      });

      // Negotiate WebRTC Offer & Answer
      const offer = await localPc.createOffer();
      await localPc.setLocalDescription(offer);
      await remotePc.setRemoteDescription(offer);

      const answer = await remotePc.createAnswer();
      await remotePc.setLocalDescription(answer);

      setCallState('connected');
      onShowToast(`WebRTC Full-Screen Session Active: ${sessionTitle}`);

      // Auto Enter Fullscreen
      setTimeout(() => {
        enterBrowserFullscreen();
      }, 300);

      // Start Call Timer
      timerRef.current = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);

    } catch (err: any) {
      console.error("WebRTC getUserMedia Error:", err);
      setCallState('error');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage("Camera or Microphone permission was denied. Please allow camera and microphone access in your browser settings.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setErrorMessage("No camera or microphone device found on your hardware.");
      } else {
        setErrorMessage(`Failed to access media devices: ${err.message || 'Unknown WebRTC error'}`);
      }
    }
  };

  // Stop Screen Share & Restore Camera
  const stopScreenShare = async () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }

    if (localPcRef.current && streamRef.current) {
      const cameraVideoTrack = streamRef.current.getVideoTracks()[0];
      const senders = localPcRef.current.getSenders();
      const videoSender = senders.find((s) => s.track && s.track.kind === 'video');

      if (videoSender && cameraVideoTrack) {
        await videoSender.replaceTrack(cameraVideoTrack);
      }
    }

    setIsScreenSharing(false);
    onShowToast("Stopped screen sharing. Camera feed restored.");
  };

  // Toggle Screen Share using getDisplayMedia()
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      await stopScreenShare();
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      onShowToast("Screen capture API is not supported in this browser environment.");
      return;
    }

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      screenStreamRef.current = screenStream;
      const screenVideoTrack = screenStream.getVideoTracks()[0];

      // Detect Native Browser "Stop Sharing" Bar Click
      screenVideoTrack.onended = () => {
        stopScreenShare();
      };

      // Replace Outgoing WebRTC Video Track
      if (localPcRef.current) {
        const senders = localPcRef.current.getSenders();
        const videoSender = senders.find((s) => s.track && s.track.kind === 'video');

        if (videoSender) {
          await videoSender.replaceTrack(screenVideoTrack);
        }
      }

      setIsScreenSharing(true);
      onShowToast("Sharing Screen / Application Window with participants");

    } catch (err: any) {
      if (err.name !== 'NotAllowedError') {
        console.error("Screen Share Error:", err);
        onShowToast(`Screen share cancelled or failed: ${err.message || 'Permission denied'}`);
      }
    }
  };

  // Clean up all media tracks and connections
  const stopCallAndCleanup = () => {
    exitBrowserFullscreen();

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    if (localPcRef.current) {
      localPcRef.current.close();
      localPcRef.current = null;
    }

    if (remotePcRef.current) {
      remotePcRef.current.close();
      remotePcRef.current = null;
    }

    setIsScreenSharing(false);
    setCallState('ended');
  };

  // Mount/Unmount effect
  useEffect(() => {
    if (isOpen) {
      startCall();
    } else {
      stopCallAndCleanup();
    }

    return () => {
      stopCallAndCleanup();
    };
  }, [isOpen]);

  // Toggle Microphone
  const toggleMic = () => {
    if (!streamRef.current) return;
    const audioTracks = streamRef.current.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = isMicMuted;
    });
    const nextState = !isMicMuted;
    setIsMicMuted(nextState);
    onShowToast(nextState ? "Microphone Muted" : "Microphone Active");
  };

  // Toggle Camera
  const toggleCamera = () => {
    if (!streamRef.current) return;
    const videoTracks = streamRef.current.getVideoTracks();
    videoTracks.forEach((track) => {
      track.enabled = isCameraOff;
    });
    const nextState = !isCameraOff;
    setIsCameraOff(nextState);
    onShowToast(nextState ? "Camera Turned Off" : "Camera Turned On");
  };

  // Fullscreen button toggle
  const toggleFullscreenButton = () => {
    if (isFullscreen) {
      exitBrowserFullscreen();
    } else {
      enterBrowserFullscreen();
    }
  };

  // Handle End Call Button
  const handleEndCall = () => {
    stopCallAndCleanup();
    onShowToast("Left video call session. All camera, mic, and screen tracks closed.");
    onClose();
  };

  if (!isOpen) return null;

  // Format Call Timer (00:00)
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={modalContainerRef}
      className="fixed inset-0 z-50 bg-slate-950 text-white w-screen h-screen flex flex-col font-sans overflow-hidden animate-fade-in"
    >
      {/* TOP FLOATING HEADER BAR */}
      <div className="px-6 py-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold shadow-lg">
            <FiVideo className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white truncate max-w-xs sm:max-w-xl">{sessionTitle}</h3>
            <p className="text-xs text-slate-400">Host: {hostName} • Full-Screen WebRTC Teleconference</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {callState === 'connected' && (
            <>
              {isScreenSharing && (
                <div className="flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/40 text-blue-400 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  <FiTv className="w-3.5 h-3.5" />
                  <span>Sharing Screen</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>WebRTC Live HD</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-full text-xs font-mono font-bold">
                <FiClock className="w-3.5 h-3.5 text-blue-400" />
                <span>{formatTime(callSeconds)}</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full text-xs font-bold">
                <FiUsers className="w-3.5 h-3.5 text-blue-400" />
                <span>2 Participants</span>
              </div>
            </>
          )}

          <button 
            onClick={toggleFullscreenButton}
            aria-label="Toggle Fullscreen Mode"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
          >
            {isFullscreen ? <FiMinimize className="w-4 h-4" /> : <FiMaximize className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
          </button>

          <button 
            onClick={handleEndCall}
            aria-label="Close Video Call"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* FULL-SCREEN VIDEO CANVAS AREA */}
      <div className="flex-1 relative bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* STATE 1: REQUESTING PERMISSIONS */}
        {callState === 'requesting' && (
          <div className="text-center space-y-4 p-8 max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-md z-30">
            <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto animate-spin">
              <FiRefreshCw className="w-10 h-10" />
            </div>
            <h4 className="font-extrabold text-lg text-white">Requesting Camera & Microphone Permissions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Please grant camera and microphone access in your browser prompt to enter full-screen WebRTC video session.</p>
          </div>
        )}

        {/* STATE 2: CONNECTING WEBRTC */}
        {callState === 'connecting' && (
          <div className="text-center space-y-4 p-8 max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-md z-30">
            <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto animate-bounce">
              <FiVideo className="w-10 h-10" />
            </div>
            <h4 className="font-extrabold text-lg text-white">Establishing Secure WebRTC Connection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Exchanging WebRTC SDP offer/answer & establishing encrypted peer connection...</p>
          </div>
        )}

        {/* STATE 3: PERMISSION / MEDIA ERROR */}
        {callState === 'error' && (
          <div className="text-center space-y-5 p-8 max-w-md bg-rose-950/50 border border-rose-500/40 rounded-3xl shadow-2xl z-30">
            <div className="w-20 h-20 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
              <FiAlertCircle className="w-10 h-10" />
            </div>
            <h4 className="font-extrabold text-lg text-white">Camera & Microphone Access Required</h4>
            <p className="text-xs text-rose-200 leading-relaxed">{errorMessage}</p>
            <button 
              onClick={startCall}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-2xl transition cursor-pointer inline-flex items-center gap-2 shadow-xl"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Retry Permission & Full Screen Call</span>
            </button>
          </div>
        )}

        {/* STATE 4: FULL-SCREEN LIVE VIDEO CONTAINER */}
        {(callState === 'connected' || callState === 'connecting') && (
          <div className="w-full h-full relative flex items-center justify-center">
            
            {/* MAIN / REMOTE PARTICIPANT VIDEO (FULL SCREEN BACKGROUND COVER) */}
            <div className="w-full h-full relative bg-slate-900 overflow-hidden flex items-center justify-center">
              <video 
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Host / Stream Label */}
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-2.5 z-20 shadow-lg">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <span className="text-xs font-extrabold text-white block">{hostName}</span>
                  <span className="text-[10px] text-slate-400">{isScreenSharing ? 'Shared Screen Output' : 'Remote Faculty Camera'}</span>
                </div>
              </div>
            </div>

            {/* FIXED CORNER PICTURE-IN-PICTURE (PIP) LOCAL USER CAMERA */}
            <div className="absolute bottom-24 right-6 w-56 h-36 sm:w-72 sm:h-48 rounded-2xl border-2 border-white/20 shadow-2xl bg-slate-900 overflow-hidden z-30 transition-all duration-300 hover:scale-105 hover:border-blue-400">
              <video 
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${isCameraOff ? 'hidden' : 'block'}`}
              />

              {isCameraOff && (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900 text-slate-400 space-y-1">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                    <FiVideoOff className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300">Camera Off</span>
                </div>
              )}

              {/* Local User Badge */}
              <div className="absolute bottom-2 left-2 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5 shadow-md">
                <div className={`w-2 h-2 rounded-full ${isMicMuted ? 'bg-rose-500' : 'bg-emerald-400'}`} />
                <span className="text-[11px] font-bold text-white">You</span>
                {isMicMuted && <FiMicOff className="w-3 h-3 text-rose-400 ml-1" />}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* BOTTOM CONTROL BAR */}
      <div className="px-6 py-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between z-40 shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs font-bold">
          <FiShield className="w-4 h-4 text-blue-400" />
          <span>Full-Screen Teleconference</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          {/* 🎥 Camera On/Off */}
          <button
            onClick={toggleCamera}
            disabled={callState !== 'connected'}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition cursor-pointer border shadow-lg ${
              isCameraOff
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
                : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            title={isCameraOff ? "Turn On Camera" : "Turn Off Camera"}
          >
            {isCameraOff ? <FiVideoOff className="w-5 h-5 text-rose-400" /> : <FiVideo className="w-5 h-5 text-blue-400" />}
          </button>

          {/* 🎤 Mute/Unmute Mic */}
          <button
            onClick={toggleMic}
            disabled={callState !== 'connected'}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition cursor-pointer border shadow-lg ${
              isMicMuted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
                : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isMicMuted ? <FiMicOff className="w-5 h-5 text-rose-400" /> : <FiMic className="w-5 h-5 text-emerald-400" />}
          </button>

          {/* 🖥️ Screen Share */}
          <button
            onClick={toggleScreenShare}
            disabled={callState !== 'connected'}
            className={`px-4 h-12 rounded-2xl flex items-center gap-2 font-bold text-xs transition cursor-pointer border shadow-lg ${
              isScreenSharing
                ? 'bg-blue-600 border-blue-400 text-white hover:bg-blue-500 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            title={isScreenSharing ? "Stop Screen Share" : "Share Screen"}
          >
            <FiTv className="w-5 h-5" />
            <span className="hidden sm:inline">{isScreenSharing ? 'Stop Sharing' : 'Screen Share'}</span>
          </button>

          {/* ⛶ Fullscreen Toggle */}
          <button
            onClick={toggleFullscreenButton}
            disabled={callState !== 'connected'}
            className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 flex items-center justify-center transition cursor-pointer shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            title="Toggle Full Screen"
          >
            {isFullscreen ? <FiMinimize className="w-5 h-5 text-blue-400" /> : <FiMaximize className="w-5 h-5" />}
          </button>

          {/* 📞 End Call */}
          <button
            onClick={handleEndCall}
            className="px-6 h-12 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xl shadow-rose-600/30 hover:scale-105 active:scale-95 ml-2"
            title="End Call Session & Exit"
          >
            <FiPhoneOff className="w-5 h-5" />
            <span>End Call</span>
          </button>
        </div>

        <div className="hidden sm:block text-right">
          <span className="text-[11px] font-mono text-slate-400">WebRTC DTLS-SRTP Security</span>
        </div>
      </div>
    </div>
  );
};

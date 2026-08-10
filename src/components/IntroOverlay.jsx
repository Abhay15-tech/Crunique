import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const IntroOverlay = () => {
    const { introVisible, skipIntro, introMuted, toggleIntroAudio } = useApp();
    const videoRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        if (!introVisible) return;
        
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            if (video.duration && progressRef.current) {
                const pct = (video.currentTime / video.duration) * 100;
                progressRef.current.style.width = `${pct}%`;
            }
        };

        const handleEnded = () => {
            skipIntro();
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                video.muted = true;
                video.play();
            });
        }

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
        };
    }, [introVisible, skipIntro]);

    if (!introVisible) return null;

    return (
        <div className="intro-overlay">
            <video 
                ref={videoRef}
                className="intro-video-element" 
                playsInline 
                autoPlay 
                muted={introMuted}
                preload="auto"
            >
                <source src="front-end -animation.mp4" type="video/mp4" />
                Your browser does not support HTML5 video animation.
            </video>
            
            <div className="intro-overlay-controls">
                <div className="intro-brand-badge">
                    <img 
                        src="assets/images/crunique_logo.jpg" 
                        alt="Crunique Logo" 
                        className="intro-logo-img" 
                    />
                    <span className="intro-brand-name">CRUNIQUE</span>
                </div>
                
                <div className="intro-actions">
                    <button 
                        className="intro-btn intro-btn-secondary" 
                        onClick={toggleIntroAudio} 
                        title="Toggle Sound"
                    >
                        <span>{introMuted ? '🔇' : '🔊'}</span>
                        <span>{introMuted ? 'Unmute' : 'Mute'}</span>
                    </button>
                    <button 
                        className="intro-btn intro-btn-primary" 
                        onClick={skipIntro} 
                        title="Enter Store / Skip Intro"
                    >
                        Explore Store ➔
                    </button>
                </div>
            </div>

            <div className="intro-progress-bar-container" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '5px', background: 'rgba(255,255,255,0.2)', zIndex: 10 }}>
                <div ref={progressRef} style={{ width: '0%', height: '100%', background: 'linear-gradient(90deg, #66C673, #F28C28)', transition: 'width 0.1s linear' }}></div>
            </div>
        </div>
    );
};

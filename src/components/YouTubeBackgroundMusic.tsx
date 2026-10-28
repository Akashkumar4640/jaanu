import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { SceneId } from '../types';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YOUTUBE_VIDEO_ID = 'VCfrL292Gmk';

interface YouTubeBackgroundMusicProps {
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  currentScene: SceneId;
}

export const YouTubeBackgroundMusic: React.FC<YouTubeBackgroundMusicProps> = ({
  soundEnabled,
  onToggleSound,
  currentScene
}) => {
  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [isActuallyPlaying, setIsActuallyPlaying] = useState(false);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Load YouTube IFrame API script once
  useEffect(() => {
    const existingScript = document.getElementById('youtube-iframe-api');

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      // Prevent re-creating the player if it already exists
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('youtube-bg-audio-player', {
        height: '10',
        width: '10',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID, // Required by YouTube API to loop a single video
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          playsinline: 1,
          enablejsapi: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : ''
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            try {
              event.target.unMute();
              event.target.setVolume(100);
            } catch {
              // ignore
            }

            if (soundEnabledRef.current) {
              try {
                event.target.playVideo();
              } catch {
                setIsAutoplayBlocked(true);
              }
            }

            // Check after 1.2s whether browser autoplay restriction blocked playback
            setTimeout(() => {
              if (event.target && typeof event.target.getPlayerState === 'function') {
                const state = event.target.getPlayerState();
                // YT.PlayerState.PLAYING is 1
                if (state !== 1 && soundEnabledRef.current) {
                  setIsAutoplayBlocked(true);
                }
              }
            }, 1200);
          },
          onStateChange: (event: any) => {
            if (!window.YT) return;

            // 1: PLAYING
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsActuallyPlaying(true);
              setIsAutoplayBlocked(false);
            }
            // 2: PAUSED
            else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsActuallyPlaying(false);
            }
            // 0: ENDED -> Loop continuously from start
            else if (event.data === window.YT.PlayerState.ENDED) {
              try {
                event.target.seekTo(0, true);
                event.target.playVideo();
              } catch (e) {
                console.warn('Error looping song:', e);
              }
            }
          },
          onError: (e: any) => {
            console.warn('YouTube Player notice/error:', e);
          }
        }
      });
    };

    if (!window.YT) {
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    } else {
      initPlayer();
    }
  }, []);

  // Handle soundEnabled changes (Pause / Resume without restarting)
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady) return;

    try {
      if (soundEnabled) {
        playerRef.current.unMute();
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (err) {
      console.warn('Error updating YouTube playback:', err);
    }
  }, [soundEnabled, isPlayerReady]);

  // Start playback handler on user gesture
  const startPlayback = () => {
    if (playerRef.current) {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
        playerRef.current.playVideo();
        setIsAutoplayBlocked(false);
      } catch (err) {
        console.warn('Error starting playback:', err);
      }
    }
    if (!soundEnabled) {
      onToggleSound(true);
    }
  };

  // Global listener for first user interaction if browser blocked autoplay
  useEffect(() => {
    if (!isAutoplayBlocked) return;

    const handleInteraction = () => {
      if (soundEnabledRef.current && playerRef.current) {
        startPlayback();
      }
    };

    window.addEventListener('click', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [isAutoplayBlocked]);

  return (
    <>
      {/* Hidden YouTube IFrame Container - Off-screen and unobtrusive */}
      <div
        id="youtube-bg-container"
        style={{
          position: 'fixed',
          bottom: -20,
          right: -20,
          width: '10px',
          height: '10px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -9999,
          overflow: 'hidden'
        }}
        aria-hidden="true"
      >
        <div id="youtube-bg-audio-player" />
      </div>

      {/* Floating sound toggle for the Door Scene (since SceneNavigation is hidden on door) */}
      {currentScene === 'door' && (
        <div
          style={{
            position: 'fixed',
            top: 'clamp(12px, 2.5vh, 20px)',
            right: 'clamp(12px, 2.5vw, 20px)',
            zIndex: 999
          }}
        >
          <button
            onClick={() => onToggleSound(!soundEnabled)}
            aria-label={soundEnabled ? 'Mute background song' : 'Play background song'}
            title={soundEnabled ? 'Music is playing' : 'Music is muted (click to play song)'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: soundEnabled ? 'rgba(251, 207, 232, 0.85)' : 'rgba(255, 255, 255, 0.9)',
              border: '1.5px solid rgba(244, 114, 182, 0.45)',
              borderRadius: '9999px',
              cursor: 'pointer',
              color: '#701a75',
              fontSize: '0.82rem',
              fontWeight: 600,
              boxShadow: '0 2px 10px rgba(112, 26, 117, 0.12)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.25s ease'
            }}
          >
            {soundEnabled ? (
              <>
                <Volume2 size={16} color="#e11d48" />
                <Music size={14} color="#9333ea" style={{ animation: 'gentleBounce 1.5s infinite' }} />
                <span>Music On</span>
              </>
            ) : (
              <>
                <VolumeX size={16} color="#831843" />
                <span>Music Off</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Unobtrusive "Tap to Begin Our Little World ♡" button if autoplay is blocked by browser policy */}
      {isAutoplayBlocked && soundEnabled && (
        <div
          style={{
            position: 'fixed',
            bottom: currentScene === 'door' ? 'clamp(20px, 4vh, 32px)' : 'clamp(70px, 9vh, 85px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            animation: 'gentleBounce 2s infinite',
            maxWidth: '90%',
            textAlign: 'center'
          }}
        >
          <button
            onClick={startPlayback}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              fontSize: 'clamp(0.85rem, 1.8vh, 1rem)',
              boxShadow: '0 6px 20px rgba(225, 29, 72, 0.35)',
              border: '1.5px solid rgba(255, 255, 255, 0.6)',
              cursor: 'pointer'
            }}
            aria-label="Tap to Begin Our Little World"
          >
            <Music size={18} />
            <span>Tap to Begin Our Little World ♡</span>
            <Sparkles size={16} />
          </button>
        </div>
      )}
    </>
  );
};

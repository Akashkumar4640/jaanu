import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioControlsProps {
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  soundEnabled,
  onToggleSound
}) => {
  const handleToggle = () => {
    const nextState = !soundEnabled;
    onToggleSound(nextState);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        onClick={handleToggle}
        aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
        title={soundEnabled ? 'Sound is on' : 'Sound is muted (click to enable gentle music & effects)'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          background: soundEnabled ? 'rgba(251, 207, 232, 0.6)' : 'rgba(255, 255, 255, 0.8)',
          border: '1.5px solid rgba(244, 114, 182, 0.4)',
          borderRadius: '9999px',
          cursor: 'pointer',
          color: '#701a75',
          fontSize: '0.85rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(112, 26, 117, 0.08)'
        }}
      >
        {soundEnabled ? (
          <>
            <Volume2 size={16} color="#e11d48" />
            <span style={{ display: 'none' }} className="mobile-hidden">Sound On</span>
            <Music size={14} color="#9333ea" style={{ animation: 'gentleBounce 1.5s infinite' }} />
          </>
        ) : (
          <>
            <VolumeX size={16} color="#831843" />
            <span style={{ fontSize: '0.8rem' }}>Sound Off</span>
          </>
        )}
      </button>
    </div>
  );
};

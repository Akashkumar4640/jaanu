import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SceneId, SceneMeta } from '../types';
import { AudioControls } from './AudioControls';

interface SceneNavigationProps {
  currentScene: SceneId;
  scenes: SceneMeta[];
  canGoNext: boolean;
  onNext: () => void;
  onPrev: () => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  onOpenAssetManager?: () => void;
}

export const SceneNavigation: React.FC<SceneNavigationProps> = ({
  currentScene,
  scenes,
  canGoNext,
  onNext,
  onPrev,
  soundEnabled,
  onToggleSound
}) => {
  // Do not show navigation bar or progress indicator on the opening door scene
  if (currentScene === 'door') return null;

  const currentIndex = scenes.findIndex((s) => s.id === currentScene);
  const isFirstScene = currentIndex <= 1; // index 1 is FriendshipBand
  const isLastScene = currentIndex === scenes.length - 1;

  return (
    <nav className="bottom-nav" aria-label="Scene navigation">
      {/* Left side: Back button & Audio toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {!isFirstScene && (
          <button
            onClick={onPrev}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            aria-label="Previous scene"
          >
            <ArrowLeft size={16} />
            <span style={{ display: 'none' }} className="mobile-show-inline">Back</span>
          </button>
        )}
        <AudioControls soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
      </div>

      {/* Center: Miniature Chapter Dots / Indicators */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.7)',
          padding: '6px 14px',
          borderRadius: '9999px',
          border: '1px solid rgba(251, 207, 232, 0.6)'
        }}
        title={`Chapter ${currentIndex} of ${scenes.length - 1}: ${scenes[currentIndex]?.title}`}
      >
        {scenes.slice(1).map((s, idx) => {
          const actualIdx = idx + 1;
          const isActive = actualIdx === currentIndex;
          const isPassed = actualIdx < currentIndex;

          return (
            <div
              key={s.id}
              style={{
                width: isActive ? '20px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                backgroundColor: isActive ? '#e11d48' : isPassed ? '#f472b6' : '#fbcfe8',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 8px rgba(225, 29, 72, 0.5)' : 'none'
              }}
            />
          );
        })}
      </div>

      {/* Right side: Next Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {!isLastScene && (
          <button
            onClick={onNext}
            className="btn-primary"
            style={{
              padding: '8px 20px',
              fontSize: '0.9rem',
              opacity: canGoNext ? 1 : 0.6,
              cursor: canGoNext ? 'pointer' : 'not-allowed'
            }}
            disabled={!canGoNext}
            aria-label="Next scene"
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </nav>
  );
};

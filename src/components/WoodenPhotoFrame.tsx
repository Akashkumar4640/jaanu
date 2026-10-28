import React from 'react';

interface WoodenPhotoFrameProps {
  children: React.ReactNode;
  aspectRatio?: string;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
  dateCaption?: string;
}

export const WoodenPhotoFrame: React.FC<WoodenPhotoFrameProps> = ({
  children,
  aspectRatio = '4/5',
  maxWidth = 'min(450px, 46vh, 90vw)',
  maxHeight,
  className = '',
  dateCaption
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth,
        maxHeight
      }}
      className={className}
    >
      <div
        className="wooden-frame"
        style={{
          width: '100%',
          position: 'relative',
          padding: 'clamp(5px, 0.9vh, 8px)'
        }}
      >
        {/* Decorative corner accents */}
        <div style={{ position: 'absolute', top: '4px', left: '4px', color: '#fef08a', fontSize: '9px', opacity: 0.75, pointerEvents: 'none' }}>✦</div>
        <div style={{ position: 'absolute', top: '4px', right: '4px', color: '#fef08a', fontSize: '9px', opacity: 0.75, pointerEvents: 'none' }}>✦</div>
        <div style={{ position: 'absolute', bottom: '4px', left: '4px', color: '#fef08a', fontSize: '9px', opacity: 0.75, pointerEvents: 'none' }}>✦</div>
        <div style={{ position: 'absolute', bottom: '4px', right: '4px', color: '#fef08a', fontSize: '9px', opacity: 0.75, pointerEvents: 'none' }}>✦</div>

        {/* Inner mount / passe-partout: thin and refined to maximize photograph area */}
        <div
          style={{
            background: '#fffdfa',
            padding: 'clamp(3px, 0.5vh, 5px)',
            borderRadius: '6px',
            boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2)',
            width: '100%'
          }}
        >
          <div
            className="wooden-frame-inner"
            style={{
              width: '100%',
              aspectRatio,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {dateCaption && (
        <div
          style={{
            marginTop: 'clamp(2px, 0.6vh, 6px)',
            fontFamily: 'var(--font-handwriting)',
            fontSize: 'clamp(1rem, 2vh, 1.35rem)',
            color: '#701a75',
            fontWeight: 700,
            textShadow: '0 1px 2px rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>🗓️</span> {dateCaption}
        </div>
      )}
    </div>
  );
};

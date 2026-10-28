import React, { useState } from 'react';
import { WoodenPhotoFrame } from '../components/WoodenPhotoFrame';
import { playSound } from '../utils/audio';
import { Sparkles, Heart, CheckCircle, Shuffle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhotoPuzzleSceneProps {
  memoryIndex: number;
  memoryNumber: number;
  totalMemories: number;
  photoUrl: string;
  dateCaption: string;
  isSolved: boolean;
  board: number[];
  onBoardChange: (newBoard: number[]) => void;
  onSolved: () => void;
  onReshuffle?: () => void;
  onNext: () => void;
  soundEnabled: boolean;
}

export const PhotoPuzzleScene: React.FC<PhotoPuzzleSceneProps> = ({
  memoryNumber,
  totalMemories = 3,
  photoUrl,
  dateCaption,
  isSolved,
  board,
  onBoardChange,
  onSolved,
  onReshuffle,
  onNext,
  soundEnabled
}) => {
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const [showGentleNotice, setShowGentleNotice] = useState(false);

  const correctCount = board.reduce((count, val, idx) => (val === idx ? count + 1 : count), 0);

  const checkSolution = (currentBoard: number[]) => {
    const isNowSolved = currentBoard.every((val, idx) => val === idx);
    if (isNowSolved && !isSolved) {
      onSolved();

      if (soundEnabled) {
        playSound.celebration();
      }

      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#c084fc', '#f472b6', '#fef08a', '#fb7185']
        });
      } catch {
        // Fallback
      }
    }
  };

  const swapPieces = (idxA: number, idxB: number) => {
    if (idxA === idxB || isSolved) return;

    const newBoard = [...board];
    const temp = newBoard[idxA];
    newBoard[idxA] = newBoard[idxB];
    newBoard[idxB] = temp;

    onBoardChange(newBoard);
    checkSolution(newBoard);

    if (soundEnabled) {
      playSound.puzzleSnap();
    }
  };

  const handlePieceClick = (piecePos: number) => {
    if (isSolved) return;

    if (selectedPieceIndex === null) {
      setSelectedPieceIndex(piecePos);
    } else {
      swapPieces(selectedPieceIndex, piecePos);
      setSelectedPieceIndex(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, piecePos: number) => {
    if (isSolved) return;
    e.dataTransfer.setData('text/plain', piecePos.toString());
  };

  const handleDrop = (e: React.DragEvent, targetPiecePos: number) => {
    e.preventDefault();
    if (isSolved) return;

    const sourcePos = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!isNaN(sourcePos)) {
      swapPieces(sourcePos, targetPiecePos);
    }
  };

  const handleSolveManual = () => {
    const solved = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    onBoardChange(solved);
    onSolved();

    if (soundEnabled) {
      playSound.celebration();
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#fef08a', '#c084fc']
      });
    } catch {
      // Ignored
    }
  };

  const handleNextClick = () => {
    if (!isSolved) {
      setShowGentleNotice(true);
      setTimeout(() => setShowGentleNotice(false), 3000);
      return;
    }
    onNext();
  };

  return (
    <div
      className="scene-viewport paper-texture"
      style={{
        background: 'linear-gradient(180deg, #fffdfa 0%, #f3e8ff 50%, #fdf2f8 100%)',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Memory Badge */}
        <div style={{ marginBottom: 'clamp(2px, 0.4vh, 4px)' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(251, 207, 232, 0.85)',
              border: '1px solid #f472b6',
              padding: '2px 12px',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#831843'
            }}
          >
            <span>🌸</span>
            <span>Memory {memoryNumber} of {totalMemories}</span>
            {isSolved && <span>💖</span>}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div style={{ marginBottom: 'clamp(2px, 0.5vh, 5px)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 3.2vh, 2.1rem)',
              color: '#4a044e',
              fontWeight: 700,
              lineHeight: 1.1
            }}
          >
            Best Memory
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.75rem, 1.5vh, 0.92rem)',
              color: '#701a75',
              marginTop: '1px',
              padding: '0 8px'
            }}
          >
            "I Don't Break your Hope, This Friendship Never Ends"
          </p>
        </div>

        {/* Status / Instructions */}
        <div style={{ marginBottom: 'clamp(2px, 0.5vh, 5px)' }}>
          {isSolved ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(243, 232, 255, 0.95)',
                border: '1px solid #d8b4fe',
                padding: '3px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                color: '#581c87',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(147, 51, 234, 0.12)',
                animation: 'gentleBounce 2s infinite'
              }}
            >
              <Sparkles size={14} color="#9333ea" />
              <span>Memory restored! ♡</span>
            </div>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(251, 207, 232, 0.85)',
                padding: '3px 14px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                color: '#831843',
                fontWeight: 600
              }}
            >
              <Sparkles size={13} color="#ec4899" />
              <span>Tap any 2 pieces to swap them back together!</span>
            </div>
          )}
        </div>

        {/* Substantially Enlarged Wooden Photo Frame with 3x3 Puzzle (30-40% larger) */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              boxShadow: isSolved ? '0 0 28px rgba(250, 204, 21, 0.7)' : '0 8px 24px rgba(69, 26, 3, 0.15)',
              transition: 'box-shadow 0.4s ease',
              width: '100%',
              maxWidth: 'min(460px, 47vh, 90vw)'
            }}
          >
            <WoodenPhotoFrame maxWidth="min(460px, 47vh, 90vw)" aspectRatio="1/1">
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridTemplateRows: 'repeat(3, 1fr)',
                  gap: isSolved ? '0px' : '3px',
                  padding: isSolved ? '0px' : '3px',
                  background: isSolved ? 'transparent' : 'rgba(251, 207, 232, 0.45)',
                  transition: 'gap 0.3s ease, padding 0.3s ease',
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {board.map((pieceVal, currentPos) => {
                  const originalRow = Math.floor(pieceVal / 3);
                  const originalCol = pieceVal % 3;
                  const isSelected = selectedPieceIndex === currentPos;

                  return (
                    <div
                      key={currentPos}
                      onClick={() => handlePieceClick(currentPos)}
                      draggable={!isSolved}
                      onDragStart={(e) => handleDragStart(e, currentPos)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, currentPos)}
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: isSolved ? '0px' : '6px',
                        cursor: isSolved ? 'default' : 'pointer',
                        border: isSelected
                          ? '2.5px solid #e11d48'
                          : isSolved
                          ? 'none'
                          : '1px solid rgba(255,255,255,0.7)',
                        boxShadow: isSelected
                          ? '0 0 12px rgba(225, 29, 72, 0.9)'
                          : isSolved
                          ? 'none'
                          : '0 1px 4px rgba(0,0,0,0.1)',
                        transform: isSelected ? 'scale(0.96)' : 'scale(1)',
                        transition: 'all 0.18s ease',
                        touchAction: 'manipulation'
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${photoUrl})`,
                          backgroundSize: '300% 300%',
                          backgroundPosition: `${originalCol * 50}% ${originalRow * 50}%`,
                          backgroundRepeat: 'no-repeat'
                        }}
                      />

                      {!isSolved && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '3px',
                            fontSize: '9px',
                            fontWeight: 700,
                            color: '#fff',
                            textShadow: '0 1px 2px rgba(0,0,0,0.85)',
                            pointerEvents: 'none',
                            opacity: 0.75
                          }}
                        >
                          {pieceVal + 1}
                        </div>
                      )}
                    </div>
                  );
                })}

                {isSolved && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontSize: '20px',
                      animation: 'gentleBounce 2s infinite',
                      pointerEvents: 'none',
                      zIndex: 10
                    }}
                  >
                    💖
                  </div>
                )}
              </div>
            </WoodenPhotoFrame>
          </div>
        </div>

        {/* Date Displayed Beneath the Frame */}
        {dateCaption && (
          <div
            style={{
              marginTop: 'clamp(2px, 0.6vh, 5px)',
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(1.05rem, 2vh, 1.35rem)',
              color: '#701a75',
              fontWeight: 700,
              textShadow: '0 1px 2px rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>🗓️</span> {dateCaption}
          </div>
        )}

        {/* Progress Counter & Controls inline */}
        <div style={{ marginTop: 'clamp(3px, 0.6vh, 6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {isSolved ? (
            <div
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#be123c',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Heart size={15} fill="#e11d48" color="#e11d48" />
              <span>9 / 9 in correct position</span>
            </div>
          ) : (
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#701a75',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '3px 12px',
                borderRadius: '9999px',
                border: '1px solid #fed7aa'
              }}
            >
              {correctCount} / 9 in correct position
            </div>
          )}

          {!isSolved && onReshuffle && (
            <button
              onClick={onReshuffle}
              className="btn-secondary"
              style={{ padding: '3px 12px', fontSize: '0.76rem' }}
              title="Shuffle all pieces across the entire grid"
            >
              <Shuffle size={13} color="#db2777" />
              <span>Reshuffle 🔀</span>
            </button>
          )}

          {!isSolved && (
            <button
              onClick={handleSolveManual}
              className="btn-secondary"
              style={{ padding: '3px 12px', fontSize: '0.76rem' }}
            >
              <CheckCircle size={13} color="#9333ea" />
              <span>Solve Memory</span>
            </button>
          )}
        </div>

        {/* Friendly notice if Next is clicked before solving */}
        {showGentleNotice && !isSolved && (
          <div
            style={{
              marginTop: '3px',
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1rem',
              color: '#be123c',
              fontWeight: 700,
              animation: 'gentleBounce 1s infinite'
            }}
          >
            Please solve this memory to unlock the next chapter ♡
          </div>
        )}

        {/* Next Button */}
        <div style={{ marginTop: 'clamp(5px, 1vh, 10px)' }}>
          <button
            onClick={handleNextClick}
            className="btn-primary"
            style={{
              opacity: isSolved ? 1 : 0.6,
              cursor: isSolved ? 'pointer' : 'not-allowed',
              padding: 'clamp(5px, 0.9vh, 8px) clamp(18px, 3vw, 28px)',
              fontSize: 'clamp(0.85rem, 1.6vh, 0.95rem)'
            }}
          >
            <span>Next →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

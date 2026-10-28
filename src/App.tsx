import React, { useState } from 'react';
import { SceneId, SceneMeta, AssetConfig } from './types';
import { getCustomAssets } from './config/assets';
import { ParticleCanvas } from './components/ParticleCanvas';
import { SceneNavigation } from './components/SceneNavigation';
import { AssetManagerModal } from './components/AssetManagerModal';
import { YouTubeBackgroundMusic } from './components/YouTubeBackgroundMusic';

// Scenes
import { DoorScene } from './scenes/DoorScene';
import { FriendshipBandScene } from './scenes/FriendshipBandScene';
import { FirstPicScene } from './scenes/FirstPicScene';
import { PhotoPuzzleScene } from './scenes/PhotoPuzzleScene';
import { LetterScene } from './scenes/LetterScene';
import { PromiseListScene } from './scenes/PromiseListScene';
import { FinalScene } from './scenes/FinalScene';

const SCENES: SceneMeta[] = [
  { id: 'door', title: 'The Cute Door', shortTitle: 'Door', icon: '🚪', chapterNumber: 0 },
  { id: 'band', title: 'Friendship Band', shortTitle: 'Band', icon: '🎀', chapterNumber: 1 },
  { id: 'first-pic', title: 'First Pic', shortTitle: 'First Pic', icon: '🖼️', chapterNumber: 2 },
  { id: 'memory-1', title: 'Best Memory — 1', shortTitle: 'Mem 1', icon: '🧩', chapterNumber: 3 },
  { id: 'memory-2', title: 'Best Memory — 2', shortTitle: 'Mem 2', icon: '🧩', chapterNumber: 4 },
  { id: 'memory-3', title: 'Best Memory — 3', shortTitle: 'Mem 3', icon: '🧩', chapterNumber: 5 },
  { id: 'letter', title: 'A Letter Just for You', shortTitle: 'Letter', icon: '💌', chapterNumber: 6 },
  { id: 'promises', title: 'Promise List', shortTitle: 'Promises', icon: '✨', chapterNumber: 7 },
  { id: 'final', title: 'Always Here', shortTitle: 'Closing', icon: '🌸', chapterNumber: 8 }
];

import { generateRandomPuzzleBoard } from './utils/puzzle';

export function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('door');
  const [assets, setAssets] = useState<AssetConfig>(() => getCustomAssets());
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

  // Experience state preserved across backwards & forward navigation
  const [doorOpened, setDoorOpened] = useState(false);
  const [bandTied, setBandTied] = useState(false);
  const [firstPicRevealed, setFirstPicRevealed] = useState(false);

  // Independent state for the three consecutive memory puzzles with full Fisher-Yates randomization
  const [puzzlesSolved, setPuzzlesSolved] = useState<boolean[]>([false, false, false]);
  const [puzzleBoards, setPuzzleBoards] = useState<number[][]>(() => [
    generateRandomPuzzleBoard(),
    generateRandomPuzzleBoard(),
    generateRandomPuzzleBoard()
  ]);

  const [letterOpened, setLetterOpened] = useState(false);
  const [checkedPromises, setCheckedPromises] = useState<number[]>([0, 1, 2, 3, 4]);
  const [promisesSealed, setPromisesSealed] = useState(false);
  const [hugTriggered, setHugTriggered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentIndex = SCENES.findIndex((s) => s.id === currentScene);

  // Determine if user can proceed to next scene
  const canGoNext = () => {
    if (currentScene === 'memory-1') return puzzlesSolved[0];
    if (currentScene === 'memory-2') return puzzlesSolved[1];
    if (currentScene === 'memory-3') return puzzlesSolved[2];
    return true;
  };

  const goToNextScene = () => {
    if (currentIndex < SCENES.length - 1) {
      // If on a puzzle scene and not solved, don't proceed
      if (!canGoNext()) return;

      setCurrentScene(SCENES[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevScene = () => {
    if (currentIndex > 1) {
      setCurrentScene(SCENES[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updatePuzzleBoard = (index: number, newBoard: number[]) => {
    setPuzzleBoards((prev) => {
      const updated = [...prev];
      updated[index] = newBoard;
      return updated;
    });
  };

  const markPuzzleSolved = (index: number) => {
    setPuzzlesSolved((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const reshufflePuzzle = (index: number) => {
    setPuzzleBoards((prev) => {
      const updated = [...prev];
      updated[index] = generateRandomPuzzleBoard();
      return updated;
    });
    setPuzzlesSolved((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const togglePromise = (index: number) => {
    setCheckedPromises((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="app-layout">
      {/* Gentle floating ambient particles */}
      <ParticleCanvas />

      {/* Floating Asset Upload Shortcut in Top Corner */}
      {currentScene !== 'door' && (
        <button
          onClick={() => setIsAssetModalOpen(true)}
          style={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            zIndex: 90,
            background: 'rgba(255, 255, 255, 0.88)',
            border: '1.5px solid #fbcfe8',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#831843',
            boxShadow: '0 2px 8px rgba(112, 26, 117, 0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Change or upload your personal photos and signature"
        >
          <span>📸</span>
          <span style={{ display: 'none' }} className="mobile-hidden">Upload Photos</span>
        </button>
      )}

      {/* Main Scene Rendered by Current View */}
      <main className="app-main">
        {currentScene === 'door' && (
          <DoorScene
            soundEnabled={soundEnabled}
            onDoorOpened={() => {
              setDoorOpened(true);
              setCurrentScene('band');
            }}
          />
        )}

        {currentScene === 'band' && (
          <FriendshipBandScene
            bandTied={bandTied}
            onTieBand={() => setBandTied(true)}
            onNext={goToNextScene}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScene === 'first-pic' && (
          <FirstPicScene
            photoUrl={assets.firstPicUrl}
            revealed={firstPicRevealed}
            onRevealed={() => setFirstPicRevealed(true)}
            onNext={goToNextScene}
            soundEnabled={soundEnabled}
          />
        )}

        {/* Page 1 — Memory 1: The selfie taken by the girl */}
        {currentScene === 'memory-1' && (
          <PhotoPuzzleScene
            memoryIndex={0}
            memoryNumber={1}
            totalMemories={3}
            photoUrl={assets.bestMemory1Url}
            dateCaption={assets.memory1Date || '15 November 2025'}
            isSolved={puzzlesSolved[0]}
            board={puzzleBoards[0]}
            onBoardChange={(newBoard) => updatePuzzleBoard(0, newBoard)}
            onSolved={() => markPuzzleSolved(0)}
            onReshuffle={() => reshufflePuzzle(0)}
            onNext={goToNextScene}
            soundEnabled={soundEnabled}
          />
        )}

        {/* Page 2 — Memory 2: The second uploaded photograph */}
        {currentScene === 'memory-2' && (
          <PhotoPuzzleScene
            memoryIndex={1}
            memoryNumber={2}
            totalMemories={3}
            photoUrl={assets.bestMemory2Url}
            dateCaption={assets.memory2Date || '15 November 2025'}
            isSolved={puzzlesSolved[1]}
            board={puzzleBoards[1]}
            onBoardChange={(newBoard) => updatePuzzleBoard(1, newBoard)}
            onSolved={() => markPuzzleSolved(1)}
            onReshuffle={() => reshufflePuzzle(1)}
            onNext={goToNextScene}
            soundEnabled={soundEnabled}
          />
        )}

        {/* Page 3 — Memory 3: The third uploaded photograph */}
        {currentScene === 'memory-3' && (
          <PhotoPuzzleScene
            memoryIndex={2}
            memoryNumber={3}
            totalMemories={3}
            photoUrl={assets.bestMemory3Url}
            dateCaption={assets.memory3Date || '15 November 2025'}
            isSolved={puzzlesSolved[2]}
            board={puzzleBoards[2]}
            onBoardChange={(newBoard) => updatePuzzleBoard(2, newBoard)}
            onSolved={() => markPuzzleSolved(2)}
            onReshuffle={() => reshufflePuzzle(2)}
            onNext={goToNextScene}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScene === 'letter' && (
          <LetterScene
            isOpened={letterOpened}
            onOpenLetter={() => setLetterOpened(true)}
            onNext={goToNextScene}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScene === 'promises' && (
          <PromiseListScene
            checkedPromises={checkedPromises}
            onTogglePromise={togglePromise}
            promisesSealed={promisesSealed}
            onSealPromises={() => setPromisesSealed(true)}
            signatureUrl={assets.signatureUrl}
            onNext={goToNextScene}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScene === 'final' && (
          <FinalScene
            hugTriggered={hugTriggered}
            onTriggerHug={() => setHugTriggered(true)}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Bottom Navigation with Progress Indicators & Audio Toggle */}
      <SceneNavigation
        currentScene={currentScene}
        scenes={SCENES}
        canGoNext={canGoNext()}
        onNext={goToNextScene}
        onPrev={goToPrevScene}
        soundEnabled={soundEnabled}
        onToggleSound={setSoundEnabled}
        onOpenAssetManager={() => setIsAssetModalOpen(true)}
      />

      {/* Asset Manager / Upload Modal */}
      <AssetManagerModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        assets={assets}
        onUpdateAssets={setAssets}
      />

      {/* Persistent Continuous YouTube Background Soundtrack (VCfrL292Gmk) */}
      <YouTubeBackgroundMusic
        soundEnabled={soundEnabled}
        onToggleSound={setSoundEnabled}
        currentScene={currentScene}
      />
    </div>
  );
}
export default App;

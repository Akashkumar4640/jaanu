export type SceneId = 
  | 'door'
  | 'band'
  | 'first-pic'
  | 'memory-1'
  | 'memory-2'
  | 'memory-3'
  | 'letter'
  | 'promises'
  | 'final';

export interface SceneMeta {
  id: SceneId;
  title: string;
  shortTitle: string;
  icon: string;
  chapterNumber: number;
}

export interface AppState {
  currentScene: SceneId;
  doorKnocks: number;
  doorOpened: boolean;
  bandTied: boolean;
  firstPicRevealed: boolean;
  puzzlesSolved: boolean[];
  puzzleBoards: number[][];
  letterOpened: boolean;
  checkedPromises: number[];
  promisesSealed: boolean;
  hugTriggered: boolean;
  soundEnabled: boolean;
}

export interface AssetConfig {
  firstPicUrl: string;
  bestMemoryUrl: string;
  bestMemory1Url: string;
  bestMemory2Url: string;
  bestMemory3Url: string;
  memory1Date?: string;
  memory2Date?: string;
  memory3Date?: string;
  signatureUrl: string;
  envelopeUrl?: string;
}

import { AssetConfig } from '../types';

const defaultFirstPic = '/assets/first-pic.jpg';
const defaultBestMemory1 = '/assets/best-memory-1.jpg';
const defaultBestMemory2 = '/assets/best-memory-2.jpg';
const defaultBestMemory3 = '/assets/best-memory-3.jpg';
const defaultSignature = '/assets/signature.png';

export const DEFAULT_ASSETS: AssetConfig = {
  firstPicUrl: defaultFirstPic,
  bestMemoryUrl: defaultBestMemory1,
  bestMemory1Url: defaultBestMemory1,
  bestMemory2Url: defaultBestMemory2,
  bestMemory3Url: defaultBestMemory3,
  memory1Date: '15 November 2025',
  memory2Date: '15 November 2025',
  memory3Date: '15 November 2025',
  signatureUrl: defaultSignature,
  envelopeUrl: '/assets/envelope.png'
};

export const FALLBACK_ASSETS = {
  firstPic: defaultFirstPic,
  bestMemory1: defaultBestMemory1,
  bestMemory2: defaultBestMemory2,
  bestMemory3: defaultBestMemory3,
  signature: defaultSignature
};

const STORAGE_KEY = 'jaan_custom_assets_v6';

export function getCustomAssets(): AssetConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        firstPicUrl: parsed.firstPicUrl || DEFAULT_ASSETS.firstPicUrl,
        bestMemoryUrl: parsed.bestMemory1Url || parsed.bestMemoryUrl || DEFAULT_ASSETS.bestMemoryUrl,
        bestMemory1Url: parsed.bestMemory1Url || parsed.bestMemoryUrl || DEFAULT_ASSETS.bestMemory1Url,
        bestMemory2Url: parsed.bestMemory2Url || DEFAULT_ASSETS.bestMemory2Url,
        bestMemory3Url: parsed.bestMemory3Url || DEFAULT_ASSETS.bestMemory3Url,
        memory1Date: parsed.memory1Date || DEFAULT_ASSETS.memory1Date,
        memory2Date: parsed.memory2Date || DEFAULT_ASSETS.memory2Date,
        memory3Date: parsed.memory3Date || DEFAULT_ASSETS.memory3Date,
        signatureUrl: parsed.signatureUrl || DEFAULT_ASSETS.signatureUrl,
        envelopeUrl: parsed.envelopeUrl || DEFAULT_ASSETS.envelopeUrl
      };
    }
  } catch (e) {
    console.error('Error loading custom assets', e);
  }
  return DEFAULT_ASSETS;
}

export function saveCustomAssets(assets: Partial<AssetConfig>) {
  try {
    const current = getCustomAssets();
    const updated = { ...current, ...assets };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving custom assets', e);
    return DEFAULT_ASSETS;
  }
}

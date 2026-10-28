import React, { useRef } from 'react';
import { X, Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { AssetConfig } from '../types';
import { saveCustomAssets } from '../config/assets';

interface AssetManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: AssetConfig;
  onUpdateAssets: (newAssets: AssetConfig) => void;
}

export const AssetManagerModal: React.FC<AssetManagerModalProps> = ({
  isOpen,
  onClose,
  assets,
  onUpdateAssets
}) => {
  const firstPicInputRef = useRef<HTMLInputElement | null>(null);
  const memory1InputRef = useRef<HTMLInputElement | null>(null);
  const memory2InputRef = useRef<HTMLInputElement | null>(null);
  const memory3InputRef = useRef<HTMLInputElement | null>(null);
  const signatureInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (key: keyof AssetConfig, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const updated = saveCustomAssets({ [key]: dataUrl });
        onUpdateAssets(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(69, 26, 3, 0.45)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card-warm"
        style={{
          width: '100%',
          maxWidth: '580px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#701a75'
          }}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#4a044e', marginBottom: '6px' }}>
            🌸 Upload Personal Photos & Signature
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#701a75' }}>
            Upload directly from your device, or place files in <code style={{ background: '#fce7f3', padding: '2px 6px', borderRadius: '4px' }}>public/assets/</code>!
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Asset 1: First Pic */}
          <div style={{ background: '#fff', padding: '14px 16px', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ color: '#4a044e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={18} color="#e11d48" /> First Pic (Scene 3)
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#831843' }}>public/assets/first-pic.jpg</span>
              </div>
              <button
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => firstPicInputRef.current?.click()}
              >
                <Upload size={14} /> Upload
              </button>
              <input
                ref={firstPicInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload('firstPicUrl', e.target.files[0]);
                }}
              />
            </div>
          </div>

          {/* Asset 2: Best Memory 1 */}
          <div style={{ background: '#fff', padding: '14px 16px', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ color: '#4a044e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={18} color="#9333ea" /> Memory 1 Puzzle (Scene 4)
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#831843' }}>public/assets/best-memory-1.jpg</span>
              </div>
              <button
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => memory1InputRef.current?.click()}
              >
                <Upload size={14} /> Upload
              </button>
              <input
                ref={memory1InputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload('bestMemory1Url', e.target.files[0]);
                }}
              />
            </div>
          </div>

          {/* Asset 3: Best Memory 2 */}
          <div style={{ background: '#fff', padding: '14px 16px', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ color: '#4a044e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={18} color="#a855f7" /> Memory 2 Puzzle (Scene 4)
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#831843' }}>public/assets/best-memory-2.jpg</span>
              </div>
              <button
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => memory2InputRef.current?.click()}
              >
                <Upload size={14} /> Upload
              </button>
              <input
                ref={memory2InputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload('bestMemory2Url', e.target.files[0]);
                }}
              />
            </div>
          </div>

          {/* Asset 4: Best Memory 3 */}
          <div style={{ background: '#fff', padding: '14px 16px', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ color: '#4a044e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={18} color="#d97706" /> Memory 3 Puzzle (Scene 4)
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#831843' }}>public/assets/best-memory-3.jpg</span>
              </div>
              <button
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => memory3InputRef.current?.click()}
              >
                <Upload size={14} /> Upload
              </button>
              <input
                ref={memory3InputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload('bestMemory3Url', e.target.files[0]);
                }}
              />
            </div>
          </div>

          {/* Asset 5: Signature */}
          <div style={{ background: '#fff', padding: '14px 16px', borderRadius: '16px', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ color: '#4a044e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={18} color="#db2777" /> Signature PNG (Scene 6)
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#831843' }}>public/assets/signature.png</span>
              </div>
              <button
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => signatureInputRef.current?.click()}
              >
                <Upload size={14} /> Upload
              </button>
              <input
                ref={signatureInputRef}
                type="file"
                accept="image/png,image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload('signatureUrl', e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '22px', textAlign: 'center' }}>
          <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
            Done / Close
          </button>
        </div>
      </div>
    </div>
  );
};

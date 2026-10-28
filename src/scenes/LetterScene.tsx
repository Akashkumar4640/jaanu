import React, { useState } from 'react';
import { playSound } from '../utils/audio';

interface LetterSceneProps {
  isOpened: boolean;
  onOpenLetter: () => void;
  onNext: () => void;
  soundEnabled: boolean;
}

export const LetterScene: React.FC<LetterSceneProps> = ({
  isOpened,
  onOpenLetter,
  onNext,
  soundEnabled
}) => {
  const [openingStage, setOpeningStage] = useState<number>(isOpened ? 3 : 0);

  const handleEnvelopeClick = () => {
    if (openingStage > 0) return;

    if (soundEnabled) {
      playSound.paperOpen();
    }

    setOpeningStage(1); // envelope lifts & seal glows

    setTimeout(() => {
      setOpeningStage(2); // flap opens & paper rises
    }, 700);

    setTimeout(() => {
      setOpeningStage(3); // paper zooms into reading layout
      onOpenLetter();
    }, 1600);
  };

  return (
    <div
      className="paper-texture letter-scrollable"
      style={{
        background: 'linear-gradient(180deg, #fdfbf7 0%, #faf5ef 40%, #f5ece1 100%)',
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        padding: '28px 16px 48px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: '720px', width: '100%', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
              color: '#4a044e',
              fontWeight: 700
            }}
          >
            A Letter, sealed just for you
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1.4rem',
              color: '#831843',
              marginTop: '4px'
            }}
          >
            Words straight from the heart, with sincerity and warmth
          </p>
        </div>

        {/* Envelope Stage (shown when not opened or during animation) */}
        {openingStage < 3 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '30px auto'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem',
                color: '#db2777',
                fontWeight: 700,
                marginBottom: '16px',
                animation: 'gentleBounce 2s infinite'
              }}
            >
              Tap the letter to open it ♡
            </div>

            {/* Dimensional Envelope Container */}
            <div
              onClick={handleEnvelopeClick}
              role="button"
              tabIndex={0}
              aria-label="Open letter envelope"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleEnvelopeClick();
              }}
              style={{
                position: 'relative',
                width: '320px',
                height: '210px',
                cursor: openingStage === 0 ? 'pointer' : 'default',
                perspective: '1000px',
                transform: openingStage >= 1 ? 'translateY(-12px) scale(1.04)' : 'translateY(0) scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Envelope Back Base */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 18px 36px rgba(112, 26, 117, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.8)'
                }}
              />

              {/* Emerging Letter Paper Sheet inside */}
              <div
                style={{
                  position: 'absolute',
                  left: '20px',
                  right: '20px',
                  top: '15px',
                  height: '180px',
                  background: '#fffdfa',
                  borderRadius: '10px',
                  boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
                  padding: '16px',
                  transform: openingStage >= 2 ? 'translateY(-80px)' : 'translateY(0)',
                  transition: 'transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #fed7aa'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '1.4rem',
                    color: '#701a75',
                    fontWeight: 700
                  }}
                >
                  Sorry Jaan ♡
                </div>
                <div style={{ width: '60px', height: '2px', background: '#f472b6', margin: '6px 0' }} />
                <div style={{ fontSize: '11px', color: '#be185d', textAlign: 'center' }}>
                  Reading your personal letter...
                </div>
              </div>

              {/* Envelope Lower Flap & Side Folds */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
                  background: 'linear-gradient(180deg, #f472b6 0%, #db2777 100%)',
                  borderRadius: '0 0 16px 16px',
                  zIndex: 3
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
                  background: 'linear-gradient(90deg, #fbcfe8 0%, #f472b6 100%)',
                  borderRadius: '16px 0 0 16px',
                  zIndex: 3
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
                  background: 'linear-gradient(270deg, #fbcfe8 0%, #f472b6 100%)',
                  borderRadius: '0 16px 16px 0',
                  zIndex: 3
                }}
              />

              {/* Top Folding Flap */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '115px',
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  background: 'linear-gradient(180deg, #f9a8d4 0%, #f472b6 100%)',
                  transformOrigin: 'top center',
                  transform: openingStage >= 2 ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: openingStage >= 2 ? 1 : 4,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
              />

              {/* Wax Seal with Heart Emblem */}
              {openingStage < 2 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '95px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #f43f5e 0%, #be123c 60%, #881337 100%)',
                    boxShadow: openingStage >= 1
                      ? '0 0 18px rgba(244, 63, 94, 0.8)'
                      : '0 4px 10px rgba(136, 19, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fef08a',
                    fontSize: '18px',
                    zIndex: 5,
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    transition: 'box-shadow 0.4s ease'
                  }}
                >
                  ♡
                </div>
              )}
            </div>
          </div>
        )}

        {/* Opened Letter Paper (Responsive Reading Layout) */}
        {openingStage === 3 && (
          <div
            className="glass-card-warm"
            style={{
              padding: 'clamp(24px, 5vw, 44px)',
              position: 'relative',
              borderRadius: '24px',
              border: '2px solid #fed7aa',
              boxShadow: '0 20px 50px rgba(112, 26, 117, 0.12)',
              background: '#fffdfa',
              lineHeight: 1.75
            }}
          >
            {/* Decorative Corner Postage Stamp & Seal */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div
                style={{
                  border: '1.5px dashed #f472b6',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: '#fdf2f8',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#be123c',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                SPECIAL DELIVERY 💌
              </div>
            </div>

            {/* Letter Header Title */}
            <div style={{ textAlign: 'center', marginBottom: '28px', marginTop: '10px' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>🌸 ♡ 🌸</div>
              <h3
                style={{
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: 'clamp(2.4rem, 7vw, 3.6rem)',
                  color: '#4a044e',
                  fontWeight: 700,
                  lineHeight: 1.1
                }}
              >
                Sorry Jaan
              </h3>
              <div
                style={{
                  width: '120px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #ec4899, transparent)',
                  margin: '12px auto'
                }}
              />
            </div>

            {/* Introduction Paragraph - Exact wording */}
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#3b0764',
                marginBottom: '28px',
                textAlign: 'justify'
              }}
            >
              "It's really I'm very Lucky to have a Bestfriend like you Jaaan, We have shared a lot of memories, We shared more and more. I've Irritated you many times, but I never thought to Hurt you, But Now I've Understood that I've made mistake and I Hurt you Most, I Never wanted to see you crying, but my mistake made you cry, Naa Itha Venum ne Pannala Jaan, Unna Hurt Pannanum nu Nenachathu Illa, I Just made a mistake because of my own expectations, So I'll Promise you Ini Apdi Unna Hurt Panra Maari Nadandhukka Maaten, Un Trust ah Break Panna Maaten, I'm Sure in that. And Also I've to clarify three things to you Jaan, Ithu Naa Onnu nenachu sonnen,But  Ithu Thappa Convey Aagita Maari Feel Aachu, So Athanaala taa Unta Solren"
            </p>

            {/* Three Distinct Numbered Clarification Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', margin: '28px 0' }}>
              {/* Point 1 */}
              <div
                style={{
                  background: 'rgba(253, 242, 248, 0.85)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1.5px solid #fbcfe8',
                  boxShadow: '0 2px 8px rgba(244, 114, 182, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e11d48, #db2777)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    1
                  </span>
                  <strong style={{ fontFamily: 'var(--font-serif)', color: '#701a75', fontSize: '1.1rem' }}>
                    Clarification One
                  </strong>
                </div>
                <p style={{ fontSize: '0.98rem', color: '#4a044e', lineHeight: 1.7 }}>
                  "Naa Oru Time Kooda Unta Emotional ah Pesi Unna Enta Pesa Veikanum nu Nenachathu Illa Jaan, Also Naa Apdi Panrathu Romba Thappu So Naa Atha Pannunathu Illa Pannavu Maaten, But If I made you feel like that, I'm Very Sorry, Ini Unna Apdi Naa Emotional ah Pesi Unna Pesa Veikura Maari Feel Panna Veika Maaten, Naan Naanaa Iruppen, Thats Sure."
                </p>
              </div>

              {/* Point 2 */}
              <div
                style={{
                  background: 'rgba(243, 232, 255, 0.85)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1.5px solid #e9d5ff',
                  boxShadow: '0 2px 8px rgba(147, 51, 234, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #9333ea, #7e22ce)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    2
                  </span>
                  <strong style={{ fontFamily: 'var(--font-serif)', color: '#581c87', fontSize: '1.1rem' }}>
                    Clarification Two
                  </strong>
                </div>
                <p style={{ fontSize: '0.98rem', color: '#3b0764', lineHeight: 1.7 }}>
                  "From the Day when I talk to you to the day now, Ovvoru Time uh Naa Unna Oru Best Friend ah taa Paakuren also Friend Apdingurathu Thandi Naa Unna En Kooda Porakkatha Sister ah taa Paakuren, Even Untaye Naa Nerayaa Time Solliruken Nee Enakku Sister Feel Kudukkura nu, So Inaiku Mattum Illa, Unna Epovume Bestest Friend and Caring Sister ah taa Paapen, I'm Sure in that"
                </p>
              </div>

              {/* Point 3 */}
              <div
                style={{
                  background: 'rgba(255, 237, 213, 0.85)',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1.5px solid #fed7aa',
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #d97706, #b45309)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    3
                  </span>
                  <strong style={{ fontFamily: 'var(--font-serif)', color: '#78350f', fontSize: '1.1rem' }}>
                    Clarification Three
                  </strong>
                </div>
                <p style={{ fontSize: '0.98rem', color: '#451a03', lineHeight: 1.7 }}>
                  "Anaiku Naa Unta Time Eduthuko nu Sonnathuku Apro mu Naa Vandhu Unta Pesu Pesu nu Sonnathuku Karanam Unna Disturb Pannanum nu Illa, Naa Unna Hurt Panniten Unta Pesa Mudiyama Poiruche nu taa Apdi Solitu Irundhen, But Un School la Nadandha Old Incident Maari Unna Feel Panna Vechuten nu Nenaikuren , But naa unmyaa apdilaa nenachu pannala Jaan Im Very Sorry Jaan, Naa Andha Alavukku Unna Disturb Pannanum nu la Nenachathu Illa, Apdi Pannavu Maaten, Ini Unakku Andha Uncomfortable Feel Thara Maaten Sorry Jaan"
                </p>
              </div>
            </div>

            {/* Final Clarification - Exact wording */}
            <div
              style={{
                marginTop: '28px',
                paddingTop: '20px',
                borderTop: '1px solid #fbcfe8',
                textAlign: 'center'
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
                  color: '#701a75',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  lineHeight: 1.7
                }}
              >
                "Ipo Ithellam uh Unna Hurt Pannanum nu Sollala Jaan, It's Just to Clarify the mistakes and corrections which I have done, Sorry for Everything Jaan, Ini Unna Epovume Hurt Panna Maaten, Un Trust Break Panna Maaten"
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '1.6rem',
                  color: '#be123c',
                  marginTop: '12px'
                }}
              >
                With honest care & kindness ♡
              </div>
            </div>

            {/* Next navigation */}
            <div style={{ marginTop: '36px', textAlign: 'center' }}>
              <button
                onClick={onNext}
                className="btn-primary"
                style={{ padding: '12px 38px', fontSize: '1.05rem' }}
              >
                <span>Next →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// CyberAudio Engine using Web Audio API
// No external assets required. Pure synthesis.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted: boolean = localStorage.getItem('cyberlearn_sound_muted') === 'true';

export const isSoundMuted = (): boolean => isMuted;

export const toggleSound = (): boolean => {
    isMuted = !isMuted;
    localStorage.setItem('cyberlearn_sound_muted', String(isMuted));
    if (masterGain) {
        masterGain.gain.value = isMuted ? 0 : 0.3;
    }
    return isMuted;
};

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.3; // Master volume
        masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
};

type SoundType = 'hover' | 'click' | 'type' | 'error' | 'success' | 'move' | 'open' | 'page';

export const playSound = (type: SoundType) => {
    try {
        if (isMuted) return;
        initAudio();
        if (!audioCtx || !masterGain) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(masterGain);

        const now = audioCtx.currentTime;

        switch (type) {
            case 'hover':
                // High pitch short blip
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;

            case 'click':
                // Mechanical click
                osc.type = 'square';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            
            case 'type':
                // Keyboard click
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400 + Math.random() * 100, now);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
                break;

            case 'move':
                // Drone movement (woosh)
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.linearRampToValueAtTime(300, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;

            case 'error':
                // Low buzz glitch
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.linearRampToValueAtTime(80, now + 0.3);
                
                // Add some noise simulation via modulation
                const lfo = audioCtx.createOscillator();
                lfo.type = 'square';
                lfo.frequency.value = 50;
                lfo.connect(gain.gain);
                lfo.start(now);
                lfo.stop(now + 0.3);

                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'success':
                // Power up chord
                const freqs = [440, 554, 659]; // A major
                freqs.forEach((f, i) => {
                    const o = audioCtx!.createOscillator();
                    const g = audioCtx!.createGain();
                    o.type = 'triangle';
                    o.frequency.value = f;
                    o.connect(g);
                    g.connect(masterGain!);
                    g.gain.setValueAtTime(0, now);
                    g.gain.linearRampToValueAtTime(0.1, now + 0.1 + (i*0.05));
                    g.gain.linearRampToValueAtTime(0, now + 0.6);
                    o.start(now);
                    o.stop(now + 0.6);
                });
                return; // Special case, handled internally
            
            case 'open':
                // UI Open
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.linearRampToValueAtTime(800, now + 0.2);
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'page':
                // Page turn - soft noise burst with filter sweep
                const bufferSize = audioCtx.sampleRate * 0.15;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
                const noise = audioCtx.createBufferSource();
                noise.buffer = buffer;
                
                const filter = audioCtx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(500, now);
                filter.frequency.linearRampToValueAtTime(2000, now + 0.15);
                
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                
                noise.connect(filter);
                filter.connect(gain);
                noise.start(now);
                break;
        }

    } catch (e) {
        console.warn('Audio play failed', e);
    }
};

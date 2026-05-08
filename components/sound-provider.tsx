"use client";

import { createContext, useContext, useCallback, useRef, useEffect } from "react";

interface SoundContextType {
  playClick: () => void;
  playHover: () => void;
  playWhoosh: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function useSounds() {
  const context = useContext(SoundContext);
  if (!context) {
    return {
      playClick: () => {},
      playHover: () => {},
      playWhoosh: () => {},
    };
  }
  return context;
}

interface SoundProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function SoundProvider({ children, enabled = true }: SoundProviderProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && enabled) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return () => {
      audioContextRef.current?.close();
    };
  }, [enabled]);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.03) => {
      if (!audioContextRef.current || !enabled) return;

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    },
    [enabled]
  );

  const playClick = useCallback(() => {
    playTone(800, 0.08, "sine", 0.02);
    setTimeout(() => playTone(1200, 0.05, "sine", 0.015), 20);
  }, [playTone]);

  const playHover = useCallback(() => {
    playTone(600, 0.06, "sine", 0.01);
  }, [playTone]);

  const playWhoosh = useCallback(() => {
    if (!audioContextRef.current || !enabled) return;

    const ctx = audioContextRef.current;
    const duration = 0.3;

    // White noise for whoosh
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.02;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + duration * 0.5);
    filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + duration);
    filter.Q.value = 1;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + duration);
  }, [enabled]);

  return (
    <SoundContext.Provider value={{ playClick, playHover, playWhoosh }}>
      {children}
    </SoundContext.Provider>
  );
}

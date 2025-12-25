'use client'

import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext'

export default function VolumeControl() {
  const { volume, isMuted, setVolume, toggleMute } = useAudioPlayer()

  const VolumeIcon = isMuted || volume === 0
    ? VolumeX
    : volume < 0.3
      ? Volume
      : volume < 0.7
        ? Volume1
        : Volume2

  return (
    <div className="hidden md:flex items-center gap-2">
      <button
        onClick={toggleMute}
        className="p-2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon className="w-5 h-5" />
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-24 h-1 bg-[var(--background-secondary)] rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:bg-[var(--accent)]
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:hover:scale-110"
        aria-label="Volume"
      />
    </div>
  )
}

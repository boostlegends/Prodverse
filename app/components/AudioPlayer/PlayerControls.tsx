'use client'

import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext'

export default function PlayerControls() {
  const { isPlaying, togglePlay, playNext, playPrevious, queue, queueIndex } = useAudioPlayer()

  const hasPrevious = queueIndex > 0
  const hasNext = queueIndex < queue.length - 1

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <button
        onClick={playPrevious}
        disabled={!hasPrevious}
        className="p-2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed transition"
        aria-label="Previous track"
      >
        <SkipBack className="w-5 h-5" />
      </button>

      <button
        onClick={togglePlay}
        className="p-3 rounded-full bg-[var(--accent)] text-black hover:scale-105 transition-transform"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </button>

      <button
        onClick={playNext}
        disabled={!hasNext}
        className="p-2 text-[var(--foreground-secondary)] hover:text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed transition"
        aria-label="Next track"
      >
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  )
}

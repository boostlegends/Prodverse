'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext'
import TrackInfo from './TrackInfo'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'

export default function AudioPlayer() {
  const { currentTrack } = useAudioPlayer()

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--card-border)] backdrop-blur-xl"
          style={{ background: 'var(--nav-bg)' }}
        >
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between h-20 px-4 max-w-screen-2xl mx-auto">
            {/* Left: Track Info */}
            <div className="flex-1 min-w-0 max-w-xs">
              <TrackInfo />
            </div>

            {/* Center: Controls + Progress */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
              <PlayerControls />
              <ProgressBar />
            </div>

            {/* Right: Volume */}
            <div className="flex-1 flex justify-end max-w-xs">
              <VolumeControl />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden px-4 py-3">
            {/* Row 1: Track info + Controls */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <TrackInfo />
              </div>
              <PlayerControls />
            </div>

            {/* Row 2: Progress bar */}
            <ProgressBar />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Music } from 'lucide-react'
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext'

export default function TrackInfo() {
  const { currentTrack } = useAudioPlayer()

  if (!currentTrack) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTrack.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="flex items-center gap-3 min-w-0"
      >
        {/* Cover art */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-secondary)]/20 flex-shrink-0">
          {currentTrack.imageUrl ? (
            <Image
              src={currentTrack.imageUrl}
              alt={currentTrack.title}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-6 h-6 text-[var(--accent)]" />
            </div>
          )}
        </div>

        {/* Track info */}
        <div className="min-w-0">
          <p className="font-medium truncate text-sm md:text-base">
            {currentTrack.title}
          </p>
          <p className="text-xs md:text-sm text-[var(--foreground-secondary)] truncate">
            {currentTrack.artist || 'AI Generated'}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

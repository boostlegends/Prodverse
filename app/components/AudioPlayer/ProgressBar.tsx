'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext'

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function ProgressBar() {
  const { currentTime, duration, seek, currentTrack, isPlaying } = useAudioPlayer()
  const progressRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [dragProgress, setDragProgress] = useState(0)
  const [hoverProgress, setHoverProgress] = useState(0)
  const [hoverTime, setHoverTime] = useState(0)

  // Use track duration as fallback
  const effectiveDuration = duration > 0 ? duration : (currentTrack?.duration || 0)
  const progress = effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0
  const displayProgress = isDragging ? dragProgress : progress

  const calculateProgress = useCallback((clientX: number) => {
    if (!progressRef.current) return 0
    const rect = progressRef.current.getBoundingClientRect()
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
  }, [])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || effectiveDuration === 0) return
    const percent = calculateProgress(e.clientX)
    seek((percent / 100) * effectiveDuration)
  }, [effectiveDuration, seek, calculateProgress])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (effectiveDuration === 0) return
    e.preventDefault()
    setIsDragging(true)
    const percent = calculateProgress(e.clientX)
    setDragProgress(percent)
  }, [effectiveDuration, calculateProgress])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (effectiveDuration === 0) return
    const percent = calculateProgress(e.clientX)
    setHoverProgress(percent)
    setHoverTime((percent / 100) * effectiveDuration)
  }, [effectiveDuration, calculateProgress])

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (effectiveDuration === 0) return
    const touch = e.touches[0]
    setIsDragging(true)
    setDragProgress(calculateProgress(touch.clientX))
  }, [effectiveDuration, calculateProgress])

  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      setDragProgress(calculateProgress(clientX))
    }

    const handleEnd = (e: MouseEvent | TouchEvent) => {
      const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
      const percent = calculateProgress(clientX)
      seek((percent / 100) * effectiveDuration)
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleEnd)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, effectiveDuration, seek, calculateProgress])

  const showHandle = isHovering || isDragging || isPlaying
  const isActive = isHovering || isDragging

  return (
    <div className="flex items-center gap-3 flex-1 max-w-xl w-full">
      {/* Current time */}
      <span className="text-[11px] font-medium text-[var(--foreground-secondary)] w-10 text-right tabular-nums select-none">
        {formatTime(currentTime)}
      </span>

      {/* Progress bar container */}
      <div
        ref={progressRef}
        onClick={handleSeek}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        className="relative flex-1 h-5 flex items-center cursor-pointer select-none touch-none"
      >
        {/* Track background */}
        <motion.div
          animate={{ height: isActive ? 6 : 4 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-x-0 bg-white/20 rounded-full overflow-hidden"
        >
          {/* Hover preview fill */}
          <AnimatePresence>
            {isHovering && !isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-y-0 left-0 bg-white/10 rounded-full"
                style={{ width: `${hoverProgress}%` }}
              />
            )}
          </AnimatePresence>

          {/* Progress fill with gradient */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${displayProgress}%`,
              background: isActive
                ? 'linear-gradient(90deg, #a3e635 0%, #84cc16 50%, #65a30d 100%)'
                : 'linear-gradient(90deg, #a3e635 0%, #84cc16 100%)',
            }}
            transition={{ duration: isDragging ? 0 : 0.1 }}
          />
        </motion.div>

        {/* Seek handle */}
        <motion.div
          initial={false}
          animate={{
            scale: isActive ? 1 : 0.8,
            opacity: showHandle ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="absolute top-1/2 -translate-y-1/2 z-10"
          style={{ left: `calc(${displayProgress}% - 6px)` }}
        >
          <div
            className="w-3 h-3 bg-white rounded-full shadow-lg"
            style={{
              boxShadow: isActive
                ? '0 0 10px rgba(163, 230, 53, 0.5), 0 2px 8px rgba(0,0,0,0.3)'
                : '0 2px 4px rgba(0,0,0,0.2)',
            }}
          />
        </motion.div>

        {/* Time tooltip on hover */}
        <AnimatePresence>
          {isHovering && !isDragging && effectiveDuration > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-8 px-2 py-1 bg-[#282828] text-white text-[11px] font-medium rounded shadow-lg pointer-events-none"
              style={{
                left: `${hoverProgress}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {formatTime(hoverTime)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Duration */}
      <span className="text-[11px] font-medium text-[var(--foreground-secondary)] w-10 tabular-nums select-none">
        {formatTime(effectiveDuration)}
      </span>
    </div>
  )
}

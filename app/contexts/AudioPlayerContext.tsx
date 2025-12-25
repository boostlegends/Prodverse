'use client'

import { createContext, useContext, useReducer, useRef, useEffect, useCallback } from 'react'
import type { Track, AudioPlayerState, AudioPlayerActions } from '@/app/types/audio'

type AudioPlayerContextType = AudioPlayerState & AudioPlayerActions

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

type Action =
  | { type: 'SET_TRACK'; track: Track }
  | { type: 'SET_PLAYING'; isPlaying: boolean }
  | { type: 'SET_CURRENT_TIME'; time: number }
  | { type: 'SET_DURATION'; duration: number }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_QUEUE'; queue: Track[] }
  | { type: 'SET_QUEUE_INDEX'; index: number }
  | { type: 'ADD_TO_QUEUE'; track: Track }
  | { type: 'CLEAR_QUEUE' }

const initialState: AudioPlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isMuted: false,
  queue: [],
  queueIndex: -1,
}

function audioReducer(state: AudioPlayerState, action: Action): AudioPlayerState {
  switch (action.type) {
    case 'SET_TRACK':
      return { ...state, currentTrack: action.track, currentTime: 0, duration: 0 }
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.isPlaying }
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.time }
    case 'SET_DURATION':
      return { ...state, duration: action.duration }
    case 'SET_VOLUME':
      return { ...state, volume: action.volume, isMuted: action.volume === 0 }
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted }
    case 'SET_QUEUE':
      return { ...state, queue: action.queue }
    case 'SET_QUEUE_INDEX':
      return { ...state, queueIndex: action.index }
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.track] }
    case 'CLEAR_QUEUE':
      return { ...state, queue: [], queueIndex: -1 }
    default:
      return state
  }
}

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, dispatch] = useReducer(audioReducer, initialState)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.preload = 'metadata'

    // Load saved volume
    const savedVolume = localStorage.getItem('player-volume')
    if (savedVolume) {
      const vol = parseFloat(savedVolume)
      dispatch({ type: 'SET_VOLUME', volume: vol })
      audioRef.current.volume = vol
    }

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      dispatch({ type: 'SET_CURRENT_TIME', time: audio.currentTime })
    }

    const handleLoadedMetadata = () => {
      if (audio.duration && isFinite(audio.duration)) {
        dispatch({ type: 'SET_DURATION', duration: audio.duration })
      }
    }

    const handleDurationChange = () => {
      if (audio.duration && isFinite(audio.duration)) {
        dispatch({ type: 'SET_DURATION', duration: audio.duration })
      }
    }

    const handleCanPlay = () => {
      // Fallback: use track duration if audio duration not available
      if ((!audio.duration || !isFinite(audio.duration)) && state.currentTrack?.duration) {
        dispatch({ type: 'SET_DURATION', duration: state.currentTrack.duration })
      }
    }

    const handleEnded = () => {
      dispatch({ type: 'SET_PLAYING', isPlaying: false })
      // Auto-play next if available
      if (state.queueIndex < state.queue.length - 1) {
        playNext()
      }
    }

    const handlePlay = () => dispatch({ type: 'SET_PLAYING', isPlaying: true })
    const handlePause = () => dispatch({ type: 'SET_PLAYING', isPlaying: false })

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [state.queueIndex, state.queue.length, state.currentTrack?.duration])

  // Update audio volume when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.isMuted ? 0 : state.volume
    }
  }, [state.volume, state.isMuted])

  // Save volume to localStorage
  useEffect(() => {
    localStorage.setItem('player-volume', String(state.volume))
  }, [state.volume])

  const play = useCallback((track?: Track) => {
    const audio = audioRef.current
    if (!audio) return

    if (track) {
      // Check if track is already in queue
      const existingIndex = state.queue.findIndex(t => t.id === track.id)

      if (existingIndex >= 0) {
        dispatch({ type: 'SET_QUEUE_INDEX', index: existingIndex })
      } else {
        // Add to queue and set as current
        dispatch({ type: 'ADD_TO_QUEUE', track })
        dispatch({ type: 'SET_QUEUE_INDEX', index: state.queue.length })
      }

      dispatch({ type: 'SET_TRACK', track })
      audio.src = track.streamUrl || track.audioUrl
      audio.load()
      audio.play().catch(console.error)
    } else if (state.currentTrack) {
      audio.play().catch(console.error)
    }
  }, [state.queue, state.currentTrack])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause()
    } else {
      play()
    }
  }, [state.isPlaying, pause, play])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      dispatch({ type: 'SET_CURRENT_TIME', time })
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: 'SET_VOLUME', volume })
  }, [])

  const toggleMute = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE' })
  }, [])

  const addToQueue = useCallback((track: Track) => {
    dispatch({ type: 'ADD_TO_QUEUE', track })
  }, [])

  const playNext = useCallback(() => {
    if (state.queueIndex < state.queue.length - 1) {
      const nextIndex = state.queueIndex + 1
      const nextTrack = state.queue[nextIndex]
      dispatch({ type: 'SET_QUEUE_INDEX', index: nextIndex })
      dispatch({ type: 'SET_TRACK', track: nextTrack })

      if (audioRef.current) {
        audioRef.current.src = nextTrack.streamUrl || nextTrack.audioUrl
        audioRef.current.load()
        audioRef.current.play().catch(console.error)
      }
    }
  }, [state.queueIndex, state.queue])

  const playPrevious = useCallback(() => {
    if (state.queueIndex > 0) {
      const prevIndex = state.queueIndex - 1
      const prevTrack = state.queue[prevIndex]
      dispatch({ type: 'SET_QUEUE_INDEX', index: prevIndex })
      dispatch({ type: 'SET_TRACK', track: prevTrack })

      if (audioRef.current) {
        audioRef.current.src = prevTrack.streamUrl || prevTrack.audioUrl
        audioRef.current.load()
        audioRef.current.play().catch(console.error)
      }
    }
  }, [state.queueIndex, state.queue])

  const clearQueue = useCallback(() => {
    audioRef.current?.pause()
    dispatch({ type: 'CLEAR_QUEUE' })
    dispatch({ type: 'SET_TRACK', track: null as unknown as Track })
  }, [])

  const value: AudioPlayerContextType = {
    ...state,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    addToQueue,
    playNext,
    playPrevious,
    clearQueue,
  }

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}

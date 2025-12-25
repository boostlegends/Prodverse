'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Music,
  Wand2,
  Loader2,
  Play,
  Pause,
  Download,
  RefreshCw,
  Sparkles,
  Mic,
  MicOff,
  Check,
  ListPlus
} from 'lucide-react'
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext'

interface Song {
  id: string
  title: string
  audioUrl: string
  streamUrl: string
  imageUrl?: string
  duration?: number
}

interface GenerationResult {
  taskId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  songs: Song[]
  errorMessage?: string
}

export default function MusicGenerator() {
  // Global audio player
  const { play, pause, currentTrack, isPlaying, addToQueue } = useAudioPlayer()

  // Form state
  const [customMode, setCustomMode] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [style, setStyle] = useState('')
  const [instrumental, setInstrumental] = useState(false)
  const [vocalGender, setVocalGender] = useState<'m' | 'f' | ''>('')
  const [model, setModel] = useState('V5')

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [taskId, setTaskId] = useState<string | null>(null)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pollCount, setPollCount] = useState(0)

  // Save songs to database
  const saveSongsToDb = useCallback(async (songs: Song[], taskId: string, songStyle?: string, songPrompt?: string) => {
    for (const song of songs) {
      try {
        await fetch('/api/songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: song.title,
            audioUrl: song.audioUrl,
            streamUrl: song.streamUrl,
            imageUrl: song.imageUrl,
            duration: song.duration,
            style: songStyle,
            prompt: songPrompt,
            taskId: taskId,
            sunoId: song.id,
          }),
        })
      } catch (err) {
        console.error('Failed to save song:', err)
      }
    }
  }, [])

  // Poll for results
  const pollForResults = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/suno/status?taskId=${id}`)
      const data = await response.json()

      if (data.success) {
        setResult({
          taskId: id,
          status: data.status,
          songs: data.songs || [],
          errorMessage: data.errorMessage,
        })

        if (data.status === 'completed' || data.status === 'failed') {
          setIsGenerating(false)
          // Auto-save completed songs to database
          if (data.status === 'completed' && data.songs?.length > 0) {
            saveSongsToDb(data.songs, id, style || prompt, prompt)
          }
          return true // Stop polling
        }
      }
      return false // Continue polling
    } catch (err) {
      console.error('Poll error:', err)
      return false
    }
  }, [saveSongsToDb, style, prompt])

  useEffect(() => {
    if (!taskId || !isGenerating) return

    const interval = setInterval(async () => {
      setPollCount(prev => prev + 1)
      const done = await pollForResults(taskId)
      if (done || pollCount >= 30) {
        clearInterval(interval)
        if (pollCount >= 30) {
          setError('Generation timed out. Please try again.')
          setIsGenerating(false)
        }
      }
    }, 10000) // Poll every 10 seconds

    return () => clearInterval(interval)
  }, [taskId, isGenerating, pollCount, pollForResults])

  const handleGenerate = async () => {
    setError(null)
    setResult(null)
    setPollCount(0)

    // Validation
    if (customMode) {
      if (!title.trim() || !style.trim()) {
        setError('Title and style are required in custom mode')
        return
      }
    } else {
      if (!prompt.trim()) {
        setError('Please describe the music you want to create')
        return
      }
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/suno/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customMode,
          prompt: customMode ? prompt : prompt, // lyrics in custom mode
          title: customMode ? title : undefined,
          style: customMode ? style : undefined,
          instrumental,
          vocalGender: vocalGender || undefined,
          model,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTaskId(data.taskId)
        setResult({
          taskId: data.taskId,
          status: 'pending',
          songs: [],
        })
      } else {
        setError(data.error || 'Failed to start generation')
        setIsGenerating(false)
      }
    } catch (err) {
      console.error('Generate error:', err)
      setError('Failed to connect to server')
      setIsGenerating(false)
    }
  }

  const handlePlay = (song: Song) => {
    const isCurrentSong = currentTrack?.id === song.id
    if (isCurrentSong && isPlaying) {
      pause()
    } else {
      play({
        id: song.id,
        title: song.title,
        audioUrl: song.audioUrl,
        streamUrl: song.streamUrl,
        imageUrl: song.imageUrl,
        duration: song.duration,
        artist: 'Suno AI'
      })
    }
  }

  const handleAddToQueue = (song: Song) => {
    addToQueue({
      id: song.id,
      title: song.title,
      audioUrl: song.audioUrl,
      streamUrl: song.streamUrl,
      imageUrl: song.imageUrl,
      duration: song.duration,
      artist: 'Suno AI'
    })
  }

  const isCurrentlyPlaying = (song: Song) =>
    currentTrack?.id === song.id && isPlaying

  const downloadSong = (song: Song, index: number) => {
    const link = document.createElement('a')
    link.href = song.audioUrl || song.streamUrl
    link.download = `${song.title || `song_${index + 1}`}.mp3`
    link.click()
  }

  const resetForm = () => {
    setPrompt('')
    setTitle('')
    setStyle('')
    setTaskId(null)
    setResult(null)
    setError(null)
    setPollCount(0)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="theme-card p-6 rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-[var(--accent)]/20">
            <Wand2 className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Music Generator</h2>
            <p className="text-sm text-[var(--foreground-secondary)]">
              Powered by Suno AI
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setCustomMode(false)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              !customMode
                ? 'bg-[var(--accent)] text-black'
                : 'bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Simple Mode
          </button>
          <button
            onClick={() => setCustomMode(true)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              customMode
                ? 'bg-[var(--accent)] text-black'
                : 'bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
            }`}
          >
            <Music className="w-4 h-4 inline mr-2" />
            Custom Mode
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {customMode ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Song Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter song title..."
                  className="theme-input w-full"
                  disabled={isGenerating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Style / Genre</label>
                <input
                  type="text"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  placeholder="e.g., pop, upbeat, electronic, acoustic..."
                  className="theme-input w-full"
                  disabled={isGenerating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Lyrics (optional)</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your lyrics here..."
                  rows={4}
                  className="theme-input w-full resize-none"
                  disabled={isGenerating}
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">Describe your music</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., An upbeat electronic dance track with synth melodies and a driving beat..."
                rows={3}
                className="theme-input w-full resize-none"
                disabled={isGenerating}
              />
            </div>
          )}

          {/* Options Row */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={instrumental}
                onChange={(e) => setInstrumental(e.target.checked)}
                className="w-4 h-4 accent-[var(--accent)]"
                disabled={isGenerating}
              />
              {instrumental ? (
                <MicOff className="w-4 h-4 text-[var(--foreground-secondary)]" />
              ) : (
                <Mic className="w-4 h-4 text-[var(--foreground-secondary)]" />
              )}
              <span className="text-sm">Instrumental</span>
            </label>

            <div className="flex items-center gap-2">
              <label className="text-sm">Voice:</label>
              <select
                value={vocalGender}
                onChange={(e) => setVocalGender(e.target.value as 'm' | 'f' | '')}
                className="theme-input py-1 px-2 text-sm"
                disabled={isGenerating || instrumental}
              >
                <option value="">Auto</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm">Model:</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="theme-input py-1 px-2 text-sm"
                disabled={isGenerating}
              >
                <option value="V5">V5 (Latest)</option>
                <option value="V4_5PLUS">V4.5 Plus</option>
                <option value="V4_5">V4.5</option>
                <option value="V4">V4</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status */}
          <AnimatePresence>
            {result && result.status !== 'completed' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30"
              >
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin" />
                  <div>
                    <p className="font-medium">
                      {result.status === 'pending' ? 'Starting generation...' : 'Creating your music...'}
                    </p>
                    <p className="text-sm text-[var(--foreground-secondary)]">
                      This may take 30-60 seconds. Polling... ({pollCount}/30)
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result?.status === 'completed' && result.songs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Generated {result.songs.length} songs!</span>
                </div>

                {result.songs.map((song, index) => (
                  <motion.div
                    key={song.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--accent)]/20"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => handlePlay(song)}
                          className="p-3 rounded-full bg-[var(--accent)] text-black hover:scale-105 transition-transform"
                        >
                          {isCurrentlyPlaying(song) ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5 ml-0.5" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <p className="font-medium truncate">
                            {song.title || `Song ${index + 1}`}
                          </p>
                          <p className="text-sm text-[var(--foreground-secondary)]">
                            Generated with Suno AI
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAddToQueue(song)}
                          className="p-2 rounded-lg hover:bg-[var(--accent)]/20 transition-colors"
                          title="Add to Queue"
                        >
                          <ListPlus className="w-5 h-5 text-[var(--accent)]" />
                        </button>
                        <button
                          onClick={() => downloadSong(song, index)}
                          className="p-2 rounded-lg hover:bg-[var(--accent)]/20 transition-colors"
                          title="Download"
                        >
                          <Download className="w-5 h-5 text-[var(--accent)]" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate Button */}
          <div className="flex gap-3 pt-2">
            {result?.status === 'completed' && (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 py-3 px-6 rounded-xl border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                New Generation
              </button>
            )}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[var(--accent)] text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Music
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-[var(--foreground-secondary)] mt-6">
          Each generation produces 2 unique songs. Stream available in ~30-40 seconds.
        </p>
      </motion.div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Music2,
  Play,
  Pause,
  Download,
  Library,
  Loader2,
  ListPlus,
  RefreshCw
} from 'lucide-react'
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext'

interface SavedSong {
  id: string
  title: string
  audio_url: string
  stream_url: string
  image_url?: string
  duration?: number
  style?: string
  prompt?: string
  task_id: string
  created_at: string
}

export default function LibraryPage() {
  const [songs, setSongs] = useState<SavedSong[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { play, pause, currentTrack, isPlaying, addToQueue } = useAudioPlayer()

  const fetchSongs = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/songs')
      const data = await response.json()
      if (data.success) {
        setSongs(data.songs || [])
      } else {
        setError(data.error || 'Failed to load songs')
      }
    } catch (err) {
      console.error('Failed to fetch songs:', err)
      setError('Failed to connect to server')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const handlePlay = (song: SavedSong) => {
    const isCurrentSong = currentTrack?.id === song.id
    if (isCurrentSong && isPlaying) {
      pause()
    } else {
      play({
        id: song.id,
        title: song.title,
        audioUrl: song.audio_url,
        streamUrl: song.stream_url,
        imageUrl: song.image_url,
        duration: song.duration,
        artist: 'Suno AI'
      })
    }
  }

  const handleAddToQueue = (song: SavedSong) => {
    addToQueue({
      id: song.id,
      title: song.title,
      audioUrl: song.audio_url,
      streamUrl: song.stream_url,
      imageUrl: song.image_url,
      duration: song.duration,
      artist: 'Suno AI'
    })
  }

  const downloadSong = (song: SavedSong) => {
    const link = document.createElement('a')
    link.href = song.audio_url || song.stream_url
    link.download = `${song.title}.mp3`
    link.click()
  }

  const isCurrentlyPlaying = (song: SavedSong) =>
    currentTrack?.id === song.id && isPlaying

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 theme-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-[var(--foreground-secondary)]" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                  <Music2 className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-lg gradient-text">Prodverse</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/studio"
                className="text-[var(--accent)] font-medium hover:opacity-80 transition text-sm"
              >
                + Create New
              </Link>
              <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                <Library className="w-4 h-4 text-[var(--accent)]" />
                My Library
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-28 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                <span className="gradient-text">My Library</span>
              </h1>
              <p className="text-[var(--foreground-secondary)]">
                {songs.length} saved {songs.length === 1 ? 'song' : 'songs'}
              </p>
            </div>
            <button
              onClick={fetchSongs}
              className="p-2 rounded-lg hover:bg-[var(--accent)]/20 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 text-[var(--accent)] ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchSongs}
                className="px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-medium"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && songs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Library className="w-16 h-16 text-[var(--foreground-secondary)] mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No songs yet</h2>
              <p className="text-[var(--foreground-secondary)] mb-6">
                Generate your first song to see it here
              </p>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold"
              >
                <Music2 className="w-5 h-5" />
                Create Music
              </Link>
            </motion.div>
          )}

          {/* Songs List */}
          {!isLoading && !error && songs.length > 0 && (
            <div className="space-y-3">
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl theme-card hover:bg-[var(--card-bg)] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Cover Art */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-secondary)]/20 flex-shrink-0">
                      {song.image_url ? (
                        <Image
                          src={song.image_url}
                          alt={song.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music2 className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                      )}
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{song.title}</p>
                      <p className="text-sm text-[var(--foreground-secondary)] truncate">
                        {song.style || 'AI Generated'} • {formatDate(song.created_at)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
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
                      <button
                        onClick={() => handleAddToQueue(song)}
                        className="p-2 rounded-lg hover:bg-[var(--accent)]/20 transition-colors"
                        title="Add to Queue"
                      >
                        <ListPlus className="w-5 h-5 text-[var(--accent)]" />
                      </button>
                      <button
                        onClick={() => downloadSong(song)}
                        className="p-2 rounded-lg hover:bg-[var(--accent)]/20 transition-colors"
                        title="Download"
                      >
                        <Download className="w-5 h-5 text-[var(--accent)]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[var(--accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[var(--accent-secondary)]/5 rounded-full blur-3xl" />
      </div>
    </main>
  )
}

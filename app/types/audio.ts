export interface Track {
  id: string
  title: string
  audioUrl: string
  streamUrl: string
  imageUrl?: string
  duration?: number
  artist?: string
}

export interface AudioPlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  queue: Track[]
  queueIndex: number
}

export interface AudioPlayerActions {
  play: (track?: Track) => void
  pause: () => void
  togglePlay: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  addToQueue: (track: Track) => void
  playNext: () => void
  playPrevious: () => void
  clearQueue: () => void
}

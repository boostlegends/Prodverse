'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Music2, Sparkles } from 'lucide-react'
import MusicGenerator from '../components/MusicGenerator'

export default function StudioPage() {
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

            <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              AI Studio
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Powered by Suno AI
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">AI Music Studio</span>
            </h1>
            <p className="text-lg text-[var(--foreground-secondary)] max-w-xl mx-auto">
              Create professional-quality music in seconds using advanced AI.
              Just describe what you want, and let the magic happen.
            </p>
          </div>

          {/* Music Generator */}
          <MusicGenerator />

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="theme-card p-4 rounded-xl text-center"
            >
              <div className="text-2xl font-bold text-[var(--accent)]">2</div>
              <div className="text-sm text-[var(--foreground-secondary)]">Songs per generation</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="theme-card p-4 rounded-xl text-center"
            >
              <div className="text-2xl font-bold text-[var(--accent)]">~40s</div>
              <div className="text-sm text-[var(--foreground-secondary)]">Stream ready</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="theme-card p-4 rounded-xl text-center"
            >
              <div className="text-2xl font-bold text-[var(--accent)]">V5</div>
              <div className="text-sm text-[var(--foreground-secondary)]">Latest AI model</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[var(--accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[var(--accent-secondary)]/5 rounded-full blur-3xl" />
      </div>
    </main>
  )
}

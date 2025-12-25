'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Play,
  Headphones,
  MessageSquare,
  Share2,
  Heart
} from 'lucide-react'

export default function HeroDemoPlayer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16 relative max-w-2xl mx-auto"
    >
      <div className="relative rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-lime-500 to-green-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[var(--foreground)]">
                Summer Vibes
              </div>
              <div className="text-sm text-[var(--foreground-secondary)]">
                Prodverse AI
              </div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4">
            <Link
              href="/studio"
              className="w-12 h-12 rounded-full bg-lime-500 hover:bg-lime-400 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Play className="w-5 h-5 text-black ml-0.5" />
            </Link>

            {/* Progress Bar */}
            <div className="flex-1">
              <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-lime-500"
                  style={{ width: '35%' }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-[var(--foreground-secondary)]">
                <span className="tabular-nums">1:23</span>
                <span className="tabular-nums">3:45</span>
              </div>
            </div>
          </div>

          {/* Social Stats */}
          <div className="flex items-center gap-6 mt-5 pt-5 border-t border-[var(--card-border)]">
            <div className="flex items-center gap-2 text-[var(--foreground-secondary)] text-sm">
              <Headphones className="w-4 h-4" />
              <span>2.4K</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--foreground-secondary)] text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>156</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--foreground-secondary)] text-sm">
              <Heart className="w-4 h-4" />
              <span>892</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--foreground-secondary)] text-sm ml-auto">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

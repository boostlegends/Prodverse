'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Music,
  Music2,
  Video,
  Users,
  Sparkles,
  Wand2,
  Share2,
  DollarSign,
  Headphones,
  Play,
  ArrowRight,
  Check,
  Menu,
  X,
  Github,
  Twitter,
  Instagram,
  Mail,
  Zap,
  Globe,
  Layers,
  MessageSquare,
  Sun,
  Moon,
  Library,
  Download
} from 'lucide-react'
import { useTheme } from './components/ThemeProvider'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
      }
    } catch (error) {
      console.error('Waitlist error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen animated-gradient grid-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md theme-nav border-b border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-0.5">
              <Image src="/logo-512.png" alt="Prodverse" width={44} height={44} className="rounded-md" priority unoptimized />
              <span className="text-base font-bold font-logo tracking-tight">
                <span className="text-[#55D73E]">Prod</span>
                <span className="text-[var(--foreground)]">verse</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-theme-secondary hover:text-theme transition">Features</a>
              <a href="#ai" className="text-theme-secondary hover:text-theme transition">AI Tools</a>
              <a href="#collaborate" className="text-theme-secondary hover:text-theme transition">Collaborate</a>
              <a href="#pricing" className="text-theme-secondary hover:text-theme transition">Pricing</a>
              <a href="/studio" className="text-[var(--accent)] font-medium hover:opacity-80 transition flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                AI Studio
              </a>
              <a href="/library" className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition flex items-center gap-1">
                <Library className="w-4 h-4" />
                Library
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[var(--foreground)]" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--foreground)]" />
                )}
              </button>

              <button className="px-4 py-2 rounded-lg bg-[#55D73E] hover:bg-[#45C72E] transition font-medium text-black">
                Join Waitlist
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[var(--foreground)]" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--foreground)]" />
                )}
              </button>
              <button
                className="text-theme"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden theme-nav backdrop-blur-lg border-b border-[var(--card-border)]"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-theme-secondary hover:text-theme">Features</a>
              <a href="#ai" className="block text-theme-secondary hover:text-theme">AI Tools</a>
              <a href="#collaborate" className="block text-theme-secondary hover:text-theme">Collaborate</a>
              <a href="#pricing" className="block text-theme-secondary hover:text-theme">Pricing</a>
              <button className="w-full px-4 py-2 rounded-lg bg-[#55D73E] hover:bg-[#45C72E] transition font-medium text-black">
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#55D73E]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#55D73E]/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#55D73E]/10 border border-[#55D73E]/30 mb-8">
              <Sparkles className="w-4 h-4 text-[#55D73E] mr-2" />
              <span className="text-sm text-[#55D73E]">AI-Powered Music Creation Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Create. Collaborate.
              <br />
              <span className="gradient-text">Share Your Sound.</span>
            </h1>

            <p className="text-xl text-theme-secondary max-w-3xl mx-auto mb-10">
              The ultimate platform for music creators. Generate music with AI, collaborate with artists worldwide,
              share your tracks, and earn from your creations. All in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-6 py-4 rounded-xl theme-input focus:outline-none focus:ring-2 focus:ring-[#55D73E]/20 w-full sm:w-80"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-[#55D73E] hover:bg-[#45C72E] transition font-semibold flex items-center justify-center gap-2 group text-black"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      You&apos;re In!
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">10K+</div>
                <div className="text-theme-secondary">Early Signups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">50K+</div>
                <div className="text-theme-secondary">Tracks Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text">100+</div>
                <div className="text-theme-secondary">Countries</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[var(--card-border)] glow-green">
              <div className="hero-visual-bg backdrop-blur-xl p-6 md:p-8">
                {/* Studio Interface Preview */}
                <div className="hero-visual-card rounded-xl overflow-hidden">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                    <div className="flex items-center gap-0.5">
                      <Image
                        src="/logo-512.png"
                        alt="Prodverse"
                        width={36}
                        height={36}
                        className="rounded-md"
                        unoptimized
                      />
                      <span className="text-xs font-bold font-logo tracking-tight">
                        <span className="text-[#55D73E]">Prod</span>
                        <span className="text-[var(--foreground)]">verse</span>
                        <span className="text-theme-secondary text-[10px] font-normal ml-1 font-sans">Studio</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="p-5 md:p-6">
                    {/* Now Playing Track */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden hero-track-art border border-[#55D73E]/30 flex items-center justify-center flex-shrink-0 relative">
                        <div className="hero-track-glow-1" />
                        <div className="hero-track-glow-2" />
                        <div className="absolute bottom-1.5 left-1.5 right-1.5 h-3 flex items-end gap-[2px]">
                          {[40, 70, 50, 90, 60, 80, 45, 75, 55, 85].map((h, i) => (
                            <div key={i} className="flex-1 hero-track-bar rounded-sm" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                        <Music2 className="w-8 h-8 text-[#55D73E] z-10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 text-xs font-medium bg-[#55D73E]/20 text-[#55D73E] rounded-full">AI Generated</span>
                        </div>
                        <h3 className="font-bold text-lg md:text-xl truncate">Midnight Dreams</h3>
                        <p className="text-theme-secondary text-sm">Lo-fi Hip Hop • Chill Beats</p>
                      </div>
                    </div>

                    {/* Waveform Visualization */}
                    <div className="hero-player-bg rounded-xl p-4 mb-5">
                      <div className="flex items-end justify-center gap-[3px] h-12 mb-3">
                        {[20, 45, 30, 60, 40, 75, 55, 85, 65, 50, 70, 45, 80, 55, 40, 65, 50, 70, 45, 60, 35, 55, 75, 45, 65, 50, 40, 60, 35, 50, 30, 45].map((height, i) => (
                          <div
                            key={i}
                            className={`w-1.5 md:w-2 rounded-full transition-all ${i < 12 ? 'bg-gradient-to-t from-[#55D73E] to-[#6FE55A]' : 'bg-white/20'}`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="w-12 h-12 rounded-full bg-[#55D73E] hover:bg-[#3CB82A] flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-[#55D73E]/25">
                          <Play className="w-5 h-5 text-black ml-0.5" />
                        </button>
                        <div className="flex-1">
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[37%] bg-gradient-to-r from-[#55D73E] to-[#6FE55A] rounded-full" />
                          </div>
                          <div className="flex justify-between mt-1.5 text-xs text-theme-secondary">
                            <span>1:23</span>
                            <span>3:45</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-theme-secondary">
                        <button className="flex items-center gap-2 hover:text-[#55D73E] transition">
                          <Headphones className="w-5 h-5" />
                          <span className="text-sm font-medium">2.4K</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#55D73E] transition">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm font-medium">Share</span>
                        </button>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-[#55D73E]/20 text-[#55D73E] text-sm font-medium hover:bg-[#55D73E]/30 transition flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Create</span>
            </h2>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              A complete ecosystem for music creators with powerful tools and seamless collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Music,
                title: 'Share Your Music',
                description: 'Upload tracks, create posts, and build your audience with a beautiful profile showcase.',
                color: 'from-lime-500 to-green-500'
              },
              {
                icon: Wand2,
                title: 'AI Music Generation',
                description: 'Generate unique beats, melodies, and full tracks with our advanced AI models.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Video,
                title: 'AI Music Videos',
                description: 'Create stunning visualizers and music videos automatically with AI.',
                color: 'from-emerald-500 to-teal-500'
              },
              {
                icon: Users,
                title: 'Collaborate Globally',
                description: 'Work on projects with artists worldwide. Real-time collaboration and file sharing.',
                color: 'from-teal-500 to-cyan-500'
              },
              {
                icon: DollarSign,
                title: 'Revenue Sharing',
                description: 'Automatic royalty splits with collaborators. Transparent earnings tracking.',
                color: 'from-yellow-500 to-lime-500'
              },
              {
                icon: Globe,
                title: 'Social Discovery',
                description: 'Trending feeds, personalized recommendations, and a global community.',
                color: 'from-lime-400 to-green-400'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl theme-card hover:border-[#55D73E]/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-theme-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#55D73E]/10 to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#55D73E]/10 border border-[#55D73E]/30 mb-6">
              <Zap className="w-4 h-4 text-[#55D73E] mr-2" />
              <span className="text-sm text-[#55D73E]">Powered by Advanced AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Create with <span className="gradient-text">AI Magic</span>
            </h2>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              Transform your ideas into music, videos, and artwork with our suite of AI tools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Music,
                title: 'AI Music Generator',
                description: 'Describe your sound and let AI create unique tracks. Full stems, multiple genres, commercial ready.',
                features: ['Text to Music', 'Style Transfer', 'Stem Separation', 'Infinite Variations']
              },
              {
                icon: Video,
                title: 'AI Video Creator',
                description: 'Generate music videos and visualizers automatically from your tracks.',
                features: ['Auto Visualizers', 'Lyric Videos', 'Album Artwork', 'Social Clips']
              },
              {
                icon: Layers,
                title: 'AI Mixing & Mastering',
                description: 'Professional-grade audio processing powered by machine learning.',
                features: ['Auto EQ & Compression', 'Reference Matching', 'Stem Enhancement', 'Export Formats']
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#55D73E]/20 to-[#3CB82A]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-2xl theme-card hover:border-[#55D73E]/50 transition h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#55D73E] to-[#3CB82A] flex items-center justify-center mb-6">
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{tool.title}</h3>
                  <p className="text-theme-secondary mb-6">{tool.description}</p>
                  <ul className="space-y-2">
                    {tool.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-theme-secondary">
                        <Check className="w-4 h-4 text-[#55D73E]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaborate" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Collaborate with
                <br />
                <span className="gradient-text">Artists Worldwide</span>
              </h2>
              <p className="text-xl text-theme-secondary mb-8">
                Create projects, invite collaborators, share files, and split revenue automatically.
                Build something amazing together.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Project Workspaces',
                    description: 'Dedicated spaces for each project with file sharing, chat, and version control.'
                  },
                  {
                    title: 'Role-Based Access',
                    description: 'Assign roles like producer, vocalist, mixer with specific permissions.'
                  },
                  {
                    title: 'Automatic Revenue Splits',
                    description: 'Set percentage splits upfront. Earnings distributed automatically.'
                  },
                  {
                    title: 'Real-Time Updates',
                    description: 'See changes instantly. Chat, comment, and iterate together.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#55D73E]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-[#55D73E]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-theme-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#55D73E]/30 to-[#3CB82A]/30 rounded-3xl blur-3xl" />
              <div className="relative theme-card backdrop-blur-xl rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold">Summer Vibes EP</h4>
                  <span className="px-3 py-1 rounded-full bg-[#55D73E]/20 text-[#55D73E] text-sm">Active</span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#55D73E] to-[#3CB82A]" />
                    <div className="flex-1">
                      <div className="font-medium">@melodicmike</div>
                      <div className="text-sm text-theme-secondary">Producer • 40%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500" />
                    <div className="flex-1">
                      <div className="font-medium">@vocaljay</div>
                      <div className="text-sm text-theme-secondary">Vocalist • 35%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500" />
                    <div className="flex-1">
                      <div className="font-medium">@mixmaster</div>
                      <div className="text-sm text-theme-secondary">Mixing • 25%</div>
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--background)]/50 rounded-lg p-4">
                  <div className="text-sm text-theme-secondary mb-2">Project Earnings</div>
                  <div className="text-2xl font-bold gradient-text">$4,250.00</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#55D73E]/5 to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              Start free, upgrade when you need more. No hidden fees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                description: 'Perfect for getting started',
                features: [
                  'Unlimited posts',
                  '5 AI generations/month',
                  'Basic profile',
                  'Join collaborations',
                  'Community access'
                ],
                cta: 'Get Started',
                highlight: false
              },
              {
                name: 'Pro',
                price: '$12',
                description: 'For serious creators',
                features: [
                  'Everything in Free',
                  '100 AI generations/month',
                  'HD video exports',
                  'Create projects',
                  'Revenue dashboard',
                  'Priority support'
                ],
                cta: 'Start Pro Trial',
                highlight: true
              },
              {
                name: 'Studio',
                price: '$39',
                description: 'For teams & labels',
                features: [
                  'Everything in Pro',
                  'Unlimited AI generations',
                  '4K video exports',
                  'Team workspaces',
                  'API access',
                  'Custom branding',
                  'Dedicated support'
                ],
                cta: 'Contact Sales',
                highlight: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-[#55D73E]/20 to-[#3CB82A]/20 border-2 border-[#55D73E]'
                    : 'theme-card'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#55D73E] text-sm font-medium text-black">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== '$0' && <span className="text-theme-secondary">/month</span>}
                </div>
                <p className="text-theme-secondary mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#55D73E]" />
                      <span className="text-theme-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.highlight
                      ? 'bg-[#55D73E] hover:bg-[#45C72E] text-black'
                      : 'bg-[var(--card-bg)] hover:bg-[var(--accent)] hover:text-[var(--background)]'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#55D73E]/20 to-[#3CB82A]/20 rounded-3xl blur-3xl" />
            <div className="relative theme-card backdrop-blur-xl rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to <span className="gradient-text">Start Creating?</span>
              </h2>
              <p className="text-xl text-theme-secondary mb-8 max-w-2xl mx-auto">
                Join thousands of creators already making music on Prodverse. Be the first to know when we launch.
              </p>
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl theme-input focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-[#55D73E] hover:bg-[#45C72E] transition font-semibold whitespace-nowrap text-black"
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 pb-28 px-4 border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/logo-512.png" alt="Prodverse" width={40} height={40} className="rounded-xl" />
                <span className="text-xl font-extrabold font-logo">
                  <span className="text-[#55D73E]">Prod</span>
                  <span className="text-[var(--foreground)]">verse</span>
                </span>
              </div>
              <p className="text-theme-secondary">
                The AI-powered platform for music creators to share, collaborate, and earn.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-theme-secondary">
                <li><a href="#features" className="hover:text-theme transition">Features</a></li>
                <li><a href="#ai" className="hover:text-theme transition">AI Tools</a></li>
                <li><a href="#pricing" className="hover:text-theme transition">Pricing</a></li>
                <li><a href="#" className="hover:text-theme transition">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-theme-secondary">
                <li><a href="#" className="hover:text-theme transition">About</a></li>
                <li><a href="#" className="hover:text-theme transition">Blog</a></li>
                <li><a href="#" className="hover:text-theme transition">Careers</a></li>
                <li><a href="#" className="hover:text-theme transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-theme-secondary">
                <li><a href="#" className="hover:text-theme transition">Privacy</a></li>
                <li><a href="#" className="hover:text-theme transition">Terms</a></li>
                <li><a href="#" className="hover:text-theme transition">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--card-border)]">
            <p className="text-theme-secondary mb-4 md:mb-0">
              © 2025 Prodverse. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-[var(--card-bg)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--background)] transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-[var(--card-bg)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--background)] transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-[var(--card-bg)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--background)] transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-[var(--card-bg)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--background)] transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Music,
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
  Moon
} from 'lucide-react'
import { useTheme } from './components/ThemeProvider'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to your backend/Supabase
    console.log('Waitlist email:', email)
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <div className="min-h-screen animated-gradient grid-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md theme-nav border-b border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Prodverse" width={40} height={40} className="rounded-xl" />
              <span className="text-xl font-bold gradient-text">Prodverse</span>
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

              <button className="px-4 py-2 rounded-lg bg-lime-600 hover:bg-lime-700 transition font-medium text-white">
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
              <button className="w-full px-4 py-2 rounded-lg bg-lime-600 hover:bg-lime-700 transition font-medium text-white">
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/30 mb-8">
              <Sparkles className="w-4 h-4 text-lime-400 mr-2" />
              <span className="text-sm text-lime-300">AI-Powered Music Creation Platform</span>
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
                  className="px-6 py-4 rounded-xl theme-input focus:outline-none focus:ring-2 focus:ring-lime-500/20 w-full sm:w-80"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 transition font-semibold flex items-center justify-center gap-2 group"
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
              <div className="hero-visual-bg backdrop-blur-xl p-8">
                {/* Mock App Interface */}
                <div className="hero-visual-card rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-green-500" />
                    <div>
                      <div className="font-semibold">@producer_vibes</div>
                      <div className="text-sm text-theme-secondary">Just dropped a new beat</div>
                    </div>
                  </div>
                  <div className="hero-player-bg rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-4">
                      <button className="w-12 h-12 rounded-full bg-lime-600 flex items-center justify-center hover:bg-lime-700 transition">
                        <Play className="w-6 h-6 fill-white" />
                      </button>
                      <div className="flex-1">
                        <div className="h-2 hero-progress-bg rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-gradient-to-r from-lime-500 to-green-500 rounded-full" />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-theme-secondary">
                          <span>1:23</span>
                          <span>3:45</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-theme-secondary">
                    <button className="flex items-center gap-2 hover:text-lime-500 transition">
                      <Headphones className="w-5 h-5" />
                      <span>2.4K</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-500 transition">
                      <MessageSquare className="w-5 h-5" />
                      <span>156</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-emerald-500 transition">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
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
                className="group p-6 rounded-2xl theme-card hover:border-lime-500/50 transition-all duration-300"
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
        <div className="absolute inset-0 bg-gradient-to-b from-lime-900/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
              <Zap className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm text-green-300">Powered by Advanced AI</span>
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
                <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-2xl theme-card hover:border-lime-500/50 transition h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-600 to-green-600 flex items-center justify-center mb-6">
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{tool.title}</h3>
                  <p className="text-theme-secondary mb-6">{tool.description}</p>
                  <ul className="space-y-2">
                    {tool.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-theme-secondary">
                        <Check className="w-4 h-4 text-lime-400" />
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
                    <div className="w-10 h-10 rounded-lg bg-lime-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-lime-400" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/30 to-green-500/30 rounded-3xl blur-3xl" />
              <div className="relative theme-card backdrop-blur-xl rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold">Summer Vibes EP</h4>
                  <span className="px-3 py-1 rounded-full bg-lime-500/20 text-lime-400 text-sm">Active</span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-green-500" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-900/10 to-transparent" />

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
                    ? 'bg-gradient-to-br from-lime-900/50 to-green-900/50 border-2 border-lime-500'
                    : 'theme-card'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-lime-500 to-green-500 text-sm font-medium text-black">
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
                      <Check className="w-5 h-5 text-lime-400" />
                      <span className="text-theme-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white'
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
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-green-500/20 rounded-3xl blur-3xl" />
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
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 transition font-semibold whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/logo.png" alt="Prodverse" width={40} height={40} className="rounded-xl" />
                <span className="text-xl font-bold gradient-text">Prodverse</span>
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

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Music2,
  Users,
  Globe,
  Zap,
  Heart,
  Target,
  Lightbulb,
  Shield,
  Rocket,
  Calendar,
  MapPin,
  Mail,
  Twitter,
  Instagram,
  Github
} from 'lucide-react'

export default function AboutPage() {
  const milestones = [
    { year: '2020', title: 'Founded', description: 'Prodverse was born from a vision to democratize music creation using AI technology.' },
    { year: '2021', title: 'First Prototype', description: 'Launched our initial AI music generation engine with early adopters.' },
    { year: '2022', title: 'Community Growth', description: 'Reached 10,000+ creators using our platform worldwide.' },
    { year: '2023', title: 'Platform Expansion', description: 'Introduced collaboration tools and revenue sharing features.' },
    { year: '2024', title: 'AI Evolution', description: 'Released next-gen AI models for music, video, and mastering.' },
    { year: '2025', title: 'Global Launch', description: 'Preparing for worldwide public launch with full feature set.' },
  ]

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We push the boundaries of what\'s possible with AI and music technology.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Our creators are at the heart of everything we build and improve.'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'We protect creator rights and ensure fair, transparent revenue sharing.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We\'re musicians and creators ourselves, driven by love for music.'
    },
  ]

  const stats = [
    { value: '50K+', label: 'Tracks Created' },
    { value: '10K+', label: 'Active Creators' },
    { value: '100+', label: 'Countries' },
    { value: '5+', label: 'Years Building' },
  ]

  return (
    <div className="min-h-screen animated-gradient grid-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md theme-nav border-b border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-0.5">
              <Image src="/logo-512.png" alt="Prodverse" width={44} height={44} className="rounded-md" priority unoptimized />
              <span className="text-base font-bold font-logo tracking-tight">
                <span className="text-[#55D73E]">Prod</span>
                <span className="text-[var(--foreground)]">verse</span>
              </span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 text-theme-secondary hover:text-[#55D73E] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#55D73E]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#55D73E]/20 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Large Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo-512.png"
                alt="Prodverse"
                width={120}
                height={120}
                className="rounded-2xl"
                priority
                unoptimized
              />
            </div>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#55D73E]/10 border border-[#55D73E]/30 mb-8">
              <Calendar className="w-4 h-4 text-[#55D73E] mr-2" />
              <span className="text-sm text-[#55D73E]">Founded in 2020</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About <span className="gradient-text">Prodverse</span>
            </h1>

            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              We&apos;re on a mission to empower every creator with AI-powered tools
              to make professional music, collaborate globally, and earn from their art.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl theme-card">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-theme-secondary">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-[#55D73E] mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="theme-card rounded-2xl p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none text-theme-secondary">
              <p className="text-lg leading-relaxed mb-6">
                <span className="text-[#55D73E] font-semibold">Prodverse was founded in 2020</span> with a simple
                but ambitious vision: to make professional music creation accessible to everyone, regardless of
                their technical background or resources.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our founders, a team of musicians, engineers, and AI researchers, saw how artificial intelligence
                was transforming creative industries. They believed that the same technology could revolutionize
                music production, breaking down the barriers that prevented millions of aspiring artists from
                bringing their ideas to life.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                What started as a small project in a home studio has grown into a global platform serving
                creators in over 100 countries. We&apos;ve built AI tools that can generate unique beats,
                create stunning music videos, master tracks to professional standards, and connect artists
                for seamless collaboration.
              </p>
              <p className="text-lg leading-relaxed">
                Today, Prodverse is more than just a tool &mdash; it&apos;s a community of passionate creators
                who are shaping the future of music. And we&apos;re just getting started.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#55D73E]/5 to-transparent" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="theme-card rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-[#55D73E]/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#55D73E]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-theme-secondary text-lg">
                To democratize music creation by providing AI-powered tools that enable anyone to produce
                professional-quality music, collaborate with artists worldwide, and build sustainable
                careers in the music industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="theme-card rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-[#55D73E]/20 flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-[#55D73E]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-theme-secondary text-lg">
                A world where every person with a musical idea can bring it to life, where collaboration
                knows no borders, and where creators are fairly rewarded for their work. We envision
                Prodverse as the creative home for the next generation of music artists.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              The principles that guide everything we do at Prodverse
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="theme-card rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#55D73E] to-[#3CB82A] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-theme-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#55D73E]/5 to-transparent" />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              From a small idea to a global platform
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#55D73E]/30 transform md:-translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#55D73E] rounded-full transform -translate-x-1/2 z-10 shadow-lg shadow-[#55D73E]/30" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="theme-card rounded-xl p-6">
                    <span className="text-[#55D73E] font-bold text-lg">{milestone.year}</span>
                    <h3 className="text-xl font-semibold mt-1 mb-2">{milestone.title}</h3>
                    <p className="text-theme-secondary">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="theme-card rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#55D73E] to-[#3CB82A] flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-theme-secondary mb-8 max-w-xl mx-auto">
              Have questions or want to learn more about Prodverse? We&apos;d love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-theme-secondary">
                <Mail className="w-5 h-5 text-[#55D73E]" />
                <a href="mailto:contact@prodverse.net" className="hover:text-[#55D73E] transition">
                  contact@prodverse.net
                </a>
              </div>
              <div className="hidden sm:block text-theme-secondary">•</div>
              <div className="flex items-center gap-2 text-theme-secondary">
                <MapPin className="w-5 h-5 text-[#55D73E]" />
                <span>Global & Remote</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <a href="https://twitter.com/prodverse" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center hover:bg-[#55D73E] hover:border-[#55D73E] hover:text-black transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/prodverse" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center hover:bg-[#55D73E] hover:border-[#55D73E] hover:text-black transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://github.com/boostlegends/Prodverse" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center hover:bg-[#55D73E] hover:border-[#55D73E] hover:text-black transition">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Image src="/logo-512.png" alt="Prodverse" width={32} height={32} className="rounded-md" unoptimized />
            <span className="text-lg font-bold font-logo">
              <span className="text-[#55D73E]">Prod</span>
              <span className="text-[var(--foreground)]">verse</span>
            </span>
          </Link>
          <p className="text-theme-secondary">
            &copy; 2025 Prodverse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

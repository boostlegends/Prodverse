# Prodverse

<div align="center">

  **The AI-Powered Music Creation Platform**

  Create. Collaborate. Share Your Sound.

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

  [Live Demo](https://prodverse.app) | [Report Bug](https://github.com/boostlegends/Prodverse/issues) | [Request Feature](https://github.com/boostlegends/Prodverse/issues)

</div>

---

## About

Prodverse is a next-generation platform for music creators that combines:

- **Social Sharing** - Share your music, build your audience
- **AI Music Generation** - Create unique tracks with text prompts
- **AI Video Creation** - Generate visualizers and music videos
- **Global Collaboration** - Work with artists worldwide
- **Revenue Sharing** - Automatic royalty splits with collaborators

## Features

| Feature | Description |
|---------|-------------|
| **AI Music Generator** | Generate beats, melodies, and full tracks from text descriptions |
| **AI Video Creator** | Create music videos and visualizers automatically |
| **Project Workspaces** | Collaborate with artists in dedicated project spaces |
| **Revenue Sharing** | Automatic royalty splits with transparent tracking |
| **Social Feed** | Discover trending music and connect with creators |
| **User Profiles** | Showcase your portfolio and build your brand |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for full functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/boostlegends/Prodverse.git
cd Prodverse
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
prodverse/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
└── types/                 # TypeScript types
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/boostlegends/Prodverse)

### GitHub Pages

1. Update `next.config.js` for static export
2. Run `npm run build`
3. Deploy the `out` folder

### Custom Domain

1. Go to your hosting provider (Vercel/Netlify/GitHub Pages)
2. Add custom domain in settings
3. Update DNS records:
   - Type: `A` or `CNAME`
   - Point to your hosting provider

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | For server |
| `SUNO_API_KEY` | Suno AI API key | For AI music |
| `RUNWAY_API_KEY` | Runway ML API key | For AI video |

## Roadmap

- [x] Landing page
- [x] Waitlist signup
- [ ] User authentication
- [ ] Social feed
- [ ] Music upload & playback
- [ ] AI music generation
- [ ] AI video creation
- [ ] Project collaboration
- [ ] Revenue sharing
- [ ] Mobile app

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Website: [prodverse.app](https://prodverse.app)
- Twitter: [@prodverseapp](https://twitter.com/prodverseapp)
- Email: hello@prodverse.app

---

<div align="center">
  Made with love for music creators
</div>

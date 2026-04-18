# nēro - Landing Page

A premium, minimal fintech landing page for nēro, a mobile app that helps users avoid running out of money before month end.

## Features

- ✨ **Modern SaaS Design** - Pixel-perfect Figma implementation with Satoshi typography
- 📱 **Fully Responsive** - Seamless experience across mobile, tablet, and desktop
- 🎨 **Animated Gradient Backgrounds** - Subtle parallax effects and continuous rotation
- ⚡ **Premium Animations** - Modern SaaS feel with polished micro-interactions
  - Staggered entrance sequence (3.5s total)
  - 4 animated avatars with hover scale effects
  - Floating phone mockups with 3D perspective
  - Live counter animation (100 → 120 signups)
  - Breathing badge dot with pulse effect
  - Scroll-based parallax for depth
  - Smooth form interactions with spring physics
- 📧 **Functional Waitlist Form** - Production-ready with Resend integration
- 🎯 **State Management** - Loading, success, error states with animations
- 🔒 **Security First** - Environment-based configuration, no exposed secrets
- ⚡ **Performance Optimized** - GPU-accelerated, 60fps animations

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (motion/react) - subtle, production-ready animations
- **Typography:** Satoshi (Fontshare) - used throughout from Figma design
- **Backend Integration:** Resend (email service)
- **Design:** Imported from Figma with pixel-perfect implementation

## Documentation

- **[ANIMATIONS.md](./ANIMATIONS.md)** - Complete animation system documentation
- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - Resend email setup guide

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `VITE_API_URL` with your backend URL:

```env
VITE_API_URL=https://api.yourdomain.com
```

### 3. Run Development Server

```bash
pnpm dev
```

The app will be available at the preview URL shown in your terminal.

## Backend Integration

The waitlist form is designed to work with a separate backend service that handles Resend email integration.

### Quick Setup

1. See `BACKEND_INTEGRATION.md` for detailed backend setup instructions
2. Create a Resend account at [resend.com](https://resend.com)
3. Set up your welcome email template in Resend
4. Deploy your backend with the `/api/waitlist` endpoint
5. Update `VITE_API_URL` in your `.env` file

### API Endpoint Requirements

Your backend should provide a `POST /api/waitlist` endpoint that:

- Accepts `{ email: string }` in request body
- Validates email format
- Sends welcome email via Resend
- Returns `{ success: true }` or `{ error: string }`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar.tsx              # Navigation bar
│   │   ├── hero-section.tsx        # Main hero section
│   │   └── waitlist-form.tsx       # Email signup form
│   └── App.tsx                     # Main app component
├── imports/                        # Figma imported assets
├── styles/
│   ├── fonts.css                   # Google Fonts imports
│   └── theme.css                   # CSS variables & theme
└── ...
```

## Key Features & Animations

### Animated Elements

- **Badge**: Fade-up entrance with pulsing dot
- **Headline**: Staggered word-by-word reveal
- **Form**: Smooth slide-in with focus effects
- **Avatars**: Sequential pop-in with 100ms delays
- **Phone Mockups**: Floating animation with subtle rotation
- **CTA Button**: Scale on hover, press feedback
- **Background**: Smooth gradient fade-in

### Hero Section

Desktop-optimized layout featuring:
- Animated "Coming soon" badge
- Large headline: "Stop exhausting money" + italic "before the month ends"
- Functional email signup form
- Animated social proof avatars (100+ signups)
- Layered iPhone mockups with continuous floating animation
- Soft purple/blue gradient backgrounds
- Fully responsive across all breakpoints

### Waitlist Form

Production-ready with:
- Real-time email validation
- Loading states during submission
- Animated success/error messages
- Disabled state management
- Environment-based API URL configuration
- Mobile-friendly stacked layout

## Design System

### Colors

```css
--nero-primary: #2a2a91        /* Primary purple */
--nero-primary-dark: #1f1f6f   /* Hover purple */
--nero-text-primary: #12123d   /* Main text */
--nero-text-muted: #696969     /* Secondary text */
--nero-bg-light: #ffffff       /* Background */
--nero-badge-bg: rgba(234,234,244,0.34)  /* Badge background */
```

### Typography

- **Font Family:** Satoshi (from Fontshare)
- **Weights Used:**
  - Bold (700) - Headlines
  - Bold Italic (700) - Headline emphasis
  - Medium (500) - Buttons, labels
  - Regular (400) - Body text

### Motion Philosophy

Subtle, production-ready animations that feel like a modern SaaS:
```javascript
// Easing curve
ease: [0.22, 1, 0.36, 1]  // Smooth, natural motion

// Typical delays
badge: 0s
headline-1: 0.2s
headline-2: 0.4s
form: 0.8-0.9s
avatars: 1.0-1.3s (staggered)
```

## Responsive Breakpoints

- **Mobile:** < 768px
  - Stacked form layout
  - Smaller text sizes
  - Hidden phone mockups
  - Adjusted padding
- **Tablet:** 768px - 1024px (md)
  - Side-by-side form
  - Medium text sizes
  - Hidden phone mockups
  - Moderate padding
- **Desktop:** > 1024px (lg)
  - Full layout with phone mockups
  - Large text sizes
  - All animations visible
  - Desktop-optimized spacing

## Performance

- ✅ Lazy loading for images
- ✅ Optimized animations (CSS when possible)
- ✅ Minimal bundle size
- ✅ Fast initial load

## Security Best Practices

- 🔒 No API keys in frontend code
- 🔒 Environment variables for configuration
- 🔒 Email validation on frontend and backend
- 🔒 CORS protection recommended for backend
- 🔒 Rate limiting recommended for backend

## Customization

### Change Colors

Update CSS variables in `src/styles/theme.css`:

```css
--nero-primary: #YOUR_COLOR;
```

### Change Fonts

Update font imports in `src/styles/fonts.css`:

```css
@import url('YOUR_GOOGLE_FONTS_URL');
```

Then update `fontFamily` in components:

```tsx
style={{ fontFamily: 'YourFont, sans-serif' }}
```

### Change Content

Edit text directly in `src/app/components/hero-section.tsx`

## Deployment

### Build for Production

```bash
pnpm build
```

### Deploy

The built files will be in the `dist/` directory. Deploy to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

## Support

For backend integration help, see `BACKEND_INTEGRATION.md`.

## License

Proprietary - nēro

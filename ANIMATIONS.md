# nēro Landing Page - Animation Guide

This document details all animations implemented on the nēro landing page for a modern SaaS experience.

## Animation Philosophy

**Goal**: Create a polished, premium feel that guides user attention without being distracting.

**Principles**:
- **Subtle over flashy** - Animations should feel natural and refined
- **Progressive enhancement** - Page is functional without animations
- **Performance first** - All animations are GPU-accelerated
- **Purposeful motion** - Every animation serves a UX purpose

## Easing Curve

All animations use a custom cubic-bezier easing for smooth, natural motion:

```javascript
ease: [0.22, 1, 0.36, 1]  // Smooth ease-out with gentle deceleration
```

## Page Load Sequence

### Initial Entrance (0s - 1.5s)

1. **Badge** (0s)
   - Fade up + slide in
   - Pulsing dot with breathing animation
   - Duration: 600ms

2. **Headline Line 1** (0.2s)
   - Fade up + slide in
   - "Stop exhausting money"
   - Duration: 800ms

3. **Headline Line 2** (0.4s)
   - Fade up + slide in
   - "before the month ends" (italic)
   - Duration: 800ms

4. **Supporting Text** (0.6s)
   - Fade up + slide in
   - Body copy
   - Duration: 800ms

5. **Form Input** (0.8s)
   - Slide in from left
   - Duration: 600ms

6. **Submit Button** (0.9s)
   - Slide in from right
   - Duration: 600ms

7. **Avatar Images** (1.0s - 1.3s)
   - Sequential pop-in with 100ms stagger
   - Each avatar: scale from 0 → 1.2 → 1
   - Duration: 500ms per avatar
   - Hover: Scale up to 1.1, raised z-index

8. **Social Proof Counter** (1.0s)
   - Fade in + number counting animation
   - Counts from 100 → 120 over 2 seconds
   - Each number change animates with slide up

### Background & Mockups

1. **Gradient Background** (0s)
   - Slow fade-in over 1.5s
   - Continuous slow rotation (20s loop)
   - Parallax effect on scroll (moves with scrollY)
   - Opacity decreases on scroll

2. **Phone Mockup (Center)** (0.5s)
   - 3D perspective entrance
   - Rotates from -8° to 0°
   - Continuous floating: up 8px, down 8px (6s loop)
   - Hover: Lifts up 5px

3. **Phone Mockup (Left)** (0.7s)
   - 3D perspective entrance
   - Rotates from +8° to 0°
   - Continuous floating: up 12px, down 12px (7s loop)
   - Hover: Lifts up 5px

4. **Phone Mockup Container** (0.3s)
   - Scale + 3D rotation entrance
   - Continuous subtle floating (5s loop)
   - Rotates between 38.13° (maintains tilt while floating)

## Interactive Animations

### Form Interactions

**Email Input**
- Focus: Subtle scale to 1.01 (200ms)
- Smooth outline transition
- Disabled state: 50% opacity

**Submit Button**
- Hover: Scale to 1.02 + darker purple
- Tap: Scale to 0.98
- Loading state: Opacity 50%, button text changes
- Disabled: No hover effects

**Success/Error Messages**
- Enter: Fade + slide down with height animation
- Icon: Scale in with spring physics (stiffness: 200, damping: 10)
- Exit: Fade + slide up + height collapse
- Auto-dismiss after 4-5 seconds

### Navigation

**Logo**
- Initial: Slide in from left (600ms)
- No additional animations

**CTA Button**
- Initial: Scale from 0.9 → 1 (500ms)
- Hover: Scale to 1.05 + darker purple
- Tap: Scale to 0.95
- Cursor: Pointer

### Avatar Group

**Individual Avatars**
- Hover: Scale to 1.1, raised above siblings (z-index)
- Smooth transition: 300ms
- Stacked layout maintained

**"100+ people" Counter**
- Loads at 100
- After 1.5s delay, counts up to 120
- Each number slides up as it changes
- Final number stays at 120

## Continuous Animations

### Breathing Badge Dot
```javascript
animate: { opacity: [1, 0.5, 1] }
duration: 2s
repeat: Infinity
```

### Floating Phones (Center)
```javascript
animate: { y: [0, -8, 0] }
duration: 6s
repeat: Infinity
delay: 1s after entrance
```

### Floating Phones (Left)
```javascript
animate: { y: [0, -12, 0] }
duration: 7s
repeat: Infinity
delay: 1.5s after entrance
```

### Mockup Container Float
```javascript
animate: { y: [0, -15, 0] }
duration: 5s
repeat: Infinity
rotation: Maintains 38.13° tilt
```

### Background Gradient Rotation
```javascript
animate: { rotate: [-25.27, -23, -25.27] }
duration: 20s
repeat: Infinity
```

## Scroll Effects

### Parallax Background
- Moves vertically based on scroll position
- Range: 0px to -50px over 300px scroll
- Opacity fades from 1.0 to 0.7

### Content (Future Enhancement)
- Optional: Add scroll-triggered reveals for below-fold content
- Optional: Parallax layers for depth

## Responsive Behavior

### Mobile (< 768px)
- All animations active
- Phone mockups hidden (performance)
- Reduced animation distances
- Faster animation speeds (optional)

### Tablet (768px - 1024px)
- All animations active
- Phone mockups hidden
- Full animation suite for content

### Desktop (> 1024px)
- All animations active
- Phone mockups visible with full floating animations
- Parallax effects enabled
- Hover states fully functional

## Performance Optimizations

1. **GPU Acceleration**
   - All transforms use `translate3d`, `scale`, `rotate`
   - Avoid animating layout properties (width, height, padding)

2. **Will-Change**
   - Applied automatically by Framer Motion
   - Optimizes frequently animated elements

3. **Reduced Motion**
   - Respects `prefers-reduced-motion` media query
   - Fallback: Instant transitions, no animations

4. **Lazy Loading**
   - Phone mockups only render on desktop
   - Complex animations disabled on mobile

## Animation Timing Reference

```
0.0s  → Badge enters
0.2s  → Headline line 1
0.4s  → Headline line 2
0.5s  → Center phone mockup starts
0.6s  → Supporting text
0.7s  → Left phone mockup starts
0.8s  → Email input
0.9s  → Submit button
1.0s  → Avatar 1 + social proof text
1.1s  → Avatar 2
1.2s  → Avatar 3
1.3s  → Avatar 4
1.5s  → Counter starts counting (100→120)
```

Total page entrance: **~3.5 seconds** including counter animation

## Code Examples

### Basic Motion Component
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  Content
</motion.div>
```

### Staggered Children
```tsx
// Avatar images with 100ms delays
delay: 1.0s  // First
delay: 1.1s  // Second
delay: 1.2s  // Third
delay: 1.3s  // Fourth
```

### Continuous Loop
```tsx
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
>
  Floating element
</motion.div>
```

### Hover Interaction
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive element
</motion.div>
```

## Design Inspiration

This animation suite is inspired by:
- **Linear** - Subtle, meaningful motion
- **Stripe** - Polished, professional feel
- **Vercel** - Clean, modern SaaS aesthetic
- **Framer** - Smooth, natural animations

## Testing Checklist

- [ ] All animations complete without jank
- [ ] Hover states work on all interactive elements
- [ ] Focus states are visible and animated
- [ ] Success/error messages animate smoothly
- [ ] Phone mockups float continuously
- [ ] Counter increments correctly
- [ ] Responsive breakpoints maintain animation quality
- [ ] Reduced motion preference respected
- [ ] No layout shift during animations
- [ ] 60fps maintained throughout

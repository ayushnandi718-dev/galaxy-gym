# Galaxy Multi Gym — 3D Sections Integration Guide

## Folder Structure After Integration

```
src/
  components/
    3d/                          ← NEW: All 3D model files go here
      Section3DCanvas.jsx        ← Reusable 3D canvas wrapper
      TrophyModel.jsx            ← About section
      BarbellModel.jsx           ← Services section
      CrownModel.jsx             ← Membership section
      MedalModel.jsx             ← Trainers section
      ArrowTransformModel.jsx    ← Transformation section
      ScaleModel.jsx             ← FitnessTools section
      PhoneLocationModel.jsx     ← Contact section
    About.jsx                    ← REPLACE existing
    Services.jsx                 ← REPLACE existing
    Membership.jsx               ← REPLACE existing
    Trainers.jsx                 ← REPLACE existing
    Transformation.jsx           ← REPLACE existing
    FitnessTools.jsx             ← REPLACE existing
    Contact.jsx                  ← REPLACE existing
    Navbar.jsx                   ← KEEP unchanged
    Hero.jsx                     ← KEEP unchanged
    Footer.jsx                   ← KEEP unchanged
    DumbbellModel.jsx            ← KEEP unchanged (Hero uses this)
    GoldParticles.jsx            ← KEEP unchanged (Hero uses this)
```

## 3D Themes Per Section

| Section        | 3D Model       | Position        | Animation               |
|---------------|----------------|-----------------|-------------------------|
| About         | 🏆 Trophy       | Right side      | Slow Y-rotate + float   |
| Services      | 🏋️ Barbell      | Center bg       | Y-rotate + Z-tilt       |
| Membership    | 👑 Crown        | Left side       | Y-rotate + float        |
| Trainers      | 🏅 Medal        | Right side      | Pendulum + Y-rotate     |
| Transformation| 👥 Before/After | Center bg       | Y-rotate + arrow pulse  |
| FitnessTools  | ⚖️ Scale        | Right side      | Y-rotate + needle swing |
| Contact       | 📍 Location Pin | Left side       | Y-rotate + pin bounce + radar rings |

## How It Works

- Each 3D model is wrapped in `<Section3DCanvas>` — a transparent Canvas absolutely 
  positioned at `z-index: 0` BEHIND the section's glass cards.
- Section content (cards, text, headings) sits at `z-index: 1` — glass blur effect 
  naturally appears over the 3D animation.
- All models use gold (#C9A84C) palette to match site theme.
- Models auto-float/rotate using `useFrame` — no scroll needed.

## No Additional Packages Needed

Your existing packages already cover everything:
- `@react-three/fiber` ✅
- `@react-three/drei` ✅  
- `three` ✅

## Quick Copy Steps

1. Copy `src/components/3d/` folder entirely into your project
2. Replace the 7 section files listed above
3. `npm run dev` — done!

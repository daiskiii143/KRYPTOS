# KRYPTOS — Subterranean High Jewelry Atelier & Interactive 3D Web Application

> *"Forged in Shadow. Worn in Light."*

A luxury 3D interactive web application and digital atelier showcasing the **KRYPTOS** tungsten carbide ring with raised 3D Celtic dragon filigree, stratified molten crimson pearloid core, and diamond-polished clear optical resin sleeve.

---

## 🏛️ Craftsmanship & 3D Metallurgy

The centerpiece 3D asset (`KryptosRing_Root`) was precision-engineered in Blender 5.3 with 192 circumferential segments, radial comfort-fit inner bore, and quad-mesh topology.

### The Four Anatomies:
1. **`Ring_TungstenFrame`** — Polished obsidian-black tungsten carbide chassis (`Mohs 9.0`, `14.2g`) with twin 45° diamond chamfers flanking a 0.035m recessed inlay channel, and comfort-fit inner typography engraving (`KRYPTOS · TUNGSTEN CARBIDE`).
2. **`Ring_CrimsonCore`** — Luminous subterranean base with layered metallic ruby and obsidian pearlescent marbling (`Tex_CrimsonPearloid.png`, 2048x512).
3. **`Ring_FiligreeRelief`** — Physically raised 0.018m solid metallic Celtic eternity knots, dragon crest scrolls, and armor scale lattice in brushed rhodium chrome (`Mat_FiligreeChrome`).
4. **`Ring_ResinOvercoat`** — High-index (`1.54 IOR`, `0.96 Transmission`) clear protective resin sleeve bridging flush between the tungsten rails.

---

## ⚡ Interactive Architecture

### Act 0: The Dark Reveal (`scroll = 0`)
- Pure obsidian darkness (`#050507`). Over 1.2s, a directional silver rim light sweeps across the floating ring, accompanied by the architectural wordmark and subtle `Scroll to Unlock Core` cue.

### Act 1: Spin Ignition & Flying Typography (`scroll 0% -> 35%`)
- **Orbital Spin:** Smooth scroll acceleration tilts and spins the ring in 3D space.
- **Texture Ignition:** Custom shader / emissive light-sweep across the filigree and crimson core driven by scroll velocity and angle.
- **Peeling 3D Typography:** Individual glowing metallic/crimson runes peel off the ring's outer perimeter along 3D Bezier trajectories and lock into their editorial slots to spell out:
  `FORGED IN SHADOW. WORN IN LIGHT.`

### Act 2: Luxury 3D Atelier & Storefront (`scroll 38% -> 100%`)
- **Interactive 3D Configurator:** Drag-rotate the ring 360° with realtime PBR updates across 3 bespoke editions:
  - `01 / IGNIS TUNGSTEN` (Signature Molten Crimson Pearloid + Rhodium Filigree)
  - `02 / ECLIPSE OBSIDIAN` (Stealth Matte Black Carbon + Smoked Chrome Filigree)
  - `03 / AETHER EMERALD` (Deep Emerald Relic Core + Brushed Silver Filigree)
- **Angle Presets:** Instant camera transitions to *Hero 3/4*, *Filigree Relief Close-up*, and *Comfort Bore*.
- **Curated Collection Grid:** Curated 4-ring silhouettes with live alloy and weight specs.
- **Quick-Inspect Modal:** Ring Size Selector (`US 6` to `US 12`), live custom inner-band laser engraving preview, and instant add-to-vault.
- **Slide-Out Vault Drawer:** Full bag management, size indicators, custom engraving display, item quantity controls, subtotal computation, and simulated allocation checkout.

---

## 🛠️ Tech Stack & Zero-CDN Performance

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Smoked Glass Surfaces (`1px solid rgba(255,255,255,0.08)`)
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Typography:** Inter, Cinzel, JetBrains Mono
- **Inertia Scroll:** Lenis (`1.1.18`)
- **Icons:** Lucide React
- **Local Draco Decoder:** Local WASM binaries in `public/draco/` with `useGLTF.setDecoderPath('/draco/')` for zero-CDN network stalls.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/aditya0548/KRYPTOS.git
cd KRYPTOS

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Build optimized web bundle
npm run build

# Preview build locally
npm run preview
```

---

## 💎 Master Files
- Master Blender file: `kryptos-ring.blend`
- WebGL Model: `public/models/kryptos-ring.glb` (Draco compressed)
- Inlay Texture: `public/models/Tex_CrimsonPearloid.png`

---

© 2026 KRYPTOS High Jewelry Atelier. Sintered in subterranean heat.

# MathDiya — Light Up Your Child's Math 🪔

> **Live online math classes for US students, Grades 3–8**  
> Built with high-performance 3D scroll-driven video choreography, Three.js WebGL geometry, interactive grade syllabi, Texas Math Readiness (STAAR & beyond) simulator, and an intuitive US timezone booking engine.

---

## ✨ Features Built

1. **Scroll-Driven 3D Mascot Choreography ("Diya Dost")**
   - Synchronized timeline scrubbing of the 3D claymation mascot video (`public/mascot_scroll_opt.mp4`).
   - Intra-frame keyframed MP4 (`-g 1`) for instantaneous, stutter-free frame seeking on scroll.
   - Pinned 3D viewport that smoothly guides the parent across four choreographed stages:
     - **Stage 1 (0% - 25%)**: Brand identity, tagline *"Light up your child's math"*, and trust pillars.
     - **Stage 2 (25% - 50%)**: Diya Dost leaps forward, welcoming parents and kids with conceptual math values.
     - **Stage 3 (50% - 75%)**: Diya Dost steps to the left and gestures right toward the **Grade Explorer** & **Texas Math Readiness** simulator.
     - **Stage 4 (75% - 100%)**: Diya Dost steps to the right and presents the **4-Step Pathway** and **Booking Engine**.

2. **Three.js WebGL Floating Geometry & Particle Universe**
   - Interactive 3D floating polyhedra: Icosahedron (20-face geometry), Octahedron, Torus (Pi/circular logic), and Math Pyramid with golden wireframes.
   - 260+ golden diya spark particles with radial warmth and gentle mouse parallax physics.
   - Warm pulsing diya flame light in Diya Orange (`#F08A24`) and Diya Green (`#0A9155`).

3. **Brand Identity & Color Palette**
   - **Diya Green** (`#0A9155`): Headings, trust accents, and primary badges.
   - **Diya Orange** (`#F08A24`): Always-visible *"Book Free Class"* sticky CTA and energizing accents.
   - **Flame Red** (`#D7262B`): Visual highlights and alert badges.
   - **Glow Gold** (`#F7C948`): Star ratings, reward accents, and flame glows.
   - **Cream** (`#FDF3E3`): Warm, soothing canvas background.
   - **Ink** (`#1F2A2E`): Readable, crisp typography.
   - **Fonts**: *Fredoka* & *Baloo 2* for rounded headings; *Lexend* & *Nunito* for body copy.

4. **Interactive Grade Explorer (Grades 3 to 8)**
   - Tabbed navigation across Grades 3, 4, 5, 6, 7, and 8.
   - Full R.S. Aggarwal 5-Unit breakdown per grade with focus areas.
   - Texas STAAR & TEKS test alignment competencies.
   - Interactive grade-specific math challenges with instant step-by-step mathematical explanations and confetti celebrations.
   - Direct grade pre-selection into the booking modal.

5. **Texas Math Readiness (STAAR & Beyond) Panel**
   - Specifically built for Texas's transition up to Spring 2027 and the upcoming interim 3-check testing framework.
   - Live 3-question diagnostic quiz simulator with instant feedback and score recommendations.

6. **Parent-Friendly 6-Field Booking Scheduler**
   - Max 6 fields as specified in the brief: Parent Name, Student Name, Grade, Email, Phone/WhatsApp, and Timezone/Slot.
   - Real-time US Timezone conversion (**EST**, **CST**, **MST**, **PST**).
   - Both modal popup and inline scheduler support.
   - Confetti celebration upon confirmation with student details summary.

7. **Social Proof & Parent FAQ**
   - Verified feedback from US parents in Frisco TX, Austin TX, Edison NJ, San Jose CA, and Naperville IL.
   - Interactive accordion addressing cohort size (5–8 students), R.S. Aggarwal methodology, class recordings, and COPPA privacy.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18 (Tested on Node v24)
- npm

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Build production bundle into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
d:/Math Diya/
├── public/
│   ├── MathDiya-logo.png             # Official brand logo
│   └── mascot_scroll_opt.mp4         # Intra-frame scroll-scrubbed mascot video
├── src/
│   ├── main.js                       # Application entry point & orchestration
│   ├── style.css                     # Custom animations, diya glow, typography
│   ├── threeCanvas.js                # Three.js 3D WebGL floating geometry & particles
│   ├── scrollEngine.js               # Scroll-driven video timeline scrubbing engine
│   ├── gradeExplorer.js              # Interactive Grade 3–8 syllabus & challenges
│   ├── staarQuiz.js                  # Texas Math Readiness diagnostic simulator
│   ├── bookingModal.js               # US timezone slot picker & booking handler
│   └── curriculumData.js             # Grade 3–8 syllabus & R.S. Aggarwal units
├── index.html                        # Semantic HTML with Tailwind & Google Fonts
├── package.json                      # Scripts & dependencies
└── README.md                         # Project documentation
```

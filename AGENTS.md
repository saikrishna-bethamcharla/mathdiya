# Project Guidelines & Agent Instructions

## 1. Automatic GitHub Sync (Strict Rule)
- Whenever any change, feature, fix, or update is made to the codebase:
  1. Verify the production build (`npx vite build`).
  2. Stage the changes (`git add <files>` or `git add -A`).
  3. Commit with a conventional commit message (`git commit -m "..."`).
  4. **Immediately and automatically push to GitHub** (`git push origin main`).
- Never leave changes uncommitted or unpushed at the end of a turn or task.

## 2. UI / Design Standards
- **Zero Emojis**: Maintain a clean, professional, high-end educational aesthetic. Use Lucide-style SVG vector icons and typography badges. No emojis anywhere in the markup, scripts, or content.
- **Scroll & Layout Alignment**:
  - Hero: Center-stage logo reveal with responsive typography.
  - Section 2 (Curriculum / Mascot Left): Content pinned to the right half (50% width).
  - Sections 3 & 4 (STAAR & Grades / Mascot Right): Content pinned to the left half (50% width).
- **Responsive**: Full desktop/laptop landscape and mobile responsiveness.

## 3. Shell Discipline
- Run one command per invocation (no chaining with `&&` or `||` in PowerShell).

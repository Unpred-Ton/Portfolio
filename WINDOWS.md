# Running on Windows (PowerShell)

This project was relocated from WSL to `C:\Users\johns\Projects\Portfolio` on 2026-09-22.
`node_modules` and the `.next` build cache were intentionally **not** copied — they hold
Linux-native binaries. Reinstall dependencies fresh; `package-lock.json` pins identical
versions.

## Prerequisites

- **Node.js 22** (see `.nvmrc`). Install directly, or manage versions with
  [nvm-windows](https://github.com/coreybutler/nvm-windows) / [fnm](https://github.com/Schniz/fnm):
  ```powershell
  node -v   # expect v22.x
  ```

## First run

```powershell
cd C:\Users\johns\Projects\Portfolio
npm install
npm run dev        # http://localhost:8000
```

## Common scripts

| Command             | What it does                                          |
|---------------------|-------------------------------------------------------|
| `npm run dev`       | Dev server (Turbopack) on port **8000**               |
| `npm run build`     | Production build                                       |
| `npm run build:local` | Build with a raised memory ceiling (uses `cross-env`, PowerShell-safe) |
| `npm run start`     | Serve the production build on port 8000               |
| `npm run check`     | typecheck + lint + confidential-content guard         |

## Git

The GitHub remote uses SSH: `git@github.com:Unpred-Ton/Portfolio.git`.
Authentication uses the `~/.ssh/id_ed25519_github` key (mapped to `github.com` in
`~/.ssh/config`). Verify with `ssh -T git@github.com`, which should greet `Unpred-Ton`.

Commit identity is set in this repo's local config (personal Gmail), overriding the
global work identity on this PC.

`git config core.fileMode false` is already set locally so Windows/WSL file-permission
differences don't show up as spurious changes.

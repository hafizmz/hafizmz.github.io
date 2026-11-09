# Penang Hill Trail Guide: Beta 1.0

A free trail guide to Penang Hill (Bukit Bendera): routes, an interactive trail map, and history, nature and arts stories at every stop. Installable on phones and **works offline**.

## What's in this folder
| File | What it does |
|---|---|
| `index.html` | The whole app |
| `manifest.json` | Name, icon and colours, so phones can install it |
| `sw.js` | Offline script: saves the app on the phone on the first visit |
| `privacy.html` | Privacy page (needed later for the app stores) |
| `icons/` | App icons |
| `fonts/` | Inter font (SIL Open Font License), so the app looks the same offline |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

---

## Put it on GitHub Pages (about 10 minutes, free)

1. **Create a GitHub account** at github.com, if you don't have one.
2. **New repository:** click **+** → **New repository**.
   - Name: `penang-hill-guide` (this becomes part of the web address)
   - Set it to **Public** (free GitHub Pages needs a public repository)
   - Click **Create repository**
3. **Upload the files:** on the new repo page, click **uploading an existing file**.
   - Unzip this package on your computer, then drag **everything inside the folder** (not the folder itself) into the page: `index.html`, `manifest.json`, `sw.js`, `privacy.html`, `README.md`, and the `icons` and `fonts` folders.
   - The hidden `.nojekyll` file may not drag across. That's fine; the app works without it.
   - Click **Commit changes**.
4. **Turn on Pages:** go to **Settings** → **Pages**.
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/ (root)** → **Save**
5. Wait 1–2 minutes and refresh. Your link appears at the top:
   **`https://hafizmz.github.io/penang-hill/`**

## Send to testers
> Hi! Please help test my Penang Hill trail guide.
> 1. Open this link **once while you have internet**: https://hafizmz.github.io/penang-hill/
> 2. Add it to your home screen:
>    - **iPhone:** in **Safari**, tap Share ⬆️ → **Add to Home Screen**
>    - **Android:** in **Chrome**, tap **Install app** (or ⋮ → Add to Home screen)
> 3. Open it from your home screen. It now works on the hill with no signal.
> Please tell me anything confusing, wrong or broken 🙏

## Updating the app later
1. Upload the changed files to the repo (same names, replacing the old ones).
2. **Important:** open `sw.js` and change `VERSION` (e.g. `beta-0.8.0` → `beta-0.8.1`), then commit.
   Without this, phones keep the old saved copy.
3. Testers get the update the next time they open the app with signal.

## Before you share it
- Contact on the privacy page points to github.com/hafizmz.

## New in 1.0
- True-scale trail map from OpenStreetMap, with 📍 "you are here"
- Stop alerts: a story pops up when you reach any of the 24 stops
- Visited stops and badges
- Bahasa Malaysia: tap **BM** in the header

## Good to know
- **First visit needs internet.** After that, everything works offline except the Library's outside links.
- **Live GPS** (Map → GPS track) works on GitHub Pages because it uses https. Phones ask for permission first.
- **Recording a hike:** keep the app open and the screen on. Phones pause GPS when the screen locks. The track saves as a `.gpx` file in Downloads/Files.
- **iPhone** may clear saved web-app data if the app isn't opened for several weeks. Opening it once with signal restores it.
- The trail map is a plan map drawn from the official sign's layout, **not to scale**. Use it with the official Penang Hill app or OsmAnd for navigation.

## Credits
History, nature and arts notes are written for this guide from the sources listed in the app's Library. Map data © OpenStreetMap contributors (ODbL), openstreetmap.org/copyright. Font: Inter © The Inter Project Authors (SIL OFL 1.1).

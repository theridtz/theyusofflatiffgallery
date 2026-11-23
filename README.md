# The Portrait Gallery — Every Face Has a Story

An immersive 3D museum of watercolour portraits and places of Singapore by Yusoff Abdul Latiff (al-Yus).

It is a static site: `index.html`, `app.js`, `data.js` and the `assets/` folder of paintings. No build step is needed. Three.js and the fonts load from public CDNs.

## Run it on your computer

Browsers block JavaScript modules opened straight from a file, so start a small local server in this folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy to Vercel

1. Push this folder to a new GitHub repository (instructions below).
2. In Vercel, choose **Add New → Project**, then import the repository.
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Click **Deploy**.

## Deploy to GitHub Pages

1. Create a new repository on GitHub, e.g. `the-portrait-gallery`.
2. Upload everything in this folder, including `assets/`, or push it with git:
   ```
   git init
   git add .
   git commit -m "The Portrait Gallery"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/the-portrait-gallery.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**. Set the source to **Deploy from a branch**, pick `main`, then `/ (root)`.
4. The site appears at `https://YOUR-USERNAME.github.io/the-portrait-gallery/` within a minute or two.

## Adding or editing paintings

All the content lives in `data.js`. Each painting is one `P({ ... })` entry with its name, story, room and image path. To add one:

1. Put the image in `assets/` (about 900 px wide for portraits, 1400 px for landscapes, saved as JPEG).
2. Copy an existing entry in `data.js`, then change the `id`, the text, `rooms` and `image`.
3. Add the entry's name to the `DEFAULT_PORTRAITS` list near the bottom of `data.js`.

Room ids: `pioneers`, `gamechangers`, `heroes`, `monuments`, `beautiful`, `peranakan`.
Add `orient: 'landscape'` for wide paintings. Add `published: false` to hide an entry.

The online Curator editor only works inside the Claude version of the gallery. In this copy, edit `data.js` directly.

## Useful links within the site

- `#artist`: the artist profile
- `#find`: the Find a portrait drawer (on phones: tap Find a portrait, or swipe up)
- `#catalogue`: the full collection as a list
- `#map`: the floor plan
- `#<painting-id>`: opens a painting's story directly, e.g. `#ong-kim-seng`

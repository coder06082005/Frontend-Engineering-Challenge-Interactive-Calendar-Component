# Interactive wall calendar (React + Vite)

Frontend exercise: a wall-calendar style UI with a hero image, lined notes area, Monday-first grid, and interactive date-range selection. Layout, colors (#0088cc blue, #333 text, #cccccc muted lines), and typography follow the supplied reference PDF.

## Live Link
https://frontend-engineering-challenge-inte-chi.vercel.app/

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build   # production bundle
npm run preview # serve dist
```

## Features

- **Wall calendar chrome**: Spiral binding strip, hook detail, large photo with angled blue band, year + month title on the band.
- **Notes**: Ruled “notebook” lines; month memo persists in `localStorage`. When a full range is selected, an extra field appears for notes tied to that range (also persisted).
- **Range selection**: First tap/click sets the start; second sets the end (order normalized). Start and end use a solid blue treatment; days in between use a light blue fill. Changing month clears the selection.
- **Responsive**: Desktop uses a two-column lower panel (notes left, grid right). On narrow screens the grid moves above the notes for easier touch use (44px minimum cell height).
- **Wall mount**: Light gray wall, centered tack, slight sheet tilt, layered shadow (tilt and motion effects respect `prefers-reduced-motion`).
- **Seasonal accent**: `data-season` on the card shifts the blue accent, range tint, and hero `object-position` by season (Winter / Spring / Summer / Autumn).
- **Page-turn motion**: Changing month plays a short 3D tilt on the sheet body (`calendar-page__inner`).
- **Holiday markers**: US federal / commonly observed holidays use static calendar rules (MLK, Presidents’ Day, Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, Christmas, New Year’s). Marked with an orange dot, hover `title`, and `aria-label`; see the hint under the grid.

## Asset

`public/hero.jpg` is a royalty-free climbing image (Unsplash), chosen to match the mountain/ice aesthetic of the reference. Replace it with your own image if you prefer.

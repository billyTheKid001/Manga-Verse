# MangaVerse 🎌

Application manga fullstack avec SvelteKit + MangaDex API.

## Installation

```bash
# 1. Aller dans le dossier
cd MangaVerse

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Ouvrez http://localhost:5173

## Fonctionnalités

- 🏠 Page d'accueil avec mangas populaires
- 🔍 Recherche par titre ou genre
- 📖 Page de détail avec chapitres
- 📱 Lecteur de manga intégré
- 🌙 Thème sombre manga

## Structure

```
src/
├── app.html
├── style.css
├── lib/
│   ├── components/
│   │   ├── Navbar.svelte
│   │   ├── MangaCard.svelte
│   │   ├── SearchBar.svelte
│   │   └── Reader.svelte
│   └── stores/
│       ├── theme.js
│       └── user.js
└── routes/
    ├── +layout.svelte
    ├── +page.svelte          ← Accueil
    ├── search/+page.svelte   ← Catalogue
    ├── manga/[id]/+page.svelte
    ├── chapter/[id]/+page.svelte
    └── api/
        ├── mangaList/+server.js
        ├── mangaDetail/+server.js
        ├── chapters/+server.js
        └── search/+server.js
```

## Données

Fournies gratuitement par [MangaDex API](https://api.mangadex.org).

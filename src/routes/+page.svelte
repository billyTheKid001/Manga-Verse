<script>
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import MangaCard from '$lib/components/MangaCard.svelte';

  let mangas = [];
  let loading = true;
  let error = null;
  let page = 0;
  let total = 0;
  let loadingMore = false;

  async function loadMangas(p = 0) {
    try {
      const res = await fetch(`/api/mangaList?page=${p}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (p === 0) {
        mangas = data.mangaList;
      } else {
        mangas = [...mangas, ...data.mangaList];
      }
      total = data.total;
    } catch (e) {
      error = e.message;
    }
  }

  onMount(async () => {
    await loadMangas(0);
    loading = false;
  });

  async function loadMore() {
    loadingMore = true;
    page++;
    await loadMangas(page);
    loadingMore = false;
  }

  const genres = ['Action', 'Romance', 'Fantasy', 'Comedy', 'Isekai', 'Slice of Life', 'Horror', 'Adventure'];
</script>

<Navbar />

<main>
  <!-- Hero -->
  <section class="hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-grid"></div>
    </div>
    <div class="hero-content">
      <div class="hero-badge">✦ Votre univers manga</div>
      <h1 class="hero-title">
        Explorez des milliers<br>
        de <span class="hero-accent">mangas</span>
      </h1>
      <p class="hero-sub">Découvrez les meilleurs titres, lisez les derniers chapitres et plongez dans votre univers préféré.</p>
      <div class="hero-actions">
        <a href="/search" class="btn-primary">Explorer le catalogue</a>
        <a href="#trending" class="btn-ghost">Tendances ↓</a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-num">36K+</span>
          <span class="stat-label">Mangas</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">Gratuit</span>
          <span class="stat-label">Accès</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">HD</span>
          <span class="stat-label">Qualité</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Genres -->
  <section class="genres-section">
    <div class="container">
      <div class="genres-scroll">
        {#each genres as genre}
          <a href="/search?q={genre}" class="genre-pill">{genre}</a>
        {/each}
      </div>
    </div>
  </section>

  <!-- Trending -->
  <section class="section" id="trending">
    <div class="container">
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <span class="title-bar"></span>
            Populaires
          </h2>
          <p class="section-sub">Les titres les plus suivis en ce moment</p>
        </div>
        <a href="/search" class="see-all">Tout voir →</a>
      </div>

      {#if loading}
        <div class="grid">
          {#each Array(12) as _}
            <div class="card-skeleton">
              <div class="skeleton img-skeleton"></div>
              <div class="skeleton text-skeleton"></div>
              <div class="skeleton text-skeleton short"></div>
            </div>
          {/each}
        </div>
      {:else if error}
        <div class="error-box">
          <p>⚠️ {error}</p>
          <button on:click={() => { loading = true; loadMangas(0).then(() => loading = false); }} class="retry-btn">
            Réessayer
          </button>
        </div>
      {:else}
        <div class="grid animate-in">
          {#each mangas as manga, i}
            <div style="animation-delay: {Math.min(i * 30, 300)}ms">
              <MangaCard {manga} />
            </div>
          {/each}
        </div>

        {#if mangas.length < total}
          <div class="load-more-wrap">
            <button class="load-more-btn" on:click={loadMore} disabled={loadingMore}>
              {#if loadingMore}
                <span class="spinner"></span>
              {:else}
                Charger plus
              {/if}
            </button>
          </div>
        {/if}
      {/if}
    </div>
  </section>
</main>

<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="logo-icon">⬡</span>
        <span class="logo-text">MANGA<span style="color:var(--accent)">VERSE</span></span>
      </div>
      <p class="footer-copy">© 2025 MangaVerse · Données fournies par <a href="https://mangadex.org" target="_blank">MangaDex</a></p>
    </div>
  </div>
</footer>

<style>
  main {
    min-height: 100vh;
  }

  /* Hero */
  .hero {
    position: relative;
    padding: 100px 24px 80px;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 80% at 20% 40%, rgba(230, 57, 70, 0.12) 0%, transparent 70%),
      radial-gradient(ellipse 50% 60% at 80% 60%, rgba(244, 162, 97, 0.07) 0%, transparent 70%);
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.3;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    animation: fadeIn 0.7s ease both;
  }

  .hero-badge {
    display: inline-block;
    padding: 6px 16px;
    background: rgba(230, 57, 70, 0.12);
    border: 1px solid rgba(230, 57, 70, 0.3);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 24px;
  }

  .hero-title {
    font-family: 'Bebas Neue', cursive;
    font-size: clamp(52px, 8vw, 96px);
    line-height: 1;
    letter-spacing: 2px;
    color: var(--text);
    margin-bottom: 20px;
  }

  .hero-accent {
    color: var(--accent);
    -webkit-text-stroke: 1px var(--accent);
  }

  .hero-sub {
    font-size: 17px;
    color: var(--text2);
    max-width: 520px;
    margin: 0 auto 36px;
    line-height: 1.7;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 48px;
  }

  .btn-primary {
    padding: 13px 28px;
    background: var(--accent);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.2s;
    box-shadow: 0 4px 20px rgba(230, 57, 70, 0.35);
  }

  .btn-primary:hover {
    background: var(--accent2);
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(230, 57, 70, 0.45);
  }

  .btn-ghost {
    padding: 13px 28px;
    background: var(--bg3);
    color: var(--text);
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    border: 1px solid var(--border);
    transition: all 0.2s;
  }

  .btn-ghost:hover {
    background: var(--surface);
    border-color: var(--text3);
    transform: translateY(-2px);
  }

  .hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .stat-num {
    font-family: 'Bebas Neue', cursive;
    font-size: 26px;
    color: var(--text);
    letter-spacing: 1px;
  }

  .stat-label {
    font-size: 11px;
    color: var(--text3);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .stat-divider {
    width: 1px;
    height: 32px;
    background: var(--border);
  }

  /* Genres */
  .genres-section {
    padding: 0 0 32px;
  }

  .genres-scroll {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 4px 0 8px;
    scrollbar-width: none;
  }

  .genres-scroll::-webkit-scrollbar { display: none; }

  .genre-pill {
    padding: 7px 16px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 13px;
    color: var(--text2);
    white-space: nowrap;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .genre-pill:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
  }

  /* Section */
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section {
    padding: 32px 0 64px;
  }

  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .section-title {
    font-family: 'Bebas Neue', cursive;
    font-size: 32px;
    letter-spacing: 2px;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }

  .title-bar {
    display: block;
    width: 4px;
    height: 28px;
    background: var(--accent);
    border-radius: 2px;
    flex-shrink: 0;
  }

  .section-sub {
    font-size: 14px;
    color: var(--text3);
    margin-left: 16px;
  }

  .see-all {
    font-size: 14px;
    color: var(--accent);
    font-weight: 500;
    transition: opacity 0.2s;
  }

  .see-all:hover { opacity: 0.7; }

  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
    }
  }

  /* Skeleton */
  .card-skeleton {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .img-skeleton {
    aspect-ratio: 2/3;
    border-radius: var(--radius);
  }

  .text-skeleton {
    height: 14px;
    border-radius: 4px;
  }

  .text-skeleton.short {
    width: 60%;
    height: 12px;
  }

  /* Error */
  .error-box {
    text-align: center;
    padding: 48px;
    color: var(--text2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .retry-btn {
    padding: 10px 24px;
    background: var(--accent);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    transition: 0.2s;
  }

  .retry-btn:hover {
    background: var(--accent2);
  }

  /* Load more */
  .load-more-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .load-more-btn {
    padding: 12px 36px;
    background: var(--bg3);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 140px;
    justify-content: center;
  }

  .load-more-btn:hover:not(:disabled) {
    background: var(--accent);
    border-color: var(--accent);
  }

  .load-more-btn:disabled {
    opacity: 0.6;
    cursor: default;
  }

  /* Footer */
  .footer {
    border-top: 1px solid var(--border);
    padding: 28px 0;
    margin-top: 32px;
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-icon {
    font-size: 18px;
    color: var(--accent);
  }

  .logo-text {
    font-family: 'Bebas Neue', cursive;
    font-size: 18px;
    letter-spacing: 2px;
  }

  .footer-copy {
    font-size: 13px;
    color: var(--text3);
  }

  .footer-copy a {
    color: var(--accent);
    transition: opacity 0.2s;
  }

  .footer-copy a:hover { opacity: 0.7; }
</style>

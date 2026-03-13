<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';

  let manga = null;
  let loading = true;
  let error = null;

  const id = $page.params.id;

  onMount(async () => {
    try {
      const res = await fetch(`/api/mangaDetail?id=${id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      manga = data.manga;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  function statusLabel(s) {
    return s === 'ongoing' ? 'En cours' : s === 'completed' ? 'Terminé' : s === 'hiatus' ? 'En pause' : s || '—';
  }

  let imgError = false;
</script>

<Navbar />

<main>
  {#if loading}
    <div class="loading-wrap">
      <div class="spinner"></div>
    </div>
  {:else if error}
    <div class="error-box">
      <p>⚠️ {error}</p>
      <a href="/" class="back-link">← Retour à l'accueil</a>
    </div>
  {:else if manga}
    <div class="detail-hero" style="--cover: url('{manga.image}')">
      <div class="detail-hero-bg"></div>
      <div class="container">
        <div class="detail-top animate-in">
          <div class="cover-wrap">
            {#if imgError || !manga.image}
              <div class="cover-placeholder">⬡</div>
            {:else}
              <img
                src={manga.image}
                alt={manga.title}
                class="cover-img"
                on:error={() => imgError = true}
              />
            {/if}
          </div>

          <div class="detail-info">
            <div class="detail-badges">
              <span class="badge">{manga.type}</span>
              <span class="badge status" class:ongoing={manga.status === 'ongoing'} class:completed={manga.status === 'completed'}>
                {statusLabel(manga.status)}
              </span>
              {#if manga.year}
                <span class="badge">{manga.year}</span>
              {/if}
            </div>

            <h1 class="detail-title">{manga.title}</h1>

            {#if manga.author && manga.author !== 'Inconnu'}
              <p class="detail-author">par <strong>{manga.author}</strong></p>
            {/if}

            <div class="detail-tags">
              {#each manga.tags.slice(0, 6) as tag}
                <a href="/search?q={tag}" class="detail-tag">{tag}</a>
              {/each}
            </div>

            <p class="detail-desc">{manga.description?.slice(0, 400)}{manga.description?.length > 400 ? '...' : ''}</p>

            {#if manga.chapters.length > 0}
              <a href="/chapter/{manga.chapters[0].id}" class="read-btn">
                ▶ Lire le chapitre 1
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <!-- Chapters -->
    {#if manga.chapters.length > 0}
      <section class="chapters-section">
        <div class="container">
          <h2 class="section-title">
            <span class="title-bar"></span>
            Chapitres
          </h2>
          <div class="chapters-list">
            {#each manga.chapters as ch}
              <a href="/chapter/{ch.id}" class="chapter-item">
                <div class="chapter-left">
                  <span class="ch-number">Ch. {ch.chapter || '?'}</span>
                  {#if ch.title}
                    <span class="ch-title">{ch.title}</span>
                  {/if}
                </div>
                <div class="chapter-right">
                  {#if ch.pages}
                    <span class="ch-pages">{ch.pages} pages</span>
                  {/if}
                  <span class="ch-read">Lire →</span>
                </div>
              </a>
            {/each}
          </div>
        </div>
      </section>
    {/if}
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    padding-bottom: 64px;
  }

  .loading-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }

  .error-box {
    text-align: center;
    padding: 64px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: var(--text2);
  }

  .back-link {
    color: var(--accent);
    font-weight: 500;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* Detail Hero */
  .detail-hero {
    position: relative;
    padding: 48px 0 40px;
    margin-bottom: 40px;
  }

  .detail-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 100% at 50% 0%, rgba(230, 57, 70, 0.08) 0%, transparent 70%),
      linear-gradient(to bottom, var(--bg2), var(--bg));
    z-index: 0;
  }

  .detail-top {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 40px;
    align-items: start;
  }

  @media (max-width: 640px) {
    .detail-top {
      grid-template-columns: 1fr;
    }
  }

  .cover-wrap {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(0,0,0,0.6);
    aspect-ratio: 2/3;
    background: var(--bg3);
  }

  .cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    color: var(--accent);
    opacity: 0.3;
  }

  .detail-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 8px;
  }

  .detail-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .badge {
    padding: 4px 10px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .badge.status.ongoing {
    background: rgba(244, 162, 97, 0.12);
    border-color: rgba(244, 162, 97, 0.3);
    color: var(--gold);
  }

  .badge.status.completed {
    background: rgba(46, 213, 115, 0.12);
    border-color: rgba(46, 213, 115, 0.3);
    color: #2ed573;
  }

  .detail-title {
    font-family: 'Bebas Neue', cursive;
    font-size: clamp(28px, 4vw, 48px);
    letter-spacing: 1px;
    line-height: 1.05;
    color: var(--text);
  }

  .detail-author {
    font-size: 14px;
    color: var(--text2);
  }

  .detail-author strong {
    color: var(--text);
  }

  .detail-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .detail-tag {
    padding: 4px 10px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 12px;
    color: var(--text2);
    transition: all 0.2s;
  }

  .detail-tag:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
  }

  .detail-desc {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text2);
    max-width: 600px;
  }

  .read-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: var(--accent);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.2s;
    width: fit-content;
    box-shadow: 0 4px 20px rgba(230, 57, 70, 0.3);
  }

  .read-btn:hover {
    background: var(--accent2);
    transform: translateY(-2px);
  }

  /* Chapters */
  .chapters-section {
    padding: 0 0 32px;
  }

  .section-title {
    font-family: 'Bebas Neue', cursive;
    font-size: 28px;
    letter-spacing: 2px;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .title-bar {
    display: block;
    width: 4px;
    height: 24px;
    background: var(--accent);
    border-radius: 2px;
    flex-shrink: 0;
  }

  .chapters-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .chapter-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: var(--bg2);
    border: 1px solid transparent;
    border-radius: var(--radius);
    transition: all 0.2s;
    gap: 16px;
  }

  .chapter-item:hover {
    background: var(--bg3);
    border-color: var(--border);
  }

  .chapter-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  .ch-number {
    font-weight: 700;
    font-size: 14px;
    color: var(--text);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .ch-title {
    font-size: 13px;
    color: var(--text2);
    truncate: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .chapter-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .ch-pages {
    font-size: 12px;
    color: var(--text3);
  }

  .ch-read {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .chapter-item:hover .ch-read {
    opacity: 1;
  }
</style>

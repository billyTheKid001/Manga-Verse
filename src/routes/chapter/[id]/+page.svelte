<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Reader from '$lib/components/Reader.svelte';

  let pages = [];
  let loading = true;
  let error = null;

  const id = $page.params.id;

  onMount(async () => {
    try {
      const res = await fetch(`/api/chapters?id=${id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      pages = data.pages;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Lecture — MangaVerse</title>
</svelte:head>

<div class="reader-page">
  <div class="reader-topbar">
    <a href="/" class="back-btn">← Retour</a>
    <span class="reader-brand">⬡ MANGAVERSE</span>
    {#if pages.length > 0}
      <span class="page-info">{pages.length} pages</span>
    {:else}
      <span></span>
    {/if}
  </div>

  {#if loading}
    <div class="reader-loading">
      <div class="spinner"></div>
      <p>Chargement du chapitre...</p>
    </div>
  {:else if error}
    <div class="reader-error">
      <p>⚠️ {error}</p>
      <a href="/" class="back-link">← Retour à l'accueil</a>
    </div>
  {:else}
    <Reader {pages} chapterTitle="Chapitre" />
  {/if}
</div>

<style>
  .reader-page {
    min-height: 100vh;
    background: #050508;
    display: flex;
    flex-direction: column;
  }

  .reader-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: rgba(10,10,15,0.95);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(12px);
  }

  .back-btn {
    font-size: 14px;
    color: var(--text2);
    font-weight: 500;
    transition: color 0.2s;
    padding: 6px 0;
  }

  .back-btn:hover { color: var(--text); }

  .reader-brand {
    font-family: 'Bebas Neue', cursive;
    font-size: 16px;
    letter-spacing: 2px;
    color: var(--accent);
  }

  .page-info {
    font-size: 13px;
    color: var(--text3);
  }

  .reader-loading {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: var(--text2);
    font-size: 14px;
  }

  .reader-error {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: var(--text2);
    text-align: center;
    padding: 24px;
  }

  .back-link {
    color: var(--accent);
    font-weight: 500;
  }
</style>

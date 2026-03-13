<script>
  export let pages = [];
  export let chapterTitle = '';

  let currentPage = 0;

  function prev() { if (currentPage > 0) currentPage--; }
  function next() { if (currentPage < pages.length - 1) currentPage++; }

  function handleKey(e) {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }
</script>

<svelte:window on:keydown={handleKey} />

<div class="reader">
  <div class="reader-header">
    <span class="chapter-title">{chapterTitle}</span>
    <span class="page-count">{currentPage + 1} / {pages.length}</span>
  </div>

  {#if pages.length > 0}
    <div class="reader-main">
      <button class="nav-btn prev" on:click={prev} disabled={currentPage === 0}>‹</button>
      <div class="page-wrap">
        <img src={pages[currentPage]} alt="Page {currentPage + 1}" />
      </div>
      <button class="nav-btn next" on:click={next} disabled={currentPage === pages.length - 1}>›</button>
    </div>

    <div class="reader-footer">
      <div class="page-dots">
        {#each pages as _, i}
          <button class="dot" class:active={i === currentPage} on:click={() => currentPage = i}></button>
        {/each}
      </div>
    </div>
  {:else}
    <div class="reader-empty">
      <p>Aucune page disponible</p>
    </div>
  {/if}
</div>

<style>
  .reader {
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .reader-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    background: var(--bg2);
    border-bottom: 1px solid var(--border);
  }

  .chapter-title {
    font-weight: 600;
    font-size: 14px;
  }

  .page-count {
    color: var(--text2);
    font-size: 13px;
  }

  .reader-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 24px;
  }

  .page-wrap {
    max-width: 800px;
    width: 100%;
  }

  .page-wrap img {
    width: 100%;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .nav-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg3);
    border: 1px solid var(--border);
    color: var(--text);
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .nav-btn:hover:not(:disabled) {
    background: var(--accent);
    border-color: var(--accent);
  }

  .nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .reader-footer {
    padding: 16px;
    display: flex;
    justify-content: center;
  }

  .page-dots {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border);
    transition: all 0.2s;
  }

  .dot.active {
    background: var(--accent);
    transform: scale(1.3);
  }

  .reader-empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text2);
  }
</style>

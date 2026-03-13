<script>
  import { goto } from '$app/navigation';

  export let compact = false;
  let query = '';

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      goto(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }
</script>

<form class="search-form" class:compact on:submit={handleSearch}>
  <div class="search-wrap">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
    <input
      type="text"
      placeholder="Rechercher un manga..."
      bind:value={query}
    />
    {#if query}
      <button type="button" class="clear-btn" on:click={() => query = ''}>✕</button>
    {/if}
  </div>
</form>

<style>
  .search-form {
    width: 100%;
  }

  .search-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    color: var(--text3);
    pointer-events: none;
    flex-shrink: 0;
  }

  input {
    width: 100%;
    padding: 9px 36px 9px 38px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-size: 14px;
    transition: all 0.2s;
    outline: none;
  }

  input::placeholder {
    color: var(--text3);
  }

  input:focus {
    border-color: var(--accent);
    background: var(--surface);
    box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.12);
  }

  .clear-btn {
    position: absolute;
    right: 10px;
    color: var(--text3);
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 4px;
    transition: color 0.2s;
  }

  .clear-btn:hover {
    color: var(--text);
  }
</style>

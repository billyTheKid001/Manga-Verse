<script>
  import { page } from '$app/stores';
  import SearchBar from './SearchBar.svelte';

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<nav class="navbar">
  <div class="nav-inner">
    <a href="/" class="logo">
      <span class="logo-icon">⬡</span>
      <span class="logo-text">MANGA<span class="logo-accent">VERSE</span></span>
    </a>

    <div class="nav-search">
      <SearchBar compact={true} />
    </div>

    <div class="nav-links">
      <a href="/" class:active={$page.url.pathname === '/'}>Accueil</a>
      <a href="/search" class:active={$page.url.pathname === '/search'}>Catalogue</a>
    </div>

    <button class="hamburger" on:click={toggleMenu} aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  {#if menuOpen}
    <div class="mobile-menu">
      <a href="/" on:click={() => menuOpen = false}>Accueil</a>
      <a href="/search" on:click={() => menuOpen = false}>Catalogue</a>
      <div class="mobile-search">
        <SearchBar compact={false} />
      </div>
    </div>
  {/if}
</nav>

<style>
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 10, 15, 0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  .nav-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .logo-icon {
    font-size: 22px;
    color: var(--accent);
    line-height: 1;
  }

  .logo-text {
    font-family: 'Bebas Neue', cursive;
    font-size: 22px;
    letter-spacing: 2px;
    color: var(--text);
  }

  .logo-accent {
    color: var(--accent);
  }

  .nav-search {
    flex: 1;
    max-width: 400px;
  }

  .nav-links {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .nav-links a {
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text2);
    transition: all 0.2s;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--text);
    background: var(--bg3);
  }

  .nav-links a.active {
    color: var(--accent);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    padding: 4px;
    margin-left: auto;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: 0.2s;
  }

  .mobile-menu {
    border-top: 1px solid var(--border);
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mobile-menu a {
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 15px;
    color: var(--text2);
    transition: 0.2s;
  }

  .mobile-menu a:hover {
    background: var(--bg3);
    color: var(--text);
  }

  .mobile-search {
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    .nav-search,
    .nav-links {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }
</style>

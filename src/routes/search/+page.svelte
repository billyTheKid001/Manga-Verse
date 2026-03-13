<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Navbar from '$lib/components/Navbar.svelte';
  import MangaCard from '$lib/components/MangaCard.svelte';

  let mangas = [];
  let loading = false;
  let error = null;
  let total = 0;
  let inputValue = '';

  async function search(q) {
    loading = true;
    error = null;
    mangas = [];
    try {
      const url = q ? `/api/search?q=${encodeURIComponent(q)}` : `/api/mangaList`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      mangas = data.mangaList;
      total = data.total;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    const q = $page.url.searchParams.get('q') || '';
    inputValue = q;
    search(q);
  });

  function handleSearch(e) {
    e.preventDefault();
    const q = inputValue.trim();
    search(q);
    goto(q ? `/search?q=${encodeURIComponent(q)}` : '/search', { replaceState: true });
  }

  const popularTags = ['Action', 'Romance', 'Isekai', 'Fantasy', 'Comedy', 'Horror', 'Slice of Life', 'Adventure', 'Supernatural', 'Martial Arts'];
</script>
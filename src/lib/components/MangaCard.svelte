<script>
  export let manga;
  let imgError = false;

  function onImgError() {
    imgError = true;
  }
</script>

<a href="/manga/{manga.id}" class="manga-card">
  <div class="card-img-wrap">
    {#if imgError || !manga.image || manga.image.includes('undefined')}
      <div class="card-placeholder">
        <span>⬡</span>
        <p>{manga.title?.slice(0, 20)}</p>
      </div>
    {:else}
      <img
        src={manga.image}
        alt={manga.title}
        on:error={onImgError}
        loading="lazy"
      />
    {/if}

    <div class="card-overlay">
      <span class="card-badge">{manga.type || 'Manga'}</span>
      {#if manga.status}
        <span class="card-status" class:ongoing={manga.status === 'ongoing'} class:completed={manga.status === 'completed'}>
          {manga.status === 'ongoing' ? 'En cours' : manga.status === 'completed' ? 'Terminé' : manga.status}
        </span>
      {/if}
    </div>

    <div class="card-read-btn">Voir détails →</div>
  </div>

  <div class="card-info">
    <h3 class="card-title">{manga.title}</h3>
    {#if manga.tags && manga.tags.length > 0}
      <div class="card-tags">
        {#each manga.tags.slice(0, 2) as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}
  </div>
</a>

<style>
  .manga-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform 0.2s;
    cursor: pointer;
  }

  .manga-card:hover {
    transform: translateY(-4px);
  }

  .card-img-wrap {
    position: relative;
    aspect-ratio: 2/3;
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--bg3);
  }

  .card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .manga-card:hover .card-img-wrap img {
    transform: scale(1.06);
  }

  .card-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--bg3);
    color: var(--text3);
    padding: 16px;
    text-align: center;
  }

  .card-placeholder span {
    font-size: 36px;
    color: var(--accent);
    opacity: 0.4;
  }

  .card-placeholder p {
    font-size: 12px;
    line-height: 1.3;
  }

  .card-overlay {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .card-badge {
    background: rgba(0,0,0,0.7);
    color: var(--text2);
    font-size: 10px;
    font-weight: 600;
    padding: 3px 7px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(4px);
  }

  .card-status {
    font-size: 10px;
    font-weight: 600;
    padding: 3px 7px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .card-status.ongoing {
    background: rgba(244, 162, 97, 0.2);
    color: var(--gold);
  }

  .card-status.completed {
    background: rgba(46, 213, 115, 0.2);
    color: #2ed573;
  }

  .card-read-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 14px 12px 12px;
    background: linear-gradient(to top, rgba(230, 57, 70, 0.95), transparent);
    color: white;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    transform: translateY(100%);
    transition: transform 0.25s;
  }

  .manga-card:hover .card-read-btn {
    transform: translateY(0);
  }

  .card-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .card-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tag {
    font-size: 10px;
    padding: 2px 7px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text3);
  }
</style>

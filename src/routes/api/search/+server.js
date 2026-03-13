// @ts-nocheck
export async function GET({ url }) {
  try {
    const q = url.searchParams.get('q') || '';

    const res = await fetch(
      `https://api.mangadex.org/manga?title=${encodeURIComponent(q)}&limit=20&includes[]=cover_art&originalLanguage[]=ja&contentRating[]=safe&availableTranslatedLanguage[]=en`
    );

    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

    const data = await res.json();

    const mangaList = data.data.map(m => {
      const coverRel = m.relationships.find(r => r.type === 'cover_art');
      const fileName = coverRel?.attributes?.fileName;
      return {
        id: m.id,
        title: m.attributes.title?.en || Object.values(m.attributes.title || {})[0] || 'Titre inconnu',
        image: fileName ? `https://uploads.mangadex.org/covers/${m.id}/${fileName}.512.jpg` : null,
        type: m.attributes.publicationDemographic || 'Manga',
        status: m.attributes.status,
        year: m.attributes.year,
        tags: m.attributes.tags?.slice(0, 3).map(t => t.attributes?.name?.en).filter(Boolean) || [],
      };
    });

    return new Response(JSON.stringify({ mangaList, total: data.total }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
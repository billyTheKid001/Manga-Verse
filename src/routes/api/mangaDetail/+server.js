// @ts-nocheck
export async function GET({ url }) {
  try {
    const id = url.searchParams.get('id');
    if (!id) throw new Error('ID manquant');

    const [mangaRes, chaptersRes] = await Promise.all([
      fetch(`https://api.mangadex.org/manga/${id}?includes[]=cover_art&includes[]=author`),
      fetch(`https://api.mangadex.org/manga/${id}/feed?limit=10&translatedLanguage[]=en&order[chapter]=asc`)
    ]);

    if (!mangaRes.ok) throw new Error('Manga non trouvé');

    const mangaData = await mangaRes.json();
    const chapData = chaptersRes.ok ? await chaptersRes.json() : { data: [] };

    const m = mangaData.data;
    const coverRel = m.relationships.find(r => r.type === 'cover_art');
    const authorRel = m.relationships.find(r => r.type === 'author');
    const fileName = coverRel?.attributes?.fileName;

    const manga = {
      id: m.id,
      title: m.attributes.title?.en || Object.values(m.attributes.title || {})[0] || 'Titre inconnu',
      description: m.attributes.description?.en || m.attributes.description?.fr || 'Pas de description disponible.',
      image: fileName ? `https://uploads.mangadex.org/covers/${m.id}/${fileName}.512.jpg` : null,
      type: m.attributes.publicationDemographic || 'Manga',
      status: m.attributes.status,
      year: m.attributes.year,
      author: authorRel?.attributes?.name || 'Inconnu',
      tags: m.attributes.tags?.map(t => t.attributes?.name?.en).filter(Boolean) || [],
      chapters: chapData.data.map(c => ({
        id: c.id,
        chapter: c.attributes.chapter,
        title: c.attributes.title,
        volume: c.attributes.volume,
        pages: c.attributes.pages,
        publishAt: c.attributes.publishAt,
      })),
    };

    return new Response(JSON.stringify({ manga }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

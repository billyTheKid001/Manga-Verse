// @ts-nocheck
export async function GET({ url }) {
  try {
    const id = url.searchParams.get('id');
    if (!id) throw new Error('ID manquant');

    const res = await fetch(`https://api.mangadex.org/at-home/server/${id}`);
    if (!res.ok) throw new Error('Chapitre non trouvé');

    const data = await res.json();
    const baseUrl = data.baseUrl;
    const hash = data.chapter.hash;
    const pages = data.chapter.data.map(
      filename => `${baseUrl}/data/${hash}/${filename}`
    );

    return new Response(JSON.stringify({ pages }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

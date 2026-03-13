// @ts-nocheck
export async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get("page") || "0");
    const limit = 20;
    const offset = page * limit;

    const res = await fetch(
      `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&order[followedCount]=desc&availableTranslatedLanguage[]=en&includes[]=cover_art&originalLanguage[]=ja&contentRating[]=safe`,
    );

    if (!res.ok) throw new Error(`MangaDex API error: ${res.status}`);

    const data = await res.json();

    const mangaList = data.data.map((m) => {
      const coverRel = m.relationships.find((r) => r.type === "cover_art");
      const fileName = coverRel?.attributes?.fileName;
      const image = fileName
        ? `https://uploads.mangadex.org/covers/${m.id}/${fileName}.512.jpg`
        : null;

      const tags =
        m.attributes.tags
          ?.slice(0, 3)
          .map((t) => t.attributes?.name?.en)
          .filter(Boolean) || [];

      return {
        id: m.id,
        title:
          m.attributes.title?.en ||
          Object.values(m.attributes.title || {})[0] ||
          "Titre inconnu",
        image,
        type: m.attributes.publicationDemographic || "Manga",
        status: m.attributes.status,
        year: m.attributes.year,
        tags,
      };
    });

    return new Response(JSON.stringify({ mangaList, total: data.total }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Erreur inconnue" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

const coverPhotos = [
    "photo-1498050108023-c5249f4df085",
    "photo-1497366754035-f200968a6e72",
    "photo-1516321318423-f06f85e504b3",
    "photo-1497366216548-37526070297c",
    "photo-1517841905240-472988babdf9",
    "photo-1517248135467-4c7edcad34c4",
    "photo-1500530855697-b586d89ba3ee",
    "photo-1499750310107-5fef28a66643",
    "photo-1500534623283-312aade485b7",
    "photo-1519682337058-a94d519337bc",
];

export function getPostImage(post) {
    const photo = coverPhotos[Math.abs(Number(post.id) - 1) % coverPhotos.length];
    return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=85`;
}

export function getReadingTime(body = "") {
    const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
}

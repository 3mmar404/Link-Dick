import type { LinkMetadata } from '../types';

/**
 * Checks if the given URL is a YouTube video link.
 * @param url The URL to check.
 * @returns True if the URL is a YouTube link, false otherwise.
 */
function isYouTubeUrl(url: string): boolean {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
}

/**
 * Fetches metadata for a YouTube URL using their oEmbed API.
 * @param url The YouTube URL.
 * @returns A promise that resolves to the link metadata.
 */
async function fetchYouTubeMetadata(url: string): Promise<LinkMetadata> {
  const embedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const response = await fetch(embedUrl);
  if (!response.ok) {
    throw new Error(`YouTube API failed with status ${response.status}`);
  }
  const data = await response.json();
  return {
    title: data.title || 'YouTube Video',
    description: data.author_name || 'No description available.',
    image: data.thumbnail_url || '',
  };
}

/**
 * Fetches metadata for a generic URL using the Microlink API.
 * @param url The URL to fetch metadata for.
 * @returns A promise that resolves to the link metadata.
 */
async function fetchMicrolinkMetadata(url: string): Promise<LinkMetadata> {
  const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
  const response = await fetch(microlinkUrl);
  if (!response.ok) {
    throw new Error(`Microlink API failed with status ${response.status}`);
  }
  const data = await response.json();
  if (data.status !== 'success' || !data.data) {
    throw new Error('Microlink API did not return successful data.');
  }

  const metadata = data.data;
  return {
    title: metadata.title || 'No title found',
    description: metadata.description || 'No description available.',
    image: metadata.image?.url || metadata.logo?.url || '',
  };
}


/**
 * Fetches metadata for a given URL. It intelligently routes to the appropriate
 * service (YouTube oEmbed or Microlink) based on the URL.
 * @param url The URL to fetch metadata for.
 * @returns A promise that resolves to the link's metadata.
 */
export async function fetchLinkMetadata(url: string): Promise<LinkMetadata> {
    try {
        if (isYouTubeUrl(url)) {
            return await fetchYouTubeMetadata(url);
        } else {
            return await fetchMicrolinkMetadata(url);
        }
    } catch (error) {
        console.error(`Error fetching metadata for ${url}:`, error);
        // We throw a new error to be caught by the calling function in App.tsx
        throw new Error('Failed to fetch link metadata from the API.');
    }
}

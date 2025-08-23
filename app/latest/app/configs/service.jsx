const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search'
import axios from 'axios';

export const getVideos = async (query) => {
  try {
    // Use NEXT_PUBLIC_ prefix for client-side access
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    
    if (!apiKey) {
      console.warn('YouTube API key not found. Please set NEXT_PUBLIC_YOUTUBE_API_KEY in .env.local');
      return [];
    }

    const params = {
      part: 'snippet',
      q: query,
      maxResults: 1,
      key: apiKey
    } 
    
    const resp = await axios.get(YOUTUBE_URL, { params });
    
    if (resp.data.items && resp.data.items.length > 0) {
      return resp.data.items;
    } else {
      console.warn('No videos found for query:', query);
      return [];
    }
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    
    if (error.response) {
      const { status, data } = error.response;
      if (status === 403) {
        console.warn('YouTube API quota exceeded or access forbidden. Continuing without videos.');
      } else if (status === 400) {
        console.warn('Invalid YouTube API request. Continuing without videos.');
      } else {
        console.warn(`YouTube API error (${status}). Continuing without videos.`);
      }
    } else {
      console.warn('Network error while fetching YouTube videos. Continuing without videos.');
    }
    
    return [];
  }
};
class AudioCacheService {
    constructor() {
      this.cache = new Map();
      this.container = document.getElementById('audio-cache');
    }
    async fetchBlobUrl(key, srcUrl) {
      if (this.cache.has(key)) {
        return this.cache.get(key).url;
      }
      let resp = await fetch(srcUrl);
      if (!resp.ok) {
        throw new Error('Failed to fetch audio: ' + resp.status);
      }
      let buffer = await resp.arrayBuffer();
      let blob = new Blob([buffer], { type: resp.headers.get('Content-Type') });
      let blobUrl = URL.createObjectURL(blob);
      let audioEl = document.createElement('audio');
      audioEl.src = blobUrl;
      audioEl.preload = 'auto';
      audioEl.classList.add('hidden');
      this.container.appendChild(audioEl);
      this.cache.set(key, { url: blobUrl, audioEl });
      return blobUrl;
    }
    async play(key, srcUrl) {
      let blobUrl = await this.fetchBlobUrl(key, srcUrl);
      let audioEl = this.cache.get(key).audioEl;
      audioEl.src = blobUrl;
      audioEl.currentTime = 0;
      audioEl.play().catch(function(e) { console.error(e); });
    }
    clearCache() {
      for (let value of this.cache.values()) {
        URL.revokeObjectURL(value.url);
        if (value.audioEl.parentNode === this.container) {
          this.container.removeChild(value.audioEl);
        }
      }
      this.cache.clear();
    }
  }
  export const audioCacheService = new AudioCacheService();
  
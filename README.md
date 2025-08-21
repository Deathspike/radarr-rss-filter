# radarr-rss-filter

A lightweight proxy that filters RSS feed items using **required** and **forbidden** words, built for tools like [Radarr](https://github.com/Radarr/Radarr). Include only items that contain a required word, exclude items that contain forbidden words, or combine both to turn noisy feeds into something clean and useful, all while staying simple and lightweight.

## Installation

### Docker

```yaml
services:
  radarr.rss.filter:
    image: deathspike/radarr-rss-filter
    container_name: radarr.rss.filter
    restart: always
    ports:
      - 8283:8283
```

If you use the filter in _Radarr_, remember to add `radarr.rss.filter` to `depends_on`:

```yaml
services:
  radarr:
    depends_on:
      - radarr.rss.filter
```

### Node.js

```bash
git clone https://github.com/Deathspike/radarr-rss-filter
cd radarr-rss-filter
npm install --omit=dev
node .
```

## Configuration

To configure _radarr-rss-filter_, open the web form and enter an **RSS URL** (required), along with optional comma-separated lists of **required words** (items must include these) and **forbidden words** (items containing these will be excluded). When you click **Filter**, the feed loads with your filters applied, and you can then copy the resulting URL from the browser's address bar to use in tools like _Radarr_.

## Examples

Suppose your RSS feed contains the following items:

```
Action.Movie.2025.1080p.WEB-DL.x264
Comedy.Movie.2025.2160p.BluRay.x265
Drama.Movie.2025.720p.HDTV.x264
```

With **required words** set to `1080p`, the filtered feed becomes:

```
Action.Movie.2025.1080p.WEB-DL.x264
```

With **forbidden words** set to `x264`, the filtered feed becomes:

```
Comedy.Movie.2025.2160p.BluRay.x265
```

You can combine required and forbidden words in any way to fine-tune the feed.

## Contributions

Pull requests are welcome! Please open an issue first to discuss major changes.

# radarr-rss-filter

A lightweight proxy that filters RSS feed items using **required** and **forbidden** words, built for tools like [Radarr](https://github.com/Radarr/Radarr). RSS feeds can get noisy, mixing in plenty of items you don't want. With this tool, you simply open the web form, enter an RSS URL, and add comma-separated required and forbidden words. The feed is then filtered so only the items you care about remain. You can then copy the clean URL from your browser's address bar to use directly in Radarr or any other tool that supports RSS.

## Quick Start

Run with **docker**:

```bash
docker run -p 8283:8283 deathspike/radarr-rss-filter
```

Or run with **npm (using npx)**:

```bash
npx radarr-rss-filter
```

## Installation

The _Quick Start_ commands are for one-off runs to quickly try the tool, while the options below are intended for regular use. You can set up a persistent environment with **Docker Compose**, install the CLI globally with **npm**, or clone from source if you want full control or plan to contribute.

### Docker Compose

```yaml
services:
  radarr.rss.filter:
    image: deathspike/radarr-rss-filter
    container_name: radarr.rss.filter
    restart: always
    ports:
      - 8283:8283
```

Remember to add `radarr.rss.filter` to `depends_on` for the dependent service, like Radarr:

```yaml
services:
  radarr:
    depends_on:
      - radarr.rss.filter
```

### npm

Install globally with **npm**:

```bash
npm install -g radarr-rss-filter
```

Then run:

```bash
radarr-rss-filter
```

### From Source

Install from source with **git** and **npm**:

```bash
git clone https://github.com/Deathspike/radarr-rss-filter
cd radarr-rss-filter
npm install
```

Then run with **node**:

```bash
node bin/cli.js
```

## Configuration

You can configure this tool either with CLI options or with environment variables. CLI options are typically used when running from the command line, while environment variables are more convenient in Docker. If you provide both, CLI options take precedence. If neither is set, the tool falls back to the default values shown in the table below.

| CLI          | ENV        | Default | Description                                                                                                                        |
| ------------ | ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`--port`** | **`PORT`** | `8283`  | The port the **embedded HTTP server** listens on. Change this if the default port is already in use or you prefer a different one. |

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

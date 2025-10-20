# Servers JSON format

Add a JSON file per server in this folder. Any `*.json` here will be auto-loaded.

Fields:
- id: string (unique)
- name: string
- description: string
- pfp_url: string (image URL or base64)
- banner_url: string (image URL or base64)
- invite_url: string (Discord invite)
- created_at: ISO string
- featured?: boolean
- custom_tag?: string
- widget_embed?: string (optional iframe HTML)

Example: see `khxzi.json`.

Quick steps
1) Duplicate `khxzi.json` and rename it, e.g. `myserver.json`.
2) Replace the values. Keep the same keys. You can leave out optional ones.
3) Save. The app will reload and your server will appear immediately.

Template (JSON5 for readability; in your file use plain JSON without comments):

{
	// Required
	"id": "1418226394495713426", // unique string
	"name": "My Cool Server",
	"description": "Short summary with emojis 😊",
	"pfp_url": "https://cdn.discordapp.com/icons/<serverId>/<iconHash>.png",
	"banner_url": "https://cdn.discordapp.com/banners/<serverId>/<bannerHash>.png",
	"invite_url": "https://discord.gg/yourInvite",
	"created_at": "2025-01-01T00:00:00.000Z",

	// Optional
	"featured": false,           // put first in the list if true
	"custom_tag": "Official",   // short label
	"widget_embed": "<iframe src=\"https://discord.com/widget?id=<serverId>&theme=dark\" width=\"350\" height=\"400\" allowtransparency=\"true\" frameborder=\"0\" sandbox=\"allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts\"></iframe>"
}

Multiple servers per file
- Option A: file is an array of server objects
	[
		{ "id": "1", "name": "A", ... },
		{ "id": "2", "name": "B", ... }
	]
- Option B: file is an object with a `servers` array
	{
		"servers": [
			{ "id": "1", "name": "A", ... },
			{ "id": "2", "name": "B", ... }
		]
	}

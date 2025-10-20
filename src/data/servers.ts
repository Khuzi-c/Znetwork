import { Server } from '../lib/supabase';

export type HardcodedServer = Server & {
  featured?: boolean;
  custom_tag?: string;
  widget_embed?: string;
};

// Auto-load all JSON files in ./servers using Vite import-glob
const modules = import.meta.glob('./servers/*.json', { eager: true, import: 'default' }) as Record<string, any>;

const loaded: HardcodedServer[] = [];

for (const rawValue of Object.values(modules)) {
  // Accept either:
  // - a single object
  // - an array of objects
  // - an object with a `servers` array containing objects
  const baseArray = Array.isArray(rawValue) ? rawValue : [rawValue];
  const records = baseArray.flatMap((item) => {
    if (item && typeof item === 'object' && Array.isArray((item as any).servers)) {
      return (item as any).servers;
    }
    return [item];
  });
  for (const raw of records) {
    // Remove helper/comment-like keys beginning with __
    const data = Object.fromEntries(
      Object.entries(raw || {}).filter(([k]) => !k.startsWith('__'))
    ) as Record<string, unknown>;

    if (!data || typeof data !== 'object' || !('id' in data) || !('name' in data)) {
      continue; // skip invalid blocks
    }

    loaded.push({
      id: String((data as any).id),
      name: String((data as any).name),
      description: String((data as any).description || ''),
      pfp_url: String((data as any).pfp_url || ''),
      banner_url: String((data as any).banner_url || ''),
      invite_url: String((data as any).invite_url || ''),
      created_at: String((data as any).created_at || new Date().toISOString()),
      featured: Boolean((data as any).featured),
      custom_tag: (data as any).custom_tag ? String((data as any).custom_tag) : undefined,
      widget_embed: (data as any).widget_embed ? String((data as any).widget_embed) : undefined,
    });
  }
}

export const servers: HardcodedServer[] = loaded;

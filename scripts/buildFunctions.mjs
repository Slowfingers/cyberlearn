import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { writeFile, unlink } from 'node:fs/promises';
const out = new URL('../functions/.catalog.mjs', import.meta.url);
await build({ entryPoints: ['constants.ts'], bundle: true, platform: 'node', format: 'esm', outfile: out.pathname });
try {
  const { MOCK_TASKS, COSMETICS, LEVEL_THRESHOLDS, ACHIEVEMENTS } = await import(pathToFileURL(out.pathname));
  await writeFile(new URL('../functions/catalog.json', import.meta.url), JSON.stringify({ tasks: MOCK_TASKS, cosmetics: COSMETICS, levels: LEVEL_THRESHOLDS, achievements: ACHIEVEMENTS }));
} finally { await unlink(out); }

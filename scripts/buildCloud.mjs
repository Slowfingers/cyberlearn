import {build} from 'esbuild';

// A self-contained ESM function avoids extensionless TypeScript imports at
// runtime. Keep the generated entry in Git so Vercel discovers it before build.
await build({
  entryPoints: ['server/vercelEntry.ts'],
  outfile: 'api/local.mjs',
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  minify: true,
  legalComments: 'none',
});

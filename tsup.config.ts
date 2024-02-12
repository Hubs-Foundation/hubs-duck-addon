export default {
    entryPoints: ['./src/index.ts'],
    format: ['cjs', 'esm'],
    target: ["chrome100", "safari15", "firefox91"],
    sourcemap: true,
    splitting: true,
    clean: true,
    external: [
      "hubs", 
      "three", 
      "bitecs"
    ],
    loader: {
      '.mp3': 'copy',
      '.glb': 'copy'
    },
  };
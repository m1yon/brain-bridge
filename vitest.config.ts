import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globalSetup: ['./src/lib/tests/setup/global-setup.ts'],
	},
})

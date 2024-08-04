import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'ForwardSlots',
			formats: ['es', 'cjs'],
		},
        commonjsOptions: {
            include: [/node_modules/],
            extensions: ['.js', '.cjs'],
        },
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue'
				}
			},
			plugins: [nodeResolve(), commonjs()]
		}
	}
})

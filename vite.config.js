import vue from '@vitejs/plugin-vue'

export default {
	plugins: [vue()],
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'VueForwardSlots',
			formats: ['es']
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue'
				}
			}
		}
	}
}

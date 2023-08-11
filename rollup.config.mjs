const typescript = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve');


export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.esm.js',
			format: 'es'
		},
		{
			file: 'dist/index.cjs.js',
			format: 'cjs'
		}
	],
	plugins: [
		typescript({
			tsconfigOverride: {
				compilerOptions: {
					declaration: true,
					// other overrides if needed
				}
			}
		}),
		resolve()
	]
}

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@conarti/feature-sliced/recommended"
	],
	ignorePatterns: ["dist", ".eslintrc.cjs", "convex/*"],
	parser: "@typescript-eslint/parser",
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
	},
}

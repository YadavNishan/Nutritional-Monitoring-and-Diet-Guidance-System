module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'prettier',
		'plugin:@typescript-eslint/recommended',
		// "plugin:prettier/recommended"
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/explicit-member-accessibility': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-parameter-properties': 0,
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'linebreak-style': 'off', // Original setting for LF
		// "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
		// "jsx-quotes": ["error", "prefer-single"]
	},
};

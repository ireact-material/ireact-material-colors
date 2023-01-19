module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		jasmine: true,
		jest: true,
		es6: true,
	},
	extends: [
		"prettier",
		"plugin:compat/recommended",
		"plugin:jest/recommended",
		"plugin:import/typescript",
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@babel",
		"jest",
		"@typescript-eslint",
		"unicorn",
	],
	// https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				"@typescript-eslint/no-unused-vars": [
					2,
					{
						args: "none",
					},
				],
				"no-unused-expressions": "off",
				"@typescript-eslint/no-unused-expressions": 2,
				"@typescript-eslint/consistent-type-imports": [
					2,
					{
						disallowTypeAnnotations: false,
					},
				],
			},
		},
	],
	rules: {
		"import/extensions": 0,
		"import/no-cycle": 0,
		"jsx-a11y/no-static-element-interactions": 0,
		"jsx-a11y/anchor-has-content": 0,
		"jsx-a11y/click-events-have-key-events": 0,
		"jsx-a11y/anchor-is-valid": 0,
		"jsx-a11y/no-noninteractive-element-interactions": 0,
		// label-has-for has been deprecated
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
		"jsx-a11y/label-has-for": 0,

		"comma-dangle": ["error", "always-multiline"],
		"consistent-return": 0, // TODO: remove later
		"no-param-reassign": 0, // TODO: remove later
		"no-underscore-dangle": 0,
		// for (let i = 0; i < len; i++)
		"no-plusplus": 0,
		// https://eslint.org/docs/rules/no-continue
		// labeledLoop is conflicted with `eslint . --fix`
		"no-continue": 0,
		// ban this for Number.isNaN needs polyfill
		"no-restricted-globals": 0,
		"max-classes-per-file": 0,

		"jest/no-test-callback": 0,
		"jest/expect-expect": 0,
		"jest/no-done-callback": 0,
		"jest/valid-title": 0,
		"jest/no-conditional-expect": 0,
		"jest/no-standalone-expect": 0,

		"unicorn/better-regex": 2,
		"unicorn/prefer-string-trim-start-end": 2,
		"unicorn/expiring-todo-comments": 2,
		"unicorn/no-abusive-eslint-disable": 2,

		// https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
		"no-use-before-define": 0,
		"@typescript-eslint/no-use-before-define": 2,
		"no-shadow": 0,
		"@typescript-eslint/no-shadow": [
			2,
			{
				ignoreTypeValueShadow: true,
			},
		],
		// https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
		"no-undef": 0,
		// 判读分号
		semi: ["error", "always"],
	},
	// globals: {
	// 	gtag: true,
	// },
};

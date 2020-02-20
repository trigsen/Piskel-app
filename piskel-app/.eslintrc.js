module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-empty": ["error", { "allowEmptyCatch": true }],
        "class-methods-use-this": ["error", { "exceptMethods": ["initialization"] }],
        "no-undef": 0,
        "import/prefer-default-export": "off",
        "no-param-reassign": [2, { "props": false }],
        "no-restricted-syntax": ["error", "BinaryExpression[operator='in']"],
        "no-plusplus": "off"
    },
	"parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
		}
	}
};
module.exports = {
    "env": {
        "es6": true,
        "browser": true,
        "es2021": true
    },
    "extends": ['airbnb-base', "eslint:recommended", 'prettier'],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    plugins: ['prettier'],
    "rules": {
        "prettier/prettier": "error"
    }
};

import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "no-console": "off"
        },
        languageOptions: {
            globals: {
                process: "readonly",
                __dirname: "readonly",
                module: "readonly",
                require: "readonly",
                console: "readonly"
            }
        }
    }
];
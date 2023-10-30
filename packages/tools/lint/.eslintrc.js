const allowedNameKeyword = ["SP", "ID", "API"];

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:web/all",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:promise/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:perfectionist/recommended-natural",
    "plugin:sonarjs/recommended",
  ],
  overrides: [
    {
      extends: [
        "@rushstack/eslint-config/profile/web-app",
        "@rushstack/eslint-config/mixins/react",
        "plugin:import/typescript",
        "plugin:jsdoc/recommended-typescript",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "@rushstack/no-new-null": "off",
        "@rushstack/typedef-var": "off",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/ban-tslint-comment": "warn",
        "@typescript-eslint/consistent-indexed-object-style": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/naming-convention": [
          "warn",
          {
            format: ["StrictPascalCase"],
            prefix: ["T"],
            selector: "typeParameter",
          },
          {
            // score: 4001
            custom: {
              match: true,
              regex: `^(${allowedNameKeyword.join("|")})*([A-Z][a-z0-9]+)+`,
            },
            format: ["PascalCase"],
            selector: ["class", "enum"],
          },
          {
            // score: 4001
            custom: {
              match: true,
              regex: `^I?(${allowedNameKeyword.join("|")})*([A-Z][a-z0-9]+)+`,
            },
            format: ["PascalCase"],
            selector: "typeAlias",
          },
          {
            // score: 2006
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "allow",
            selector: ["variable", "function"],
            types: ["function"],
          },
          /* {
            // score: 2004
            format: ['StrictPascalCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'it', 'with'],
            selector: ['parameter', 'property'],
            types: ['boolean']
          }, */
          {
            // score: 1008
            format: ["PascalCase"],
            prefix: ["I"],
            selector: "interface",
          },
          {
            // score: 1002
            format: ["camelCase", "PascalCase", "UPPER_CASE"],
            modifiers: ["destructured"],
            selector: "variable",
          },
          {
            // score: 1002
            filter: {
              match: true,
              regex: "Promise$",
            },
            format: ["camelCase"],
            modifiers: ["global"],
            selector: "variable",
          },
          {
            // score: 1002
            format: ["camelCase"],
            modifiers: ["const"],
            selector: "variable",
          },
          {
            // score: 1002
            format: ["UPPER_CASE", "camelCase"],
            modifiers: ["global"],
            selector: "variable",
          },
          {
            // score: 1002
            format: ["UPPER_CASE", "camelCase", "StrictPascalCase"],
            modifiers: ["exported", "global"],
            selector: "variable",
          },
          {
            // score: 1002
            format: ["UPPER_CASE", "camelCase"],
            leadingUnderscore: "require",
            modifiers: ["unused"],
            selector: "variable",
          },
          {
            // score: 1001
            format: ["UPPER_CASE"],
            selector: "enumMember",
          },
          {
            // score: 1001
            format: ["camelCase"],
            leadingUnderscore: "allow",
            selector: "parameter",
          },
          {
            // score: 104
            format: ["camelCase"],
            leadingUnderscore: "require",
            modifiers: ["private"],
            selector: "memberLike",
          },
          /*           {
            // score: 2006
            format: ['camelCase', 'StrictPascalCase'],
            selector: ['variable', 'function'],
            modifiers: ['global'],
            types: ['function']
          }, */
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-shadow": "warn",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            ignoreRestSiblings: true,
          },
        ],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-enum-initializers": "warn",
        "@typescript-eslint/prefer-readonly": "warn",
        "@typescript-eslint/typedef": "off",
        /* 'functional/prefer-immutable-types': [
          'warn',
          {
            enforcement: 'None',
            ignoreInferredTypes: true,
            parameters: {
              enforcement: 'ReadonlyShallow'
            }
          }
        ] */

        "jsdoc/check-tag-names": [
          "warn",
          { definedTags: ["override", "packageDocumentation", "preferred"] },
        ],
        "jsdoc/require-param-description": "off",
        "jsdoc/require-returns": "off",
        "jsdoc/require-returns-description": "off",
        "no-void": "off",
        "react-hooks/exhaustive-deps": [
          "warn",
          {
            additionalHooks: "(useEffectStringified)",
          },
        ],
        "react/no-multi-comp": "warn",

        "@typescript-eslint/prefer-enum-initializers": "error",
        "jsdoc/informative-docs": "warn",
        "jsdoc/require-file-overview": [
          "warn",
          {
            tags: {
              author: {
                initialCommentsOnly: true,
                mustExist: true,
                preventDuplicates: true,
              },
              file: {
                initialCommentsOnly: true,
                mustExist: true,
                preventDuplicates: true,
              },
            },
          },
        ],
        "jsdoc/require-jsdoc": [
          "warn",
          {
            checkConstructors: true,
            enableFixer: false,
            exemptEmptyFunctions: false,
            require: {
              ArrowFunctionExpression: true,
              ClassDeclaration: true,
              ClassExpression: true,
              FunctionDeclaration: true,
              FunctionExpression: true,
              MethodDefinition: true,
            },
          },
        ],
        "jsdoc/require-param-description": "warn",
        "jsdoc/require-returns": "warn",
        "jsdoc/require-returns-description": "warn",
        "perfectionist/sort-array-includes": ["warn", { "spread-last": true }],
        "perfectionist/sort-classes": [
          "warn",
          {
            groups: [
              "property",
              "static-property",
              "private-property",
              "constructor",
              "static-method",
              "method",
              "private-method",
            ],
          },
        ],
        "perfectionist/sort-enums": "warn",
        "perfectionist/sort-imports": [
          "warn",
          {
            groups: [
              ["builtin", "external"],
              "internal",
              "parent",
              ["sibling", "index"],
              "style",
              "object",
              "side-effect",
            ],
            "newlines-between": "always",
            "read-tsconfig": true,
          },
        ],
        "perfectionist/sort-interfaces": "warn",
        "perfectionist/sort-jsx-props": [
          "warn",
          {
            "always-on-top": ["id", "name", "control"],
            callback: "ignore",
            multiline: "first",
            shorthand: "last",
          },
        ],
        "perfectionist/sort-map-elements": "off",
        "perfectionist/sort-named-exports": "warn",
        "perfectionist/sort-named-imports": "warn",
        "perfectionist/sort-object-types": "warn",
        "perfectionist/sort-objects": "warn",
        "perfectionist/sort-union-types": "warn",
        // 'rulesdir/comment-density': ['warn', 0.2, ['index.ts', '.eslintrc.js']],
        "sonarjs/cognitive-complexity": "warn",
        "sonarjs/max-switch-cases": "warn",
        "sonarjs/no-all-duplicated-branches": "warn",
        "sonarjs/no-collapsible-if": "warn",
        "sonarjs/no-collection-size-mischeck": "warn",
        "sonarjs/no-duplicate-string": "warn",
        "sonarjs/no-duplicated-branches": "warn",
        "sonarjs/no-element-overwrite": "warn",
        "sonarjs/no-empty-collection": "warn",
        "sonarjs/no-extra-arguments": "warn",
        "sonarjs/no-gratuitous-expressions": "warn",
        "sonarjs/no-identical-conditions": "warn",
        "sonarjs/no-identical-expressions": "warn",
        "sonarjs/no-identical-functions": "warn",
        "sonarjs/no-ignored-return": "warn",
        "sonarjs/no-inverted-boolean-check": "warn",
        "sonarjs/no-nested-switch": "warn",
        "sonarjs/no-nested-template-literals": "warn",
        "sonarjs/no-one-iteration-loop": "warn",
        "sonarjs/no-redundant-boolean": "warn",
        "sonarjs/no-redundant-jump": "warn",
        "sonarjs/no-same-line-conditional": "warn",
        "sonarjs/no-small-switch": "warn",
        "sonarjs/no-unused-collection": "warn",
        "sonarjs/no-use-of-empty-return-value": "warn",
        "sonarjs/no-useless-catch": "warn",
        "sonarjs/non-existent-operator": "warn",
        "sonarjs/prefer-immediate-return": "warn",
        "sonarjs/prefer-object-literal": "warn",
        "sonarjs/prefer-single-boolean-return": "warn",
        "sonarjs/prefer-while": "warn",
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "import/unambiguous": "off",
      },
    },
    {
      env: {
        commonjs: true,
        node: true,
      },
      files: ["*.js", "*.json"],
      rules: {
        "import/no-commonjs": "off",
        "import/no-unassigned-import": "off",
        "import/unambiguous": "off",
      },
    },
    {
      files: [".eslintrc.js", "strict.js"],
      rules: {
        "perfectionist/sort-array-includes": ["warn", { "spread-last": true }],
        "perfectionist/sort-classes": [
          "warn",
          {
            groups: [
              "property",
              "static-property",
              "private-property",
              "constructor",
              "static-method",
              "method",
              "private-method",
            ],
          },
        ],
        "perfectionist/sort-enums": "warn",
        "perfectionist/sort-imports": [
          "warn",
          {
            groups: [
              ["builtin", "external"],
              "internal",
              "parent",
              ["sibling", "index"],
              "style",
              "object",
              "side-effect",
            ],
            "newlines-between": "always",
            "read-tsconfig": true,
          },
        ],
        "perfectionist/sort-interfaces": "warn",
        "perfectionist/sort-jsx-props": [
          "warn",
          {
            "always-on-top": ["id", "name", "control"],
            callback: "ignore",
            multiline: "first",
            shorthand: "last",
          },
        ],
        "perfectionist/sort-map-elements": "off",
        "perfectionist/sort-named-exports": "warn",
        "perfectionist/sort-named-imports": "warn",
        "perfectionist/sort-object-types": "warn",
        "perfectionist/sort-objects": "warn",
        "perfectionist/sort-union-types": "warn",
      },
    },
    {
      env: {
        node: true,
      },
      files: ["**/scripts/*.ts", "**/esrules/*.ts"],
      rules: {
        "import/no-dynamic-require": "off",
        "import/no-nodejs-modules": "off",
        "jsdoc/require-jsdoc": "off",
        "no-console": "off",
      },
    },
    {
      env: {
        node: true,
      },
      files: ["**/bpaSettings/**"],
      rules: {
        "react/jsx-no-literals": "off",
      },
    },
    {
      files: ["*WebPart.ts"],
      rules: {
        "jsdoc/require-jsdoc": "off",
      },
    },
    {
      env: {
        jest: true,
      },
      extends: ["plugin:jest/all"],
      files: ["*.test.ts", "*.test.tsx"],
      plugins: ["jest"],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "import/first": "off",
        "import/no-unassigned-import": "off",
        "jest/max-expects": "off",
        "jest/no-hooks": "off",
        "jest/require-hook": "off",
        "jsdoc/require-jsdoc": "off",
        "jsx-a11y/anchor-has-content": "off",
        "jsx-a11y/anchor-is-valid": "off",
        // '@typescript-eslint/no-unused-vars': ['warn', { args: 'all', caughtErrors: 'all' }],
        "max-lines": "off",
        "max-lines-per-function": "off",
        "react/jsx-no-bind": "off",
        "react/jsx-no-literals": "off",
      },
    },
    {
      files: ["*.stories.ts", "*.stories.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/naming-convention": "off",
        "import/no-anonymous-default-export": "off",
        "import/no-default-export": "off",
        "import/no-unassigned-import": "off",
        "jsdoc/require-jsdoc": "off",
        "jsx-a11y/anchor-has-content": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "react/jsx-no-bind": "off",
        "react/jsx-no-literals": "off",
        "react/no-multi-comp": "off",
      },
    },
  ],
  plugins: ["jsdoc", "eslint-comments", "perfectionist"],
  reportUnusedDisableDirectives: true,
  root: true,
  rules: {
    complexity: "warn",
    curly: "warn",
    "default-case": "warn",
    "eslint-comments/disable-enable-pair": ["warn", { allowWholeFile: true }],
    "eslint-comments/no-restricted-disable": [
      "warn",
      "no-alert",
      "no-debugger",
      "no-eval",
      "import/order",
    ],
    "eslint-comments/require-description": [
      "warn",
      { ignore: ["eslint-enable"] },
    ],
    "func-style": ["warn", "expression"],
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-absolute-path": "warn",
    "import/no-amd": "warn",
    "import/no-anonymous-default-export": "warn",
    "import/no-commonjs": "warn",
    "import/no-deprecated": "warn",
    "import/no-dynamic-require": "warn",
    "import/no-mutable-exports": "warn",
    "import/no-nodejs-modules": "warn",
    "import/no-self-import": "warn",
    "import/no-unassigned-import": "warn",
    "import/no-unresolved": "warn",
    "import/no-useless-path-segments": "warn",
    "import/unambiguous": "warn",
    "jsdoc/check-tag-names": [
      "warn",
      {
        definedTags: [
          "packageDocumentation",
          "preferred",
          "FIXME",
          "TODO",
          "LANG",
        ],
      },
    ],
    "jsdoc/newline-after-description": "off",
    "jsdoc/no-bad-blocks": "warn",
    "jsdoc/no-types": "warn",
    "jsdoc/require-description": "warn",

    "jsdoc/require-jsdoc": [
      "warn",
      {
        checkConstructors: false,
        enableFixer: false,
        exemptEmptyFunctions: true,
        minLineCount: 10,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      },
    ],
    "jsdoc/require-returns": "off",
    "jsdoc/require-returns-type": "off",
    "max-params": ["warn", 4],
    "new-parens": "warn",
    "no-alert": "warn",
    "no-bitwise": "warn",
    "no-console": "warn",
    "no-param-reassign": [
      "warn",
      { ignorePropertyModificationsForRegex: ["^(draft|immer)"], props: true },
    ],
    // 'no-magic-numbers': ['warn', { detectObjects: true, ignore: [-1, 0, 1], ignoreArrayIndexes: true, ignoreDefaultValues: true }],
    "no-redeclare": "warn",
    "no-restricted-syntax": [
      "warn",
      {
        message: "Do not use `localStorage` but BPA Cache instead",
        selector: "CallExpression[callee.object.name='localStorage']",
      },
      {
        message: "Do not use `sessionStorage` but BPA Cache instead",
        selector: "CallExpression[callee.object.name='sessionStorage']",
      },
      {
        message: "Remove this hook after usage",
        selector: "CallExpression[callee.name='useTraceUpdate']",
      },
      {
        message: "Remove this hook after usage",
        selector: "CallExpression[callee.name='useStopOnInfiniteLoop']",
      },
    ],
    "no-shadow": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "object-shorthand": "warn",
    "one-var": ["warn", "never"],
    /* 'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', 'parent', ['sibling', 'index'], 'object'],
        'newlines-between': 'always',
        pathGroups: [{ group: 'internal', pattern: '@bpa*' }]
      }
    ],*/
    "prefer-template": "warn",
    "prettier/prettier": "warn",
    "promise/always-return": ["warn", { ignoreLastCallback: true }],
    "promise/catch-or-return": "warn",
    "promise/no-new-statics": "warn",
    "promise/no-return-wrap": "warn",
    "promise/param-names": "warn",
    radix: "warn",
    "react/jsx-no-bind": "error",
    "react/jsx-no-literals": [
      "warn",
      { allowedStrings: ["(", ")", "/", ":"], ignoreProps: false },
    ],
    "react/no-access-state-in-setstate": "warn",
    "react/no-arrow-function-lifecycle": "warn",
    "react/no-did-mount-set-state": "warn",
    "react/no-did-update-set-state": "warn",
    "react/no-redundant-should-component-update": "warn",
    "react/no-unstable-nested-components": "warn",
    "react/prefer-read-only-props": "warn",
    "react/require-optimization": "warn",
    "react/require-render-return": "warn",
    "react/state-in-constructor": "warn",
    "spaced-comment": ["warn", "always", { markers: ["/"] }],
  },
  settings: {
    react: {
      version: "17.0",
    },
  },
};

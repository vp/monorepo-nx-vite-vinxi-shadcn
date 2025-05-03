import eslint from '@workspace/eslint-config';

export default [
    ...eslint.configs.base,
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      // Override or add rules here
      rules: {
        "@nx/enforce-module-boundaries": ["off"]
      },
    },
  ];
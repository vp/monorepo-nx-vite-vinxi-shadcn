import eslint from '@workspace/eslint-config';

export default [
  ...eslint.configs.base,
  ...eslint.configs.lib,
  {
    rules: {
      '@nx/dependency-checks': 'off',
    },
  },
];

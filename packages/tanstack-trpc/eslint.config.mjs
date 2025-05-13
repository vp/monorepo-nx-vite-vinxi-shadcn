import eslint from '@workspace/eslint-config';

export default [...eslint.configs.base, ...eslint.configs.lib, ...eslint.configs.react];

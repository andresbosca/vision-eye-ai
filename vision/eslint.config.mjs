import js from '@eslint/js';
import react from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  {
    ...react.configs.flat.recommended,
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  tseslint.configs.recommended,
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-unused-vars': 'off', // Desativa regra de variáveis não usadas
      'no-undef': 'off', // Desativa regra de variáveis não definidas
      '@typescript-eslint/no-unused-vars': 'off', // Ativa regra de variáveis não usadas do TypeScript
    },
  },
  {
    ignores: ['node_modules', 'build', 'dist'],
  },
);

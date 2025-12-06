# Next.js 16 Upgrade Notes

## Overview

Successfully upgraded the project from Next.js 13.4.2 to Next.js 16.0.7 on December 6, 2024.

## Major Changes Made

### Dependencies Updated

- **Next.js**: 13.4.2 → 16.0.7
- **React**: 18.2.0 → 19.2.1
- **React DOM**: 18.2.0 → 19.2.1
- **TypeScript**: 5.0.4 → 5.7.2
- **tRPC**: 10.x → 11.x
- **TanStack Query**: 4.x → 5.x
- **FontAwesome**: 6.4.0 → 7.1.0
- **ESLint**: 8.x → 9.x

### Configuration Changes

- Updated tRPC configuration for v11 compatibility
- Moved transformer from top-level to httpBatchLink
- Added defensive programming for router.asPath during SSR
- Fixed React 19 compatibility issues with theme toggle component

### Issues Resolved

- Fixed FontAwesome React 19 compatibility by updating to v7.1.0
- Resolved tRPC v11 breaking changes in configuration
- Fixed TypeScript errors with React 19 type definitions
- Handled SSR issues with router.asPath

### Features Enabled

- **Turbopack**: Now default bundler (no configuration needed)
- **React 19**: Latest React features and improvements
- **Enhanced Performance**: Faster builds and development server

## Node.js Compatibility

- Requires Node.js 20.9+ (currently using v24.4.1 ✅)

## Testing

- ✅ Development server runs successfully
- ✅ Production build completes without errors
- ✅ All pages render correctly
- ✅ Static generation works properly

## ESLint Migration

- Migrated from `.eslintrc.cjs` to `eslint.config.js` (ESLint v9 flat config)
- Updated configuration to work with ESLint 9 and TypeScript
- Fixed pre-commit hook compatibility

## Next Steps

Consider upgrading remaining dependencies with peer dependency warnings:

- `@testing-library/react` (needs React 19 support)
- `next-auth` (needs Next.js 16 support)
- `@theme-toggles/react` (needs React 19 support)

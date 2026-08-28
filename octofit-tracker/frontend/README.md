# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Codespaces / Vite environment variable

This frontend expects a `VITE_CODESPACE_NAME` environment variable when running in GitHub Codespaces so that API calls can target the backend preview hostname:

Create a `.env.local` in the `frontend` folder with this content (example):

VITE_CODESPACE_NAME=your-codespace-name

Components will build API URLs as `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[resource]/`.
If `VITE_CODESPACE_NAME` is not defined the frontend falls back to the current origin (`window.location.origin`) to avoid constructing `https://undefined-8000...` URLs.

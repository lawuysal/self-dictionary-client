interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_SERVER_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_GOOGLE_RECAPTCHA_SITE_KEY: string;
}

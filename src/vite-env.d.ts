/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAME_NAME?: string
  readonly VITE_GAME_DESCRIPTION?: string
  readonly VITE_LOCALE_STRING?: string
  readonly VITE_GOOGLE_MEASUREMENT_ID?: string
  readonly VITE_PLAUSIBLE_DOMAIN?: string
  // Legacy support for React App environment variables
  readonly REACT_APP_GAME_NAME?: string
  readonly REACT_APP_GAME_DESCRIPTION?: string
  readonly REACT_APP_LOCALE_STRING?: string
  readonly REACT_APP_GOOGLE_MEASUREMENT_ID?: string
  readonly REACT_APP_PLAUSIBLE_DOMAIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_URL_IMAGE: string;
  // thêm các biến khác nếu có, ví dụ:
  // readonly VITE_APP_NAME: string;

  // Thêm các biến Pusher
  readonly VITE_PUSHER_APP_KEY: string;
  readonly VITE_PUSHER_APP_CLUSTER: string;
  readonly VITE_PUSHER_HOST: string;
  readonly VITE_PUSHER_PORT: string;
  readonly VITE_PUSHER_SCHEME: string;
  readonly VITE_PUSHER_FORCE_TLS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

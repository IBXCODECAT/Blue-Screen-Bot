// declare global env variable to define types
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DISCORD_TOKEN: string;
        DISCORD_CLIENT_ID: string;
        BSS_GUILD: string;
        BSS_LOG: string;
        COOKIE_SECRET: string;
      }
    }
  }
  
  export { };
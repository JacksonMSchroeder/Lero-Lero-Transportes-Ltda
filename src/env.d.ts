//para o env funfa no Vite, precisamos declarar os tipos das variáveis de ambiente que vamos usar.


interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


//Arquivos terminados em .d.ts (Definition Files) são a forma oficial do TypeScript documentar tipos globais.
//  O nome env.d.ts ou vite-env.d.ts é o que o próprio Vite gera automaticamente quando você inicia um projeto TypeScript do zero.
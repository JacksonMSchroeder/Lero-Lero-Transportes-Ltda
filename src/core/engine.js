import { tela } from './components/dom.js';
import { getConfigs } from './database/supabase.js';
import { calcularResultadoViagem } from './utils/app.js';

// Importante: O caminho do import deve ser relativo à localização do arquivo atual (engine.js).
    // ./ : "Tô aqui" (mesma pasta).
    // ../ : "Subi um degrau" (sai da pasta atual).
    // ../../ : "Subi dois degraus" e assim por diante.

    // Se tivesse a pasta src/core/modulo/engine.js:
    // import { ... } from '../../database/supabase.js';

tela.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const [dados, conf] = await Promise.all([
            tela.pegarDados(),
            getConfigs()
        ]);
        
        const resultado = calcularResultadoViagem(dados, conf);
        tela.mostrar(resultado);
        
    } catch (err) {
        console.error("Falha no processamento:", err);
        alert("Erro ao calcular. Verifique a rede.");
    }
});
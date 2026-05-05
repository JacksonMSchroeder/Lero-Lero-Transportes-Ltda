import { getViagens, getConfigs, calcularResultadoViagem } from '../database/supabase.js';

// Importante: O caminho do import deve ser relativo à localização do arquivo atual (engine.js).
    // ./ : "Tô aqui" (mesma pasta).
    // ../ : "Subi um degrau" (sai da pasta atual).
    // ../../ : "Subi dois degraus" e assim por diante.

    // Se tivesse a pasta src/core/modulo/engine.js:
    // import { ... } from '../../database/supabase.js';

async function iniciarSprint2() {
    try {
        const viagensRaw = await getViagens(true);
        const config = await getConfigs(true);

        const resultadosFinais = viagensRaw.map(viagem => 
            calcularResultadoViagem(viagem, config)
        );

        console.log("--- RELATÓRIO LERO-LERO TRANSPORTES ---");
        console.table(resultadosFinais.map(r => ({
            ID: r.viagem_id,
            ...r.financeiro,
            Lucro: r.indicadores.percentual_lucro
        })));

    } catch (error) {
        console.error("Erro na execução da Sprint 2:", error);
    }
}

iniciarSprint2();

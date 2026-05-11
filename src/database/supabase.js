import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Mocking para desenvolvimento local sem depender do Supabase real.
/*
const MOCKING = {
    viagens: [
        { id: "viagem_001", km_total: 130, valor_bruto: 2500.00, valor_mercadoria: 60000.00, tipo_terreno: "serra" },
        { id: "viagem_002", km_total: 520, valor_bruto: 4800.00, valor_mercadoria: 80000.00, tipo_terreno: "plano" }
    ],
    configuracao2026: {
        preco_diesel: 6.10,
        media_consumo_base: 2.5,
        imposto_simples: 0.12,
        comissao_motorista_percentual: 0.12,
        manutencao_por_km: 0.45
    }
};
*/

export const getViagens = async () => {
    const { data, error } = await supabase.from('viagens').select('*');
    if (error) throw error;
    return data;
};

export const getConfigs = async () => {
    const { data, error } = await supabase.from('configuracoes').select('*').single();
    if (error) throw error;
    return data;
};

export const salvarViagem = async (dados) => {
    const { data, error } = await supabase.from('viagens').insert([dados]);
    if (error) throw error;
    return data;
};
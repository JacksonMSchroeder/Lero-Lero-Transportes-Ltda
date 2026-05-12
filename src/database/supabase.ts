import { createClient } from '@supabase/supabase-js';
import { DadosViagem } from '../types';

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

export interface ViagemDB extends DadosViagem {
    id: string;
    created_at?: string;
}

export interface ConfigDB {
    preco_diesel: number;
    media_consumo_base: number;
    imposto_simples: number;
    comissao_motorista_percentual: number;
    manutencao_por_km: number;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getViagens = async (): Promise<ViagemDB[]> => {
    const { data, error } = await supabase.from('viagens').select('*');
    if (error) throw error;
    return data as ViagemDB[];
};

export const getConfigs = async (): Promise<ConfigDB> => {
    const { data, error } = await supabase.from('configuracoes').select('*').single();
    if (error) throw error;
    return data as ConfigDB;
};

export const salvarViagem = async (dados: DadosViagem): Promise<ViagemDB[]> => {
    const { data, error } = await supabase.from('viagens').insert([dados]).select();
    if (error) throw error;
    return data as ViagemDB[];
};
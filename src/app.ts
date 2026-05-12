import type { DadosViagem } from './types';
import { ConfigDB } from './database/supabase';


const MULTIPLICADORES: Record<string, number> = { 
    PLANO: 1.0, 
    MISTO: 1.2, 
    SERRA: 1.4 
};

export const getConsumo = (base: number, terreno: string): number => 
    base / (MULTIPLICADORES[terreno.toUpperCase()] || 1.0);

export const getImposto = (bruto: number, taxa: number): number => bruto * taxa;

export const getDiesel = (km: number, consumo: number, preco: number): number => 
    (km / consumo) * preco;

export const getManutencao = (km: number, taxa: number): number => km * taxa;

export const getSeguro = (mercadoria: number): number => mercadoria * 0.01;

export const getComissao = (bruto: number, imposto: number, taxa: number): number => 
    (bruto - imposto) * taxa;

export const calcularResultadoViagem = (viagem: DadosViagem, config: ConfigDB) => {
    const consumoReal = getConsumo(config.media_consumo_base, viagem.tipo_terreno);
    
    const custos = {
        imposto: getImposto(viagem.valor_bruto, config.imposto_simples),
        diesel: getDiesel(viagem.km_total, consumoReal, config.preco_diesel),
        manutencao: getManutencao(viagem.km_total, config.manutencao_por_km),
        seguro: getSeguro(viagem.valor_mercadoria || 0),
        comissao: 0
    };

    custos.comissao = getComissao(
        viagem.valor_bruto, 
        custos.imposto, 
        config.comissao_motorista_percentual
    );

    const totalCustos = Object.values(custos).reduce((acc, val) => acc + val, 0);
    const lucro = viagem.valor_bruto - totalCustos;

    return {
        financeiro: {
            faturamento: viagem.valor_bruto,
            ...custos,
            lucro_real: Number(lucro.toFixed(2))
        },
        indicadores: {
            consumo_medio: Number(consumoReal.toFixed(2)),
            margem: Number(((lucro / viagem.valor_bruto) * 100).toFixed(2))
        }
    };
};
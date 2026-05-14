import type { DadosViagem, ResultadoCalculo } from '../types';

const MULTIPLICADORES: Record<string, number> = { PLANO: 1.0, MISTO: 1.2, SERRA: 1.4 };

export const CONFIG_LOCAL = {
  preco_diesel: 5.85,
  media_consumo_base: 2.8,
  imposto_simples: 0.06,
  comissao_motorista_percentual: 0.12,
  manutencao_por_km: 0.15
};

export const calcularResultadoViagem = (viagem: DadosViagem): ResultadoCalculo => {
  const consumoReal = CONFIG_LOCAL.media_consumo_base / (MULTIPLICADORES[viagem.tipo_terreno.toUpperCase()] || 1.0);
  
  const imposto = viagem.valor_bruto * CONFIG_LOCAL.imposto_simples;
  const diesel = (viagem.km_total / consumoReal) * CONFIG_LOCAL.preco_diesel;
  const manutencao = viagem.km_total * CONFIG_LOCAL.manutencao_por_km;
  const seguro = (viagem.valor_mercadoria || 0) * 0.15;
  const comissao = (viagem.valor_bruto - imposto) * CONFIG_LOCAL.comissao_motorista_percentual;

  const lucro = viagem.valor_bruto - (imposto + diesel + manutencao + seguro + comissao);

  return {
    financeiro: {
      faturamento: viagem.valor_bruto,
      imposto, diesel, manutencao, seguro, comissao,
      lucro_real: Number(lucro.toFixed(2))
    },
    indicadores: {
      consumo_medio: Number(consumoReal.toFixed(2)),
      margem: Number(((lucro / viagem.valor_bruto) * 100).toFixed(2))
    }
  };
};
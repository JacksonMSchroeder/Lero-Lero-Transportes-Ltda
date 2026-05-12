export interface DadosViagem {
  cliente: string;
  valor_bruto: number;
  km_total: number;
  valor_mercadoria?: number;
  tipo_terreno: 'plano' | 'misto' | 'serra';
}

export interface ResultadoCalculo {
  financeiro: {
    lucro_real: number;
    custo_total: number;
  };
  indicadores: {
    margem: number;
    percentual_lucro: string;
    consumo_km_l: number;
  };
}
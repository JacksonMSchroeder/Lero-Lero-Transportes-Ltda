export interface DadosViagem {
  cliente: string;
  valor_bruto: number;
  km_total: number;
  valor_mercadoria: number;
  tipo_terreno: 'plano' | 'misto' | 'serra';
}

export interface ResultadoCalculo {
  financeiro: {
    faturamento: number;
    imposto: number;
    diesel: number;
    manutencao: number;
    seguro: number;
    comissao: number;
    lucro_real: number;
  };
  indicadores: {
    consumo_medio: number;
    margem: number;
  };
}
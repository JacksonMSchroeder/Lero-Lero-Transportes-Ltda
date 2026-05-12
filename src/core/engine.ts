import { DadosViagem, ResultadoCalculo } from '../types';

export const calcularResultadoViagem = (dados: DadosViagem): ResultadoCalculo => {
 
  
 const consumoPorTerreno: Record<'plano' | 'misto' | 'serra', number> = {
  plano: 3.5,
  misto: 3.0,
  serra: 2.2
};

  const consumoMedio = consumoPorTerreno[dados.tipo_terreno];
  const litrosConsumidos = dados.km_total / consumoMedio;
  const custoCombustivel = litrosConsumidos * 5.85; 

  const lucro = dados.valor_bruto - custoCombustivel;

  return {
    financeiro: {
      lucro_real: Number(lucro.toFixed(2)),
      custo_total: Number(custoCombustivel.toFixed(2))
    },
    indicadores: {
      margem: Number(((lucro / dados.valor_bruto) * 100).toFixed(2)),
      percentual_lucro: `${((lucro / dados.valor_bruto) * 100).toFixed(1)}%`,
      consumo_km_l: consumoMedio
    }
  };
};
const MULTIPLICADORES = { PLANO: 1.0, MISTO: 1.2, SERRA: 1.4 };

export const getConsumo = (base, terreno) => base / (MULTIPLICADORES[terreno.toUpperCase()] || 1.0);
export const getImposto = (bruto, taxa) => bruto * taxa;
export const getDiesel = (km, consumo, preco) => (km / consumo) * preco;
export const getManutencao = (km, taxa) => km * taxa;
export const getSeguro = (mercadoria) => mercadoria * 0.01;
export const getComissao = (bruto, imposto, taxa) => (bruto - imposto) * taxa;

export const calcularResultadoViagem = (viagem, config) => {
    const consumoReal = getConsumo(config.media_consumo_base, viagem.tipo_terreno);
    
    const custos = {
        imposto: getImposto(viagem.valor_bruto, config.imposto_simples),
        diesel: getDiesel(viagem.km_total, consumoReal, config.preco_diesel),
        manutencao: getManutencao(viagem.km_total, config.manutencao_por_km),
        seguro: getSeguro(viagem.valor_mercadoria)
    };

    custos.comissao = getComissao(viagem.valor_bruto, custos.imposto, config.comissao_motorista_percentual);

    const totalCustos = Object.values(custos).reduce((acc, val) => acc + val, 0);
    const lucro = viagem.valor_bruto - totalCustos;

    return {
        id: viagem.id,
        financeiro: {
            faturamento: viagem.valor_bruto,
            ...custos,
            lucro_real: lucro
        },
        indicadores: {
            consumo_medio: consumoReal,
            margem: (lucro / viagem.valor_bruto) * 100
        }
    };
};
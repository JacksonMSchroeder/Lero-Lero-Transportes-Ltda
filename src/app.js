const MULTIPLICADORES = { PLANO: 1.0, MISTO: 1.2, SERRA: 1.4 };

export const getConsumo = (base, terreno) => base / (MULTIPLICADORES[terreno.toUpperCase()] || 1.0);
export const getImposto = (bruto, taxa) => bruto * taxa;
export const getDiesel = (km, consumo, preco) => (km / consumo) * preco;
export const getManutencao = (km, taxa) => km * taxa;
export const getSeguro = (mercadoria) => mercadoria * 0.01;
export const getComissao = (bruto, imposto, taxa) => (bruto - imposto) * taxa;

export const calcularResultadoViagem = (viagem, config) => {
    const consumoReal = getConsumo(config.media_consumo_base, viagem.tipo_terreno);
    const v_imposto = getImposto(viagem.valor_bruto, config.imposto_simples);
    const v_diesel = getDiesel(viagem.km_total, consumoReal, config.preco_diesel);
    const v_manutencao = getManutencao(viagem.km_total, config.manutencao_por_km);
    const v_seguro = getSeguro(viagem.valor_mercadoria);
    const v_comissao = getComissao(viagem.valor_bruto, v_imposto, config.comissao_motorista_percentual);

    const custosTotais = v_imposto + v_diesel + v_manutencao + v_seguro + v_comissao;
    const lucroLiquido = viagem.valor_bruto - custosTotais;

    return {
        viagem_id: viagem.id,
        financeiro: {
            faturamento: viagem.valor_bruto,
            imposto: v_imposto,
            combustivel: v_diesel,
            manutencao: v_manutencao,
            seguro_carga: v_seguro,
            comissao_motorista: v_comissao,
            margem_real: lucroLiquido.toFixed(2)
        },
        indicadores: {
            consumo_km_l: consumoReal.toFixed(2),
            percentual_lucro: ((lucroLiquido / viagem.valor_bruto) * 100).toFixed(2) + "%"
        }
    };
};
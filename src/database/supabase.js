const MOCKING = {
    viagens: [
        { id: "viagem_001", km_total: 130, valor_bruto: 2500.00, valor_mercadoria: 60000.00, tipo_terreno: "serra" },
        { id: "viagem_002", km_total: 520, valor_bruto: 4800.00, valor_mercadoria: 120000.00, tipo_terreno: "plano" }
    ],
    configuracao2026: {
        preco_diesel: 6.10,
        media_consumo_base: 2.5,
        imposto_simples: 0.12,
        comissao_motorista_percentual: 0.12,
        manutencao_por_km: 0.45
    }
};

export const getViagens = async (usarMock = true) => {
    if (usarMock) return MOCKING.viagens;
    const { data, error } = await supabase.from('viagens').select('*');
    if (error) throw error;
    return data;
};

export const getConfigs = async (usarMock = true) => {
    if (usarMock) return MOCKING.configuracao2026;
    const { data, error } = await supabase.from('configuracoes').select('*').single();
    if (error) throw error;
    return data;
};

const MULTIPLICADORES = { PLANO: 1.0, MISTO: 1.2, SERRA: 1.4 };

const getConsumo = (base, terreno) => base / (MULTIPLICADORES[terreno.toUpperCase()] || 1.0);
const getImposto = (bruto, taxa) => bruto * taxa;
const getDiesel = (km, consumo, preco) => (km / consumo) * preco;
const getManutencao = (km, taxa) => km * taxa;
const getSeguro = (mercadoria) => mercadoria * 0.01;
const getComissao = (bruto, imposto, taxa) => (bruto - imposto) * taxa;

export const calcularResultadoViagem = (viagem, config) => {
    const km = viagem.km_total;
    const bruto = viagem.valor_bruto;
    const mercadoria = viagem.valor_mercadoria;
    const terreno = viagem.tipo_terreno;

    const consumoReal = getConsumo(config.media_consumo_base, terreno);
    const v_imposto = getImposto(bruto, config.imposto_simples);
    const v_diesel = getDiesel(km, consumoReal, config.preco_diesel);
    const v_manutencao = getManutencao(km, config.manutencao_por_km);
    const v_seguro = getSeguro(mercadoria);
    const v_comissao = getComissao(bruto, v_imposto, config.comissao_motorista_percentual);

    const custosTotais = v_imposto + v_diesel + v_manutencao + v_seguro + v_comissao;
    const lucroLiquido = bruto - custosTotais;

    return {
        viagem_id: viagem.id,
        financeiro: {
            faturamento: bruto,
            imposto: v_imposto,
            combustivel: v_diesel,
            manutencao: v_manutencao,
            seguro_carga: v_seguro,
            comissao_motorista: v_comissao,
            margem_real: lucroLiquido.toFixed(2)
        },
        indicadores: {
            consumo_km_l: consumoReal.toFixed(2),
            percentual_lucro: ((lucroLiquido / bruto) * 100).toFixed(2) + "%"
        }
    };
};
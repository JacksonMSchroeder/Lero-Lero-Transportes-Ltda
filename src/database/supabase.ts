import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function login(email: string, pass: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
    });
    if (error) throw error;
    return data;
}

export async function salvarViagem(dados: any, res: any) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Usuário não autenticado.");
    }

    
    const { error } = await supabase
        .from('viagens')
        .insert([{
            
            cliente: dados.cliente,
            valor_bruto: dados.valor_bruto,
            valor_mercadoria: dados.valor_mercadoria,
            km_total: dados.km_total,
            tipo_terreno: dados.tipo_terreno,

            
            imposto: res.financeiro.imposto,
            diesel: res.financeiro.diesel,
            manutencao: res.financeiro.manutencao,
            seguro: res.financeiro.seguro,
            comissao: res.financeiro.comissao,
            lucro_real: res.financeiro.lucro_real,
            
            
            consumo_medio: res.indicadores.consumo_medio,
            margem: res.indicadores.margem,

            user_id: user.id 
        }]);

    if (error) throw error;
}
import { DadosViagem, ResultadoCalculo } from '../types';

export const tela = {
    form: document.querySelector<HTMLFormElement>('#viagemForm')!,
    resultado: document.querySelector<HTMLElement>('#res-card')!,
    content: document.querySelector<HTMLElement>('#res-content')!,

    pegarDados(): DadosViagem {
        const d = new FormData(this.form);
        return {
            cliente: String(d.get('cliente') || ''),
            valor_bruto: Number(d.get('valor_bruto')),
            km_total: Number(d.get('km_total')),
            valor_mercadoria: Number(d.get('valor_mercadoria')),
            tipo_terreno: d.get('tipo_terreno') as DadosViagem['tipo_terreno']
        };
    },

    mostrar(res: ResultadoCalculo): void {
        this.resultado.classList.remove('hidden');
        const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        this.content.innerHTML = `
            <p>Seguro (15%) <span><strong>${fmt(res.financeiro.seguro)}</strong></span></p>
            <p>Diesel <span><strong>${fmt(res.financeiro.diesel)}</strong></span></p>
            <p>Comissão <span><strong>${fmt(res.financeiro.comissao)}</strong></span></p>
            <p>Margem <span><strong>${res.indicadores.margem}%</strong></span></p>
            <hr style="border: 0; border-top: 1px solid #333; margin: 10px 0;">
            <p>LUCRO REAL <span><strong style="font-size: 1.4rem;">${fmt(res.financeiro.lucro_real)}</strong></span></p>
            
            <button id="btn-supabase" type="button" style="width: 100%; margin-top: 15px; background: #28a745;">
                LANÇAR NO SUPABASE
            </button>
        `;
    }
};
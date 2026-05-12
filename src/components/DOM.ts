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
        
        const lucroFormatado = res.financeiro.lucro_real.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
        
        this.content.innerHTML = `
            <p>Ganho Real: <strong>${lucroFormatado}</strong></p>
            <p>Margem: <strong>${res.indicadores.margem.toFixed(2)}%</strong></p>
        `;
    }
};
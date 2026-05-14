import { tela } from './components/DOM';
import { calcularResultadoViagem } from './core/engine';
import { supabase, login, salvarViagem } from './database/supabase';

tela.form.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    console.log("Iniciando cálculo local...");

    try {
        
        const dados = tela.pegarDados();
        const resultado = calcularResultadoViagem(dados);
        
        
        tela.mostrar(resultado); 
        console.log("Cálculo local exibido com sucesso.");

       
        const btnSupabase = document.getElementById('btn-supabase');

        
        const novoBtn = btnSupabase?.cloneNode(true) as HTMLButtonElement;
        btnSupabase?.parentNode?.replaceChild(novoBtn, btnSupabase!);

        novoBtn?.addEventListener('click', async () => {
            console.log("Iniciando processo de salvamento...");
            
            try {
                
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    const email = prompt("E-mail do Administrador:");
                    const senha = prompt("Senha:");
                    if (email && senha) {
                        await login(email, senha);
                    } else {
                        return;
                    }
                }

                novoBtn.innerText = "ENVIANDO...";
                novoBtn.disabled = true;

                await salvarViagem(dados, resultado);

                novoBtn.innerText = "LANÇADO COM SUCESSO!";
                novoBtn.style.backgroundColor = "#2e7d32";
            }  catch (err: any) {
    console.error("Erro detalhado do Supabase:", err.message, err.details, err.hint);
    alert(`Erro: ${err.message || "Erro desconhecido"}`);
                alert("Erro ao enviar para o banco. Verifique o console.");
                novoBtn.disabled = false;
                novoBtn.innerText = "TENTAR NOVAMENTE";
            }
        });

    } catch (error) {
        
        console.error("Erro no Tempo 1 (Cálculo):", error);
        alert("Erro ao calcular. Verifique se preencheu todos os campos.");
    }
});
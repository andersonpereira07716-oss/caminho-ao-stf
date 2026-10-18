// Sistema Freemium e Monetização - Caminho ao STF
const FreemiumSystem = {
    isVIP: localStorage.getItem('stf_vip') === 'true',

    // Exibir Anúncio Recompensado
    exibirAnuncioRecompensa(tipoRecompensa) {
        if (this.isVIP) {
            this.aplicarRecompensa(tipoRecompensa);
            return;
        }

        // Criar modal visual de Anúncio Simulado / AdSense H5
        const modalAd = document.createElement('div');
        modalAd.id = 'modal-ad';
        modalAd.className = 'fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 text-center';
        modalAd.innerHTML = `
            <div class="bg-slate-800 border-2 border-amber-500 rounded-2xl p-6 max-w-sm w-full text-white">
                <span class="text-xs bg-amber-500 text-black px-2 py-1 rounded uppercase font-bold tracking-wider">Anúncio de Patrocinador</span>
                <h3 class="text-xl font-bold mt-3 mb-2">Assistir para obter Vantagem</h3>
                <p class="text-sm text-slate-300 mb-4">Aguarde 5 segundos para receber o benefício no Plenário...</p>
                <div class="w-full bg-slate-700 h-3 rounded-full overflow-hidden mb-4">
                    <div id="ad-progress" class="bg-amber-400 h-full w-0 transition-all duration-1000"></div>
                </div>
                <button id="btn-fechar-ad" disabled class="w-full py-3 bg-slate-600 text-slate-400 font-bold rounded-xl cursor-not-allowed">
                    Aguarde (5s)
                </button>
            </div>
        `;
        document.body.appendChild(modalAd);

        let tempo = 5;
        const progressBar = document.getElementById('ad-progress');
        const btnFechar = document.getElementById('btn-fechar-ad');

        const timer = setInterval(() => {
            tempo--;
            progressBar.style.width = `${((5 - tempo) / 5) * 100}%`;
            btnFechar.innerText = tempo > 0 ? `Aguarde (${tempo}s)` : 'Receber Recompensa ⚖️';

            if (tempo <= 0) {
                clearInterval(timer);
                btnFechar.disabled = false;
                btnFechar.className = 'w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer';
                btnFechar.onclick = () => {
                    document.body.removeChild(modalAd);
                    this.aplicarRecompensa(tipoRecompensa);
                };
            }
        }, 1000);
    },

    // Aplicar o benefício após o anúncio
    aplicarRecompensa(tipo) {
        if (tipo === 'prestigio' && typeof prestigio !== 'undefined') {
            prestigio = Math.min(100, prestigio + 20);
            if (typeof atualizarInterface === 'function') atualizarInterface();
            alert('⚖️ Recompensa Concedida: +20 de Prestígio no Plenário!');
        } else if (tipo === 'processos' && typeof processos !== 'undefined') {
            processos = Math.max(0, processos - 30);
            if (typeof atualizarInterface === 'function') atualizarInterface();
            alert('📁 Recompensa Concedida: 30 Processos foram arquivados!');
        }
    },

    // Ativar Passe VIP (Remover Anúncios)
    comprarVIP() {
        if (confirm('Deseja ativar a Versão VIP (Sem anúncios e gabinetes ilimitados)?')) {
            localStorage.setItem('stf_vip', 'true');
            this.isVIP = true;
            alert('👑 Parabéns! Agora é um Membro VIP do STF.');
        }
    }
};

sc_comm = 0;
ind_ricorsione = 0;
array_indici_commenti_senza = [];
dilay_scorrimento_commenti = 0;
contesto_scelta = '';

function scorri_commenti(contesto_scelta){
    if(ind_ricorsione < array_indici_commenti_senza.length){
        if(contesto_scelta == 'cuori'){
            document.getElementById('comments').childNodes[4].childNodes[6].childNodes[array_indici_commenti_senza[ind_ricorsione]].childNodes[2].childNodes[2].childNodes[3].childNodes[7].childNodes[2].childNodes[11].childNodes[0].childNodes[2].childNodes[1].click();
            chrome.runtime.sendMessage({todo: 'messo_cuore', ind_cuore: (ind_ricorsione + 1), comm_totali: array_indici_commenti_senza.length, dilay: (dilay_scorrimento_commenti / 1000)});
        }else{
            document.getElementById("comments").childNodes[4].childNodes[6].childNodes[array_indici_commenti_senza[ind_ricorsione]].childNodes[2].childNodes[2].childNodes[3].childNodes[7].childNodes[2].childNodes[5].click();
            chrome.runtime.sendMessage({todo: 'messo_like', ind_like: (ind_ricorsione + 1), comm_totali: array_indici_commenti_senza.length, dilay: (dilay_scorrimento_commenti / 1000)});
        }
        ind_ricorsione += 1;
    }else{
        clearInterval(sc_comm);
        ind_ricorsione = 0;
        array_indici_commenti_senza = [];
        chrome.runtime.sendMessage({todo: 'finito'});
    }
}

chrome.runtime.sendMessage({todo: "showPageAction"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "avvia_script"){
        dilay_scorrimento_commenti = parseInt(request.dilay * 1000);
        contesto_scelta = request.contesto;
        let recupero_stringa_num_commenti = '' + document.getElementById('comments').childNodes[4].childNodes[2].childNodes[0].childNodes[2].childNodes[1].childNodes[1].childNodes[0].textContent;
        let n_commenti = recupero_stringa_num_commenti.split(' ');
        let guardo_se_ci_sono_punti_nel_numero = n_commenti[0].split('.');
        if(guardo_se_ci_sono_punti_nel_numero.length > 1){
            n_commenti[0] = 0;
            for(let i = 0; i < guardo_se_ci_sono_punti_nel_numero.length; i ++)
                n_commenti[0] += guardo_se_ci_sono_punti_nel_numero[i];
        }
        let secondi = 0;
        let limite = Math.floor(n_commenti[0]/5);
        chrome.runtime.sendMessage({todo: 'blocca_bottoni'});
        let intervallo = setInterval(function(){
            if(secondi <= limite){
                window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                chrome.runtime.sendMessage({todo: 'secondi_da_apettare', secondi: (limite - secondi)});
                secondi+=1;
            }else{
                clearInterval(intervallo);
                if(contesto_scelta == 'cuori'){
                    for(let j = 0; j < document.getElementById("comments").childNodes[4].childNodes[6].childNodes.length; j ++){
                        let stato_cuore = '' + document.getElementById('comments').childNodes[4].childNodes[6].childNodes[j].childNodes[2].childNodes[2].childNodes[3].childNodes[7].childNodes[2].childNodes[11].childNodes[0].childNodes[2].childNodes[1].getAttribute('aria-label');
                        if(stato_cuore == 'Cuore')
                            array_indici_commenti_senza.push(j);
                    }
                    chrome.runtime.sendMessage({todo: 'inizio_cuori'});
                }else{
                    for(let i = 0; i < document.getElementById("comments").childNodes[4].childNodes[6].childNodes.length; i ++){
                        let stato_like = '' + (document.getElementById("comments").childNodes[4].childNodes[6].childNodes[i].childNodes[2].childNodes[2].childNodes[3].childNodes[7].childNodes[2].childNodes[5].childNodes[0].childNodes[0].childNodes[1].getAttribute('aria-pressed'));
                        console.log(stato_like);
                        if(stato_like == 'false')
                            array_indici_commenti_senza.push(i);
                    }
                    chrome.runtime.sendMessage({todo: 'inizio_like'});
                }
                sc_comm = setInterval(function(){scorri_commenti(contesto_scelta);}, dilay_scorrimento_commenti);
            }
        }, 1000);
    }
});

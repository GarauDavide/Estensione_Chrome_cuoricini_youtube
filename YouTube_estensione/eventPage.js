chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "showPageAction"){
        chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }else if(request.todo == "secondi_da_apettare"){
        while(document.getElementById('log').firstChild)
		    document.getElementById('log').removeChild(document.getElementById('log').firstChild);
        document.getElementById('log').appendChild(document.createTextNode('FASE 1/2 - Devi aspettare circa: ' + request.secondi + ' secondi..'));
    }else if(request.todo == "finito"){
        while(document.getElementById('log').firstChild)
		    document.getElementById('log').removeChild(document.getElementById('log').firstChild);
        document.getElementById('log').appendChild(document.createTextNode('Finito, grazie per avere aspettato!'));
    }else if(request.todo == "blocca_bottoni"){
        document.getElementById('avvia_cuori').setAttribute('disabled', "disabled");
        document.getElementById('avvia_like').setAttribute('disabled', "disabled");
        document.getElementById('selezione_dilay').setAttribute('disabled', "disabled");
    }else if(request.todo == "inizio_cuori"){
        while(document.getElementById('log').firstChild)
		    document.getElementById('log').removeChild(document.getElementById('log').firstChild);
        document.getElementById('log').appendChild(document.createTextNode('FASE 2/2 - Inizio a mettere i cuori.. attendi fino alla fine..'));
    }else if(request.todo == "inizio_like"){
        while(document.getElementById('log').firstChild)
		    document.getElementById('log').removeChild(document.getElementById('log').firstChild);
        document.getElementById('log').appendChild(document.createTextNode('FASE 2/2 - Inizio a mettere i like.. attendi fino alla fine..'));
    }else if(request.todo == "messo_cuore"){
        while(document.getElementById('log').firstChild)
		    document.getElementById('log').removeChild(document.getElementById('log').firstChild);
        document.getElementById('log').appendChild(document.createTextNode('FASE 2/2 - Messo cuore ' + request.ind_cuore + ' su ' + request.comm_totali + ' - ' + (((request.comm_totali - request.ind_cuore) * request.dilay) + request.dilay) + ' secondi mancanti..'));
    }else if(request.todo == "messo_like"){
        while(document.getElementById('log').firstChild)
		    document.getElementById('log').removeChild(document.getElementById('log').firstChild);
        document.getElementById('log').appendChild(document.createTextNode('FASE 2/2 - Messo like ' + request.ind_like + ' su ' + request.comm_totali + ' - ' + (((request.comm_totali - request.ind_like) * request.dilay) + request.dilay) + ' secondi mancanti..'));
    }
});

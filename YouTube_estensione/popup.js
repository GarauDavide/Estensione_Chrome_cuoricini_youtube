$(function(){
    $('#log_attivita').text('Prima di avviare: CARICA I PRIMI COMMENTI ANCHE SOLO LEGGENDO IL PRIMO.');

    $('#avvia_cuori').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo: "avvia_script", dilay: $('#selezione_dilay').val(), contesto: 'cuori'});
        });
        $('#log_attivita').text('NON RIAVVIARE LA PAGINA prima che lo script abbia finito!');
    });

    $('#avvia_like').click(function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo: "avvia_script", dilay: $('#selezione_dilay').val(), contesto: 'like'});
        });
        $('#log_attivita').text('NON RIAVVIARE LA PAGINA prima che lo script abbia finito!');
    });
});
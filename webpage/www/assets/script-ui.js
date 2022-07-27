document.addEventListener("DOMContentLoaded", ()=>{
    var wiki_el = document.getElementsByName("wiki-page-content");
    if(wiki_el.length > 0){
        var content = wiki_el[0].getAttribute("content");
        wiki_el[0].remove();

        document.body.innerHTML += "\n\n<p>"+content+"</p>";
    }
});

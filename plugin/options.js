function restore_options() {
    chrome.storage.sync.get(['bangs', 'prefix'], function(result) {
	if(result.bangs != null){
        var bangs = JSON.parse(result.bangs);
        var i;
        for (i = 0; i < bangs.length; i++) {
            addline(bangs[i].bang, bangs[i].url, i);
        }
	}
	if(result.prefix != null){
	document.getElementById("prefix").value = result.prefix;
    
    }
    }
    );
}

function addline(bang, url, i) {

    var list = document.getElementById("list");
    var d = document.createElement("div");
    d.id = "d" + i;
    var exl = document.createTextNode("! ");
    var space = document.createTextNode(" ");
    var br = document.createElement("br");
    var button = document.createElement("button");
    button.innerHTML = '-';
    button.id = "bu" + i;
    button.addEventListener("click", function(event) {
        var i = event.target.id.replace("bu", "");
        document.getElementById("d" + i).outerHTML = "";

    });

    var inpb = document.createElement("input");
    inpb.value = bang;
    inpb.style = "width:21%"
    inpb.classList.add("bang");
    inpb.id = "ba" + i;


    var inpu = document.createElement("input");
    inpu.value = url;
    inpu.style = "width:72%";
    inpu.classList.add("url");
    inpu.id = "u" + i;

    d.appendChild(exl);
    d.appendChild(inpb);
    d.appendChild(space);
    d.appendChild(inpu);
    d.appendChild(space);
    d.appendChild(button);
    d.appendChild(br);
    list.appendChild(d);
}

function save_options() {
    var bangs = document.getElementsByClassName("bang");
    var urls = document.getElementsByClassName("url");
    var prefix = document.getElementById("prefix").value[0];
    var i;
    var ba = [];
    for (i = 0; i < bangs.length; i++) {
        var x = bangs[i].value;
        var y = urls[i].value;
        if (x != "" && y != "") {
            var bang = {
                "bang": x,
                "url": y
            }
            ba.push(bang);
        }
    }
    var save = JSON.stringify(ba);
    chrome.storage.sync.set({
        "bangs": save,
        "prefix" : prefix
        
    });

    location.reload();
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add').addEventListener('click', function() {
    addline("", "", document.getElementsByClassName("bang").length);

});
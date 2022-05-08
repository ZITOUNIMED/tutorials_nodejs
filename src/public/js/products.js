function logout(){
    window.location.href = '/connection';
}

var selectedTitle = null;
function remove(title){
      selectedTitle = title;
      var http = new XMLHttpRequest();
      http.addEventListener("load", removeListener);
      http.open("DELETE", "/product?title="+title);
      http.send()
}

function removeListener () {
   // console.log(this.responseText);
  // location.reload();
    var rows = document.getElementById('productsTableId').rows;
    for(var i = 0; i<rows.length; i++){
        if(rows[i].childNodes[1].innerText === selectedTitle){
            rows[i].remove();
        }
    }
}

function update(title){
    var rows = document.getElementById('productsTableId').rows;
    for(var i = 0; i<rows.length; i++){
        if(rows[i].childNodes[1].innerText === title){
            document.getElementById('title').value=rows[i].childNodes[1].innerText;
            document.getElementById('price').value=rows[i].childNodes[3].innerText;
            document.getElementById('amount').value=rows[i].childNodes[5].innerText;
        }
    }

    var postAction = document.getElementById('postActionId');
    console.log(postAction);
    postAction.value='update';
}
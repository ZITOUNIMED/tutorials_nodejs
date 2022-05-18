var selectedLogin = null;
function remove(login){
    selectedLogin = login;
      var http = new XMLHttpRequest();
      http.addEventListener("load", removeListener);
      http.open("DELETE", "/users/"+login);
      http.send()
}

function removeListener () {
   // console.log(this.responseText);
  // location.reload();
    var rows = document.getElementById('usersTableId').rows;
    for(var i = 0; i<rows.length; i++){
        if(rows[i].childNodes[5].innerText === selectedLogin){
            rows[i].remove();
        }
    }
}

function update(login){
    var rows = document.getElementById('usersTableId').rows;
    for(var i = 0; i<rows.length; i++){
        if(rows[i].childNodes[5].innerText === login){
            document.getElementById('firstname').value=rows[i].childNodes[1].innerText;
            document.getElementById('lastname').value=rows[i].childNodes[3].innerText;
            document.getElementById('login').value=rows[i].childNodes[5].innerText;
            document.getElementById('role').value=rows[i].childNodes[7].innerText;
        }
    }

    var postAction = document.getElementById('postActionIdUsers');
    console.log(postAction);
    postAction.value='update';
}
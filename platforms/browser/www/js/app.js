///// Save memo and return to top page
function onSaveBtn() {
    var text = $("#Memo").val();
	var title = $("#Title").val();
	var key = $("#key_user").val();
	var fecha = $("#picker").val();
	
	
    var year = fecha.substring(0, 4);
    var month= fecha.substring(5,7);
    var day= fecha.substring(8,10);

    var res=day+'/'+month+'/'+year;
	if(existDate(res)){
		if(!validateMinorDate(res)){
			if (text != '' && title !='' ) {
				// Save to local storage
				addMemo(text, title, key,fecha);
				$("#Memo").val("");
				$("#Title").val("");
				document.getElementById("picker").valueAsDate = new Date();
				$.mobile.changePage("#TopPage", { reverse: true });
			}
			else{
				alert("Enter a title and note please");
			}
			
		}
		else{
			alert("Enter a greater date");
		}
	}
	else{
		alert("Select a validate date");
	}
}

function validateMinorDate(date){
      var x=new Date();
      var fecha = date.split("/");
      x.setFullYear(fecha[2],fecha[1]-1,fecha[0]);
      var today = new Date();
      if (x >= today){
		  alert("false");
        return false;
	  }
      else{
		  alert("true");
        return true;
	  }
}

function existDate(fecha){
      var fechaf = fecha.split("/");
      var day = fechaf[0];
      var month = fechaf[1];
      var year = fechaf[2];
      var date = new Date(year,month,'0');
      if((day-0)>(date.getDate()-0)){
            return false;
      }
      return true;
}

function regreso(){
	var key = $("#key_user").val();
	getDataList(key);
	$.mobile.changePage("#TopPage", { reverse: true });
}



// Funcion para cuando se vaya a registrar
function onRegisterBtn()
{
  var email = $("#reg_email").val();
  var password = $("#reg_password").val();
  var key = $("#key_user").val();
  localStorage.setItem("key_user", key);
                var url = "http://c-tices.com/insertuser.php?email="+email +"&pass="+ password +"&key="+key;
				//alert(url);
                //alert (url);
                $.getJSON(url)
                .done(function( data ) {
                  $.each( data, function( variable, valor ) {
					if(variable== "status" && valor=="1"){
						localStorage.setItem("key_user", key);
						$.mobile.changePage("#TopPage", { reverse: true });
						return false;
					}
                  });
                })
				.fail(function(jqXHR){
					alert("Error adding user");
					if (jqXHR.status == 106) {
						alert("Please check your internet connection");
					} 
				});
}

// Funcion Calendar from DateTimePicker
function getCalendar(){
	
		var options = {
		date: new Date(),
		mode: 'date'
		};
		datePicker.show(options, onSuccess, onError);	
	
}

function onSuccess(date) {
	alert('Selected date: ' + date);
}

function onError(error) { // Android only
	alert('Error: ' + error);
}

// Funcion que genera la llave para cada usuario;
function password(length, special) {
  var iteration = 0;
  var password = "";
  var randomNumber;
  if(special == undefined){
      var special = false;
  }
  while(iteration < length){
    randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
    if(!special){
      if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
      if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
      if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
      if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
    }
    iteration++;
    password += String.fromCharCode(randomNumber);
  }
  return password;
}

///// Move to detail page
function onShowLink() {
    var $li = $(this).parent();
    var memoTitle = $li.find("h3").text();
    var memoHtml = $li.find("p").html().replace(/\n/g, "<br>");
    
    $("#ShowPage h1").text(memoTitle);
    $("#ShowPage p").html(memoHtml);
    $.mobile.changePage("#ShowPage");
}

///// Delete memo
function onDeleteLink() {
    if (!confirm("Are you sure to delete this note?")) {
      return;
    }
    var $li = $(this).parent();
    var id = $li.data("id");
	var key = $("#key_user").val();
    deleteMemo(id,key);
    $.mobile.changePage("#TopPage", { reverse: true });
}

///// Called when app launch
function onReady() {
    //initTopPage();
    $("#SaveBtn").click(onSaveBtn);
    $("#TopListView").on("click", "a.show", onShowLink);
    $("#TopListView").on("click", "a.delete", onDeleteLink);
}

$(onReady); // on DOMContentLoaded

function getDataList(key){
	var url = "http://c-tices.com/selectnote.php?keylogin="+key ;
	$("#TopListView").empty();
	$.getJSON(url,function(notes){
		$.each(notes, function(i,obj){
				$li = $("<li><a href='#' class='show'><img src='img/note.png'  ><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
				$li.data("id", obj.id);
				$li.find("h3").text(obj.title+ " - "+obj.date);
				$li.find("p").text(obj.note);
				$("#TopListView").prepend($li);
				$("#TopListView").listview("refresh");
		});
		if (notes.length == 0 || notes==null) {
			$li = $("<li>Notes not found</li>");
			$("#TopListView").prepend($li);
			$("#TopListView").listview("refresh");
		}
	})
	.fail(function(jqXHR){
		alert("Error loading data");
		if (jqXHR.status == 106) {
			alert("Please check your internet connection");
		} 
	});
}




function getDataListContact(key){
	var url = "http://c-tices.com/selectcontact.php?keylogin="+key ;
	$("#TopListViewContact").empty();
	$.getJSON(url,function(notes){
		$.each(notes, function(i,obj){
				$li = $("<li><a href='#' class='show'><img src='img/noselect.png'  ><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
				$li.data("id", obj.key);
				//$li.find("img").attr('src','img/contact.png');
				$li.find("h3").text(obj.name);
				$li.find("p").text(obj.key);
				$("#TopListViewContact").prepend($li);
				$("#TopListViewContact").listview("refresh");
		});
		if (notes.length == 0 || notes==null) {
			$li = $("<li>Contacts not found</li>");
			$("#TopListViewContact").prepend($li);
			$("#TopListViewContact").listview("refresh");
		}
	})
	.fail(function(jqXHR){
		alert("Error loading data");
		if (jqXHR.status == 106) {
			alert("Please check your internet connection");
		} 
	});
}


function getDataListContactNotes(key){
	var url = "http://c-tices.com/selectcontact.php?keylogin="+key ;
	$("#TopListViewSendContact").empty();
	$.getJSON(url,function(notes){
		$.each(notes, function(i,obj){
				var sec="<li data-role='list-divider'>Overdue</li>"+
						"<li>" +
							"<a href='#'><label data-corners='false'>"+
								"<h2></h2>"+
									"<p></p>"+
								"<input type='checkbox' checked='false'>"+
							"</label></a>"+
							"<a href='#'>Details</a>"+
						"</li>";
						/*
								"<p></p>"+
							"</a>"+
						"</li>";
						*/
				//alert(sec);
				//var cad="<li><a><input data-iconpos='right' id='+"+obj.key+ "'  type='checkbox'" +"> <label for='"+obj.key+  "'>"+ obj.name +"</label></input></a> <a href='#' data-icon='info' onclick='alert('Hello')'> This is a link though </a>  </li>";
				$li = $("<li><a href='#' class='show'><img src='img/contact.png'  ><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
				//$li=$(cad);
				//$li= $(sec);
				$li.data("id", obj.key);
				//$li.find("img").attr('src','img/contact.png');
				$li.find("h3").text(obj.name);
				$li.find("p").text(obj.key);
				$("#TopListViewSendContact").prepend($li);
				$("#TopListViewSendContact").listview("refresh");
		});
		if (notes.length == 0 || notes==null) {
			$li = $("<li>Contacts not found</li>");
			$("#TopListViewSendContact").prepend($li);
			$("#TopListViewSendContact").listview("refresh");
		}
	})
	.fail(function(jqXHR){
		alert("Error loading data");
		if (jqXHR.status == 106) {
			alert("Please check your internet connection");
		} 
	});
}


///// Save memo
function saveMemoList(list) {
    try {
        localStorage.setItem("select_list", JSON.stringify(list));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}


function getMemoList() {
    var list = localStorage.getItem("select_list");
    if (list == null) {
        return new Array();
    } else {
        return JSON.parse(list);
    }
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

///// Add memo
function addMemo(text,title,key,datenote) {
				var url= "http://c-tices.com/insertnote.php?keylogin=" + key+ "&titulo="+title+ "&nota="+text + "&fecha="+datenote;
				//alert(url);
                $.getJSON(url)
                .done(function( data ) {
                  $.each( data, function( i, item ) {
					if(i== "status" && item=="1"){
						return false;
					}
                  });
                })
				.fail(function(jqXHR){
					alert("Error saving data");
					if (jqXHR.status == 106) {
						alert("Please check your internet connection");
					} 
				})
				.complete(function(){
					getDataList(key);
				});
}


function addMultipleMemo(text,title,key,datenote,key1) {
				var url= "http://c-tices.com/insertmultiplenot.php?keylogin=" + key+ "&titulo="+title+ "&nota="+text + "&fecha="+datenote;
				//alert(url);
                $.getJSON(url)
                .done(function( data ) {
                  $.each( data, function( i, item ) {
					if(i== "status" && item=="1"){
						return false;
					}
                  });
                })
				.fail(function(jqXHR){
					alert("Error saving data");
					if (jqXHR.status == 106) {
						alert("Please check your internet connection");
					} 
				})
				.complete(function(){
					getDataList(key1);
				});
}


function addContact(key1,key2,name) {
				var url= "http://c-tices.com/insertcontact.php?mykey=" + key1+ "&key="+key2+ "&name="+name;
				//alert(url);
                $.getJSON(url)
                .done(function( data ) {
                  $.each( data, function( i, item ) {
					 // alert(i +"--" + item);
					if(i== "status" && item=="1"){
						//localStorage.setItem((key2,0);
						return false;
					}
                  });
                })
				.fail(function(jqXHR){
					alert("Error saving data");
					if (jqXHR.status == 106) {
						alert("Please check your internet connection");
					} 
				})
				.complete(function(){
					//alert(key2);
					
					getDataListContact(key1);
				});
}



///// Delete specified memo
function deleteMemo(id,key) {
				var url= "http://c-tices.com/deletenote.php?idnote=" + id;
                $.getJSON(url)
                .done(function( data ) {
                  $.each( data, function( i, item ) {
					if(i== "status" && item=="1"){
						return false;
					}
                  });
                })
				.fail(function(jqXHR){
					alert("Error saving data");
					if (jqXHR.status == 106) {
						alert("Please check your internet connection");
					} 
				})
				.complete(function(){
					getDataList(key);
				});
}

function deleteContact(id,key) {
				var url= "http://c-tices.com/deletecontact.php?idcontact=" + id;
                $.getJSON(url)
                .done(function( data ) {
                  $.each( data, function( i, item ) {
					if(i== "status" && item=="1"){
						return false;
					}
                  });
                })
				.fail(function(jqXHR){
					alert("Error deleting contact");
					if (jqXHR.status == 106) {
						alert("Please check your internet connection");
					} 
				})
				.complete(function(){
					localStorage.removeItem(key);
					getDataListContact(key);
				});
}


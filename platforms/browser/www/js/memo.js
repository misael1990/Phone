function getDataList(key){
	var url = "http://c-tices.com/selectnote.php?keylogin="+key ;
	$("#TopListView").empty();
	$.getJSON(url,function(notes){
		$.each(notes, function(i,obj){
				$li = $("<li><a href='#' class='show'><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
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

///// Save memo
function saveMemoList(list) {
    try {
        localStorage.setItem("memo_list", JSON.stringify(list));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
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
				alert(url);
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


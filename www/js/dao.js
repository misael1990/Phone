function getDataListContact(key){
	var url = "http://c-tices.com/selectcontact.php?keylogin="+key ;
	$("#TopListView").empty();
	$.getJSON(url,function(notes){
		$.each(notes, function(i,obj){
				$li = $("<li><a href='#' class='show'><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
				$li.data("id", obj.id);
				//$li.find("img").attr('src','img/contact.png');
				$li.find("h3").text(obj.name);
				$li.find("p").text(obj.key);
				$("#TopListViewContact").prepend($li);
				$("#TopListViewContact").listview("refresh");
		});
		if (notes.length == 0 || notes==null) {
			$li = $("<li>Notes not found</li>");
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

///// Save memo
function saveMemoList(list) {
    try {
        localStorage.setItem("memo_list", JSON.stringify(list));
    } catch (e) {
        alert('Error saving to storage.');
        throw e;
    }
}



///// Add memo
function addContact(key1,key2,name) {
				var url= "http://c-tices.com/insertcontact.php?mykey=" + key1+ "&key="+key2+ "&name="+name;
				//alert(url);
                $.getJSON(url)
                .done(function( data ) {
                  $.each( data, function( i, item ) {
					  alert(i +"--" + item);
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
					//getDataList(key1);
				});
}


///// Delete specified memo
/*
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
*/

///// Save memo and return to top page
function onSaveBtnContact() {
    var name = $("#Name").val();
	var key2 = $("#Key").val();
	var key1;
	if ("key_user" in localStorage) {
		key1= localStorage.getItem("key_user");
	}
	else{
		key1="";
	}
	addContact(key1,key2,name);
	$("#Name").val("");
	$("#Key").val("");
	$.mobile.changePage("#TopPage", { reverse: true });		
}

function initContact(){
	var key1;
	if ("key_user" in localStorage) {
		key1= localStorage.getItem("key_user");
		alert(key1);
		getDataList(key1);
		//getDataListContact(key1)
	}
	else{
		key1="";
	}
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
   // initContact();
    $("#SaveBtn").click(onSaveBtn);
    $("#TopListView").on("click", "a.show", onShowLink);
    $("#TopListView").on("click", "a.delete", onDeleteLink);
}

$(onReady); // on DOMContentLoaded

    <script type="text/javascript" charset="utf-8">


    // Rellena la base de datos
    //
    function createDB(tx) {
       // tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS NOTE (id INTEGER AUTOINCREMENT, title_note varchar(25) not null, note varchar(255) not null, date_note DATE not null');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "Primera fila")');
        //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Segunda fila")');
    }
	
	function insertDB(title, note){
		var db = window.openDatabase("DailyNote", "1.0", "My Dialy Note", 200000);
		db.transaction(function(tx){
			tx.executeSql("INSERT INTO NOTE (title_note, note, date_note) VALUES (?,?,?)",[title, note, new Date()], errorDB, successDB);
		});
	}

	function Object resultAllData(){
		var db = window.openDatabase("DailyNote", "1.0", "My Dialy Note", 200000);
		db.readTransaction(function (tx){
			t.executeSql("SELECT ID, TITLE_NOTE, NOTE, DATE_NOTE FROM NOTE"),[],function(tx, rs){
				var registro = new Object();
				for (var i=0; i< rs.rows.length ;i++){
					registro.id=rs.rows.item(i).ID;
					registro.title= rs.rows.item(i).TITLE_NOTE;
					registro.note= rs.rows.item(i).NOTE;
					registro.date= rs.rows.item(i).DATE_NOTE;
					console.log("Los datos son: " + registro.id + "-" + registro.title + "-" + registro.note + "-" + registro.date + "-");
				}
			}, errorDB, successDB);
		});
	}

    // Consulta a la base de datos
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
    }

    // Función 'callback' con el resultado de la consulta
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        console.log("Tabla DEMO: " + len + " filas encontradas.");
        for (var i=0; i<len; i++){
            console.log("Fila = " + i + " ID = " + results.rows.item(i).id + " Datos =  " + results.rows.item(i).data);
        }
    }

    // Función 'callback' de error de transacción
    //
    function errorCB(err) {
        console.log("Error procesando SQL: "+err.code);
    }
	
	function successDB(suc){
		console.log("calidad");
	}

    // Función 'callback' de transacción correcta
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "Demo PhoneGap", 200000);
        db.transaction(queryDB, errorCB);
    }

    // PhoneGap esta listo
    //
    function onDeviceReady() {
        var db = window.openDatabase("DailyNote", "1.0", "My DialyNote App", 200000);
        db.transaction(createDB, errorCB, successDB);
    }

    </script>
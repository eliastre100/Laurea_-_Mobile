let databaseHandler = {
    db: null,
    createDatabase:  () => {
        databaseHandler.db = window.openDatabase(
            "UserManager.db",
            "1.0",
            "accounts database",
            1000000);
        databaseHandler.db.transaction((tx) => {
                tx.executeSql(
                    "create table if not exists accounts(_id int primary key, username text, password text)",
                    [],
                    (tx, results) => { },
                    (tx, error) => { console.log("Error while creating the table: " + error.message); }
                );
            },
            (error) =>{ console.log("Transaction error:" + error.message); },
            () => { console.log("Create DB transaction completed successfully:" ); },
        );
    }
};
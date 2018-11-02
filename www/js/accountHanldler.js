let accounttHandler = {
    addAccount: async (id, username, password) =>{
        databaseHandler.db.transaction(async (tx) => {
                await tx.executeSql(
                    "insert into accounts(_id, username, password) values(?, ?, ?)",
                    [id, username, password],
                    function (tx, results) { },
                    function (tx, error) {
                        console.log("add product error: " + error.message);
                    }
                );
            },
        );
    },
    getAccounts: () => {
        return new Promise((resolve, reject) => {
            databaseHandler.db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM accounts",
                    [],
                    (tx, _results) => { resolve(Array.from(_results.rows)) },
                    (tx, error) => { reject(error) }
                )
            })});
    }
};
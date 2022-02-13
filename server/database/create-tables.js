export const tableUsers = "users";
export const tableCustomers = "customers";

const sqlCreateTableUsers =`
    CREATE TABLE IF NOT EXISTS ${tableUsers} (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        surname varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        email varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        password varchar(45) COLLATE utf8_unicode_ci NOT NULL,
        deleted timestamp NULL DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY email_UNIQUE (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
`;

const sqlCreateTableCustomers = `
    CREATE TABLE IF NOT EXISTS ${tableCustomers} (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        surname varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        email varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        age int NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

`;

export const createTables = async (connection) => {
    try {
        await connection.query (sqlCreateTableUsers);
        await connection.query (sqlCreateTableCustomers);

    } catch (error) {
        console.log("Couldn't create db tables ", e);
      throw e;
    }
}

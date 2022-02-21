export const tableUsers = "users";
export const tableShows = "shows";
export const tableCustomers = "customers";

const sqlCreateTableUsers =`
    CREATE TABLE IF NOT EXISTS ${tableUsers} (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        surname varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        email varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        password varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
        deleted timestamp NULL DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY email_UNIQUE (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
`;

const sqlCreateTableShows = `
CREATE TABLE IF NOT EXISTS ${tableShows} (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(128) COLLATE utf8_unicode_ci NOT NULL,
    description text COLLATE utf8_unicode_ci,
    show_date timestamp NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
`;

const sqlCreateTableCustomers = `
    CREATE TABLE IF NOT EXISTS ${tableCustomers} (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        surname varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        email varchar(128) COLLATE utf8_unicode_ci NOT NULL,
        age int NOT NULL,
        show_id int DEFAULT NULL,
        PRIMARY KEY (id),
        KEY show_id_idx (show_id),
        KEY id_show_idx (show_id),
        CONSTRAINT show_id FOREIGN KEY (show_id) REFERENCES shows (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
`;

export const createTables = async (connection) => {
    try {
        await connection.query (sqlCreateTableUsers);
        await connection.query (sqlCreateTableShows);
        await connection.query (sqlCreateTableCustomers);

    } catch (error) {
        console.log("Couldn't create db tables ", error);
      throw error;
    }
}

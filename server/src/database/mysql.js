import dotenv from "dotenv";
import {createConnection} from "mysql2/promise";

dotenv.config();
const {MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PW, MYSQL_DB} = process.env;

export const getConnection = async () =>
    await createConnection({
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PW,
        database: MYSQL_DB,
    });
    
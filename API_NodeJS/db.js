import Pool from "pg"
export const pool = new Pool.Pool({
    user:"",
    host:"localhost",
    database:"",
    password:"",
    port:"5432"
});

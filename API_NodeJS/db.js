import Pool from "pg"
export const pool = new Pool.Pool({
    user:"test2",
    host:"localhost",
    database:"bdd_sae_belfunfair",
    password:"2903",
    port:"5432"
});

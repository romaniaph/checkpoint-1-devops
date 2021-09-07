 const { Pool } = require('pg');
 
 // ==> Conexão com a Base de Dados:
 const pool = new Pool({
   connectionString: "postgres://pedro%40db-cp1-xcave:%40Xcave.2021@db-cp1-xcave.postgres.database.azure.com:5432/postgres",
 });
 
 pool.on('connect', () => {
   console.log('Base de Dados conectado com sucesso!');
 });
 
 module.exports = {
   query: (text, params) => pool.query(text, params),
 };
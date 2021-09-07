 const { Pool } = require('pg');
 
 // ==> Conexão com a Base de Dados:
 const pool = new Pool({
   connectionString: "[CONNECTION_STRING]",
 });
 
 pool.on('connect', () => {
   console.log('Base de Dados conectado com sucesso!');
 });
 
 module.exports = {
   query: (text, params) => pool.query(text, params),
 };
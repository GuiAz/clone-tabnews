import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const versaoPostgres = await database.query("SELECT version()");
  const conectionsMax = await database.query("SHOW max_connections");
  const conectionsUsed = await database.query(
    "SELECT count(*) FROM pg_stat_activity;",
  );

  console.log(versaoPostgres.rows[0].version);
  console.log(conectionsMax.rows[0].max_connections);
  console.log(conectionsUsed.rows[0]);

  response.status(200).json({
    update_at: updateAt,
    versao_postgres: versaoPostgres.rows[0].version,
    conections_max: conectionsMax.rows[0].max_connections,
    conections_used: conectionsUsed.rows[0],
  });
}

export default status;

import { getPool, sql } from "../database";
import { sql as sqlObj } from "slonik";
import type { Integrante } from "../../../shared/types";

type FindIntegrantesParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

export async function getIntegrantes({
  limit = 10,
  offset = 0,
  search = "",
  order_by = "nome",
  direction = "desc",
}: FindIntegrantesParams = {}) {
  const pool = await getPool();
  const sqlDirection =
    direction.toLowerCase() === "desc" ? sql`desc` : sql`asc`;

  const sqlOrderBy = sql`order by ${sqlObj.identifier([
    order_by,
  ])} ${sqlDirection}`;

  const integrantes =
    await pool.many(sql`SELECT t1.*, t2.plano, t3.ativo AS resgate_ativo, t4.ativo AS desconto_farm from public.integrantes t1 
  JOIN PUBLIC.plano t2 ON t1.id_integrante = t2.id_integrante 
  JOIN PUBLIC.resgate_domiciliar t3 ON t1.id_integrante = t3.id_integrante
  JOIN PUBLIC.desconto_farmacia t4 ON t1.id_integrante = t4.id_integrante ${sqlOrderBy}
 limit ${limit} offset ${offset}`);

  const totalIntegrantes = await pool.one(
    sql`SELECT count(id_integrante) from public.integrantes`
  );

  return { integrantes: integrantes, total: totalIntegrantes };
}

export async function getIntegranteById(id: number) {
  const pool = await getPool();
  const integrante = await pool.one(sql`
  SELECT t1.*, t2.plano, t3.ativo AS resgate_ativo, t4.ativo AS desconto_farm from public.integrantes t1 
  JOIN PUBLIC.plano t2 ON t1.id_integrante = t2.id_integrante 
  JOIN PUBLIC.resgate_domiciliar t3 ON t1.id_integrante = t3.id_integrante
  JOIN PUBLIC.desconto_farmacia t4 ON t1.id_integrante = t4.id_integrante where t1.id_integrante=${id}
  `);
  return integrante;
}

export async function addIntegrante(integrante: Integrante) {
  const response = await integrante;
  return response;
}

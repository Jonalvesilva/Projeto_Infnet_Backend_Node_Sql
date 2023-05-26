import { getPool, sql } from "../database";
import { sql as sqlObj } from "slonik";
import { normalizeText, createSearchSql } from "./functions/functions";
import type { Dependente, FindParams } from "../../../shared/types";

//Function Mostrar Dependentes - Search Adaptado
export async function getDepedentes(
  {
    limit = 10,
    offset = 0,
    search = "",
    order_by = "nome",
    direction = "desc",
  }: FindParams = {},
  id_integrante: number
) {
  const pool = await getPool();

  const sqlSearch =
    search !== "" ? createSearchSql(normalizeText(search)) : sqlObj.fragment``;

  const sqlDirection =
    direction.toLowerCase() === "desc" ? sql`desc` : sql`asc`;

  const sqlOrderBy = sql`order by ${sqlObj.identifier([
    order_by,
  ])} ${sqlDirection}`;

  const dependentes = await pool.many(
    sql`SELECT t1.*,t2.nome as nome_integrante from public.dependentes t1 JOIN public.integrantes t2 on t1.id_integrante = t2.id_integrante
    where t1.id_integrante=${id_integrante}`
  );

  return dependentes;
}

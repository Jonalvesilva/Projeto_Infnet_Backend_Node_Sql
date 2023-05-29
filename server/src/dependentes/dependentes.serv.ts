import { getPool, sql } from "../database";
import { sql as sqlObj } from "slonik";
import { normalizeText, createSearchSql } from "./functions/functions";
import type { Dependente, FindParams } from "../../../shared/types";
import * as schema from "./schemas/createDependenteSchema";

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
    where t1.id_integrante=${id_integrante} ${sqlSearch} ${sqlOrderBy} limit ${limit} offset ${offset}`
  );

  return dependentes;
}

//Function Mostrar Dependente por ID
export async function getDepedenteById(id: number) {
  const pool = await getPool();
  const dependente = await pool.one(
    sql`SELECT * from public.dependentes where id_dependente = ${id}`
  );
  console.log(dependente);
  return dependente;
}

//Function Adicionar Dependente
export async function addDependente(
  idIntegrante: number,
  dependente: Dependente
) {
  //Validação dos Dados
  const validation = await schema.createDependenteSchema.safeParseAsync(
    dependente
  );
  if (validation.success === false) {
    return {
      success: false,
      post: null,
      errors: validation.error.errors,
    };
  }

  const { name, data_nasc, cpf } = validation.data;
  const pool = await getPool();

  const insertDependente = await pool.one(
    sql`Insert into public.dependentes (id_integrante, nome,data_nasc,cpf) values (${idIntegrante},${name},${data_nasc},${cpf}) returning *`
  );

  return insertDependente;
}

//Function Editar Dependente
export async function editDependenteById(
  id_dependente: number,
  dependente: Dependente
) {
  //Validação dos Dados
  const validation = await schema.createDependenteSchema.safeParseAsync(
    dependente
  );
  if (validation.success === false) {
    return {
      success: false,
      post: null,
      errors: validation.error.errors,
    };
  }
  const pool = await getPool();
  const { name, data_nasc, cpf } = validation.data;

  const editDependente = await pool.one(
    sql`update public.dependentes set nome=${name}, data_nasc=${data_nasc}, cpf=${cpf} where id_dependente=${id_dependente} returning *`
  );

  return editDependente;
}

//Function Deleta Dependente
export async function deleteDependenteById(id_dependente: number) {
  const pool = await getPool();
  try {
    const dependente = await pool.one(
      sql`SELECT * from public.dependentes where id_dependente=${id_dependente}`
    );

    const results = await pool.query(sql`
    delete from public.dependentes where id_dependente = ${id_dependente}
  `);
    const success = results.rowCount === 1;

    return {
      success,
      dependente,
    };
  } catch {
    return { success: false, message: "Não foi possível deletar o dependente" };
  }
}

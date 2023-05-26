import { getPool, sql } from "../database";
import { sql as sqlObj } from "slonik";
import { normalizeText, createSearchSql } from "./functions/functions";
import type { Integrante, FindIntegrantesParams } from "../../../shared/types";
import * as schema from "./schemas/createIntegranteSchema";
import { object } from "zod";

//Function Mostrar Integrantes - Search Adaptado
export async function getIntegrantes({
  limit = 10,
  offset = 0,
  search = "",
  order_by = "nome",
  direction = "desc",
}: FindIntegrantesParams = {}) {
  const pool = await getPool();

  const sqlSearch =
    search !== "" ? createSearchSql(normalizeText(search)) : sqlObj.fragment``;

  const sqlDirection =
    direction.toLowerCase() === "desc" ? sql`desc` : sql`asc`;

  const sqlOrderBy = sql`order by ${sqlObj.identifier([
    order_by,
  ])} ${sqlDirection}`;

  const integrantes =
    await pool.many(sql`SELECT t1.*, t2.plano, t3.ativo AS resgate_ativo, t4.ativo AS desconto_farm from public.integrantes t1 
  JOIN PUBLIC.plano t2 ON t1.id_integrante = t2.id_integrante 
  JOIN PUBLIC.resgate_domiciliar t3 ON t1.id_integrante = t3.id_integrante
  JOIN PUBLIC.desconto_farmacia t4 ON t1.id_integrante = t4.id_integrante ${sqlSearch} ${sqlOrderBy}
 limit ${limit} offset ${offset}`);

  const totalIntegrantes = await pool.one(
    sql`SELECT count(id_integrante) from public.integrantes`
  );

  return { integrantes: integrantes, total: totalIntegrantes };
}

//Function Mostrar Integrante por ID
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

//Function Adicionar Integrante
export async function addIntegrante(integrante: Integrante) {
  //Validação de Dados
  const validation = await schema.createIntegranteSchema.safeParseAsync(
    integrante
  );
  if (validation.success === false) {
    return {
      success: false,
      post: null,
      errors: validation.error.errors,
    };
  }

  const {
    name,
    cpf,
    data_nasc,
    tel_cel,
    tel_res,
    email,
    plano,
    resgate_domiciliar,
    desconto_farm,
  } = validation.data;

  const pool = await getPool();

  //Insert Integrante
  let insert = false;

  try {
    await pool.one(sql`
    insert into public.integrantes (nome,data_nasc,cpf)
    values (${name},${data_nasc},${cpf})
    returning *
  `);
    insert = true;
  } catch (error: any) {
    return `Falha ao adicionar integrante. Erro:${error.message}`;
  }

  //Se Insert do Integrante Ok - Adiciona as outras informações
  if (insert) {
    let newIntegranteId = await pool.one(
      sql`SELECT MAX(id_integrante) FROM public.integrantes`
    );
    newIntegranteId = newIntegranteId.max;

    const insertContato = await pool.one(
      sql`insert into public.contato (id_integrante,tel_res,tel_cel,email) values(${newIntegranteId},${tel_res},${tel_cel},${email}) returning *`
    );

    const insertPlano = await pool.one(
      sql`insert into public.plano (id_integrante,plano) values(${newIntegranteId},${plano}) returning *`
    );

    const insertDescFarm = await pool.one(
      sql`insert into public.desconto_farmacia (id_integrante,ativo) values(${newIntegranteId},${desconto_farm}) returning *`
    );

    const insertResgateDom = await pool.one(
      sql`insert into public.resgate_domiciliar (id_integrante,ativo) values(${newIntegranteId},${resgate_domiciliar}) returning *`
    );
  }

  return "Integrante Cadastrado";
}

//Function Deletar Integrante
export async function deleteIntegranteById(id: number) {
  const pool = await getPool();
  try {
    const integrante = await pool.one(
      sql`SELECT * from public.integrantes where id_integrante=${id}`
    );

    const results = await pool.query(sql`
  delete from public.integrantes where id_integrante = ${id}
`);

    const success = results.rowCount === 1;

    return {
      success,
      integrante,
    };
  } catch {
    return { success: false, message: "Não foi possível deletar o integrante" };
  }
}

//Function Editar Integrante
export async function editarIntegranteById(id: number, integrante: Integrante) {
  //Validação de Dados
  const validation = await schema.createIntegranteSchema.safeParseAsync(
    integrante
  );
  if (validation.success === false) {
    return {
      success: false,
      post: null,
      errors: validation.error.errors,
    };
  }

  const {
    name,
    cpf,
    data_nasc,
    tel_cel,
    tel_res,
    email,
    plano,
    resgate_domiciliar,
    desconto_farm,
  } = validation.data;

  const pool = await getPool();
  const updateIntegrante = await pool.one(
    sql`update public.integrantes set nome=${name},cpf=${cpf},data_nasc=${data_nasc} where id_integrante=${id} returning *`
  );

  const updateContato = await pool.one(
    sql`update public.contato set tel_cel=${tel_cel},tel_res=${tel_res},email=${email} where id_integrante=${id} returning *`
  );

  const updatePlano = await pool.one(
    sql`update public.plano set plano=${plano} where id_integrante=${id} returning *`
  );

  const updateResgate = await pool.one(
    sql`update public.resgate_domiciliar set ativo=${resgate_domiciliar} where id_integrante=${id} returning *`
  );

  const updateDescFarm = await pool.one(
    sql`update public.desconto_farmacia set ativo=${desconto_farm} where id_integrante=${id} returning *`
  );

  const result = {
    ...updateIntegrante,
    ...updateContato,
    ...updatePlano,
    resgate_domiciliar: resgate_domiciliar,
    desconto_farm: desconto_farm,
  };
  return { sucess: true, result };
}

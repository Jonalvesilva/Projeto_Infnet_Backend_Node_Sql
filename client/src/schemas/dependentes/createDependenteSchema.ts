import { z } from "zod";
import * as dependenteSchema from "./schema_modules/dependenteSchema";

export const createDependenteSchema = z.object({
  name: dependenteSchema.nameSchema,
  cpf: dependenteSchema.cpfSchema,
  data_nasc: dependenteSchema.dataNascSchema,
});

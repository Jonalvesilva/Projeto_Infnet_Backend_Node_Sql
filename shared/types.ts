export type Integrante = {
  name: string;
  cpf: string;
  data_nasc: string;
  plano: string;
  resgate_ativo: boolean;
  desconto_farm: boolean;
  tel_cel: string;
  tel_res: string;
  email: string;
};

export type Dependente = {
  name: string;
  data_nasc: string;
  cpf: string;
};

export type FindParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

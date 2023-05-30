export type Integrante = {
  nome: string;
  cpf: string;
  data_nasc: string;
  plano: string;
  resgate_ativo: boolean;
  desconto_farm: boolean;
  tel_cel: string;
  tel_res: string;
  email: string;
  num_carteirinha: string;
};

export type Dependente = {
  name: string;
  data_nasc: string;
  cpf: string;
  num_carteirinha: string;
};

export type FindParams = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

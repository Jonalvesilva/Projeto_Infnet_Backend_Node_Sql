export type Integrante = {
  id_integrante?: number;
  nome: string;
  cpf: string;
  data_nasc: Date;
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
  data_nasc: Date;
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

export type Integrante = {
  name: string;
  cpf: string;
  data_nasc: string;
  plano: string;
};

export type Dependente = {
  id: number;
  cod_integrante: number;
  name: string;
  data_nasc: string;
  cpf: string;
};

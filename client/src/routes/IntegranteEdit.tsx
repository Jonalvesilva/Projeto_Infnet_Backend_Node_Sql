import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../components/TextField";
import { getIntegrante } from "../api/integrantes/getIntegrante";
import { putIntegrante } from "../api/integrantes/putIntegrante";
import { Breadcrumbs } from "../components/Breadcumbs";
import { TextNumber } from "../components/TextNumber";

function getBreadcrumbs(title: string, id: number) {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Integrantes", link: `/integrantes/` },
    { title, link: `/integrantes/${id}` },
  ];
}

const initialCreateIntegrante = {
  nome: "",
  cpf: "",
  data_nasc: "",
  plano: "",
  resgate_ativo: false,
  desconto_farm: false,
  tel_res: "",
  tel_cel: "",
  email: "",
};

export function IntegranteEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialCreateIntegrante);

  useEffect(() => {
    getIntegrante(Number(params.id)).then((results) =>
      setForm({
        nome: results.nome,
        cpf: results.cpf,
        data_nasc: results.data_nasc,
        plano: results.plano,
        resgate_ativo: results.resgate_ativo,
        desconto_farm: results.desconto_farm,
        tel_cel: results.tel_cel,
        tel_res: results.tel_res,
        email: results.email,
      })
    );
    console.log(form);
  }, []);

  return <div></div>;
}

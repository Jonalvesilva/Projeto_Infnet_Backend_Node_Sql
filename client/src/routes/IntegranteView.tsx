import { useState, useEffect } from "react";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcumbs";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { getIntegrante } from "../api/integrantes/getIntegrante";
import { deleteIntegrante } from "../api/integrantes/deleteIntegrante";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

const texts = {
  deleteSuccess: "O integrante foi deletado com sucesso!",
  deleteFailure: "Houve um erro ao deletar o integrante.",
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
};

function getBreadcrumbs() {
  return [
    { title: "Página inicial", link: "/" },
    { title: "Integrantes", link: "/integrantes" },
  ];
}

const emptyIntegrante = {
  nome: "",
  cpf: "",
  data_nasc: "",
  plano: "",
  resgate_ativo: false,
  desconto_farm: false,
  tel_res: "",
  tel_cel: "",
  email: "",
  num_carteirinha: "",
};

export function IntegranteView() {
  const params = useParams();
  const navigate = useNavigate();
  const [integrante, setIntegrante] = useState(emptyIntegrante);

  useEffect(() => {
    getIntegrante(Number(params.id)).then((res) => setIntegrante(res));
  }, []);

  async function onClickDelete() {
    const response = await deleteIntegrante(Number(params.id));
    if (response.success) {
      toast(texts.deleteSuccess);
      navigate("/integrantes");
    } else {
      toast(texts.deleteFailure);
    }
  }

  return (
    <div>
      <Breadcrumbs links={getBreadcrumbs()}></Breadcrumbs>
      <Card className="bg-white w-[90%] m-auto p-4 leading-8 rounded-md my-8 md:max-w-screen-md">
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Número Carteirinha:</h2>
            {integrante.num_carteirinha}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Nome:</h2>
            {integrante.nome}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">CPF:</h2>
            {integrante.cpf}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Data Nascimento:</h2>
            {integrante.data_nasc}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Telefone:</h2>
            {integrante.tel_res}
          </span>
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Celular:</h2>
            {integrante.tel_cel}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Email:</h2>
            {integrante.data_nasc}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Plano:</h2>
            {integrante.data_nasc}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Resgate:</h2>
            {integrante.data_nasc}
          </span>
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Desconto Farmácia:</h2>
            {integrante.data_nasc}
          </span>
        </div>
        <div className="mt-8 flex flex-row gap-4">
          <Button
            onClick={onClickDelete}
            className="bg-red-600 hover:bg-red-500 btn-text-shadow px-4 py-1 rounded-xl text-white"
          >
            Deletar
          </Button>
          <LinkButton
            className="bg-green-600 hover:bg-green-500 btn-text-shadow px-5 py-1 rounded-xl text-white"
            to={`/integrantes/editar/${params.id}`}
          >
            Editar
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
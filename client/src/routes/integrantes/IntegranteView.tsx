import { useState, useEffect } from "react";
import { LinkButton } from "../../components/LinkButton";
import { Breadcrumbs } from "../../components/Breadcumbs";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { getIntegrante } from "../../api/integrantes/getIntegrante";
import { deleteIntegrante } from "../../api/integrantes/deleteIntegrante";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { useGlobalStore } from "../../useGlobalStore";
import { FiLoader } from "react-icons/fi";

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

const date = new Date();
const emptyIntegrante = {
  nome: "",
  cpf: "",
  data_nasc: date,
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
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);

  useEffect(() => {
    getIntegrante(Number(params.id)).then((res) => setIntegrante(res));
  }, []);

  async function onClickDelete() {
    setIsLoading(true);
    const response = await deleteIntegrante(Number(params.id));
    setIsLoading(false);
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
            {integrante.data_nasc.toString()}
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
            {integrante.email}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Plano:</h2>
            {integrante.plano}
          </span>
        </div>
        <div className="flex gap-4 mb-2 py-2 border-b">
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Resgate:</h2>
            {integrante.resgate_ativo.toString()}
          </span>
          <span className="flex flex-row gap-2 md:text-xl">
            <h2 className="font-bold italic md:text-xl">Desconto Farmácia:</h2>
            {integrante.desconto_farm.toString()}
          </span>
        </div>
        <div className="mt-8 flex flex-row gap-4">
          <button
            onClick={onClickDelete}
            className="bg-red-600 hover:bg-red-500 btn-text-shadow px-4 py-1 rounded-xl text-white"
          >
            {isLoading ? (
              <FiLoader className="text-white animate-spin text-lg inline" />
            ) : (
              `Deletar`
            )}
          </button>
          <LinkButton
            className="bg-green-600 hover:bg-green-500 btn-text-shadow px-5 py-1 rounded-xl text-white"
            to={`/integrantes/${params.id}/editar/`}
          >
            Editar
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}

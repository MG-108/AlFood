import { Box, Button } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import { baseURL } from "../../utils/Api";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

interface IParametrosBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");

  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("");

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const opcoes = {
      params: {} as IParametrosBusca,
    };
    if (busca) {
      opcoes.params.search = busca;
    }
    carregarDados(`${baseURL}/api/v1/restaurantes/`, opcoes);
  };

  useEffect(() => {
    carregarDados(`${baseURL}/api/v1/restaurantes/`);
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <form onSubmit={buscar}>
        <input
          type="text"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
        <Box sx={{ margin: 2 }}>
          <label htmlFor="select-ordenacao">Ordenação</label>
          <select
            name="select-ordenacao"
            id="select-ordenacao"
            value={ordenacao}
            onChange={(evento) => setOrdenacao(evento.target.value)}
          >
            <option value="">Padrão</option>
            <option value="id">Por ID</option>
            <option value="nome">Por Nome</option>
          </select>
        </Box>
        <Button variant="outlined" sx={{ marginLeft: 2 }} type="submit">
          Buscar
        </Button>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <Button
        variant="outlined"
        onClick={() => carregarDados(paginaAnterior)}
        disabled={!paginaAnterior}
      >
        Página Anterior
      </Button>
      <Button
        variant="outlined"
        sx={{ marginLeft: 2 }}
        onClick={() => carregarDados(proximaPagina)}
        disabled={!proximaPagina}
      >
        Próxima Página
      </Button>
    </section>
  );
};

export default ListaRestaurantes;

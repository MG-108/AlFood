import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

import admin from "../../../utils/Api";

const AdministracaoPratos = () => {
  const [pratos, setpratos] = useState<IPrato[]>([]);

  useEffect(() => {
    admin.get(`pratos/`).then((resposta) => setpratos(resposta.data));
  }, []);

  const excluir = (pratoASerExcluido: IPrato) => {
    admin.delete(`pratos/${pratoASerExcluido.id}/`).then(() => {
      const listaPratos = pratos.filter(
        (prato) => prato.id !== pratoASerExcluido.id
      );
      setpratos([...listaPratos]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [
                <a href={prato.imagem} target="blank" rel="noreferrer">
                  Ver Imagem
                </a>
                ]
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/pratos/${prato.id}`}> editar</Link> ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;

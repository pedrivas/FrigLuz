import React, {useState, useEffect} from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiList } from 'react-icons/fi';

import logoImg from '../../assets/LOGO.png';

import api from '../../services/api';

import './styles.css';

export default function SimpleTable() {

  const history = useHistory();

  let rows = [];
  const [entrys, setEntrys] = useState([]);

  useEffect(() => {
    api.get('entryGroupLote').then(response => {
      setEntrys(response.data);
    })
  }, [] );

  rows = entrys;

  function handleHome() {
    history.push('/home');
  }

  function handleLogout() {
      localStorage.clear();
      history.push('/');
  }

  return (
      <>
        <header>
          <img src={logoImg} alt="FrigLuz" onClick={handleHome}/>
          <Link className="button" to="/entry/new">Lançamento</Link>
          <button type="button" onClick={handleLogout}>
              <FiLogOut size={30} color="#FFB357"/>
          </button>
        </header>
          <h1 className="title">Lotes de Entrada</h1>
          <div className="table-entry">
            <table>
              <tr>
                <th>Lote</th>
                <th align="right">Fornecedor</th>
                <th align="right">Data&nbsp;de&nbsp;Faturamento</th>
                <th align="right">Data&nbsp;de&nbsp;Expedição</th>
                <th align="right">Nota Fiscal</th>
                <th align="right">Detalhes</th>
              </tr>
              {rows.map((row) => (
                <tr key={row.lote}>
                  <td component="th" scope="row">
                    {row.lote}
                  </td>
                  <td align="right">{row.corpname}</td>
                  <td align="right">{row.bildate}</td>
                  <td align="right">{row.expdate}</td>
                  <td align="right">{row.nf}</td>
                  <td align="right">
                    <Link
                      to={{
                        pathname: `/entry/detail/${row.lote}`,
                        state: { lote:row.lote }
                      }}
                    >
                      <FiList className={"icons"} size={25} color={"#FFB357"}/>
                    </Link>
                  </td>
                </tr>
              ))}
            </table>
          </div>
      </>
  );
}
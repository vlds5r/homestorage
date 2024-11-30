import React from 'react';
import { Table, Button, ButtonGroup } from 'react-bootstrap';

/**
 * ItemTable.js
 * Komponenta pro zobrazení tabulky s položkami.
 *
 * @param {Object[]} items - Pole položek k zobrazení v tabulce.
 * @param {function} handleDelete - Funkce pro odstranění položky.
 * @param {function} handleEdit - Funkce pro úpravu položky.
 */
export default function ItemTable({ items, handleDelete, handleEdit }) {
  /**
   * Vrací JSX element reprezentující tabulku s položkami.
   */
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Název</th>
            <th>Typ</th>
            <th>Počet</th>
            <th>Koupeno</th>
            <th>Expirace</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.purchased}</td>
              <td>{item.expire}</td>
              <td>
                <ButtonGroup className="w-100">
                  <Button variant="warning" className="w-50" onClick={() => handleEdit(item)}>
                    Upravit
                  </Button>
                  <Button variant="danger" className="w-50" onClick={() => handleDelete(item.id)}>
                    Odstranit
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

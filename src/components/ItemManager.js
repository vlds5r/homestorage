import React, { useState, useEffect } from 'react';
import { fetchItems, addItem, deleteItem, updateItem } from './ItemOperations';
import ItemForm from './ItemForm';
import ItemTable from './ItemTable';


/**
 * ItemManager.js
 * Komponenta pro správu položek.
 *
 * Tato komponenta umožňuje přidávat, upravovat a odstraňovat položky.
 *
 * @returns {JSX.Element} JSX element reprezentující komponentu.
 */
export default function ItemManager() {
  /**
   * Stav položky.
   *
   * @type {Object[]}
   */
  const [items, setItems] = useState([]);

  /**
   * Vstupní hodnoty pro formulář.
   *
   * @type {Object}
   */
  const [inputName, setInputName] = useState('');
  const [inputType, setInputType] = useState('');
  const [inputQuantity, setInputQuantity] = useState('');
  const [inputPurchased, setInputPurchased] = useState('');
  const [inputExpire, setInputExpire] = useState('');

  /**
   * Stav úpravy položky.
   *
   * @type {boolean}
   */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * ID položky, která je právě upravována.
   *
   * @type {number|null}
   */
  const [currentId, setCurrentId] = useState(null);

  /**
   * Načtení položek při prvním renderingu.
   */

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems().then(setItems).catch(setError);
  }, []);

  /**
   * Odeslání formuláře.
   *
   * @param {Event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputName || !inputType || !inputQuantity || !inputPurchased) {
      alert('Název, typ, počet a datum nákupu nemohou být prázdné.');
      return;
    }

    if (isEditing) {
      await updateItem(currentId, { name: inputName, type: inputType, quantity: inputQuantity, purchased: inputPurchased, expire: inputExpire });
    } else {
      await addItem({ name: inputName, type: inputType, quantity: inputQuantity, purchased: inputPurchased, expire: inputExpire });
    }
    const refreshedItems = await fetchItems();
    setItems(refreshedItems);
    clearForm();
  };

  /**
   * Odstranění položky.
   *
   * @param {number} id
   */
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      const refreshedItems = await fetchItems();
      setItems(refreshedItems);
    } catch (error) {
      if (error.code === 'permission-denied') {
        setError('Nemáte práva mazat položky z databáze.');
        setTimeout(() => setError(null), 3000);
      } else {
        setError('Chyba při mazání položky.');
      }
    }
  };

  /**
   * Úprava položky.
   *
   * @param {Object} item
   */
  const handleEdit = (item) => {
    setInputName(item.name);
    setInputType(item.type);
    setInputQuantity(item.quantity);
    setInputPurchased(item.purchased);
    setInputExpire(item.expire);
    setCurrentId(item.id);
    setIsEditing(true);
  };

  /**
   * Vyčištění formuláře.
   */
  const clearForm = () => {
    setInputName('');
    setInputType('');
    setInputQuantity('');
    setInputPurchased('');
    setInputExpire(false);
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div>
      <div className='error-message' style={{ height: '20px' }}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <ItemForm
        inputName={inputName}
        setInputName={setInputName}
        inputType={inputType}
        setInputType={setInputType}
        inputQuantity={inputQuantity}
        setInputQuantity={setInputQuantity}
        inputPurchased={inputPurchased}
        setInputPurchased={setInputPurchased}
        inputExpire={inputExpire}
        setInputExpire={setInputExpire}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />
      <ItemTable items={items} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}
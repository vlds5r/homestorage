import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Modul pro operace s položkami v Firestore.
 *
 * Tento modul poskytuje funkce pro načtení, přidání, aktualizaci a smazání položek v Firestore.
 */
/**
 * Načte položky z Firestore.
 *
 * Tato funkce načte všechny položky z kolekce "items" v Firestore a vrátí je jako pole objektů.
 *
 * @returns {Promise<Object[]>} Pole objektů reprezentujících položky.
 */
export const fetchItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    items.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    
    // Vyextrahujeme jen názvy položek
    const nameItems = items.map(item => item.name);
    console.log('Fetched names:', nameItems);

    return items; // Vrátíme celý seznam položek
  } catch (error) {
    console.error('Error fetching items: ', error);
    return [];
  }
};

/**
 * Přidá novou položku do Firestore.
 *
 * Tato funkce přidá novou položku do kolekce "items" v Firestore a vrátí ID nově vytvořené položky.
 *
 * @param {Object} itemData Data nové položky.
 * @returns {Promise<string>} ID nově vytvořené položky.
 */
export const addItem = async (itemData) => {
  try {
    const docRef = await addDoc(collection(db, 'items'), itemData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

/**
 * Aktualizuje existující položku v Firestore.
 *
 * Tato funkce aktualizuje existující položku v kolekce "items" v Firestore.
 *
 * @param {string} id ID položky, která má být aktualizována.
 * @param {Object} updatedData Nová data položky.
 * @returns {Promise<void>}
 */
export const updateItem = async (id, updatedData) => {
  try {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, updatedData);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

/**
 * Smaže existující položku z Firestore.
 *
 * Tato funkce smaže existující položku z kolekce "items" v Firestore.
 *
 * @param {string} id ID položky, která má být smazána.
 * @returns {Promise<void>}
 */
export const deleteItem = async (id) => {
  try {
    const itemRef = doc(db, 'items', id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};
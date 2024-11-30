import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';  // Import Firebase auth

/**
 * Komponenta chráněné trasy.
 *
 * Tato komponenta zajišťuje, že pouze přihlášení uživatelé mohou přístup k chráněným trasám.
 */
/**
 * Funkční komponenta chráněné trasy.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Komponenty, které mají být vykresleny, pokud je uživatel přihlášen.
 * @returns {ReactNode}
 */
const ProtectedRoute = ({ children }) => {
  /**
   * Stav uživatele.
   *
   * @type {Object|null}
   */
  const [user, setUser] = useState(null);

  /**
   * Stav načítání.
   *
   * @type {boolean}
   */
  const [loading, setLoading] = useState(true);

  /**
   * Efekt, který se spouští při změně stavu uživatele.
   *
   * @returns {void}
   */
  useEffect(() => {
    /**
     * Funkce, která se spouští při změně stavu uživatele.
     *
     * @param {Object} user - Nový stav uživatele.
     * @returns {void}
     */
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    /**
     * Funkce, která se spouští při odhlášení komponenty.
     *
     * @returns {void}
     */
    return () => unsubscribe();  // Odhlásíme se z posluchače, když komponenta unmountuje
  }, []);

  /**
   * Pokud je načítání, zobrazíme loader.
   *
   * @returns {ReactNode}
   */
  if (loading) {
    return <div>Loading...</div>;  // Můžeš zobrazit loader během ověřování
  }

  /**
   * Pokud není uživatel přihlášen, přesměrujeme na login stránku.
   *
   * @returns {ReactNode}
   */
  if (!user) {
    return (<Navigate to='/login' />);  // Přesměrování na login, pokud není přihlášen
  }

  /**
   * Pokud je uživatel přihlášen, vykreslíme chráněnou komponentu.
   *
   * @returns {ReactNode}
   */
  return children;  // Vykreslíme chráněnou komponentu
};

export default ProtectedRoute;
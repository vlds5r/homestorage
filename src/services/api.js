import axios from 'axios';
import { fetchItems } from '../components/ItemOperations';

export const fetchRecipes = async () => {
  try {
    const items = await fetchItems(); // Načteme seznam položek z databáze
    const ingredients = items.map(item => item.name).join(', ');

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Načteme API klíč z env souboru

    // Vytvoření promptu
    const prompt = `Napiš recepty s těmito ingrediencemi: ${ingredients}`;

    // Log pro kontrolu promptu před odesláním požadavku
    console.log('Prompt to be sent:', prompt); // Vypíše prompt do konzole

    // Poslání ingrediencí v jednom požadavku
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',
        prompt: prompt, // Zde se odesílá prompt
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    // Vratíme text receptů z odpovědi
    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      // Pokud server vrátil odpověď s chybovým kódem
      console.error("Chyba API:", error.response.data.error.message);
      alert(`Chyba API: ${error.response.data.error.message}`);
    } else if (error.request) {
      // Pokud požadavek neobdržel odpověď
      console.error("Žádná odpověď od serveru:", error.request);
      alert("Žádná odpověď od serveru:", error.request);
    } else {
      // Neznámá chyba
      console.error("Chyba při odesílání požadavku:", error.message);
      alert("Chyba při odesílání požadavku:", error.message);
    }
  }
};

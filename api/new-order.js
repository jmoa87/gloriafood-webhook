const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = 'https://pos.globalfoodsoft.com/pos/order';
  const headers = {
    'Authorization': req.headers['authorization'] || 'mp4xvco43uGl5yZ88', // Usa el token recibido o el default
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Glf-Api-Version': '2',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body),
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Error en el servidor:', error); // Añade esto para ver el error en los logs de Vercel
    res.status(500).json({ error: { code: '500', message: 'A server error has occurred', details: error.message } });
  }
};

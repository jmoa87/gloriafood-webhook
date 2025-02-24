export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("Datos recibidos de GloriaFood:", req.body); // Muestra el pedido recibido
    res.status(200).json({ message: "Webhook recibido correctamente" });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}

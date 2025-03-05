// Importar el módulo 'cors' para manejar solicitudes de diferentes orígenes
import Cors from 'cors';

// Configurar CORS
const cors = Cors({
    origin: '*', // Permite solicitudes desde cualquier origen (ajusta según tus necesidades).
    methods: ['POST'], // Permite solo solicitudes POST.
});

// Función para ejecutar middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

// Manejador del endpoint
export default async function handler(req, res) {
    // Ejecutar CORS
    await runMiddleware(req, res, cors);

    // Solo permitir solicitudes POST
    if (req.method === 'POST') {
        try {
            const order = req.body; // Obtener el cuerpo de la solicitud (el pedido)
            console.log("Pedido recibido:", order);

            // Aquí puedes procesar el pedido (por ejemplo, guardarlo en una base de datos).
            // Simulamos una respuesta exitosa.
            res.status(200).json({ success: true, message: "Pedido recibido correctamente", data: order });
        } catch (error) {
            console.error("Error al procesar el pedido:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
    } else {
        // Responder con un error si el método no es POST
        res.status(405).json({ success: false, message: "Método no permitido" });
    }
}

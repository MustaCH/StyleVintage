import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-7930275530409409-020513-40be7d324eb284370351a79d5d6e467c-528853611",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  res.send("Server iniciado");
});

app.post("/create_preference", async (req, res) => {
  try {
    const items = req.body.products.map((product) => ({
      title: product.title,
      quantity: Number(product.quantity),
      unit_price: Number(product.price),
      currency_id: "ARS",
    }));

    const body = {
      items,
      back_urls: {
        success: "http://localhost:3000/confirmation",
        failure: "http://localhost:3000/declined",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});

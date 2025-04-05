require("dotenv").config();
import app from "./app"; // agora você importa o app de app.ts
import { AppDataSource } from "./data-source";
import logger from "./config/winston";

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(
        `🚀 O servidor está rodando em http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.log("Erro ao iniciar o servidor:", error));

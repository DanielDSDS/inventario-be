import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import morgan from 'morgan'
import cors from 'cors'
import compression from 'compression'
import empresasRouter from './routes/auth.routes';
import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";
import articleRoutes from "./routes/article.routes";
import { DataSource } from "typeorm"
import { User } from './entities/User';
import { Company } from './entities/Company';
import { Product } from './entities/Product';

const SQLDataSource = new DataSource({
  type: "postgres",
  host: 'raja.db.elephantsql.com',
  username: 'csfdlwld',
  database: "csfdlwld",
  password: 'igTTwZyjlvNRBge_JnTmujm6GoDAJsu3',
  entities: [User, Company, Product],
  synchronize: true,
  logging: false
})

SQLDataSource.initialize().then(async (connection) => {
  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(cors())
  app.use(express.json())

  //Routes
  app.use("/auth", authRoutes);
  app.use("/companies", companyRoutes);
  app.use("/companies/:id/articles", articleRoutes);

  const server = http.createServer(app)
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})
  .catch((error) => console.log(error));

export default SQLDataSource

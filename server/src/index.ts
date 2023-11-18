require('dotenv').config('../.env')
// В вашем основном файле
import Database from './database/db';
import * as models from './database/init';
import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';
import router from './routes/index';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';
 
const PORT = 3000;
console.log(process.env.PORT)
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

//ErrorHandling
app.use(errorHandlingMiddleware)



async function start() {
  try {
    await Database.authenticate();
    console.log('Database authenticated');
    await Database.sync();

    // Sync each model sequentially
    console.log('ready')
    for (const modelName of Object.keys(models)) {
      try {
        //@ts-expect-error
        await models[modelName].sync();
        console.log(`Model ${modelName} synchronized`);
      } catch (syncError) {
        console.error(`Error synchronizing model ${modelName}:`, syncError);
      }
    }

    app.listen(PORT, () => console.log(`Server started http://localhost:${PORT}`));
    console.log('Models synchronized');
  } catch (error) {
    console.error(error);
  }
}



start()
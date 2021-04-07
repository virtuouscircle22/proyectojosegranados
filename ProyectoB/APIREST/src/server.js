import express, {json} from 'express';

const app = express();

//Routes
    import HistoricosRoutes from "./routes/historicos.routes"; 
    import ArduinoRoutes from "./routes/arduino.routes";

//Settings
    app.set('port', process.env.PORT || 3000)

//Middlewares
    app.use(json());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Allow', 'GET, POST, OPTIONS');
        next();
    });
    
//Routes

    app.use('/historicos', HistoricosRoutes);
    app.use('/arduino', ArduinoRoutes);

export default app;
import Router from 'express';
const router = Router();
const MongoClient = require('mongodb').MongoClient;

//Database connection
import { connectArduino } from "../dbArduino";

//RUTAS PARA ARDUINO
router.post('/:id/:fechaI/:fechaF', async (req,res) => {

    const estacion = req.params.id;         //"Spain"
    const fechaInicial = new Date(req.params.fechaI);     // new Date("2020-03-19")
    const fechaFinal = new Date(req.params.fechaF);         //new Date("2020-03-25")
    const db = await connectArduino();
    const respuesta = await db.collection('DatosDispositivosFijos').aggregate(
        [
            {
                $match:{
                    ID: estacion,
                    $and:[
                        {date:{$gte:fechaInicial}},
                        {date:{$lte:fechaFinal}}
                    ]
                }
            },
            {
                $project:{
                    estacion:"$ID",
                    date: {
                        $dateFromString: {
                            dateString: {$substr: [{$dateToString:{date: "$date", format: "%Y-%m-%d"}}, 0, 10]},  // coger los 16 primeros para cuando no haya segundos
                            format: "%Y-%m-%d" // -> on-line :%S 
                        }
                    },
    
                    contaminantes:[
                        {nombre:"NO",v:"$NO"},
                        {nombre:"NH3",v:"$NH3"},
                        {nombre:"CO",v:"$CO"},
                        {nombre:"CO2",v:"$CO2"},
                        {nombre:"PM10",v:"$PM10"},
                        {nombre:"PM25",v:"$PM25"}
                    ]
                }
            },
            {
                $unwind:"$contaminantes"
            },
            {
                $group: {
                    _id:{
                        ID:"$estacion",
                        fecha:"$date",
                        contaminantes:"$contaminantes.nombre"
                    },
                    v:{
                        $avg:"$contaminantes.v"
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    estacion:"$_id.ID",
                    fecha:"$_id.fecha",
                    contaminante:"$_id.contaminantes",
                    valor:"$v"
                }
            },
            {
                $sort:{
                    fecha:1
                }
            }
        ]).toArray()


    console.log("recibido");
    res.json(respuesta);
    
})
router.get('/ultimos', async (req,res)=>{
    const db = await connectArduino();
    const spain = await db.collection('DatosDispositivosFijos').aggregate(
        [
            {
                $match:{
                    "ID":"Spain"
                }
            },
            {
                $sort:{
                    date:-1
                }
            },
            {
                $limit:1 
             },
            {
                $project:{
                    _id:0,
                    estacion:"$ID",
                    date: {
                        $dateFromString: {
                            dateString: {$substr: [{$dateToString:{date: "$date", format: "%Y-%m-%d"}}, 0, 10]},  // coger los 16 primeros para cuando no haya segundos
                            format: "%Y-%m-%d" // -> on-line :%S 
                        }
                    },
                    contaminantes:[
                        {nombre:"NO",v:"$NO"},
                        {nombre:"NH3",v:"$NH3"},
                        {nombre:"CO",v:"$CO"},
                        {nombre:"CO2",v:"$CO2"},
                        {nombre:"PM10",v:"$PM10"},
                        {nombre:"PM25",v:"$PM25"}
                    ]
                }
            },
            {
                $unwind:"$contaminantes"
            },
           {
               $project:{

                    _id:0,
                    estacion:1,
                    fecha:"$date",
                    contaminante:"$contaminantes.nombre",
                    valor:"$contaminantes.v"
               }
           }
          
            
        ]
    ).toArray()
    const greece = await db.collection('DatosDispositivosFijos').aggregate(
        [
            {
                $match:{
                    "ID":"Greece"
                }
            },
            {
                $sort:{
                    date:-1
                }
            },
            {
                $limit:1 
             },
            {
                $project:{
                    _id:0,
                    estacion:"$ID",
                    date: {
                        $dateFromString: {
                            dateString: {$substr: [{$dateToString:{date: "$date", format: "%Y-%m-%d"}}, 0, 10]},  // coger los 16 primeros para cuando no haya segundos
                            format: "%Y-%m-%d" // -> on-line :%S 
                        }
                    },
                    contaminantes:[
                        {nombre:"NO",v:"$NO"},
                        {nombre:"NH3",v:"$NH3"},
                        {nombre:"CO",v:"$CO"},
                        {nombre:"CO2",v:"$CO2"},
                        {nombre:"PM10",v:"$PM10"},
                        {nombre:"PM25",v:"$PM25"}
                    ]
                }
            },
            {
                $unwind:"$contaminantes"
            },
           {
               $project:{
                    _id:0,
                    estacion:1,
                    fecha:"$date",
                    contaminante:"$contaminantes.nombre",
                    valor:"$contaminantes.v"
               }
           }
          
            
        ]
    ).toArray()
    const bulgarian = await db.collection('DatosDispositivosFijos').aggregate(
        [
            {
                $match:{
                    "ID":"Bulgaria"
                }
            },
            {
                $sort:{
                    date:-1
                }
            },
            {
                $limit:1 
             },
            {
                $project:{
                    _id:0,
                    estacion:"$ID",
                    date: {
                        $dateFromString: {
                            dateString: {$substr: [{$dateToString:{date: "$date", format: "%Y-%m-%d"}}, 0, 10]},  // coger los 16 primeros para cuando no haya segundos
                            format: "%Y-%m-%d" // -> on-line :%S 
                        }
                    },
                    contaminantes:[
                        {nombre:"NO",v:"$NO"},
                        {nombre:"NH3",v:"$NH3"},
                        {nombre:"CO",v:"$CO"},
                        {nombre:"CO2",v:"$CO2"},
                        {nombre:"PM10",v:"$PM10"},
                        {nombre:"PM25",v:"$PM25"}
                    ]
                }
            },
            {
                $unwind:"$contaminantes"
            },
           {
               $project:{
                    _id:0,
                    estacion:1,
                    fecha:"$date",
                    contaminante:"$contaminantes.nombre",
                    valor:"$contaminantes.v"
               }
           }
          
            
        ]
    ).toArray()
    const respuesta = {
        paises:{
            spain,
            greece,
            bulgarian
        }
    }

    res.json(respuesta)
})

router.get('/portables', async (req,res)=>{
    const db = await connectArduino();

    const respuesta = await db.collection('DatosDispositivosPortables').aggregate(
        [
            {
                $match:{
                    "Coordenadas":{$exists:true}, 
                    $and:[
                        {"Coordenadas.Latitud":{$ne:NaN}},
                        {"Coordenadas.Longitud":{$ne:NaN}},
                        {"CO2":{$ne:NaN}}
                    ]
                }
            },
            {
                $project:{
                    estacion:"$ID",
                    date: "$date",
                    coordenadas:"$Coordenadas",
                    contaminantes:[
                        {nombre:"NO",v:"$NO"},
                        {nombre:"NH3",v:"$NH3"},
                        {nombre:"CO2",v:"$CO2"}
                    ]
                }
            },
            {
                $unwind:"$contaminantes"
            },
            {
                $project:{
                    _id:0,
                    estacion:"$estacion",
                    fecha:"$date",
                    contaminante:"$contaminantes.nombre",
                    valor:"$contaminantes.v",
                    lat:"$coordenadas.Latitud",
                    long:"$coordenadas.Longitud"
                }
            }
        ]).toArray()

    res.json(respuesta);
})

export default router;
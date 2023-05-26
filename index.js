const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { request, json } = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

//mysql.createConnection
const PORT          = process.env.PORT || 8082
const MYSQLPORT     = process.env.MYSQLPORT || 3306
const MYSQLHOST     = process.env.MYSQLHOST || 'localhost';
const MYSQLUSER     = process.env.MYSQLUSER || 'root';
const MYSQLDATABASE = process.env.MYSQLDATABASE || 'web18100248';
const MYSQLPASSWORD = process.env.MYSQLPASSWORD || 'AcrossTheDark2009';

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerUi = require('swagger-ui-express');
const { SwaggerTheme } = require('swagger-themes');
const theme = new SwaggerTheme('v3');

const options = {
  explorer: true,
  customCss: theme.getBuffer('dark')
};

const redoc = require('redoc-express');

const app=express();
app.use(express.json())
app.use(express.text())
app.use(morgan('combined'))
app.use(cors())

let contenidoReadMe = fs.readFileSync(path.join(__dirname,"\README.md"), { encoding: 'utf8', flag: 'r' });
let contenidoAPIDefString = fs.readFileSync(path.join(__dirname,"\apiDef.json"), { encoding: 'utf8', flag: 'r' });
let contenidoAPIDefObj = JSON.parse(contenidoAPIDefString);
contenidoAPIDefObj.info.description = contenidoReadMe;
console.log(contenidoReadMe);
// console.log(contenidoAPIDefString);
console.log(contenidoAPIDefObj);

const swaggerOptions = {
    definition: contenidoAPIDefObj, /*{
        openapi: '3.0.0',
        info: {
            title: 'API - Productos Alimenticios (Rogelio Zamarripa Treviño - 18100248)',
            version: '1.0.0',
            description: '`Descripción` de la *API* de **Productos Alimenticios** (Rogelio Zamarripa Treviño - 18100248).'
            // Sintaxis de Markdown, COLOCAR UNA IMAGEN
        },
        servers:[
            {url: "https://apifinal-production-d4ae.up.railway.app/"}
        ],
        tags:[{
            name: "productos",
            description: "Catálogo de Productos Alimenticios.",
        }],
    },*/
    apis: [`${path.join(__dirname,"./index.js")}`]
};

/**
 * @swagger
 * components:
 *   schemas:
 *     productoAlimenticio:
 *       type: object
 *       properties:
 *         codigoProducto:
 *           type: smallint
 *           description: Código identificador del producto alimenticio.
 *           example: 12
 *         nombreProducto:
 *           type: string
 *           description: Nombre del producto alimenticio.
 *           example: PAPAS CHIPS CON SAL 170GR (BOLSA MEDIANA)
 *         departamento:
 *           type: string
 *           description: Departamento al que pertenece dicho producto alimenticio ('Aceites y Mantecas', 'Bebidas alcohólicas', 'Botanas', etc.).
 *           example: Botanas
 *         proveedorProducto:
 *           type: string
 *           description: Nombre de la empresa proveedora del producto alimenticio.
 *           example: BARCEL S.A. de C.V.
 *         codigoProveedor:
 *           type: string
 *           description: Código identificador de la empresa proveedora del producto alimenticio.
 *           example: EP-56789
 *         precioCompra:
 *           type: decimal
 *           description: Precio de compra del producto alimenticio.
 *           example: 25.50
 *         precioVenta:
 *           type: decimal
 *           description: Precio de venta del producto alimenticio.
 *           example: 30.50
 *         cantProdVendidos:
 *           type: smallint
 *           description: Cantidad de productos alimenticios vendidos hasta el momento.
 *           example: 70
 *         cantProdExistentes:
 *           type: smallint
 *           description: Cantidad de productos alimenticios existentes hasta el momento.
 *           example: 80
 *         estadoProducto:
 *           type: string
 *           description: Estado de disponibilidad del producto alimenticio ('Disponible', 'No Disponible', 'Nuevo', 'Poco Inventario').
 *           example: Disponible
 *       xml:
 *         name: productoAlimenticio
 *     productoAlimenticioAEditar:
 *       type: object
 *       properties:
 *         codigoProducto:
 *           type: smallint
 *           description: Código identificador del producto alimenticio.
 *           example: 12
 *         nombreProducto:
 *           type: string
 *           description: Nombre del producto alimenticio.
 *           example: EJEMPLO NOMBRE DE PRODUCTO MODIFICADO
 *         departamento:
 *           type: string
 *           description: Departamento al que pertenece dicho producto alimenticio ('Aceites y Mantecas', 'Bebidas alcohólicas', 'Botanas', etc.).
 *           example: Aceites y Mantecas
 *         proveedorProducto:
 *           type: string
 *           description: Nombre de la empresa proveedora del producto alimenticio.
 *           example: EJEMPLO NOMBRE DE EMPRESA PROVEEDORA
 *         codigoProveedor:
 *           type: string
 *           description: Código identificador de la empresa proveedora del producto alimenticio.
 *           example: EP-98765
 *         precioCompra:
 *           type: decimal
 *           description: Precio de compra del producto alimenticio.
 *           example: 5.50
 *         precioVenta:
 *           type: decimal
 *           description: Precio de venta del producto alimenticio.
 *           example: 10.50
 *         cantProdVendidos:
 *           type: smallint
 *           description: Cantidad de productos alimenticios vendidos hasta el momento.
 *           example: 50
 *         cantProdExistentes:
 *           type: smallint
 *           description: Cantidad de productos alimenticios existentes hasta el momento.
 *           example: 0
 *         estadoProducto:
 *           type: string
 *           description: Estado de disponibilidad del producto alimenticio ('Disponible', 'No Disponible', 'Nuevo', 'Poco Inventario').
 *           example: No Disponible
 *       xml:
 *         name: productoAlimenticioAEditar
 *     respuesta:
 *       type: object
 *       properties:
 *         estatus:
 *           type: string
 *           description: Resultado de la operación realizada.
 *           example: El producto ha sido insertado/modificado/eliminado exitósamente de la base de datos.
 *     respuestaError:
 *       type: object
 *       properties:
 *         estatus:
 *           type: string
 *           description: Resultado erróneo de la operación realizada.
 *           example: ERROR DE CAPTURA - No se encontró ningún producto alimenticio con este código.
 */

/**
 * @swagger
 * /productosAlimenticios:
 *    get:
 *      tags:
 *        -  productos
 *      summary: Consulta de todos los productos alimenticios.
 *      description: Petición tipo **GET** a la ruta *'productosAlimenticios'* - Consulta de todos los productos alimenticios.
 *      responses:
 *        200:
 *          description: Consulta de todos los productos alimenticios registrados en la tabla 'productosAlimenticios', guardada en la base de datos 'web18100248'.
 */

/**
 * @swagger
 * /productosAlimenticios/{codigo}:
 *    get:
 *      tags:
 *        -  productos
 *      summary: Consulta de un sólo producto alimenticio.
 *      description: Petición tipo **GET** a la ruta *'productosAlimenticios'* - Consulta de un sólo producto alimenticio.
 *      parameters:
 *        - name: codigo
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *          description: Código identificador del producto alimenticio que se desea consultar.
 *      responses:
 *        200:
 *          description: Consulta de un solo producto alimenticio (en base a su código de producto) registrado en la tabla 'productosAlimenticios', guardada en la base de datos 'web18100248'.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/productoAlimenticio'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/productoAlimenticio'
 *        500:
 *          description: ERROR DE CAPTURA - No se encontró ningún producto alimenticio con el código ingresado / Código no válido.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/respuestaError'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/respuestaError'
 */

/**
 * @swagger
 * /productosAlimenticios:
 *    post:
 *      tags:
 *        -  productos
 *      summary: Dar de alta un producto alimenticio.
 *      description: Petición tipo **POST** a la ruta *'productosAlimenticios'* - Dar de alta un producto alimenticio.
 *      requestBody:
 *        description: Objeto de producto alimenticio creado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/productoAlimenticio'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/productoAlimenticio'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/productoAlimenticio'
 *      responses:
 *        200:
 *          description: Inserción exitosa de un producto alimenticio a la tabla 'productosAlimenticios', guardada en la base de datos 'web18100248'.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/respuesta'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/respuesta'
 *        500:
 *          description: ERROR DE CAPTURA - El producto NO se insertó a la tabla 'productosAlimenticios' / Los datos ingresados NO son válidos.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/respuestaError'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/respuestaError'
 */

/**
 * @swagger
 * /productosAlimenticios/{codigo}:
 *    delete:
 *      tags:
 *        -  productos
 *      summary: Dar de baja un producto alimenticio.
 *      description: Petición tipo **DELETE** a la ruta *'productosAlimenticios'* - Dar de baja un producto alimenticio.
 *      parameters:
 *        - name: codigo
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *          description: Código identificador del producto alimenticio que se desea eliminar.
 *      responses:
 *        200:
 *          description: Eliminación exitosa de un producto alimenticio (en base a su código de producto) registrado en la tabla 'productosAlimenticios', guardada en la base de datos 'web18100248'.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/respuesta'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/respuesta'
 *        500:
 *          description: ERROR DE CAPTURA - El producto NO se eliminó de la tabla 'productosAlimenticios' / No se encontró ningún producto alimenticio con el código ingresado.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/respuestaError'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/respuestaError'
 */

/**
 * @swagger
 * /productosAlimenticios:
 *    put:
 *      tags:
 *        -  productos
 *      summary: Actualizar los datos de un producto alimenticio.
 *      description: Petición tipo **PUT** a la ruta *'productosAlimenticios'* - Actualizar la información de un producto alimenticio con datos de formulario.
 *      requestBody:
 *        description: Actualizar los datos de un producto alimenticio existente (exceptuando su código identificador) dentro de la tabla 'productosAlimenticios'.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/productoAlimenticioAEditar'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/productoAlimenticioAEditar'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/productoAlimenticioAEditar'
 *        required: true
 *      responses:
 *        200:
 *          description: Modificación exitosa de los datos de un producto alimenticio (exceptuando su código identificador) registrado en la tabla 'productosAlimenticios', guardada en la base de datos 'web18100248'.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/respuesta'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/respuesta'
 *        500:
 *          description: ERROR DE CAPTURA - Los datos del producto NO se modificaron dentro de la tabla 'productosAlimenticios' / Los datos ingresados NO son válidos.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/respuestaError'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/respuestaError'
 */

app.get('/productosAlimenticios2', async (req, res) => {
    const connection = await mysql.createConnection({host: MYSQLHOST, port: MYSQLPORT, user: MYSQLUSER, database: MYSQLDATABASE, password: MYSQLPASSWORD});
    const [rows, fields] = await connection.execute('SELECT * FROM productosAlimenticios');
    res.json(rows);
});

//GET, POST, DELETE, PUT - Altas, Bajas, Consultas, Modificaciones

//Petición tipo GET a la ruta - CONSULTA DE TODOS LOS PRODUCTOS
app.get('/productosAlimenticios/', async(req,res) =>
{
    const connection = await mysql.createConnection({host: MYSQLHOST, port: MYSQLPORT, user: MYSQLUSER, database: MYSQLDATABASE, password: MYSQLPASSWORD});
    const [rows, fields] = await connection.execute('SELECT * FROM productosAlimenticios');
    //"SELECT * FROM productosAlimenticios WHERE codigoProducto = 'PR00002'"

    res.json(rows);
})

//Petición tipo GET a la ruta - CONSULTA DE UN PRODUCTO
app.get('/productosAlimenticios/:codigo', async(req,res) =>
{
    //EJEMPLO - IMPRIMIR producto con codigo 1: http://localhost:8081/productosAlimenticios/1
    const connection = await mysql.createConnection({host: MYSQLHOST, port: MYSQLPORT, user: MYSQLUSER, database: MYSQLDATABASE, password: MYSQLPASSWORD});
    const [rows, fields] = await connection.execute('SELECT * FROM `productosAlimenticios` WHERE `codigoProducto` = ?',[req.params.codigo]);

    if(rows.length == 0)
    {
        // res.json({registros:"ERROR DE CAPTURA: No se encontró ningún producto alimenticio con este código."});
        res.status(500).send(`ERROR DE CAPTURA: No se encontró ningún producto alimenticio con este código.`);
    }
    else
    {
        res.json(rows);
    }
})

//Petición tipo POST a la ruta - ALTA
app.post('/productosAlimenticios/', async(req,res) =>
{
    const sentenciaSQL = `INSERT INTO productosAlimenticios
    (codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto)
    VALUES('${req.body.codigoProducto}','${req.body.nombreProducto}','${req.body.departamento}','${req.body.proveedorProducto}','${req.body.codigoProveedor}',
    '${req.body.precioCompra}','${req.body.precioVenta}','${req.body.cantProdVendidos}','${req.body.cantProdExistentes}','${req.body.estadoProducto}')`;

    const connection = await mysql.createConnection({host: MYSQLHOST, port: MYSQLPORT, user: MYSQLUSER, database: MYSQLDATABASE, password: MYSQLPASSWORD});
    const [rows, fields] = await connection.execute(sentenciaSQL);

    if(rows.affectedRows == 1)
    {
        // res.json({registros:"ERROR DE CAPTURA: No se encontró ningún producto alimenticio con este código."});
        res.status(200).send(`Producto insertado exitósamente a la base de datos productosAlimenticios.`);
    }
    else
    {
        res.status(500).send(`ERROR DE CAPTURA: El producto NO se insertó a la base de datos productosAlimenticios.`);
    }
    
})

//Petición tipo DELETE a la ruta - BAJA
app.delete('/productosAlimenticios/:codigo', async(req,res) =>
{
    const codigoProductoAlimenticio = req.params.codigo;
    //EJEMPLO - BORRAR producto con codigo 1: http://localhost:8081/productosAlimenticios/1
    const connection = await mysql.createConnection({host: MYSQLHOST, port: MYSQLPORT, user: MYSQLUSER, database: MYSQLDATABASE, password: MYSQLPASSWORD});
    const [rows, fields] = await connection.execute('DELETE FROM `productosAlimenticios` WHERE `codigoProducto` = ?',[codigoProductoAlimenticio]);

    if(rows.affectedRows == 1)
    {
        res.send(`El producto ha sido eliminado exitósamente de la base de datos.`);
    }
    else
    {
        res.send(`ERROR DE CAPTURA: No se encontró ningún producto alimenticio con este código.`);
    }
})

//Petición tipo PUT a la ruta - MODIFICACION
app.put('/productosAlimenticios/', async(req,res) =>
{
    const sentenciaSQLModificar = `UPDATE productosAlimenticios
    SET nombreProducto = '${req.body.nombreProducto}', departamento = '${req.body.departamento}', proveedorProducto = '${req.body.proveedorProducto}', codigoProveedor = '${req.body.codigoProveedor}',
    precioCompra = '${req.body.precioCompra}', precioVenta = '${req.body.precioVenta}', cantProdVendidos = '${req.body.cantProdVendidos}', cantProdExistentes = '${req.body.cantProdExistentes}',
    estadoProducto = '${req.body.estadoProducto}' WHERE codigoProducto = '${req.body.codigoProducto}'`;

    const connection = await mysql.createConnection({host: MYSQLHOST, port: MYSQLPORT, user: MYSQLUSER, database: MYSQLDATABASE, password: MYSQLPASSWORD});
    const [rows, fields] = await connection.execute(sentenciaSQLModificar);

    if(rows.affectedRows == 1)
    {
        // res.json({registros:"ERROR DE CAPTURA: No se encontró ningún producto alimenticio con este código."});
        res.status(200).send(`Producto modificado exitósamente dentro de la base de datos productosAlimenticios.`);
    }
    else
    {
        res.status(500).send(`ERROR DE CAPTURA: El producto NO se modificó dentro de la base de datos productosAlimenticios.`);
    }
})

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

app.get("/docs/json",(req,res)=>
{
    res.json(swaggerDocs)
})

app.get(
    '/redocs',
    redoc({
      title: 'API Docs',
      specUrl: '/docs/json', /* /docs/swagger.json */
      nonce: '', // <= it is optional,we can omit this key and value
      // we are now start supporting the redocOptions object
      // you can omit the options object if you don't need it
      // https://redocly.com/docs/api-reference-docs/configuration/functionality/
      redocOptions: {
        theme: {
          colors: {
            primary: {
              main: '#6EC5AB'
            }
          },
          typography: {
            fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
            fontSize: '15px',
            lineHeight: '1.5',
            code: {
              code: '#87E8C7',
              backgroundColor: '#4D4D4E'
            }
          },
          menu: {
            backgroundColor: '#ffffff'
          }
        }
      }
    })
  );


app.use((req,res)=> 
{ 
    res.status(404).json({estado: "Pagina = Ruta No Encontrada"})
})

app.listen(PORT,()=>
{
    console.log(`Servidor Express corriendo y escuchando en el puerto ${PORT} - Rogelio Zamarripa Treviño (18100248)`)
})

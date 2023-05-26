/* SCRIPT DE CREACION DE BASE DE DATOS web18100248 Y TABLA productosAlimenticios */
drop database web18100248;

create database web18100248;
use web18100248;

/* CREACION DE TABLA DE PRODUCTOS ALIMENTICIOS */
CREATE TABLE productosAlimenticios (
    codigoProducto SMALLINT NOT NULL,
    nombreProducto VARCHAR(100) NOT NULL,
    departamento VARCHAR(70) NOT NULL,
    proveedorProducto VARCHAR(50) NOT NULL,
    codigoProveedor VARCHAR(8) NOT NULL,
    precioCompra DECIMAL(4 , 2 ) NOT NULL,
    precioVenta DECIMAL(4 , 2 ) NOT NULL,
    cantProdVendidos SMALLINT NOT NULL,
    cantProdExistentes SMALLINT NOT NULL,
    estadoProducto VARCHAR(30) NOT NULL,
    CONSTRAINT pk_productosAlimenticios PRIMARY KEY (codigoProducto),
    CONSTRAINT ck_productosAlimenticios_departamento CHECK (departamento = 'Abarrotes'
        OR departamento = 'Aceites y mantecas'
        OR departamento = 'Alimentos preparados'
        OR departamento = 'Arroz, pasta y semillas'
        OR departamento = 'Bebidas'
        OR departamento = 'Bebidas alcohólicas'
        OR departamento = 'Botanas'
        OR departamento = 'Dulcería'
        OR departamento = 'Frutas y verduras'
        OR departamento = 'Galletas y postres'
        OR departamento = 'Harinas y pan'
        OR departamento = 'Huevos y carnes frías'
        OR departamento = 'Lácteos'
        OR departamento = 'Pescados y mariscos'
        OR departamento = 'Productos enlatados'
        OR departamento = 'Productos congelados y/o refrigerados'),
    CONSTRAINT ck_productosAlimenticios_estadoProducto CHECK (estadoProducto = 'Disponible'
        OR estadoProducto = 'No Disponible'
        OR estadoProducto = 'Nuevo'
        OR estadoProducto = 'Poco Inventario')
);

/* INSERCION DE DATOS */
/* TABLA productosAlimenticios */
insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(1, 'PAPAS SABRITAS ORIGINAL', 'Botanas', 'SABRITAS', 'EP-12345', 9.00, 12.50, 50, 5, 'Poco Inventario');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(2, 'BARRA DE PAN BLANCO BIMBO 680G', 'Harinas y Pan', 'GRUPO BIMBO', 'EP-02345', 24.00, 33.50, 40, 30, 'Disponible');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(3, 'REFRESCO PEPSI 2 LITROS', 'Bebidas', 'PEPSICO', 'EP-60080', 17.50, 23.00, 60, 5, 'Poco Inventario');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(4, 'ATUN EN HOJUELAS EN AGUA', 'Productos enlatados', 'HERDEZ', 'EP-24035', 14.30, 19.50, 35, 25, 'Disponible');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(5, 'LECHE LALA ENTERA 1 LITRO', 'Lácteos', 'GRUPO LALA', 'EP-01986', 19.00, 25.80, 0, 40, 'Nuevo');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(6, 'CAJA GALLETAS CHOKIS (6 PAQUETES)', 'Galletas y postres', 'GRUPO GAMESA', 'EP-98765', 25.00, 37.50, 50, 30, 'Disponible');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(7, 'PAQUETE HUEVO BLANCO 30 PIEZAS', 'Huevos y carnes frías', 'VILLA FARMS', 'EP-45773', 40.00, 52.50, 20, 5, 'Poco Inventario');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(8, 'PASTILLAS SABOR MENTA 14.5GR', 'Abarrotes', 'TIC TAC', 'EP-66511', 6.50, 10.00, 0, 50, 'Disponible');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(9, 'PAPAS SABRITAS ADOBADAS', 'Botanas', 'SABRITAS', 'EP-98777', 10.00, 13.30, 50, 10, 'Poco Inventario');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(10, 'PASTELITOS MARINELA PINGUINOS 80GR', 'Dulcería', 'MARINELA', 'EP-02121', 11.30, 14.50, 60, 35, 'Disponible');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(11, 'PASTELITO MARINELA GANSITO 50GR', 'Dulcería', 'MARINELA', 'EP-51667', 8.00, 10.25, 60, 0, 'No Disponible');

insert into productosAlimenticios(codigoProducto, nombreProducto, departamento, proveedorProducto, codigoProveedor, precioCompra, 
precioVenta, cantProdVendidos, cantProdExistentes, estadoProducto) values
(12, 'CAJA GALLETAS CANELITAS (6 PAQUETES)', 'Galletas y postres', 'MARINELA', 'EP-03360', 15.00, 23.50, 0, 40, 'Nuevo');

select * from productosAlimenticios;

CREATE DATABASE contadordb;

USE contadordb;

CREATE TABLE roles (
    idroles INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    rol_nombre VARCHAR(60) NOT NULL
);

CREATE TABLE usuarios (
  idusuarios  INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  roles_idroles INT(10),
  usu_nombre VARCHAR(200) NOT NULL,
  usu_email  VARCHAR(60) NOT NULL,
  usu_usuario  VARCHAR(60) NOT NULL,
  usu_password  VARCHAR(300) NOT NULL,
  usu_token  VARCHAR(300) NOT NULL,
  CONSTRAINT fk_rol FOREIGN KEY(roles_idroles) REFERENCES roles(idroles)
);

CREATE TABLE departamentos (
  iddepartamentos INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  dep_codigo INT(20) NOT NULL,
  dep_nombre VARCHAR(100) NOT NULL
);

CREATE TABLE log_transactions (
  idlog_transactions INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  log_transactions VARCHAR(50) NOT NULL,
  wse_token VARCHAR(200) NOT NULL
);


CREATE TABLE menus (
  idmenus INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  men_nombre VARCHAR(100) NOT NULL,
  men_url VARCHAR(100) NOT NULL,
  men_orden VARCHAR(100) NOT NULL,
  men_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE permisos (
  idpermisos INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  per_crear VARCHAR(100) NOT NULL,
  per_editar VARCHAR(100) NOT NULL,
  per_eliminar VARCHAR(100) NOT NULL,
  per_menu INT(10) NOT NULL,
  per_role INT(10) NOT NULL,
  CONSTRAINT fk_menu FOREIGN KEY(per_menu) REFERENCES menus(idmenus),
  CONSTRAINT fk_role FOREIGN KEY(per_role) REFERENCES roles(idroles)
);

CREATE TABLE ciudades (
  idciudades INT(10) NOT NULL  UNIQUE AUTO_INCREMENT PRIMARY KEY,
  ciu_codigo INT(10) NOT NULL,
  ciu_nombre VARCHAR(100) NOT NULL,
  ciu_iddepartamento INT(10) NOT NULL,
  CONSTRAINT fk_dpto FOREIGN KEY(ciu_iddepartamento) REFERENCES departamentos(iddepartamentos)

);



CREATE TABLE clientes(
  idclientes  INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  cli_nombre  VARCHAR(100) NOT NULL,
  cli_nit INT(10) NOT NULL,
  cli_email  VARCHAR(60) NOT NULL,
  cli_telefono  VARCHAR(20) NOT NULL,
  cli_contacto VARCHAR(60) NOT NULL,
  cli_ciudad INT(10) NOT NULL,
  CONSTRAINT fk_ciudad FOREIGN KEY(cli_ciudad) REFERENCES ciudades(idciudades)
);

CREATE TABLE tiposterceros (
  idtiposterceros INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  tte_nombre VARCHAR(100) NOT NULL
);

CREATE TABLE terceros (
  idterceros INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  ter_tipo INT(10) NOT NULL,
  ter_nombre VARCHAR(100) NOT NULL,
  ter_identificacion INT(10) NOT NULL,
  ter_telefono INT(20) NOT NULL,
  ter_direccion INT(60) NOT NULL,
  ter_ciudad INT(10) NOT NULL,
  ter_contacto VARCHAR(60) NOT NULL,
  ter_email VARCHAR(60) NOT NULL,
CONSTRAINT fk_ciudades FOREIGN KEY(ter_ciudad) REFERENCES ciudades(idciudades),
CONSTRAINT fk_tiposterceros FOREIGN KEY(ter_tipo) REFERENCES tiposterceros(idtiposterceros),
CONSTRAINT fk_clientes FOREIGN KEY(ter_identificacion) REFERENCES clientes(idclientes)

  
) ;

 CREATE TABLE tiposproducto (
  idtiposproducto INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  tip_nombre VARCHAR(200) NOT NULL
);

CREATE TABLE categoria (
  idcategorias INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  cat_nombre VARCHAR(200) NOT NULL
);


CREATE TABLE productos (
  idproductos INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  pro_tipo INT(10) NOT NULL,
  pro_categoria INT(10) NOT NULL,
  pro_terceros INT(10) NOT NULL,
  pro_nombre VARCHAR(200) NOT NULL,
  pro_codigo INT(20) NOT NULL,
  pro_descripcion TEXT,
  pro_precio INT(20) NOT NULL,
  pro_unidad INT(10) NOT NULL,
  CONSTRAINT fk_tiposproducto FOREIGN KEY(pro_tipo) REFERENCES tiposproducto(idtiposproducto),
  CONSTRAINT fk_categoria FOREIGN KEY(pro_categoria) REFERENCES categoria(idcategorias),
  CONSTRAINT fk_ter FOREIGN KEY(pro_terceros) REFERENCES terceros(idterceros)
 
 );



CREATE TABLE documentos (
  iddocumentos INT(10) NOT NULL  UNIQUE AUTO_INCREMENT PRIMARY KEY,
  doc_nombre  VARCHAR(200) NOT NULL,
  doc_url VARCHAR(300) ,
  doc_tabla VARCHAR(100) ,
  doc_idviene VARCHAR(100) ,
  doc_version VARCHAR(100) 
);

CREATE TABLE categoriaspuc (
  idcategoriaspuc INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  cap_nombre  VARCHAR(200) NOT NULL,
  cap_codigo INT(20) NOT NULL
);

CREATE TABLE puc (
  idpuc INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  puc_categoria INT(10) NOT NULL,
  puc_cliente INT(10) NOT NULL,
  puc_nombre  VARCHAR(200) NOT NULL,
  puc_codigo INT(20) NOT NULL,
  CONSTRAINT fk_tcategoriaspuc FOREIGN KEY(puc_categoria) REFERENCES categoriaspuc(idcategoriaspuc),
  CONSTRAINT fk_clientepuc FOREIGN KEY(puc_cliente) REFERENCES clientes(idclientes)
);

CREATE TABLE tipostransacciones (
  idtipostransacciones INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  ttr_nombre  VARCHAR(200) NOT NULL
);

CREATE TABLE transacciones(
  idtransacciones INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  tra_tipo INT(10) NOT NULL,
  tra_tercero INT(10) NOT NULL,
  tra_producto INT(10) NOT NULL,
  tra_puc INT(10) NOT NULL,
  tra_numero INT(100) NOT NULL,
  tra_valor INT(100) NOT NULL,
  tra_descripcion TEXT,
  tra_estadopgo VARCHAR(2),
  CONSTRAINT fk_tcipostrans FOREIGN KEY(tra_tipo) REFERENCES tipostransacciones(idtipostransacciones),
  CONSTRAINT fk_terce FOREIGN KEY(tra_tercero) REFERENCES terceros(idterceros),
  CONSTRAINT fk_productos FOREIGN KEY(tra_producto) REFERENCES productos(idproductos),
  CONSTRAINT fk_puc FOREIGN KEY(tra_puc) REFERENCES puc(idpuc)
);

CREATE TABLE inventarios (
  idinventarios INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  inv_proiducto INT(10) NOT NULL,
  inv_cantidad INT(100) NOT NULL,
  inv_ingreso INT(100) NOT NULL,
  inv_egreso INT(100) NOT NULL,
 CONSTRAINT fk_produ FOREIGN KEY(inv_proiducto) REFERENCES productos(idproductos)
  );

CREATE TABLE nomina (
  idnomina INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  nom_cliente INT(10) NOT NULL ,
  nom_nombre  VARCHAR(200) NOT NULL,
  nom_cedula INT(10) NOT NULL,
  nom_email  VARCHAR(60) NOT NULL,
  nom_telefono INT(20) NOT NULL,
  nom_direccion VARCHAR(60) NOT NULL,
  nom_salario INT(100) NOT NULL,

  CONSTRAINT fk_client FOREIGN KEY(nom_cliente) REFERENCES clientes(idclientes)

);

CREATE TABLE liquidacion_nomina (
  idliqnomina INT(10) NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  lnom_valor INT(0) NOT NULL,
  lnom_fecha DATE,
  lnom_salud INT(100) NOT NULL,
  lnom_arl INT(100) NOT NULL,
  lnom_caja INT(100) NOT NULL,
  lnom_cesantias INT(100) NOT NULL,
  lnom_prima INT(100) NOT NULL,
  lnom_nomima INT(10) NOT NULL,
 CONSTRAINT fk_nom FOREIGN KEY(lnom_nomima) REFERENCES nomina(idnomina)
  );



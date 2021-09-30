INSERT INTO roles (rol_nombre)
VALUES ('usuario'),
('administrador'),
('cliente');

INSERT INTO tiposterceros (tte_nombre)
VALUES ('comprador'),
('vendedor'),
('mixto');

INSERT INTO tipostransacciones (ttr_nombre)
VALUES ('FACTURA COMPRA'),
       ('FACTURA VENTA'),
       ('EGRESOS') ,
       ('RECIBOS'), 
       ('NOMINA'),
       ('AJUSTES VARIOS');
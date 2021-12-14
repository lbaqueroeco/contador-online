import axios from 'axios';
import global from '../Global';
import swal from 'sweetalert';

export const guarda = (arreglo, direccion, tabela) => 
{
    axios.post(global.url+"" + direccion , arreglo, global.autentica)
    .then(res =>{
        swal(tabela + ' creado', 'Se ha creado el ' + tabela + ' correctamente', 'success' );
    }).catch((error) => {
        swal(tabela + " no creado", "Hubo un error al crear el " + tabela, "error");
    });
}

export const actualiza = (arreglo, direccion, tabela, id) =>
{
    axios.put(global.url + "" + direccion + "/" + id, arreglo, global.autentica).then(res =>{
      swal(tabela + ' editado', 'Se ha editado el ' + tabela + ' correctamente', 'success' );
    }).catch((error) => {
        swal(tabela + " no editado", "Hubo un error al editar el " + tabela, "error");
    });
}

export const eliminar = (direccion, tabela, id) =>
{
    swal({
        title: "Está seguro?", text: "Una vez lo elimine no podrá recuperarlo!",
        icon: "warning", buttons: true, dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(global.url+ direccion + "/" + id, 
          global.autentica)
          .then((res) => { swal("Registro Eliminado", "Se ha eliminado el registro", "success"); });
        } else {
          swal("Eliminación cancelada");
        }
      }).catch((error) => {
        console.log(error);
        swal("Error al eliminar", "Hubo un error al intentar eliminar el registro", "error");
      });
}


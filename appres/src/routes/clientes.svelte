<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore();


let cliente = {
  nombre: '',
  direccion: '',
  email: '',
  telefono: 0

};

let editEstatus = false;
let objclientes = [];
let clienteId;

db.collection('Clientes').onSnapshot(querySnapshot => {
  let docs = []
  querySnapshot.forEach(doc => {
    docs.push({
      ...doc.data(),
      id: doc.id
    });
  })
  objclientes = [...docs]
  console.log(objclientes)
});

const Addcliente = async () => {
  await db.collection('Clientes').doc().set(cliente);
  console.log('cliente creado', cliente);
};

const Enviar = () => {
  if (!editEstatus) {
    Addcliente();
    
  } else {
    console.log('udating')
    Update();
    
  }
  
  cliente = {
    nombre: '',
    direccion: '',
    email: '',
    telefono: 0
  };
  editEstatus= false;
};


const Delete = async (id)=> {
 await db.collection('Clientes').doc(id).delete();
  console.log(id);
};

const Editar = (Upcliente) => {
  editEstatus=true;
  cliente.nombre = Upcliente.nombre;
  cliente.direccion = Upcliente.direccion;
  cliente.telefono = Upcliente.telefono;
  cliente.email = Upcliente.email;
  clienteId = Upcliente.id;
};

const Update = async () => {
  await db.collection('Clientes').doc(clienteId).update(cliente);
  
}

const Cancelar = () => {
  editEstatus = false;
  cliente = {
    nombre: '',
    direccion: '',
    email: '',
    telefono: 0
  };
}


</script>


<svelte:head>
  <title>Clientes</title>
</svelte:head>

<h1>Clientes</h1>

<p>Ingresar nuevos clientes...</p>

<div class="container-sm">
  <form on:submit|preventDefault={Enviar}>

    <div class="form-group row">
      <label for="nombre" class="col-sm-2 col-form-label">Nombre</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" placeholder="Nombre" bind:value={cliente.nombre}>
      </div>
    </div>
    <div class="form-group row">
      <label for="direccion" class="col-sm-2 col-form-label">Dirección</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" placeholder="Dirección" bind:value={cliente.direccion}>
      </div>
    </div>

    <div class="form-group row">
      <label for="telefono" class="col-sm-2 col-form-label">Teléfono</label>
      <div class="col-sm-10">
        <input type="number" class="form-control" placeholder="Teléfono" bind:value={cliente.telefono}>
      </div>
    </div>

    <div class="form-group row">
      <label for="email" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" placeholder="Email" bind:value={cliente.email}>
      </div>
    </div>

    <div class="table-title">
      <div class="row">
        <div class="col-sm-8">
        </div>
        <div class="col-sm-4">
          {#if !editEstatus}
             <button type="submit" class="btn btn-info add-new"><i class="fa fa-plus"></i> Add New</button>
             {:else}
               <button type="submit" class="btn btn-info add-new"><i class="fa fa-edit"></i> Update </button>
               <button on:click={Cancelar} class="btn btn-info add-new"><i class="fa fa-close"></i> Cancel </button>
          {/if}
          
        </div>
      </div>
    </div>

  </form>
</div>

<div class="container-lg">
  <div class="table-responsive">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-8">
            <h2>Clientes <b>Detalles</b></h2>
          </div>
        </div>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each objclientes as cliente }
                    <tr>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.telefono}</td>
                        <td>
                            <button class="delete" title="Delete" data-toggle="tooltip" on:click={Delete(cliente.id)} ><i class="material-icons">&#xE872;</i></button>
                            <button class="edit" title="Update" data-toggle="tooltip" on:click={Editar(cliente)} ><i class="material-icons">&#xE254;</i></button>
                            
                        </td>
                    </tr>
          {/each}  
         </tbody>
        </table>
        </div>
    </div>
</div>     

<style>
.table-wrapper {
  width: 700px;
  margin: 30px auto;
  background: #fff;
  padding: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.table-title {
  padding-bottom: 10px;
  margin: 0 0 10px;
}

.table-title h2 {
  margin: 6px 0 0;
  font-size: 22px;
}

.table-title .add-new {
  float: right;
  height: 30px;
  font-weight: bold;
  font-size: 12px;
  text-shadow: none;
  min-width: 100px;
  border-radius: 50px;
  line-height: 13px;
}

.table-title .add-new i {
  margin-right: 4px;
}

table.table {
  table-layout: fixed;
}

table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
}

table.table th:last-child {
  width: 100px;
}

table.table td a {
  cursor: pointer;
  display: inline-block;
  margin: 0 5px;
  min-width: 24px;
}

table.table td a.add {
  color: #27C46B;
}

table.table td button.edit {
  background: none;
  border: none;
  color: #FFC107;
}

table.table td button.delete {
  background: none;
  border: none;
  color: #E34724;
}

table.table td i {
  font-size: 19px;
}

table.table td a.add i {
  font-size: 24px;
  margin-right: -1px;
  position: relative;
  top: 3px;
}

table.table td .add {
  display: none;
}
</style>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore();


let mesa = {
  nummesa: '',
  estado: false,
  numpuestos: 0
 
};

let editEstatus = false;
let objmesas = [];
let mesaId;

db.collection('Mesas').onSnapshot(querySnapshot => {
  let docs = []
  querySnapshot.forEach(doc => {
    docs.push({
      ...doc.data(),
      id: doc.id
    });
  })
  objmesas = [...docs]
  console.log(objmesas)
});

const Addcliente = async () => {
  await db.collection('Mesas').doc().set(mesa);
  console.log('mesa creada', mesa);
};

const Enviar = () => {
  if (!editEstatus) {
    Addcliente();
    
  } else {
    console.log('updating..')
    Update();
    
  }
  
  mesa = {
  nummesa: '',
  estado: false,
  numpuestos: 0
 
  };
  editEstatus= false;
};


const Delete = async (id)=> {
 await db.collection('Mesas').doc(id).delete();
  console.log(id);
};

const Editar = (Upmesa) => {
  editEstatus=true;
  mesa.nummesa = Upmesa.nummesa;
  mesa.estado = Upmesa.estado;
  mesa.numpuestos = Upmesa.numpuestos;
  mesaId = Upmesa.id;
};

const Update = async () => {
  await db.collection('Mesas').doc(mesaId).update(mesa);
  
}

const Cancelar = () => {
  editEstatus = false;
  mesa = {
  nummesa: '',
  estado: false,
  numpuestos: 0
  };
}


</script>


<svelte:head>
  <title>Mesas</title>
</svelte:head>

<h1>Mesas</h1>

<p>Ingresar nuevos mesa...</p>

<div class="container-sm">
  <form on:submit|preventDefault={Enviar}>

    <div class="form-group row">
      <label for="nummesa" class="col-sm-2 col-form-label">Número Mesa</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" placeholder="Número de mesa" bind:value={mesa.nummesa}>
      </div>
    </div>
    <div class="form-group row">
      <label for="estado" class="col-sm-2 col-form-label">Estado</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" placeholder="Estado" bind:value={mesa.estado}>
      </div>
    </div>

    <div class="form-group row">
      <label for="numpuestos" class="col-sm-2 col-form-label">Número de puestos</label>
      <div class="col-sm-10">
        <input type="number" class="form-control" placeholder="Número de puestos" bind:value={mesa.numpuestos}>
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
            <h2>Mesas <b>Detalles</b></h2>
          </div>
        </div>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Número de mesa</th>
            <th>Estado</th>
            <th>Número de puestos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each objmesas as mesa }
                    <tr>
                        <td>{mesa.nummesa}</td>
                        <td>{mesa.estado}</td>
                        <td>{mesa.numpuestos}</td>
                        <td>
                            <button class="delete" title="Delete" data-toggle="tooltip" on:click={Delete(mesa.id)} ><i class="material-icons">&#xE872;</i></button>
                            <button class="edit" title="Update" data-toggle="tooltip" on:click={Editar(mesa)} ><i class="material-icons">&#xE254;</i></button>
                            
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

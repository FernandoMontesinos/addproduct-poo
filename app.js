document.addEventListener('DOMContentLoaded', () => {
    capturarEventos();
})

class Producto {
    constructor(nombre, precio, year) {
        this.nombre = nombre;
        this.precio = precio;
        this.year = year;
    }


}

class UI {
    agregarProducto(producto) {
        const productList = document.getElementById("product-list");
        const elemento = document.createElement('DIV');
        elemento.innerHTML = `
       <div class="card text-center mb-4">
          <div class="card-body">
               <strong>Nombre del Producto:  </strong> ${producto.nombre}           
               <strong>Precio del Producto:  </strong> ${producto.precio}           
               <strong>Año del Producto:  </strong> ${producto.year}           
               <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
            </div>
       </div>
       `
        productList.appendChild(elemento);
    }

    resetForm() {
        document.getElementById("product-form").reset();
    }

    eliminarProducto(elemento) {
        if(elemento.name === 'delete'){
            elemento.parentElement.parentElement.parentElement.remove();
            this.alertaMostrar('Producto Eliminado', 'danger');
        }
    }

    alertaMostrar(mensaje, cssClass) {
         const contenedorAlerta =  document.createElement('DIV');
         contenedorAlerta.className = `alert alert-${cssClass} mt-4`;
         contenedorAlerta.appendChild(document.createTextNode(mensaje));
         //Mostar en el DOM
         const container  = document.querySelector('.container');
         const app = document.querySelector('#App');
         container.insertBefore(contenedorAlerta, app);
         setTimeout(() => {
             document.querySelector('.alert').remove();
         }, 3000);
    }
}

// Eventos del DOM
const capturarEventos = () => {
    // Evento de enviar el formulario
    document.getElementById('product-form').addEventListener("submit", e => {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;


        const producto = new Producto(name, price, year);

        const ui = new UI();

        if(name === '' || price === '' || year === ''){
            return ui.alertaMostrar('Faltan Datos ', 'info')
        }
        ui.agregarProducto(producto);
        ui.resetForm();
        ui.alertaMostrar('Producto agregado satisfactoriamente', 'success');

        e.preventDefault();

    });

   // Evento de Eliminar del documento
   document.getElementById("product-list").addEventListener('click', (e) => {
        const ui = new UI();
        ui.eliminarProducto(e.target);
   })
}

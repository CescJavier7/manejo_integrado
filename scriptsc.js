document.addEventListener('DOMContentLoaded', () => {     // Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script.
// Obtiene el elemento de entrada de búsqueda por su ID
const searchInput = document.getElementById('search');
// Obtiene el contenedor de sugerencias por su ID
const suggestions = document.getElementById('suggestions');
// Obtiene el primer elemento de producto por su ID
const product1 = document.getElementById('product1');
// Obtiene el segundo elemento de producto por su ID
const product2 = document.getElementById('product2');
// Obtiene el botón de comparación por su ID
const compareBtn = document.getElementById('compare-btn');
// Obtiene el botón de actualización por su ID
const refreshBtn = document.getElementById('refresh-btn');
// Obtiene el contenedor de resultados por su ID
const result = document.getElementById('result');
// Obtiene el botón para mostrar información por su ID
const showInfoBtn = document.getElementById('show-info-btn');
// Obtiene el elemento modal de información por su ID
const infoModal = document.getElementById('info-modal');

 // Obtiene referencias a los elementos del DOM necesarios para la funcionalidad de la página.


    const productos = [         // Lista de productos con ID, nombre y tipo.
        { id: 1, nombre: 'Metalaxil + Propamocarb', tipo: 'Fungicida' },
        { id: 2, nombre: 'Tebuconazol', tipo: 'Fungicida' },
        { id: 3, nombre: 'Dimetimorph', tipo: 'Fungicida' },
        { id: 4, nombre: 'Difeconazole', tipo: 'Fungicida' },
        { id: 5, nombre: 'Azoxystrobin', tipo: 'Fungicida' },
        { id: 6, nombre: 'Clorotalonil', tipo: 'Fungicida' },
        { id: 7, nombre: 'Clorpirifos + Cipermetrina', tipo: 'Insecticida' },
        { id: 8, nombre: 'Deltrametrina', tipo: 'Insecticida' },
        { id: 9, nombre: 'Lambda-chyhalotrin', tipo: 'Insecticida' },
        { id: 10, nombre: 'Imidacloprid', tipo: 'Insecticida' },
        { id: 11, nombre: 'Malathion', tipo: 'Insecticida' },
        { id: 12, nombre: 'Nicosulfuron', tipo: 'Herbicida' },
        { id: 13, nombre: 'Tifensulfuron - methyl', tipo: 'Herbicida' },
        { id: 14, nombre: 'Glifosato', tipo: 'Herbicida' }

    ];

    const compatibilidades = [         // Lista de compatibilidades entre productos.
        { producto1: 1, producto2: 7, compatible: true },
        { producto1: 1, producto2: 8, compatible: true },
        { producto1: 1, producto2: 9, compatible: true },
        { producto1: 1, producto2: 10, compatible: true },
        { producto1: 1, producto2: 11, compatible: true },
        { producto1: 2, producto2: 9, compatible: true },
        { producto1: 2, producto2: 10, compatible: true },
        { producto1: 3, producto2: 7, compatible: true },
        { producto1: 3, producto2: 8, compatible: true },
        { producto1: 3, producto2: 9, compatible: true },
        { producto1: 3, producto2: 10, compatible: true },
        { producto1: 3, producto2: 11, compatible: true },
        { producto1: 4, producto2: 7, compatible: true },
        { producto1: 4, producto2: 8, compatible: true },
        { producto1: 4, producto2: 9, compatible: true },
        { producto1: 4, producto2: 10, compatible: true },
        { producto1: 4, producto2: 11, compatible: true },
        { producto1: 5, producto2: 7, compatible: true },
        { producto1: 5, producto2: 8, compatible: true },
        { producto1: 5, producto2: 9, compatible: true },
        { producto1: 5, producto2: 10, compatible: true },
        { producto1: 5, producto2: 11, compatible: true },
        { producto1: 6, producto2: 7, compatible: true },
        { producto1: 6, producto2: 8, compatible: true },
        { producto1: 6, producto2: 9, compatible: true },
        { producto1: 6, producto2: 10, compatible: true },
        { producto1: 6, producto2: 11, compatible: true }

    ];

    const informacionProductos = {         // Información detallada sobre productos específicos.
        10: {
            tipo: 'Insecticida',
            ingredienteActivo: 'Imidacloprid',
            codigo: 'IRAC Grupo 4A',
            grupoQuimico: 'Neonicotinoides',
            mecanismoAccion: 'Moduladores competitivos del receptor nicotínico de acetilcolina (nAChR)',
            modoAccion: 'Sistémico, contacto e ingestión',
            pesoMolecular: '255,66 g/mol',
            nombreIUPAC: '(NE)-N-[1-[(6-cloropiridin-3-il)metil]imidazolidin-2-ilideno]nitramida',
            formulaMolecular: 'C9H10ClN5O2',
            cultivo: 'Banano, Maíz, Arroz, Tomate de riñon, Rosas, Hypericum, Brócoli, Fréjol, Cebolla, Sandía',
            plaga: 'Mosca blanca, Saltón, Chinche tigre, Mosca Minadora, Sogata, Pulgón, Trips, Paratrioza',
            compatibilidad: 'No mezclar con productos alcalinos'
        },
        11: {
            tipo: 'Insecticida',
            ingredienteActivo: 'Malathion',
            codigo: 'IRAC Grupo 1B',
            grupoQuimico: 'Organofosforados',
            mecanismoAccion: 'Inhibidores de la acetilcolinesterasa (AChE)',
            modoAccion: 'Contacto, inhalación e ingestión',
            pesoMolecular: '330,4 g/mol',
            nombreIUPAC: '2-dimetoxifosfinotioilsulfanilbutanodioato de dietilo',
            formulaMolecular: 'C10H19O6PS2',
            cultivo: 'Rosa, Algodón, Cebolla, Cebolla larga, Cebollines, Fríjol, Pasto, Tomate, Tomate de árbol, Berenjena, Pimentón, Ajíes, Aguacate, Café, Papa, Piña',
            plaga: 'Trips, Picudo, Trips, Mosca blanca, Chinche de los pastos, Cochinilla harinosa, Polilla, Barrenador del fruto',
            compatibilidad: 'Incompatible con sustancias alcalinas y compuestos a base de cobre'
        },
        2: {
            tipo: 'Fungicida',
            ingredienteActivo: 'Tebuconazol',
            codigo: 'FRAC Group 3',
            grupoQuimico: 'Triazoles',
            mecanismoAccion: 'Inhibidores de la biosíntesis de esteroles (SBI)',
            modoAccion: 'Sistémico',
            pesoMolecular: '307,82 g/mol',
            nombreIUPAC: '1-(4-clorofenil)-4,4-dimetil-3-(1,2,4-triazol-1-ilmetil)pentan-3-ol',
            formulaMolecular: 'C16H22ClN3O',
            cultivo: 'Vides, Duraznero, Cerezo, Manzana, Arándano. Frutilla, Mora, Tomate, Ajo, Cebolla, Cebada, Trigo, Rosa',
            plaga: 'Botritis, Oídio, Venturia, Septoriosis, Royas',
            compatibilidad: 'Incompatibles con alcalinos'
        },
        12: {
            tipo: 'Herbicida',
            ingredienteActivo: 'Nicosulfuron',
            codigo: 'HRAC/WSSA 2',
            grupoQuimico: 'Sulfonilureas',
            mecanismoAccion: 'Inhibición de la acetolactato sintasa',
            modoAccion: 'Sistémico y selectivo post emergencia',
            pesoMolecular: '410,4 g/mol',
            nombreIUPAC: '2-[(4,6-dimetoxipirimidin-2-il)carbamoilsulfamoil]- N , N -dimetilpiridina-3-carboxamida',
            formulaMolecular: 'C15H18N6O6S',
            cultivo: 'Maíz',
            plaga: 'Cassia tara, Ipomea sp, Rottboellia exaltata, Malvastrum coromandelianum',
            compatibilidad: 'Productos alcalinos y sustancias oxidantes'
        }
    };

    function showSuggestions(input) {         // Función para mostrar sugerencias de productos basadas en la entrada del usuario.
        suggestions.innerHTML = ''; // Limpia las sugerencias anteriores.
        if (input.length === 0) return; // Si la entrada está vacía, no se muestra ninguna sugerencia.

        const filteredProducts = productos.filter(producto => 
            producto.nombre.toLowerCase().includes(input.toLowerCase())
        );
        // Filtra los productos que contienen el texto ingresado en su nombre. Este código filtra un array de productos para encontrar aquellos cuyos nombres contienen una cadena de caracteres específica, sin distinguir entre mayúsculas y minúsculas.


        filteredProducts.forEach(producto => {             // Para cada producto filtrado, crea un elemento de sugerencia.
            const div = document.createElement('div'); // Crea un nuevo elemento 'div'
            div.classList.add('suggestion'); // Añade la clase 'suggestion' al elemento 'div'
            div.innerText = producto.nombre; // Establece el texto interno del 'div' al nombre del producto
            div.addEventListener('click', () => {                 // Al hacer clic en una sugerencia, se asigna el producto a uno de los campos de comparación.
                if (!product1.dataset.id) { //Verifica si el atributo del elemento 'product1' no existe o está vacío. Posteriormente almacena el dato personalizado a. través de dataset "!" esto verifica si el valor es falso, indeifnido o null, en este caso si el if es falsy.
                    product1.innerText = producto.nombre; // Asigna el nombre del producto al texto del elemento 'product1'
                    product1.dataset.id = producto.id; // Asigna el identificador del producto a un atributo de datos personalizado 'data-id' del elemento 'product1'
                } else if (!product2.dataset.id && producto.id !== parseInt(product1.dataset.id)) {
                    product2.innerText = producto.nombre;
                    product2.dataset.id = producto.id;
                } else {
                    alert('No se pueden seleccionar productos del mismo tipo o ya seleccionados.');
                }
                suggestions.innerHTML = ''; // Limpia las sugerencias después de seleccionar un producto.
                searchInput.value = ''; // Limpia el campo de búsqueda.
            });
            suggestions.appendChild(div); // Asumiendo que 'suggestions' es un elemento DOM (por ejemplo, un contenedor de sugerencias) y 'div' es un elemento creado dinámicamente (como una sugerencia individual).
             // Añade el elemento 'div' como hijo del elemento 'suggestions'
        });
    }

    searchInput.addEventListener('input', (e) => {         // Detecta cambios en el campo de búsqueda y muestra las sugerencias correspondientes.
        showSuggestions(e.target.value); //Llama a la función showSuggestions y le pasa el valor seleccionado. 
    });

    compareBtn.addEventListener('click', () => {         // Maneja la acción del botón de comparación.
        const productId1 = parseInt(product1.dataset.id); 
        const productId2 = parseInt(product2.dataset.id);
        // Obtiene el valor del atributo 'data-id' del primer producto y lo convierte en un número entero


        if (!productId1 || !productId2) { //Verifica si alguno de los dos no están definidos.
            alert('Por favor, seleccione dos productos para comparar.');
            return; // Asegura que se hayan seleccionado dos productos antes de continuar.
        }

        const producto1 = productos.find(p => p.id === productId1); 
        const producto2 = productos.find(p => p.id === productId2);
        //Crea dos variables nuevas para buscar un producto específico en el array productos, mediante id. Si lo encuentra, lo asigna a la variable Producto. 
        if (producto1.tipo === producto2.tipo) {
            alert('No se pueden comparar productos del mismo tipo.');
            product2.innerText = 'Producto 2'; // Restablece el segundo producto si son del mismo tipo.
            delete product2.dataset.id;
            return;
        }

        const compatible = compatibilidades.some(c => 
            (c.producto1 === productId1 && c.producto2 === productId2) ||
            (c.producto1 === productId2 && c.producto2 === productId1)
        );

      // Verifica la compatibilidad entre los dos productos seleccionados.


        result.innerText = compatible ? 'Compatibles' : 'Incompatibles';
        result.style.display = 'block'; // Muestra el resultado de la comparación.
        showInfoBtn.style.display = 'block'; // Muestra el botón de información adicional.
    });

    showInfoBtn.addEventListener('click', () => { // Maneja la acción del botón de información adicional.
    const productId1 = parseInt(product1.dataset.id);
    const productId2 = parseInt(product2.dataset.id);

    const info1 = informacionProductos[productId1];
    const info2 = informacionProductos[productId2];

    let content = '';

    // Manejar el primer producto
    if (info1) {
        content += `
            <div>
                <strong>Tipo:</strong> ${info1.tipo}<br>
                <strong>Ingrediente Activo:</strong> ${info1.ingredienteActivo}<br>
                ${info1.codigo ? `<strong>Código:</strong> ${info1.codigo}<br>` : ''}
                ${info1.grupoQuimico ? `<strong>Grupo Químico:</strong> ${info1.grupoQuimico}<br>` : ''}
                ${info1.mecanismoAccion ? `<strong>Mecanismo de Acción:</strong> ${info1.mecanismoAccion}<br>` : ''}
                ${info1.modoAccion ? `<strong>Modo de Acción:</strong> ${info1.modoAccion}<br>` : ''}
                ${info1.pesoMolecular ? `<strong>Peso Molecular:</strong> ${info1.pesoMolecular}<br>` : ''}
                ${info1.nombreIUPAC ? `<strong>Nombre IUPAC:</strong> ${info1.nombreIUPAC}<br>` : ''}
                ${info1.formulaMolecular ? `<strong>Fórmula Molecular:</strong> ${info1.formulaMolecular}<br>` : ''}
                ${info1.cultivo ? `<strong>Cultivo:</strong> ${info1.cultivo}<br>` : ''}
                ${info1.plaga ? `<strong>Plaga:</strong> ${info1.plaga}<br>` : ''}
                ${info1.compatibilidad ? `<strong>Compatibilidad:</strong> ${info1.compatibilidad}<br>` : ''}
            </div>
            <hr>
        `;
    } else {
        const producto1 = productos.find(p => p.id === productId1);
        content += `
            <div>
                <strong>Tipo:</strong> ${producto1.tipo}<br>
                <strong>Ingrediente Activo:</strong> ${producto1.nombre}<br>
            </div>
            <hr>
        `;
    }

    // Manejar el segundo producto
    if (info2) {
        content += `
            <div>
                <strong>Tipo:</strong> ${info2.tipo}<br>
                <strong>Ingrediente Activo:</strong> ${info2.ingredienteActivo}<br>
                ${info2.codigo ? `<strong>Código:</strong> ${info2.codigo}<br>` : ''}
                ${info2.grupoQuimico ? `<strong>Grupo Químico:</strong> ${info2.grupoQuimico}<br>` : ''}
                ${info2.mecanismoAccion ? `<strong>Mecanismo de Acción:</strong> ${info2.mecanismoAccion}<br>` : ''}
                ${info2.modoAccion ? `<strong>Modo de Acción:</strong> ${info2.modoAccion}<br>` : ''}
                ${info2.pesoMolecular ? `<strong>Peso Molecular:</strong> ${info2.pesoMolecular}<br>` : ''}
                ${info2.nombreIUPAC ? `<strong>Nombre IUPAC:</strong> ${info2.nombreIUPAC}<br>` : ''}
                ${info2.formulaMolecular ? `<strong>Fórmula Molecular:</strong> ${info2.formulaMolecular}<br>` : ''}
                ${info2.cultivo ? `<strong>Cultivo:</strong> ${info2.cultivo}<br>` : ''}
                ${info2.plaga ? `<strong>Plaga:</strong> ${info2.plaga}<br>` : ''}
                ${info2.compatibilidad ? `<strong>Compatibilidad:</strong> ${info2.compatibilidad}<br>` : ''}
            </div>
            <hr>
        `;
    } else {
        const producto2 = productos.find(p => p.id === productId2);
        content += `
            <div>
                <strong>Tipo:</strong> ${producto2.tipo}<br>
                <strong>Ingrediente Activo:</strong> ${producto2.nombre}<br>
            </div>
            <hr>
        `;
    }

      // Inserta el contenido generado en el modal de información.
        document.querySelector('#info-modal .modal-content').innerHTML = ` 
            <span class="close">&times;</span>
            ${content}
        `;

        infoModal.style.display = 'block'; // Muestra el modal.

        document.querySelector('#info-modal .close').addEventListener('click', () => {             // Maneja el cierre del modal.
            infoModal.style.display = 'none';
            location.reload(); // Recarga la página al cerrar el modal.
        });
    });

    refreshBtn.addEventListener('click', () => {         // Maneja la acción del botón de recarga.
        location.reload(); // Recarga la página.
    });

    window.addEventListener('click', (event) => {          // Cierra el modal si se hace clic fuera del mismo.
        if (event.target === infoModal) {  // Verifica si el elemento que fue clickeado es el modal (es decir, si el clic ocurrió fuera del contenido del modal).
            infoModal.style.display = 'none'; // Oculta el modal cambiando su estilo de visualización a 'none'.
            location.reload(); // Recarga la página para limpiar cualquier estado o datos temporales.
        }
    });
});

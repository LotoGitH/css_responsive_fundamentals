/*
  Ejemplos simples de declaración de variables y tipos de datos en JavaScript
  - Declaraciones: var, let, const
  - Tipos primitivos: string, number, boolean, null, undefined, symbol, bigint
  - Tipos de referencia: object, array, function, Date (objeto)

  Nota: Este archivo solo imprime ejemplos en la consola.
*/

// 1) Declaración de variables
var nombreAntiguo = "Ana";        // var: ámbito de función (no recomendado en código moderno)
let nombre = "Juan";              // let: variable reasignable con ámbito de bloque
const PI = 3.14159;               // const: no se puede reasignar la referencia

// Reasignación permitida con let
nombre = "Juana";

console.log("--- Declaraciones ---");
console.log("var nombreAntiguo:", nombreAntiguo);
console.log("let nombre:", nombre);
console.log("const PI:", PI);

// 2) Tipos primitivos
const texto = "Hola, mundo";      // string
const numero = 42;                 // number (enteros y decimales)
const decimal = 3.14;              // number
const booleano = true;             // boolean
const nulo = null;                 // null
let indefinido;                    // undefined (sin asignación)
const simbolo = Symbol("id");     // symbol (identificadores únicos)
const grande = 12345678901234567890n; // bigint (enteros muy grandes)

console.log("--- Tipos primitivos ---");
console.log("string:", texto, typeof texto);
console.log("number:", numero, typeof numero);
console.log("number (decimal):", decimal, typeof decimal);
console.log("boolean:", booleano, typeof booleano);
console.log("null:", nulo, typeof nulo); // Ojo: typeof null === 'object' por legado
console.log("undefined:", indefinido, typeof indefinido);
console.log("symbol:", simbolo, typeof simbolo);
console.log("bigint:", grande, typeof grande);

// 3) Tipos de referencia
const persona = {                   // object
  nombre: "Lucía",
  edad: 30,
  activo: true,
};

const numeros = [1, 2, 3, 4];      // array (también es un objeto)

function saludar(quien) {          // function
  return `Hola, ${quien}!`;
}

const hoy = new Date();            // Date (objeto)

console.log("--- Tipos de referencia ---");
console.log("object persona:", persona, typeof persona);
console.log("array numeros:", numeros, Array.isArray(numeros) ? "array" : typeof numeros);
console.log("function saludar:", saludar("Mundo"), typeof saludar);
console.log("Date hoy:", hoy, hoy instanceof Date ? "Date" : typeof hoy);

// 4) Diferencia entre == y === (extra útil)
console.log("--- Comparaciones ---");
console.log("0 == false:", 0 == false);   // true (coerción de tipos)
console.log("0 === false:", 0 === false); // false (comparación estricta)

// 5) Template strings (cadenas con backticks)
const producto = "libro";
const precio = 9.99;
const mensaje = `El ${producto} cuesta $${precio}`;
console.log("--- Template strings ---");
console.log(mensaje);

// --- Funciones sencillas para el formulario de javascript_test.html ---
(function(){
  // Función auxiliar muy básica para obtener un elemento por id
  function byId(id){
    return document.getElementById(id);
  }

  // Muestra un texto simple en el <pre id="output">
  function renderOutput(data, reason){
    var out = byId('output');
    if (!out) return;

    // Construimos un texto fácil de leer para principiantes
    var texto = '(' + reason + ')\n';
    texto += 'Nombre: ' + (data.nombre !== undefined ? data.nombre : '') + '\n';
    texto += 'Email: ' + (data.email !== undefined ? data.email : '') + '\n';
    texto += 'Edad: ' + (data.edad !== undefined ? data.edad : '') + '\n';
    texto += 'Acepto: ' + (data.acepto !== undefined ? data.acepto : '') + '\n';

    out.textContent = texto;
  }

  // Lee los valores del formulario de forma directa y clara
  function readForm(){
    var nombre = '';
    var email = '';
    var edad = '';
    var acepto = false;

    var nombreEl = byId('nombre');
    if (nombreEl) {
      nombre = nombreEl.value;
    }

    var emailEl = byId('email');
    if (emailEl) {
      email = emailEl.value;
    }

    var edadEl = byId('edad');
    if (edadEl) {
      if (edadEl.value !== '') {
        edad = Number(edadEl.value);
      } else {
        edad = '';
      }
    }

    var aceptoEl = byId('acepto');
    if (aceptoEl) {
      acepto = aceptoEl.checked;
    }

    return { nombre: nombre, email: email, edad: edad, acepto: acepto };
  }

  // Eventos simples
  window.handleClick = function(event){
    var data = readForm();
    renderOutput(data, 'onClick');
  };

  window.handleBlur = function(event){
    // Mostramos únicamente el campo afectado para que sea más claro
    var target = event.target;
    var nombreCampo = target.name || target.id || 'campo';
    var valorCampo = target.value;

    var out = byId('output');
    if (out) {
      out.textContent = '(onBlur)\n' + nombreCampo + ': ' + valorCampo;
    }
  };

  window.handleChange = function(event){
    // Volvemos a leer todo el formulario para ver el estado completo
    var data = readForm();
    renderOutput(data, 'onChange');
  };

  window.handleSubmit = function(event){
    event.preventDefault();
    var data = readForm();
    renderOutput(data, 'submit');

    // Validación muy básica para principiantes
    if (!data.nombre) {
      alert('Escribe tu Nombre.');
      return false;
    }
    if (!data.email) {
      alert('Escribe tu Email.');
      return false;
    }

    alert('Formulario leído correctamente. Revisa la salida.');
    return false; // Evitamos recargar la página
  };
})();

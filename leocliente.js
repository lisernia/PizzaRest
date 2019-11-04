const inquirer=require("inquirer");
const fs = require("fs");

let preguntasVarias = [
    {       //Si el user quiere Delivery o no
        type: "confirm",
        message: "¿Te la llevamos?:",
        name: "userTakeAway",
            //Si el usuario no elige es falso
        default: false,
    },
    {       //Direccion del user
        type: "input",
        message: "Escribe tu direccion y altura:",
        name: "userAdress",
        validate: function(value) {
            //Restriccion de caracteres y luego digitos
            var direccion = value.match(
                /[a-zA-Z0-9]+\s+\d/gi
            );
            if (direccion) {
              return true;
            }
      
            return 'La dirrecion debe llevar letras y numeros';
          },
        when: function(respuestas) {
            return respuestas.userTakeAway;
        },
    },
    {       //Tipo de casa del User
        type: "rawlist",
        name: "userHouseType",
        message: "¿Como es tu casa?:",
        choices: [
            "Casa",
            "Departamento",
            "PH"
        ],
        when: function(respuestas){
         return  respuestas.userTakeAway;
        }
    },
    {   //
        type: "input",
        name: "userTimbre",
        message: "Escribe tu timbre aqui:",
        when: function(respuestas){
          return  respuestas.userTakeAway && respuestas.userHouseType != "Casa";
        },
    },
    {       //Nombre y apellido del user
    type :"input",
    name: "userName",
    message: "Escribe tu nombre y apellido",
    validate: function(value) {
            //Restriccion de caracter mas espacio mas caracter
        var nombre = value.match(
            /^[a-z ,.'-]+\s+[a-z ,.'-]+$/i
        );
        if (nombre) {
          return true;
        }
  
        return 'Luego de tu nombre, pon tu apellido';
      },
    },
    {       //Numero del user
        type :"input",
        name: "userNumber",
        message: "Digite su telefono (Linea 8 digitos, Movil 10 digitos)",
        validate: function(value) {
            //Ocho caracteres numericos o Diez caracteres numericos
            var pass = value.match(
                /^[0-9]{8}$|^[0-9]{10}$/
            );
            if (pass) {
              return true;
            }
            //De ser invalido retorna a la pregunta anterior
            return 'Please enter a valid phone number';
          }
    },
    {       //Sabor de la pizza que va a elegir el user
        type: "list",
        name: "userPizzas",
        message: "¿Que Pizza desea?",
        default: "Muzzarella",
        choices: [
            "Cancha",
            "Hawaiana",
            "Capresse",
            "Muzzarella",
            "Fugazzeta",
            "Jamon"
        ],
    },
    {       //Tamaño de la pizza que elige el user
        type: "list",
        name: "userSizePizzas",
        message: "¿Que tamaño Pizza desea?",
        default: "Grande",
        choices: [
            "Chica",
            "Mediana",
            "Grande",
        ],
    },
    {       //Si el user quiere una bebida o no
        type: "confirm",
        name: "userDrink",
        message: "¿Quieres una bebida?",
        default: false,
    },
    {
            //Bebidas que el user va a elegir
        type: "list",
        name: "userTypeDrink",
        message: "¿Que bebida desea?",
        default: "Coca-Cola",
        choices: [
        "Pepsi",
        "Coca-Cola",
        "Sprite",
        "Fanta",
        "Agua"
    ],
            //De querer bebida retorna arriba
    when: function(respuestas){
       return respuestas.userDrink;
    },
    },
    {       //User confirma si es o no usuario habitual
        type: "confirm",
        message: "¿Eres un cliente habitual",
        name: "userRegularClient",
        default: false,
    },
    {
            //De ser verdadero el user elige empanadas
        type: "checkbox",
        name: "userEmpanadas",
        message: "¿Que gusto de empanadas quieres?",
        validate: function(answer) {
        //Restriccion menor o igual a 3 empanadas
        if (answer.length > 3) {
          return "Elige 3 empanadas o menos";
        } return true;
    },      //Sabor de la empanadas
    choices: [
        " Jamon y Queso",
        " Capresse",
        " Humita",
        " Salteña",
        " Roquefort",
        " Pollo",
        " Carne"
    ],      //Condicion de ser User frecuente
    when: function(respuestas){
       return respuestas.userRegularClient;
    },
    }
];
inquirer.prompt(preguntasVarias)
.then(function(respuestas){
    function tipoDeCasaYTimbre(){
        switch (respuestas.userTimbre) {
            case undefined:
            return "no asignaste ningun timbre"
            default:
            return respuestas.userTimbre
        }
    }
     console.log( "=== Resumen de tu pedido ===" );
     console.log( "-Tus datos Nombre y Apellido: " +
     respuestas.userName +" / Teléfono: "+respuestas.userNumber+" -");
        if (respuestas.userTakeAway){
            console.log ("Tu pedido será entregado en: "+ respuestas.userAdress+ " tu hogar es del tipo: "+
            respuestas.userHouseType +" con timbre: "+ tipoDeCasaYTimbre()+".");
        } else {
     console.log ("Nos indicaste que pasarás a retirar tu pedido");
        }
     console.log ("=== Productos solicitados ===");
     console.log ("Pizza: " + respuestas.userPizzas);
     console.log ("Tamaño: "+ respuestas.userSizePizzas);
        if (respuestas.userDrink){
            console.log ("Bebida: "+ respuestas.userTypeDrink);
        } else {
            console.log ("No pediste bebida")
        }
     if (respuestas.userEmpanadas){
        console.log ("Tus empanadas de regalo serán de:" + respuestas.userEmpanadas+ ".");
     } else {
        console.log ("No hay empanadas para vos");
     }
     console.log ("===============================");
function precioPizza(){
    switch (respuestas.userSizePizzas) {
        case "Grande":
        return 650;
        case "Chica":
        return 430;
        case "Mediana":
        return 560;
    }
}
function precioDelivery(){
    switch (respuestas.userTakeAway) {
        case true:
        return 20    
        default:
        return 0
    }
}
function precioBebidas(){
    switch (respuestas.userTypeDrink) {
        case "Pepsi":
        return 80   
        case "Coca-Cola":
        return 80
        case "Agua":
        return 80  
        case "Sprite":
        return 80  
        case "Fanta":
        return 80    
        default:
        return 0
    }
}

function precioDescuento(){
    if (respuestas.userDrink){
    switch (respuestas.userSizePizzas) {
        case "Chica":
        return 3
        case "Mediana":
        return 5
        case "Grande":
        return 8  
    }
} else{
    return 0
}
}

let total=precioPizza()+precioDelivery()+precioBebidas();

console.log("Total productos: "+(precioPizza()+precioBebidas()));
console.log("Total delivery: "+precioDelivery());
console.log("Descuentos: "+precioDescuento()+"%")
console.log ("TOTAL: "+((total-total*precioDescuento()/100)));

console.log ("===============================");

let fechaTotal = new Date;
let diasPedido = fechaTotal.toLocaleDateString();
let horaPedido= fechaTotal.toLocaleTimeString();
let preciodescuentando= precioDescuento();

let datosParaArchivar= {
    fecha: diasPedido,
    hora: horaPedido,
    total: total,
    descuento: preciodescuentando,
}
respuestas={
    ...respuestas,
    ...datosParaArchivar,
}
console.log (respuestas);

const rutaAlArchivo= "C:/Users/soraw/DigitalHouse/dh-pizzas";
const rutaDelArchivo = rutaAlArchivo + '/pedidos.json';

// Leo el archivo para saber si tiene algo
let infoArchivo = fs.readFileSync(rutaDelArchivo, 'utf8');

let contenidoPedidos = infoArchivo.length == 0 ? [] : JSON.parse(infoArchivo);

let pedidoFinal = {
    id: contenidoPedidos.length + 1,
    ...respuestas
}

contenidoPedidos.push(pedidoFinal);


fs.writeFileSync(rutaDelArchivo, JSON.stringify(contenidoPedidos, null, ' '));


});

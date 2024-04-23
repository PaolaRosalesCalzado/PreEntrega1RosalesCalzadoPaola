let users = [
    {},
];

let products = [
    {
        id: 1,
        name: "Samsung smart tv",
        category: "electrohogar",
        stock: 500,
        price: 1800,
        img: ""
    },
    {
        id: 2,
        name: "Lavadora y secadora Samsung Smart Motion",
        category: "electrohogar",
        stock: 100,
        price: 1200,
        img: ""
    },
    {
        id: 3,
        name: "Collar antipulgas con gps",
        category: "pets",
        stock: 50,
        price: 250,
        img: ""
    },
    {
        id: 4,
        name: "Bolsa de cambo 15kg sabor cordero adultos",
        category: "pets",
        stock: 1000,
        price: 220,
        img: ""
    },
    {
        id: 5,
        name: "Jacket color negro de cuero con cinturon",
        category: "ropa para mujer",
        stock: 50,
        price: 120,
        img: ""
    },
    {
        id: 6,
        name: "Pantalon color nude efecto piel de cuero",
        category: "ropa para mujer",
        stock: 20,
        price: 60,
        img: ""
    },
    {
        id: 7,
        name: "Vestido elegante color negro mangas largas",
        category: "ropa para mujer",
        stock: 100,
        price: 110,
        img: ""
    }

];

manageSessionOptions();

function manageSessionOptions() {
    let sessionOptions = 0;
    do {
        sessionOptions = Number(prompt('Bienvenido a Plaza Autoservicios. \nPor favor seleccione una de las siguientes opciones para continuar:\n 1. Registrate como nuevo usuario.\n 2. Inicia sesion con tu usuario.'));

        if (sessionOptions !== 1 && sessionOptions !== 2) {
            alert('Por favor elige una opcion valida');
        }
    } while (sessionOptions !== 1 && sessionOptions !== 2);

    if (sessionOptions === 1) {
        register();
    } else if (sessionOptions === 2) {
        login();
    }
}

// registro de usuario

function register() {
    let newUser = prompt('¿Cuál es tu nombre?').toLowerCase();
    let newEmail = prompt('Por favor ingrese su email:').toLowerCase();
    let newPassword = prompt('Por favor ingrese una contraseña:');
    users.push({
        name: newUser,
        email: newEmail,
        password: newPassword
    });
    manageSessionOptions();
}

//inicio de sesion

function login() {

    let maxAttempts = 3;
    let attempts = 0;
    let loggedIn = false;

    do {
        let enteredEmail = prompt('Por favor ingrese su email:').toLowerCase();
        let enteredPassword = prompt('Por favor ingrese una contraseña:');
        attempts++;
        let foundUser = users.find((user) => {
            return user.email === enteredEmail && user.password === enteredPassword;
        });
        if (foundUser != null) {
            loggedIn = true;
            alert('Bienvenid@ ' + foundUser.name);
        } else {
            alert('Datos incorrectos');
        }
    } while (!loggedIn && attempts < maxAttempts);
    if (loggedIn == true) {
        showCategories();
    }

    if (loggedIn == false && attempts == maxAttempts) {
        alert('Intentelo más tarde');
        manageSessionOptions();
    }

}


//carrito de compras

function showCategories() {
    let total = 0;
    let filledCategory = 0;
    do {
        filledCategory = Number(prompt('Por favor seleccione un numero para elegir la categoria y poder empezar con su compra: \n 1. Categoria: Electrohogar\n 2. Categoria: Pets\n 3. Categoria: Ropa para mujer\n 4. Salir\n Total Actual: S/' + total));
        let product;
        if (filledCategory === 1) {
            product = showProducts("electrohogar");
            total = calculatePurchase(product.name, product.price, total);
        } else if (filledCategory === 2) {
            product = showProducts("pets");
            total = calculatePurchase(product.name, product.price, total);
        } else if (filledCategory === 3) {
            product = showProducts("ropa para mujer");
            total = calculatePurchase(product.name, product.price, total);
        } else if (filledCategory === 4) {
            alert('Gracias por visitar PlazaAutoservicios')
        }
    } while (filledCategory !== 4)
}

function showProducts(category) {
    let concat = "";
    let filter = products.filter((product) => {
        return product.category === category;
    });

    filter.forEach((p) => {
        concat = `${concat} ${p.id}. ${p.name}, stock: ${p.stock}, precio: ${p.price}\n`
    })
    var selectProductId = Number(prompt('Por favor seleccione el producto que desee comprar: \n' + concat));
    return products.find((p) => p.id == selectProductId);
}

function calculatePurchase(nombre, price, total) {
    let quantity = Number(prompt("Ingresa la cantidad requerida"));
    let subtotal = quantity * price;
    total = subtotal + total;
    alert("Se agregaron al carrito " + quantity + " " + nombre + " por un total de s/." + subtotal);
    alert("El total de su compra es de s/." + total);
    return total;
}
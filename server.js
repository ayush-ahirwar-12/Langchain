function sayHello(name) {
  return "Hello " + name;
}

function greetUser(functions) {
  console.log(functions("Ayush"));
}

greetUser(sayHello);



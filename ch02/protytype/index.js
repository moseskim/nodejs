function People(name) {
  this.name = name
}

People.prototype.printName = function() {
  console.log(this.name)
}

const foo = new People('fooname');
foo.printName();

const bar = new People('barname');
bar.printName();

People.prototype.printName = function() {
  console.log(`prefix-${this.name}`)
}

foo.printName();
bar.printName();

console.log(foo.toString());

People.prototype.toString = function() {
  return `name: ${this.name}`;
};

console.log(foo.toString());

People.prototype.toString = () => {
  return `name: ${this.name}`;
};

console.log(foo.toString());

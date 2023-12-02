class People {
  constructor(name) {
    this.name = name;
  }
  printName() {
    console.log(this.name);
  }
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
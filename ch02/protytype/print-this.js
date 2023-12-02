function printName() {
  setTimeout(() => {
    console.log(this.name)
  }, 1000);
}

const obj = {
  name: 'obj-name',
  printName: printName
};

obj.printName();
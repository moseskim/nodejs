import('./calc.mjs')
  .then((module) => {
    console.log(module.add(1, 2))
  })
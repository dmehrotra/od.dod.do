// I  got this from Surya's Herbivore
// https://github.com/samatt/herbivore/blob/master/app/src/renderer/vuex/modules/index.js
// it puts all the modules together and exports them at once

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules

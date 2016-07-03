module.exports = () => {
  return /([^\/]+)\.js$/.exec(document.currentScript.src)[1]
}
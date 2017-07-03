export default () => {
  return /([^\/]+)\.js$/.exec(document.currentScript.src)[1]
}

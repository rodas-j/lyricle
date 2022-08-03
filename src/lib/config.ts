const pathName = window.location.pathname
let key: string
let name: string
let gameState: string
let gameStats: string
switch (pathName) {
  case '/80s':
    key = '80s'
    name = 'Lyricle 80s'

    break

  default:
    key = 'default'
    name = 'Lyricle Decades'
}
gameState = 'gameState'.concat(key)
gameStats = 'gameStats'.concat(key)
let decadesConfig = {
  key: key,
  name: name,
  gameState: gameState,
  gameStats: gameStats,
}

document.title = decadesConfig.name
export { decadesConfig }

const pathName = window.location.pathname
let key: string
let name: string
let gameState: string
let gameStats: string
switch (pathName) {
  case '/taylorswift':
    key = 'taylorswift'
    name = 'Lyricle Taylor Swift'
    break

  case '/prince':
    key = 'prince'
    name = 'Lyricle Prince'
    break

  default:
    key = 'default'
    name = 'Lyricle Artists'
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

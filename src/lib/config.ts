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

  case '/80s':
    key = '80s'
    name = 'Lyricle 80s'
    break

  case '/90s':
    key = '90s'
    name = 'Lyricle 90s'
    break

  case '/00s':
    key = '00s'
    name = 'Lyricle 00s'
    break

  case '/10s':
    key = '10s'
    name = 'Lyricle 10s'
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

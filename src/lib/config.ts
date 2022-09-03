const pathName = window.location.pathname
let key: string
let name: string
let selections: { [key: string]: string } = {}
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

  case '/beatles':
    key = 'beatles'
    name = 'Lyricle The Beatles'
    break

  case '/arianagrande':
    key = 'arianagrande'
    name = 'Lyricle Ariana Grande'
    break

  case '/edsheeran':
    key = 'edsheeran'
    name = 'Lyricle Ed Sheeran'
    break

  default:
    key = 'default'
    name = 'Lyricle Artists'
    selections = {
      prince: 'Prince',
      taylorswift: 'Taylor Swift',
      beatles: 'The Beatles',
      arianagrande: 'Ariana Grande',
      edsheeran: 'Ed Sheeran',
    }
}
gameState = 'gameState'.concat(key)
gameStats = 'gameStats'.concat(key)
let decadesConfig = {
  key: key,
  name: name,
  gameState: gameState,
  gameStats: gameStats,
  selections: selections,
}

document.title = decadesConfig.name
export { decadesConfig }

const randomButton = document.querySelector('button.random')

// set & select source
let source = 'icanhaz'

const sourceEl = document.getElementById('source')

sourceEl.addEventListener('change', e => (source = e.target.value))

// get random dadjoke
async function fetchFromIcanHaz () {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await res.json()
  return data.joke
}

async function fetchFromReddit () {
  const res = await fetch('https://www.reddit.com/r/dadjokes.json')
  const data = await res.json()
  // debugger
  const jokes = data.data.children
  const randomNum = Math.floor(Math.random() * jokes.length + 1)
  const joke =
    jokes[randomNum].data.title + '<br><br>' + jokes[randomNum].data.selftext
  return joke
}

async function getRandomDadjoke () {
  if (source === 'icanhaz') {
    return await fetchFromIcanHaz()
  }
  if (source === 'reddit') {
    return await fetchFromReddit()
  }
}

async function displayDadjoke () {
  const dadjoke = await getRandomDadjoke()

  const p = document.querySelector('.dadjoke')
  p.innerHTML = dadjoke
}

randomButton.addEventListener('click', displayDadjoke)

// const searchInput = document.querySelector('.search .input')
// const searchButton = document.querySelector('.search .button')
// function searchDadjoke (e) {
//   const input = e.target.value
// }

// searchInput.addEventListener('input', searchDadjoke)

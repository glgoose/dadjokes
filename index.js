const randomButton = document.querySelector('button.random')

async function getRandomDadjoke () {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await res.json()
  return data.joke
}

async function displayDadjoke () {
  const dadjoke = await getRandomDadjoke()

  const p = document.querySelector('.dadjoke')
  p.innerText = dadjoke
}

randomButton.addEventListener('click', displayDadjoke)

// const searchInput = document.querySelector('.search .input')
// const searchButton = document.querySelector('.search .button')
// function searchDadjoke (e) {
//   const input = e.target.value
// }

// searchInput.addEventListener('input', searchDadjoke)

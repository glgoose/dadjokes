const randomButton = document.querySelector('button.random')

// set & select source
let source = 'icanhaz'

// const sourceEl = document.getElementById('source')

// sourceEl.addEventListener('change', e => (source = e.target.value))

const toggleDropdown = () => dropdown.classList.toggle('is-active')

// const closeDropdown = () => {
//   console.log('close')
//   dropdown.classList.remove('is-active')
// }

const dropdown = document.querySelector('.dropdown')
const dropdownButton = dropdown.querySelector('.button')

dropdownButton.addEventListener('click', toggleDropdown)
dropdown.addEventListener('blur', toggleDropdown)

const dropdownItems = [...document.getElementsByClassName('dropdown-item')]
dropdownItems.forEach(dropdownItem =>
  dropdownItem.addEventListener('click', e => {
    const el = e.target
    if (!el.classList.contains('is-active')) {
      dropdownItems.forEach(item => item.classList.remove('is-active'))
      el.classList.add('is-active')
    }
    source = el.innerText
    document.querySelector('.dropdown-selected').innerText = source

    toggleDropdown()
  })
)

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

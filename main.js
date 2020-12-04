const $addButton = document.querySelector('#addButton')
const $text = document.querySelector('#texto')
const $tasks = document.querySelector('#tasks')
let rec = undefined

class item {
	constructor(itemName) {
		this.createDiv(itemName)
	}

	createDiv(itemName) {
		let taskItem = document.createElement('div')
		taskItem.classList.add('task__item')

		let input = document.createElement('input')
		input.value = itemName
		input.disabled = true
		input.type = 'text'

		let editButton = document.createElement('button')
		editButton.classList.add('edit')
		let iconPencil = document.createElement('i')
		iconPencil.classList.add('fa')
		iconPencil.classList.add('fa-edit')
		editButton.appendChild(iconPencil)

		let speakButton = document.createElement('button')
		speakButton.classList.add('speak')
		let iconSpeak = document.createElement('i')
		iconSpeak.classList.add('fas')
		iconSpeak.classList.add('fa-volume-up')
		speakButton.appendChild(iconSpeak)

		let deleteButton = document.createElement('button')
		deleteButton.classList.add('delete')
		let iconDelete = document.createElement('i')
		iconDelete.classList.add('fas')
		iconDelete.classList.add('fa-trash')
		deleteButton.appendChild(iconDelete)

		$tasks.appendChild(taskItem)
		taskItem.appendChild(input)
		taskItem.appendChild(editButton)
		taskItem.appendChild(speakButton)
		taskItem.appendChild(deleteButton)

		editButton.addEventListener('click', () => this.edit(input))
		input.addEventListener('blur', () => (input.disabled = true))

		deleteButton.addEventListener('click', () => this.remove(taskItem))

		speakButton.addEventListener('click', () => this.say(input.value))
	}

	edit(input) {
		input.disabled = !input.disabled
		input.focus()
	}

	remove(item) {
		$tasks.removeChild(item)
	}

	say(text) {
		speechSynthesis.speak(new SpeechSynthesisUtterance(text))
	}
}

const iniciar = (e) => {
	console.log(e)
	for (i = e.resultIndex; i < e.results.length; i++) {
		$text.value = e.results[i][0].transcript
	}
}

if (!('webkitSpeechRecognition' in window)) {
	alert('Ud. no puede usar la API')
} else {
	rec = new webkitSpeechRecognition()
	rec.lang = 'es-PE'
	rec.continuous = true
	rec.interim = true
	rec.addEventListener('result', iniciar)
	rec.start()
}

new item('Hacer tareas.')
new item('Crear una aplicación reactiva.')
new item('Crear un aplicación con reconocimiento de voz')

const addItem = () => {
	if ($text.value === '') {
		alert('Diga o escriba su tarea.')
	} else {
		new item($text.value)
		$text.value = ''
	}
}

$addButton.addEventListener('click', addItem)

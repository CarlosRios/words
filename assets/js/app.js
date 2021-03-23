// State manages the state of everything.
// View is used to generate the html for each of the words as well as the Stage
import State from './helpers/State.js'
import View from './helpers/View.js'

const words = [
    {
        word: 'Catboy',
        color: '#1B3287',
        image: './assets/img/catboy.jpg',
        audio: './assets/audio/pjs.mp3',
    },
    {
        word: 'Owlette',
        color: '#BE3929',
        image: './assets/img/owlette.jpg',
        audio: './assets/audio/pjs.mp3',
    },
    {
        word: 'Gekko',
        color: '#58BF56',
        image: './assets/img/gekko.jpg',
        audio: './assets/audio/pjs.mp3',
    },
    {
        word: 'Romeo',
        color: '#5596AB',
        image: './assets/img/romeo.jpg',
        audio: './assets/audio/pjs.mp3',
    },
    {
        word: 'Luna Girl',
        color: '#9DABD0',
        image: './assets/img/luna-girl.jpg',
        audio: './assets/audio/pjs.mp3',
    },
    {
        word: 'Pete the Cat',
        color: '#17436A',
        image: './assets/img/pete.jpg',
        audio: './assets/audio/pete.mp3',
    },
    {
        word: 'Pikachu',
        color: '#FFED6A',
        image: './assets/img/pikachu.jpg',
        audio: './assets/audio/poke.mp3',
    } 
]

const errorMessages = [
    'nathan-no-1.m4a',
    'nathan-no-2.m4a',
    'nathan-no-3.m4a',
    'nathan-no-4.m4a',
    'nathan-no-5.m4a',
    'nathan-no-6.m4a',
    'nathan-no-7.m4a',
    'nathan-no-8.m4a',
    'nathan-no-9.m4a',
    'nathan-no-10.m4a',
]

var view = new View()
var game = new State( words, errorMessages )

// Inject the words into the DOM
game.words.forEach( function(word, index) {
    let item = view.createThumbnail( word )

    // Change the activeWord in the global state when an item is clicked
    // Update the stage
    // Update the audio
    item.addEventListener( 'click' , e => {
        game.changeActiveWord( index )
        
        // Change audio source in the view controller
        view.audio.src = game.activeWordObject.audio
        view.audio.volume = 0.2
        view.audio.play()

        // Update the stage
        view.buildLetters( game.activeWordLetters )
    })
});

// Fires everytime a key is pressed.
// This is the game logic.
document.addEventListener('keypress', e => {
    console.log( game )

    // Store the current letter here because its easier to deal with
    let currentLetter = game.getCurrentLetter()

    // Check if the new letter is a space, and skip it if it is.
    // Update the currentLetter variable to the next letter
    if (currentLetter === ' ') {
        game.currentLetterPosition++
        currentLetter = game.getCurrentLetter()
    }

    // Toggle the music with DELETE keye
    if( e.code === 'Backspace' ) {
        if( view.audio.paused ) {
            view.audio.play()
        } else {
            view.audio.pause()
        }
    }

    // The actual letter in the DOM
    let currentLetterElement = view.letters[game.currentLetterPosition]

    // Checks if the current key pressed is correct
    if( currentLetter === e.key || currentLetter === e.key.toUpperCase() ) {
        // Change the color of the correct letter
        currentLetterElement.style.color = game.activeWordObject.color
        
        game.currentLetterPosition++

        // Checks if the entire word was successful
        // Compares the index to the length of the word
        if ( game.activeWordLetters.length <= game.currentLetterPosition ) {

            // This needs to take place outside of the transition
            game.activeWordPosition++
            game.changeActiveWord( game.activeWordPosition )

            // Change audio source in the view controller
            view.audio.src = game.activeWordObject.audio
            view.audio.volume = 0.2
            view.audio.play()

            // Add and remove the success class
            view.heading.classList.add('success')

            // Transition happens.
            view.heading.addEventListener('transitionend', (e) => {
                if ( e.propertyName !== 'transform' ) return
                view.heading.classList.remove( 'success' )

                // Reset the index and re-render the heading
                view.buildLetters( game.activeWordLetters )
            })
        }
    }
    // If the key is incorrect
    else {

        // Handles error messages. Makes sure there aren't more messages than the array supplies.
        if ( game.currentError >= game.errorMessages.length ) {
            game.currentError = 0
        }
    
        view.error.src = './assets/audio/' + game.errorMessages[ game.currentError ]
        view.error.play()

        game.currentError++

        currentLetterElement.classList.add( 'error' )
        currentLetterElement.addEventListener('transitionend', (e) => {
            if (e.propertyName !== 'transform') return
            currentLetterElement.classList.remove( 'error' )
        })
    }
});

// Renders the HTML for the View.
// Doesn't update the View.
// To update the View, you must do so in app.js
export default class View {

    constructor() {
        // Sets the stage
        this.items = document.querySelector( '.items' )
        this.stage = document.querySelector( '.stage' )
        this.heading = document.createElement( 'h1' )
        this.letters = [] // an array of each of the letter DOM elements

        // Audio elements
        this.audio = new Audio
        this.error = new Audio
    }

    createThumbnail( item ) {
        let element = document.createElement('span')
        element.classList.add('avatar')

        if (item.image) {
            element.style.backgroundImage = `url('${item.image}')`
        }

        this.items.appendChild( element )

        // return the thumbnail so we can do some stuff with it
        return element
    }

    // Builds the stage HTML with letters.
    // Requires an array of letters in order to work.
    buildLetters( letters = [] ) {
        // Reset the letters array
        this.letters = []

        letters.forEach((letter, index) => {
            let letterElement = document.createElement('span')
            letterElement.innerText = letter
            letterElement.className = 'letter'
            letterElement.setAttribute('data-index', index)
            this.letters.push(letterElement)
        });

        this.buildHeading()
    }
    
    // Builds the heading with the letters of the current word
    buildHeading() {
        // Reset the heading H1
        this.heading.innerHTML = ''

        this.letters.forEach( letter => { 
            // Adds each letter to the H1
            this.heading.appendChild( letter )
        });

        // Add the heading to the stage
        this.stage.append( this.heading )
    }

}

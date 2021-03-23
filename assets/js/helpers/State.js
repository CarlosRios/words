// Manages all aspects of the state for the project.
// This approach is much more organized and contains most of the variables
export default class State {

    constructor( words = [], errorMessages = [] ) {
        this.words = words

        // Errors
        this.errorMessages = errorMessages
        this.currentError = 0

        // activeWordPosition stores the index of the active word in our words array
        // activeWordObject stores the entire object
        // activeWordLetters is the word in an array of letter.
        this.activeWordPosition = 0
        this.activeWordObject = {}
        this.activeWordLetters = []

        // Current index in the game
        this.currentLetterPosition = 0
    }

    changeActiveWord( index = 0 ) {
        this.currentLetterPosition = 0
        this.activeWordPosition = index
        this.activeWordObject = this.words[ this.activeWordPosition ]
        this.activeWordLetters = this.activeWordObject.word.split('')
    }

}

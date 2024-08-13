enum CharactersEnum {
    Einstein = 'einstein',
    DaVinci = 'davinci'
}

export const CHARACTERS = {
    [CharactersEnum.DaVinci]: {
        name: 'Leonardo Da Vinci',
        question: 'Can you tell what you see on this image?',
        showImageControl: true,
    },
    [CharactersEnum.Einstein]: {
        name: 'Albert Einstein',
        question: 'Do you believe God is playing with dices?',
        showImageControl: false
    }
}

enum PagesEnum {
    TextGeneration = 'text-generation',
    ImageAnalysis = 'image-analysis',
    FunctionCalling = 'function-calling'
}

export const PAGES = {
    [PagesEnum.ImageAnalysis]: {
        name: 'Leonardo Da Vinci',
        question: 'Can you tell what you see on this image?',
        showImageControl: true,
        title: 'Chat Completions: Image Analysis'
    },
    [PagesEnum.TextGeneration]: {
        name: 'Albert Einstein',
        question: 'Do you believe God is playing with dices?',
        showImageControl: false,
        title: 'Chat Completions: Text Generation'
    },
    [PagesEnum.FunctionCalling]: {
        name: 'The Weather Woman on TV',
        question: 'What is the current weather in Ibiza, Spain',
        showImageControl: false,
        title: 'Chat Completions: Function Calling',
    }
}

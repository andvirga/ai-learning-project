import OpenAI from "openai";

type ChatCompletionArgs = {
    temperature: number;
    topP: number;
    systemPrompt?: string;
    userPrompt?: string;
    base64Image?: string | ArrayBuffer | null,
};

class ChatService {
    private openai: OpenAI;

    constructor(apiKey: string) {
        this.openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true,
        });
    }

    public async getChatCompletion({
        temperature,
        topP,
        systemPrompt = "",
        userPrompt = "",
        base64Image,
    }: ChatCompletionArgs) {
        const completion = await this.openai.chat.completions.create(base64Image ? {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Can you tell what you see on this image?" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": base64Image.toString(),
                            },
                        },
                    ],
                },
            ],
        } : {
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            temperature: temperature,
            top_p: topP,
        });
        return completion;
    }
}

const apiKey = process.env.OPENAI_API_KEY || "";
const chatService = new ChatService(apiKey);

export default chatService;
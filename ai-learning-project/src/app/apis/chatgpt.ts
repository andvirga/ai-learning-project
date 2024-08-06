import OpenAI from "openai";

type ChatCompletionArgs = {
    systemPrompt?: string;
    userPrompt?: string;
    temperature: number;
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
        systemPrompt = "",
        userPrompt = "",
        temperature,
    }: ChatCompletionArgs) {
        const completion = await this.openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "gpt-4o-mini",
            temperature: temperature,
        });
        return completion;
    }
}

const apiKey = process.env.OPENAI_API_KEY || "";
const chatService = new ChatService(apiKey);

export default chatService;
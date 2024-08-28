import OpenAI from "openai";
import weatherService from "./weather";

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
        try {
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
                temperature,
                top_p: topP,
            });
            return { message: completion.choices[0].message?.content || "", hasErrors: false };
        }
        catch (e) {
            return {
                hasErrors: true,
                message: e as string,
            }
        }
    }

    public async getChatCompletionWithTools({
        systemPrompt = "",
        userPrompt = "",
    }: {
        systemPrompt: string,
        userPrompt: string
    }) {
        const tools: OpenAI.Chat.ChatCompletionTool[] = [
            {
                type: "function",
                function: {
                    name: "getWeather",
                    description: "Get the Weather Information (temperature, relative humidity, apparent temperature, precipitation level, rains and a indication if is day or night) for a specific geographic coordinate (Latitude, Longitude). Call this whenever you need to know the weather, for example when a user asks 'What is the weather in any specific city'",
                    parameters: {
                        type: "object",
                        properties: {
                            latitude: {
                                type: "number",
                                description: "The city geographic latitude. (Example: -32.9575)",
                            },
                            longitude: {
                                type: "number",
                                description: "The city geographic longitude. (Example: -60.6394)",
                            },
                        },
                        required: ["latitude", "longitude"],
                        additionalProperties: false,
                    },
                }
            }
        ];

        try {
            const completion = await this.openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                tools
            });

            // If Model decides to call the function
            if (completion.choices[0].message.tool_calls?.[0]) {
                // 1. Get the function to be called (tool_call) and its arguments and effectively call it
                const toolCall = completion.choices[0].message.tool_calls[0];
                const args = JSON.parse(toolCall.function.arguments);
                const { latitude, longitude } = args;
                const weather = await weatherService.getWeather(latitude, longitude);

                //2. Create a message containing the result of the function call for the specific tool_call_id
                const function_call_result_message: OpenAI.Chat.ChatCompletionToolMessageParam = {
                    role: "tool",
                    content: JSON.stringify(weather),
                    tool_call_id: toolCall.id
                };

                // 3. Prepare the chat completion call payload passing the function call result
                const completion_payload = {
                    model: "gpt-4o",
                    messages: [
                        { role: "system", content: systemPrompt } as OpenAI.Chat.ChatCompletionMessageParam,
                        { role: "user", content: userPrompt } as OpenAI.Chat.ChatCompletionMessageParam,
                        completion.choices[0].message,
                        function_call_result_message
                    ]
                };

                //4. Call again OpenAI API's chat completions endpoint to send the tool call result back to the model
                const final_response = await this.openai.chat.completions.create({
                    model: completion_payload.model,
                    messages: completion_payload.messages
                });

                return { message: final_response.choices[0].message?.content || "", hasErrors: false }
            }

            return { message: completion.choices[0].message?.content || "", hasErrors: false };
        }
        catch (e) {
            return {
                hasErrors: true,
                message: e as string,
            }
        }
    }
}

const apiKey = process.env.OPENAI_API_KEY || "";
const chatService = new ChatService(apiKey);

export default chatService;
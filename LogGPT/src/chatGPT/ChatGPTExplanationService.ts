import axios from 'axios';

// Define the type for a single message in the conversation
type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

// Define the type for the conversation context
type ConversationContext = Message[];

// Define the type for the API response structure
interface OpenAIResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

// Import the API key from your environment variables
const apiKey = import.meta.env.VITE_API_KEY as string;
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Function to trim the context to fit within a token limit
const trimContext = (context: ConversationContext, maxTokens: number): ConversationContext => {
    let tokenCount = 0;
    const trimmedContext: ConversationContext = [];

    for (let i = context.length - 1; i >= 0; i--) {
        const message = context[i];
        const messageTokens = message.content.split(/\s+/).length; // Approximate token count
        if (tokenCount + messageTokens > maxTokens) break;

        tokenCount += messageTokens;
        trimmedContext.unshift(message);
    }

    return trimmedContext;
};

// Function to get an explanation from the OpenAI API
export const getChatGPTExplanation = async (
    logLine: string,
    conversationContext: ConversationContext = [],
    maxTokens: number = 4096 // Adjust based on your model's token limit
): Promise<string> => {
    // Initialize the system message if the context is empty
    if (conversationContext.length === 0) {
        conversationContext.push({
            role: 'system',
            content: `
                You are a server logs expert. Analyze the following log line and provide a short context of what is wrong with it:
                ${logLine}
                Provide the explanation in concise bullet points.
            `,
        });
    }

    // Add the log line to the context
    conversationContext.push({ role: 'user', content: logLine });

    // Trim the context to fit within the token limit
    const trimmedContext = trimContext(conversationContext, maxTokens);

    try {
        // Send a POST request to the OpenAI API
        const response = await axios.post<OpenAIResponse>(
            API_URL,
            {
                model: 'gpt-4', // Specify the model to use
                messages: trimmedContext,
                max_tokens: 200, // Adjust to control response length
                temperature: 0.7, // Adjust to control randomness
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        // Extract the assistant's response
        const assistantMessage = response.data.choices[0].message.content;

        // Add the assistant's response to the context
        conversationContext.push({ role: 'assistant', content: assistantMessage });

        // Return the response
        return assistantMessage; 
    } catch (error) {
        console.error('Error fetching ChatGPT explanation:', error);
        return 'Error: Unable to fetch explanation.';
    }
};

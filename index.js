import openai from './config/open-ai.js';
import readLineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.bold.blue('Welcome to the Chatbot Program!'));
    console.log(colors.bold.blue('You can start chatting with the bot.'));

    const chatHistory = []; // store conversation history

    while(true){
        const userInput = readLineSync.question(colors.yellow('You: '));


        try{
            // Construct messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({role, content}));

            // Add latest user input
            messages.push({role: 'user', content: userInput})


            // Call the API with user input
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            });

            // Get completion text/content
            const completionText = completion.data.choices[0].message.content;

            if(userInput.toLowerCase() === 'exit'){
                console.log(colors.green('Bot: ') + completionText);
                return;
            }

            
            console.log(colors.green('Bot: ') + completionText);

            // Update histry with user and assistant response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);

        }
        catch(error){
            console.error(colors.red(error));
        }
    }

}

main();
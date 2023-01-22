import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 

`
"This is a chat with Steve Jobs the founder of Apple.\n\nMe: Hey Steve, what convictions kept you building Apple when it got tough?\n\nSteve: I always had an unwavering belief in the power of technology to change people's lives. So even when Apple was going through tough times, I knew that if we kept pushing forward, we would eventually make a difference. I also believed in the power of the team around me; I knew that if we all worked together, we could turn things around.\n\nMe: How can you keep your team motivated in a tough and turbulent times?\n\nSteve: It's all about communication and setting clear expectations. Everyone needs to understand the goal, and why it's so important. The team needs to feel like they are all part of the same mission, and that they are contributing to something bigger than themselves. Make sure to celebrate successes, no matter how small, as this will help to keep morale high. And finally, make sure that everyone is aware of the challenges that lie ahead and how they can work together to overcome them."

`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 1000,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt = 
  
  `
  
  `
  const secondCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptOutput.text}${secondPrompt}`,
    temperature: 0.8,
    max_tokens: 1000,
  });

  const secondPromptOutput = secondCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const fs = require('fs');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const jsonData = fs.readFileSync('newsData.json');
const data = JSON.parse(jsonData);


async function runCompletion () {

  let responses = [];
  for (let item of data) {
    const chatPrompts = `Creame un Artículo sobre ${item.Contenido} y dame un Título llamativo. En formato json con un "Título" y "Artículo"`;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: chatPrompts,
      n: 1,
      max_tokens: 2048,
      temperature: 0.6,
    });
  
    const chatResponse = completion.data.choices[0].text.trim();
    //console.log(chatResponse);
    const {Título, Artículo } = JSON.parse(chatResponse);
    responses.push({ Título, Artículo});
    //console.log(responses)
   
  }
  fs.writeFileSync(`news.json`, JSON.stringify(responses, null, 1));
}

runCompletion();
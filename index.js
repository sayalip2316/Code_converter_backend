const express=require("express")
const apiRouter=express.Router()
const {Configuration, OpenAIApi}=require("openai")


const openai=new OpenAIApi(new Configuration({
    apiKey:process.env.API_Key
}))



apiRouter.post("/chat/new",(req,res)=>{
    let question=req.body.message
    console.log(question)
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${question}`,
        max_tokens: 4000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }).then(response=>{
        return response?.data?.choices?.[0].text;
      }).then((ans)=>{
        const arr=ans?.split("\n").filter(ele=>ele).map(value=>value.trim());
        return arr;
      })
      .then(response=>{
        res.json({
            answer:response,
            prompt:question
        })        
    })
})

apiRouter.post("/convert",(req,res)=>{
    const {code, language } = req.body;
      
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Convert the following code:-  ${code} to:\n${language} code. \n if the code is incorrect or not complate please make gusses and complate it.`,
        max_tokens: 4000,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
      .then(response=>{
        res.json({
            answer:response
        })        
    })
})


// apiRouter.post('/convert', async (req, res) => {
//     try {
//       const {code, language } = req.body;
      
//       let response = await generateCompletion(`Convert the following code:-  ${code} to:\n${language} code. \n if the code is incorrect or not complate please make gusses and complate it.`);
//       res.json({ response });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   });






module.exports={apiRouter}
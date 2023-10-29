import express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router()

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openia = new OpenAIApi(config);

router.route("/").get((req, res) => {
    res.status(200).json({message: "This is from dalle route"})
})

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body

        const response = await openia.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: "b64_json"
        })

        const image = response.data.data[0].url;

        res.status(200).json({ photo: image })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'something went wrong'})
    }
})


export default router;

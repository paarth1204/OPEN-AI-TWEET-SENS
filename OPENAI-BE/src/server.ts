import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
};

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY_HERE",
});

app.use(cors(corsOptions));
app.use(express.json()); // Add this line to parse JSON in the request body

const server = http.createServer(app);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/chat", async (req: Request, res: Response) => {
  try {
    const userContent = req.body.tweet; // Assuming 'tweet' is the key in the request body
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Give the sentiment of the tweet ${userContent} in one word positive negative or neutral`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    res.json({ sentiment: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

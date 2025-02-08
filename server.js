import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
    try {
        const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

app.listen(5000, () => console.log("Proxy server running on port 5000"));

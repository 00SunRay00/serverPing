const express = require("express");
const { ping } = require("bedrock-protocol");

const app = express();
const PORT = 443;

app.get("/", async (req, res) => {
    const { host, port } = req.query;

    if (!host || !port) {
        return res.json({ error: "Укажите host и port в запросе, например: /?host=play.cubecraft.net&port=19132" });
    }

    try {
        const response = await ping({ host, port: parseInt(port) });

        res.json({
            host,
            port: parseInt(port),
            version: response.version,
            motd: response.motd,
            playersOnline: response.playersOnline,
            playersMax: response.playersMax
        });
    } catch (error) {
        res.json({ error: "Сервер оффлайн или произошла ошибка!" });
    }
});

app.listen(PORT, () => {

});

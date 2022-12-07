import http from "http";
import app from "./app.js";

app.set("port", process.env.PORT || 5500);
const server = http.createServer(app);

// Le serveur écoute le port
server.listen(process.env.PORT || 5500, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

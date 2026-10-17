const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
const port = process.env.PORT || 3000;

if (!token || !guildId) {
  console.error("Missing DISCORD_TOKEN or GUILD_ID environment variable.");
  process.exit(1);
}

const app = express();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, botReady: client.isReady() });
});

app.get("/api/stats", async (_req, res) => {
  try {
    if (!client.isReady()) {
      return res.status(503).json({ error: "Bot is starting" });
    }
    const guild = await client.guilds.fetch(guildId);
    const members = await guild.memberCount;
    // Presence intent must be enabled in the Developer Portal for accurate online counts.
    const cachedMembers = await guild.members.fetch({ withPresences: true });
    const online = cachedMembers.filter(m =>
      m.presence && m.presence.status !== "offline"
    ).size;
    res.set("Cache-Control", "no-store");
    res.json({ guild: guild.name, members, online, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Failed to read stats:", err.message);
    res.status(500).json({ error: "Could not read server stats" });
  }
});

app.get("/", (_req, res) => res.sendFile(require("path").join(__dirname, "public", "index.html")));
app.use(express.static(require("path").join(__dirname, "public")));

app.listen(port, () => console.log(`Z7L HOOD service listening on ${port}`));

client.once("ready", () => console.log(`Logged in as ${client.user.tag}`));
client.login(token).catch(err => {
  console.error("Bot login failed. Check DISCORD_TOKEN.", err.message);
  process.exit(1);
});

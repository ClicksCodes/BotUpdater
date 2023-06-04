import * as Discord from 'discord.js';
import Config from './config.json' assert { type: "json" };

const bots: Record<string, string> = {
    "715989276382462053": "nucleus",
    "779388856536530984": "nucleus",  // Testing
    "805392054678192169": "clicksforms",
    "679361555732627476": "gps",
    "803669905370775553": "cmping",
    "752188923505279037": "hooky",
    "757225562816118895": "castaway"
}

const loginPromises = [];
const re = await (await fetch('https://clicks.codes/api/season')).json();
if (re.daysIntoSeason <= 1 || true) {
    for(let token of Config.tokens) {
        let client = new Discord.Client({
            intents: ["Guilds"]
        });

        loginPromises.push(client.login(token).catch(() => console.log(`Token ${token} is invalid`)))

        client.on("ready", async () => {
            let r = await fetch(`https://assets.clicks.codes/bots/${bots[client.user!.id]}/${re.filePath}.png`)
            if(r.ok) {
                console.log(client.user!.username, `https://assets.clicks.codes/bots/${bots[client.user!.id] as string}/${re.filePath}.png`)
                await client.user?.setAvatar(`https://assets.clicks.codes/bots/${bots[client.user!.id]}/${re.filePath}.png`);
                if(client.user!.id === "715989276382462053") {
                    console.log('Guild', `https://assets.clicks.codes/company/logo/${re.filePath}.png`);
                    await client.guilds.cache.get("684492926528651336")!.setIcon(`https://assets.clicks.codes/company/logo/${re.filePath}.png`);
                }
                client.destroy();
            }
        });
    }

    await Promise.allSettled(loginPromises);
}

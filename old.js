const Discord = require('discord.js');
const fs = require('fs');
const colours = require('colors');
const readline = require('readline');
const functions = require(`./othermodules/copybot.js`);
let ids = ["<@187620473650020354>", "<@159031395241558017>", "<@136927577595052032>", "<@221170793126690816>"];
const client = new Discord.Client({
    fetchAllMembers: true
});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

let funnymemes = fs.readFileSync('array.txt').toString();
let lines = funnymemes.split('\n');
let {prefix, token} = require('./config.json');

client.on('message', message => {
        let randomUser = message.guild.members.cache.randomKey();
        // if the last message is from the bot it doesnt react
        if (message.author.bot) return;

        // fixing command syntax/arguments
        const args = message.content.slice(prefix.length).split(/ +/);
        const args2 = message.content.slice(prefix.length);
        const command = args.shift().toLowerCase();

        function saySomething(args) {
                let gen2 = functions.genNum(lines.length);
                console.log(randomUser);
                functions.copyPerson(message, client, randomUser, lines[gen2], 100).then(r => function () {
                    console.log("said ".underline.red + lines[gen2].underline.red);
                });
        }


        // command to write the arguments to the array file
        if (command === 'write') {
            client.commands.get('write').execute(fs, message, args2);
        }
        if (command === 'sayso') {
            let mentionedID = message.mentions.members.first();
            saySomething(mentionedID);
        }
        // randomly adds a message from the chat to the text file & randomly mimics someone and says something
        if (message.author.id !== "443266667779325952") {
            let rarerng = functions.chanceCalc(1);
            console.log(message.content + " " + rarerng + " RARE EDITION");
            if (rarerng === 1) {
                fs.appendFile('array.txt', message.content + "\n", (err) => {
                    if (err) throw err;
                });
                console.log("written " + message.content + " to array.txt");
                message.channel.send("> **written " + message.content + " to the database :)**");
            }
            let randomgen = functions.chanceCalc(5);
            console.log(message.content + " " + randomgen);
            if (randomgen === 1) {
                let gen2 = functions.genNum(lines.length);
                let lastUserID = message.author.id;
                let outMessage = lines[gen2];
                functions.copyPerson(message, client, lastUserID, outMessage, 100).then(r => function () {
                    console.log("said ".underline.red + lines[gen2].underline.red);
                });

            }
        }
    }
);

client.login(token);

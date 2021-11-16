const { Op } = require('sequelize');
const { Collection, Client, Formatters,  Intents } = require('discord.js');
const { users, scourgeAssignment } = require('./othermodules/dbObjects');
const { functions } = require('./othermodules/functions');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const scourgeLevel = new Collection();
const { prefix, token } = require('./config.json');

// [alpha]
Reflect.defineProperty(scourgeLevel, 'add', {
    value: async function add(id, amount) {
        const user = scourgeLevel.get(id);

        if (user) {
            user.level += Number(amount);
            return user.save();
        }

        const newUser = await users.create({ user_id: id, level: amount });
        scourgeLevel.set(id, newUser);
        return newUser;
    },
});

Reflect.defineProperty(scourgeLevel, 'getLevel', {
    value: function getLevel(id) {
        const user = scourgeLevel.get(id);
        return user ? user.level : 0;
    },
});

client.once('ready', async () => {
    // [beta]
    const storedLevels = await users.findAll();
    storedLevels.forEach(b => scourgeLevel.set(b.user_id, b))
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    let randomNumberGen = functions.chanceCalc(5);
    if (randomNumberGen === 1) {
        scourgeLevel.add(message.author.id, 1);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'level') {
        // [gamma]
        const target = interaction.options.getUser('user') ?? interaction.user;
        return interaction.reply(`${target.tag} has a scourge of level ${scourgeLevel.getLevel(target.id)}`);

    } else if (commandName === 'list') {
        // [delta]
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await users.findOne({ where: { user_id: target.id } });
        const scourges = await user.getScourge();

        if (!scourges.length) return interaction.reply(`${target.tag} currently has ${scourges.map(i => `${i.amount} ${i.scourge.name}`).join(', ')} hunting them.`);
    } else if (commandName === 'strengths') {
        // [epsilon]
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await users.findOne({ where: { user_id: target.id } });
        const scourge = await user.getScourge();

        if(!scourge.length) return interaction.reply(`${scourge.name}'s strengths are ${scourge.strengths.map(i => `${i.amount} ${i.scourge.strengths}`).join(', ')}.`);
    } else if (commandName === 'personality'){
        // [zeta]
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await users.findOne({ where: { user_id: target.id } });
        const scourge = await user.getScourge();

        if(!scourge.length) return interaction.reply(`${scourge.name}'s personality is ${scourge.personality}`);
    } else if (commandName === 'weaknesses'){
        // [theta]
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await users.findOne({ where: { user_id: target.id } });
        const scourge = await user.getScourge();

        if(!scourge.length) return interaction.reply(`${scourge.name}'s weaknesses are ${scourge.weaknesses.map(i => `${i.amount} ${i.scourge.weaknesses}`).join(', ')}.`);
    } else if (commandName === 'delete'){
        // [lambda]
    }
});

client.login(token);
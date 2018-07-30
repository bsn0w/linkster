const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.mentions.users.size) {
        return await message.channel.send({embed: {
            color: 3447003,
            author: {
                name: message.author.username + "'s Avatar",
                icon_url: message.author.displayAvatarURL
            },
            image: {
                url: message.author.displayAvatarURL
            }
        }});
    }

    const avatarList = message.mentions.users.map(user => {
        return `${user.username},${user.displayAvatarURL}`;
    });

    for (var i = 0; i < avatarList.length; i++) {
        let Username = avatarList[i].split(',')[0];
        let AvatarURL = avatarList[i].split(",").pop();

        await message.channel.send({embed: {
            color: 3447003,
            author: {
                name: Username + "'s Avatar",
                icon_url: AvatarURL
            },
            image: {
                url: AvatarURL
            }
        }});
    }
}

module.exports.help = {
    name: "avatar",
    description: "Gets user's avatar from a mention",
    usage: "avatar <mention>",
    type: "Utility"
}
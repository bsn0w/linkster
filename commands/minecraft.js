const Discord = module.require("discord.js");
const request = require('request');
const fs = module.require("fs");

module.exports.run = async (client, message, args) => {    
    let mcmember = await args[0];

    if (!mcmember) {
        return await message.channel.send({embed: {
            color: 3447003,
            title: "Mention a valid minecraft member!"
        }}).then(msg => msg.delete(2000));
    }

    request("https://use.gameapis.net/mc/player/profile/" + mcmember, function (error, response, body) {
        if (response.statusCode == 400) {
            message.delete();
            return message.channel.send({embed: {
                color: 3447003,
                title: "Mention a valid minecraft member!"
            }}).then(msg => msg.delete(2000));
        }

        const mcdata = JSON.parse(body);
       
        let profileName = mcdata.name; 
        let profileID = mcdata.id;
        let profileUUID = mcdata.uuid_formatted; 
        let profileAvatar = "https://crafatar.com/avatars/" + profileUUID;
        let profileBody = "https://crafatar.com/renders/body/" + profileUUID;
        var profileSkin;

        if (mcdata.properties_decoded.textures.SKIN) {
            profileSkin = mcdata.properties_decoded.textures.SKIN.url;
        } else {
            profileSkin = "No Skin Found"
        }
       
        message.channel.send({embed: {
            color: 3447003,
            author: {
                name: profileName,
                icon_url: profileAvatar
            },
            thumbnail: {
                url: profileBody
            },
            fields: [
            {
                name: "Profile ID",
                value: profileID
            },
            {
                name: "UUID",
                value: `${profileUUID}`
            },
            {
                name: "Skin",
                value: profileSkin,
                url: profileSkin
            },
            ],
                timestamp: new Date(),
            }
        });
    });
}

module.exports.help = {
    name: "minecraft",
    description: "Gets minecraft userinfo",
    usage: "minecraft <username>",
    type: "Utility"
}
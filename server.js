const Discord = require("discord.js");
const Client = new Discord.Client();
const db = require("quick.db");
const {
  threats,
  endthreat,
  hug,
  slap,
  pat,
  lick,
  snort,
  dance,
  thighs,
  yuri,
  moans,
  yaoi
} = require("./config.json");

Client.on("ready", () => {
  Client.user.setPresence({
    activity: { name: `hula hoops`, type: "LISTENING" },
    status: "idle"
  });
});

Client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === "grr") {
    message.channel.send("purr");
  }

  if (message.content === "bb fart") {
    message.channel.send("🍑💨");
  }
  Client.snipe = new Discord.Collection();
  Client.on("messageDelete", deletedMsg => {
    Client.snipe.set(deletedMsg.channel.id, deletedMsg);
  });

  if (message.content.startsWith("bb snipe")) {
    let channel = message.mentions.channels.first() || message.channel;
    const msg = Client.snipe.get(channel.id);
    if (!msg)
      return message.channel.send("Miss girl, there is nothing to snipe.");
    let embed = new Discord.MessageEmbed()
      .setTitle(msg.author.tag)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .setColor("#f5b5c8")
      .setDescription(msg.content);
    if (msg.attachments.first()) embed.setImage(msg.attachments.first().url);
    message.channel.send(embed);
  }

  if (message.content.startsWith("bb mute")) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      const member = message.mentions.members.first();
      if (!member) message.channel.send("please mention someone to mute.");
      else {
        member.roles.add(820354917083643966);
        message.channel.send("member has been successfully muted.");
      }
    } else {
      message.reply("you don't have permission to do that!");
    }
  }

  if (message.content.startsWith("bb kick")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick("Optional reason that will display in the audit logs")
          .then(() => {
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            message.reply("I was unable to kick the member");
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }

  if (message.content === "bb pray") {
    message.channel.send("🤲");
  }

  if (message.content === "bb threat") {
    let random = Math.floor(Math.random() * threats.length);
    let randm = Math.floor(Math.random() * endthreat.length);
    message.channel.send(threats[random] + endthreat[randm]);
  }

  if (message.content === "bb help") {
    let embed = new Discord.MessageEmbed()
      .setTitle(" **❛ 𝐇𝐞𝐥𝐩 ༉‧₊˚✧**")
      .setDescription("**𝐁𝐞𝐛𝐞 𝐛𝐨𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬**")
      .addField(
        "**➵ 𝐅𝐮𝐧**",
        "purr, fart, pray, threat, moan, grammarly, avatar"
      )
      .addField("**➵ 𝐌𝐨𝐝**", "snipe, mute, kick, whois")
      .addField("**➵ 𝐆𝐢𝐟**", "hug, pat, slap, lick, snort, dance")
      .addField("**➵ 𝐍𝐒𝐅𝐖**", "thighs, yuri")
      .setColor("#f5b5c8")
      .setImage(
        "https://cdn.discordapp.com/attachments/855801518405320755/867570023126794271/image0.jpg"
      )
      .setFooter("↳ My prefix is bb");
    message.channel.send(embed);
  }

  if (
    message.content === "bb avatar" ||
    message.content === "bb Avatar" ||
    message.content === ">AVATAR"
  ) {
    let embed = new Discord.MessageEmbed()
      .setTitle("❛ 𝐘𝐨𝐮𝐫 𝐚𝐯𝐚𝐭𝐚𝐫 ༉‧₊˚✧")
      .setImage(`${message.author.displayAvatarURL({ dynamic: true })}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ ${message.author.username} look at you being all sexy`);
    message.channel.send(embed);
  }

  if (message.content.toLowerCase().startsWith("bb whois")) {
    let user = message.mentions.users.first() || message.author;
    let member = message.mentions.members.first() || message.member;
    let e = new Discord.MessageEmbed()
      .setColor("#f5b5c8")
      .setTimestamp()
      .addFields(
        {
          name: "**𝐔𝐬𝐞𝐫 𝐣𝐨𝐢𝐧𝐞𝐝 𝐬𝐞𝐫𝐯𝐞𝐫 𝐚𝐭**",
          value: member.joinedAt
        },
        {
          name: "**𝐔𝐬𝐞𝐫 𝐜𝐫𝐞𝐚𝐭𝐞𝐝 𝐚𝐭**",
          value: user.createdAt
        },
        {
          name: "**𝐔𝐬𝐞𝐫 𝐧𝐚𝐦𝐞 & 𝐭𝐚𝐠**",
          value: user.tag
        },
        {
          name: "**𝐔𝐬𝐞𝐫 𝐈𝐃**",
          value: user.id
        }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }));
    message.channel.send(e);
  }

  if (message.content === "bebe") {
    message.channel.send("HELLO BITCHES");
  }

  if (db.get(message.author.id + "bb afk")) {
    message.channel.send(`Welcome back ${message.author}`);
    db.delete(message.author.id + "bb afk");
    db.delete(message.author.id + "-messageafk");
  }
  if (message.content === "-afk") {
    message.channel.send(
      "Aight, I have set your AFK. I will send a message to the users who mention you.."
    ); // this is the afk on message
    // then here you use the database :
    db.set(message.author.id + "-afk", "true");
    db.set(
      message.author.id + "-messageafk",
      message.content.split(" ").slice(2)
    );
  }

  if (message.content === "bb grammarly") {
    let embed = new Discord.MessageEmbed()
      .setTitle("**❛ 𝐆𝐫𝐚𝐦𝐦𝐚𝐫𝐥𝐲 ༉‧₊˚✧**")
      .setDescription(
        "*Writing's not easy. That's why Grammarly can help. This sentence is grammatically correct, but it's wordy, and hard to read. It undermines the writer's message and the word choice is bland. Grammarly's cutting edge technology helps you craft compelling, understandable writing that makes an impact on your reader. Much better. Are you ready to give it a try? Installation is simple and free. Visit Grammarly.com today!*"
      )
      .setColor("#f5b5c8")
      .setFooter("↳ Correct your grammar, you fools.");
    message.channel.send(embed);
  }

  if (message.content.startsWith("bb hug")) {
    let victim = message.mentions.users.first();
    if (!victim) return message.reply("**Its sad to hug yourself :(**");
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} hugs ${victim.tag}`)
      .setImage(`${hug[Math.floor(Math.random() * hug.length)]}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ how adorable!`);

    message.channel.send(embed);
  }

  if (message.content.startsWith("bb slap")) {
    let victim = message.mentions.users.first();
    if (!victim)
      return message.reply(
        "**please stop slapping the air, it's embarassing.**"
      );
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} slaps ${victim.tag}`)
      .setImage(`${slap[Math.floor(Math.random() * slap.length)]}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ rip that coochie ayy`);

    message.channel.send(embed);
  }

  if (message.content.startsWith("bb pat")) {
    let victim = message.mentions.users.first();
    if (!victim) return message.reply("**pls why are you patting yourself**");
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} pat ${victim.tag}`)
      .setImage(`${pat[Math.floor(Math.random() * pat.length)]}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ now say woof woof`);

    message.channel.send(embed);
  }

  if (message.content.startsWith("bb lick")) {
    let victim = message.mentions.users.first();
    if (!victim)
      return message.reply("**not you licking the air like a weido**");
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} licks ${victim.tag}`)
      .setImage(`${lick[Math.floor(Math.random() * lick.length)]}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ slobby slobby`);

    message.channel.send(embed);
  }

  if (message.content.startsWith("bb snort")) {
    let victim = message.mentions.users.first();
    if (!victim) return message.reply("**stop snorting the air**");
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} snorted ${victim.tag}`)
      .setImage(`${snort[Math.floor(Math.random() * snort.length)]}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ Don't do drugs kids`);

    message.channel.send(embed);
  }
  if (message.content.startsWith("bb dance")) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} busted a move :0`)
      .setImage(`${dance[Math.floor(Math.random() * dance.length)]}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ eoeooeoeoeeo`);

    message.channel.send(embed);
  }

  if (message.content.startsWith("bb thighs")) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`**❛ 𝐓𝐡𝐢𝐠𝐡𝐬 𝐬𝐚𝐯𝐞 𝐋𝐢𝐯𝐞𝐬 ༉‧₊˚✧**`)
      .setImage(`${thighs[Math.floor(Math.random() * thighs.length)]}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ NSFW commands are only allowed in NSFW channels.`);

    message.channel.send(embed);
  }

  if (message.content.startsWith("bb yuri")) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`❛ 𝐘𝐮𝐫𝐢 ༉‧₊˚✧`)
      .setImage(`${yuri[Math.floor(Math.random() * yuri.length)]}`)
      .setColor("#f5b5c8")
      .setFooter(`↳ NSFW commands are only allowed in NSFW channels.`);

    message.channel.send(embed);
  }

  if (message.content.startsWith("bb yaoi")) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`❛ 𝐘𝐚𝐨𝐢 ༉‧₊˚✧`)
      .setImage(`${yaoi[Math.floor(Math.random() * yaoi.length)]}`)
      .setColor("↳ NSFW commands are only allowed in NSFW channels.");

    message.channel.send(embed);
  }

  if (message.content === "bb moan") {
    message.channel.send(`${moans[Math.floor(Math.random() * moans.length)]}`);
  }

  if (message.content === "bb hi") {
    let hello = ["hey bestie", "hihi", "heyy", "stfu", "no"];
    message.channel.send(`${hello[Math.floor(Math.random() * hello.length)]}`);
  }
});

Client.login(process.env.token);

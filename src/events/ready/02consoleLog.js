const asciiArt = `Made by:
 _____ _                     _______ 
|_   _| |                   / /____ |
  | | | |_   _  __ _ ___   / /    / /
  | | | | | | |/ _\` / __| < <     \\ \\
 _| |_| | |_| | (_| \\__ \\  \\ \\.___/ /
 \\___/|_|\\__, |\\__,_|___/   \\_\\____/ 
          __/ |                      
         |___/                       
`;

module.exports = (client) => {
  console.log(`${client.user.tag} is online.`);
  console.log(asciiArt);
  console.log("GH: https://github.com/XacK7 ")
  console.log(`Currently in ${client.guilds.cache.size} servers :`);
    // Fetch and log the names and member counts of all guilds
    client.guilds.cache.forEach(async guild => {
      // Fetch the guild to ensure you have the latest data

      const fetchedGuild = await client.guilds.fetch(guild.id, { withCounts: true });
      const owner = await guild.fetchOwner();
      
      console.log(`[${fetchedGuild.id}]- ${fetchedGuild.name}  [ ${fetchedGuild.memberCount}] ${owner.user.tag}`);

  });
};

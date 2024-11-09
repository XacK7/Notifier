const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {

  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      //testServer
    );

    for (const localCommand of localCommands) {
      try {
        
        const { name, description, options, type, dev } = localCommand;
        if(dev){continue;}
        const existingCommand = await applicationCommands.cache.find(
          (cmd) => cmd.name === name
        );
  
        if (existingCommand) {
          if (localCommand.deleted) {
            await applicationCommands.delete(existingCommand.id);
            console.log(`🗑 Deleted command "${name}".`);
            continue;
          }
  
          if (areCommandsDifferent(existingCommand, localCommand)) {
            await applicationCommands.edit(existingCommand.id, {
              description,
              options,
            });
  
            // console.log(`🔁 Edited command "${name}".`);
          }
        } else {
          if (localCommand.deleted) {
            console.log(
              `⏩ Skipping registering command "${name}" as it's set to delete.`
            );
            continue;
          }
  
          await applicationCommands.create({
            name,
            description,
            options,
            type,
          });
  
          console.log(`👍 Registered command "${name}."`);
        }
      } catch (error) {
        console.log("error registering command : " , localCommand.name)
      }
    
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};

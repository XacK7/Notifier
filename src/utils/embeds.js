const { EmbedBuilder } = require('discord.js');

function createEmbed(title, description, color) {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp();
}

function warningEmbed(description) {
    return createEmbed(':warning: • Warning', description, '#ffcc00'); // Yellow color
}

function infoEmbed(description) {
    return createEmbed(':information_source: • Information', description, '#0099ff'); // Blue color
}

function successEmbed(description) {
    return createEmbed('✅ • Success', description, '#00cc66'); // Green color
}

function processingEmbed(description) {
    return createEmbed('🔄 • Processing', description, '#0099ff'); 
}
function errorEmbed(description) {
    return createEmbed('⛔ • Error', description, '#ff0000'); // Red color
}

module.exports = {
    warningEmbed,
    infoEmbed,
    successEmbed,
    errorEmbed,
    processingEmbed,
};

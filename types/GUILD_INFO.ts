interface GUILD_INFO_CHANNELS {
    welcome: number;
    logs: number
}

export class GUILD_INFO_OBJ {
    guild_id: number;
    prenium: boolean;
    channels: GUILD_INFO_CHANNELS;

    constructor(guild_id: number, prenium: boolean, channels: GUILD_INFO_CHANNELS) {
        this.guild_id = guild_id;
        this.prenium = prenium;
        this.channels = channels;
    }
}
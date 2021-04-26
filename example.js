const AccBroadcast = require("./AccBroadcast");

const accBroadcast = new AccBroadcast("My Application", "asd");

accBroadcast.on("registration_result", console.log);
accBroadcast.on("realtime_update", console.log);
accBroadcast.on("realtime_car_update", console.log);
accBroadcast.on("track_data", console.log);
accBroadcast.on("entry_list", console.log);
accBroadcast.on("entry_list_car", console.log);
accBroadcast.on("broadcasting_event", console.log);

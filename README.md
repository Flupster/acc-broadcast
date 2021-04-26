### Quickstart

`npm install acc-broadcast`

```JS
const AccBroadcast = require("acc-broadcast");
const accBroadcast = new AccBroadcast("My Application", "asd");

accBroadcast.on("realtime_car_update", (update) => {
    console.clear();
    console.log(`Gear: ${update.Gear}`)
    console.log(`Speed: ${update.Kmh} km/h`);
    console.log(`Delta: ${update.Delta} ms`);
})
```

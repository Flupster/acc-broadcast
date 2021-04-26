const dgram = require("dgram");
const EventEmitter = require("events");
const binutils = require("binutils");
const structs = require("./structs");

class AccBroadcast extends EventEmitter {
  constructor(name, password, cmdPassword = "", updateMS = 250) {
    super();
    this.socket = dgram.createSocket("udp4");
    this.socket.on("message", this.onMessage.bind(this));

    this.connect(name, password, cmdPassword, updateMS);
    this.cars = new Map();

    process.on("SIGINT", this.disconnect.bind(this));
  }

  onMessage(message) {
    const br = new binutils.BinaryReader(message, "little");
    const messageType = br.ReadUInt8();

    switch (messageType) {
      case 1: //REGISTRATION_RESULT
        this.registration = structs.parseRegistrationResult(br);
        this.emit("registration_result", this.registration);

        if (!this.registration.isReadOnly) {
          this.requestTrackData();
          this.requestEntryList();
        }
        break;
      case 2: //REALTIME_UPDATE
        this.emit("realtime_update", structs.parseRealTimeUpdate(br));
        break;
      case 3: //REALTIME_CAR_UPDATE
        this.emit("realtime_car_update", structs.parseRealTimeCarUpdate(br));
        break;
      case 4: //ENTRY_LIST
        this.cars.clear();
        structs.parseEntryList(br).forEach((carId) => this.cars.set(carId, {}));
        this.emit("entry_list", this.cars);
        break;
      case 5: //TRACK_DATA
        this.emit("track_data", structs.parseTrackData(br));
        break;
      case 6: //ENTRY_LIST_CAR
        this.emit("entry_list_car", structs.parseEntryListCar(br, this.cars));
        break;
      case 7: //BROADCASTING_EVENT
        this.emit(
          "broadcasting_event",
          structs.parseBroadcastEvent(br, this.cars)
        );
        break;
      default:
        console.error(`unknown messageType ${messageType}`);
    }
  }

  requestTrackData() {
    this.send(structs.RequestTrackData(this.registration.ConnectionId));
  }

  requestEntryList() {
    this.send(structs.RequestEntryList(this.registration.ConnectionId));
  }

  connect(name, password, cmdPassword, updateMS = 250) {
    this.send(
      structs.RegisterConnection(name, password, cmdPassword, updateMS)
    );
  }

  disconnect() {
    this.send(structs.DeregisterConnection());
    process.exit(0);
  }

  send(buffer) {
    this.socket.send(buffer, 0, buffer.length, 9000, "127.0.0.1");
  }
}

module.exports = AccBroadcast;

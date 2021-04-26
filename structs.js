const utf8 = require("utf8-bytes");
const binutils = require("binutils");

const RegisterConnection = (
  displayName,
  connectionPassword,
  commandPassword,
  updateMS
) => {
  const displayNameArray = utf8(displayName);
  const connectionPasswordArray = utf8(connectionPassword);
  const commandPasswordArray = utf8(commandPassword);

  const writer = new binutils.BinaryWriter("little");
  writer.WriteUInt8(1);
  writer.WriteUInt8(4);
  writer.WriteUInt16(displayNameArray.length);
  writer.WriteBytes(displayNameArray);
  writer.WriteUInt16(connectionPasswordArray.length);
  writer.WriteBytes(connectionPasswordArray);
  writer.WriteUInt32(updateMS);
  writer.WriteUInt16(commandPasswordArray.length);
  writer.WriteBytes(commandPasswordArray);

  return writer.ByteBuffer;
};

const DeregisterConnection = () => {
  const writer = new binutils.BinaryWriter("little");
  writer.WriteUInt8(9);
  return writer.ByteBuffer;
};

const RequestEntryList = (ConnectionId) => {
  const writer = new binutils.BinaryWriter("little");
  writer.WriteUInt8(10);
  writer.WriteInt32(ConnectionId);

  return writer.ByteBuffer;
};

const RequestTrackData = (ConnectionId) => {
  const writer = new binutils.BinaryWriter("little");
  writer.WriteUInt8(11);
  writer.WriteInt32(ConnectionId);

  return writer.ByteBuffer;
};

const parseEntryList = (br) => {
  const entryList = [];

  const connectionId = br.ReadInt32();
  const carEntryCount = br.ReadUInt16();
  for (let i = 0; i < carEntryCount; i++) {
    entryList.push(br.ReadUInt16());
  }

  return entryList;
};

const parseRegistrationResult = (br) => {
  const result = {};
  result.ConnectionId = br.ReadInt32();
  result.ConnectionSuccess = !!br.ReadUInt8(1);
  result.isReadOnly = !br.ReadUInt8(1);
  result.errMsg = parseString(br);

  return result;
};

const parseRealTimeUpdate = (br) => {
  const update = {};
  update.EventIndex = br.ReadUInt16();
  update.SessionIndex = br.ReadUInt16();
  update.SessionType = br.ReadUInt8();
  update.Phase = br.ReadUInt8();
  update.sessionTime = br.ReadFloat();
  update.sessionEndTime = br.ReadFloat();
  update.FocusedCarIndex = br.ReadInt32();
  update.ActiveCameraSet = parseString(br);
  update.ActiveCamera = parseString(br);
  update.CurrentHudPage = parseString(br);

  update.IsReplayPlaying = !!br.ReadUInt8();
  if (update.IsReplayPlaying) {
    update.ReplaySessionTime = br.ReadFloat();
    update.ReplayRemainingTime = br.ReadFloat();
  }

  update.TimeOfDay = br.ReadFloat();
  update.AmbientTemp = br.ReadUInt8();
  update.TrackTemp = br.ReadUInt8();
  update.Clouds = br.ReadUInt8() / 10.0;
  update.RainLevel = br.ReadUInt8() / 10.0;
  update.Wetness = br.ReadUInt8() / 10.0;

  update.BestSessionLap = parseLap(br);

  return update;
};

const parseRealTimeCarUpdate = (br) => {
  return {
    CarIndex: br.ReadUInt16(),
    DriverIndex: br.ReadUInt16(),
    DriverCount: br.ReadUInt8(),
    Gear: br.ReadUInt8() - 1,
    WorldPosX: br.ReadFloat(),
    WorldPosY: br.ReadFloat(),
    Yaw: br.ReadFloat(),
    CarLocation: br.ReadUInt8(),
    Kmh: br.ReadUInt16(),
    Position: br.ReadUInt16(),
    CupPosition: br.ReadUInt16(),
    TrackPosition: br.ReadUInt16(),
    SplinePosition: br.ReadFloat(),
    Laps: br.ReadUInt16(),
    Delta: br.ReadInt32(),
    BestSessionLap: parseLap(br),
    LastLap: parseLap(br),
    CurrentLap: parseLap(br),
  };
};

const parseEntryListCar = (br, cars) => {
  const carInfo = {};
  const carId = br.ReadUInt16();

  carInfo.CarModelType = br.ReadUInt8();
  carInfo.TeamName = parseString(br);
  carInfo.RaceNumber = br.ReadInt32();
  carInfo.CupCategory = br.ReadUInt8(); // Cup: Overall/Pro = 0, ProAm = 1, Am = 2, Silver = 3, National = 4
  carInfo.CurrentDriverIndex = br.ReadUInt8();
  carInfo.Nationality = br.ReadUInt16();
  carInfo.Drivers = [];

  const driversOnCarCount = br.ReadUInt8();
  for (let i = 0; i < driversOnCarCount; i++) {
    carInfo.Drivers.push({
      FirstName: parseString(br),
      LastName: parseString(br),
      ShortName: parseString(br),
      Category: br.ReadUInt8(),
      Nationality: br.ReadUInt16(),
    });
  }

  carInfo.CurrentDriver = carInfo.Drivers[carInfo.CurrentDriverIndex];

  cars.set(carId, carInfo);
  return carInfo;
};

const parseBroadcastEvent = (br, cars) => {
  const event = {
    Type: br.ReadUInt8(),
    Msg: parseString(br),
    TimeMS: br.ReadInt32(),
    CarId: br.ReadInt32(),
  };

  event.Car = cars.get(event.CarId);

  return event;
};

const parseTrackData = (br) => {
  const trackData = {
    CameraSets: {},
    HUDPages: [],
  };

  trackData.ConnectionId = br.ReadInt32();
  trackData.TrackName = parseString(br);
  trackData.TrackId = br.ReadInt32();
  trackData.TrackMeters = br.ReadInt32();

  const cameraSetCount = br.ReadUInt8();
  for (let i = 0; i < cameraSetCount; i++) {
    const camSetName = parseString(br);
    trackData.CameraSets[camSetName] = [];

    const cameraCount = br.ReadUInt8();
    for (let j = 0; j < cameraCount; j++) {
      const cameraName = parseString(br);
      trackData.CameraSets[camSetName].push(cameraName);
    }
  }

  const hudPagesCount = br.ReadUInt8();
  for (let i = 0; i < hudPagesCount; i++) {
    trackData.HUDPages.push(parseString(br));
  }

  return trackData;
};

const parseLap = (br) => {
  const lap = { Splits: [] };

  lap.LaptimeMS = br.ReadInt32();
  lap.CarIndex = br.ReadUInt16();
  lap.DriverIndex = br.ReadUInt16();

  const splitCount = br.ReadUInt8();

  for (let i = 0; i < splitCount; i++) {
    lap.Splits.push(br.ReadInt32());
  }

  lap.IsInvalid = !!br.ReadUInt8();
  lap.IsValidForBest = !!br.ReadUInt8();
  lap.isOutlap = !!br.ReadUInt8();
  lap.isInlap = !!br.ReadUInt8();

  if (lap.LaptimeMS === 2147483647) lap.LaptimeMS = null;
  lap.Splits = lap.Splits.map((split) => (split === 2147483647 ? null : split));

  return lap;
};

const parseString = (br) => {
  const length = br.ReadUInt16();
  const string = br.ReadBytes(length);
  return string.toString("utf8");
};

module.exports = {
  RegisterConnection,
  DeregisterConnection,
  RequestTrackData,
  RequestEntryList,
  parseRegistrationResult,
  parseRealTimeCarUpdate,
  parseRealTimeUpdate,
  parseTrackData,
  parseEntryList,
  parseEntryListCar,
  parseBroadcastEvent,
};

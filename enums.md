# Events

### realtime_update

```JS
{
    EventIndex: 0,
    SessionIndex: 0,
    SessionType: 11, // @ENUM RaceSessionType
    Phase: 2, // @ENUM SessionPhase
    sessionTime: -1,
    sessionEndTime: -1,
    FocusedCarIndex: 0,
    ActiveCameraSet: "Drivable",
    ActiveCamera: "DashPro",
    CurrentHudPage: "Basic HUD",
    IsReplayPlaying: false,
    TimeOfDay: 82800,
    AmbientTemp: 21,
    TrackTemp: 21,
    Clouds: 0,
    RainLevel: 0,
    Wetness: 0,
    BestSessionLap: {
      Splits: [null, null, null],
      LaptimeMS: null,
      CarIndex: 0,
      DriverIndex: 0,
      IsInvalid: false,
      IsValidForBest: true,
      isOutlap: false,
      isInlap: false,
    },
}
```

### registration_results

```JS
{
    ConnectionId: 1, // Incrementing ID
    ConnectionSuccess: true,
    isReadOnly: false,
    errMsg: "",
}
```

---

### realtime_car_update

```JS
 {
  CarIndex: 0,
  DriverIndex: 0,
  DriverCount: 1,
  Gear: 0,
  WorldPosX: 0.10451728850603104,
  WorldPosY: 0.0009660766809247434,
  Yaw: -0.0001782241160981357,
  CarLocation: 1, // @ENUM CarLocationEnum
  Kmh: 0,
  Position: 1,
  CupPosition: 1,
  TrackPosition: 0,
  SplinePosition: 0.8307161927223206,
  Laps: 0,
  Delta: 0,
  BestSessionLap: {
    Splits: [ null, null, null ],
    LaptimeMS: null,
    CarIndex: 0,
    DriverIndex: 0,
    IsInvalid: false,
    IsValidForBest: true,
    isOutlap: false,
    isInlap: false
  },
  LastLap: {
    Splits: [],
    LaptimeMS: null,
    CarIndex: 0,
    DriverIndex: 0,
    IsInvalid: false,
    IsValidForBest: true,
    isOutlap: false,
    isInlap: false
  },
  CurrentLap: {
    Splits: [],
    LaptimeMS: 0,
    CarIndex: 0,
    DriverIndex: 0,
    IsInvalid: false,
    IsValidForBest: true,
    isOutlap: false,
    isInlap: false
  }
}
```

### track_data

```JS
{
  CameraSets: {
    Drivable: [
      'Chase',   'FarChase',
      'Bonnet',  'DashPro',
      'Cockpit', 'Dash',
      'Helmet'
    ],
    Helicam: [ 'Helicam' ],
    Onboard: [ 'Onboard0', 'Onboard1', 'Onboard2', 'Onboard3' ],
    pitlane: [ 'CameraPit1' ],
    set1: [
      'CameraTV4',   'CameraTV4B',
      'CameraTV5',   'CameraTV6_0',
      'CameraTV7_0', 'CameraTV8',
      'CameraTV9',   'CameraTV10_16',
      'CameraTV11',  'CameraTV12_5',
      'CameraTV13',  'CameraTV14',
      'CameraTV15',  'CameraTV16_1',
      'CameraTV1',   'CameraTV1B_5',
      'CameraTV2',   'CameraTV3'
    ],
    set2: [
      'CameraTV20', 'CameraTV21',
      'CameraTV22', 'CameraTV23',
      'CameraTV24', 'CameraTV25',
      'CameraTV26', 'CameraTV27',
      'CameraTV17', 'CameraTV18',
      'CameraTV19'
    ],
    setVR: [
      'CameraVR3', 'CameraVR4',
      'CameraVR5', 'CameraVR6',
      'CameraVR7', 'CameraVR8',
      'CameraVR9', 'CameraVR1',
      'CameraVR2'
    ]
  },
  HUDPages: [
    'Blank',
    'Basic HUD',
    'Help',
    'TimeTable',
    'Broadcasting',
    'TrackMap'
  ],
  ConnectionId: 4,
  TrackName: 'Monza Circuit',
  TrackId: 3,
  TrackMeters: 5793
}
```

### entry_list_car

```JS
{
  CarModelType: 22,
  TeamName: 'Ema Group 59 Racing',
  RaceNumber: 60,
  CupCategory: 0,
  CurrentDriverIndex: 0,
  Nationality: 41, // @ENUM NationalityEnum
  Drivers: [
    {
      FirstName: 'Martin',
      LastName: 'Kodric',
      ShortName: 'KOD',
      Category: 1, // @ENUM DriverCategory
      Nationality: 33 // @ENUM NationalityEnum
    }
  ],
  CurrentDriver: {
    FirstName: 'Martin',
    LastName: 'Kodric',
    ShortName: 'KOD',
    Category: 1, // @ENUM DriverCategory
    Nationality: 33 // @ENUM NationalityEnum
  }
}
```

### broadcasting_event

```JS
{
  Type: 7, // @ENUM BroadcastingCarEventType
  Msg: '01:50.748',
  TimeMS: 12054,
  CarId: 1052,
  Car: {
    CarModelType: 22,
    TeamName: '',
    RaceNumber: 27,
    CupCategory: 0,
    CurrentDriverIndex: 0,
    Nationality: 0, // @ENUM NationalityEnum
    Drivers: [
      {
        FirstName: 'Martin',
        LastName: 'Kodric',
        ShortName: 'KOD',
        Category: 1, // @ENUM DriverCategory
        Nationality: 33 // @ENUM NationalityEnum
      }
    ],
    CurrentDriver: {
      FirstName: 'Martin',
      LastName: 'Kodric',
      ShortName: 'KOD',
      Category: 1, // @ENUM DriverCategory
      Nationality: 33 // @ENUM NationalityEnum
    }
  }
}
```

# Enums

```C#
enum DriverCategory
{
    Platinum = 3,
    Gold = 2,
    Silver = 1,
    Bronze = 0,
    Error = 255
}

enum LapType
{
    ERROR = 0,
    Outlap = 1,
    Regular = 2,
    Inlap = 3
}

enum CarLocationEnum
{
    NONE = 0,
    Track = 1,
    Pitlane = 2,
    PitEntry = 3,
    PitExit = 4
}

enum SessionPhase
{
    NONE = 0,
	Starting = 1,
	PreFormation = 2,
	FormationLap = 3,
	PreSession = 4,
	Session = 5,
	SessionOver = 6,
	PostSession = 7,
	ResultUI = 8
};

enum RaceSessionType
{
    Practice = 0,
	Qualifying = 4,
	Superpole = 9,
	Race = 10,
	Hotlap = 11,
	Hotstint = 12,
	HotlapSuperpole = 13,
	Replay = 14
};

enum BroadcastingCarEventType
{
    None = 0,
    GreenFlag = 1,
    SessionOver = 2,
    PenaltyCommMsg = 3,
    Accident = 4,
    LapCompleted = 5,
    BestSessionLap = 6,
    BestPersonalLap = 7
};

enum NationalityEnum
{
  Any = 0,
	Italy = 1,
	Germany = 2,
	France = 3,
	Spain = 4,
	GreatBritain = 5,
	Hungary = 6,
	Belgium = 7,
	Switzerland = 8,
	Austria = 9,
	Russia = 10,
	Thailand = 11,
	Netherlands = 12,
	Poland = 13,
	Argentina = 14,
	Monaco = 15,
	Ireland = 16,
	Brazil = 17,
	SouthAfrica = 18,
	PuertoRico = 19,
	Slovakia = 20,
	Oman = 21,
	Greece = 22,
	SaudiArabia = 23,
	Norway = 24,
	Turkey = 25,
	SouthKorea = 26,
	Lebanon = 27,
	Armenia = 28,
	Mexico = 29,
	Sweden = 30,
	Finland = 31,
	Denmark = 32,
	Croatia = 33,
	Canada = 34,
	China = 35,
	Portugal = 36,
	Singapore = 37,
	Indonesia = 38,
	USA = 39,
	NewZealand = 40,
	Australia = 41,
	SanMarino = 42,
	UAE = 43,
	Luxembourg = 44,
	Kuwait = 45,
	HongKong = 46,
	Colombia = 47,
	Japan = 48,
	Andorra = 49,
	Azerbaijan = 50,
	Bulgaria = 51,
	Cuba = 52,
	CzechRe= 53,
	Estonia = 54,
	Georgia = 55,
	India = 56,
	Israel = 57,
	Jamaica = 58,
	Latvia = 59,
	Lithuania = 60,
	Macau = 61,
	Malaysia = 62,
	Nepal = 63,
	NewCaledonia = 64,
	Nigeria = 65,
	NorthernIreland = 66,
	PapuaNewGuinea = 67,
	Philippines = 68,
	Qatar = 69,
	Romania = 70,
	Scotland = 71,
	Serbia = 72,
	Slovenia = 73,
	Taiwan = 74,
	Ukraine = 75,
	Venezuela = 76,
	Wales = 77,
  Iran = 78,
  Bahrain = 79,
  Zimbabwe = 80,
  ChineseTaipei = 81,
  Chile = 82,
  Uruguay = 83,
  Madagascar = 84
};
```

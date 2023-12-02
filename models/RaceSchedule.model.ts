export default interface RaceSchedule {
    season: string,
    round: string,
    url: string,
    raceName: string,
    Circuit: {
      circuitId: string,
      url: string,
      circuitName: string,
      Location: {
        lat: string,
        long: string,
        locality: string,
        country: string
      }
    },
    date: string,
    time?: string,
    localTime: Date | string,
    FirstPractice?: {
      date: string,
      time: string,
      localTime: Date,
    },
    SecondPractice?: {
        date: string,
        time: string,
        localTime: Date,
    },
    ThirdPractice?: {
        date: string,
        time: string,
        localTime: Date,
    },
    Qualifying?: {
      date: string,
      time: string,
      localTime: Date,
    },
    Sprint?: {
      date: string,
      time: string,
      localTime: Date,
    }
  }
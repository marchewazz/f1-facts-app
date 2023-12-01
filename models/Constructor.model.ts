export default interface Constructor {
    position: string,
    positionText: string,
    points: string,
    wins: string,
    Constructor: {
      constructorId: string,
      url: string,
      name: string,
      nationality: string
    }
    Drivers?: {
      driverId: string,
      permanentNumber: string,
      code: string,
      url: string,
      givenName: string,
      familyName: string,
      dateOfBirth: string,
      nationality: string
    }[]
  }
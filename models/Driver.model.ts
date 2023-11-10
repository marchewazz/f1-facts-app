export default interface Driver {
    position: string,
    positionText: string,
    points: string,
    wins: string,
    Driver: {
      driverId: string,
      permanentNumber: string,
      code: string,
      url: string,
      givenName: string,
      familyName: string,
      dateOfBirth: string,
      nationality: string
    },
    Constructors: [
      {
        constructorId: string,
        url: string,
        name: string,
        nationality: string
      }
    ]
  }
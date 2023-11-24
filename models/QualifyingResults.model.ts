export default interface QualifyingResults {
    Results: DriverQualifyingResult[]
}

export interface DriverQualifyingResult {
    number: string,
    position: string,
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
    Constructor: {
      constructorId: string,
      url: string,
      name: string,
      nationality: string
    },
    Q1: string,
    Q2?: string,
    Q3?: string,
}
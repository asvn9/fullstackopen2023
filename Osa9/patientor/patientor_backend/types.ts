export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}


export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating?: HealthCheckRating;
  }

  interface HospitalEntry extends BaseEntry {
    type:"Hospital"
    discharge: {"date": string, "criteria": string}
  }

  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare"
    employerName: string
    sickLeave?: {"startDate": string, "endDate":string}
  }

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry


export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type getEntries = () => Diagnose[];
export type NonSensitivePatientInfo = Omit<Patient, 'ssn' | 'entries'>;

export type newPatientEntry = Omit<Patient, 'id'>
export type newEntry = Omit<BaseEntry, 'id' | 'healthCheckRating'> & { type: 'HealthCheck'|'Hospital'|'OccupationalHealthcare' };


type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryTest =
  | Omit<HospitalEntry, "id">
  | Omit<HealthCheckEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">;


export type EntryWithoutId = UnionOmit<BaseEntry, 'id' | 'healthCheckRating'> & { type:'HealthCheck'|'Hospital'|'OccupationalHealthcare'  };
export class Sample {
  constructor (
    projectName: string,
    projectNumber: number,
    siteName: string,
    siteNumber: number,
    date: Date,
    time: Date,
    depth: number,
    replicate: number,
    medium: number,
    sample_bottles?: number[],
    comment?: string,
    length?: number,
    id?: number
  ) {}
}

export class Sample {
  constructor (
    projectName: string,
    projectNumber: number,
    siteName: string,
    siteNumber: number,
    date: Date,
    time: Date,
    depth: number,
    length?: number,
    replicate?: number,
    sample_bottles?: number[],
    comment?: string
  ) {}
}

export class Site {
  constructor (
    id: number,
    name: string,
    usgs_sid?: string,
    usgs_scode?: string,
    description?: string,
    latitude?: string,
    longitude?: string,
    datum?: string,
    method?: string,
    site_status?: string,
    nwis_customer_code?: string,
    projects?: number[]
  ) {}
}

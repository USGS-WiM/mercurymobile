export class Site {
  constructor (
    public name?: string,
    public usgs_sid?: string,
    public usgs_scode?: string,
    public description?: string,
    public latitude?: string,
    public longitude?: string,
    public datum?: string,
    public method?: string,
    public site_status?: string,
    public nwis_customer_code?: string,
    public projects?: number[],
    public id?: number
  ) {}
}

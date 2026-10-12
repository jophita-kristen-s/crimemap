export type Severity = 'Low'|'Medium'|'High'|'Critical';
export type Category = 'Theft'|'Burglary'|'Assault'|'Vandalism'|'Vehicle crime'|'Fraud'|'Public disturbance';
export interface Incident { id:string; category:Category; timestamp:string; lat:number; lng:number; area:string; severity:Severity; status:'Open'|'Under review'|'Closed'; notes:string; synthetic:true }
export interface Filters { from:string; to:string; category:string; severity:string; area:string; search:string }
export interface Hotspot { area:string; lat:number; lng:number; count:number; intensity:number; categories:Record<string,number> }

import type { Incident, Category, Severity } from '../types';

// Puducherry-region demo geography. Coordinates are representative map anchors, not police-verified incident locations.
export const AREAS = [
  'White Town','Heritage Town','Lawspet','Muthialpet','Reddiarpalayam','Mudaliarpet',
  'Ariyankuppam','Villianur','Oulgaret','Rainbow Nagar','Kalapet','Thattanchavady',
  'Mettupalayam','Thirubuvanai'
];
export const CATEGORIES: Category[] = ['Theft','Burglary','Assault','Vandalism','Vehicle crime','Fraud','Public disturbance'];
const centers: Record<string,[number,number]> = {
  'White Town':[11.934,79.835], 'Heritage Town':[11.941,79.832], 'Lawspet':[11.956,79.817],
  'Muthialpet':[11.952,79.839], 'Reddiarpalayam':[11.934,79.807], 'Mudaliarpet':[11.916,79.829],
  'Ariyankuppam':[11.889,79.812], 'Villianur':[11.920,79.750], 'Oulgaret':[11.955,79.805],
  'Rainbow Nagar':[11.936,79.823], 'Kalapet':[12.025,79.855], 'Thattanchavady':[11.959,79.824],
  'Mettupalayam':[11.965,79.808], 'Thirubuvanai':[11.968,79.695]
};

// Fixed-seed pseudo-random generator makes the demo reproducible on every reset.
let seed = 20261012;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const weighted = <T,>(items: T[], weights: number[]): T => {
  const total = weights.reduce((a,b)=>a+b,0); let value = rnd()*total;
  for (let i=0;i<items.length;i++) { value -= weights[i]; if (value <= 0) return items[i]; }
  return items[items.length-1];
};
const start = Date.UTC(2026,0,1,0,0,0);
const end = Date.UTC(2026,9,13,0,0,0); // exclusive: includes all of 12 October 2026 UTC
const areaWeights = [11,8,10,8,8,9,6,7,10,7,4,4,4,4];
const categoryWeights = [22,10,15,9,20,12,12];
const severityValues: Severity[] = ['Low','Medium','High','Critical'];
const statusValues = ['Open','Under review','Closed'] as const;
const noteValues = [
  'Synthetic demo record for interface testing',
  'Illustrative record generated for aggregate analysis',
  'Not an actual police report or verified occurrence',
  'Generated sample; location is approximate to area anchor'
];
export const DATASET_START = '2026-01-01';
export const DATASET_END = '2026-10-12';
export const DATASET_RECORD_COUNT = 5000;
export const DATASET_SEED = 20261012;
export const DEMO_INCIDENTS: Incident[] = Array.from({length: DATASET_RECORD_COUNT}, (_, i) => {
  const area = weighted(AREAS, areaWeights);
  const center = centers[area];
  // Evening weighting and small spatial clusters are synthetic design choices, not measured crime patterns.
  const hour = weighted([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    [2,2,2,1,1,1,2,3,4,4,4,4,4,4,4,4,5,7,9,10,10,8,5,3]);
  const timestamp = new Date(start + Math.floor(rnd()*(end-start)/86400000)*86400000 + hour*3600000 + Math.floor(rnd()*60)*60000 + Math.floor(rnd()*60)*1000).toISOString();
  const category = weighted(CATEGORIES, categoryWeights);
  const severity = weighted(severityValues, [38,37,19,6]);
  const status = weighted<Incident['status']>([...statusValues], [15,20,65]);
  const spread = area === 'Villianur' || area === 'Thirubuvanai' ? 0.006 : 0.0045;
  return {
    id: `CM-${String(10001+i)}`, category, timestamp,
    lat: Number((center[0] + (rnd()-0.5)*spread).toFixed(6)),
    lng: Number((center[1] + (rnd()-0.5)*spread*1.2).toFixed(6)),
    area, severity, status,
    notes: noteValues[Math.floor(rnd()*noteValues.length)],
    synthetic: true as const
  };
}).sort((a,b)=>b.timestamp.localeCompare(a.timestamp));
export const CENTER = [11.934,79.827] as [number,number];

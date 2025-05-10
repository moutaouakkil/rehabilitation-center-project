import { ChartData, ChartOptions, ScriptableContext } from 'chart.js';

export interface AppointmentStats {
  labels: string[];
  data: number[];
}

export interface ServiceStats {
  labels: string[];
  data: number[];
}

export type AppointmentChartData = ChartData<'bar', number[], string>;
export type ServiceChartData = ChartData<'doughnut', number[], string>;

export type AppointmentChartOptions = ChartOptions<'bar'>;
export type ServiceChartOptions = ChartOptions<'doughnut'>;

import * as Highcharts from 'highcharts';

export interface IPie extends Highcharts.Options {
  chart: {},
  title: {},
  series: [],
}

export interface IPartPie {
  name: string,
  y: number
}

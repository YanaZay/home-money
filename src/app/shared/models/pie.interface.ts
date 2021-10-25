export interface IPie {
  chart: any,
  title: any
  tooltip: any,
  accessibility: any,
  plotOptions: any,
  series: [{
    name: string,
    data: IPartPie[]
  }]
}

export interface IPartPie {
  name: string,
  y: number
}

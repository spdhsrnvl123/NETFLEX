import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Price from "./Price";

interface ChartProps {
  coinId: string;
}

interface ChartCoin {
  time_open : number;
  time_close : number;
  open : string;
  close: string;
  high: string;
  low: string;
  market_cap: number;
  volume: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<ChartCoin[]>(["chart", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? "Loading chart..." : (
      <ApexChart 
      type="line"
      //series에는 우리가 보내고 싶은 모든 data가 들어 있다. 
      series={[
        {
          name : "sales",
          data : data?.map((price) => Number(price.close)) as number[]
        }
      ]}
      options={{
        theme : {
          mode : "dark"
        },
        chart:{
          height: 500,
          width:500,
          toolbar:{
            show:false
          },
          background: "transparent"
        },
        grid:{
          show:false
        },
        stroke : {
          curve:"smooth",
          width:4
        },
        yaxis:{
          show:false
        },
        xaxis:{
          axisBorder : { show:false },
          labels:{
            show:false
          },
          axisTicks:{
            show:false
          },
          categories: data?.map(value => value.time_close)
        },
        fill:{
          type : "gradient",
          gradient:{gradientToColors:["blue"],stops:[0,100]},
        },
        colors:["red"],
        // tooltip은 마우스를 올려두면 보이는 거다.
        tooltip:{
          // formatter는 우리한테 값을 넘겨주는 함수다.
          y:{
            formatter : (value) => `$ ${value.toFixed(3)}`
          }
        }
      }}
      />
      )}
    </div>
  );
};

export default Chart;

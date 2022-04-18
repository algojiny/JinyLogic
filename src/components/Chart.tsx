import { fetchHistoryData } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { IHistoryData } from "../api";
import { useLocation, useParams } from "react-router-dom";

function Chart() {
  const { coinId }: any = useParams();
  const { isLoading, data: priceData } = useQuery<IHistoryData[]>(
    ["historyData", coinId as any],
    () => fetchHistoryData(coinId as any)
  );

  const mapping: any = priceData?.map((info) => {
    return {
      x: new Date(info.time_close) as any,
      y: [info.open, info.high, info.low, info.close] as any,
    };
  });

  return (
    <div style={{ color: "black" }}>
      {isLoading ? (
        "Loading ..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "chart",
              data: [...mapping],
            },
          ]}
          options={{
            chart: { height: 1000, width: 1000, toolbar: { show: false } },
            xaxis: { labels: { show: false } },
            yaxis: { show: false },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;

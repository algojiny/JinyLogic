import { ICoin } from "../api";
import { useParams } from "react-router-dom";
import { getCoinData } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";

const H2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  h2 {
    text-align: center;
    font-size: 22px;
  }
`;

const PriceData = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
`;
const Detailed = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
`;

function Price() {
  const { coinId }: any = useParams();
  const { isLoading, data } = useQuery<ICoin>(coinId, () =>
    getCoinData(coinId)
  );
  return (
    <div>
      <H2>
        <h2>{data?.symbol} Price Data</h2>
      </H2>
      <PriceData>
        <Detailed>Market Cap: {data?.quotes.USD.market_cap} $</Detailed>
        <Detailed>
          Volume: {Math.floor(data?.quotes.USD.volume_24h!)} $
        </Detailed>
        <Detailed>ATH: {Math.floor(data?.quotes.USD.ath_price!)} $</Detailed>
        <Detailed>Price: {Math.floor(data?.quotes.USD.price!)} $</Detailed>
        <Detailed>Day Change: {data?.quotes.USD.percent_change_24h}%</Detailed>
      </PriceData>
    </div>
  );
}

export default Price;

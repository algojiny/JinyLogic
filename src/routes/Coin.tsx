import styled from "styled-components";
import Header from "../components/Header";
import {
  useParams,
  useNavigate,
  Outlet,
  Link,
  useMatch,
  useLocation,
} from "react-router-dom";
import { getCoinData } from "../api";
import { useQuery } from "react-query";
import { ICoin } from "../api";

const H1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  height: 30px;
  h1 {
    text-transform: uppercase;
    font-size: 28px;
  }
`;
const BackBtn = styled.button`
  position: absolute;
  left: 0%;
  top: 5%;
  background-color: tomato;
  color: #fff;
  width: 50px;
  height: 30px;
`;
const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  height: max-content;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 70px 0px;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: max-content;
  min-height: 200px;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  margin: 0 auto;
  padding: 20px;
`;
const BasicInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: max-content;
  background-color: ${(props) => props.theme.pointColor};
  padding: 20px;
  margin-bottom: 10px;
`;
const Tabs = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;
const Tab = styled.li<{ isMatch: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: max-content;
  background-color: ${(props) => (props.isMatch ? "orange" : "gray")};
  padding: 10px 50px;
  border-radius: 20px;
`;

interface CoinId {
  coinId: string;
}

function Coin() {
  const navigate = useNavigate();
  const { coinId }: any = useParams();
  const { isLoading, data } = useQuery<ICoin>(coinId, () =>
    getCoinData(coinId)
  );
  const chartMatch = useMatch("/:coinId/chart");
  const priceMatch = useMatch("/:coinId/price");
  return (
    <Wrap>
      <Header></Header>

      <Main>
        <H1 style={{}}>
          <BackBtn
            onClick={() => {
              navigate(-1);
            }}
          >
            back
          </BackBtn>
          <h1>{coinId}</h1>
        </H1>
        <BasicInfo>
          <span>{data?.symbol}</span>
          <span>Name: {data?.name}</span>
          <span>Rank: {data?.rank}</span>
        </BasicInfo>
        <BasicInfo>
          <span>Day-Change: {data?.quotes.USD.percent_change_24h}%</span>
          <span>Price: {Math.round(data?.quotes.USD.price!)} $</span>
        </BasicInfo>
        <Tabs>
          <Link to="chart">
            <Tab isMatch={chartMatch ? true : false}>Chart</Tab>
          </Link>
          <Link to="price">
            <Tab isMatch={priceMatch ? true : false}>Price</Tab>
          </Link>
        </Tabs>
        <Outlet context={{ data }}></Outlet>
      </Main>
    </Wrap>
  );
}

export default Coin;

import styled from "styled-components";
import Header from "../components/Header";
import { useQuery } from "react-query";
import { ICoins, getAllCoins } from "../api";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  width: 100%;
  height: max-content;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 50px 0px;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: max-content;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  margin: 0 auto;
  padding: 20px;
`;
const CoinList = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 10px;
  margin-bottom: 10px;
`;

function Coins() {
  const { data, isLoading } = useQuery<ICoins[]>("allCoins", getAllCoins);
  return (
    <Wrap>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Header></Header>
          <Main>
            <h1 style={{ fontSize: 28, textAlign: "center", marginBottom: 10 }}>
              ZzooCoin
            </h1>
            <CoinList>
              {data?.map((coin, index) => (
                <Link key={index} to={`/${coin.id}`}>
                  <Item>
                    <span>{coin.symbol}</span>
                    <span>more details &rarr;</span>
                  </Item>
                </Link>
              ))}
            </CoinList>
          </Main>
        </>
      )}
    </Wrap>
  );
}



export default Coins;

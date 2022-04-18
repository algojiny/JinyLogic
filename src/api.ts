export interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export interface IHistoryData {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

export const getAllCoins = async () => {
  const allCoins = await (
    await fetch("https://api.coinpaprika.com/v1/coins")
  ).json();

  return allCoins.slice(0, 50);
};
export const getCoinData = async function (coinId: string) {
  const coinData = await (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  ).json();
  return coinData;
};

export const fetchHistoryData = function (coinId: string) {
  const end = Math.floor(Date.now() / 1000);
  const start = end - 60 * 60 * 24 * 13;
  return fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`
  ).then((response) => response.json());
};

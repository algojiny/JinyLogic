import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { whiteTheme, darkTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./atom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./components/Chart";
import Price from "./components/Price";

function App() {
  const isDark = useRecoilValue(themeAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : whiteTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            element={<Coins />}
          ></Route>
          <Route path="/:coinId" element={<Coin />}>
            <Route path="chart" element={<Chart />}></Route>
            <Route path="price" element={<Price />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;

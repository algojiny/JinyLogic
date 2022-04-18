import { themeAtom } from "../atom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Btn = styled.button`
  background-color: ${(props) => props.theme.pointColor};
  color: #fff;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
  position: absolute;
  left: 2%;
  top: 2%;
`;

function Header() {
  const [Mode, changeMode] = useRecoilState(themeAtom);
  return (
    <header>
      <Btn onClick={() => changeMode((current) => !current)}>
        {Mode ? "white" : "dark"}
      </Btn>
    </header>
  );
}

export default Header;

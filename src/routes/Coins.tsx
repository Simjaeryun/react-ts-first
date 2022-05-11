import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	padding: 0px 10px;
`;
const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: #fff;
	color: ${(props) => props.theme.bgColor};

	margin-bottom: 10px;
	a {
		transition: color 0.2s ease-in;
		display: block;

		padding: 20px;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;
const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const coins = [
	{
		id: "btc-bitcoin",
		name: "Bitcoin",
		symbol: "BTC",
		rank: 1,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "eth-ethereum",
		name: "Ethereum",
		symbol: "ETH",
		rank: 2,
		is_new: false,
		is_active: true,
		type: "coin",
	},
	{
		id: "usdt-tether",
		name: "Tether",
		symbol: "USDT",
		rank: 3,
		is_new: false,
		is_active: true,
		type: "token",
	},
];
export default function Coins() {
	return (
		<Container>
			<Header>
				<Title>Coin</Title>
			</Header>
			<CoinsList>
				{coins.map((coin) => {
					return (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
						</Coin>
					);
				})}
			</CoinsList>
		</Container>
	);
}

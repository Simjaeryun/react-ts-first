import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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
		display: flex;
		align-items: center;
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

const Loader = styled.div`
	font-size: 50px;
	color: ${(props) => props.theme.textColor};
`;

const Img = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 10px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

export default function Coins() {
	// const [coins, setCoins] = useState<ICoin[]>([]);
	// const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	(async () => {
	// 		const res = await fetch("https://api.coinpaprika.com/v1/coins");
	// 		const json = await res.json();
	// 		setCoins(json.slice(0, 100));
	// 		setLoading(false);
	// 	})();
	// }, []);
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	return (
		<Container>
			<Header>
				<Title>Coin</Title>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => {
						return (
							<Coin key={coin.id}>
								<Link
									to={`/${coin.id}`}
									state={{ name: coin.name }}
								>
									<Img
										src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
										alt="coin_image"
									/>
									{coin.name} &rarr;
								</Link>
							</Coin>
						);
					})}
				</CoinsList>
			)}
		</Container>
	);
}

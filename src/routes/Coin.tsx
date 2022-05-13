import { useLocation, useParams, useMatch } from "react-router-dom";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "react-query";

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface PriceData {
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
interface ILocation {
	state: {
		name: string;
	};
}
const Container = styled.div`
	padding: 0px 200px;
	width: 1000px;
	margin: 0 auto;
`;
const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
	font-size: 50px;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
	line-height: 30px;
	font-size: 20px;
	font-weight: 300;
`;

const Tabs = styled.div`
	display: flex;
	margin: 50px 0px;
	justify-content: space-between;
`;
const Tab = styled.div<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	width: 49%;
	height: 50px;
	a {
		display: block;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		font-weight: bold;
		background-color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
		border-radius: 30px;
		color: ${(props) =>
			props.isActive ? props.theme.accentColor : props.theme.textColor};
	}
`;
export default function Coin() {
	const { coinId } = useParams();
	const { state } = useLocation() as ILocation;
	const priceMatch = useMatch(`/:${coinId}/price`);
	const chartMatch = useMatch(`/:${coinId}/chart`);
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
		["info", coinId],
		() => fetchCoinInfo(coinId)
	);
	const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
		["tickers", coinId],
		() => fetchCoinTickers(coinId)
	);
	const loading = infoLoading || tickerLoading;
	return (
		<Container>
			<Header>
				<Title>
					{state?.name
						? state.name
						: loading
						? "Loading..."
						: infoData?.name}
				</Title>
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Open Source:</span>
							<span>{infoData?.open_source ? "Yes" : "No"}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{tickerData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{tickerData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>

					<Outlet />
				</>
			)}
		</Container>
	);
}

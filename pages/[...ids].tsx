import { GetServerSidePropsContext } from "next";
import { useState, useEffect, useRef } from "react";
import { Slider, ReflectionBox, Button, Snackbar } from "@/Components";
import '../Components/powerup.js';
import insertBoard from "@/pages/api/board";
import insertUser from "@/pages/api/member";
import insertCard from "@/pages/api/card";
import { RatingWithoutSubmission, Submission, getLatestSubmission } from "@/pages/api/submission";
import { getMetricsByProjectId } from "@/pages/api/metric";
import { parse } from "path";


type RatingDisplayInfo = {
	metricName: string,
	emoScore: number,
	levelScore: number,
	metricId: string
}

type Props = {
	latestRatings: RatingDisplayInfo[],
	card: string,
	user: string,
	board: string
}


function CardPage(data: Props) {
	const { latestRatings, card, user, board } = data;
	const [metrics, setMetrics] = useState<RatingDisplayInfo[]>(latestRatings);
	// const [sliderValue, setSliderValue] = useState(1);
	const [textFieldValue, setTextFieldValue] = useState("");
	const [snackbarVisibility, setSnackbarVisibility] = useState(false);

	useEffect(() => {
		// TrelloPowerUp code has already been initialized from the imported file
	}, []);

	const showSnackBar = () => {
		setSnackbarVisibility(true);
		setTimeout(() => {
			setSnackbarVisibility(false);
		}, 3500);
	}

	// Get level value
	const handleLevelChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		metricName: string
	) => {
		const levelScore = parseInt(event.target.value, 10);
		updateMetrics(metricName, {levelScore: levelScore});
	}

	// Get emoji value
	const handleEmojiChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		metricName: string
	) => {
		const emojiScore = parseInt(event.target.value, 10);
		updateMetrics(metricName, {emojiScore: emojiScore});
	}

	// Function to update the emojiScore and levelScore
	const updateMetrics = (
		metricName: string,
		changes: object
	) => {
		const updatedMetrics = metrics.map((metric) => {
			if (metric.metricName === metricName) {
				return {...metric, ...changes}
			}
			return metric;
		})
		console.log(updatedMetrics);
		setMetrics(updatedMetrics);
	}

	// Get textField value
	const handleTextFieldChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setTextFieldValue(event.target.value);
	};

	async function handleSaveButtonClick() {
		showSnackBar();
		var ratingArray: RatingWithoutSubmission[] = metrics.map((metric: RatingDisplayInfo) => {
			return {
				emoScore: metric.emoScore,
				level: metric.levelScore,
				metricId: metric.metricId
			}
		})
		var dateUTC = new Date()
		var submissionData: Submission = {
			reflection: textFieldValue,
			ratings: ratingArray,
			timestamp: new Date(dateUTC.getTime() - dateUTC.getTimezoneOffset()*60*1000),
			userId: user,
			trelloCardId: card
		}
		const response = await fetch('/api/submission', {
			method: 'POST',
			body: JSON.stringify({
				submission: submissionData
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log(response)
	}

	return (
		<div className="App">
			<h1 className="title"> Emotimonitor </h1>
			<div className="SliderDiv">
				{metrics.map((metric) => (
					<div key={metric.metricName} className="ColSlider">
						<Slider
							metric={metric.metricName}
							emojiRate={metric.emoScore}
							levelRate={metric.levelScore}
							id={metric.metricId}
							onEmojiChange={(event) => {handleEmojiChange(event, metric.metricName)}}
							onLevelChange={(event) => {handleLevelChange(event, metric.metricName)}}
						></Slider>
					</div>
				))
					.reduce((rows: JSX.Element[][], col, index) => {
						if (index % 3 === 0) {
							rows.push([]);
						}
						rows[rows.length - 1].push(col);
						return rows;
					}, [])
					.map((row, rowIndex) => (
						<div key={rowIndex} className="SliderDiv">
							{row}
						</div>
					))}
			</div>
			<ReflectionBox onContentChange={handleTextFieldChange}></ReflectionBox>
			<Button onClick={handleSaveButtonClick} label="Save"></Button>
			<Snackbar visible={snackbarVisibility}></Snackbar>
		</div>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { ids } = context.query
	var cardId = ids ? ids[0] : undefined;
	var memberId = ids ? ids[1] : undefined;
	var boardId = ids ? ids[2] : undefined;
	if (boardId == undefined || memberId == undefined || cardId == undefined) {
		throw new Error("Missing params");
	}
	var res = await insertBoard(boardId);
	console.log(res)
	res = await insertUser(memberId);
	console.log(res)
	res = await insertCard(cardId);
	console.log(res)

	var latestSubmission = await getLatestSubmission(memberId, cardId)
	var ratingInfo: RatingDisplayInfo[] = [];
	if (latestSubmission.length != 0) {
		ratingInfo = latestSubmission[0].ratings.map((rating) => {
			return {
				metricName: rating.metric.name,
				emoScore: rating.emoScore,
				levelScore: rating.level,
				metricId: rating.metricId
			}
		})
	} else {
		const metrics = await getMetricsByProjectId(boardId)
		ratingInfo = metrics.map((metric) => {
			return {
				metricName: metric.name,
				emoScore: 0,
				levelScore: 0,
				metricId: metric.id
			}
		})
	}
	return { 
		props: {
				latestRatings: ratingInfo,
				card: cardId,
				user: memberId,
				board: boardId
			} 
	};
};

export default CardPage;
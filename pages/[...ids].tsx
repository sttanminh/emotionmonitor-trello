import { GetServerSidePropsContext } from "next";
import { useState, useEffect, useRef } from "react";
import { Slider, ReflectionBox, Button, Snackbar } from "@/Components";
import '../Components/powerup.js';
import insertBoard from "@/pages/api/board";
import insertUser from "@/pages/api/member";
import insertCard from "@/pages/api/card";
import { RatingWithoutSubmission, Submission, getLatestSubmission } from "@/pages/api/submission";
import { getActiveMetricsByProjectId } from "@/pages/api/metric";
import { getBoard } from "@/pages/api/board";
import { getLevelsByProjectId } from "@/pages/api/level";


type RatingDisplayInfo = {
	metricId: string,
	metricName: string,
	emoScore: number,
	levelScore: number,
	levels: {
		levelLabel: string,
		levelOrder: number
	}[],
	emojis: string[],
	referenceNumber: number
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
		updateMetrics(metricName, { levelScore: levelScore });
	}

	// Get emoji value
	const handleEmojiChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		metricName: string
	) => {
		const emojiScore = parseInt(event.target.value, 10);
		updateMetrics(metricName, { emoScore: emojiScore });
	}

	// Function to update the emojiScore and levelScore
	const updateMetrics = (
		metricName: string,
		changes: object
	) => {
		const updatedMetrics = metrics.map((metric) => {
			if (metric.metricName === metricName) {
				return { ...metric, ...changes }
			}
			return metric;
		})
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
			timestamp: new Date(dateUTC.getTime() - dateUTC.getTimezoneOffset() * 60 * 1000),
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
	}

	return (
		<div className="App background">
			<h1 className="title"> Emotimonitor </h1>
			<Button onClick={handleSaveButtonClick} label="Save"></Button>
			<div className="SliderDiv">
				{metrics.map((metric) => (
					<div key={metric.metricName} className="ColSlider">
						<Slider
							metric={metric.metricName}
							emojiRate={metric.emoScore}
							emojis={metric.emojis}
							levelRate={metric.levelScore}
							levels={metric.levels}
							id={metric.metricId}
							onEmojiChange={(event) => { handleEmojiChange(event, metric.metricName) }}
							onLevelChange={(event) => { handleLevelChange(event, metric.metricName) }}/>
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

	var projectOptional = await getBoard(boardId)
	if (projectOptional.length == 0) {
		await insertBoard(boardId);
	} else {
		insertBoard(boardId);
	}
	insertUser(memberId);
	insertCard(cardId);

	// If no previous submission found, display default view (emo score 0, level score 0). 
	// Else, for each metric configured for the project, if metric was in last submission, display it. Else display default values (ex: new metrics added to project since last submission)
	var metrics = await getActiveMetricsByProjectId(boardId)
	var levels = await getLevelsByProjectId(boardId)
	var latestSubmission = await getLatestSubmission(memberId, cardId)
	var latestRatings = latestSubmission.length != 0 ? latestSubmission[0].ratings : []
	var lastMetrics = latestRatings.map((rating) => rating.metric.name)
	var ratingInfo: RatingDisplayInfo[] = [];

	var levelDictionary : {[key: string]: {levelLabel: string, levelOrder: number}[]} = {}
	levels.forEach(level => {
		if (!(level.metricId in levelDictionary)) {
			levelDictionary[level.metricId] = []
		}
		levelDictionary[level.metricId].push({
		  levelLabel: level.levelLabel,
		  levelOrder: level.levelOrder
		})
	  })
	ratingInfo = metrics.map((metric) => {
		var index = lastMetrics.indexOf(metric.name)
		if (lastMetrics.indexOf(metric.name) > -1) {
			var data = {
				metricName: latestRatings[index].metric.name,
				emoScore: latestRatings[index].emoScore,
				levelScore: latestRatings[index].level,
				metricId: latestRatings[index].metricId,
				levels: levelDictionary[metric.id],
				emojis: ['😢', '😔', '😐', '😀', '😊'],
				referenceNumber: 3
			}
			console.log(data)
			return data
		}
		var data = {
			metricName: metric.name,
			emoScore: 0,
			levelScore: 0,
			metricId: metric.id,
			levels: levelDictionary[metric.id],
			emojis: ['😢', '😔', '😐', '😀', '😊'],
			referenceNumber: 3
		}
		console.log(data)
		return data
	})
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
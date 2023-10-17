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
import { checkIsPasscodeSet } from "@/pages/api/passcode";
import { setConfig } from "next/config.js";


type RatingDisplayInfo = {
	metricId: string,
	metricName: string,
	emoScore: number,
	levelScore: number,
	levels: {
		levelId: string,
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
	board: string,
	passcodeExists: boolean
}


function CardPage(data: Props) {
	const { latestRatings, card, user, board, passcodeExists } = data;
	const [metrics, setMetrics] = useState<RatingDisplayInfo[]>(latestRatings);
	// const [sliderValue, setSliderValue] = useState(1);
	const [textFieldValue, setTextFieldValue] = useState("");
	const [snackbarVisibility, setSnackbarVisibility] = useState(false);
	const [isPasscodeSet, setIsPasscodeSet] = useState(false);
	const [passcode, setPasscode] = useState("");
	const showSnackBar = () => {
		setSnackbarVisibility(true);
		setTimeout(() => {
			setSnackbarVisibility(false);
		}, 3500);
	}
	useEffect(() => {
		// TrelloPowerUp code has already been initialized from the imported file
		if (passcodeExists) {
			setIsPasscodeSet(true);
		}
	}, []);

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

	const handlePasscodeSubmit = (newPasscode:string) => {
		fetch('/api/passcode', {
			method: 'POST',
			body: JSON.stringify({
				boardId: board,
				passcode: newPasscode
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(()=>{
			setIsPasscodeSet(true);
		})
	}
	async function handleSaveButtonClick() {
		showSnackBar();
		var ratingArray: RatingWithoutSubmission[] = metrics.map((metric: RatingDisplayInfo) => {
			let levelDict: any = {}
			metric.levels.forEach(level => levelDict[level.levelOrder] = level.levelId)
			return {
				emoScore: metric.emoScore,
				level: metric.levelScore,
				metricId: metric.metricId,
				levelId: levelDict[metric.levelScore]
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
			{isPasscodeSet ? <div> <h1 className="title"> Emotimonitor </h1>
			<Button onClick={handleSaveButtonClick} label="Save"></Button>
			{snackbarVisibility && <Snackbar visible={snackbarVisibility} />}
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
							onLevelChange={(event) => { handleLevelChange(event, metric.metricName) }} />
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
			<Snackbar visible={snackbarVisibility}></Snackbar> </div>
			
			: 
			
			<div className="flex flex-col items-center justify-center gap-y-px">  
				<div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
				<h1>Create a passcode for the Trello board:</h1>
					<div className="relative z-0 flex flex-col gap-y-2">
						<input  onChange={(e) => {setPasscode(e.target.value)}}type="password" id="passcode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
						<label htmlFor="passcode" className=" absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passcode</label>
						<button onClick={()=>handlePasscodeSubmit(passcode)}className="bg-blue-400 rounded-sm">Confirm</button>
					</div>
				</div>
			</div>
		}
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

	//Auth checks
	let passcodeExists = await checkIsPasscodeSet(boardId);

	var project = await getBoard(boardId)
	if (!project) {
		await insertBoard(boardId);
		project = await getBoard(boardId)
	} else {
		insertBoard(boardId);
	}
	insertUser(memberId);
	insertCard(cardId);

	// If no previous submission found, display default view (emo score 0, level score 0). 
	// Else, for each metric configured for the project, if metric was in last submission, display it. Else display default values (ex: new metrics added to project since last submission)
	var metrics = await getActiveMetricsByProjectId(boardId)
	var latestSubmission = await getLatestSubmission(memberId, cardId)
	var latestRatings = latestSubmission.length != 0 ? latestSubmission[0].ratings : []
	var lastMetrics = latestRatings.map((rating) => rating.metric.name)
	var ratingInfo: RatingDisplayInfo[] = [];

	ratingInfo = metrics!.map((metric) => {
		var index = lastMetrics.indexOf(metric.name)
		var levels = metric.levels
			.filter(level => level.active)
			.map(level => {
				return {
					levelId: level.id,
					levelLabel: level.levelLabel,
					levelOrder: level.levelOrder
				}
			})
		if (lastMetrics.indexOf(metric.name) > -1) {
			var data = {
				metricName: latestRatings[index].metric.name,
				emoScore: latestRatings[index].emoScore,
				levelScore: latestRatings[index].level,
				metricId: latestRatings[index].metricId,
				levels: levels,
				emojis: project?.emojis!,
				referenceNumber: project?.referenceNumber!
			}
			return data
		}
		var data = {
			metricName: metric.name,
			emoScore: 0,
			levelScore: 1,
			metricId: metric.id,
			levels: levels,
			emojis: project?.emojis!,
			referenceNumber: project?.referenceNumber!
		}
		return data
	})
	ratingInfo.forEach(metric => {
		metric.levels.sort((a, b) => a.levelOrder - b.levelOrder);
	});
	return {
		props: {
			latestRatings: ratingInfo,
			card: cardId,
			user: memberId,
			board: boardId,
			passcodeExists: passcodeExists
		}
	};
};

export default CardPage;
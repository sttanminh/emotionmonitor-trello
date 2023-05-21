import prisma from "@/lib/prisma";
import { NextPage, GetServerSidePropsContext } from "next";
import { useState, useEffect, useRef } from "react";
import { Slider, ReflectionBox, Button } from "@/Components";
import '../Components/powerup.js';
import insertBoard from "@/pages/api/board";
import insertUser from "@/pages/api/member";
import insertCard from "@/pages/api/card";

interface Rating {
  name: string,
  rate: number,
	metricId: string
}

interface Props {
  dbMetric: Rating[],
	card: string,
	user: string,
	board: string
}


function CardPage(dbMetrics: Props) {
	const { dbMetric, card, user, board } = dbMetrics;
  const [metrics, setMetrics] = useState<Rating[]>(dbMetric);
  // const [sliderValue, setSliderValue] = useState(1);
  const [textFieldValue, setTextFieldValue] = useState("");

  useEffect(() => {
    // TrelloPowerUp code has already been initialized from the imported file
  }, []);

  // Get slider value
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    metricName: string
  ) => {
    const rate = parseInt(event.target.value, 10);
    const updatedMetrics = metrics.map((metric) => {
      if (metric.name === metricName) {
        return { ...metric, rate };
      }
      return metric;
    });
    setMetrics(updatedMetrics);
  };

  // Get textField value
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextFieldValue(event.target.value);
  };

	async function handleSaveButtonClick() {
		var ratingArray = metrics.map((metric: Rating) => {
			return {
				score: metric.rate,
				metricId: metric.metricId,
				userId: user,
				trelloCardId: card,
				timestamp: new Date()
			}
		})
		const response = await fetch('/api/rating', {
			method: 'POST',
			body: JSON.stringify({
				ratings: ratingArray
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

  return (
    <div className="App">
      <h1 className="title"> Emotimonitor </h1>
      <div className="SliderDiv">
        {metrics.map((metric) => (
            <div key={metric.name} className="ColSlider">
              <Slider
								metric={metric.name}
                rate={metric.rate}
								id = {metric.metricId}
                onChange={(event) => handleSliderChange(event, metric.name)}
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
    </div> 
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { ids } = context.query
	var cardId = ids?ids[0]:undefined;
	var memberId = ids?ids[1]:undefined;
	var boardId = ids?ids[2]:undefined;
	if (boardId == undefined || memberId == undefined || cardId == undefined) {
		throw new Error("Missing params");
	}
	var res = await insertBoard(boardId);
	console.log(res)
	res = await insertUser(memberId);
	console.log(res)
	res = await insertCard(cardId);
	console.log(res)

	var retrievedRatings: Rating[] = [];
	const metrics = await prisma.metric.findMany();
	console.log(metrics)
	for await (var metric of metrics) {
		var result = await prisma.rating.findMany({
			where: {
				userId: memberId,
				trelloCardId: cardId,
				metricId: metric.id
			}
			,orderBy: {
				timestamp: 'desc'
			}
			,take: 1
		})
		console.log(result)
		if (result.length != 0) {
			retrievedRatings.push({
				name: metric.name,
				rate: result[0].score,
				metricId: metric.id
			})
		} else {
			retrievedRatings.push({
				name: metric.name,
				rate: 0,
				metricId: metric.id
			})
		}
	}
	console.log(retrievedRatings)
	return { 
		props: {
				dbMetric: retrievedRatings,
				card: cardId,
				user: memberId,
				board: boardId
			} 
	};
};

export default CardPage;
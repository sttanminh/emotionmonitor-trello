import prisma from "@/lib/prisma";
import { NextPage, GetServerSidePropsContext } from "next";
import { useState, useEffect, useRef } from "react";
import { Slider, ReflectionBox, Button } from "@/Components";
import '../Components/powerup.js'
import dotenv from 'dotenv';
import insertBoard from "@/pages/api/board";
import insertUser from "@/pages/api/member";
import insertCard from "@/pages/api/card";

interface Rating {
  id: string;
  name: string;
  rate: number;
}

interface Props {
  metrics: Rating[];
}

function CardPage(dbMetrics: Rating[]) {
  const [metrics, setMetrics] = useState<Rating[]>([]);
  // const [sliderValue, setSliderValue] = useState(1);
  const [textFieldValue, setTextFieldValue] = useState("");

  useEffect(() => {
    // TrelloPowerUp code has already been initialized from the imported file
  }, []);
	console.log(dbMetrics);
  // Generate dummy id for testing
  function generateRandomString(length: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Add dummy metric
  const addDummyMetric = () => {
    const dummyMetric: Rating = {
      id: generateRandomString(10),
      name: "Dummy Metric",
      rate: 0,
    };
    setMetrics([...metrics, dummyMetric]);
  };

  // Get slider value
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    metricId: string
  ) => {
    const rate = parseInt(event.target.value, 10);
    const updatedMetrics = metrics.map((metric) => {
      if (metric.id === metricId) {
        return { ...metric, rate };
      }
      return metric;
    });
    setMetrics(updatedMetrics);
    console.log(metrics);
  };

  // Get textField value
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextFieldValue(event.target.value);
  };

  // // Handle Save button click
  // const handleSaveButtonClick = () => {
  //   console.log(metrics);
  //   console.log(textFieldValue);
  // };
	async function handleSaveButtonClick() {
		const response = await fetch('/api/rating', {
			method: 'POST',
			body: JSON.stringify({
				//Add the ratings here with: score, userid, cardid, metricid, timestamp
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
        {metrics
          .map((metric) => (
            <div key={metric.id} className="ColSlider">
              <Slider
                id={metric.id} metric={metric.name}
                rate={metric.rate}
                onChange={(event) => handleSliderChange(event, metric.id)}
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
      <Button onClick={addDummyMetric} label="Add Metric"></Button>
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
	await insertBoard(boardId);
	await insertUser(memberId);
	await insertCard(cardId);

	var retrievedRatings: Rating[] = [];
	const metrics = await prisma.metric.findMany();
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
		if (result.length != 0) {
			retrievedRatings.push({
				id: "1234567890",
				name: metric.name,
				rate: result[0].score
			})
		} else {
			retrievedRatings.push({
				id: "1234567890",
				name: metric.name,
				rate: 0
			})
		}
	}
	return { 
		props: {
				dbMetric: retrievedRatings
			} 
	};
};

export default CardPage;
import prisma from "@/lib/prisma";
import { NextPage, GetServerSidePropsContext } from "next";
import { useState, useEffect, useRef } from "react";
import { Slider, ReflectionBox, Button } from "@/Components";
import '../Components/powerup.js'
import dotenv from 'dotenv';

interface Metric {
  id: string;
  name: string;
  rate: number;
}

interface Props {
  metrics: Metric[];
}

const CardPage: NextPage<Props> = (dbMetrics: Props) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  // const [sliderValue, setSliderValue] = useState(1);
  const [textFieldValue, setTextFieldValue] = useState("");

  useEffect(() => {
    // TrelloPowerUp code has already been initialized from the imported file
  }, []);
	console.log(dbMetrics.metrics[0]);
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
    const dummyMetric: Metric = {
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

  // Handle Save button click
  const handleSaveButtonClick = () => {
    console.log(metrics);
    console.log(textFieldValue);
  };

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

export async function getServerSideProps(context: GetServerSidePropsContext){  
	dotenv.config();
	const apiKey =  process.env.API_KEY!;
	const apiToken = process.env.API_TOKEN!;
	console.log("In get server side")
	console.log(context.query)
	const { ids } = context.query
  var cardId = ids?ids[0]:null;
  var memberId = ids?ids[1]:null;
  var boardId = ids?ids[2]:null;
  console.log(cardId);
  console.log(memberId);
  console.log(boardId);
	// Check if user exists, if no, insert user
	// const card = await fetch(`https://api.trello.com/1/cards/${cardId}?fields=name,desc&key=${apiKey}&token=${apiToken}`);
	// Check if board exists, if no, insert board
	// const member  = await fetch(`https://api.trello.com/1/members/${memberId}?key=${apiKey}&token=${apiToken}`)
	// Check if card exists, if no, insert card
	// const board = await fetch(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`)
	// Check if card with user id and project id exists, if yes, retrieve data. If no, return nothing
    // const res = await fetch('https://api.github.com/repos/vercel/next.js');
    // const repo = await res.json();
	var dummyMetric: Metric = {
		id: "1234567890",
		name: "Dummy Metric",
		rate: 0,
	};
	return { 
		props: {
				dbMetric: [dummyMetric] 
			} 
	};
};

// export const getStaticProps: GetStaticProps = async () => {
//   const user = await prisma.user.create({
//         data: {
//           name: 'Monica',
//           email: 'monica@prisma.io'
//         },
//       })
//   const feed = await prisma.user.findMany({
//     where: { name: "Monica" }
//     });
//   return { 
//     props: { feed }, 
//     revalidate: 10 
//   }
// }



export default CardPage;
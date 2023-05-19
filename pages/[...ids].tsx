import { useRouter } from 'next/router';
import prisma from "@/lib/prisma";
import { GetStaticProps, NextPage } from "next";
import { User } from "@prisma/client";
import { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Slider, ReflectionBox, Button } from "@/Components";
import '../Components/powerup.js'

interface Metric {
  id: string;
  name: string;
  rate: number;
}

interface Props {
  metrics: Metric[];
}

const CardPage: NextPage<Props> = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  // const [sliderValue, setSliderValue] = useState(1);
  const [textFieldValue, setTextFieldValue] = useState("");

  useEffect(() => {
    // TrelloPowerUp code has already been initialized from the imported file
  }, []);
  const router = useRouter();
  console.log(router.query);
  const { ids } = router.query
  var cardId = ids?ids[0]:null;
  var memberId = ids?ids[1]:null;
  var boardId = ids?ids[2]:null;
  console.log(cardId);
  console.log(memberId);
  console.log(boardId);

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
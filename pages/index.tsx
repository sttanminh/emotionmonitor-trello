import prisma from "@/lib/prisma";
import { GetStaticProps, NextPage } from "next";
import { User } from "@prisma/client";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Slider, ReflectionBox, Button, Snackbar } from "@/Components";
import '../Components/powerup.js'
import { eventNames } from "process";

interface Metric {
  id: string;
  name: string;
  emojiRate: number; // rate -> emojiRate
  levelRate: number; // newly added for new slider
}

interface Props {
  metrics: Metric[];
}

const Home: NextPage<Props> = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
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
      emojiRate: 0, // rate -> emojiRate
      levelRate: 0, // newly added
    };
    setMetrics([...metrics, dummyMetric]);
  };

  // Get level value
  const handleLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    metricId: string
  ) => {
    const levelRate = parseInt(event.target.value, 10);
    updateMetrics(metricId, {levelRate})
  }

  // Get emoji value
  const handleEmojiChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    metricId: string
  ) => {
    const emojiRate = parseInt(event.target.value, 10);
    updateMetrics(metricId, {emojiRate})
  }

  const updateMetrics = (
    metricId: string,
    changes: {}
  ) => {
    const updatedMetrics = metrics.map((metric: Metric) => {
      if (metric.id === metricId) {
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

  // Handle Save button click
  const handleSaveButtonClick = () => {
    console.log(metrics);
    console.log(textFieldValue);
    showSnackBar();
  };

  return (
    <div className="App">
      <h1 className="title"> Emotimonitor </h1>
      <div className="SliderDiv">
        {metrics
          .map((metric) => (
            <div key={metric.id} className="ColSlider">
              <Slider
                id={metric.id} 
                metric={metric.name}
                emojiRate={metric.emojiRate} // metric.rate -> metric.emojiRate
                levelRate={metric.levelRate} //newly added
                onEmojiChange={(event) => {handleEmojiChange(event, metric.id)}}
                onLevelChange={(event) => {handleLevelChange(event, metric.id)}}
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
      <Snackbar visible={snackbarVisibility}></Snackbar>
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

export default Home;

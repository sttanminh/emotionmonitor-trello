import prisma from '@/lib/prisma'
import { GetStaticProps, NextPage } from 'next'
import { User } from '@prisma/client'
import { useState, useEffect, useRef } from 'react'
import { Row, Col } from 'react-bootstrap'
import Slider from '@/Components/Slider'
import TextField from '@/Components/TextFiled'

interface Metric {
  id: string;
  name: string;
  rate: number;
}

interface Props {
  metrics: Metric[];
}

const Home: NextPage<Props> = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  // const [sliderValue, setSliderValue] = useState(1);
  const [textFieldValue, setTextFieldValue] = useState("");







  
  //Generate dummy id for testing
  function generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>, metricId: string) => {
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
  //Get textField value
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextFieldValue(event.target.value);
  };

  console.log(metrics);


  // Handle DONE button click
  const handleDoneButtonClick = () => {
    console.log(metrics);
    console.log(textFieldValue);
  };

  return (
    <div>
      <div className="SliderDiv">
        {metrics.map((metric) => (
          <div key={metric.id} className="ColSlider">
            <Slider id={metric.id} metric={metric.name} rate={metric.rate} onChange={(event) => handleSliderChange(event, metric.id)} />
          </div>
        )).reduce((rows: JSX.Element[][], col, index) => {
          if (index % 3 === 0) {
            rows.push([]);
          }
          rows[rows.length - 1].push(col);
          return rows;
        }, []).map((row, rowIndex) => (
          <div key={rowIndex} className="SliderDiv">
            {row}
          </div> 
        ))}
      </div>
      <TextField value={textFieldValue} onChange={handleTextFieldChange}></TextField>

      <button onClick={addDummyMetric}>Add Dummy Metric</button>
      <div>
        <button onClick={handleDoneButtonClick} > DONE </button>
      </div>
    </div>
  );
}


// Need dataflow
//When powerup start, need all information from trello board
//Extracting data from database
//Check if user and project exsiting
//If yes -> update , if not -> update new user, new project, then update trello card






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

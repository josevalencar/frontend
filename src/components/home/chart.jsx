import { ResponsiveLine } from '@nivo/line';
import { useState, useEffect } from 'react';
import dateToSeconds from '../../helpers/dateToMinutes';

const DbmPorSetorPorHora = () => {
  
    const [data, setData] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [historics, setHistorics] = useState([]);
    const [xLabels, setXLabels] = useState([]);
    const [currentDate, setCurrentDate] = useState([]);

    // pega sectors
    useEffect(() => {
        fetch("https://sfqlqf-3000.csb.app/v1/sectors")
          .then((response) => response.json())
          .then(data => setSectors(data))
          .catch((err) => {
            console.log(err.message);
         });
    }, [])

    // pega historics
    useEffect(() => {
        fetch("https://sfqlqf-3000.csb.app/v1/historics")
          .then((response) => response.json())
          .then(data => setHistorics(data))
          .catch((err) => {
            console.log(err.message);
         });
    }, [])

    // Descobre a hora atual e as horas que serão exibidas
    useEffect(() => {
        if (historics.length > 0){
            setCurrentDate(dateToSeconds(historics[0].createdAt));
            console.log(historics[0].createdAt, historics[10].createdAt)
            let currentTime = parseInt(historics[0].createdAt.slice(11, 13));
            let timeStamps = [];

            for(let i = 0; i<6; i++){
                timeStamps.push(
                    String(currentTime - i) + 'h'
                )
            }
            setXLabels(timeStamps)
        }

    }, [historics])

    useEffect(() => {

        if (historics.length === 0) return;

        let newData = [];
        sectors.map((sector) => {
            let dataForSector = [];

            for (let i = 0; i < xLabels.length ; i++){
                let dbmSum = 0;
                let numberOfHistorics = 0;
                let firstTime = null;
                historics.map((historic) => {
                    if (historic.espSector !== null){
                        if (historic.espSector._id === sector._id && dateToSeconds(historic.createdAt) <= currentDate - 60*i && dateToSeconds(historic.createdAt) >= currentDate - 60*(i + 1)){
                            /*dataForSector.push({x : historic.createdAt.slice(11,16),
                                                y: parseInt(historic.wifiPotency)})*/
                            if (firstTime === null){
                                firstTime = historic.createdAt;
                            }
                            dbmSum += historic.wifiPotency;
                            numberOfHistorics++;
                        }
                    }
                })
                if (numberOfHistorics > 0){
                    dataForSector.push({x : xLabels[i],
                                        y: dbmSum / numberOfHistorics})
                }
                else{
                    dataForSector.push({x : xLabels[i],
                                        y: -100000})
                }
            }

            newData.push(
                {
                    "id":sector.name,
                    "color": "hsl( " + String(Math.floor(Math.random() * (100 - 0 + 1)) + 0) + ", " + String(Math.floor(Math.random() * (100 - 0 + 1)) + 0) + "%, " + String(Math.floor(Math.random() * (100 - 0 + 1)) + 0) + "%)",
                    "data": dataForSector.reverse()
                }
            )
        })
        console.log(newData)
        setData(newData);
    }, [sectors, historics, xLabels, currentDate])

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 150, bottom: 25, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: -100,
        max: 0,
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'dbm',
        legendOffset: -40,
        legendPosition: 'middle',
        tickValues: [-100, -75, -50, -25, 0],
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default DbmPorSetorPorHora;

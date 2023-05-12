import React from 'react';
import { useQuery } from 'react-query';

export const query = 'https://datausa.io/api/data?drilldowns=State&measures=Population&year=2019'

interface StateData {
  state: string;
  population: number;
  year: number;
}

function Dashboard() {

  const { isLoading, error, data } = useQuery('population', async () => {
    const response = await fetch(query);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const transformedData = responseData.data.map((item: any) => {
      const { State: state, Population: population, Year: year } = item;
      return { state, population, year };
    });
    return transformedData;
  });

  // helper function to format the population number
  const formatPopulation = (population: number) => {
  const formattedPopulation = (population / 1000000).toLocaleString('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    useGrouping: true,
  }) + 'M';

  return formattedPopulation;
  }

  // loading message for the fetch request
  if (isLoading) {
    return <div className= "m-3 font-sans font-bold">Loading populations...</div>;
  }

  // display error message
   if (error) {
     return <div className="m-3 font-sans font-bold">Error: Failed to fetch</div>;
   }

  return (
    <div className="bg-background-gray mx-auto max-w-6xl p-6 font-sans">
      <div className="text-title text-lg text-color-title-blue font-sans font-bold mb-4 ml-4 text-blue-300 pb-1/5">Population der Staaten</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data.map((stateData: StateData) => (
            <div key={stateData.state} className="shadow-md bg-white box-border border-gray-300 p-4 rounded-md aspect-w-52 aspect-h-35 overflow-hidden" >
              <p className="text-body font-sans font-bold text-black bold mb-2">{stateData.state}</p>
              <hr className="border-t border-black my-2" />
              <p className="text-body font-sans font-bold text-body-gray mb-2">Population: {formatPopulation(stateData.population)}</p>
              <hr className="border-black my-2" />
              <p className="text-body font-sans font-bold text-body-gray">Jahr: {stateData.year}</p>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Dashboard;

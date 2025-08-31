import { findMostCorrelatedPair } from '../utils/correlationUtils.js'

const MostCorrelatedPair = ({ data, streams }) => {
  const correlatedPair = findMostCorrelatedPair(data, streams);
  console.log('Correlated Pair:', correlatedPair);


  return (
    <div className="card">
      <h3>Most Correlated Pairs</h3>
      <ul>
        <li>Pair: {correlatedPair.pair[0]} & {correlatedPair.pair[1]}</li>
        <li>Correlation: {correlatedPair.correlation.toFixed(2)}</li>
        
      </ul>
    </div>
  );
};

export default MostCorrelatedPair;
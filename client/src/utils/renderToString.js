import DateParser from './DateParser.js';

const link = `${location.protocol}//${location.host}`;

const renderToString = (data, template = 'location') => {
  const div = `
    <div class="card font-bold font-raleway">
        <div class="my-1"><span>Bus: <b>${
          data.type
        }</b> <b class="font-lexend text-uppercase">${
    data.plate
  }</b></span> </div>
        <div class="my-1"><span>Route: <b class='font-lexend'>${
          data?.origin
        }</b> <span> - </span><b class="font-lexend">${
    data?.destination
  }</b></span></div>
        <div class="my-1"><span>Driver: <a  href="${link}/public-profile/${
    data.driverId
  }" target="_blank" rel="noopener noreferrer">${
    data.driverName
  }</a></span></div>
        <div class="my-1"><span>Available seats: <b class="font-bold font-lexend text-md">${
          data.seats - data.passengers
        }</b></span></div>
        <div class="my-1"><span>Passengers: <b class="font-bold font-lexend text-md">${
          data.passengers
        }</b></span></div>
        <div class="">Updated: <b class="font-lexend">${DateParser(
          data.locationUpdated
        )}</b></div>
    </div>
    `;

  const finished = `
        <div class="font-lexend">
            <div>This bus has completed the trip</div>
            <div class="flex w-fit py-1 px-3 bg-primary font-raleway font-bold rounded-md">
      <div class="loader mr-1"></div><button class='ml-1 font-raleway text-white font-bold'> Removing...</button>
         </div>
       
        <div>Updated: <b>${DateParser(new Date())}</b></div>
    </div>
        `;
  const live = `
    
    
    `;
  if (template === 'finished') {
    return finished;
  } else if (template === 'live') {
  }
  return div;
};

export default renderToString;

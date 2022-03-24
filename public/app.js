'use strict';

const scenarioSub = document.getElementById('scenario');

scenarioSub.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('scenario form submitted!');
});

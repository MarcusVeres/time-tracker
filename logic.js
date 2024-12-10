var pp = (function(){

  // VARS
  let restTime = 5;
  let workTime = 15; // TODO - convert from seconds to ms later. Use low values for testing. 

  // INTERNAL 
  let controlPause = null;
  let controlReset = null;
  let controlStart = null;
  let displayMinutes = null;
  let displaySeconds = null;
  let intervalFunction = null;
  let ticks = 0;

  // SETTING
  function SetWorkTime( input )
  {
    workTime = Sanitize(input);
  }
  function SetRestTime( input )
  {
    restTime = Sanitize(input);
  }
  function Sanitize( input )
  {
    // TODO - detect if minutes, seconds, etc. 
    // Most common is in minutes...
    // if input contains : remove it and parse as minutes
    // if input is value, use seconds 
    // if input has decimal, use whatever 

    return input;
  }

  // OPERATING 
  const startCounter = () => {
    if( !intervalFunction ) {
      intervalFunction = setInterval( () => {
        
        console.log( "counting" );
        ticks++;
        updateDisplay();

      }, 1000 );
    }
  }
  const pauseCounter = () => {
    console.log( "Pausing..." );
    clearInterval( intervalFunction );
    intervalFunction = null;
  }
  const resetCounter = () => {
    pauseCounter();
    ticks = 0;
    updateDisplay();
  }

  // UI 
  const updateDisplay = () => {
    // NOTE :: This is why strongly typed languages are better...
    displayMinutes.innerHTML = ticks;
    displaySeconds.innerHTML = ticks * 10;
  }

  // INITIALIZING
  function Init()
  {
    controlPause = document.getElementById("control-pause");
    controlReset = document.getElementById("control-reset");
    controlStart = document.getElementById("control-start");

    controlPause.addEventListener("click" , () => { pauseCounter(); });
    controlReset.addEventListener("click" , () => { resetCounter(); });
    controlStart.addEventListener("click" , () => { startCounter(); });

    displayMinutes = document.getElementById("display-minutes");
    displaySeconds = document.getElementById("display-seconds");

    console.log( "Starting..." );
    startCounter();

  }
  Init();

  return {
    SetRest: SetRestTime,
    SetWork: SetWorkTime,
  }

})();
import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Initialize from "./Initialize";
import StartStopButton from "./StartStopButton";
import FocusTimer from "./FocusTimer";
import Progress from "./Progress";

/**
 * A component representing a Pomodoro timer.
 * @returns {JSX} A <div> element containing all other components.
 */
function Pomodoro() {
  const initTimer = {
		focusMax: 60 * 25, // 60sec * 25min
		focusLeft: 60 * 25, 
		focusFloor: 60 * 5, // 60sec * 5min
		focusRoof: 60 * 60, // 60sec * 60min

		breakMax: 60 * 5, // 60sec * 5min
		breakLeft: 60 * 5,
		breakFloor: 60 * 1, // 60sec * 1min
		breakRoof: 60 * 15, // 60sec * 15min

		isTimerRunning: false,
		focus: true,
		sessionStarted: false,
	};
  const [timer, setTimer] = useState({...initTimer});

  // useInterval is called every second when the timer is on
	useInterval(
    () => {
			if(timer.focusLeft <= 0 || timer.breakLeft <= 0) {
				const alarm = new Audio(`https://onlineclock.net/audio/options/default.mp3`).play();
				console.log(alarm);
				switchModes();
			}
			else {
				if(timer.focus)
					timePassed("focusLeft");
				else
					timePassed("breakLeft");	
			}
    },
    timer.isTimerRunning ? 1000 : null
  );

	/**
	 * If a second has passed, appropriately decrease second on timer.
	 * @param {string} mode - Either "focusLeft" or "breakLeft".
	 */
	function timePassed(mode) {
		setTimer(() => {
			return {
				...timer,
				[mode]: timer[mode] - 1,
			};
		});
	}

	/**
	 * Once focus/break ends, switch modes and reset timers.
	 */
	function switchModes() {
		setTimer(() => {
			return {
				...timer, 
				focusLeft: timer.focusMax,
				breakLeft: timer.breakMax,
				focus: !timer.focus,
			};
		});
	}

	/**
	 * Adds an extra "0" to single-digit numbers.
	 * @param {number} num - The number to pad.
	 * @returns {number} - The padded number, if padded at all.
	 */
	function pad(num) {
		return num < 10 ? "0" + num : num;
	}

	/**
	 * Gives a time formatted in mm:ss.
	 * @param {string} mode Four possibilities: focusMax, focusLeft, breakMax, breakLeft 
	 */
	function getTime(mode) {
		return `${ pad(Math.floor(timer[mode] / 60)) }:${ pad(timer[mode] % 60) }`;
	}

	/**
	 * Gives a key of the timer object.
	 * @param {string} key The key of the timer object.
	 */
	function get(key) {
		return timer[key];
	}

	/**
	 * Increments/decrements max of focus/break.
	 * @param {string} mode - Either "focus" or "break".
	 * @param {number} change - Amount to change max by.
	 */
	function changeMax(mode, change) {
		const newTime = change < 0
			? Math.max(timer[mode + "Floor"], timer[mode + "Max"] + change)
			: Math.min(timer[mode + "Roof"], timer[mode + "Max"] + change);

		setTimer(() => {
			return {
				...timer,
				[mode + "Max"]: newTime,
				[mode + "Left"]: newTime,
			};
		});
	}

	/**
	 * Plays/pauses the timer.
	 */
  function playPause() {
    setTimer(() => {
			return {
				...timer, 
				isTimerRunning: !timer.isTimerRunning,
				sessionStarted: true,
			};
		});
  }

	/**
	 * Stops the timer, resetting it.
	 */
	function stop() {
		setTimer(() => {
			return {
				...timer,
				isTimerRunning: false,
				sessionStarted: false,
				focusLeft: timer.focusMax,
				breakLeft: timer.breakMax,
				focus: true,
			};
		});
	}

  return (
    <div className="pomodoro">
			<div className="row">
				<div className="col">
					<Initialize 
						changeMax={changeMax}
						getTime={getTime}
						mode="focus"
					/>
				</div>
				<div className="col">
					<div className="float-right">
						<Initialize 
							changeMax={changeMax}
							getTime={getTime}
							mode="break"
						/>
					</div>
				</div>
			</div>

      <StartStopButton 
				playPause={playPause}
				get={get}
				stop={stop}
			/>

			<FocusTimer 
				getTime={getTime}
				get={get}
			/>

			<Progress
				get={get}
			/>
    </div>
  );
}

export default Pomodoro;

import React from "react";
import PropTypes from "prop-types";

/**
 * A component that shows the time remaining when the timer is on.
 * @param {Object} props - The properties passed on to this component.
 * @param {getTime} props.getTime - A function that gives a time in mm:ss.
 * @param {get} props.get - Gets a key of the timer object.
 * @returns {JSX} - A <div> element containing information about the timer.
 */
function FocusTimer( {getTime, get} ) {
	if(!get("sessionStarted")) return null;

	const currMode = get("focus") ? "focus" : "break";
	
	return (
		<div className="row mb-2">
			<div className="col">
				<h2 data-testid="session-title">
					{get("focus") ? "Focusing " : "On Break "}
					for {getTime(`${currMode}Max`)} minutes
				</h2>
				<p className="lead" data-testid="session-sub-title">
					{getTime(`${currMode}Left`)} remaining
				</p>
				<h3>{!get("isTimerRunning") ? "PAUSED" : ""}</h3>
			</div>
		</div>

	);
}

FocusTimer.propTypes = {
	get: PropTypes.func.isRequired,
	getTime: PropTypes.func.isRequired,
};

export default FocusTimer;
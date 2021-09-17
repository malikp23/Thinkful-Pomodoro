import React from "react";
import classNames from "../utils/class-names";
import PropTypes from "prop-types";

/**
 * Two buttons that control play, pause, and stopping the timer.
 * @param {Object} props - The properties passed on to this component.
 * @param {function} props.playPause - Turns the timer on/off.
 * @param {function} props.get - Gets a key of the timer object.
 * @param {function} props.stop - Stops the timer and resets the time left.
 * @returns {JSX} - A <div> element containing two buttons.
 */
function StartStopButton( {playPause, get, stop} ) {
	return (
		<div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !get("isTimerRunning"),
                "oi-media-pause": get("isTimerRunning"),
              })}
            />
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            data-testid="stop"
            title="Stop the session"
						onClick={stop}
						disabled={!get("isTimerRunning")}
          >
            <span className="oi oi-media-stop" />
           </button>
        </div>
      </div>
    </div>
	);
}

StartStopButton.propTypes = {
	playPause: PropTypes.func.isRequired,
	get: PropTypes.func.isRequired,
	stop: PropTypes.func.isRequired,
};

export default StartStopButton;
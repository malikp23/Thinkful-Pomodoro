import React from "react";
import PropTypes from "prop-types";

/**
 * A component which allows the user to see and edit the focus/break max times.
 * @param {Object} props - The properties passed on to this component.
 * @param {function} props.changeMax - A function that changes the max time.
 * @param {function} props.getTime - A function that gives a time in mm:ss.
 * @param {string} props.mode - Either "focus" or "break".
 * @returns {JSX} - A <div> element containing timer info and buttons.
 */
function Initialize( {changeMax, getTime, mode} ) {
	/**
	 * Handles changing the max of focus/break.
	 * @param {Event} - Button event.
	 */
	function handleChange(event) {
		switch(event.target.dataset.testid) {
			case "decrease-focus": changeMax("focus", 60 * -5); break;
			case "increase-focus": changeMax("focus", 60 * 5); break;
			case "decrease-break": changeMax("break", 60 * -1); break;
			case "increase-break": changeMax("break", 60 * 1); break;
			default: console.log("Something went wrong! @handleChange"); break;
		}
	}

	return (
			<div className="col">
				<div className="input-group input-group-lg mb-2">
					<span className="input-group-text" data-testid={`duration-${mode}`}>
						{mode.charAt(0).toUpperCase() + mode.slice(1)} Duration: {getTime(`${mode}Max`)}
					</span>

					<div className="input-group-append">
						<button
							type="button"
							className="btn btn-secondary"
							data-testid={`decrease-${mode}`}
							onClick={handleChange}
						>
							<span className="oi oi-minus" />
						</button>
	
						<button
							type="button"
							className="btn btn-secondary"
							data-testid={`increase-${mode}`}
							onClick={handleChange}
						>
							<span className="oi oi-plus" />
						</button>
					</div>
				</div>
			</div>
	);
}

Initialize.propTypes = {
	changeMax: PropTypes.func.isRequired,
	getTime: PropTypes.func.isRequired,
	mode: PropTypes.string.isRequired,
};

export default Initialize;
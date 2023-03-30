/**
 * Displays a panel of information
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import { CheckOption } from "./EditPanel";


// Tooltip
const Tooltip = ({ app, body }) => {
    return (
        <CheckOption app={app} body={body} noCheck/>
    );
};

export default Tooltip;
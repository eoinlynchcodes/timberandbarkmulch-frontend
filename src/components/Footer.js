import React from "react";
import firewoodstack from "../imagesByEoin/firewoodstack.jpeg";
// import LocationOnIcon from "@material-ui/icons/LocationOn";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="firewoodSection">
          <img src={firewoodstack} />
        </div>
        <div>
          <p>&copy; timberandbarkmulch 2020 - Lynch Tree Surgery.</p>
          <p>
            {/* <LocationOnIcon /> Mullingar, Westmeath, Ireland. */}
          </p>
          <p className="background-for-eoin">
          <a className="whitetext" href="https://eoinlynch.com">Code &amp; design by Eoin Lynch.</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

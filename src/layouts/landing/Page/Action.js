import React from "react";
import Buttons from "../Components/Buttons";

function Action() {
  return (
    <>
      <section className="action">
        <div className="action__head">
          <h2>Clipboard for iOS and Mac OS</h2>
          <p>
            Available for free on the App Store. Download for Mac or iOS, sync with iCloud and
            you’re ready to start adding to your clipboard.
          </p>
        </div>
        <Buttons />
      </section>
    </>
  );
}

export default Action;

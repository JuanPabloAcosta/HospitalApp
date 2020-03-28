import React from "react";
import styles from "./preloader-styles";

class Preloader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={styles.preloaderContainer}>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preloader;

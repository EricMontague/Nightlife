class Poller {
  constructor(timeDelay, retries) {
    this.timeDelay = timeDelay;
    this.retries = retries;
    this.intervalId = null;
  }

  start(func, parameters) {
    this.intervalId = setInterval(
      this.callFunction.bind(this),
      this.timeDelay,
      func,
      parameters
    );
    console.log(this.intervalId);
  }

  async callFunction(func, parameters) {
    console.log(parameters);
    let wasSuccessful = true;
    try {
      await func(...parameters);
    } catch (error) {
      console.log(`An error occurred while polling: ${error.message}`);
      wasSuccessful = false;
      this.retries -= 1;
    }
    if (wasSuccessful || this.retries === 0) {
      this.stop();
    }
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

export default Poller;

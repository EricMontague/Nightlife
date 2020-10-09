class Poller {
  constructor(timeDelay, retries) {
    this.timeDelay = timeDelay;
    this.retries = retries;
    this.intervalId = null;
  }

  start(func, errorCallback, parameters) {
    this.intervalId = setInterval(async () => {
      try {
        await this.execute.call(this, func, parameters);
      } catch (error) {
        this.stop();
        errorCallback(error.message);
      }
    }, this.timeDelay);
  }

  async execute(func, parameters) {
    let wasSuccessful = true;
    try {
      await func(...parameters);
    } catch (error) {
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

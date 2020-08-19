class Poller {
  constructor(func, parameters, timeDelay, retries, self = null) {
    this.func = func;
    this.parameters = parameters;
    this.timeDelay = timeDelay;
    this.retries = retries;
    this.intervalId = null;
    this.self = self;
  }

  start() {
    this.intervalId = setInterval(
      this.callFunction.bind(this),
      this.timeDelay,
      ...this.parameters
    );
    console.log(this.intervalId);
  }

  callFunction() {
    console.log(this.self);
    let wasSuccessful = true;
    try {
      this.func.call(this.self);
    } catch (error) {
      console.log("An error occurred while polling.");
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

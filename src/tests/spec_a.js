import ProgressBarApp from'../../src/scripts/index';
describe("ProgressBarApp", function () {
  let progressBarApp;

    beforeEach(() => {
      console.log('**JSR');
        this.progressBarApp = new ProgressBarApp('appContainer');
        // global.productScope = {
        //   // you mock definition
        //   someClass = new someClass();
        // };
    });

    it('should be a class', function() {
      console.log(progressBarApp);
      expect(1).toBe(10);
  });
});
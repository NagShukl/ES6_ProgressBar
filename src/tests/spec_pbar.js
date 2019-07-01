import ProgressBarApp from '../../src/scripts/index';
// import triggerEvent from 'trigger-event';

const model = { "bars": [10, 300, 40, 50, 45, 32, -5], "buttons": [-20, 30, -40, 50, -45, 32, -65], "limit": 200 };

describe("ProgressBarApp ", function () {
  let progressBarApp;
  beforeAll(() => {
    const orgData = document.createElement('div');
    orgData.id = 'orgData';
    document.body.appendChild(orgData);
    const appContainer = document.createElement('div');
    appContainer.id = 'appContainer';
    document.body.appendChild(appContainer);
    progressBarApp = new ProgressBarApp(appContainer);
    progressBarApp.pBarModel = model;
    progressBarApp.initBars();
  });

  it('should launch without creash, have barContainer and button panel', function () {
    let ele = document.querySelector('.pbar-container');
    expect(ele).not.toEqual(undefined);
    ele = document.querySelector('#orgData');
    expect(ele).not.toEqual(undefined);
    ele = document.querySelector('.btn-container');
    expect(ele).not.toEqual(undefined);
  });
  it('should Show model data', function () {
    let ele = document.getElementById('orgData');
    expect(ele.innerHTML).not.toEqual(undefined);
    expect(ele.innerHTML).not.toEqual(undefined);
    expect(ele.textContent).toBe(JSON.stringify(model));
  });
  it('should render bars as par model data', function () {
    let ele = document.querySelectorAll('.pbar-wrapper');
    expect(ele.length).toBe(model.bars.length);
  });
  it('should render bars in same order, with correct percentage', function () {
    let ele = document.querySelectorAll('.value-div');
    expect(ele.length).toBe(model.bars.length);
    model.bars.forEach((item, index) => {
      expect(progressBarApp.progressBar.getPerentage(item) + '%').toBe(ele[index].innerHTML);
    })
  });

  it('should have correct id, bar color, width and animation', function () {
    const ele = document.querySelectorAll('.pbar');
    expect(ele.length).toBe(model.bars.length);
    model.bars.forEach((item, index) => {
      const cls = progressBarApp.progressBar.getBarCssClass(item);
      const id = progressBarApp.progressBar.getBarId(index);
      const width = progressBarApp.progressBar.getPerentageStyle(item);
      const animationName = progressBarApp.progressBar.barAnimation_prefix + item;

      expect('pBar_' + id).toBe(ele[index].id);
      expect(cls).toBe(ele[index].className);
      expect(width + '%').toBe(ele[index].style.width);
      expect(animationName).toBe(ele[index].style.animationName);
    })
  });
  it('should have options to select progress bar', function () {
    let ele = document.getElementById('btnContainer');
    ele = ele.getElementsByTagName('select');
    expect(ele.length).toBe(1);
    const opts = ele[0].options;
    expect(opts.length).toBe(model.bars.length);

    Array.from(opts).forEach((opt, index) => {
      expect(opt.value).toBe('' + index);
      expect(opt.text).toBe('ProgressBar #' + index);
    });
  });
  it('should have buttons with correct count, in same sequence and correct value', function () {
    let ele = document.getElementById('btnContainer');
    ele = ele.querySelectorAll('input[type="button"]');
    expect(ele.length).toBe(model.buttons.length);
    ele.forEach((item, index) => {
      expect(item.value).toBe('' + model.buttons[index]);
    });
  });
  describe('Button click', () => {
    let progressBarApp;
    beforeAll(() => {
      const orgData = document.createElement('div');
      orgData.id = 'orgData';
      document.body.appendChild(orgData);
      const appContainer = document.createElement('div');
      appContainer.id = 'appContainer';
      document.body.appendChild(appContainer);
      progressBarApp = new ProgressBarApp(appContainer);
      progressBarApp.pBarModel = model;
      progressBarApp.initBars();
    });
  
    it('should update value as per button and bar selection', () => {
      const performAction = (barId, btnId) => {
        let ele = document.getElementById('btnContainer');
        // trigger Bar Selection change
        const sel = document.getElementById('btnContainer').getElementsByTagName('select')[0];
        sel.selectedIndex = barId; 
        sel.dispatchEvent(new Event('change'));
        // get list of all buttons
        ele = ele.querySelectorAll('input[type="button"]');
        // get old value of bar.
        const oldValue = progressBarApp.pBarModel.bars[barId];
        // trigger click event on button
        ele[btnId].click();
        //verify changes in model.
        expect(progressBarApp.pBarModel.bars[barId]).toBe(oldValue + model.buttons[btnId]);
      }
     performAction(0,1);
     performAction(0,1);
     performAction(1,1);
     performAction(2,2);
     performAction(3,2);
    });
  });
});
import ProgressBar from './ProgressBar';
import ButtonPanel from './ButtonPanel';
const model = { "bars": [10, 300, 40, 50, 45, 32, -5], "buttons": [-20, 30, -40, 50, -45, 32, -65], "limit": 200 };

export default class ProgressBarApp {
    pBarModel;
    constructor(rootEle) {
        this.rootEle = rootEle;
        this.pBarModel = model;

        this.progressBar = new ProgressBar();
        this.buttonPanel = new ButtonPanel();
    }
    init = () => {
        fetch('http://pb-api.herokuapp.com/bars').then(response => response.json())
            .then(data => {
                this.pBarModel = data;
                this.initBars();
            }).catch(error => {
                console.log('Error loading data from api!!! using mock data');
                this.initBars();
            });


    }
    initBars = () => {
        const pbarDiv = this.createElement('barContainer', 'pbar-container');
        this.progressBar.renderBars(pbarDiv, this.pBarModel);
        const btnDiv = this.createElement('btnContainer', 'btn-container');
        this.buttonPanel.renderButtonPanel(btnDiv, this.pBarModel, this.progressBar.updateProgressBar, this.progressBar.updateSelectedBar);
        this.rootEle.appendChild(pbarDiv);
        this.rootEle.appendChild(btnDiv);
    }
    createElement = (id, cls) => {
        const div = document.createElement('div');
        div.id = id;
        div.className = cls;
        return div;
    }
}

try {
    if (ProgressBarApp)
        (function () {
            new ProgressBarApp(document.getElementById('appContainer')).init();
        })();
} catch (e) { alert('ProgressBarApp not loaded') }



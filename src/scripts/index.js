import ProgressBar from './ProgressBar';
import ButtonPanel from './ButtonPanel';

export default class ProgressBarApp {
    progressBar;
    constructor(rootEleId) {
        this.pBarModel = {};
        this.pBarModel.bars = [10, 300, 40, 50, 45, 32, -5];
        this.pBarModel.buttons = [-20, 30, -40, 50, -45, 32, -65];
        this.pBarModel.limit = 200;
        
        this.progressBar = new ProgressBar();
        this.buttonPanel = new ButtonPanel();
        this.init(rootEleId);
        // this.cb = val => {
        //     alert('Jai Shri Ram!');
        // }
        
    }
    init = (rootEleId) => {
        fetch('http://pb-api.herokuapp.com_/bars').then(response => response.json())
        .then(data => {
            this.pBarModel = data;
            this.initBars(rootEleId);            
        }).catch(error => {
            console.log('Error loading data from api!!! using mock data');
            this.initBars(rootEleId);  
        });

        
    }
    initBars = (rootEleId) => {
        const pbarDiv = this.createElement('barContainer', 'pbar-container');
        this.progressBar.renerBars(pbarDiv, this.pBarModel);
        const btnDiv = this.createElement('btnContainer', 'btn-container');
        this.buttonPanel.renderButtonPanel(btnDiv, this.pBarModel, this.progressBar.updateProgressBar, this.progressBar.updateSelectedBar);
        document.getElementById(rootEleId).appendChild(pbarDiv);
        document.getElementById(rootEleId).appendChild(btnDiv);
    }
    createElement = (id, cls) => {
        const div = document.createElement('div');
        div.id = id;
        div.className = cls;
        return div;
    }
}



new ProgressBarApp('appContainer');
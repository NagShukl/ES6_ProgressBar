export default class ProgressBar {
    barAnimation_prefix = 'barAnimation_';
    limit = 100;
    selectedBar = 0;
    // This property is to hold all cached percentages. Its used in generating optimal animation definition.
    // everytime a new percentage generated, will push into this array, then while generating animateclass
    // first will check, whether this animation we already have or not.
    // if not; then only we will add new animation definition.
    cachedPercentage = new Set();
    renderBars = (ele, pBarModel) => {
        this.pBarModel = pBarModel;
        this.limit = pBarModel.limit;
        this.updateBarInDom(ele, this.pBarModel.bars);
        this.animateBar();
        this.getOriginalData();
    }
    getOriginalData = () => {
        document.getElementById('orgData').innerHTML = JSON.stringify(this.pBarModel);
    }
    updateProgressBar = (evt) => {
        this.pBarModel.bars[this.selectedBar] = this.pBarModel.bars[this.selectedBar] + +evt.target.value;
        // If value gets negative; mark it as zero.
        if (this.pBarModel.bars[this.selectedBar] <= 0) {
            this.pBarModel.bars[this.selectedBar] = 0;
        }
        document.getElementById(this.getBarId(this.selectedBar)).innerHTML = this.getBar(this.pBarModel.bars[this.selectedBar], this.selectedBar);
        this.attachStyle(this.animateBar(this.pBarModel.bars[this.selectedBar]));
        this.getOriginalData();
    }
    updateSelectedBar = (evt) => {
        this.selectedBar = evt.target.value;
    }

    getBarId = (index) => {
        return 'barId_' + index;
    }

    updateBarInDom = (parEle, arr) => {
        const data = this.getBars(arr);
        this.attachStyle(data.animate);
        parEle.innerHTML = data.html;
    }
    attachStyle = (styleDef) => {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styleDef;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    getBars = (arr) => {
        let html = '';
        let animateBar = '';
        arr.forEach((element, index) => {
            html += `<div id="${this.getBarId(index)}" class="pbar-wrapper">${this.getBar(element, index)} </div>`;
            animateBar += this.animateBar(element);
        });
        return { 'html': html, 'animate': animateBar };
    };
    getBar = (ele, index) => {
        console.log('getBar is called');
        return `<div class="value-div" id="content_${this.getBarId(index)}">${this.getPerentage(ele)}%</div>
        <div id="pBar_${this.getBarId(index)}" class="${this.getBarCssClass(ele)}" style="width: ${this.getPerentageStyle(ele)}%; animation-name: ${this.barAnimation_prefix}${ele};">&nbsp;</div>
     `;
    };
    /**
     * This method is to return class for progress bar
     */
    getBarCssClass = (ele) => {
        const value = this.getPerentage(ele);
        let res = 'pbar ';
        if (value <= 0) {
            res += 'pbar-below0';
        }
        if (value > 100) {
            res += 'pbar-above100';
        }
        return res;
    }
    getPerentageStyle(ele) {
        const value = this.getPerentage(ele);
        return value <= 100 ? value : 100;
    }
    /**
     * This method i to calculate the percentage of given value against limit
     */
    getPerentage(value) {
        if (value <= 0)
            return 0;
        const res = (value * 100) / this.limit;
        // Update this value in cachedPercentages set, to verify it animation definition for this % is there or not;
        this.cachedPercentage.add(res);
        return res;
    }

    /**
     * This method is to generate animation style; while generating animation it verifies if this anomation definition already exists or not
     * for optimal performance - its important that if an animation definition is already generated then it should not be generated again.
     */
    animateBar = (ele) => {
        console.log(ele + ' : ' + this.cachedPercentage);
        const value = this.getPerentageStyle(ele);
        if (!(value in this.cachedPercentage)) {
            return `@keyframes ${this.barAnimation_prefix}${ele} {
                from {width: 0%;}
                to {width: ${value}%;}
                }`;
        }
        return '';
    };
}

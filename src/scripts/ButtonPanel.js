export default class ButtonPanel {

    renderButtonPanel = (ele, pBarModel, updateProgressBar, updateSelectedBar) => {
        this.pBarModel = pBarModel;
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        this.getProgressBarSelect(li, pBarModel, updateSelectedBar);
        ul.appendChild(li);
        this.getButtonsList(ul, pBarModel.buttons, updateProgressBar);
        ele.appendChild(ul);
    }
    getProgressBarSelect = (parEle, pBarModel, updateSelectedBar) => {
        const select = document.createElement('select');
        select.onchange = updateSelectedBar;
        this.getProgressBarSelectOptions(select, pBarModel.bars);
        parEle.appendChild(select);
    }
    getProgressBarSelectOptions = (select, arr) => {
        let option;
        arr.forEach((element, index) => {
            option = document.createElement("option");
            option.value = index;
            option.text = 'ProgressBar #' + index;
            select.appendChild(option);
        });
    }
    getButtonsList = (parEle, arr, cb) => {
        arr.forEach(ele => {
            this.createButton(parEle, ele, cb);
        });
    }
    createButton = (context, ele, func) => {
        const li = document.createElement('li');
        const button = document.createElement("input");
        button.type = "button";
        button.value = ele;
        button.onclick = func;
        li.appendChild(button);
        context.appendChild(li);
    }
}

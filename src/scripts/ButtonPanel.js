export default class ButtonPanel {
    renderButtonPanel = (ele, pBarModel, updateProgressBar, updateSelectedBar) => {
        this.pBarModel = pBarModel;
        // let html = <ul>';
        // html += this.getProgressBarSelect(pBarModel);
        // ele.innerHTML = html;
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        // li.innerHTML =
         this.getProgressBarSelect(li, pBarModel, updateSelectedBar);
        ul.appendChild(li);
        // ul.appendChild(
            this.getButtonsList(ul, pBarModel.buttons, updateProgressBar);
            // );
        ele.appendChild(ul);
        // ele.innerHTML = `<ul><li><l/li>${this.getButtonsList(pBarModel.buttons, cb)}</ul>`;
    }
    getProgressBarSelect = (parEle, pBarModel, updateSelectedBar) => {
        const select = document.createElement('select');
        select.onchange = updateSelectedBar;
        // select.options = 
        this.getProgressBarSelectOptions(select, pBarModel.bars);
        parEle.appendChild(select);
        // return `<select>${}</select>`;
    }
    getProgressBarSelectOptions = (select, arr) => {
        let option; 
        arr.forEach((element, index) => {
            option = document.createElement("option");
            option.value = index;
            option.text = 'ProgressBar #'+index;
            select.appendChild(option);
        });
        // return option;
    }
    getButtonsList = (parEle, arr, cb) => {
        // alert(cb);
        // let res = '';
        arr.forEach(ele => {
            //res += `<li><button onclick="(this) => alert('**JSR,..'+this);" value="${ele}">${ele}</button></li>`;
            // parEle.appendChild(
                this.createButton(parEle,ele, cb);
                // );
        });
        // return res;
    }
    createButton = (context, ele,func) => {
        const li = document.createElement('li');
        const button = document.createElement("input");
        button.type = "button";
        button.value = ele;
        button.onclick = func;
        li.appendChild(button);
        context.appendChild(li);
    }
}

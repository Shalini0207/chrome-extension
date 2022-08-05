const inputArea = document.getElementById('input-el');
const btnSave = document.getElementById('save');
const ulEl = document.getElementById('ul-el');
const delBtn = document.getElementById('delete');
const saveTabBtn = document.getElementById('save-tab');

const audio = new Audio("clickaudio.mp3");

let myLeads = [];

btnSave.addEventListener('click', ()=>{
    // if(inputArea.value!=='') {
    myLeads.push(inputArea.value);
    // }
    inputArea.value = '';
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

const myLeadsFromStorage = localStorage.getItem("myLeads");
const myLeadsArr = JSON.parse(myLeadsFromStorage);
// console.log(myLeadsArr);

if (myLeadsArr) {
    myLeads = myLeadsArr;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
        listItems+= `
        <li>
            <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>`;
        //string under bapticks(``) is known as tempalte string and we can write our html code like this only when we are writing it under ``. 
        // Normal quote'/" will lead to break of the code
        //if we log this out, we can see that the line is breaking exactly where we are breaking our line in code
    }
    ulEl.innerHTML = listItems;
}

delBtn.addEventListener("dblclick", ()=>{
    localStorage.removeItem("myLeads");
    myLeads = [];
    render(myLeads);
});

// const tabs = [
//     {url: "https://www.w3schools.com/js/js_json_intro.asp"}
// ];

saveTabBtn.addEventListener('click', ()=>{
    audio.play();
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) 
    {
        // if(tabs[0].url!=='https://hive.tadigital.com/'){
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        // }
    });
    // console.log(tabs[0].url);
})



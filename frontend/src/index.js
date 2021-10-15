import getUpdates from "./components/app";

var ambulanceCount = 0;

document.querySelector('#getPositions').addEventListener('click',()=>{
    ambulanceCount = document.querySelector('#ambulance-count').value;
    getUpdates(ambulanceCount);
});
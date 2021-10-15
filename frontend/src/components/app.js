export default function getUpdates(ambulanceCount){
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 8,
    });
    let markers = []
    let ambulances = []

    google.maps.Map.prototype.clearOverlays = function() {
        for (var i = 0; i < markers.length; i++ ) {
          markers[i].setMap(null);
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms))
    //fake passenger
    
    let ambulance_info = document.querySelector('#ambulance-tracker')
    console.log(ambulanceCount);
    for(let i=1;i<=ambulanceCount;i++){
        let tr = document.createElement('tr');
        let amb_info = {'id':i,'lat':0,'long':0,'speed':0.1};
        ambulances.push(amb_info);
        let id_cell = document.createElement('td');
        id_cell.innerHTML = i;
        let pos_cell = document.createElement('td');
        pos_cell.innerHTML = '0 , 0';
        let speed_cell = document.createElement('td');
        speed_cell.innerHTML = '0.1';
        tr.appendChild(id_cell);
        tr.appendChild(pos_cell);
        tr.appendChild(speed_cell);
        ambulance_info.appendChild(tr);
        let marker = new google.maps.Marker({
            position: {'lat':0,'lng':0},
            map: map,
        });
        markers.push(marker);
    };

      
    let info_rows = ambulance_info.childNodes;
    console.log(info_rows);
    let dir = [-1,1]
    setInterval(async function(){ 
        await delay(1000);
        map.clearOverlays();
        markers = [];
        for(let i=1;i<=ambulances.length;i++){
            let amb = ambulances[i-1];
            let dir_x = dir[Math.floor(Math.random() * dir.length)];
            let dir_y = dir[Math.floor(Math.random() * dir.length)];
            let newPosX = amb['lat'] + (dir_x * amb['speed']);
            let newPosY = amb['long'] + (dir_y * amb['speed']);
            amb['lat'] = Math.round(newPosX * 10) / 10;
            amb['long'] = Math.round(newPosY * 10) / 10;
            (info_rows[i].childNodes)[1].innerHTML = newPosX + ' , ' + newPosY;
            let marker = new google.maps.Marker({
                position: {'lat':Math.round(newPosX * 10) / 10,'lng':Math.round(newPosY * 10) / 10},
                map: map,
            });
            markers.push(marker);
        };
    }, 1000);
};


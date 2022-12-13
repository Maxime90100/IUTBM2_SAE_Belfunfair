let map, selectMap, paths, selectManege, selectStand, cards, card
let manegeMap, manegePaths, manegeSelect, attributed_manege
let standMap, standPaths, standSelect, attributed_stand

window.onload = ()=>{
    map = document.querySelector(".map")
    if(map !== null){
        selectMap = map.querySelector("#selectMap")
        selectMap.addEventListener('change',function(){
            let opacity = 100
            if(selectMap.checked) opacity = 0
            document.getElementById('satelite').style.opacity = opacity
        })

        paths = map.querySelectorAll('[name="map"]')
        paths.forEach(function (path){
            path.addEventListener('mouseenter', function (){
                activeArea(this.id)
            })
        })

        selectManege = map.querySelector('#selectMapManege')
        selectManege.addEventListener(('change'),function (){
            if(selectManege.value === 0) activeArea()
            else activeArea(selectManege.value)
        })

        selectStand = map.querySelector('#selectMapStand')
        selectStand.addEventListener(('change'),function (){
            if(selectStand.value === 0) activeArea()
            else activeArea(selectStand.value)
        })

        cards = map.querySelectorAll('[name="card"]')
    }

    manegeMap = document.querySelector(".signupManegeMap")
    if(manegeMap !== null){
        manegePaths = document.querySelectorAll('[name="map"]')
        let dateDebut, dateFin

        let inputDateDebut = document.querySelector('[name="datedebut"]')
        inputDateDebut.addEventListener(('change'),function(){
            dateDebut = inputDateDebut.value
            showMapManege(dateDebut,dateFin)
        })
        let inputDatefin = document.querySelector('[name="datefin"]')
        inputDatefin.addEventListener(('change'),function(){
            dateFin = inputDatefin.value
            showMapManege(dateDebut,dateFin)
        })

        manegeSelect = manegeMap.querySelector('#selectMapManege')
        manegeSelect.addEventListener(('change'),function (){
            activeAreaManege(manegeSelect.value)
        })
    }

    standMap = document.querySelector(".signupStandMap")
    if(standMap !== null){
        standPaths = document.querySelectorAll('[name="map"]')
        let dateDebut, dateFin

        let inputDateDebut = document.querySelector('[name="datedebut"]')
        inputDateDebut.addEventListener(('change'),function(){
            dateDebut = inputDateDebut.value
            showMapStand(dateDebut,dateFin)
        })
        let inputDatefin = document.querySelector('[name="datefin"]')
        inputDatefin.addEventListener(('change'),function(){
            dateFin = inputDatefin.value
            showMapStand(dateDebut,dateFin)
        })

        standSelect = standMap.querySelector('#selectMapStand')
        standSelect.addEventListener(('change'),function (){
            activeAreaStand(standSelect.value)
        })
    }
}

function activeArea (id){
    paths.forEach(item => {item.style.fill = 'grey'})
    cards.forEach(c=>{c.style.display = "none"})

    if (id !== undefined){
        let targetMap
        if(id.split('-')[0] === 'list' ){
            // LISTE
            id = id.split('-')[1]
            targetMap = map.querySelector('#'+id)
        }else{
            // MAP
            selectManege.value = 'list-'+id
            selectStand.value = 'list-'+id
            targetMap = map.querySelector('#'+id)
        }
        targetMap.style.fill = "blue"
        card = document.querySelector('#mapCard-'+id)
        if(card === null) card = document.querySelector('#mapCard-null')
        card.style.display = "block"
    }
}

function activeAreaManege (id){
    manegePaths.forEach(item => {
        let itemId = item.id.split('manege')[1]
        if(itemId === id.split('-')[0]) item.style.fill = "blue"
        else if(!attributed_manege.includes(item.id)) item.style.fill = "green"
        else item.style.fill = "red"
    })
}
function showMapManege(Debut,Fin){
    if(Debut !== undefined && Fin !== undefined){
        manegeMap.style.display = "block"
        attributed_manege = []
        for(i=1; i<manegeSelect.length; i++){
            let idEmplacement = manegeSelect.options[i].value.split('-')[0]
            let dateDebut = manegeSelect.options[i].value.split('-')[1]
            let dateFin = manegeSelect.options[i].value.split('-')[2]

            let pathId = "manege"+idEmplacement
            let path = manegeMap.querySelector('#'+pathId)

            if(dateCheck(Debut,Fin,dateDebut,dateFin) && !attributed_manege.includes(pathId)){
                manegeSelect.options[i].style.display = 'block'
                path.style.fill = "green"
            }else{
                manegeSelect.options[i].style.display = 'none'
                attributed_manege.push(pathId)
                path.style.fill = "red"
            }
        }
    }
}

function activeAreaStand (id){
    standPaths.forEach(item => {
        let itemId = item.id.split('stand')[1]
        if(itemId === id.split('-')[0]) item.style.fill = "blue"
        else if(!attributed_stand.includes(item.id)) item.style.fill = "green"
        else item.style.fill = "red"
    })
}
function showMapStand(Debut,Fin){
    if(Debut !== undefined && Fin !== undefined){
        standMap.style.display = "block"
        attributed_stand = []
        for(i=1; i<standSelect.length; i++){
            let idEmplacement = standSelect.options[i].value.split('-')[0]
            let dateDebut = standSelect.options[i].value.split('-')[1]
            let dateFin = standSelect.options[i].value.split('-')[2]

            let pathId = "stand"+idEmplacement
            let path = standMap.querySelector('#'+pathId)

            if(dateCheck(Debut,Fin,dateDebut,dateFin) && !attributed_stand.includes(pathId)){
                standSelect.options[i].style.display = 'block'
                path.style.fill = "green"
            }else{
                standSelect.options[i].style.display = 'none'
                attributed_stand.push(pathId)
                path.style.fill = "red"
            }
        }
    }
}

function dateCheck(from,to,dateDebut,dateFin) {
    from = new Date(from)
    to = new Date(to)
    dateDebut = new Date(dateDebut.split('/')[2]+'-'+dateDebut.split('/')[1]+'-'+dateDebut.split('/')[0]);
    dateFin = new Date(dateFin.split('/')[2]+'-'+dateFin.split('/')[1]+'-'+dateFin.split('/')[0]);

    let c1 = dateDebut.getTime() > to.getTime() || dateDebut.getTime() < from.getTime()
    let c2 = dateFin.getTime() > to.getTime() || dateFin.getTime() < from.getTime()

    return c1 && c2;
}


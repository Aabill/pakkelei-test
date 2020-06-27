const players = [
    { 
        name: 'aaron domingo',
        gifts: [],
        dice: null, 
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    }, 
    {
        name:'jairus',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    },
    {
        name: 'elton',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    },
    { 
        name: 'rowena',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    }, 
    {
        name: 'dan',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    }, 
    {
        name: 'andi',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    },
    {
        name: 'arlyn',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    },
    {
        name: 'chad',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    },
    {
        name: 'sam',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    },
    {
        name: 'red',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    },
    {
        name: 'micah',
        gifts: [],
        dice: null,
        roll: false,
        status: null,
        img_src: '/index.jpeg'
    }
];

const gift = [
    'gift1', 'gift2', 'gift3', 'gift4', 'gift5',
    'gift6', 'gift7', 'gift8', 'gift9', 'gift10',
    'gift11', 'gift12', 'gift13', 'gift14', 'gift15',
    'gift16', 'gift17', 'gift18', 'gift19', 'gift20',
];    

const rounds = [
    {
        round: 'First Round',
        countdown: 5 * 60 * 1000, // 5mins x 60secs x 1000milli = 30000 milliseconds 
        rules: [
            {
                dice: [1,2,3,4,5],
                msg: 'Nice Luck!',
                status: 'Waiting for Dice',
                
            },
            {
                dice: [6],
                msg: 'Nice Luck! Choose and Grab one gift from the Table.',
                status: 'Grab a gift from the Table.'
            },
        ]
    },
    {
        round: 'Second Round',
        countdown: 3 * 60 * 1000,
        rules: [
            {
                dice: [1 , 2 , 4 , 5],
                msg: 'Nice Luck!',
                status: 'Waiting for Dice',
            },
            {
                dice: [3],
                msg: 'What a generous person! Grab one of your gift and give it to the person on your right side.',
                status: 'Give a gift on my right side.'
            },
            {
                dice: [6],
                msg: 'What a Luck! Grab a gift from the Table.',
                status: 'Grab a gift from the Table.'
            },
        ]
    },
    {
        round: 'Final Round',
        countdown: 2 * 60 * 1000,
        rules: [
            {
                dice: [2 , 4 , 5],
                msg: 'What a Luck!',
                status: 'Waiting for Dice',
            },
            {
                dice: [1],
                msg: 'No Mercy! Snatch one gift from a person!',
                status: 'Snatch a gift',
            },
            {
                dice: [3],
                msg: 'What a generous person! Grab one of your gift and give it to the person on your right side.',
                status: 'Give a gift on my right side.'
            },
            {
                dice: [6],
                msg: 'What a Luck! Grab a gift from the Table.',
                status: 'Grab a gift from the Table.'
            },
        ]
    }
];

let player_turn;
let dice_value = null;
let round_now = 0;
let next_player;

function startGame(player_name){
    if (player_name) {
        console.log('start on player ' + player_name);
        setplayerTurn(player_name);
    }else {
        console.log('start on random player');
    }
}

function setplayerTurn(player_name) {

    player_turn = players.find((e) => {
        return e.name == player_name;
    });
    player_turn.roll = true;
    player_turn.status = "Rolling the dice";
    console.log(player_turn);

    //get index of rightside player
    let index = players.findIndex((e)=>{
        return e.name == player_name;
    });
    setNextPlayer(index);
}

function rollDice() {
    let min = Math.ceil(1);
    let max = Math.floor(7);
    dice_value = Math.floor(Math.random() * (max - min)) + min;
    player_turn.dice = dice_value;
    dice_value = null;
    player_turn.roll = false;
    rounds[round_now].rules.forEach((el) => {
        el.dice.forEach((e)=>{
            if (e == player_turn.dice){
                player_turn.status = el.status;
            }
        })
    })
}

function grabGiftTable(gift_index) {
    if (gift.length > 0) {
        let grabbed_gift = gift.splice(gift_index, 1);
        player_turn.gifts.unshift(grabbed_gift[0]);
        player_turn.status = 'Grabbed ' + grabbed_gift[0] + ', waiting for dice to roll.;';
        console.log(player_turn.name + " just grabbed " + grabbed_gift[0]);
    }
    else {
        console.log('No more Gifts to Grab from the table.');
    }
    init();
}

function giveGiftToNextPlayer(gift_index) {
    if (player_turn.gifts.length > 0){
        let gift_to_give = player_turn.gifts.splice(gift_index, 1);
        next_player.gifts.unshift(gift_to_give[0]);
        player_turn.status = 'Gaved ' + gift_to_give[0] + ' to ' + next_player.name + ', waiting for dice to roll';
        console.log(player_turn.name + " just gave " + gift_to_give[0]+ "to " + next_player.name);
    }else{
        console.log(player_turn.name + ' has no more Gifts to give.');
    }
    
}

function snatchGiftFrom(gift_index, player_name){
    let snatch_from = players.find((e)=>{
        return e.name == player_name;
    });
    let snatched_gift = snatch_from.gifts.splice(gift_index, 1);
    player_turn.gifts.unshift(snatched_gift[0]);
    player_turn.status = "Snatched "
    console.log(player_turn.name + " just snatched " + snatched_gift[0] + "from " + snatch_from);
}

function setNextPlayer(index) {
    let number_players = players.length - 1;
    if( index == number_players ){
        next_player = players[0];
    }else{
        next_player = players[index+1];
    }
}

function nextRound() {
    if (round_now == rounds.length - 1){
        console.log('No more rounds');
    }else{
        round_now++;
    }
    console.log(round_now);
}


// Appends
const e_players_id = document.getElementById("players");
const t_players_id_left = document.getElementById('left-table-players');
const t_players_id_right = document.getElementById('right-table-players');

function init(){
    // e_players_id.innerHTML = '';
    
    refreshPlayersInfo();

    refreshClassInit();
    loadTableHeight(players.length);
}
function refreshPlayersInfo() {
    players.forEach((e, index) => {
        // console.log("player "+ Number(index + 1) +": " + e.name );
        loadPlayers(e.name,e.gifts.length,e.img_src);
        loadPlayersTable(index+1,e.roll,e.dice,e.status);
    });
}
function refreshClassInit() {
    document.querySelectorAll('.player-init').forEach(item => {
        item.addEventListener('touchstart', event => {
            item.classList.add('active');
            setTimeout(()=> {
                item.classList.remove('active');
            },1500)
        })
    })
}

function loadTableHeight(no_of_players) {
    if(no_of_players % 2) {
        no_of_players++;
    }
    const table_height = document.getElementById("table");
    table_height.style.height = (no_of_players / 2) * 80 + 'px';
}


function loadPlayers(name, gifts, img_src) {
    let gift_no_img = buildElement('img', {src: '/gift.png',height: "15px", width: "15px"});
    let gift_no_div = buildElement('div', 0, ['gift-no']);
    gift_no_div.appendChild(gift_no_img);
    let gift_span = document.createElement('span');
    gift_span.innerHTML = '&nbsp; : ' + gifts;
    gift_no_div.appendChild(gift_span);
    let player_init = buildElement('div', 0, ["player-init"]);
    player_init.style.backgroundImage = 'url(' + img_src + ')';
    player_init.style.backgroundSize = 'cover';
    player_init.style.backgroundPosition = 'center';
    // player_init.style.backgroundSize = 'cover';
    // player_init.style.backgoundPosition = 'center';
    player_init.innerHTML = name.split(' ').reduce((response, word) => response += word.slice(0,1),'').toUpperCase();
    let player_div = buildElement('div', 0, ['player-div']);
    player_div.appendChild(player_init);
    player_div.appendChild(gift_no_div);
    e_players_id.appendChild(player_div);
    // console.log(gift_no_img);
    // let gift_no = document.createElement('div');
    // let player_div = document.createElement('div');
    // player_div.classList.add('player-div');
}

function loadPlayersTable (index, roll, dice, status) {
    if ( index % 2 ) {
        
        // Append players in left side of table.
        let player_div = buildElement('div',0,(roll ? ['player', 'active'] : ['player']));

    }else {
        // Append players in right side of table.
    }
}


function buildElement(element, obj_attr, arr_class) {
    let el = document.createElement(element);
    
    if (obj_attr) {
        for ( const [key, value] of Object.entries(obj_attr)) {
            let attr = document.createAttribute(key);
            attr.value = value;
            el.setAttributeNode(attr);
        }
    }

    if (arr_class) {
        arr_class.forEach((e) => {
            el.classList.add(e);
        });
    }
    // console.log(el);
    return el;
}


// End Appends








// EVENTS

// START HEADER SLIDER
const slider = document.querySelector('.players-div');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    // console.log(startX);
})

slider.addEventListener('touchstart', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.changedTouches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    // console.log(startX);
}, false)

slider.addEventListener('mouseup', (e)  => {
    isDown = false;
    slider.classList.remove('active');
})
slider.addEventListener('mouseleave', (e)  => {
    isDown = false;
    slider.classList.remove('active');
})
slider.addEventListener('touchend', (e)  => {
    isDown = false;
    slider.classList.remove('active');
})

slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; // scroll fast
    slider.scrollLeft = scrollLeft - walk;
})
slider.addEventListener('touchmove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.changedTouches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; // scroll fast
    slider.scrollLeft = scrollLeft - walk;
})
// END HEADER SLIDER

// START TABLE SLIDER

// Touch Event
const table_slider = document.querySelector('.mid-div');
let table_touched = false;
let table_startY;
let table_scrollTop;

table_slider.addEventListener('touchstart', (e) => {
    table_touched = true;
    table_startY = e.changedTouches[0].pageY - table_slider.offsetTop;
    table_scrollTop = table_slider.scrollTop;
}, false)

table_slider.addEventListener('touchmove', (e) => {
    if (!table_touched) return;
    e.preventDefault();
    const y = e.changedTouches[0].pageY - table_slider.offsetTop;
    const walk = (y - table_startY) * 3; // scroll fast
    table_slider.scrollTop = table_scrollTop - walk;
})

table_slider.addEventListener('touchend', (e) => {
    table_touched = false;
})
// End Touch Event

// Mouse Event to Drag Scroll
table_slider.addEventListener('mousedown', (e) => {
    table_touched = true;
    table_startY = e.pageY - table_slider.offsetTop;
    table_scrollTop = table_slider.scrollTop;
})
table_slider.addEventListener('mousemove', (e) => {
    if (!table_touched) return;
    e.preventDefault();
    const y = e.pageY - table_slider.offsetTop;
    const walk = (y - table_startY) * 3; //scroll fast
    table_slider.scrollTop = table_scrollTop - walk;
})
table_slider.addEventListener('mouseup', (e) => {
    table_touched = false;
})

window.addEventListener('load', function (){
    init();
})



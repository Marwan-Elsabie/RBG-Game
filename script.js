let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "daggar",
        power: 30
    },
    {
        name: "sowrd",
        power: 100
    },
    {
        name: "claw hammer",
        power: 50
    }
];
const monsters = [
    {
        name: "Slime",
        health: 15,
        level: 2
    },
    {
        name: "Fanged beast",
        health: 60,
        level: 8 
    },
    {
        name: "Dragon",
        health: 300,
        level: 20
    }
];
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        "text": "Welcome to the town square!"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy a weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        "text": "Welcome to the store!"
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Run to the town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        "text": "Welcome to the cave!, you see a slime and a fanged beast"
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "text": "You are fighting a monster!"
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        "text": 'The monster screams "Arg!" and dies!. you gain experience and gold!'
    },
    {
        name: "lose",
        "button text": ["REAPLY?", "REAPLY?", "REAPLY?"],
        "button functions": [restart, restart, restart],
        "text": "You have been defeated!☠️"
    },
    {
        name: "win",
        "button text": ["REAPLY?", "REAPLY?", "REAPLY?"],
        "button functions": [restart, restart, restart],
        "text": "You have defeated the dragon and saved the town!🎉"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square"],
        "button functions": [pickTwo, pickEight, goTown],
        "text": "You found a secret game.Pick a number above.Ten numbers will be randomly chosen between 0 and 10.if the number you choose matches one of the random numbers you win!"
    }
];


button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location["text"];
}
function goTown() {
   update(locations[0]);
   
}
function goStore() {
   
    update(locations[1]);
   
}
function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerText =  gold;
        healthText.innerText = health;
    }
    else{
        
        text.innerText = "You are out of gold can not buy health!";
    }
    
}
function buyWeapon() {  
    if (currentWeapon < weapons.length - 1){
        
        if (gold >= 30){
            gold -= 30;
            currentWeapon ++;
            goldText.innerText =  gold;
            newWeapon = weapons[currentWeapon].name;
            text.innerText = "You bought a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText = " In your inventory you have: " + inventory;
        }else{
            text.innerText = "You are out of gold can not buy a new weapon!";
        }
    }else{
        text.innerText = "You have the best weapon already!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon() {
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText =  gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText = " In your inventory you have: " + inventory;
    }else{
        text.innerText = "You can not sell your last weapon!";
    }
}
function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText =  monsters[fighting].name;
    monsterHealthText.innerText =  monsters[fighting].health;
}
function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks you!";
    text.innerText += " You attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + "!";
    isMonsterHit() ? health -= getMonsterAttackValue(monsters[fighting].level) : text.innerText = "You miss.";
        
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp + 1);
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0){
        lose();
    }else if (monsterHealth <= 0){
         fighting === 2 ? winGame() : defeatMonster();           
    }
    if (Math.random () <= .1 && inventory.length !== 1){
        text.innerText = "Your " + inventory.pop() + " breaks!";
        currentWeapon--;
    }
}
function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}
function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}
function dodge() {
    text.innerText = "You dodge the attack from " + monsters[fighting].name + ".";
    
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText =  xp;
    update(locations[4]);
}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
    
}
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    fighting = 0;
    monsterHealth = 0;
    inventory = ["stick"];
    xpText.innerText =  xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    
    update(locations[0]);
    text.innerText = "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.";
}
function easterEgg(){
    update(locations[7]);
}
function pickTwo() {
    pick(2);
}
function pickEight() {
    pick(8);
}
function pick(guess) {
    let numbers = [];
    while (numbers.length < 10){
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". The numbers are:\n " + numbers;
    for (let i = 0; i < numbers.length; i++){
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.indexOf(guess) !== -1){
        text.innerText += "You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    }else{
        text.innerText += "Wrong! You lose 10 health!!";
        health -= 10;
        healthText.innerText = health;

    }if (health <= 0){
        lose();
    }
}
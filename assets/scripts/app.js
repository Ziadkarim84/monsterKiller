const PLAYER_ATTACK_DAMAGE = 10;
const PLAYER_STRONG_ATTACK_DAMAGE = 15;
const MONSTER_ATTACK_DAMAGE = 15;
const HEAL_VALUE = 8;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG ATTACK";
const LOG_ENTRY_PLAYER_ATTACK = "Player attack";
const LOG_ENTRY_PLAYER_STRONG_ATTACK = "Player strong attack";
const LOG_ENTRY_MONSTER_ATTACK = "Monster Attack";
const LOG_ENTRY_HEAL = "Player Heal"
const LOG_ENTRY_GAME_OVER = "Game Over";



let maxHealth;
function getUserinput(){
    const userInput = prompt("Enter the maximum health for you and the monster" , "100");
    let convertedInput = parseInt(userInput);
    if(isNaN(convertedInput) || convertedInput <=0){
        throw{message: 'input can only be an integer'};
    }

    return convertedInput;
}

try{
    maxHealth = getUserinput();
} catch(error){
    console.log(error);
    maxHealth = 100;
    alert('default value set to 100');
}

let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;
let hasBonusLife = true;
let logEntry = [];

adjustHealthBars(maxHealth);

function writeToLog(type, value, playerHealth, monsterHealth){
    let log = {
        type: type,
        value: value,
        player_health: playerHealth,
        monster_health: monsterHealth
    };

    logEntry.push(log);
}

function reset(){
    currentMonsterHealth = maxHealth;
    currentPlayerHealth = maxHealth;
    resetGame(maxHealth);
}

function endRound(){
    let initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_DAMAGE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_ENTRY_MONSTER_ATTACK, playerDamage, currentPlayerHealth, currentMonsterHealth);

    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        setPlayerHealth(initialPlayerHealth);
        currentPlayerHealth = initialPlayerHealth;
        alert("new life!!");
    }
    if(currentMonsterHealth <=0 && currentPlayerHealth <=0){
        alert("DRAW!");
        writeToLog(LOG_ENTRY_GAME_OVER, "DRAW", 0, 0);
    } else if(currentPlayerHealth <= 0){
        alert("YOU LOSE!");
        writeToLog(LOG_ENTRY_GAME_OVER, "MONSTER WINS", 0, currentMonsterHealth);
    } else if(currentMonsterHealth <= 0){
        alert("YOU WIN!");
        writeToLog(LOG_ENTRY_GAME_OVER, "YOU WIN", currentPlayerHealth, 0);
    }

    if(currentMonsterHealth <= 0 || currentPlayerHealth <=0 ){
        reset();
    }
}

function attackMonster(attackType){
    let maxDamage;
    let attackTypeForLog;
    if(attackType == MODE_ATTACK){
        maxDamage = PLAYER_ATTACK_DAMAGE;
        attackTypeForLog = LOG_ENTRY_PLAYER_ATTACK;
    } else if(attackType == MODE_STRONG_ATTACK){
        maxDamage = PLAYER_STRONG_ATTACK_DAMAGE;
        attackTypeForLog = LOG_ENTRY_PLAYER_STRONG_ATTACK;
    }

    const monsterDamage = dealMonsterDamage(maxDamage); 
    currentMonsterHealth -= monsterDamage;
    writeToLog(attackTypeForLog, monsterDamage, currentPlayerHealth,currentMonsterHealth);
    endRound();
}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function healHandler(){
    let healValue = HEAL_VALUE;

    if(currentPlayerHealth + healValue >= maxHealth){
        healValue = maxHealth - currentPlayerHealth;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_ENTRY_HEAL, healValue, currentPlayerHealth,currentMonsterHealth);
    endRound();
}

function printLog(){
    let i = 1;
    //console.log(logEntry);
    for(const log of logEntry){
        console.log(`#${i++}`);
        for(const key in log){
            console.log(`${key} => ${log[key]}`);
        }
    }
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click' , printLog)

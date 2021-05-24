const PLAYER_ATTACK_DAMAGE = 10;
const PLAYER_STRONG_ATTACK_DAMAGE = 15;
const MONSTER_ATTACK_DAMAGE = 15;
const HEAL_VALUE = 8;

const userInput = prompt("Enter the maximum health for you and the monster" , "100")
let maxHealth = parseInt(userInput);
if(isNaN(maxHealth) || maxHealth <=0){
    maxHealth = 100;
    alert("Wrong input type. set default value as 100");
}

let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;
let hasBonusLife = true;

adjustHealthBars(maxHealth);

function reset(){
    currentMonsterHealth = maxHealth;
    currentPlayerHealth = maxHealth;
    resetGame(maxHealth);
}

function endRound(){
    let initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_DAMAGE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        setPlayerHealth(initialPlayerHealth);
        currentPlayerHealth = initialPlayerHealth;
        alert("new life!!");
    }
    if(currentMonsterHealth <=0 && currentPlayerHealth <=0){
        alert("DRAW!");
    } else if(currentPlayerHealth <= 0){
        alert("YOU LOSE!");
    } else if(currentMonsterHealth <= 0){
        alert("YOU WIN!");
    }

    if(currentMonsterHealth <= 0 || currentPlayerHealth <=0 ){
        reset();
    }
}

function attackMonster(attackType){
    let maxDamage;
    if(attackType == "ATTACK"){
        maxDamage = PLAYER_ATTACK_DAMAGE;
    } else if(attackType == "STRONG ATTACK"){
        maxDamage = PLAYER_STRONG_ATTACK_DAMAGE;
    }

    const monsterDamage = dealMonsterDamage(maxDamage); 
    currentMonsterHealth -= monsterDamage;
    endRound();
}

function attackHandler(){
    attackMonster("ATTACK");
}

function strongAttackHandler(){
    attackMonster("STRONG ATTACK");
}

function healHandler(){
    let healValue = HEAL_VALUE;

    if(currentPlayerHealth + healValue >= maxHealth){
        healValue = maxHealth - currentPlayerHealth;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click', healHandler);

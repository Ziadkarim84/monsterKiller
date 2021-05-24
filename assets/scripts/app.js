const PLAYER_ATTACK_DAMAGE = 10;
const PLAYER_STRONG_ATTACK_DAMAGE = 15;
const MONSTER_ATTACK_DAMAGE = 15;
const HEAL_VALUE = 8;
let maxHealth = 100;
let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;

adjustHealthBars(maxHealth);

function endRound(){
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_DAMAGE);
    currentPlayerHealth -= playerDamage;
    if(currentMonsterHealth <=0 && currentPlayerHealth <=0){
        alert("DRAW!");
    } else if(currentPlayerHealth <= 0){
        alert("YOU LOSE!");
    } else if(currentMonsterHealth <= 0){
        alert("YOU WIN!");
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

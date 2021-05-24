const PLAYER_ATTACK_DAMAGE = 10;
const PLAYER_STRONG_ATTACK_DAMAGE = 15;
const MONSTER_ATTACK_DAMAGE = 15;
let maxHealth = 100;
let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;

adjustHealthBars(maxHealth);

function attackMonster(attackType){
    let maxDamage;
    if(attackType == "ATTACK"){
        maxDamage = PLAYER_ATTACK_DAMAGE;
    } else if(attackType == "STRONG ATTACK"){
        maxDamage = PLAYER_STRONG_ATTACK_DAMAGE;
    }

    const monsterDamage = dealMonsterDamage(maxDamage); 
    currentMonsterHealth -= monsterDamage;
    const playerDamage = dealPlayerDamage(maxDamage);
    currentPlayerHealth -= playerDamage;
    if(currentMonsterHealth <=0 && currentPlayerHealth <=0){
        alert("DRAW!");
    } else if(currentPlayerHealth <= 0){
        alert("YOU LOSE!");
    } else if(currentMonsterHealth <= 0){
        alert("YOU WIN!");
    }
}

function attackHandler(){
    attackMonster("ATTACK");
}

function strongAttackHandler(){
    attackMonster("STRONG ATTACK");
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);

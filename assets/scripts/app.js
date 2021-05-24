const PLAYER_ATTACK_DAMAGE = 10;
const PLAYER_STRONG_ATTACK_DAMAGE = 15;
const MONSTER_ATTACK_DAMAGE = 15;
let maxHealth = 100;
let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;

adjustHealthBars(maxHealth);

function attackHandler(){
    const monsterDamage = dealMonsterDamage(PLAYER_ATTACK_DAMAGE); 
    currentMonsterHealth -= monsterDamage;
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

function strongAttackHandler(){
    const monsterDamage = dealMonsterDamage(PLAYER_STRONG_ATTACK_DAMAGE); 
    currentMonsterHealth -= monsterDamage;
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

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);

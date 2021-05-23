const MAX_PLAYER_DAMAGE_VALUE = 10;
const MAX_MONSTER_DAMAGE_VALUE = 15;
let maxHealth = 100;
let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;

adjustHealthBars(maxHealth);

function attackHandler(){
    const monsterDamage = dealMonsterDamage(MAX_PLAYER_DAMAGE_VALUE); 
    currentMonsterHealth -= monsterDamage;
    const playerDamage = dealPlayerDamage(MAX_MONSTER_DAMAGE_VALUE);
    currentPlayerHealth -= playerDamage;
}

function strongAttackHandler(){
    
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
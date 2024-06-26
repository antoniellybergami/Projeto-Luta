//dos personagens: vou ter guerreiro nou mago e monstrinho e monstrão
class Personagem {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    
    get life(){
        return this._life;
    }

    //a vida n pode ficar menor que zero pq zero é morto
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife; 
    }
}

class Guerreiro extends Personagem {
    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }

}
class Mago extends Personagem {
    constructor(name){
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class Monstrinho extends Personagem {
    constructor(){
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class Monstrão extends Personagem {
    constructor(){
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

//cuida do cenário
class Cenario {
    constructor(figther1, figther2, figther1El, figther2El, logObject){
        this.figther1 = figther1;
        this.figther2 = figther2;
        this.figther1El = figther1El;
        this.figther2El = figther2El;
        this.log = logObject;
    }
    
    //exibir na tela e startar no jogo
    start() {
        this.update();
        
        //evento no botão de atacar
        this.figther1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.figther1, this.figther2));
        this.figther2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.figther2, this.figther1));
    }

    //atualiza a tela com as informações dos dois lutadores
    update(){
        //Figther 1
        this.figther1El.querySelector('.name').innerHTML = `${this.figther1.name} - ${this.figther1.life.toFixed(1)} HP` ;     //procura a classe name para por dentro do elemento
        //barra de vida:
        let f1Pct= (this.figther1.life/this.figther1.maxLife) * 100; //pega a porcentagem de vida com base na vida máxima
        //preenche a largura na barrinha do html:
        this.figther1El.querySelector('.bar').style.width = `${f1Pct}%`;
        
        //Figther 2
        this.figther2El.querySelector('.name').innerHTML = `${this.figther2.name} - ${this.figther2.life.toFixed(1)} HP`;
        //barra de vida:
        let f2Pct= (this.figther2.life/this.figther2.maxLife) * 100; 
        this.figther2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    //faça um ataque
    doAttack(attacking, attacked){
        //quem tá atacando, tá vivo?
        if(attacking.life <= 0 || attacked.life < 0){
            this.log.addMessage("já tá morto");
            return;
        }

        //ataque
        let attackFactor = (Math.random() * 2).toFixed(2);
        let actualAttack = attacking.attack * attackFactor;

        //defesa
        let defenseFactor = (Math.random() * 2).toFixed(2);
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense) { //vai ter dano
            attacked.life -= (actualAttack - actualDefense);
            this.log.addMessage(`${attacking.name} causou ${actualAttack} da dano em ${attacked.name}`);
        } else { //conseguiu se defender
            this.log.addMessage(`${attacked.name} conseguiu se defender`);
        }

        this.update();
    }
}

class Log {
    list = []

    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}   n
//dos personagens: vou ter guerreiro nou mago e monstrinho e monstrão
class Personagem {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    //a vida n pode ficar menor que zero pq zero é morto
    get life(){
        return this._life;
    }

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
    constructor(figther1, figther2, figther1El, figther2El){
        this.figther1 = figther1;
        this.figther2 = figther2;
        this.figther1El = figther1El;
        this.figther2El = figther2El;
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
        this.figther1El.querySelector('.name').innerHTML = `${this.figther1.name} - ${this.figther1.life} HP` ;     //procura a classe name para por dentro do elemento
        //barra de vida:
        let f1Pct= (this.figther1.life/this.figther1.maxLife) * 100; //pega a porcentagem de vida com base na vida máxima
        //preenche a largura na barrinha do html:
        this.figther1El.querySelector('.bar').style.width = `${f1Pct}%`;
        
        //Figther 2
        this.figther2El.querySelector('.name').innerHTML = `${this.figther2.name} - ${this.figther2.life} HP`;
        //barra de vida:
        let f2Pct= (this.figther2.life/this.figther2.maxLife) * 100; 
        this.figther2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    //faça um ataque
    doAttack(attracking, attacked){
        console.log(`${attracking.name} está atacando ${attacked.name}`);
    }
}
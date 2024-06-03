let guerreiro = new Guerreiro('brabo');
let monster = new Monstrinho();

const stage = new Cenario(
    guerreiro,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
);

stage.start();
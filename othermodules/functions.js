module.exports ={
    chanceCalc: function (chance) {
        let randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber < chance) {
            return 1;
        } else {
            return 0;
        }
    }
}
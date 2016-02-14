var Setting = require('./setting');


function Game () {
    this.setting = new Setting();
}


Game.prototype.onJoin = function (io, user) {

    if (this.setting.addUser(user)) {

        io.emit('joined', user);
    }

    if (this.setting.ready()) {

        io.emit('turn', this.setting.deductShift());
    }

};

Game.prototype.onPlayed = function (io, socket, move) {
    socket.emit('none');
    var shift = this.setting.deductShift();
    console.log(shift);

    io.emit('turn', shift);
};

module.exports = Game;

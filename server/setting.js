/**
 * Created by abraham on 13/02/16.
 */
function Setting() {
    this.users = [];
    this.shift = undefined;
}

Setting.prototype.deductShift = function () {
    if (this.shift !== 0) {
        this.shift = 0;
    } else {
        this.shift = 1;
    }

    return this.users[this.shift];
};

Setting.prototype.addUser = function (user) {
    if (this.users.length < 2) {
        this.users.push(user);
        console.log(this.users);
        return true;
    }
    return false;
};

Setting.prototype.ready = function () {
    return this.users.length === 2;
};

module.exports = Setting;
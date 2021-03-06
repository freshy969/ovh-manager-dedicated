"use strict";
angular.module("UserAccount.controllers").controller("UserAccountUsersAddCtrl", class UserAccountUsersAddCtrl {

    constructor ($scope, User, UseraccountUsersService, Alerter, $translate) {
        this.$scope = $scope;
        this.userService = User;
        this.usersService = UseraccountUsersService;
        this.alerter = Alerter;
        this.$translate = $translate;
        this.me = null;
        this.user = {
            group: "DEFAULT"
        };
        this.loader = false;
        this.PASSWORD_MIN_LENGTH = 8;
        this.DESCRIPTION_MAX_LENGTH = 255;
    }

    $onInit () {
        this.userService.getUser().then((data) => {
            this.me = data;
        });
        this.$scope.addUser = this.addUser.bind(this);
    }

    addUser () {
        this.loader = true;

        this.usersService.addUser(this.user)
            .then(() => {
                this.alerter.success(this.$translate.instant("user_users_add_success_message", { login: this.user.login }), "userUsers");
            })
            .catch((err) => {
                this.alerter.error(`${this.$translate.instant("user_users_add_error_message")} ${_.get(err, "message", err)}`, "userUsers");
            })
            .finally(() => {
                this.loader = false;
                this.$scope.resetAction();
            });
    }

});

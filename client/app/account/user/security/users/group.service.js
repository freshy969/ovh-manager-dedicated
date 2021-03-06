"use strict";
angular.module("UserAccount.services").service("UseraccountGroupsService", class UseraccountGroupsService {

    constructor (OvhHttp) {
        this.ovhHttp = OvhHttp;
    }

    getGroups () {
        return this.ovhHttp.get("/me/identity/group", {
            rootPath: "apiv6"
        });
    }

    getGroup (group) {
        return this.ovhHttp.get("/me/identity/group/{group}", {
            rootPath: "apiv6",
            urlParams: {
                group
            }
        });
    }

});

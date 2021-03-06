angular.module("UserAccount.services").service("UserAccount.services.ipRestrictions", [
    "$http",
    "$q",
    function ($http, $q) {
        "use strict";

        function getSuccessDataOrReject (response) {
            return response.status < 300 ? response.data : $q.reject(response.data);
        }

        this.getList = function () {
            return $http
                .get("/sws/me-access-restriction-ip", {
                    serviceType: "aapi"
                })
                .then(getSuccessDataOrReject);
        };

        this.updateRestriction = function (restriction) {
            return $http
                .put(
                    ["/me/accessRestriction/ip", restriction.id].join("/"),
                    {
                        rule: restriction.rule.toLowerCase(),
                        warning: restriction.warning
                    },
                    {
                        serviceType: "apiv6"
                    }
                )
                .then((data) => data.data, (http) => $q.reject(http.data));
        };

        this.deleteRestriction = function (restriction) {
            return $http
                .delete(["/me/accessRestriction/ip", restriction.id].join("/"), {
                    serviceType: "apiv6"
                })
                .then((data) => data.data, (http) => $q.reject(http.data));
        };

        this.addRestriction = function (restriction) {
            return $http
                .post(
                    "/me/accessRestriction/ip",
                    {
                        ip: restriction.ip,
                        rule: restriction.rule.toLowerCase(),
                        warning: restriction.warning
                    },
                    {
                        serviceType: "apiv6"
                    }
                )
                .then((data) => data.data, (http) => $q.reject(http.data));
        };

        this.getDefaultRule = function () {
            return $http
                .get("/me/accessRestriction/ipDefaultRule", {
                    serviceType: "apiv6"
                })
                .then(getSuccessDataOrReject);
        };

        this.updateDefaultRule = function (opts) {
            return $http.put(
                "/me/accessRestriction/ipDefaultRule",
                {
                    rule: opts.rule.toLowerCase(),
                    warning: opts.warning
                },
                {
                    serviceType: "apiv6"
                }
            );
        };
    }
]);

angular.module("Billing.directives").directive("billingSortingFieldButton", [
    function () {
        "use strict";
        return {
            restrict: "A",
            scope: {
                label: "@",
                associatedField: "@",
                activeField: "=",
                reverseOrder: "=",
                onChange: "=?"
            },
            bindToController: true,
            controllerAs: "$ctrl",
            controller: "Billing.directives.billingSortingFieldButtonCtrl",
            replace: false,
            template:
            `<button type="button"
                     class="btn btn-link"
                     data-ng-click="$ctrl.onClick()">
                <span data-ng-bind="$ctrl.label"></span>
                <i class="fa fa-chevron-down"
                   data-ng-if="$ctrl.isActive() && $ctrl.isAscending()"
                   aria-label="{{:: 'common_order_ascending' | translate }}"
                   aria-hidden="true">
                </i>
                <i class="fa fa-chevron-up"
                   data-ng-if="$ctrl.isActive() && $ctrl.isDescending()"
                   aria-label="{{:: 'common_order_descending' | translate }}"
                   aria-hidden="true">
                </i>
            </button>`
        };
    }
]);

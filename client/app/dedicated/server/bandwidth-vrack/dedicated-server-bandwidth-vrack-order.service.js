class BaseDedicatedService {
    constructor ($q) {
        this.$q = $q;
    }

    acceptResponse (data, message) {
        return this.$q.resolve({
            status: "OK",
            data,
            message
        });
    }

    rejectResponse (data, message) {
        return this.$q.reject({
            status: "ERROR",
            data,
            message
        });
    }
}

class BandwidthVrackOrderService extends BaseDedicatedService {
    constructor ($q, translator, Server) {
        super($q);
        this.translator = translator;
        this.Server = Server;
    }

    getOrderableBandwidths (productId) {
        return this.Server.getOrderables(productId, "bandwidthvRack")
            .then((response) => super.acceptResponse(this.transformOrderableBandwidths(response.vrack)))
            .catch((response) => super.rejectResponse(response.data, this.translator.tr("server_order_bandwidth_vrack_loading_error")));
    }

    getOrderableBandwidthDurations (productId, bandwidth) {
        return this.Server.getOrderableDurations(productId, {
            optionName: "bandwidthvRack",
            params: {
                bandwidth
            }
        })
            .then((response) => super.acceptResponse(response))
            .catch((response) => super.rejectResponse(response.data, this.translator.tr("server_order_bandwidth_vrack_loading_error")));
    }

    orderBandWidth (productId, bandwidth, duration) {
        return this.Server.postOptionOrder(productId, {
            optionName: "bandwidthvRack",
            duration,
            params: {
                bandwidth
            }
        })
            .then((response) => super.acceptResponse(response))
            .catch((response) => super.rejectResponse(response.data, this.translator.tr("server_order_bandwidth_vrack_error")));
    }

    cancelBandwidthOption (productId) {
        return this.Server.cancelOption(productId, "BANDWIDTH_VRACK")
            .then((response) => super.acceptResponse(response, this.translator.tr("server_cancel_bandwidth_vrack_cancel_success")))
            .catch((response) => super.rejectResponse(response.data, this.translator.tr("server_cancel_bandwidth_cancel_vrack_error")));
    }

    transformOrderableBandwidths (bandwidths) {
        return _.map(bandwidths, (bandwidth) => ({
            value: bandwidth,
            unit: "mbps",
            text: this.translator.tr("unit_gbps", [Math.floor(bandwidth / 1000)])
        }));
    }
}

angular.module("services").service("BandwidthVrackOrderService", BandwidthVrackOrderService);
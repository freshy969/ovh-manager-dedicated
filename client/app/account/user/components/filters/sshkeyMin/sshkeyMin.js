angular.module("UserAccount.filters").filter("sshkeyMin", [
    "sshkey-regex",
    function (SSHKEY_REGEX) {
        "use strict";

        let splitted;
        let minLength;
        let innerkeyLength;
        let subLength;
        const toLength = 50;
        const dots = "...";
        let type = false;
        let i;

        return function (keyParam) {
            let key = keyParam;

            key = key.trim().replace(/\n/, "");
            type = false;

            for (i = SSHKEY_REGEX.length; i--;) {
                if (SSHKEY_REGEX[i].regex.test(key)) {
                    type = SSHKEY_REGEX[i];
                    splitted = key.match(SSHKEY_REGEX[i].regex);
                    break;
                }
            }

            if (type && type.name === "RSA1" && splitted.length === 5) {
                // special rule...

                minLength = splitted[1].length + splitted[2].length + splitted[4].length + 3; // '3' = 3 spaces

                if (minLength < toLength - dots.length - 2) {
                    //  ('2' = min 2 chars each side of dots)
                    innerkeyLength = splitted[3].length;
                    subLength = (toLength - minLength - dots.length) / 2;
                    return `${splitted[1]} ${splitted[2]} ${splitted[3].substr(0, subLength)}${dots}${splitted[3].substr(innerkeyLength - subLength, innerkeyLength)} ${splitted[4]}`;
                }
            } else if (type && splitted.length === 4) {
                minLength = splitted[1].length + splitted[3].length + 2; // '2' = 2 spaces

                if (minLength < toLength - dots.length - 2) {
                    //  ('2' = min 2 chars each side of dots)
                    innerkeyLength = splitted[2].length;
                    subLength = (toLength - minLength - dots.length) / 2;
                    return `${splitted[1]} ${splitted[2].substr(0, subLength)}${dots}${splitted[2].substr(innerkeyLength - subLength, innerkeyLength)} ${splitted[3]}`;
                }
            }

            // else...Split /2
            /* eslint-disable no-mixed-operators */
            return key.substr(0, toLength / 2 - dots.length) + dots + key.substr(key.length - toLength / 2 + dots.length, key.length);
        };
    }
]);

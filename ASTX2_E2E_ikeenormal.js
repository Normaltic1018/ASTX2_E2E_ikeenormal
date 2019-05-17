/* ASTX2_E2E_ikeenormal */
// Made By ikeeby and normaltic
// /common/js/astx2.min.js
// normaltic blog : normaltic.com
// ikeeby blog : ikeeby.com

var $ASTX2_CONST = {
    ERROR_SUCCESS: 0,
    ERROR_FAILED: 101,
    ERROR_NOINIT: 102,
    ERROR_NOTINST: 103,
    ERROR_NOTSUPPORTED: 104,
    ERROR_NOCONNECT: 105,
    ERROR_NCK: 106,
    ERROR_ERR: 107,
    ERROR_NSP: 108,
    ERROR_PARAM: 109,
    ERROR_EXCESS: 110,
    ERROR_NEEDUPDATE: 111,
    OPTION_NONE2E: 1,
    OPTION_AUTOFOCUS: 2,
    OPTION_AUTOSETTEXT: 4,
    OPTION_E2EFORM: 8,
    OPTION_E2EFORM_NOENC: 16,
    OPTION_E2EFORM_ALLTRIP: 32,
    OPTION_E2EFORM_ONLY: 64,
    OPTION_E2EFORM_TAGSET: 128,
    OPTION_NONE2E_ALG: 256,
    OPTION_NOSPTDUMMY: 512,
    OPTION_FIXEDTYPE: 1024,
    PROTECT_AK: 1,
    PROTECT_FW: 2,
    SERVICE_AK: 1,
    DEBUG_NOALIVE: 1,
    LOCAL_INIT_HTTP: 1,
    INTERVAL_ALIVE: 5E3,
    E2ETYPE_EXCLUDE: -1,
    E2ETYPE_NONE: 0,
    E2ETYPE_CERT1: 1,
    E2ETYPE_CERT2: 2,
    E2ETYPE_SDK: 11,
    E2ETYPE_PLAIN1: 21,
    E2ETYPE_PLAIN2: 22,
    PAGEID: "",
    BROWSER_TYPE: "",
    BROWSER_VER: "",
    E2EFORM_TAIL: !0,
    E2EFORM_INIT: "_e2e_forminit",
    E2EFORM_TAG1: "_e2e_1__",
    E2EFORM_TAG2: "_e2e_2__",
    E2EFORM_TAG1_PWD: "_e2e_1_pwd__",
    E2EFORM_TAG2_PWD: "_e2e_2_pwd__",
    getErrno: function(a) {
        return "NCK" == a ? this.ERROR_NCK : "ERR" == a ? this.ERROR_ERR : "NSP" == a ? this.ERROR_NSP : this.ERROR_FAILED
    },
    _get_browser_version: function(a) {
        var b =
            0;
        if (0 <= a.indexOf("Edge/") && (b = parseInt(a.split("Edge/")[1]), 0 < b)) return "EG" + b;
        if (0 <= a.indexOf("MSIE")) {
            if (b = parseInt(a.split("MSIE")[1]), 0 < b) return "IE" + b
        } else if (0 <= a.indexOf("Trident") && (0 <= a.indexOf("rv:") ? b = parseInt(a.split("rv:")[1]) : 0 <= a.indexOf("IE") && (b = parseInt(a.split("IE")[1])), 0 < b)) return "IE" + b;
        return 0 <= a.indexOf("OPR/") && (b = parseInt(a.split("OPR/")[1]), 0 < b) ? "OP" + b : 0 <= a.indexOf("Firefox/") && (b = parseInt(a.split("Firefox/")[1]), 0 < b) ? "FF" + b : 0 <= a.indexOf("Chrome/") && (b = parseInt(a.split("Chrome/")[1]),
            0 < b) ? "CR" + b : 0 <= a.indexOf("AppleWebKit") && 0 <= a.indexOf("Version/") && (b = parseInt(a.split("Version/")[1]), 0 < b) ? "SF" + b : "OT0"
    },
    init: function() {
        this.PAGEID = (new Date).getTime();
        this.PAGEID -= Math.floor(100 * Math.random());
        this.BROWSER_VER = this._get_browser_version(navigator.userAgent);
        this.BROWSER_TYPE = this.BROWSER_VER.substring(0, 2)
    }
};
$ASTX2_CONST.init();
var $ASTX2_COMM = {
        mLocalServerURL: "",
        mErrorAbortFlag: !1,
        mDegugFlags: 0,
        setDegugFlags: function(a) {
            this.mDegugFlags |= a
        },
        getDegugFlags: function() {
            return this.mDegugFlags
        },
        isEnable: function() {
            return 0 < this.mLocalServerURL.length ? !0 : !1
        },
        uninit: function() {
            this.mLocalServerURL = ""
        },
        setLocalFlags: function(a, b, c) {
            null == c && (c = 3650);
            $_astxu.setCookie("astx2_" + a, b, c, "/")
        },
        getLocalFlags: function(a) {
            a = $_astxu.getCookie("astx2_" + a);
            return parseInt(a) || 0
        },
        errorAbort: function(a) {
            1 != this.mErrorAbortFlag && (this.mErrorAbortFlag = !0, $ASTX2_CUST.errorAbort(a))
        }
    },
    $_astxu = {
        mJsonpSequence: 0,
        jsonQstr: function(a) {
            var b = [],
                c;
            for (c in a) a.hasOwnProperty(c) && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            return b.join("&")
        },
        jsonParse: function(a) {
            return "object" == typeof window.JSON && "function" == typeof window.JSON.parse ? window.JSON.parse(a) : "function" == typeof jQuery && "function" == typeof jQuery.parseJSON ? jQuery.parseJSON(a) : eval("(" + a + ")")
        },
        _send_jsonp_ajax: function(a) {
            try {
                jQuery.ajax({
                    url: a.src,
                    timeout: a.timeout,
                    cache: !1,
                    crossDomain: !0,
                    dataType: "jsonp",
                    contentType: "application/javascript",
                    success: function(b, d, e) {
                        a.onSuccess(b)
                    },
                    error: function(b, d, e) {
                        a.onFailure()
                    },
                    complete: function(a, b) {}
                })
            } catch (b) {
                a.onFailure()
            }
        },
        _send_jsonp_dom: function(a) {
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.id = a.callback;
            b.async = a.async;
            b.src = a.src;
            var c = document.getElementsByTagName("body")[0];
            if (null == c && (c = document.getElementsByTagName("head")[0], null == c)) return;
            var d = window.setTimeout(function() {
                window[a.callback] = function() {};
                try {
                    var b = document.getElementById(a.callback);
                    b && c.removeChild(b)
                } catch (d) {}
                a.onFailure()
            }, a.timeout);
            window[a.callback] = function(b) {
                window.clearTimeout(d);
                try {
                    var f = document.getElementById(a.callback);
                    f && c.removeChild(f)
                } catch (g) {}
                a.onSuccess(b)
            };
            c.appendChild(b)
        },
        sendJsonp: function(a) {
            null == a.data && (a.data = {});
            null == a.callback && (a.callback = "jsonpCallback" + $_astxu.rnd());
            null == a.timeout && (a.timeout = 5E3);
            null == a.async && (a.async = !0);
            null == a.seq && (a.seq = !1);
            null == a.onSuccess && (a.onSuccess = function(a) {});
            null == a.onFailure && (a.onFailure = function() {});
            a.src = 1 == $ASTX2.mUseJQuery ? a.url + "?v=3" : a.url + "?v=2&callback=" + a.callback;
            if (1 == a.seq) {
                var b = ++this.mJsonpSequence;
                a.src += "&seq=" + b;
                2147483647 <= this.mJsonpSequence && (this.mJsonpSequence = 0)
            }
            b = this.jsonQstr(a.data);
            0 < b.length && (a.src += "&" + b);
            1 == $ASTX2.mUseJQuery ? this._send_jsonp_ajax(a) : this._send_jsonp_dom(a)
        },
        _get_xhr_object: function() {
            if ("undefined" !== typeof XMLHttpRequest) try {
                return new XMLHttpRequest
            } catch (a) {}
            try {
                return new ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {}
            return null
        },
        sendAjax: function(a) {
            var b = this._get_xhr_object();
            if (null == b) $_astxu.msg("[sendAjax] _get_xhr_object failed");
            else {
                null == a.data && (a.data = {});
                null == a.type && (a.type = "POST");
                null == a.async && (a.async = !0);
                null == a.onSuccess && (a.onSuccess = function(a) {});
                null == a.onFailure && (a.onFailure = function(a, b) {});
                b.open(a.type, a.url + "?rnd=" + this.rnd(), a.async);
                b.onreadystatechange = function() {
                    if (4 == b.readyState)
                        if (200 == b.status) {
                            var c = $_astxu.jsonParse(b.responseText);
                            a.onSuccess(c)
                        } else a.onFailure("state4", b.status)
                };
                var c = this.jsonQstr(a.data);
                b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                b.send(c)
            }
        },
        isACK: function(a) {
            return a && "ACK" == a ? !0 : !1
        },
        isWinOS: function() {
            return -1 != navigator.platform.indexOf("Win32") || -1 != navigator.platform.indexOf("Win64") ? !0 : !1
        },
        isMacOS: function() {
            return -1 != navigator.platform.indexOf("Mac") ? !0 : !1
        },
        isLinuxOS: function() {
            return -1 != navigator.platform.indexOf("Linux") ? !0 : !1
        },
        isMacLinuxOS: function() {
            return 1 == this.isMacOS() || 1 == this.isLinuxOS() ? !0 : !1
        },
        hasFocused: function() {
            var a = !1;
            try {
                a = document.hasFocus()
            } catch (b) {}
            return a
        },
        addEvent: function(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent("on" + b, c)
        },
        removeEvent: function(a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c) : a.detachEvent("on" + b, c)
        },
        getCreatedFormValue: function(a, b, c) {
            null == c && (c = !1);
            c = 1 == c ? document.getElementsByTagName("input") : a.getElementsByTagName("input");
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                if (e && this.getnc(e.name) == b) return e
            }
            c = document.createElement("input");
            c.name = b;
            c.type =
                "hidden";
            if ("function" === typeof $ASTX2_CUST.onCreatedFormValue) $ASTX2_CUST.onCreatedFormValue(c, b);
            a.appendChild(c);
            return c
        },
        getHostPath: function() {
            var a = window.location.protocol + "//" + window.location.hostname;
            return a += window.location.port ? ":" + window.location.port : ""
        },
        getnc: function(a, b) {
            null == b && (b = "");
            return null == a ? b : a
        },
        getint: function(a, b) {
            null == b && (b = 0);
            return parseInt(a) || b
        },
        rnd: function() {
            var a = (new Date).getTime();
            return a += new String(Math.floor(100 * Math.random()))
        },
        getKeyCode: function(a) {
            var b =
                null;
            a && (b = a.keyCode ? a.keyCode : a.which);
            return b
        },
        xorEncode: function(a, b) {
            for (var c = "", d = new String(a), e = 0; e < d.length; e++) c += String.fromCharCode(b ^ d.charCodeAt(e));
            return c
        },
        xorDecode: function(a, b) {
            for (var c = "", d = new String(a), e = 0; e < d.length; e++) c += String.fromCharCode(b ^ d.charCodeAt(e));
            return c
        },
        ltrim: function(a, b) {
            for (b = this.getnc(b, " "); a.substring(0, 1) == b;) a = a.substring(1, a.length);
            return a
        },
        rtrim: function(a, b) {
            for (b = this.getnc(b, " "); a.substring(a.length - 1, a.length) == b;) a = a.substring(0, a.length -
                1);
            return a
        },
        alltrim: function(a, b) {
            return this.ltrim(this.rtrim(a, b), b)
        },
        set_cookie: function(a, b, c, d, e, f) {
            var g = new Date;
            g.setTime(g.getTime());
            g = new Date(g.getTime() + c);
            a = a + "=" + escape(b) + (c ? ";expires=" + g.toGMTString() : "") + (d ? ";path=" + d : "") + (e ? ";domain=" + e : "") + (f ? ";secure" : "");
            document.cookie = a
        },
        setCookie: function(a, b, c, d, e, f) {
            var g = null;
            c && (g = 864E5 * c);
            this.set_cookie(a, b, g, d, e, f)
        },
        getCookie: function(a) {
            try {
                if (null == document.cookie || "" == document.cookie) return "";
                for (var b = document.cookie.split(";"),
                        c = 0; c < b.length; c++) {
                    var d = this.alltrim(this.getnc(b[c])),
                        e = this.alltrim(this.getnc(d.split("=")[0]));
                    if (a == e) return this.alltrim(this.getnc(d.split("=")[1]))
                }
            } catch (f) {}
            return ""
        },
        setInputFocus: function() {
            try {
                for (var a = document.getElementsByTagName("input"), b = 0; b < a.length; b++) {
                    var c = a[b];
                    if (c && "hidden" != c.type) {
                        c.focus();
                        break
                    }
                }
            } catch (d) {}
        },
        log: function(a) {
            "object" === typeof debuger && "function" === typeof debuger.write ? debuger.write(a) : "object" === typeof window.console && "function" === typeof console.log &&
                console.log(a)
        },
        msg: function(a) {
            this.log(a)
        }
    },
    $ASTX2_E2E = function() {
        var a = null,
            b = function(a) {
                function b(a) {
                    var c = a.target;
                    null == c && (c = a.srcElement);
                    return c
                }

                function e(a) {
                    if (null == a) return null;
                    var b = a.getAttribute("e2e_inputid");
                    if (null == b || 0 >= b) return null;
                    var c = a.getAttribute("e2e_type");
                    if (null == c || 0 >= c) return null;
                    var d = a.getAttribute("e2e_inputtype");
                    if (null == d || 0 >= d) d = "";
                    var e = {};
                    e.e2e_inputid = b;
                    e.e2e_type = c;
                    e.e2e_inputtype = d;
                    e.name = $_astxu.getnc(a.name);
                    e.form = a.form ? $_astxu.getnc(a.form.name) :
                        "";
                    return e
                }

                function f(a) {
                    var b = e(a);
                    if (null == b) return null;
                    b.type = $_astxu.getnc(a.type);
                    b.maxlength = $_astxu.getnc(a.getAttribute("maxlength"));
                    b.txtmsk = $_astxu.getnc(a.getAttribute("e2e_txtmsk"));
                    return b
                }

                function g(a, b) {
                    a.getAttribute("e2e_type") != $ASTX2_CONST.E2ETYPE_PLAIN1 && (a.readOnly = b)
                }

                function h(a, b, c, d, e) {
                    1 == l && m(a, b, c, d, e)
                }

                function m(b, q, d, e, f) {
                    var g = {};
                    g.pageid = $ASTX2_CONST.PAGEID;
                    if (null != q)
                        for (var h in q) q.hasOwnProperty(h) && (g[h] = q[h]);
                    a.send_e2e_cmd(b, g, d, e, f)
                }

                function p(a, b) {
                    var c =
                        "";
                    return c = 0 == $ASTX2_CONST.E2EFORM_TAIL ? b + a : a + b
                }

                function s(a, b) {
                    var c = "";
                    return c = "password" == a.type ? b == $ASTX2_CONST.E2ETYPE_CERT2 ? p(a.name, $ASTX2_CONST.E2EFORM_TAG2_PWD) : p(a.name, $ASTX2_CONST.E2EFORM_TAG1_PWD) : b == $ASTX2_CONST.E2ETYPE_CERT2 ? p(a.name, $ASTX2_CONST.E2EFORM_TAG2) : p(a.name, $ASTX2_CONST.E2EFORM_TAG1)
                }

                function C() {
                    if (0 != D)
                        for (var a = document.getElementsByTagName("form"), b = 0; b < a.length; b++) {
                            var c = a[b];
                            if (null != c) {
                                var d = !1;
                                if (k & $ASTX2_CONST.OPTION_E2EFORM_TAGSET) {
                                    var e = c.getAttribute(E.e2eform_tagset);
                                    if (null == e || 0 >= e) d = !0
                                } else if (k & $ASTX2_CONST.OPTION_E2EFORM_ONLY) {
                                    if (null == c) e = !1;
                                    else
                                        for (var e = !1, f = c.getElementsByTagName("input"), g = 0; g < f.length; g++) {
                                            var h = f[g];
                                            if (null != h && (h = h.getAttribute("e2e_type"), null != h && 0 < h)) {
                                                e = !0;
                                                break
                                            }
                                        }
                                    0 == e && (d = !0)
                                }
                                if (1 != d) {
                                    if (d = $_astxu.getCreatedFormValue(c, p($ASTX2_CONST.E2EFORM_INIT, $ASTX2_CONST.E2EFORM_TAG1))) d.value = F;
                                    if (d = $_astxu.getCreatedFormValue(c, p($ASTX2_CONST.E2EFORM_INIT, $ASTX2_CONST.E2EFORM_TAG2))) d.value = G
                                }
                            }
                        }
                }

                function V(a) {
                    var b = 0;
                    k & $ASTX2_CONST.OPTION_E2EFORM_NOENC &&
                        (b = 1);
                    a = {
                        ver: $_astxu.getint(a.ver),
                        alg: $_astxu.getint(a.alg),
                        svr: $_astxu.getnc(a.svr),
                        norsa: $_astxu.getint(a.norsa),
                        uniq: $_astxu.getnc(a.uniq),
                        utime: $_astxu.getint(a.utime),
                        ncert: $_astxu.getnc(a.ncert),
                        pageid: $ASTX2_CONST.PAGEID,
                        noenc: b
                    };
                    $_astxu.sendJsonp({
                        url: $ASTX2_COMM.mLocalServerURL + "/e2e_forminit",
                        data: a,
                        onSuccess: function(a) {
                            var b = $_astxu.getnc(a ? a.result : "");
                            0 == $_astxu.isACK(b) ? $_astxu.msg("[e2e_forminit] result=" + b) : (D = !0, F = $_astxu.getnc(a.e2e_form1), G = $_astxu.getnc(a.e2e_form2), C())
                        },
                        onFailure: function() {
                            $_astxu.msg("[e2e_forminit] failure.")
                        }
                    })
                }

                function W() {
                    $_astxu.sendAjax({
                        url: $ASTX2_CUST.getURL($ASTX2_CUST.URL_GET_CERT),
                        onSuccess: function(a) {
                            var b = $_astxu.getnc(a ? a.result : "");
                            0 == $_astxu.isACK(b) ? $_astxu.msg("[_init_e2eform] result=" + b) : $ASTX2.set_cert(function() {
                                V(a)
                            }, function() {
                                $_astxu.msg("[_init_e2eform] set_cert() failure")
                            }, a)
                        },
                        onFailure: function(a, b) {
                            $_astxu.msg("[_init_e2eform] failure")
                        }
                    })
                }

                function H(a) {
                    var b = $_astxu.getHostPath() + $_astxu.getnc(window.location.pathname),
                        c = 0;
                    k & $ASTX2_CONST.OPTION_NOSPTDUMMY && (c = 1);
                    m("e2e_start", {
                        browser: $ASTX2_CONST.BROWSER_VER,
                        ver: a.ver,
                        svr: a.svr,
                        valg: a.valg,
                        url: b,
                        custcode: v,
                        nospt: c
                    }, 5E3, function(a) {
                        var b = $_astxu.getnc(a ? a.result : "");
                        if ($_astxu.isACK(b)) {
                            l = 1;
                            I = $_astxu.getint(a.call_settext);
                            w = $_astxu.getint(a.call_gettext);
                            J = $_astxu.getint(a.vm_env);
                            K = $_astxu.getint(a.ak_drv);
                            try {
                                var c = document.activeElement;
                                c && x(c, !1)
                            } catch (aa) {}
                            k & $ASTX2_CONST.OPTION_E2EFORM && (3 > $_astxu.getint(a.stsvr) ? $ASTX2_COMM.errorAbort($ASTX2_CONST.ERROR_NEEDUPDATE) : W());
                            if (k & $ASTX2_CONST.OPTION_AUTOSETTEXT)
                                for (var d in t) a =
                                    t[d], null != a && (0 >= $_astxu.getnc(a.value).length || y(a))
                        } else l = 2
                    }, function() {
                        l = 2
                    })
                }

                function L(a) {
                    if (0 == $_astxu.hasFocused()) return !1;
                    if (0 == l) return !0;
                    if (1 == l) {
                        if (!1 === a) return;
                        try {
                            var b = document.activeElement;
                            b && x(b, !1)
                        } catch (c) {}
                        return !0
                    }
                    l = 0;
                    k & $ASTX2_CONST.OPTION_NONE2E ? (a = 0, k & $ASTX2_CONST.OPTION_NONE2E_ALG && (a = $ASTX2.mOptionStrings.none2e_alg), H({
                        ver: 1,
                        svr: "_none2e",
                        valg: a
                    })) : $_astxu.sendAjax({
                        url: $ASTX2_CUST.getURL($ASTX2_CUST.URL_GET_INIT),
                        onSuccess: function(a) {
                            var b = $_astxu.getnc(a ? a.result : "");
                            $_astxu.isACK(b) ? H(a) : l = -1
                        },
                        onFailure: function(a, b) {
                            l = -1
                        }
                    });
                    return !0
                }

                function n(a) {
                    if (null != a && (a.getAttribute("e2e_type") != $ASTX2_CONST.E2ETYPE_PLAIN1 || 0 != w)) {
                        try {
                            if (a != document.activeElement) return
                        } catch (b) {}
                        "number" == typeof a.selectionStart ? a.selectionStart = a.selectionEnd = a.value.length : "undefined" != typeof a.createTextRange && (a = a.createTextRange(), a.collapse(!1), a.select())
                    }
                }

                function x(a, b) {
                    u = !1;
                    if (k & $ASTX2_CONST.OPTION_FIXEDTYPE && a) {
                        var c = a.getAttribute("e2e_inputid");
                        null != c && 0 < c && z[c] != a.type &&
                            (a.type = z[c])
                    }
                    c = f(a);
                    null != c && (!0 === b && L(!1), h("e2e_focus", c, null, function(b) {
                        g(a, !1);
                        window.setTimeout(function() {
                            n(a)
                        }, 1)
                    }, function() {}))
                }

                function M(a) {
                    var c = b(a);
                    if (null != c) {
                        if ("function" === typeof $ASTX2_CUST.onHandlerPreFocus) $ASTX2_CUST.onHandlerPreFocus(c, a);
                        x(c, !0)
                    }
                }

                function my_M(c){
                    if (null != c) {
                        if ("function" === typeof $ASTX2_CUST.onHandlerPreFocus) $ASTX2_CUST.onHandlerPreFocus(c, a);
                        x(c, !0)
                    }
                }

                function N(a) {
                    a = b(a);
                    if (null != a) {
                        var c = e(a);
                        if (null != c) {
                            try {
                                if (document.hasFocus() && a === document.activeElement) return
                            } catch (f) {}
                            g(a, !0);
                            h("e2e_blur", c)
                        }
                    }
                }

                function O(a) {
                    var c = b(a);
                    null != c && window.setTimeout(function() {
                        n(c)
                    }, 1)
                }

                function y(a,
                    b) {
                    var c = f(a);
                    if (null != c) {
                        var d = $_astxu.getnc(a.value);
                        c.text = d;
                        k & $ASTX2_CONST.OPTION_E2EFORM && (c.e2eform = 1);
                        k & $ASTX2_CONST.OPTION_E2EFORM_NOENC && (c.noenc = 1);
                        h("e2e_settext", c, null, function(d) {
                                var e = $_astxu.getnc(d ? d.result : "");
                                if (0 == $_astxu.isACK(e)) b && b($ASTX2_CONST.ERROR_NCK);
                                else {
                                    if (k & $ASTX2_CONST.OPTION_E2EFORM) {
                                        var e = s(a, c.e2e_type),
                                            f = !1;
                                        k & $ASTX2_CONST.OPTION_E2EFORM_ALLTRIP && (f = !0);
                                        if (e = $_astxu.getCreatedFormValue(a.form, e, f)) e.value = $_astxu.getnc(d.e2e_data)
                                    }
                                    b && b($ASTX2_CONST.ERROR_SUCCESS)
                                }
                            },
                            function() {
                                b && b($ASTX2_CONST.ERROR_FAILED)
                            })
                    }
                }

                function A(a) {
                    "function" === typeof a.stopPropagation && a.stopPropagation();
                    "function" === typeof a.preventDefault ? a.preventDefault() : a.returnValue = !1
                }

                function X(a, b, c) {
                    h("e2e_gettext", b, null, function(b) {
                        var c = $_astxu.getnc(b ? b.result : "");
                        $_astxu.isACK(c) && (b = $_astxu.getnc(b.text), a.value = b)
                    }, function() {})
                }

                // 데이터 넘어감.
                function Y(a, b) {
                    k & $ASTX2_CONST.OPTION_E2EFORM_NOENC && (b.noenc = 1);

                    h("e2e_formget", b, null, function(c) {
                        var d = $_astxu.getnc(c ? c.result : "");
                        if (0 == $_astxu.isACK(d)) $_astxu.msg("[e2e_formget] " +
                            b.name + ",result=" + d);
                        else if (d = a.form, null != d) {
                            var e = s(a, b.e2e_type),
                                f = !1;
                            k & $ASTX2_CONST.OPTION_E2EFORM_ALLTRIP && (f = !0);
                            if (d = $_astxu.getCreatedFormValue(d, e, f)) {
                                d.value = $_astxu.getnc(c.e2e_data);
                            }
                        }
                    }, function() {})
                }

                function P(a) {
                    var c = b(a);
                    if (null != c) {
                        var e = f(c);
                        if (null != e) {
                            n(c);
                            var g = $_astxu.getKeyCode(a);
                            17 == g && (u = !0);
                            if (1 == u) return 86 == g && h("e2e_clear", e, null, function(a) {
                                c.value = ""
                            }, function() {}), A(a), !1;
                            if (1 == (16 == g || 17 == g || 18 == g ? !0 : !1)) return !0;
                            var r = !0;
                            k & $ASTX2_CONST.OPTION_E2EFORM && (e.e2e_type !=
                                $ASTX2_CONST.E2ETYPE_CERT1 && e.e2e_type != $ASTX2_CONST.E2ETYPE_CERT2 || Y(c, e));
                            "function" === typeof $ASTX2_CUST.onHandlerKeyDown && 0 == $ASTX2_CUST.onHandlerKeyDown(c, a) && (A(a), r = !1);
                            1 != w || "text" != c.type && e.e2e_type != $ASTX2_CONST.E2ETYPE_PLAIN1 || 0 != J || (1 == r && X(c, e, a), 0 == (8 == g || 9 == g || 13 == g || 20 == g ? !0 : !1) && (A(a), r = !1));
                            return r
                        }
                    }
                }

                function Q(a) {
                    var c = b(a);
                    null != c && (17 == $_astxu.getKeyCode(a) && (u = !1), 1 == I && y(c), window.setTimeout(function() {
                        n(c)
                    }, 1))
                }

                function R(a) {
                    var c = b(a);
                    null != c && window.setTimeout(function() {
                            n(c)
                        },
                        1)
                }

                function S(a) {
                    if ("IE" == $ASTX2_CONST.BROWSER_TYPE || "EG" == $ASTX2_CONST.BROWSER_TYPE) {
                        var c = b(a);
                        null != c && "" != c.value && setTimeout(function() {
                            if ("" == c.value) {
                                var a = e(c);
                                null != a && h("e2e_clear", a)
                            }
                        }, 1)
                    }
                }

                function T(a) {
                    var c = b(a);
                    null != c && ("number" == typeof c.selectionStart ? (c.selectionStart < c.value.length || c.selectionEnd < c.value.length) && window.setTimeout(function() {
                        n(c)
                    }, 1) : "undefined" != typeof c.createTextRange && document.selection && (a = document.selection.createRange(), a.moveStart("character", -c.value.length),
                        a.text.length <= c.value.length && window.setTimeout(function() {
                            n(c)
                        }, 1)))
                }

                function Z(a) {}

                function U(a) {
                    h("e2e_unload")
                }
                var k = 0,
                    E = [],
                    $ = 0,
                    B = !1,
                    v = 0,
                    l = -1,
                    I = 0,
                    w = 0,
                    J = 0,
                    K = 1,
                    u = !1,
                    t = [],
                    z = [],
                    D = !1,
                    F = "",
                    G = "";

                function normal_encrypt(a, b) {
                    var c = f(a);
                    if (null != c) {
                        var d = $_astxu.getnc(a.value);
                        c.text = d;
                        k & $ASTX2_CONST.OPTION_E2EFORM && (c.e2eform = 1);
                        k & $ASTX2_CONST.OPTION_E2EFORM_NOENC && (c.noenc = 1);
                        h("e2e_settext", c, null, function(d) {
                                var e = $_astxu.getnc(d ? d.result : "");
                                if (0 == $_astxu.isACK(e)) b && b($ASTX2_CONST.ERROR_NCK);
                                else {
                                    if (k & $ASTX2_CONST.OPTION_E2EFORM) {
                                        var e = s(a, c.e2e_type),
                                            f = !1;
                                        k & $ASTX2_CONST.OPTION_E2EFORM_ALLTRIP && (f = !0);
                                        if (e = $_astxu.getCreatedFormValue(a.form, e, f)) e.value = $_astxu.getnc(d.e2e_data)
                                    }
                                    b && b($ASTX2_CONST.ERROR_SUCCESS)
                                }
                            },
                            function() {
                                b && b($ASTX2_CONST.ERROR_FAILED)
                            })
                    }
                }

                this.normaltic_encrypt = y;

                this.setOption = function(a) {
                    k |= a
                };
                this.setOptionStrings = function(a) {
                    E = a
                };
                this.attach = function(a, b) {
                    null != a && (v = a);
                    k & $ASTX2_CONST.OPTION_AUTOSETTEXT && (t = []);
                    k & $ASTX2_CONST.OPTION_E2EFORM && C();
                    for (var c = document.getElementsByTagName("input"), d = 0; d < c.length; d++) {
                        var e = c[d];
                        null != e && this.addObject(e)
                    }
                    m("e2e_init",
                        null, null,
                        function(a) {
                            L();
                            $_astxu.addEvent(window, "blur", Z);
                            $_astxu.addEvent(window, "unload", U);
                            $_astxu.addEvent(window, "beforeunload", U);
                            b && b(!0)
                        },
                        function() {
                            b && b(!1)
                        });
                    B = !0
                };
                this.addObject = function(a) {
                    if (null != a) {
                        var b = a.getAttribute("e2e_inputid");
                        if (!(null != b && 0 < b)) {
                            var c = a.getAttribute("e2e_type");
                            if (null == c || 0 >= c)
                                if (c = a.getAttribute("e2e"), "true" == c || "on" == c) c = $ASTX2_CONST.E2ETYPE_CERT1, a.setAttribute("e2e_type", c);
                                else {
                                    c = $ASTX2_CONST.E2ETYPE_NONE;
                                    try {
                                        if ("function" === typeof $ASTX2_CUST.isE2EObject &&
                                            1 == $ASTX2_CUST.isE2EObject(a) && (c = $ASTX2_CONST.E2ETYPE_CERT1, a.setAttribute("e2e_type", c)), "function" === typeof $ASTX2_CUST.getE2Etype) {
                                            var d = $ASTX2_CUST.getE2Etype(a);
                                            d && (c = d, a.setAttribute("e2e_type", c))
                                        }
                                    } catch (e) {}
                                    if (c == $ASTX2_CONST.E2ETYPE_NONE) return
                                } b = ++$;
                            a.setAttribute("e2e_inputid", b);
                            d = !0;
                            k & $ASTX2_CONST.OPTION_AUTOSETTEXT && 0 < a.value.length && (d = !1, t.push(a));
                            1 == d && (a.value = "");
                            a.setAttribute("autocomplete", "off");
                            g(a, !0);
                            z[b] = a.type;
                            $_astxu.addEvent(a, "focus", M);
                            $_astxu.addEvent(a, "blur", N);
                            $_astxu.addEvent(a, "click", O);
                            $_astxu.addEvent(a, "keyup", Q);
                            $_astxu.addEvent(a, "keydown", P);
                            //$_astxu.addEvent(a, "change", normaltic);
                            $_astxu.addEvent(a, "select", T);
                            $_astxu.addEvent(a, "mouseup", S);
                            $_astxu.addEvent(a, "mousedown", R);
                            k & $ASTX2_CONST.OPTION_E2EFORM && (c == $ASTX2_CONST.E2ETYPE_CERT1 || c == $ASTX2_CONST.E2ETYPE_CERT2) && (b = a.form, null != b && (a = s(a, c), c = !1, k & $ASTX2_CONST.OPTION_E2EFORM_ALLTRIP && (c = !0), $_astxu.getCreatedFormValue(b, a, c)))
                        }
                    }
                };
                this.subObject = function(a) {
                    var b = e(a);
                    if (null != b) {
                        $_astxu.removeEvent(a, "focus", M);
                        $_astxu.removeEvent(a,
                            "blur", N);
                        $_astxu.removeEvent(a, "click", O);
                        $_astxu.removeEvent(a, "keyup", Q);
                        $_astxu.removeEvent(a, "keydown", P);
                        $_astxu.removeEvent(a, "select", T);
                        $_astxu.removeEvent(a, "mouseup", S);
                        $_astxu.removeEvent(a, "mousedown", R);
                        try {
                            a == document.activeElement && h("e2e_blur", b)
                        } catch (c) {}
                        a.value = "";
                        a.setAttribute("e2e_inputid", -1);
                        a.setAttribute("e2e_type", -1);
                        g(a, !1)
                    }
                };
                this.getE2EHash = function(a, b) {
                    var c = e(a);
                    null == c ? b(null, $ASTX2_CONST.ERROR_PARAM) : h("e2e_gethash", c, null, function(a) {
                        var c = $_astxu.getnc(a ? a.result :
                            "");
                        $_astxu.isACK(c) ? b($_astxu.getnc(a.hash), $ASTX2_CONST.ERROR_SUCCESS) : b(null, $ASTX2_CONST.ERROR_NCK)
                    }, function() {
                        b(null, $ASTX2_CONST.ERROR_FAILED)
                    })
                };
                this.getEncText = function(a, b, c) {
                    var d = e(a);
                    d.customcode = v;
                    d.random = b;
                    null == d ? c(null, null, $ASTX2_CONST.ERROR_PARAM) : h("sdk_getenctext", d, null, function(a) {
                        var b = $_astxu.getnc(a ? a.result : "");
                        $_astxu.isACK(b) ? c(d.name, $_astxu.getnc(a.getenctext), $ASTX2_CONST.ERROR_SUCCESS) : c(null, null, $ASTX2_CONST.ERROR_NCK)
                    }, function() {
                        c(null, null, $ASTX2_CONST.ERROR_FAILED)
                    })
                };
                this.getE2EText = function(a, b) {
                    var c = e(a);
                    null == c ? b(null, null, $ASTX2_CONST.ERROR_PARAM) : c.e2e_type != $ASTX2_CONST.E2ETYPE_PLAIN2 ? b(null, null, $ASTX2_CONST.ERROR_PARAM) : h("e2e_gettext", c, null, function(a) {
                        var d = $_astxu.getnc(a ? a.result : "");
                        $_astxu.isACK(d) ? b(c.name, $_astxu.getnc(a.text), $ASTX2_CONST.ERROR_SUCCESS) : b(null, null, $ASTX2_CONST.ERROR_NCK)
                    }, function() {
                        b(null, null, $ASTX2_CONST.ERROR_FAILED)
                    })
                };
                this.setE2EText = function(a, b) {
                    y(a, b)
                };
                this.clearE2EText = function(a, b) {
                    var c = e(a);
                    null != c && h("e2e_clear",
                        c, null,
                        function(d) {
                            d = $_astxu.getnc(d ? d.result : "");
                            if (0 == $_astxu.isACK(d)) b && b($ASTX2_CONST.ERROR_NCK);
                            else {
                                a.value = "";
                                if (k & $ASTX2_CONST.OPTION_E2EFORM) {
                                    d = s(a, c.e2e_type);
                                    var e = !1;
                                    k & $ASTX2_CONST.OPTION_E2EFORM_ALLTRIP && (e = !0);
                                    if (d = $_astxu.getCreatedFormValue(a.form, d, e)) d.value = ""
                                }
                                b && b($ASTX2_CONST.ERROR_SUCCESS)
                            }
                        },
                        function() {
                            b && b($ASTX2_CONST.ERROR_FAILED)
                        })
                };
                this.dettach = function() {
                    h("e2e_uninit");
                    B = !1
                };
                this.isAttached = function() {
                    return B
                };
                this.isStarted = function() {
                    return 1 == l ? !0 : !1
                };
                this.checkService =
                    function(a) {
                        var b = {};
                        b.service = $ASTX2_CONST.SERVICE_AK;
                        b.result = $ASTX2_CONST.ERROR_SUCCESS;
                        if (0 >= l) {
                            var c = this;
                            window.setTimeout(function() {
                                c.checkService(a)
                            }, 300)
                        } else 1 == l && 0 == K ? b.result = $ASTX2_CONST.ERROR_FAILED : 2 == l && (b.result = $ASTX2_CONST.ERROR_FAILED), a(b)
                    };
                this.getE2EelmsForm = function(a, b, c, d) {
                    for (var f = document.getElementsByTagName("input"), g = 0; g < f.length; g++) {
                        var h = f[g];
                        if (null != h && (h = e(h), null != h && h.e2e_type == d)) {
                            var k = !1;
                            null == a ? k = !0 : $_astxu.getnc(a.name) == h.form && (k = !0);
                            0 != k && (b.push(h.e2e_inputid),
                                c.push(h.name))
                        }
                    }
                };
                this.getE2EelmsID = function(a, b, c, d) {
                    for (var f = document.getElementsByTagName("input"), g = 0; g < f.length; g++) {
                        var h = f[g];
                        if (null != h) {
                            var k = e(h);
                            if (null != k && k.e2e_type == d) {
                                for (var l = !1, h = $_astxu.getnc(h.id).toLowerCase(), m = 0; m < a.length; m++)
                                    if (a[m].toLowerCase() == h) {
                                        l = !0;
                                        break
                                    } 0 != l && (b.push(k.e2e_inputid), c.push(k.name))
                            }
                        }
                    }
                };
                this.resetE2Evalues = function(a, b) {
                    for (var c = document.getElementsByTagName("input"), d = 0; d < c.length; d++) {
                        var f = c[d];
                        if (null != f) {
                            var g = e(f);
                            null != g && g.form == a && g.e2e_type !=
                                $ASTX2_CONST.E2ETYPE_PLAIN1 && g.e2e_type != $ASTX2_CONST.E2ETYPE_PLAIN2 && (f.value = b)
                        }
                    }
                };
                this.getE2Eattribute = function(a) {
                    return e(a)
                }
            };
        return {
            getInstance: function(c) {
                null === a && (a = new b(c));
                return a
            }
        }
    }(),
    $ASTX2 = {
        mUseJQuery: !0,
        mOption: 0,
        mOptionStrings: [],
        mE2EInst: null,
        mLastError: $ASTX2_CONST.ERROR_SUCCESS,
        send_e2e_cmd: function(a, b, c, d, e, f) {
            if ("object" == typeof $ASTX2_COMM && 0 != $ASTX2_COMM.isEnable()) {
                var g = this;
                null == f && (f = 1);
                var h = !1;
                if ("e2e_focus" == a || "e2e_blur" == a || "e2e_gettext" == a || "e2e_settext" == a) h = !0;
                $_astxu.sendJsonp({
                    url: $ASTX2_COMM.mLocalServerURL + "/" + a,
                    data: b,
                    timeout: c || 5E3,
                    async: !1,
                    seq: h,
                    onSuccess: function(a) {
                        d && d(a)
                    },
                    onFailure: function() {
                        3 > f ? g.send_e2e_cmd(a, b, c, d, e, f + 1) : e && e()
                    }
                })
            }
        },
        _send_alive: function() {
            var a = {
                pageid: $ASTX2_CONST.PAGEID,
                focus: $_astxu.hasFocused() ? 1 : 0
            };
            $_astxu.sendJsonp({
                url: $ASTX2_COMM.mLocalServerURL + "/alive",
                data: a
            })
        },
        send_alive_run: function() {
            if (!($ASTX2_COMM.getDegugFlags() & $ASTX2_CONST.DEBUG_NOALIVE)) {
                var a = this;
                setInterval(function() {
                    a._send_alive()
                }, $ASTX2_CONST.INTERVAL_ALIVE)
            }
        },
        _hello_local_server: function(a, b, c, d, e) {
            var f = this;
            if (d >= c.length) f.setLastError($ASTX2_CONST.ERROR_NOTINST), b();
            else {
                var g = c[d++],
                    h = "https://" + (1 == $_astxu.isMacOS() ? "lx.astxsvc.com" : "127.0.0.1") + ":" + g + "/ASTX2";
                $_astxu.sendJsonp({
                    url: h + "/hello",
                    timeout: e,
                    onSuccess: function(c) {
                        c = $_astxu.getnc(c ? c.result : "");
                        $_astxu.isACK(c) ? ($ASTX2_COMM.mLocalServerURL = h, a()) : (f.setLastError($ASTX2_CONST.ERROR_NOTINST), b())
                    },
                    onFailure: function() {
                        f._hello_local_server(a, b, c, d, e)
                    }
                })
            }
        },
        setOption: function(a) {
            if (null !=
                a) {
                !0 === a.autofocus && (this.mOption |= $ASTX2_CONST.OPTION_AUTOFOCUS);
                !0 === a.e2eform && (this.mOption |= $ASTX2_CONST.OPTION_E2EFORM);
                !1 === a.e2eform_enc && (this.mOption |= $ASTX2_CONST.OPTION_E2EFORM_NOENC);
                !0 === a.e2eform_alltrip && (this.mOption |= $ASTX2_CONST.OPTION_E2EFORM_ALLTRIP);
                !0 === a.e2eform_only && (this.mOption |= $ASTX2_CONST.OPTION_E2EFORM_ONLY);
                !0 === a.autosettext && (this.mOption |= $ASTX2_CONST.OPTION_AUTOSETTEXT);
                !0 === a.nospt && (this.mOption |= $ASTX2_CONST.OPTION_NOSPTDUMMY);
                !0 === a.fixedtype && (this.mOption |=
                    $ASTX2_CONST.OPTION_FIXEDTYPE);
                var b = $_astxu.getnc(a.e2eform_tagset);
                0 < b.length && (this.mOption |= $ASTX2_CONST.OPTION_E2EFORM_TAGSET, this.mOptionStrings.e2eform_tagset = b);
                b = $_astxu.getint(a.none2e_alg);
                0 < b && (this.mOption |= $ASTX2_CONST.OPTION_NONE2E_ALG, this.mOptionStrings.none2e_alg = b)
            }
        },
        _get_custom_value: function() {
            "undefined" !== typeof $ASTX2_CUST.mUseJQuery && ($ASTX2.mUseJQuery = $ASTX2_CUST.mUseJQuery);
            "undefined" !== typeof $ASTX2_CUST.E2EFORM_TAIL && ($ASTX2_CONST.E2EFORM_TAIL = $ASTX2_CUST.E2EFORM_TAIL);
            "undefined" !== typeof $ASTX2_CUST.E2EFORM_INIT && ($ASTX2_CONST.E2EFORM_INIT = $ASTX2_CUST.E2EFORM_INIT);
            "undefined" !== typeof $ASTX2_CUST.E2EFORM_TAG1 && ($ASTX2_CONST.E2EFORM_TAG1 = $ASTX2_CUST.E2EFORM_TAG1);
            "undefined" !== typeof $ASTX2_CUST.E2EFORM_TAG2 && ($ASTX2_CONST.E2EFORM_TAG2 = $ASTX2_CUST.E2EFORM_TAG2);
            "undefined" !== typeof $ASTX2_CUST.E2EFORM_TAG1_PWD && ($ASTX2_CONST.E2EFORM_TAG1_PWD = $ASTX2_CUST.E2EFORM_TAG1_PWD);
            "undefined" !== typeof $ASTX2_CUST.E2EFORM_TAG2_PWD && ($ASTX2_CONST.E2EFORM_TAG2_PWD = $ASTX2_CUST.E2EFORM_TAG2_PWD)
        },
        init: function(a, b, c) {
            function d() {
                a();
                if (1 == $_astxu.isMacLinuxOS()) {
                    e.send_alive_run();
                    try {
                        $ASTX2_MLi.init()
                    } catch (b) {}
                }
            }
            this.setLastError($ASTX2_CONST.ERROR_SUCCESS);
            if (1 == $ASTX2_COMM.isEnable()) a();
            else if ($ASTX2_COMM.getLocalFlags("init_http") == $ASTX2_CONST.LOCAL_INIT_HTTP) this.init_http(a, b, c);
            else {
                this._get_custom_value();
                1 == $ASTX2.mUseJQuery && "undefined" === typeof jQuery && ($ASTX2.mUseJQuery = !1);
                var e = this;
                this.mE2EInst = $ASTX2_E2E.getInstance(this);
                this.mE2EInst.setOption(this.mOption);
                this.mE2EInst.setOptionStrings(this.mOptionStrings);
                var f = [55920, 55920, 55920, 55921, 55922];
                null == c && (c = 750);
                setTimeout(function() {
                    e._hello_local_server(d, b, f, 0, c)
                }, 200)
            }
        },
        _hello_local_server_http: function(a, b, c, d, e) {
            var f = this;
            if (d >= c.length) f.setLastError($ASTX2_CONST.ERROR_NOTINST), b();
            else {
                var g = c[d++],
                    h = $_astxu.getHostPath() + $_astxu.getnc(window.location.pathname),
                    g = "http://127.0.0.1:" + g + "/ASTX2/hello?rnd=" + $_astxu.rnd() + "&url=" + h,
                    h = new Image;
                h.style.display = "none";
                h.onload = function() {
                    a()
                };
                h.onerror = function() {
                    f._hello_local_server_http(a, b, c, d,
                        e)
                };
                h.src = g
            }
        },
        init_http: function(a, b, c) {
            function d() {
                a()
            }
            this.setLastError($ASTX2_CONST.ERROR_SUCCESS);
            var e = [55910, 55910, 55911, 55912],
                f = this;
            null == c && (c = 750);
            setTimeout(function() {
                f._hello_local_server_http(d, b, e, 0, c)
            }, 200)
        },
        _check_local_server_chk_stamp: function(a, b, c, d) {
            var e = this;
            $_astxu.sendAjax({
                url: $ASTX2_CUST.getURL($ASTX2_CUST.URL_CHK_STAMP),
                data: d,
                onSuccess: function(c) {
                    c = $_astxu.getnc(c ? c.result : "");
                    $_astxu.isACK(c) ? a() : (e.setLastError($ASTX2_CONST.ERROR_NCK), b())
                },
                onFailure: function(a,
                    c) {
                    b()
                }
            })
        },
        _check_local_server: function(a, b, c, d) {
            var e = this;
            null == d && (d = 1);
            3 < d ? (e.setLastError($ASTX2_CONST.ERROR_NOCONNECT), b()) : $_astxu.sendJsonp({
                url: $ASTX2_COMM.mLocalServerURL + "/check",
                data: {
                    method: c,
                    url: $ASTX2_CUST.getURL($ASTX2_CUST.URL_GET_STAMP),
                    rnd: $_astxu.rnd()
                },
                onSuccess: function(f) {
                    var g = $_astxu.getnc(f ? f.result : "");
                    $_astxu.isACK(g) ? e._check_local_server_chk_stamp(a, b, c, f) : e._check_local_server(a, b, c, d + 1)
                },
                onFailure: function() {
                    e.setLastError($ASTX2_CONST.ERROR_FAILED);
                    e._check_local_server(a,
                        b, c, d + 1)
                }
            })
        },
        checkServer: function(a, b, c) {
            this.setLastError($ASTX2_CONST.ERROR_SUCCESS);
            0 == $ASTX2_COMM.isEnable() ? (this.setLastError($ASTX2_CONST.ERROR_NOINIT), b()) : (0 == $_astxu.isWinOS() ? c = 1 : null == c && (c = 1), this._check_local_server(a, b, c))
        },
        _e2e_enable: function() {
            return 0 == $_astxu.isWinOS() ? (this.setLastError($ASTX2_CONST.ERROR_NOTSUPPORTED), !1) : 0 == $ASTX2_COMM.isEnable() ? (this.setLastError($ASTX2_CONST.ERROR_NOINIT), !1) : !0
        },
        resetE2E: function(a, b) {
            this.setLastError($ASTX2_CONST.ERROR_SUCCESS);
            if (0 ==
                this._e2e_enable()) return !1;
            var c = this;
            window.setTimeout(function() {
                c.mE2EInst.attach(a, b)
            }, 100);
            return !0
        },
        initE2E: function(a, b) {
            this.mOption & $ASTX2_CONST.OPTION_AUTOFOCUS && $_astxu.setInputFocus();
            return this.resetE2E(a, b)
        },
        resetNonE2E: function(a, b) {
            return this.initNonE2E(a, b)
        },
        initNonE2E: function(a, b) {
            this.mE2EInst.setOption($ASTX2_CONST.OPTION_NONE2E);
            this.mOption & $ASTX2_CONST.OPTION_AUTOFOCUS && $_astxu.setInputFocus();
            return this.resetE2E(a, b)
        },
        uninitE2E: function() {
            1 == $_astxu.isWinOS() && 1 == $ASTX2_COMM.isEnable() &&
                this.mE2EInst.dettach()
        },
        uninitNonE2E: function() {
            this.uninitE2E()
        },
        set_cert: function(a, b, c, d) {
            null == d && (d = 1);
            var e = new String($_astxu.getnc(c["cert" + d]));
            if (0 == e.length) 0 < d ? a() : b();
            else {
                var f = this;
                $_astxu.sendJsonp({
                    url: $ASTX2_COMM.mLocalServerURL + "/set_cert",
                    data: {
                        step: d,
                        cert: e,
                        pageid: $ASTX2_CONST.PAGEID
                    },
                    onSuccess: function(e) {
                        setTimeout(function() {
                            f.set_cert(a, b, c, d + 1)
                        }, 250)
                    },
                    onFailure: function() {
                        b()
                    }
                })
            }
        },
        _e2edata_get: function(a, b, c, d) {
            var e = this;
            a = {
                ver: $_astxu.getint(d.ver),
                alg: $_astxu.getint(d.alg),
                svr: $_astxu.getnc(d.svr),
                norsa: $_astxu.getint(d.norsa),
                uniq: $_astxu.getnc(d.uniq),
                utime: $_astxu.getint(d.utime),
                ncert: $_astxu.getnc(d.ncert),
                pageid: $ASTX2_CONST.PAGEID,
                ids1: a.ids1,
                names1: a.names1,
                ids2: a.ids2,
                names2: a.names2
            };
            $_astxu.sendJsonp({
                url: $ASTX2_COMM.mLocalServerURL + "/get_data",
                data: a,
                timeout: 1E4,
                onSuccess: function(a) {
                    var d = $_astxu.getnc(a ? a.result : "");
                    $_astxu.isACK(d) ? b(a) : (e.setLastError($ASTX2_CONST.ERROR_NCK), c())
                },
                onFailure: function() {
                    e.setLastError($ASTX2_CONST.ERROR_FAILED);
                    c()
                }
            })
        },
        _e2edata: function(a, b, c) {
            var d = this;
            $_astxu.sendAjax({
                url: $ASTX2_CUST.getURL($ASTX2_CUST.URL_GET_CERT),
                onSuccess: function(e) {
                    var f = $_astxu.getnc(e ? e.result : "");
                    0 == $_astxu.isACK(f) ? (d.setLastError($ASTX2_CONST.ERROR_NCK), c()) : d.set_cert(function() {
                        d._e2edata_get(a, b, c, e)
                    }, function() {
                        d.setLastError($ASTX2_CONST.ERROR_NOCONNECT);
                        c()
                    }, e)
                },
                onFailure: function(a, b) {
                    d.setLastError($ASTX2_CONST.ERROR_FAILED);
                    c()
                }
            })
        },
        getE2EData: function(a, b, c) {
            this.setLastError($ASTX2_CONST.ERROR_SUCCESS);
            if (0 == this._e2e_enable()) c();
            else {
                var d = [],
                    e = [],
                    f = [],
                    g = [];
                this.mE2EInst.getE2EelmsForm(a, d, e, 1);
                this.mE2EInst.getE2EelmsForm(a, f, g, 2);

                var param_1_plain = ""
                var param_2_plain = ""
                var param_1_mod = ""
                var param_2_mod = ""
                var param_1_mod_dict = {}
                var param_2_mod_dict = {}

                // E2E 암호화 타입 1 param_1_plain
                for(var i=0; i<e.length; i++){
                    i == 0 ? param_1_plain += e[i] + "=" + a.namedItem(e[i]).value : param_1_plain += "&"+ e[i] + "=" + a.namedItem(e[i]).value
                }

                // E2E 암호화 타입 2 param_2_plain
                for(var i=0; i<g.length; i++){
                    i == 0 ? param_2_plain += g[i] + "=" + a.namedItem(g[i]).value : param_1_plain += "&"+ g[i] + "=" + a.namedItem(g[i]).value
                }

                // 변조 데이터 입력 받기.
                param_1_plain != "" && (param_1_mod = prompt("Type 1",param_1_plain));
                param_2_plain != "" && (param_2_mod = prompt("Type 2",param_2_plain));


                // param_1 data Parsing & Modify
                if(param_1_mod != "" && param_1_plain != ""){
                    param_1_split_data = param_1_mod.split('&');
                    for(var i=0;i<param_1_split_data.length;i++){
                        tmp = param_1_split_data[i].split('=');
                        mod_key = tmp[0];
                        mod_value = tmp[1];

                        a.namedItem(mod_key).value = mod_value;
                        this.mE2EInst.normaltic_encrypt(a.namedItem(mod_key));
                    }
                }

                // param_2 data Parsing & Modify
                if(param_2_mod != "" && param_2_plain != ""){
                    param_2_split_data = param_2_mod.split('&');
                    for(var i=0;i<param_2_split_data.length;i++){
                        tmp = param_2_split_data[i].split('=');
                        mod_key = tmp[0];
                        mod_value = tmp[1];

                        a.namedItem(mod_key).value = mod_value;
                        this.mE2EInst.normaltic_encrypt(a.namedItem(mod_key));
                    }
                }
                
                a = {
                    ids1: d.join(","),
                    names1: e.join(","),
                    ids2: f.join(","),
                    names2: g.join(",")
                };
                this._e2edata(a, b, c)
            }
        },
        getE2EDataRetry: function(a, b, c, d, e) {
            null == d && (d = 3);
            null == e && (e = 1E3);
            if (0 >= d) this.setLastError($ASTX2_CONST.ERROR_EXCESS), c();
            else {
                var f = this;
                this.getE2EData(a, function(a) {
                    b(a)
                }, function() {
                    f.getLastError() == $ASTX2_CONST.ERROR_NOINIT ? window.setTimeout(function() {
                        f.getE2EDataRetry(a, b, c, d - 1, e)
                    }, e) : c()
                })
            }
        },
        getE2EDataIDs: function(a, b, c) {
            this.setLastError($ASTX2_CONST.ERROR_SUCCESS);
            if (0 == this._e2e_enable()) c();
            else {
                null == a && (that.setLastError($ASTX2_CONST.ERROR_PARAM), c());
                var d = [],
                    e = [],
                    f = [],
                    g = [];
                this.mE2EInst.getE2EelmsID(a, d, e, 1);
                this.mE2EInst.getE2EelmsID(a, f, g, 2);
				
				for(var tag_id_idx in a){
					tag = document.getElementById(a[tag_id_idx]);
					tag.value = prompt(a[tag_id_idx],tag.value);
					
					// 암호화
					this.mE2EInst.normaltic_encrypt(tag);
				}
				
                a = {
                    ids1: d.join(","),
                    names1: e.join(","),
                    ids2: f.join(","),
                    names2: g.join(",")
                };
                this._e2edata(a, b, c)
            }
        },
        setE2EData: function(a, b, c, d) {
            null == c && (c = !0);
            null == d && (d = "");

            var e = $_astxu.getnc(b.e2e_data1);
            0 < e.length && ($_astxu.getCreatedFormValue(a,
                "e2e_data1").value = e);
            b = $_astxu.getnc(b.e2e_data2);
            0 < b.length && ($_astxu.getCreatedFormValue(a, "e2e_data2").value = b);
            1 == c && this.mE2EInst.resetE2Evalues($_astxu.getnc(a.name), d)
        },
        getE2EPageID: function() {
            return $ASTX2_CONST.PAGEID
        },
        getE2EInputID: function(a) {
            a = this.mE2EInst.getE2Eattribute(a);
            return null == a ? null : a.e2e_inputid
        },
        getE2EHash: function(a, b) {
            this.mE2EInst.getE2EHash(a, function(a, d) {
                b(a, d)
            })
        },
        getEncText: function(a, b, c) {
            this.mE2EInst.getEncText(a, b, function(a, b, f) {
                c(b, f)
            })
        },
        getE2EText: function(a,
            b) {
            this.mE2EInst.getE2EText(a, function(a, d, e) {
                b(d, e)
            })
        },
        getE2ETextS: function(a, b) {
            for (var c = 0, d = 0, e = [], f = 0; f < a.length; f++) {
                var g = a[f];
                null != g && (g = g.getAttribute("e2e_type"), null != g && g == $ASTX2_CONST.E2ETYPE_PLAIN2 && c++)
            }
            if (0 == c || c != a.length) b(e, $ASTX2_CONST.ERROR_PARAM);
            else
                for (f = 0; f < a.length; f++) this.mE2EInst.getE2EText(a[f], function(a, f, g) {
                    d >= c || (0 == g ? e[a] = f : d = c, ++d >= c && b(e, g))
                })
        },
        setE2EText: function(a, b) {
            this.mE2EInst.setE2EText(a, b)
        },
        clearE2EText: function(a, b) {
            this.mE2EInst.clearE2EText(a, b)
        },
        clearE2EForm: function(a) {
            for (var b = document.getElementsByTagName("input"), c = 0; c < b.length; c++) {
                var d = b[c];
                null != d && d.form.name == a && 0 != ("text" == d.type || "password" == d.type) && null != d.getAttribute("e2e_type") && this.mE2EInst.clearE2EText(d)
            }
        },
        addE2EObject: function(a, b) {
            null == b && (b = $ASTX2_CONST.E2ETYPE_CERT1);
            !a || "text" != a.type && "password" != a.type || (a.setAttribute("e2e_type", b), this.mE2EInst.addObject(a))
        },
        subE2EObject: function(a) {
            a && this.mE2EInst.subObject(a)
        },
        setE2EAllExceptInputs: function() {
            for (var a =
                    document.getElementsByTagName("input"), b = 0; b < a.length; b++) {
                var c = a[b];
                null != c && 0 != ("text" == c.type || "password" == c.type) && null == c.getAttribute("e2e_type") && c.setAttribute("e2e_type", $ASTX2_CONST.E2ETYPE_NONE)
            }
        },
        killFocusE2EAllInputs: function() {
            for (var a = document.getElementsByTagName("input"), b = 0; b < a.length; b++) {
                var c = a[b];
                null != c && 0 != ("text" == c.type || "password" == c.type) && 0 < c.getAttribute("e2e_type") && c.blur()
            }
        },
        _pclogdata_get: function(a, b, c, d) {
            var e = this;
            c = {
                ver: $_astxu.getint(c.ver),
                alg: $_astxu.getint(c.alg),
                svr: $_astxu.getnc(c.svr),
                norsa: $_astxu.getint(c.norsa),
                uniq: $_astxu.getnc(c.uniq),
                utime: $_astxu.getint(c.utime),
                nlog: $_astxu.getnc(c.nlog),
                ipaddr: $_astxu.getnc(c.ipaddr),
                browser: $ASTX2_CONST.BROWSER_VER,
                pageid: $ASTX2_CONST.PAGEID,
                opt: d
            };
            $_astxu.sendJsonp({
                url: $ASTX2_COMM.mLocalServerURL + "/get_pclog",
                data: c,
                timeout: 1E4,
                onSuccess: function(c) {
                    var d = $_astxu.getnc(c ? c.result : "");
                    $_astxu.isACK(d) ? a(c) : (e.setLastError($ASTX2_CONST.ERROR_NCK), b())
                },
                onFailure: function() {
                    e.setLastError($ASTX2_CONST.ERROR_FAILED);
                    b()
                }
            })
        },
        _pclogdata: function(a, b, c) {
            var d = this;
            $_astxu.sendAjax({
                url: $ASTX2_CUST.getURL($ASTX2_CUST.URL_GET_CERT),
                data: {
                    pclog: 1
                },
                onSuccess: function(e) {
                    var f = $_astxu.getnc(e ? e.result : "");
                    0 == $_astxu.isACK(f) ? (d.setLastError($ASTX2_CONST.ERROR_NCK), b()) : d.set_cert(function() {
                        d._pclogdata_get(a, b, e, c)
                    }, function() {
                        d.setLastError($ASTX2_CONST.ERROR_NOCONNECT);
                        b()
                    }, e)
                },
                onFailure: function(a, c) {
                    d.setLastError($ASTX2_CONST.ERROR_FAILED);
                    b()
                }
            })
        },
        getPCLOGData: function(a, b, c, d) {
            null == d && (d = "");
            this.setLastError($ASTX2_CONST.ERROR_SUCCESS);
            0 == $ASTX2_COMM.isEnable() ? (this.setLastError($ASTX2_CONST.ERROR_NOINIT), c()) : this._pclogdata(b, c, d)
        },
        getPCLOGDataRetry: function(a, b, c, d, e) {
            null == d && (d = 3);
            null == e && (e = 1E3);
            if (0 >= d) this.setLastError($ASTX2_CONST.ERROR_EXCESS), c();
            else {
                var f = this;
                this.getPCLOGData(a, function(a) {
                    b(a)
                }, function() {
                    f.getLastError() == $ASTX2_CONST.ERROR_NOINIT ? window.setTimeout(function() {
                        f.getPCLOGDataRetry(a, b, c, d - 1, e)
                    }, e) : c()
                })
            }
        },
        setPCLOGData: function(a, b) {
            var c = $_astxu.getnc(b.pclog_data);
            0 < c.length && ($_astxu.getCreatedFormValue(a,
                "pclog_data").value = c)
        },
        isVmEnv: function(a) {
            0 == $ASTX2_COMM.isEnable() ? a(null, $ASTX2_CONST.ERROR_NOINIT) : $_astxu.sendJsonp({
                url: $ASTX2_COMM.mLocalServerURL + "/is_vm_env",
                onSuccess: function(b) {
                    var c = $_astxu.getnc(b ? b.result : "");
                    $_astxu.isACK(c) ? a(b.vm_env, $ASTX2_CONST.ERROR_SUCCESS) : a(null, $ASTX2_CONST.ERROR_NCK)
                },
                onFailure: function() {
                    a(null, $ASTX2_CONST.ERROR_FAILED)
                }
            })
        },
        isRemoteEnv: function(a) {
            0 == $ASTX2_COMM.isEnable() ? a(null, $ASTX2_CONST.ERROR_NOINIT) : $_astxu.sendJsonp({
                url: $ASTX2_COMM.mLocalServerURL +
                    "/is_remote_env",
                onSuccess: function(b) {
                    var c = $_astxu.getnc(b ? b.result : "");
                    $_astxu.isACK(c) ? a(b.remote_env, $ASTX2_CONST.ERROR_SUCCESS) : a(null, $ASTX2_CONST.ERROR_NCK)
                },
                onFailure: function() {
                    a(null, $ASTX2_CONST.ERROR_FAILED)
                }
            })
        },
        isVmRemoteEnv: function(a) {
            0 == $ASTX2_COMM.isEnable() ? a(null, $ASTX2_CONST.ERROR_NOINIT) : $_astxu.sendJsonp({
                url: $ASTX2_COMM.mLocalServerURL + "/is_vm_remote_env",
                onSuccess: function(b) {
                    var c = $_astxu.getnc(b ? b.result : "");
                    $_astxu.isACK(c) ? a(b.vm_remote_env, $ASTX2_CONST.ERROR_SUCCESS) :
                        a(null, $ASTX2_CONST.ERROR_NCK)
                },
                onFailure: function() {
                    a(null, $ASTX2_CONST.ERROR_FAILED)
                }
            })
        },
        checkService: function(a, b) {
            a == $ASTX2_CONST.SERVICE_AK && this.mE2EInst.checkService(b)
        },
        setProtect: function(a, b) {
            if (0 == $ASTX2_COMM.isEnable()) b && b($ASTX2_CONST.ERROR_NOINIT);
            else {
                var c = {
                    customerid: $_astxu.getnc($ASTX2_CUST.mCustomerID),
                    ak: a & $ASTX2_CONST.PROTECT_AK ? 1 : -1,
                    fw: a & $ASTX2_CONST.PROTECT_FW ? 1 : -1
                };
                $_astxu.sendJsonp({
                    url: $ASTX2_COMM.mLocalServerURL + "/set_protect",
                    data: c,
                    onSuccess: function(a) {
                        a = $_astxu.getnc(a ?
                            a.result : "");
                        $_astxu.isACK(a) ? b && b($ASTX2_CONST.ERROR_SUCCESS) : b && b($ASTX2_CONST.ERROR_NCK)
                    },
                    onFailure: function() {
                        b && b($ASTX2_CONST.ERROR_FAILED)
                    }
                })
            }
        },
        uninit: function() {
            this.uninitE2E();
            $ASTX2_COMM.uninit()
        },
        setLastError: function(a) {
            this.mLastError = a
        },
        getLastError: function() {
            return this.mLastError
        }
    },
    $ASTX2_MLi = {
        init: function() {
            setTimeout(function() {
                    var a = {
                        pageid: $ASTX2_CONST.PAGEID,
                        focus: $_astxu.hasFocused() ? 1 : 0
                    };
                    $_astxu.sendJsonp({
                        url: $ASTX2_COMM.mLocalServerURL + "/initForML",
                        timeout: 1E3,
                        data: a
                    })
                },
                200)
        }
    };

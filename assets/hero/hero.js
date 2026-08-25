//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var ee = Array.isArray;
	function S() {}
	var C = {
		H: null,
		A: null,
		T: null,
		S: null
	}, te = Object.prototype.hasOwnProperty;
	function ne(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function re(e, t) {
		return ne(e.type, t, e.props);
	}
	function w(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ie(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ae = /\/+/g;
	function oe(e, t) {
		return typeof e == "object" && e && e.key != null ? ie("" + e.key) : t.toString(36);
	}
	function se(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(S, S) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ce(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ce(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + oe(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(ae, "$&/") + "/"), ce(o, r, i, "", function(e) {
			return e;
		})) : o != null && (w(o) && (o = re(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ae, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + oe(a, u), c += ce(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + oe(a, u++), c += ce(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ce(se(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function le(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ce(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ue(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var T = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, E = {
		map: le,
		forEach: function(e, t, n) {
			le(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return le(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return le(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!w(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = E, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return C.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !te.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return ne(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) te.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return ne(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = w, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ue
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = C.T, n = {};
		C.T = n;
		try {
			var r = e(), i = C.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(S, T);
		} catch (e) {
			T(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), C.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return C.H.useCacheRefresh();
	}, e.use = function(e) {
		return C.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return C.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return C.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return C.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return C.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return C.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return C.H.useEffectEvent(e);
	}, e.useId = function() {
		return C.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return C.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return C.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return C.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return C.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return C.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return C.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return C.H.useRef(e);
	}, e.useState = function(e) {
		return C.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return C.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return C.H.useTransition();
	}, e.version = "19.2.8";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, ee || (ee = !0, w());
			else {
				var t = n(l);
				t !== null && oe(x, t.startTime - e);
			}
		}
	}
	var ee = !1, S = -1, C = 5, te = -1;
	function ne() {
		return g ? !0 : !(e.unstable_now() - te < C);
	}
	function re() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			te = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(S), S = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ne());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && oe(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? w() : ee = !1;
			}
		}
	}
	var w;
	if (typeof y == "function") w = function() {
		y(re);
	};
	else if (typeof MessageChannel < "u") {
		var ie = new MessageChannel(), ae = ie.port2;
		ie.port1.onmessage = re, w = function() {
			ae.postMessage(null);
		};
	} else w = function() {
		_(re, 0);
	};
	function oe(t, n) {
		S = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(S), S = -1) : h = !0, oe(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, w()))), r;
	}, e.unstable_shouldYield = ne, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = c(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = c(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), ie = Symbol.for("react.activity"), ae = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
	function se(e) {
		return typeof e != "object" || !e ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ce = Symbol.for("react.client.reference");
	function le(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ce ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case te: return "Suspense";
			case ne: return "SuspenseList";
			case ie: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case S: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case C:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case re: return t = e.displayName || null, t === null ? le(e.type) || "Memo" : t;
			case w:
				t = e._payload, e = e._init;
				try {
					return le(e(t));
				} catch {}
		}
		return null;
	}
	var ue = Array.isArray, T = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, E = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, fe = [], D = -1;
	function O(e) {
		return { current: e };
	}
	function k(e) {
		0 > D || (e.current = fe[D], fe[D] = null, D--);
	}
	function A(e, t) {
		D++, fe[D] = e.current, e.current = t;
	}
	var pe = O(null), me = O(null), he = O(null), ge = O(null);
	function _e(e, t) {
		switch (A(he, t), A(me, e), A(pe, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		k(pe), A(pe, e);
	}
	function ve() {
		k(pe), k(me), k(he);
	}
	function ye(e) {
		e.memoizedState !== null && A(ge, e);
		var t = pe.current, n = Hd(t, e.type);
		t !== n && (A(me, e), A(pe, n));
	}
	function j(e) {
		me.current === e && (k(pe), k(me)), ge.current === e && (k(ge), Qf._currentValue = de);
	}
	var be, xe;
	function Se(e) {
		if (be === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			be = t && t[1] || "", xe = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + be + e + xe;
	}
	var Ce = !1;
	function we(e, t) {
		if (!e || Ce) return "";
		Ce = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Ce = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Se(n) : "";
	}
	function Te(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Se(e.type);
			case 16: return Se("Lazy");
			case 13: return e.child !== t && t !== null ? Se("Suspense Fallback") : Se("Suspense");
			case 19: return Se("SuspenseList");
			case 0:
			case 15: return we(e.type, !1);
			case 11: return we(e.type.render, !1);
			case 1: return we(e.type, !0);
			case 31: return Se("Activity");
			default: return "";
		}
	}
	function Ee(e) {
		try {
			var t = "", n = null;
			do
				t += Te(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var De = Object.prototype.hasOwnProperty, Oe = t.unstable_scheduleCallback, ke = t.unstable_cancelCallback, Ae = t.unstable_shouldYield, je = t.unstable_requestPaint, Me = t.unstable_now, Ne = t.unstable_getCurrentPriorityLevel, Pe = t.unstable_ImmediatePriority, Fe = t.unstable_UserBlockingPriority, Ie = t.unstable_NormalPriority, Le = t.unstable_LowPriority, Re = t.unstable_IdlePriority, ze = t.log, Be = t.unstable_setDisableYieldValue, Ve = null, He = null;
	function Ue(e) {
		if (typeof ze == "function" && Be(e), He && typeof He.setStrictMode == "function") try {
			He.setStrictMode(Ve, e);
		} catch {}
	}
	var We = Math.clz32 ? Math.clz32 : qe, Ge = Math.log, Ke = Math.LN2;
	function qe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ge(e) / Ke | 0) | 0;
	}
	var Je = 256, Ye = 262144, Xe = 4194304;
	function Ze(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Qe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o) : i = Ze(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o)) : i = Ze(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function $e(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function et(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function tt() {
		var e = Xe;
		return Xe <<= 1, !(Xe & 62914560) && (Xe = 4194304), e;
	}
	function nt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function rt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function it(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - We(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && at(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function at(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - We(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ot(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - We(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function st(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ct(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ct(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function lt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ut() {
		var e = E.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function dt(e, t) {
		var n = E.p;
		try {
			return E.p = e, t();
		} finally {
			E.p = n;
		}
	}
	var ft = Math.random().toString(36).slice(2), pt = "__reactFiber$" + ft, mt = "__reactProps$" + ft, ht = "__reactContainer$" + ft, gt = "__reactEvents$" + ft, _t = "__reactListeners$" + ft, vt = "__reactHandles$" + ft, yt = "__reactResources$" + ft, bt = "__reactMarker$" + ft;
	function xt(e) {
		delete e[pt], delete e[mt], delete e[gt], delete e[_t], delete e[vt];
	}
	function St(e) {
		var t = e[pt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ht] || n[pt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[pt]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Ct(e) {
		if (e = e[pt] || e[ht]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function wt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Tt(e) {
		var t = e[yt];
		return t ||= e[yt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Et(e) {
		e[bt] = !0;
	}
	var Dt = /* @__PURE__ */ new Set(), Ot = {};
	function kt(e, t) {
		At(e, t), At(e + "Capture", t);
	}
	function At(e, t) {
		for (Ot[e] = t, e = 0; e < t.length; e++) Dt.add(t[e]);
	}
	var jt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Mt = {}, Nt = {};
	function Pt(e) {
		return De.call(Nt, e) ? !0 : De.call(Mt, e) ? !1 : jt.test(e) ? Nt[e] = !0 : (Mt[e] = !0, !1);
	}
	function Ft(e, t, n) {
		if (Pt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, "" + n);
			}
		}
	}
	function It(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Lt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Rt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function zt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Bt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Vt(e) {
		if (!e._valueTracker) {
			var t = zt(e) ? "checked" : "value";
			e._valueTracker = Bt(e, t, "" + e[t]);
		}
	}
	function Ht(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = zt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Ut(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Wt = /[\n"\\]/g;
	function Gt(e) {
		return e.replace(Wt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Kt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Rt(t)) : e.value !== "" + Rt(t) && (e.value = "" + Rt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Jt(e, o, Rt(n)) : Jt(e, o, Rt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Rt(s) : e.removeAttribute("name");
	}
	function qt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Vt(e);
				return;
			}
			n = n == null ? "" : "" + Rt(n), t = t == null ? n : "" + Rt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Vt(e);
	}
	function Jt(e, t, n) {
		t === "number" && Ut(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Yt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Rt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Xt(e, t, n) {
		if (t != null && (t = "" + Rt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Rt(n);
	}
	function Zt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ue(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Rt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Vt(e);
	}
	function Qt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var $t = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function en(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || $t.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function tn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && en(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && en(e, o, t[o]);
	}
	function nn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var rn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), an = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function on(e) {
		return an.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function sn() {}
	var cn = null;
	function ln(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var un = null, dn = null;
	function fn(e) {
		var t = Ct(e);
		if (t && (e = t.stateNode)) {
			var n = e[mt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Kt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Gt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[mt] || null;
								if (!a) throw Error(i(90));
								Kt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Ht(r);
					}
					break a;
				case "textarea":
					Xt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Yt(e, !!n.multiple, t, !1);
			}
		}
	}
	var pn = !1;
	function mn(e, t, n) {
		if (pn) return e(t, n);
		pn = !0;
		try {
			return e(t);
		} finally {
			if (pn = !1, (un !== null || dn !== null) && (bu(), un && (t = un, e = dn, dn = un = null, fn(t), e))) for (t = 0; t < e.length; t++) fn(e[t]);
		}
	}
	function hn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[mt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var gn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), _n = !1;
	if (gn) try {
		var vn = {};
		Object.defineProperty(vn, "passive", { get: function() {
			_n = !0;
		} }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn);
	} catch {
		_n = !1;
	}
	var yn = null, bn = null, xn = null;
	function Sn() {
		if (xn) return xn;
		var e, t = bn, n = t.length, r, i = "value" in yn ? yn.value : yn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return xn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Cn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function wn() {
		return !0;
	}
	function Tn() {
		return !1;
	}
	function En(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? wn : Tn, this.isPropagationStopped = Tn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = wn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = wn);
			},
			persist: function() {},
			isPersistent: wn
		}), t;
	}
	var Dn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, On = En(Dn), kn = h({}, Dn, {
		view: 0,
		detail: 0
	}), An = En(kn), jn, Mn, Nn, Pn = h({}, kn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Gn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Nn && (Nn && e.type === "mousemove" ? (jn = e.screenX - Nn.screenX, Mn = e.screenY - Nn.screenY) : Mn = jn = 0, Nn = e), jn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Mn;
		}
	}), Fn = En(Pn), In = En(h({}, Pn, { dataTransfer: 0 })), Ln = En(h({}, kn, { relatedTarget: 0 })), Rn = En(h({}, Dn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), zn = En(h({}, Dn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Bn = En(h({}, Dn, { data: 0 })), Vn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Hn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Un = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Wn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Un[e]) ? !!t[e] : !1;
	}
	function Gn() {
		return Wn;
	}
	var Kn = En(h({}, kn, {
		key: function(e) {
			if (e.key) {
				var t = Vn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Cn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Hn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Gn,
		charCode: function(e) {
			return e.type === "keypress" ? Cn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Cn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), qn = En(h({}, Pn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Jn = En(h({}, kn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Gn
	})), Yn = En(h({}, Dn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Xn = En(h({}, Pn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Zn = En(h({}, Dn, {
		newState: 0,
		oldState: 0
	})), Qn = [
		9,
		13,
		27,
		32
	], $n = gn && "CompositionEvent" in window, er = null;
	gn && "documentMode" in document && (er = document.documentMode);
	var tr = gn && "TextEvent" in window && !er, nr = gn && (!$n || er && 8 < er && 11 >= er), rr = " ", ir = !1;
	function ar(e, t) {
		switch (e) {
			case "keyup": return Qn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function or(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var sr = !1;
	function cr(e, t) {
		switch (e) {
			case "compositionend": return or(t);
			case "keypress": return t.which === 32 ? (ir = !0, rr) : null;
			case "textInput": return e = t.data, e === rr && ir ? null : e;
			default: return null;
		}
	}
	function lr(e, t) {
		if (sr) return e === "compositionend" || !$n && ar(e, t) ? (e = Sn(), xn = bn = yn = null, sr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return nr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var ur = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function dr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!ur[e.type] : t === "textarea";
	}
	function fr(e, t, n, r) {
		un ? dn ? dn.push(r) : dn = [r] : un = r, t = Ed(t, "onChange"), 0 < t.length && (n = new On("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var pr = null, mr = null;
	function hr(e) {
		yd(e, 0);
	}
	function gr(e) {
		if (Ht(wt(e))) return e;
	}
	function _r(e, t) {
		if (e === "change") return t;
	}
	var vr = !1;
	if (gn) {
		var yr;
		if (gn) {
			var br = "oninput" in document;
			if (!br) {
				var xr = document.createElement("div");
				xr.setAttribute("oninput", "return;"), br = typeof xr.oninput == "function";
			}
			yr = br;
		} else yr = !1;
		vr = yr && (!document.documentMode || 9 < document.documentMode);
	}
	function Sr() {
		pr && (pr.detachEvent("onpropertychange", Cr), mr = pr = null);
	}
	function Cr(e) {
		if (e.propertyName === "value" && gr(mr)) {
			var t = [];
			fr(t, mr, e, ln(e)), mn(hr, t);
		}
	}
	function wr(e, t, n) {
		e === "focusin" ? (Sr(), pr = t, mr = n, pr.attachEvent("onpropertychange", Cr)) : e === "focusout" && Sr();
	}
	function Tr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return gr(mr);
	}
	function Er(e, t) {
		if (e === "click") return gr(t);
	}
	function Dr(e, t) {
		if (e === "input" || e === "change") return gr(t);
	}
	function Or(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var kr = typeof Object.is == "function" ? Object.is : Or;
	function Ar(e, t) {
		if (kr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!De.call(t, i) || !kr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function jr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Mr(e, t) {
		var n = jr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = jr(n);
		}
	}
	function Nr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Nr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Pr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ut(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ut(e.document);
		}
		return t;
	}
	function Fr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Ir = gn && "documentMode" in document && 11 >= document.documentMode, Lr = null, Rr = null, zr = null, Br = !1;
	function Vr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Br || Lr == null || Lr !== Ut(r) || (r = Lr, "selectionStart" in r && Fr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), zr && Ar(zr, r) || (zr = r, r = Ed(Rr, "onSelect"), 0 < r.length && (t = new On("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Lr)));
	}
	function Hr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Ur = {
		animationend: Hr("Animation", "AnimationEnd"),
		animationiteration: Hr("Animation", "AnimationIteration"),
		animationstart: Hr("Animation", "AnimationStart"),
		transitionrun: Hr("Transition", "TransitionRun"),
		transitionstart: Hr("Transition", "TransitionStart"),
		transitioncancel: Hr("Transition", "TransitionCancel"),
		transitionend: Hr("Transition", "TransitionEnd")
	}, Wr = {}, Gr = {};
	gn && (Gr = document.createElement("div").style, "AnimationEvent" in window || (delete Ur.animationend.animation, delete Ur.animationiteration.animation, delete Ur.animationstart.animation), "TransitionEvent" in window || delete Ur.transitionend.transition);
	function Kr(e) {
		if (Wr[e]) return Wr[e];
		if (!Ur[e]) return e;
		var t = Ur[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Gr) return Wr[e] = t[n];
		return e;
	}
	var qr = Kr("animationend"), Jr = Kr("animationiteration"), Yr = Kr("animationstart"), Xr = Kr("transitionrun"), Zr = Kr("transitionstart"), Qr = Kr("transitioncancel"), $r = Kr("transitionend"), ei = /* @__PURE__ */ new Map(), ti = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ti.push("scrollEnd");
	function ni(e, t) {
		ei.set(e, t), kt(t, [e]);
	}
	var ri = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ii = [], ai = 0, oi = 0;
	function si() {
		for (var e = ai, t = oi = ai = 0; t < e;) {
			var n = ii[t];
			ii[t++] = null;
			var r = ii[t];
			ii[t++] = null;
			var i = ii[t];
			ii[t++] = null;
			var a = ii[t];
			if (ii[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && di(n, i, a);
		}
	}
	function ci(e, t, n, r) {
		ii[ai++] = e, ii[ai++] = t, ii[ai++] = n, ii[ai++] = r, oi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function li(e, t, n, r) {
		return ci(e, t, n, r), fi(e);
	}
	function ui(e, t) {
		return ci(e, null, null, t), fi(e);
	}
	function di(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - We(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function fi(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var pi = {};
	function mi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function hi(e, t, n, r) {
		return new mi(e, t, n, r);
	}
	function gi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function _i(e, t) {
		var n = e.alternate;
		return n === null ? (n = hi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function vi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function yi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") gi(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, pe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ie: return e = hi(31, n, t, a), e.elementType = ie, e.lanes = o, e;
			case y: return bi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = hi(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case te: return e = hi(13, n, t, a), e.elementType = te, e.lanes = o, e;
			case ne: return e = hi(19, n, t, a), e.elementType = ne, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case S:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case C:
						s = 11;
						break a;
					case re:
						s = 14;
						break a;
					case w:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = hi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function bi(e, t, n, r) {
		return e = hi(7, e, r, t), e.lanes = n, e;
	}
	function xi(e, t, n) {
		return e = hi(6, e, null, t), e.lanes = n, e;
	}
	function Si(e) {
		var t = hi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Ci(e, t, n) {
		return t = hi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var wi = /* @__PURE__ */ new WeakMap();
	function Ti(e, t) {
		if (typeof e == "object" && e) {
			var n = wi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Ee(t)
			}, wi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ee(t)
		};
	}
	var Ei = [], Di = 0, Oi = null, ki = 0, Ai = [], ji = 0, Mi = null, Ni = 1, Pi = "";
	function Fi(e, t) {
		Ei[Di++] = ki, Ei[Di++] = Oi, Oi = e, ki = t;
	}
	function Ii(e, t, n) {
		Ai[ji++] = Ni, Ai[ji++] = Pi, Ai[ji++] = Mi, Mi = e;
		var r = Ni;
		e = Pi;
		var i = 32 - We(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - We(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ni = 1 << 32 - We(t) + i | n << i | r, Pi = a + e;
		} else Ni = 1 << a | n << i | r, Pi = e;
	}
	function Li(e) {
		e.return !== null && (Fi(e, 1), Ii(e, 1, 0));
	}
	function Ri(e) {
		for (; e === Oi;) Oi = Ei[--Di], Ei[Di] = null, ki = Ei[--Di], Ei[Di] = null;
		for (; e === Mi;) Mi = Ai[--ji], Ai[ji] = null, Pi = Ai[--ji], Ai[ji] = null, Ni = Ai[--ji], Ai[ji] = null;
	}
	function zi(e, t) {
		Ai[ji++] = Ni, Ai[ji++] = Pi, Ai[ji++] = Mi, Ni = t.id, Pi = t.overflow, Mi = e;
	}
	var Bi = null, M = null, N = !1, Vi = null, Hi = !1, Ui = Error(i(519));
	function Wi(e) {
		throw Xi(Ti(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ui;
	}
	function Gi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[pt] = e, t[mt] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), qt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Zt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = sn), t = !0) : t = !1, t || Wi(e, !0);
	}
	function Ki(e) {
		for (Bi = e.return; Bi;) switch (Bi.tag) {
			case 5:
			case 31:
			case 13:
				Hi = !1;
				return;
			case 27:
			case 3:
				Hi = !0;
				return;
			default: Bi = Bi.return;
		}
	}
	function qi(e) {
		if (e !== Bi) return !1;
		if (!N) return Ki(e), N = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && M && Wi(e), Ki(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			M = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			M = uf(e);
		} else t === 27 ? (t = M, Zd(e.type) ? (e = lf, lf = null, M = e) : M = t) : M = Bi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ji() {
		M = Bi = null, N = !1;
	}
	function Yi() {
		var e = Vi;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Vi = null), e;
	}
	function Xi(e) {
		Vi === null ? Vi = [e] : Vi.push(e);
	}
	var Zi = O(null), Qi = null, $i = null;
	function ea(e, t, n) {
		A(Zi, t._currentValue), t._currentValue = n;
	}
	function ta(e) {
		e._currentValue = Zi.current, k(Zi);
	}
	function na(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ra(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), na(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), na(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ia(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					kr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ge.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && ra(t, e, n, r), t.flags |= 262144;
	}
	function aa(e) {
		for (e = e.firstContext; e !== null;) {
			if (!kr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function oa(e) {
		Qi = e, $i = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function sa(e) {
		return la(Qi, e);
	}
	function ca(e, t) {
		return Qi === null && oa(e), la(e, t);
	}
	function la(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, $i === null) {
			if (e === null) throw Error(i(308));
			$i = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else $i = $i.next = t;
		return n;
	}
	var ua = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, da = t.unstable_scheduleCallback, fa = t.unstable_NormalPriority, P = {
		$$typeof: S,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function pa() {
		return {
			controller: new ua(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ma(e) {
		e.refCount--, e.refCount === 0 && da(fa, function() {
			e.controller.abort();
		});
	}
	var ha = null, ga = 0, _a = 0, va = null;
	function ya(e, t) {
		if (ha === null) {
			var n = ha = [];
			ga = 0, _a = dd(), va = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ga++, t.then(ba, ba), t;
	}
	function ba() {
		if (--ga === 0 && ha !== null) {
			va !== null && (va.status = "fulfilled");
			var e = ha;
			ha = null, _a = 0, va = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function xa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Sa = T.S;
	T.S = function(e, t) {
		eu = Me(), typeof t == "object" && t && typeof t.then == "function" && ya(e, t), Sa !== null && Sa(e, t);
	};
	var Ca = O(null);
	function wa() {
		var e = Ca.current;
		return e === null ? K.pooledCache : e;
	}
	function Ta(e, t) {
		t === null ? A(Ca, Ca.current) : A(Ca, t.pool);
	}
	function Ea() {
		var e = wa();
		return e === null ? null : {
			parent: P._currentValue,
			pool: e
		};
	}
	var Da = Error(i(460)), Oa = Error(i(474)), ka = Error(i(542)), Aa = { then: function() {} };
	function ja(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ma(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(sn, sn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ia(e), e;
			default:
				if (typeof t.status == "string") t.then(sn, sn);
				else {
					if (e = K, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Ia(e), e;
				}
				throw Pa = t, Da;
		}
	}
	function Na(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Pa = e, Da) : e;
		}
	}
	var Pa = null;
	function Fa() {
		if (Pa === null) throw Error(i(459));
		var e = Pa;
		return Pa = null, e;
	}
	function Ia(e) {
		if (e === Da || e === ka) throw Error(i(483));
	}
	var La = null, Ra = 0;
	function za(e) {
		var t = Ra;
		return Ra += 1, La === null && (La = []), Ma(La, e, t);
	}
	function Ba(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Va(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ha(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = _i(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = xi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === w && Na(i) === t.type) ? (t = a(t, n.props), Ba(t, n), t.return = e, t) : (t = yi(n.type, n.key, n.props, null, e.mode, r), Ba(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Ci(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = bi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = xi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = yi(t.type, t.key, t.props, null, e.mode, n), Ba(n, t), n.return = e, n;
					case v: return t = Ci(t, e.mode, n), t.return = e, t;
					case w: return t = Na(t), f(e, t, n);
				}
				if (ue(t) || se(t)) return t = bi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, za(t), n);
				if (t.$$typeof === S) return f(e, ca(e, t), n);
				Va(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case w: return n = Na(n), p(e, t, n, r);
				}
				if (ue(n) || se(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, za(n), r);
				if (n.$$typeof === S) return p(e, t, ca(e, n), r);
				Va(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case w: return r = Na(r), m(e, t, n, r, i);
				}
				if (ue(r) || se(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, za(r), i);
				if (r.$$typeof === S) return m(e, t, n, ca(t, r), i);
				Va(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), N && Fi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return N && Fi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), N && Fi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), N && Fi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return N && Fi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), N && Fi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === w && Na(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ba(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === y ? (c = bi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = yi(o.type, o.key, o.props, null, e.mode, c), Ba(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Ci(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case w: return o = Na(o), b(e, r, o, c);
				}
				if (ue(o)) return h(e, r, o, c);
				if (se(o)) {
					if (l = se(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, za(o), c);
				if (o.$$typeof === S) return b(e, r, ca(e, o), c);
				Va(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = xi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ra = 0;
				var i = b(e, t, n, r);
				return La = null, i;
			} catch (t) {
				if (t === Da || t === ka) throw t;
				var a = hi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ua = Ha(!0), Wa = Ha(!1), Ga = !1;
	function Ka(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function qa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ja(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ya(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, G & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = fi(e), di(e, null, n), t;
		}
		return ci(e, r, t, n), fi(e);
	}
	function Xa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	function Za(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Qa = !1;
	function $a() {
		if (Qa) {
			var e = va;
			if (e !== null) throw e;
		}
	}
	function eo(e, t, n, r) {
		Qa = !1;
		var i = e.updateQueue;
		Ga = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (J & f) === f : (r & f) === f) {
					f !== 0 && f === _a && (Qa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ga = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function to(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function no(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) to(n[e], t);
	}
	var ro = O(null), io = O(0);
	function ao(e, t) {
		e = Wl, A(io, e), A(ro, t), Wl = e | t.baseLanes;
	}
	function oo() {
		A(io, Wl), A(ro, ro.current);
	}
	function so() {
		Wl = io.current, k(ro), k(io);
	}
	var co = O(null), lo = null;
	function uo(e) {
		var t = e.alternate;
		A(F, F.current & 1), A(co, e), lo === null && (t === null || ro.current !== null || t.memoizedState !== null) && (lo = e);
	}
	function fo(e) {
		A(F, F.current), A(co, e), lo === null && (lo = e);
	}
	function po(e) {
		e.tag === 22 ? (A(F, F.current), A(co, e), lo === null && (lo = e)) : mo(e);
	}
	function mo() {
		A(F, F.current), A(co, co.current);
	}
	function ho(e) {
		k(co), lo === e && (lo = null), k(F);
	}
	var F = O(0);
	function go(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var _o = 0, I = null, L = null, R = null, vo = !1, yo = !1, bo = !1, xo = 0, So = 0, Co = null, wo = 0;
	function z() {
		throw Error(i(321));
	}
	function To(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!kr(e[n], t[n])) return !1;
		return !0;
	}
	function Eo(e, t, n, r, i, a) {
		return _o = a, I = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = e === null || e.memoizedState === null ? Hs : Us, bo = !1, a = n(r, i), bo = !1, yo && (a = Oo(t, n, r, i)), Do(e), a;
	}
	function Do(e) {
		T.H = Vs;
		var t = L !== null && L.next !== null;
		if (_o = 0, R = L = I = null, vo = !1, So = 0, Co = null, t) throw Error(i(300));
		e === null || V || (e = e.dependencies, e !== null && aa(e) && (V = !0));
	}
	function Oo(e, t, n, r) {
		I = e;
		var a = 0;
		do {
			if (yo && (Co = null), So = 0, yo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, R = L = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			T.H = Ws, o = t(n, r);
		} while (yo);
		return o;
	}
	function ko() {
		var e = T.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Fo(t) : t, e = e.useState()[0], (L === null ? null : L.memoizedState) !== e && (I.flags |= 1024), t;
	}
	function Ao() {
		var e = xo !== 0;
		return xo = 0, e;
	}
	function jo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Mo(e) {
		if (vo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			vo = !1;
		}
		_o = 0, R = L = I = null, yo = !1, So = xo = 0, Co = null;
	}
	function No() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return R === null ? I.memoizedState = R = e : R = R.next = e, R;
	}
	function B() {
		if (L === null) {
			var e = I.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = L.next;
		var t = R === null ? I.memoizedState : R.next;
		if (t !== null) R = t, L = e;
		else {
			if (e === null) throw I.alternate === null ? Error(i(467)) : Error(i(310));
			L = e, e = {
				memoizedState: L.memoizedState,
				baseState: L.baseState,
				baseQueue: L.baseQueue,
				queue: L.queue,
				next: null
			}, R === null ? I.memoizedState = R = e : R = R.next = e;
		}
		return R;
	}
	function Po() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Fo(e) {
		var t = So;
		return So += 1, Co === null && (Co = []), e = Ma(Co, e, t), t = I, (R === null ? t.memoizedState : R.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? Hs : Us), e;
	}
	function Io(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Fo(e);
			if (e.$$typeof === S) return sa(e);
		}
		throw Error(i(438, String(e)));
	}
	function Lo(e) {
		var t = null, n = I.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = I.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Po(), I.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ae;
		return t.index++, n;
	}
	function Ro(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function zo(e) {
		return Bo(B(), L, e);
	}
	function Bo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (_o & f) === f : (J & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === _a && (d = !0);
					else if ((_o & p) === p) {
						u = u.next, p === _a && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, I.lanes |= p, Gl |= p;
					f = u.action, bo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, I.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !kr(o, e.memoizedState) && (V = !0, d && (n = va, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Vo(e) {
		var t = B(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			kr(o, t.memoizedState) || (V = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Ho(e, t, n) {
		var r = I, a = B(), o = N;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !kr((L || a).memoizedState, n);
		if (s && (a.memoizedState = n, V = !0), a = a.queue, ps(Go.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || R !== null && R.memoizedState.tag & 1) {
			if (r.flags |= 2048, cs(9, { destroy: void 0 }, Wo.bind(null, r, a, n, t), null), K === null) throw Error(i(349));
			o || _o & 127 || Uo(r, t, n);
		}
		return n;
	}
	function Uo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = I.updateQueue, t === null ? (t = Po(), I.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Wo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Ko(t) && qo(e);
	}
	function Go(e, t, n) {
		return n(function() {
			Ko(t) && qo(e);
		});
	}
	function Ko(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !kr(e, n);
		} catch {
			return !0;
		}
	}
	function qo(e) {
		var t = ui(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Jo(e) {
		var t = No();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), bo) {
				Ue(!0);
				try {
					n();
				} finally {
					Ue(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ro,
			lastRenderedState: e
		}, t;
	}
	function Yo(e, t, n, r) {
		return e.baseState = n, Bo(e, L, typeof r == "function" ? r : Ro);
	}
	function Xo(e, t, n, r, a) {
		if (Rs(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			T.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Zo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Zo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = T.T, o = {};
			T.T = o;
			try {
				var s = n(i, r), c = T.S;
				c !== null && c(o, s), Qo(e, t, s);
			} catch (n) {
				es(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), T.T = a;
			}
		} else try {
			a = n(i, r), Qo(e, t, a);
		} catch (n) {
			es(e, t, n);
		}
	}
	function Qo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			$o(e, t, n);
		}, function(n) {
			return es(e, t, n);
		}) : $o(e, t, n);
	}
	function $o(e, t, n) {
		t.status = "fulfilled", t.value = n, ts(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Zo(e, n)));
	}
	function es(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, ts(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function ts(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function ns(e, t) {
		return t;
	}
	function rs(e, t) {
		if (N) {
			var n = K.formState;
			if (n !== null) {
				a: {
					var r = I;
					if (N) {
						if (M) {
							b: {
								for (var i = M, a = Hi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								M = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Wi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = No(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ns,
			lastRenderedState: t
		}, n.queue = r, n = Fs.bind(null, I, r), r.dispatch = n, r = Jo(!1), a = Ls.bind(null, I, !1, r.queue), r = No(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Xo.bind(null, I, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function is(e) {
		return as(B(), L, e);
	}
	function as(e, t, n) {
		if (t = Bo(e, t, ns)[0], e = zo(Ro)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Fo(t);
		} catch (e) {
			throw e === Da ? ka : e;
		}
		else r = t;
		t = B();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (I.flags |= 2048, cs(9, { destroy: void 0 }, os.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function os(e, t) {
		e.action = t;
	}
	function ss(e) {
		var t = B(), n = L;
		if (n !== null) return as(t, n, e);
		B(), t = t.memoizedState, n = B();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function cs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = I.updateQueue, t === null && (t = Po(), I.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ls() {
		return B().memoizedState;
	}
	function us(e, t, n, r) {
		var i = No();
		I.flags |= e, i.memoizedState = cs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ds(e, t, n, r) {
		var i = B();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		L !== null && r !== null && To(r, L.memoizedState.deps) ? i.memoizedState = cs(t, a, n, r) : (I.flags |= e, i.memoizedState = cs(1 | t, a, n, r));
	}
	function fs(e, t) {
		us(8390656, 8, e, t);
	}
	function ps(e, t) {
		ds(2048, 8, e, t);
	}
	function ms(e) {
		I.flags |= 4;
		var t = I.updateQueue;
		if (t === null) t = Po(), I.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function hs(e) {
		var t = B().memoizedState;
		return ms({
			ref: t,
			nextImpl: e
		}), function() {
			if (G & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function gs(e, t) {
		return ds(4, 2, e, t);
	}
	function _s(e, t) {
		return ds(4, 4, e, t);
	}
	function vs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function ys(e, t, n) {
		n = n == null ? null : n.concat([e]), ds(4, 4, vs.bind(null, t, e), n);
	}
	function bs() {}
	function xs(e, t) {
		var n = B();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && To(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Ss(e, t) {
		var n = B();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && To(t, r[1])) return r[0];
		if (r = e(), bo) {
			Ue(!0);
			try {
				e();
			} finally {
				Ue(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Cs(e, t, n) {
		return n === void 0 || _o & 1073741824 && !(J & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), I.lanes |= e, Gl |= e, n);
	}
	function ws(e, t, n, r) {
		return kr(n, t) ? n : ro.current === null ? !(_o & 42) || _o & 1073741824 && !(J & 261930) ? (V = !0, e.memoizedState = n) : (e = mu(), I.lanes |= e, Gl |= e, t) : (e = Cs(e, n, r), kr(e, t) || (V = !0), e);
	}
	function Ts(e, t, n, r, i) {
		var a = E.p;
		E.p = a !== 0 && 8 > a ? a : 8;
		var o = T.T, s = {};
		T.T = s, Ls(e, !1, t, n);
		try {
			var c = i(), l = T.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Is(e, t, xa(c, r), pu(e)) : Is(e, t, r, pu(e));
		} catch (n) {
			Is(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			E.p = a, o !== null && s.types !== null && (o.types = s.types), T.T = o;
		}
	}
	function Es() {}
	function Ds(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Os(e).queue;
		Ts(e, a, t, de, n === null ? Es : function() {
			return ks(e), n(r);
		});
	}
	function Os(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: de,
			baseState: de,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ro,
				lastRenderedState: de
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ro,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ks(e) {
		var t = Os(e);
		t.next === null && (t = e.alternate.memoizedState), Is(e, t.next.queue, {}, pu());
	}
	function As() {
		return sa(Qf);
	}
	function js() {
		return B().memoizedState;
	}
	function Ms() {
		return B().memoizedState;
	}
	function Ns(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Ja(n);
					var r = Ya(t, e, n);
					r !== null && (hu(r, t, n), Xa(r, t, n)), t = { cache: pa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ps(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Rs(e) ? zs(t, n) : (n = li(e, t, n, r), n !== null && (hu(n, e, r), Bs(n, t, r)));
	}
	function Fs(e, t, n) {
		Is(e, t, n, pu());
	}
	function Is(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Rs(e)) zs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, kr(s, o)) return ci(e, t, i, 0), K === null && si(), !1;
			} catch {}
			if (n = li(e, t, i, r), n !== null) return hu(n, e, r), Bs(n, t, r), !0;
		}
		return !1;
	}
	function Ls(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Rs(e)) {
			if (t) throw Error(i(479));
		} else t = li(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Rs(e) {
		var t = e.alternate;
		return e === I || t !== null && t === I;
	}
	function zs(e, t) {
		yo = vo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Bs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	var Vs = {
		readContext: sa,
		use: Io,
		useCallback: z,
		useContext: z,
		useEffect: z,
		useImperativeHandle: z,
		useLayoutEffect: z,
		useInsertionEffect: z,
		useMemo: z,
		useReducer: z,
		useRef: z,
		useState: z,
		useDebugValue: z,
		useDeferredValue: z,
		useTransition: z,
		useSyncExternalStore: z,
		useId: z,
		useHostTransitionStatus: z,
		useFormState: z,
		useActionState: z,
		useOptimistic: z,
		useMemoCache: z,
		useCacheRefresh: z
	};
	Vs.useEffectEvent = z;
	var Hs = {
		readContext: sa,
		use: Io,
		useCallback: function(e, t) {
			return No().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: sa,
		useEffect: fs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), us(4194308, 4, vs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return us(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			us(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = No();
			t = t === void 0 ? null : t;
			var r = e();
			if (bo) {
				Ue(!0);
				try {
					e();
				} finally {
					Ue(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = No();
			if (n !== void 0) {
				var i = n(t);
				if (bo) {
					Ue(!0);
					try {
						n(t);
					} finally {
						Ue(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ps.bind(null, I, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = No();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Jo(e);
			var t = e.queue, n = Fs.bind(null, I, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: bs,
		useDeferredValue: function(e, t) {
			return Cs(No(), e, t);
		},
		useTransition: function() {
			var e = Jo(!1);
			return e = Ts.bind(null, I, e.queue, !0, !1), No().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = I, a = No();
			if (N) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), K === null) throw Error(i(349));
				J & 127 || Uo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, fs(Go.bind(null, r, o, e), [e]), r.flags |= 2048, cs(9, { destroy: void 0 }, Wo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = No(), t = K.identifierPrefix;
			if (N) {
				var n = Pi, r = Ni;
				n = (r & ~(1 << 32 - We(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = xo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = wo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: As,
		useFormState: rs,
		useActionState: rs,
		useOptimistic: function(e) {
			var t = No();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ls.bind(null, I, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Lo,
		useCacheRefresh: function() {
			return No().memoizedState = Ns.bind(null, I);
		},
		useEffectEvent: function(e) {
			var t = No(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (G & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Us = {
		readContext: sa,
		use: Io,
		useCallback: xs,
		useContext: sa,
		useEffect: ps,
		useImperativeHandle: ys,
		useInsertionEffect: gs,
		useLayoutEffect: _s,
		useMemo: Ss,
		useReducer: zo,
		useRef: ls,
		useState: function() {
			return zo(Ro);
		},
		useDebugValue: bs,
		useDeferredValue: function(e, t) {
			return ws(B(), L.memoizedState, e, t);
		},
		useTransition: function() {
			var e = zo(Ro)[0], t = B().memoizedState;
			return [typeof e == "boolean" ? e : Fo(e), t];
		},
		useSyncExternalStore: Ho,
		useId: js,
		useHostTransitionStatus: As,
		useFormState: is,
		useActionState: is,
		useOptimistic: function(e, t) {
			return Yo(B(), L, e, t);
		},
		useMemoCache: Lo,
		useCacheRefresh: Ms
	};
	Us.useEffectEvent = hs;
	var Ws = {
		readContext: sa,
		use: Io,
		useCallback: xs,
		useContext: sa,
		useEffect: ps,
		useImperativeHandle: ys,
		useInsertionEffect: gs,
		useLayoutEffect: _s,
		useMemo: Ss,
		useReducer: Vo,
		useRef: ls,
		useState: function() {
			return Vo(Ro);
		},
		useDebugValue: bs,
		useDeferredValue: function(e, t) {
			var n = B();
			return L === null ? Cs(n, e, t) : ws(n, L.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Vo(Ro)[0], t = B().memoizedState;
			return [typeof e == "boolean" ? e : Fo(e), t];
		},
		useSyncExternalStore: Ho,
		useId: js,
		useHostTransitionStatus: As,
		useFormState: ss,
		useActionState: ss,
		useOptimistic: function(e, t) {
			var n = B();
			return L === null ? (n.baseState = e, [e, n.queue.dispatch]) : Yo(n, L, e, t);
		},
		useMemoCache: Lo,
		useCacheRefresh: Ms
	};
	Ws.useEffectEvent = hs;
	function Gs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ks = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ja(r);
			i.payload = t, n != null && (i.callback = n), t = Ya(e, i, r), t !== null && (hu(t, e, r), Xa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ja(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ya(e, i, r), t !== null && (hu(t, e, r), Xa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Ja(n);
			r.tag = 2, t != null && (r.callback = t), t = Ya(e, r, n), t !== null && (hu(t, e, n), Xa(t, e, n));
		}
	};
	function qs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Ar(n, r) || !Ar(i, a) : !0;
	}
	function Js(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ks.enqueueReplaceState(t, t.state, null);
	}
	function Ys(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Xs(e) {
		ri(e);
	}
	function Zs(e) {
		console.error(e);
	}
	function Qs(e) {
		ri(e);
	}
	function $s(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function ec(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function tc(e, t, n) {
		return n = Ja(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			$s(e, t);
		}, n;
	}
	function nc(e) {
		return e = Ja(e), e.tag = 3, e;
	}
	function rc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				ec(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			ec(t, n, r), typeof i != "function" && (ru === null ? ru = /* @__PURE__ */ new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function ic(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ia(t, n, a, !0), n = co.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return lo === null ? Du() : n.alternate === null && X === 0 && (X = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Aa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Aa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (N) return t = co.current, t === null ? (r !== Ui && (t = Error(i(423), { cause: r }), Xi(Ti(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Ti(r, n), a = tc(e.stateNode, r, a), Za(e, a), X !== 4 && (X = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ui && (e = Error(i(422), { cause: r }), Xi(Ti(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Ti(o, n), Xl === null ? Xl = [o] : Xl.push(o), X !== 4 && (X = 2), t === null) return !0;
		r = Ti(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = tc(n.stateNode, r, e), Za(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = nc(a), rc(a, e, n, r), Za(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ac = Error(i(461)), V = !1;
	function oc(e, t, n, r) {
		t.child = e === null ? Wa(t, null, n, r) : Ua(t, e.child, n, r);
	}
	function sc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return oa(t), r = Eo(e, t, n, o, a, i), s = Ao(), e !== null && !V ? (jo(e, t, i), jc(e, t, i)) : (N && s && Li(t), t.flags |= 1, oc(e, t, r, i), t.child);
	}
	function cc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !gi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, lc(e, t, a, r, i)) : (e = yi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Mc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Ar : n, n(o, r) && e.ref === t.ref) return jc(e, t, i);
		}
		return t.flags |= 1, e = _i(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function lc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Ar(a, r) && e.ref === t.ref) {
				if (V = !1, t.pendingProps = r = a, Mc(e, i)) e.flags & 131072 && (V = !0);
				else return t.lanes = e.lanes, jc(e, t, i);
			}
		}
		return _c(e, t, n, r, i);
	}
	function uc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return fc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ta(t, a === null ? null : a.cachePool), a === null ? oo() : ao(t, a), po(t);
			else return r = t.lanes = 536870912, fc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ta(t, null), oo(), mo(t)) : (Ta(t, a.cachePool), ao(t, a), mo(t), t.memoizedState = null);
		return oc(e, t, i, n), t.child;
	}
	function dc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function fc(e, t, n, r, i) {
		var a = wa();
		return a = a === null ? null : {
			parent: P._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ta(t, null), oo(), po(t), e !== null && ia(e, t, r, !0), t.childLanes = i, null;
	}
	function pc(e, t) {
		return t = Ec({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function mc(e, t, n) {
		return Ua(t, e.child, null, n), e = pc(t, t.pendingProps), e.flags |= 2, ho(t), t.memoizedState = null, e;
	}
	function hc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (N) {
				if (r.mode === "hidden") return e = pc(t, r), t.lanes = 536870912, dc(null, e);
				if (fo(t), (e = M) ? (e = rf(e, Hi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Si(e), n.return = t, t.child = n, Bi = t, M = null)) : e = null, e === null) throw Wi(t);
				return t.lanes = 536870912, null;
			}
			return pc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (fo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = mc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (V || ia(e, t, n, !1), a = (n & e.childLanes) !== 0, V || a) {
				if (r = K, r !== null && (s = st(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ui(e, s), hu(r, e, s), ac;
				Du(), t = mc(e, t, n);
			} else e = o.treeContext, M = cf(s.nextSibling), Bi = t, N = !0, Vi = null, Hi = !1, e !== null && zi(t, e), t = pc(t, r), t.flags |= 4096;
			return t;
		}
		return e = _i(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function gc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function _c(e, t, n, r, i) {
		return oa(t), n = Eo(e, t, n, r, void 0, i), r = Ao(), e !== null && !V ? (jo(e, t, i), jc(e, t, i)) : (N && r && Li(t), t.flags |= 1, oc(e, t, n, i), t.child);
	}
	function vc(e, t, n, r, i, a) {
		return oa(t), t.updateQueue = null, n = Oo(t, r, n, i), Do(e), r = Ao(), e !== null && !V ? (jo(e, t, a), jc(e, t, a)) : (N && r && Li(t), t.flags |= 1, oc(e, t, n, a), t.child);
	}
	function yc(e, t, n, r, i) {
		if (oa(t), t.stateNode === null) {
			var a = pi, o = n.contextType;
			typeof o == "object" && o && (a = sa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ks, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ka(t), o = n.contextType, a.context = typeof o == "object" && o ? sa(o) : pi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Gs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ks.enqueueReplaceState(a, a.state, null), eo(t, r, a, i), $a(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ys(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = pi, typeof u == "object" && u && (o = sa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Js(t, a, r, o), Ga = !1;
			var f = t.memoizedState;
			a.state = f, eo(t, r, a, i), $a(), l = t.memoizedState, s || f !== l || Ga ? (typeof d == "function" && (Gs(t, n, d, r), l = t.memoizedState), (c = Ga || qs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, qa(e, t), o = t.memoizedProps, u = Ys(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = pi, typeof l == "object" && l && (c = sa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Js(t, a, r, c), Ga = !1, f = t.memoizedState, a.state = f, eo(t, r, a, i), $a();
			var p = t.memoizedState;
			o !== d || f !== p || Ga || e !== null && e.dependencies !== null && aa(e.dependencies) ? (typeof s == "function" && (Gs(t, n, s, r), p = t.memoizedState), (u = Ga || qs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && aa(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, gc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ua(t, e.child, null, i), t.child = Ua(t, null, n, i)) : oc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = jc(e, t, i), e;
	}
	function bc(e, t, n, r) {
		return Ji(), t.flags |= 256, oc(e, t, n, r), t.child;
	}
	var xc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Sc(e) {
		return {
			baseLanes: e,
			cachePool: Ea()
		};
	}
	function Cc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function wc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(F.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (N) {
				if (a ? uo(t) : mo(t), (e = M) ? (e = rf(e, Hi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Si(e), n.return = t, t.child = n, Bi = t, M = null)) : e = null, e === null) throw Wi(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (mo(t), a = t.mode, c = Ec({
				mode: "hidden",
				children: c
			}, a), r = bi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = Sc(n), r.childLanes = Cc(e, s, n), t.memoizedState = xc, dc(null, r)) : (uo(t), Tc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (uo(t), t.flags &= -257, t = Dc(e, t, n)) : t.memoizedState === null ? (mo(t), c = r.fallback, a = t.mode, r = Ec({
				mode: "visible",
				children: r.children
			}, a), c = bi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ua(t, e.child, null, n), r = t.child, r.memoizedState = Sc(n), r.childLanes = Cc(e, s, n), t.memoizedState = xc, t = dc(null, r)) : (mo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (uo(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Xi({
					value: r,
					source: null,
					stack: null
				}), t = Dc(e, t, n);
			} else if (V || ia(e, t, n, !1), s = (n & e.childLanes) !== 0, V || s) {
				if (s = K, s !== null && (r = st(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ui(e, r), hu(s, e, r), ac;
				af(c) || Du(), t = Dc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, M = cf(c.nextSibling), Bi = t, N = !0, Vi = null, Hi = !1, e !== null && zi(t, e), t = Tc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (mo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = _i(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = bi(c, a, n, null), c.flags |= 2) : c = _i(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, dc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = Sc(n) : (a = c.cachePool, a === null ? a = Ea() : (l = P._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = Cc(e, s, n), t.memoizedState = xc, dc(e.child, r)) : (uo(t), n = e.child, e = n.sibling, n = _i(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Tc(e, t) {
		return t = Ec({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Ec(e, t) {
		return e = hi(22, e, null, t), e.lanes = 0, e;
	}
	function Dc(e, t, n) {
		return Ua(t, e.child, null, n), e = Tc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Oc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), na(e.return, t, n);
	}
	function kc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Ac(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = F.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, A(F, o), oc(e, t, r, n), r = N ? ki : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Oc(e, n, t);
			else if (e.tag === 19) Oc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && go(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), kc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && go(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				kc(t, !0, n, null, a, r);
				break;
			case "together":
				kc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function jc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ia(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = _i(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = _i(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Mc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && aa(e)));
	}
	function Nc(e, t, n) {
		switch (t.tag) {
			case 3:
				_e(t, t.stateNode.containerInfo), ea(t, P, e.memoizedState.cache), Ji();
				break;
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				_e(t, t.stateNode.containerInfo);
				break;
			case 10:
				ea(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, fo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (uo(t), e = jc(e, t, n), e === null ? null : e.sibling) : wc(e, t, n) : (uo(t), t.flags |= 128, null);
				uo(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (ia(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Ac(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), A(F, F.current), r) break;
				return null;
			case 22: return t.lanes = 0, uc(e, t, n, t.pendingProps);
			case 24: ea(t, P, e.memoizedState.cache);
		}
		return jc(e, t, n);
	}
	function Pc(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) V = !0;
			else {
				if (!Mc(e, n) && !(t.flags & 128)) return V = !1, Nc(e, t, n);
				V = !!(e.flags & 131072);
			}
		} else V = !1, N && t.flags & 1048576 && Ii(t, ki, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Na(t.elementType), t.type = e, typeof e == "function") gi(e) ? (r = Ys(e, r), t.tag = 1, t = yc(null, t, e, r, n)) : (t.tag = 0, t = _c(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === C) {
								t.tag = 11, t = sc(null, t, e, r, n);
								break a;
							}
							if (a === re) {
								t.tag = 14, t = cc(null, t, e, r, n);
								break a;
							}
						}
						throw t = le(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return _c(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ys(r, t.pendingProps), yc(e, t, r, a, n);
			case 3:
				a: {
					if (_e(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, qa(e, t), eo(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ea(t, P, r), r !== o.cache && ra(t, [P], n, !0), $a(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = bc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Ti(Error(i(424)), t), Xi(a), t = bc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (M = cf(e.firstChild), Bi = t, N = !0, Vi = null, Hi = !0, n = Wa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Ji(), r === a) {
							t = jc(e, t, n);
							break a;
						}
						oc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return gc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : N || (n = t.type, e = t.pendingProps, r = Bd(he.current).createElement(n), r[pt] = t, r[mt] = e, Pd(r, n, e), Et(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ye(t), e === null && N && (r = t.stateNode = ff(t.type, t.pendingProps, he.current), Bi = t, Hi = !0, a = M, Zd(t.type) ? (lf = a, M = cf(r.firstChild)) : M = a), oc(e, t, t.pendingProps.children, n), gc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && N && ((a = r = M) && (r = tf(r, t.type, t.pendingProps, Hi), r === null ? a = !1 : (t.stateNode = r, Bi = t, M = cf(r.firstChild), Hi = !1, a = !0)), a || Wi(t)), ye(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Eo(e, t, ko, null, null, n), Qf._currentValue = a), gc(e, t), oc(e, t, r, n), t.child;
			case 6: return e === null && N && ((e = n = M) && (n = nf(n, t.pendingProps, Hi), n === null ? e = !1 : (t.stateNode = n, Bi = t, M = null, e = !0)), e || Wi(t)), null;
			case 13: return wc(e, t, n);
			case 4: return _e(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ua(t, null, r, n) : oc(e, t, r, n), t.child;
			case 11: return sc(e, t, t.type, t.pendingProps, n);
			case 7: return oc(e, t, t.pendingProps, n), t.child;
			case 8: return oc(e, t, t.pendingProps.children, n), t.child;
			case 12: return oc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, ea(t, t.type, r.value), oc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, oa(t), a = sa(a), r = r(a), t.flags |= 1, oc(e, t, r, n), t.child;
			case 14: return cc(e, t, t.type, t.pendingProps, n);
			case 15: return lc(e, t, t.type, t.pendingProps, n);
			case 19: return Ac(e, t, n);
			case 31: return hc(e, t, n);
			case 22: return uc(e, t, n, t.pendingProps);
			case 24: return oa(t), r = sa(P), e === null ? (a = wa(), a === null && (a = K, o = pa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ka(t), ea(t, P, a)) : ((e.lanes & n) !== 0 && (qa(e, t), eo(t, null, null, n), $a()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ea(t, P, r), r !== a.cache && ra(t, [P], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ea(t, P, r))), oc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Fc(e) {
		e.flags |= 4;
	}
	function Ic(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (wu()) e.flags |= 8192;
				else throw Pa = Aa, Oa;
			}
		} else e.flags &= -16777217;
	}
	function Lc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) {
			if (wu()) e.flags |= 8192;
			else throw Pa = Aa, Oa;
		}
	}
	function Rc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : tt(), e.lanes |= t, Yl |= t);
	}
	function zc(e, t) {
		if (!N) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function H(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Bc(e, t, n) {
		var r = t.pendingProps;
		switch (Ri(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return H(t), null;
			case 1: return H(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ta(P), ve(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (qi(t) ? Fc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Yi())), H(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Fc(t), o === null ? (H(t), Ic(t, a, null, r, n)) : (H(t), Lc(t, o))) : o ? o === e.memoizedState ? (H(t), t.flags &= -16777217) : (Fc(t), H(t), Lc(t, o)) : (e = e.memoizedProps, e !== r && Fc(t), H(t), Ic(t, a, e, r, n)), null;
			case 27:
				if (j(t), n = he.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Fc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return H(t), null;
					}
					e = pe.current, qi(t) ? Gi(t, e) : (e = ff(a, r, n), t.stateNode = e, Fc(t));
				}
				return H(t), null;
			case 5:
				if (j(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Fc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return H(t), null;
					}
					if (o = pe.current, qi(t)) Gi(t, o);
					else {
						var s = Bd(he.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[pt] = t, o[mt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Fc(t);
					}
				}
				return H(t), Ic(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Fc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = he.current, qi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Bi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[pt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Wi(t, !0);
					} else e = Bd(e).createTextNode(r), e[pt] = t, t.stateNode = e;
				}
				return H(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = qi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[pt] = t;
						} else Ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						H(t), e = !1;
					} else n = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (ho(t), t) : (ho(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return H(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = qi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[pt] = t;
						} else Ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						H(t), a = !1;
					} else a = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (ho(t), t) : (ho(t), null);
				}
				return ho(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Rc(t, t.updateQueue), H(t), null);
			case 4: return ve(), e === null && Sd(t.stateNode.containerInfo), H(t), null;
			case 10: return ta(t.type), H(t), null;
			case 19:
				if (k(F), r = t.memoizedState, r === null) return H(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) zc(r, !1);
					else {
						if (X !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = go(e), o !== null) {
								for (t.flags |= 128, zc(r, !1), e = o.updateQueue, t.updateQueue = e, Rc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) vi(n, e), n = n.sibling;
								return A(F, F.current & 1 | 2), N && Fi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Me() > tu && (t.flags |= 128, a = !0, zc(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = go(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Rc(t, e), zc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !N) return H(t), null;
						} else 2 * Me() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, zc(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (H(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Me(), e.sibling = null, n = F.current, A(F, a ? n & 1 | 2 : n & 1), N && Fi(t, r.treeForkCount), e);
			case 22:
			case 23: return ho(t), so(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (H(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : H(t), n = t.updateQueue, n !== null && Rc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && k(Ca), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ta(P), H(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Vc(e, t) {
		switch (Ri(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ta(P), ve(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return j(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (ho(t), t.alternate === null) throw Error(i(340));
					Ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (ho(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return k(F), null;
			case 4: return ve(), null;
			case 10: return ta(t.type), null;
			case 22:
			case 23: return ho(t), so(), e !== null && k(Ca), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ta(P), null;
			case 25: return null;
			default: return null;
		}
	}
	function Hc(e, t) {
		switch (Ri(t), t.tag) {
			case 3:
				ta(P), ve();
				break;
			case 26:
			case 27:
			case 5:
				j(t);
				break;
			case 4:
				ve();
				break;
			case 31:
				t.memoizedState !== null && ho(t);
				break;
			case 13:
				ho(t);
				break;
			case 19:
				k(F);
				break;
			case 10:
				ta(t.type);
				break;
			case 22:
			case 23:
				ho(t), so(), e !== null && k(Ca);
				break;
			case 24: ta(P);
		}
	}
	function Uc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Wc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Gc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				no(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Kc(e, t, n) {
		n.props = Ys(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function qc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Jc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Z(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Z(e, t, n);
			}
			else n.current = null;
		}
	}
	function Yc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Xc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[mt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Zc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Qc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Zc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function $c(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = sn));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for ($c(e, t, n), e = e.sibling; e !== null;) $c(e, t, n), e = e.sibling;
	}
	function el(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (el(e, t, n), e = e.sibling; e !== null;) el(e, t, n), e = e.sibling;
	}
	function tl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[pt] = e, t[mt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var nl = !1, U = !1, rl = !1, il = typeof WeakSet == "function" ? WeakSet : Set, al = null;
	function ol(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Pr(e), Fr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, al = t; al !== null;) if (t = al, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, al = e;
		else for (; al !== null;) {
			switch (t = al, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ys(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, al = e;
				break;
			}
			al = t.return;
		}
	}
	function sl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, n), r & 4 && Uc(5, n);
				break;
			case 1:
				if (xl(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Z(n, n.return, e);
					}
					else {
						var i = Ys(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Z(n, n.return, e);
						}
					}
				}
				r & 64 && Gc(n), r & 512 && qc(n, n.return);
				break;
			case 3:
				if (xl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						no(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && tl(n);
			case 26:
			case 5:
				xl(e, n), t === null && r & 4 && Yc(n), r & 512 && qc(n, n.return);
				break;
			case 12:
				xl(e, n);
				break;
			case 31:
				xl(e, n), r & 4 && fl(e, n);
				break;
			case 13:
				xl(e, n), r & 4 && pl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || nl, !r) {
					t = t !== null && t.memoizedState !== null || U, i = nl;
					var a = U;
					nl = r, (U = t) && !a ? Cl(e, n, !!(n.subtreeFlags & 8772)) : xl(e, n), nl = i, U = a;
				}
				break;
			case 30: break;
			default: xl(e, n);
		}
	}
	function cl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, cl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && xt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var W = null, ll = !1;
	function ul(e, t, n) {
		for (n = n.child; n !== null;) dl(e, t, n), n = n.sibling;
	}
	function dl(e, t, n) {
		if (He && typeof He.onCommitFiberUnmount == "function") try {
			He.onCommitFiberUnmount(Ve, n);
		} catch {}
		switch (n.tag) {
			case 26:
				U || Jc(n, t), ul(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				U || Jc(n, t);
				var r = W, i = ll;
				Zd(n.type) && (W = n.stateNode, ll = !1), ul(e, t, n), pf(n.stateNode), W = r, ll = i;
				break;
			case 5: U || Jc(n, t);
			case 6:
				if (r = W, i = ll, W = null, ul(e, t, n), W = r, ll = i, W !== null) {
					if (ll) try {
						(W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
					else try {
						W.removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
				}
				break;
			case 18:
				W !== null && (ll ? (e = W, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(W, n.stateNode));
				break;
			case 4:
				r = W, i = ll, W = n.stateNode.containerInfo, ll = !0, ul(e, t, n), W = r, ll = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Wc(2, n, t), U || Wc(4, n, t), ul(e, t, n);
				break;
			case 1:
				U || (Jc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Kc(n, t, r)), ul(e, t, n);
				break;
			case 21:
				ul(e, t, n);
				break;
			case 22:
				U = (r = U) || n.memoizedState !== null, ul(e, t, n), U = r;
				break;
			default: ul(e, t, n);
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function pl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function ml(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new il()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new il()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function hl(e, t) {
		var n = ml(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function gl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							W = c.stateNode, ll = !1;
							break a;
						}
						break;
					case 5:
						W = c.stateNode, ll = !1;
						break a;
					case 3:
					case 4:
						W = c.stateNode.containerInfo, ll = !0;
						break a;
				}
				c = c.return;
			}
			if (W === null) throw Error(i(160));
			dl(o, s, a), W = null, ll = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) vl(t, e), t = t.sibling;
	}
	var _l = null;
	function vl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				gl(t, e), yl(e), r & 4 && (Wc(3, e, e.return), Uc(3, e), Wc(5, e, e.return));
				break;
			case 1:
				gl(t, e), yl(e), r & 512 && (U || n === null || Jc(n, n.return)), r & 64 && nl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = _l;
				if (gl(t, e), yl(e), r & 512 && (U || n === null || Jc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) {
						if (r === null) {
							if (e.stateNode === null) {
								a: {
									r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
									b: switch (r) {
										case "title":
											o = a.getElementsByTagName("title")[0], (!o || o[bt] || o[pt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[pt] = e, Et(o), r = o;
											break a;
										case "link":
											var s = Vf("link", "href", a).get(r + (n.href || ""));
											if (s) {
												for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
											break;
										case "meta":
											if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
												for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
											break;
										default: throw Error(i(468, r));
									}
									o[pt] = e, Et(o), r = o;
								}
								e.stateNode = r;
							} else Hf(a, e.type, e.stateNode);
						} else e.stateNode = If(a, r, e.memoizedProps);
					} else o === r ? r === null && e.stateNode !== null && Xc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				gl(t, e), yl(e), r & 512 && (U || n === null || Jc(n, n.return)), n !== null && r & 4 && Xc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (gl(t, e), yl(e), r & 512 && (U || n === null || Jc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Qt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Xc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (rl = !0);
				break;
			case 6:
				if (gl(t, e), yl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = _l, _l = gf(t.containerInfo), gl(t, e), _l = a, yl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				rl && (rl = !1, bl(e));
				break;
			case 4:
				r = _l, _l = gf(e.stateNode.containerInfo), gl(t, e), yl(e), _l = r;
				break;
			case 12:
				gl(t, e), yl(e);
				break;
			case 31:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 13:
				gl(t, e), yl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = Me()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = nl, d = U;
				if (nl = u || a, U = d || l, gl(t, e), U = d, nl = u, yl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || nl || U || Sl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, hl(e, n))));
				break;
			case 19:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: gl(t, e), yl(e);
		}
	}
	function yl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Zc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						el(e, Qc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Qt(o, ""), n.flags &= -33), el(e, Qc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						$c(e, Qc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function bl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			bl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function xl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) sl(e, t.alternate, t), t = t.sibling;
	}
	function Sl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Wc(4, t, t.return), Sl(t);
					break;
				case 1:
					Jc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Kc(t, t.return, n), Sl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Jc(t, t.return), Sl(t);
					break;
				case 22:
					t.memoizedState === null && Sl(t);
					break;
				case 30:
					Sl(t);
					break;
				default: Sl(t);
			}
			e = e.sibling;
		}
	}
	function Cl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Cl(i, a, n), Uc(4, a);
					break;
				case 1:
					if (Cl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) to(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Gc(a), qc(a, a.return);
					break;
				case 27: tl(a);
				case 26:
				case 5:
					Cl(i, a, n), n && r === null && o & 4 && Yc(a), qc(a, a.return);
					break;
				case 12:
					Cl(i, a, n);
					break;
				case 31:
					Cl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 13:
					Cl(i, a, n), n && o & 4 && pl(i, a);
					break;
				case 22:
					a.memoizedState === null && Cl(i, a, n), qc(a, a.return);
					break;
				case 30: break;
				default: Cl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ma(n));
	}
	function Tl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ma(e));
	}
	function El(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Dl(e, t, n, r), t = t.sibling;
	}
	function Dl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				El(e, t, n, r), i & 2048 && Uc(9, t);
				break;
			case 1:
				El(e, t, n, r);
				break;
			case 3:
				El(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ma(e)));
				break;
			case 12:
				if (i & 2048) {
					El(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else El(e, t, n, r);
				break;
			case 31:
				El(e, t, n, r);
				break;
			case 13:
				El(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? El(e, t, n, r) : (a._visibility |= 2, Ol(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? El(e, t, n, r) : kl(e, t), i & 2048 && wl(o, t);
				break;
			case 24:
				El(e, t, n, r), i & 2048 && Tl(t.alternate, t);
				break;
			default: El(e, t, n, r);
		}
	}
	function Ol(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ol(a, o, s, c, i), Uc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ol(a, o, s, c, i)) : u._visibility & 2 ? Ol(a, o, s, c, i) : kl(a, o), i && l & 2048 && wl(o.alternate, o);
					break;
				case 24:
					Ol(a, o, s, c, i), i && l & 2048 && Tl(o.alternate, o);
					break;
				default: Ol(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function kl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					kl(n, r), i & 2048 && wl(r.alternate, r);
					break;
				case 24:
					kl(n, r), i & 2048 && Tl(r.alternate, r);
					break;
				default: kl(n, r);
			}
			t = t.sibling;
		}
	}
	var Al = 8192;
	function jl(e, t, n) {
		if (e.subtreeFlags & Al) for (e = e.child; e !== null;) Ml(e, t, n), e = e.sibling;
	}
	function Ml(e, t, n) {
		switch (e.tag) {
			case 26:
				jl(e, t, n), e.flags & Al && e.memoizedState !== null && Gf(n, _l, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				jl(e, t, n);
				break;
			case 3:
			case 4:
				var r = _l;
				_l = gf(e.stateNode.containerInfo), jl(e, t, n), _l = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Al, Al = 16777216, jl(e, t, n), Al = r) : jl(e, t, n));
				break;
			default: jl(e, t, n);
		}
	}
	function Nl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Fl(e), e = e.sibling;
	}
	function Fl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Pl(e), e.flags & 2048 && Wc(9, e, e.return);
				break;
			case 3:
				Pl(e);
				break;
			case 12:
				Pl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Il(e)) : Pl(e);
				break;
			default: Pl(e);
		}
	}
	function Il(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Wc(8, t, t.return), Il(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Il(t));
					break;
				default: Il(t);
			}
			e = e.sibling;
		}
	}
	function Ll(e, t) {
		for (; al !== null;) {
			var n = al;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Wc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ma(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, al = r;
			else a: for (n = e; al !== null;) {
				r = al;
				var i = r.sibling, a = r.return;
				if (cl(r), r === n) {
					al = null;
					break a;
				}
				if (i !== null) {
					i.return = a, al = i;
					break a;
				}
				al = a;
			}
		}
	}
	var Rl = {
		getCacheForType: function(e) {
			var t = sa(P), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return sa(P).controller.signal;
		}
	}, zl = typeof WeakMap == "function" ? WeakMap : Map, G = 0, K = null, q = null, J = 0, Y = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, X = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return G & 2 && J !== 0 ? J & -J : T.T === null ? ut() : dd();
	}
	function mu() {
		if (Jl === 0) {
			if (!(J & 536870912) || N) {
				var e = Ye;
				Ye <<= 1, !(Ye & 3932160) && (Ye = 262144), Jl = e;
			} else Jl = 536870912;
		}
		return e = co.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === K && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, J, Jl, !1)), rt(e, n), (!(G & 2) || e !== K) && (e === K && (!(G & 2) && (Kl |= n), X === 4 && yu(e, J, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (G & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || $e(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Hl && !r && yu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !vu(n)) {
				a = Ou(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = Xl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
							if (Ul && !l) {
								c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
								break a;
							}
							o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				Su(e, 0), yu(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						yu(r, t, Jl, !Vl);
						break a;
					case 2:
						Zl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = $l + 300 - Me(), 10 < a)) {
					if (yu(r, t, Jl, !Vl), Qe(r, 0, !0) !== 0) break a;
					su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, o, "Throttled", -0, 0), a);
					break a;
				}
				_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, o, null, -0, 0);
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: sn
			}, Ml(t, a, d);
			var m = (a & 62914560) === a ? $l - Me() : (a & 4194048) === a ? eu - Me() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!kr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - We(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && at(e, n, t);
	}
	function bu() {
		return G & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (q !== null) {
			if (Y === 0) var e = q.return;
			else e = q, $i = Qi = null, Mo(e), La = null, Ra = 0, e = q;
			for (; e !== null;) Hc(e.alternate, e), e = e.return;
			q = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), K = e, q = n = _i(e.current, null), J = t, Y = 0, Bl = null, Vl = !1, Hl = $e(e, t), Ul = !1, Yl = Jl = ql = Kl = Gl = X = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - We(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, si(), n;
	}
	function Cu(e, t) {
		I = null, T.H = Vs, t === Da || t === ka ? (t = Fa(), Y = 3) : t === Oa ? (t = Fa(), Y = 4) : Y = t === ac ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, q === null && (X = 1, $s(e, Ti(t, e.current)));
	}
	function wu() {
		var e = co.current;
		return e === null ? !0 : (J & 4194048) === J ? lo === null : (J & 62914560) === J || J & 536870912 ? e === lo : !1;
	}
	function Tu() {
		var e = T.H;
		return T.H = Vs, e === null ? Vs : e;
	}
	function Eu() {
		var e = T.A;
		return T.A = Rl, e;
	}
	function Du() {
		X = 4, Vl || (J & 4194048) !== J && co.current !== null || (Hl = !0), !(Gl & 134217727) && !(Kl & 134217727) || K === null || yu(K, J, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = G;
		G |= 2;
		var i = Tu(), a = Eu();
		(K !== e || J !== t) && (nu = null, Su(e, t)), t = !1;
		var o = X;
		a: do
			try {
				if (Y !== 0 && q !== null) {
					var s = q, c = Bl;
					switch (Y) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							co.current === null && (t = !0);
							var l = Y;
							if (Y = 0, Bl = null, Pu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = Y, Y = 0, Bl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = X;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, $i = Qi = null, G = r, T.H = i, T.A = a, q === null && (K = null, J = 0, si()), o;
	}
	function ku() {
		for (; q !== null;) Mu(q);
	}
	function Au(e, t) {
		var n = G;
		G |= 2;
		var r = Tu(), a = Eu();
		K !== e || J !== t ? (nu = null, tu = Me() + 500, Su(e, t)) : Hl = $e(e, t);
		a: do
			try {
				if (Y !== 0 && q !== null) {
					t = q;
					var o = Bl;
					b: switch (Y) {
						case 1:
							Y = 0, Bl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ja(o)) {
								Y = 0, Bl = null, Nu(t);
								break;
							}
							t = function() {
								Y !== 2 && Y !== 9 || K !== e || (Y = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Y = 7;
							break a;
						case 4:
							Y = 5;
							break a;
						case 7:
							ja(o) ? (Y = 0, Bl = null, Nu(t)) : (Y = 0, Bl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (q.tag) {
								case 26: s = q.memoizedState;
								case 5:
								case 27:
									var c = q;
									if (s ? Wf(s) : c.stateNode.complete) {
										Y = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) q = l;
										else {
											var u = c.return;
											u === null ? q = null : (q = u, Fu(u));
										}
										break b;
									}
							}
							Y = 0, Bl = null, Pu(e, t, o, 5);
							break;
						case 6:
							Y = 0, Bl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), X = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return $i = Qi = null, T.H = r, T.A = a, G = n, q === null ? (K = null, J = 0, si(), X) : 0;
	}
	function ju() {
		for (; q !== null && !Ae();) Mu(q);
	}
	function Mu(e) {
		var t = Pc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = vc(n, t, t.pendingProps, t.type, void 0, J);
				break;
			case 11:
				t = vc(n, t, t.pendingProps, t.type.render, t.ref, J);
				break;
			case 5: Mo(t);
			default: Hc(n, t), t = q = vi(t, Wl), t = Pc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Pu(e, t, n, r) {
		$i = Qi = null, Mo(t), La = null, Ra = 0;
		var i = t.return;
		try {
			if (ic(e, i, t, n, J)) {
				X = 1, $s(e, Ti(n, e.current)), q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw q = i, t;
			X = 1, $s(e, Ti(n, e.current)), q = null;
			return;
		}
		t.flags & 32768 ? (N || r === 1 ? e = !0 : Hl || J & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = co.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Vl);
				return;
			}
			e = t.return;
			var n = Bc(t.alternate, t, Wl);
			if (n !== null) {
				q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				q = t;
				return;
			}
			q = t = e;
		} while (t !== null);
		X === 0 && (X = 5);
	}
	function Iu(e, t) {
		do {
			var n = Vc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				q = e;
				return;
			}
			q = e = n;
		} while (e !== null);
		X = 6, q = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (G & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= oi, it(e, n, o, s, c, l), e === K && (q = K = null, J = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Ie, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = T.T, T.T = null, a = E.p, E.p = 2, s = G, G |= 4;
				try {
					ol(e, t, n);
				} finally {
					G = s, E.p = a, T.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = T.T, T.T = null;
				var r = E.p;
				E.p = 2;
				var i = G;
				G |= 4;
				try {
					vl(t, e);
					var a = zd, o = Pr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Nr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Fr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Mr(s, h), v = Mr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					G = i, E.p = r, T.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = T.T, T.T = null;
				var r = E.p;
				E.p = 2;
				var i = G;
				G |= 4;
				try {
					sl(e, t.alternate, t);
				} finally {
					G = i, E.p = r, T.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, je();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), lt(n), t = t.stateNode, He && typeof He.onCommitFiberRoot == "function") try {
				He.onCommitFiberRoot(Ve, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = T.T, i = E.p, E.p = 2, T.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					T.T = t, E.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ma(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = lt(su), r = T.T, a = E.p;
		try {
			E.p = 32 > n ? 32 : n, T.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, G & 6) throw Error(i(331));
			var c = G;
			if (G |= 4, Fl(o.current), Dl(o, o.current, s, n), G = c, id(0, !1), He && typeof He.onPostCommitFiberRoot == "function") try {
				He.onPostCommitFiberRoot(Ve, o);
			} catch {}
			return !0;
		} finally {
			E.p = a, T.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = Ti(n, t), t = tc(e.stateNode, t, 2), e = Ya(e, t, 2), e !== null && (rt(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = Ti(n, e), n = nc(2), r = Ya(t, n, 2), r !== null && (rc(n, r, t, e), rt(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new zl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, K === e && (J & n) === n && (X === 4 || X === 3 && (J & 62914560) === J && 300 > Me() - $l ? !(G & 2) && Su(e, 0) : ql |= n, Yl === J && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = tt()), e = ui(e, t), e !== null && (rt(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return Oe(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - We(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, ld(r, a));
						} else a = J, a = Qe(r, r === K ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || $e(r, a) || (n = !0, ld(r, a));
					}
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = Me(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - We(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = et(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = K, n = J, n = Qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ke(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || $e(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && ke(r), lt(n)) {
				case 2:
				case 8:
					n = Fe;
					break;
				case 32:
					n = Ie;
					break;
				case 268435456:
					n = Re;
					break;
				default: n = Ie;
			}
			return r = cd.bind(null, e), n = Oe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ke(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = J;
		return r = Qe(e, e === K ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, Me()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			G & 6 ? Oe(Pe, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = _a;
			e === 0 && (e = Je, Je <<= 1, !(Je & 261888) && (Je = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : on("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[mt] || null).action), o = r.submitter;
			o && (t = (t = o[mt] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new On("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								Ds(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), Ds(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var hd = 0; hd < ti.length; hd++) {
		var gd = ti[hd];
		ni(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	ni(qr, "onAnimationEnd"), ni(Jr, "onAnimationIteration"), ni(Yr, "onAnimationStart"), ni("dblclick", "onDoubleClick"), ni("focusin", "onFocus"), ni("focusout", "onBlur"), ni(Xr, "onTransitionRun"), ni(Zr, "onTransitionStart"), ni(Qr, "onTransitionCancel"), ni($r, "onTransitionEnd"), At("onMouseEnter", ["mouseout", "mouseover"]), At("onMouseLeave", ["mouseout", "mouseover"]), At("onPointerEnter", ["pointerout", "pointerover"]), At("onPointerLeave", ["pointerout", "pointerover"]), kt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), kt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), kt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), kt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), kt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), kt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ri(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ri(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[gt];
		n === void 0 && (n = t[gt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, Dt.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !_n || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = St(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		mn(function() {
			var r = a, i = ln(n), s = [];
			a: {
				var c = ei.get(e);
				if (c !== void 0) {
					var l = On, u = e;
					switch (e) {
						case "keypress": if (Cn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Kn;
							break;
						case "focusin":
							u = "focus", l = Ln;
							break;
						case "focusout":
							u = "blur", l = Ln;
							break;
						case "beforeblur":
						case "afterblur":
							l = Ln;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Fn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = In;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Jn;
							break;
						case qr:
						case Jr:
						case Yr:
							l = Rn;
							break;
						case $r:
							l = Yn;
							break;
						case "scroll":
						case "scrollend":
							l = An;
							break;
						case "wheel":
							l = Xn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = zn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = qn;
							break;
						case "toggle":
						case "beforetoggle": l = Zn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = hn(m, p), g != null && d.push(Td(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== cn && (u = n.relatedTarget || n.fromElement) && (St(u) || u[ht])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? St(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Fn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = qn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : wt(l), h = u == null ? c : wt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, St(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? wt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = _r;
					else if (dr(c)) {
						if (vr) v = Dr;
						else {
							v = Tr;
							var y = wr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && nn(r.elementType) && (v = _r) : v = Er;
					if (v &&= v(e, r)) {
						fr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Jt(c, "number", c.value);
				}
				switch (y = r ? wt(r) : window, e) {
					case "focusin":
						(dr(y) || y.contentEditable === "true") && (Lr = y, Rr = r, zr = null);
						break;
					case "focusout":
						zr = Rr = Lr = null;
						break;
					case "mousedown":
						Br = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Br = !1, Vr(s, n, i);
						break;
					case "selectionchange": if (Ir) break;
					case "keydown":
					case "keyup": Vr(s, n, i);
				}
				var b;
				if ($n) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else sr ? ar(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (nr && n.locale !== "ko" && (sr || x !== "onCompositionStart" ? x === "onCompositionEnd" && sr && (b = Sn()) : (yn = i, bn = "value" in yn ? yn.value : yn.textContent, sr = !0)), y = Ed(r, x), 0 < y.length && (x = new Bn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = or(n), b !== null && (x.data = b)))), (b = tr ? cr(e, n) : lr(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new Bn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), md(s, e, r, n, i);
			}
			yd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = hn(e, n), i != null && r.unshift(Td(e, i, a)), i = hn(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = hn(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = hn(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Qt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Qt(e, "" + r);
				break;
			case "className":
				It(e, "class", r);
				break;
			case "tabIndex":
				It(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				It(e, n, r);
				break;
			case "style":
				tn(e, r, o);
				break;
			case "data": if (t !== "object") {
				It(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = on("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = on("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = sn);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = on("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), Ft(e, "popover", r);
				break;
			case "xlinkActuate":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Ft(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = rn.get(n) || n, Ft(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				tn(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Qt(e, r) : (typeof r == "number" || typeof r == "bigint") && Qt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = sn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Ot.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[mt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Ft(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				qt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Yt(e, !!r, n, !0) : Yt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				Zt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (nn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Kt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Yt(e, !!n, n ? [] : "", !1) : Yt(e, !!n, t, !0)) : Yt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				Xt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (nn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Wd && (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Np(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") pf(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, pf(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[bt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && pf(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), xt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[bt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		xt(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = E.d;
	E.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = Ct(e);
		t !== null && t.tag === 5 && t.type === "form" ? ks(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Gt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), Et(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Gt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Gt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Gt(n.imageSizes) + "\"]")) : i += "[href=\"" + Gt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), Et(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Gt(r) + "\"][href=\"" + Gt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), Et(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = Tt(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					Et(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = Tt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), Et(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = Tt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), Et(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = he.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = Tt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = Tt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = Tt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + Gt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), Et(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Gt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Gt(n.href) + "\"]");
				if (r) return t.instance = r, Et(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Et(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Et(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), Et(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, Et(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Et(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[bt] || a[pt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Et(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), Et(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: S,
		Provider: null,
		Consumer: null,
		_currentValue: de,
		_currentValue2: de,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = nt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nt(0), this.hiddenUpdates = nt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = hi(3, null, null, t), e.current = a, a.stateNode = e, t = pa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ka(a), e;
	}
	function tp(e) {
		return e ? (e = pi, e) : pi;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ja(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ya(e, r, t), n !== null && (hu(n, e, t), Xa(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ui(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = ct(t);
			var n = ui(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = E.p;
		try {
			E.p = 2, up(e, t, n, r);
		} finally {
			E.p = a, T.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = E.p;
		try {
			E.p = 8, up(e, t, n, r);
		} finally {
			E.p = a, T.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = Ct(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ze(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - We(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(G & 6) && (tu = Me() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ui(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = ln(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = St(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Ne()) {
				case Pe: return 2;
				case Fe: return 8;
				case Ie:
				case Le: return 32;
				case Re: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Ct(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = St(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, dt(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, dt(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				cn = r, n.target.dispatchEvent(r), cn = null;
			} else return t = Ct(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = Ct(n);
				a !== null && (e.splice(t, 3), t -= 3, Ds(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[mt] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[mt] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[ht] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ut();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.8") throw Error(i(527, Lp, "19.2.8"));
	E.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: T,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Ve = zp.inject(Rp), He = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Xs, s = Zs, c = Qs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[ht] = t.current, Sd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element");
	function n(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.jsx = n;
})), v = /* @__PURE__ */ o(((e, t) => {
	t.exports = _();
})), y = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Lumira - Advanced Analytics</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <!-- GSAP for Masked Reveal -->\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n</head>\n\n<body class=\"relative min-h-screen overflow-x-hidden flex flex-col font-sans text-[#F2F4FB] bg-[#070914] selection:bg-[#7FC4FF]/30 selection:text-[#7FC4FF]\">\n\n    <!-- WebGL Constellation Canvas Shell & Depth Overlay -->\n    <div class=\"fixed inset-0 -z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#0E1222_0%,_#070914_100%)]\"></div>\n    <div class=\"fixed inset-0 -z-10 pointer-events-none\">\n        <canvas id=\"constellationCanvas\" class=\"w-full h-full\"></canvas>\n    </div>\n    <div class=\"fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-[#0E1222]/40 to-[#070914] opacity-80\"></div>\n\n    <!-- Header (Elevated Glassy UI) -->\n    <nav class=\"w-full relative z-20 bg-[#0E1222]/40 backdrop-blur-md border-b border-[#1C2236] shadow-[0_2px_8px_rgba(0,0,0,0.30)]\">\n        <div class=\"flex justify-between items-center py-5 px-6 md:px-12 max-w-[90rem] mx-auto\">\n            \n            <!-- Brand -->\n            <div class=\"flex items-center gap-2 text-[#F2F4FB]\">\n                <div class=\"relative h-8 w-8 bg-transparent border border-[#1C2236] flex items-center justify-center rounded-md\" style=\"box-shadow: 0 2px 8px rgba(0,0,0,0.30);\">\n                    <span class=\"h-2 w-2 rounded-full bg-[#E6C879]\" style=\"box-shadow: 0 0 12px rgba(230,200,121,0.6);\"></span>\n                </div>\n                <span class=\"text-xl font-thin tracking-tight uppercase ml-1\">Lumira</span>\n            </div>\n\n            <div class=\"hidden md:flex items-center gap-10 text-xs font-normal uppercase text-[#9AA3BC] tracking-widest\">\n                <a href=\"#\" class=\"hover:text-[#F2F4FB] transition-colors hover:shadow-[0_0_8px_rgba(127,196,255,0.4)]\">Features</a>\n                <a href=\"#\" class=\"hover:text-[#F2F4FB] transition-colors hover:shadow-[0_0_8px_rgba(127,196,255,0.4)]\">Use Cases</a>\n                <a href=\"#\" class=\"hover:text-[#F2F4FB] transition-colors hover:shadow-[0_0_8px_rgba(127,196,255,0.4)]\">Developers</a>\n                <a href=\"#\" class=\"hover:text-[#F2F4FB] transition-colors hover:shadow-[0_0_8px_rgba(127,196,255,0.4)]\">Pricing</a>\n            </div>\n\n            <!-- Gradient Border Shell CTA -->\n            <div class=\"p-[1px] rounded-full bg-gradient-to-br from-[#E6C879]/30 to-transparent\">\n                <a href=\"#\" class=\"block bg-[#0E1222]/80 backdrop-blur-sm text-[#E6C879] px-6 py-2.5 rounded-full text-xs font-normal uppercase tracking-widest hover:bg-[#E6C879] hover:text-[#0E1222] transition-colors\">\n                    Get Access\n                </a>\n            </div>\n        </div>\n    </nav>\n\n    <!-- Main Content -->\n    <main class=\"flex-grow flex flex-col items-center justify-center relative z-10 px-6 pt-24 pb-28 md:pt-32 lg:pt-40\">\n\n        <div class=\"max-w-5xl mx-auto w-full flex flex-col items-center text-center\">\n\n            <!-- Trust Indicators -->\n            <div class=\"flex items-center gap-4 mb-12 fade-in-up\" style=\"opacity: 0; transform: translateY(24px); transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);\">\n                <div class=\"flex -space-x-3\">\n                    <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2f563338-39fa-47ea-9761-658d4f3f84db_1600w.jpg\" alt=\"User 1\" class=\"w-12 h-12 rounded-full border border-[#1C2236] object-cover relative z-30 opacity-80 mix-blend-luminosity\">\n                    <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4f5668c5-fc4a-44e0-bc5e-a664189d3c31_1600w.jpg\" alt=\"User 2\" class=\"w-12 h-12 rounded-full border border-[#1C2236] object-cover relative z-20 opacity-80 mix-blend-luminosity\">\n                    <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/eca707cc-a5b7-439a-b4fd-247f6106c2e1_1600w.jpg\" alt=\"User 3\" class=\"w-12 h-12 rounded-full border border-[#1C2236] object-cover relative z-10 opacity-80 mix-blend-luminosity\">\n                </div>\n\n                <div class=\"flex flex-col items-start gap-1\">\n                    <div class=\"flex items-center text-[#E6C879] text-lg\">\n                        <iconify-icon icon=\"solar:star-linear\" stroke-width=\"1.5\"></iconify-icon>\n                        <iconify-icon icon=\"solar:star-linear\" stroke-width=\"1.5\"></iconify-icon>\n                        <iconify-icon icon=\"solar:star-linear\" stroke-width=\"1.5\"></iconify-icon>\n                        <iconify-icon icon=\"solar:star-linear\" stroke-width=\"1.5\"></iconify-icon>\n                        <iconify-icon icon=\"solar:star-linear\" stroke-width=\"1.5\"></iconify-icon>\n                    </div>\n                    <span class=\"text-xs font-normal uppercase text-[#9AA3BC] tracking-widest\">Trusted by 10,000+ data teams</span>\n                </div>\n            </div>\n\n            <!-- Headline (Ultralight System Display - GSAP Masked Reveal) -->\n            <h1 class=\"masked-reveal text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight text-[#F2F4FB] text-center leading-tight max-w-5xl cursor-default\">\n                Uncover hidden patterns<br />with intelligent analytics\n            </h1>\n\n            <!-- Subheadline (GSAP Masked Reveal) -->\n            <p class=\"masked-reveal mt-8 text-lg md:text-xl text-[#9AA3BC] max-w-2xl font-normal leading-relaxed\">\n                Lumira synthesizes complex datasets, disparate sources, and endless metrics into actionable, automated insights that guide your decisions.\n            </p>\n\n            <!-- Chunky CTAs to Refined Border Shells -->\n            <div class=\"flex flex-col sm:flex-row items-center gap-6 mt-14 w-full justify-center fade-in-up\" style=\"opacity: 0; transform: translateY(24px); transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;\">\n                \n                <div class=\"p-[1px] rounded-full bg-gradient-to-br from-[#E6C879]/40 to-transparent w-full sm:w-auto\" style=\"box-shadow: 0 16px 40px rgba(0,0,0,0.36);\">\n                    <a href=\"#\" class=\"w-full sm:w-auto bg-[#E6C879] text-[#0E1222] px-12 py-4 rounded-full font-medium text-xs uppercase tracking-widest hover:bg-[#E6C879]/90 transition-colors flex items-center justify-center\">\n                        Get Access\n                    </a>\n                </div>\n\n                <div class=\"p-[1px] rounded-full bg-gradient-to-br from-[#E6C879]/16 to-transparent w-full sm:w-auto\" style=\"box-shadow: 0 2px 8px rgba(0,0,0,0.30);\">\n                    <a href=\"#\" class=\"w-full sm:w-auto bg-[#0E1222]/60 backdrop-blur-md text-[#F2F4FB] px-10 py-4 rounded-full font-medium text-xs uppercase tracking-widest hover:bg-[#1C2236]/80 transition-colors flex items-center justify-center gap-2 group\">\n                        Explore Demo\n                        <iconify-icon icon=\"solar:arrow-right-linear\" class=\"text-xl text-[#7FC4FF] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all\" stroke-width=\"1.5\"></iconify-icon>\n                    </a>\n                </div>\n\n            </div>\n        </div>\n\n        <!-- Logos Section -->\n        <div class=\"w-full mt-28 md:mt-32 max-w-6xl mx-auto flex flex-col items-center fade-in-up\" style=\"opacity: 0; transform: translateY(24px); transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;\">\n            <p class=\"text-xs font-normal text-[#5C668A] mb-12 tracking-widest uppercase\">Powering data-driven enterprises</p>\n\n            <div class=\"flex flex-wrap justify-center items-center gap-10 md:gap-16\">\n\n                <div class=\"flex items-center gap-2 text-xl font-thin text-[#9AA3BC] hover:text-[#7FC4FF] hover:shadow-[0_0_12px_rgba(127,196,255,0.2)] transition-all cursor-default\">\n                    <iconify-icon icon=\"solar:box-linear\" stroke-width=\"1.5\"></iconify-icon>\n                    Quantus\n                </div>\n\n                <div class=\"flex items-center gap-2 text-lg font-thin text-[#9AA3BC] hover:text-[#7FC4FF] hover:shadow-[0_0_12px_rgba(127,196,255,0.2)] transition-all cursor-default\">\n                    <iconify-icon icon=\"solar:globus-linear\" class=\"text-xl\" stroke-width=\"1.5\"></iconify-icon>\n                    NexusData\n                </div>\n\n                <div class=\"flex items-center gap-2 text-xl font-thin text-[#9AA3BC] hover:text-[#7FC4FF] hover:shadow-[0_0_12px_rgba(127,196,255,0.2)] transition-all cursor-default\">\n                    OmniStream\n                </div>\n\n                <div class=\"flex items-center gap-2 text-lg font-thin text-[#9AA3BC] hover:text-[#7FC4FF] hover:shadow-[0_0_12px_rgba(127,196,255,0.2)] transition-all cursor-default\">\n                    <iconify-icon icon=\"solar:routing-2-linear\" class=\"text-xl\" stroke-width=\"1.5\"></iconify-icon>\n                    Veridian\n                </div>\n\n                <div class=\"flex items-center gap-2 text-lg font-thin text-[#9AA3BC] hover:text-[#7FC4FF] hover:shadow-[0_0_12px_rgba(127,196,255,0.2)] transition-all cursor-default\">\n                    <iconify-icon icon=\"solar:letter-linear\" class=\"text-xl\" stroke-width=\"1.5\"></iconify-icon>\n                    ApexMetrics\n                </div>\n\n                <div class=\"hidden lg:flex items-center gap-2 text-xl font-thin text-[#9AA3BC] hover:text-[#7FC4FF] hover:shadow-[0_0_12px_rgba(127,196,255,0.2)] transition-all cursor-default\">\n                    Zenith\n                </div>\n\n            </div>\n        </div>\n\n    </main>\n\n    <script>\n        // WebGL Drifting Nodes & Network Logic\n        const canvas = document.getElementById('constellationCanvas');\n        const ctx = canvas.getContext('2d');\n        let width, height;\n        let nodes = [];\n        const LINK = 160; \n        const MAX_NODES = window.innerWidth < 768 ? 40 : 85;\n        let pointer = { x: -1000, y: -1000 };\n\n        function resize() {\n            const dpr = Math.min(window.devicePixelRatio || 1, 2);\n            width = window.innerWidth;\n            height = window.innerHeight;\n            canvas.width = Math.max(1, Math.floor(width * dpr));\n            canvas.height = Math.max(1, Math.floor(height * dpr));\n            canvas.style.width = width + 'px';\n            canvas.style.height = height + 'px';\n            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n            ctx.imageSmoothingEnabled = false;\n        }\n        \n        window.addEventListener('resize', () => {\n            resize();\n            initNodes();\n        });\n        resize();\n\n        function initNodes() {\n            nodes = [];\n            for(let i=0; i<MAX_NODES; i++) {\n                nodes.push({\n                    x: Math.random() * width,\n                    y: Math.random() * height,\n                    vx: (Math.random() - 0.5) * 0.3,\n                    vy: (Math.random() - 0.5) * 0.3,\n                    radius: Math.random() * 2.4 + 1.8\n                });\n            }\n        }\n        initNodes();\n\n        // Pointer gravity tracker\n        document.addEventListener('mousemove', e => {\n            pointer.x = e.clientX;\n            pointer.y = e.clientY;\n        });\n\n        // Clear pointer on leave\n        document.addEventListener('mouseleave', () => {\n            pointer.x = -1000;\n            pointer.y = -1000;\n        });\n\n        function dist(a, b) {\n            return Math.hypot(a.x - b.x, a.y - b.y);\n        }\n\n        // Render Loop\n        function animateCanvas() {\n            ctx.clearRect(0, 0, width, height);\n            ctx.lineCap = 'butt';\n            ctx.lineJoin = 'miter';\n            \n            // Draw Links first so nodes sit crisp on top\n            ctx.strokeStyle = '#E6C879';\n            ctx.lineWidth = 1;\n            for (let i = 0; i < nodes.length; i++) {\n                for (let j = i + 1; j < nodes.length; j++) {\n                    const d = dist(nodes[i], nodes[j]);\n                    if (d < LINK) {\n                        ctx.globalAlpha = 0.22 + (1 - d/LINK) * 0.55;\n                        ctx.beginPath();\n                        ctx.moveTo(nodes[i].x, nodes[i].y);\n                        ctx.lineTo(nodes[j].x, nodes[j].y);\n                        ctx.stroke();\n                    }\n                }\n            }\n\n            nodes.forEach(node => {\n                node.x += node.vx;\n                node.y += node.vy;\n                \n                // Bounce off edges\n                if(node.x < 0 || node.x > width) node.vx *= -1;\n                if(node.y < 0 || node.y > height) node.vy *= -1;\n\n                // Gentle Pointer gravity\n                const pd = dist(node, pointer);\n                if(pd < 220) {\n                    node.x -= (node.x - pointer.x) * 0.005;\n                    node.y -= (node.y - pointer.y) * 0.005;\n                }\n                \n                // Draw Node (Pale Gold) — core + soft halo so particles read at retina scale\n                const pulse = 0.78 + Math.sin(Date.now() * 0.001 + node.x) * 0.22;\n                ctx.fillStyle = '#E6C879';\n                ctx.globalAlpha = pulse * 0.28;\n                ctx.beginPath();\n                ctx.arc(node.x, node.y, node.radius * 2.4, 0, Math.PI * 2);\n                ctx.fill();\n                ctx.globalAlpha = pulse;\n                ctx.beginPath();\n                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);\n                ctx.fill();\n            });\n\n            ctx.globalAlpha = 1;\n            requestAnimationFrame(animateCanvas);\n        }\n        \n        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;\n        if (!prefersReducedMotion) {\n            animateCanvas();\n        }\n\n        // --- Intersection Observer for structural fade-ins ---\n        document.addEventListener('DOMContentLoaded', () => {\n            const observer = new IntersectionObserver((entries) => {\n                entries.forEach(entry => {\n                    if (entry.isIntersecting) {\n                        entry.target.style.opacity = '1';\n                        entry.target.style.transform = 'translateY(0)';\n                        observer.unobserve(entry.target);\n                    }\n                });\n            }, { threshold: 0.1 });\n\n            document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));\n        });\n\n        // --- GSAP Masked Staggered Word Reveal ---\n        document.addEventListener('DOMContentLoaded', () => {\n            if (typeof gsap !== 'undefined' && !prefersReducedMotion) {\n                gsap.registerPlugin(ScrollTrigger);\n                \n                const revealElements = document.querySelectorAll('.masked-reveal');\n                \n                revealElements.forEach(el => {\n                    // Non-destructive split that respects <br> tags\n                    const html = el.innerHTML;\n                    const fragments = html.split(/(<br\\s*\\/?>|\\s+)/);\n                    el.innerHTML = '';\n                    \n                    fragments.forEach(frag => {\n                        if (/<br/i.test(frag)) {\n                            el.appendChild(document.createElement('br'));\n                        } else if (frag.trim() !== '') {\n                            const wrapper = document.createElement('span');\n                            wrapper.style.cssText = 'overflow: hidden; display: inline-block; vertical-align: bottom; padding-top: 0.1em; margin-top: -0.1em;';\n                            \n                            const inner = document.createElement('span');\n                            inner.className = 'reveal-word';\n                            inner.style.cssText = 'display: inline-block; transform: translateY(110%); will-change: transform;';\n                            inner.innerHTML = frag;\n                            \n                            wrapper.appendChild(inner);\n                            el.appendChild(wrapper);\n                        } else {\n                            // Preserve spaces\n                            el.appendChild(document.createTextNode(frag));\n                        }\n                    });\n\n                    // Trigger the animation\n                    gsap.to(el.querySelectorAll('.reveal-word'), {\n                        y: '0%',\n                        duration: 1.2,\n                        ease: 'power4.out',\n                        stagger: 0.04,\n                        scrollTrigger: {\n                            trigger: el,\n                            start: 'top 90%',\n                        }\n                    });\n                });\n            }\n        });\n    <\/script>\n</body>\n</html>", b = "<!doctype html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Zenith Compute Network</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400&display=swap\" rel=\"stylesheet\">\n</head>\n<body class=\"bg-[#030509] min-h-screen flex items-center justify-center p-4 md:p-12 font-sans antialiased text-[#FFFFFF] overflow-x-hidden selection:bg-[#60A5FA] selection:text-[#030509]\">\n\n    <!-- Gradient Border Shell Technique -->\n    <div class=\"w-full max-w-[1440px] shadow-[0px_100px_80px_rgba(0,0,0,0.12),_0px_41.8px_33.4px_rgba(0,0,0,0.086),_0px_22.3px_17.9px_rgba(0,0,0,0.07)]\" style=\"display:inline-block; padding:1px; border-radius:24px; background:linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0));\">\n        \n        <!-- Main Inner Surface -->\n        <div class=\"relative w-full flex flex-col md:flex-row overflow-hidden min-h-[600px] md:min-h-[650px]\" style=\"background:#030509; border-radius:23px; box-shadow:rgba(255, 255, 255, 0.02) 0px 0px 40px 0px inset;\">\n            \n            <!-- Canvas Particle System Background Field -->\n            <canvas id=\"particle-canvas\" class=\"absolute inset-0 w-full h-full pointer-events-none z-0 opacity-100\"></canvas>\n\n            <!-- Matte Noise Texture Overlay -->\n            <div class=\"absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-10\" style=\"background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');\"></div>\n\n            <!-- Left Column: Copy & Controls -->\n            <div class=\"w-full md:w-[38%] px-8 lg:px-16 py-10 md:py-14 flex flex-col justify-between relative z-20 shrink-0 border-r border-white/5\">\n                \n                <!-- Lineart Detail: Corner Brackets -->\n                <div class=\"absolute top-6 left-6 w-3 h-3 border-t border-l border-white/20\"></div>\n                <div class=\"absolute top-6 right-6 w-3 h-3 border-t border-r border-white/20\"></div>\n                <div class=\"absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/20\"></div>\n                <div class=\"absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/20\"></div>\n\n                <!-- Top Badge -->\n                <div class=\"fade-in-el opacity-0 inline-flex items-center gap-2 px-3 py-1 text-xs font-light tracking-widest uppercase mb-16 border border-white/10 text-[#60A5FA] rounded-full w-max bg-white/5 backdrop-blur-sm\">\n                    <iconify-icon icon=\"solar:server-square-linear\" stroke-width=\"1.5\" class=\"text-sm\"></iconify-icon>\n                    ZENITH COMPUTE\n                </div>\n\n                <!-- Heading (Playfair Display) -->\n                <div>\n                    <h1 id=\"hero-heading\" class=\"text-5xl md:text-7xl tracking-tight text-[#FFFFFF] mb-6 leading-none opacity-0 font-light\" style=\"font-family: 'Playfair Display', serif;\">\n                        Infinite execution threads.<br>The cognitive backbone.\n                    </h1>\n\n                    <!-- Body Text -->\n                    <p class=\"fade-in-el opacity-0 text-[#9CA3AF] text-lg leading-relaxed max-w-[320px] font-light mb-8\" style=\"font-family: 'Inter', sans-serif;\">\n                        An autonomous state-management protocol synchronizing distributed workloads across edge micro-clusters and centralized servers. Adjust the target environment to refine processing speed.\n                    </p>\n                    \n                    <!-- Primary Action Button -->\n                    <button class=\"fade-in-el opacity-0 bg-[#60A5FA] text-[#030509] px-8 py-3.5 rounded-full text-sm font-light w-max hover:bg-blue-300 transition-colors flex items-center gap-2\" style=\"font-family: 'Inter', sans-serif;\">\n                        Provision Network\n                        <iconify-icon icon=\"solar:cpu-linear\" stroke-width=\"1.5\" class=\"text-lg\"></iconify-icon>\n                    </button>\n                </div>\n\n                <!-- Custom Slider Control -->\n                <div class=\"fade-in-el opacity-0 mt-16 pt-8 w-full relative\">\n                    <!-- Track Line -->\n                    <div class=\"w-full h-[1px] bg-white/10 relative\">\n                        <!-- Thumb / Active Indicator -->\n                        <div class=\"absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#60A5FA] rounded-full shadow-[0_0_12px_rgba(96,165,250,0.6)]\"></div>\n                    </div>\n                    \n                    <!-- Labels -->\n                    <div class=\"flex justify-between mt-4 w-full\" style=\"font-family: 'Inter', sans-serif;\">\n                        <span class=\"text-xs font-light tracking-widest uppercase text-white/30 transition-colors hover:text-[#60A5FA] cursor-pointer\">Local</span>\n                        <span class=\"text-xs font-light tracking-widest uppercase text-white/30 transition-colors hover:text-[#60A5FA] cursor-pointer\">Edge</span>\n                        <span class=\"text-xs font-light tracking-widest uppercase text-[#60A5FA] cursor-default\">Ring</span>\n                        <span class=\"text-xs font-light tracking-widest uppercase text-white/30 transition-colors hover:text-[#60A5FA] cursor-pointer\">Core</span>\n                        <span class=\"text-xs font-light tracking-widest uppercase text-white/30 transition-colors hover:text-[#60A5FA] cursor-pointer\">Cloud</span>\n                    </div>\n                </div>\n\n            </div>\n\n            <!-- Right Column: Media Frame -->\n            <div class=\"w-full md:w-[62%] relative bg-transparent overflow-hidden min-h-[400px] md:min-h-0 border-t md:border-t-0 border-white/5 pointer-events-none\" style=\"transform-style: preserve-3d;\">\n                \n                <!-- Deep Integration Gradients -->\n                <div class=\"absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-[#030509] via-transparent to-transparent opacity-90\"></div>\n                <div class=\"absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-[#030509] via-[#030509]/30 to-transparent opacity-80\"></div>\n                \n                <!-- Glassmorphism Floating Logic Card -->\n                <div id=\"floating-card\" class=\"absolute top-[25%] right-[12%] z-40 bg-white/[0.03] backdrop-blur-xl border border-[#60A5FA]/20 p-5 rounded-2xl shadow-[0_22px_40px_rgba(0,0,0,0.4)] w-[220px] text-[#60A5FA] pointer-events-auto\">\n                    <div class=\"flex items-center gap-3 mb-4\">\n                        <div class=\"w-8 h-8 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] flex items-center justify-center\">\n                            <iconify-icon icon=\"solar:transfer-horizontal-linear\" stroke-width=\"1.5\"></iconify-icon>\n                        </div>\n                        <span class=\"text-xs uppercase tracking-widest font-light\" style=\"font-family: 'Inter', sans-serif;\">Throughput</span>\n                    </div>\n                    <div class=\"text-3xl leading-9 tracking-tighter mb-1\" style=\"font-family: 'Inter', sans-serif;\">128.6 PB/s</div>\n                    <div class=\"text-xs uppercase tracking-widest text-[#60A5FA]/60\" style=\"font-family: 'Inter', sans-serif;\">Sync Efficiency</div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n    <script>\n        document.addEventListener(\"DOMContentLoaded\", () => {\n            gsap.registerPlugin(ScrollTrigger);\n\n            // --- ASCII Particle System Implementation ---\n            const canvas = document.getElementById('particle-canvas');\n            const ctx = canvas.getContext('2d');\n\n            let width, height;\n            let nodes = [];\n            let beams = [];\n            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()'.split('');\n            let mouse = { x: -1000, y: -1000 };\n\n            function resize() {\n                width = canvas.clientWidth;\n                height = canvas.clientHeight;\n                const dpr = window.devicePixelRatio || 1;\n                canvas.width = width * dpr;\n                canvas.height = height * dpr;\n                ctx.scale(dpr, dpr);\n            }\n\n            window.addEventListener('resize', () => {\n                resize();\n                initParticles();\n            });\n\n            window.addEventListener('mousemove', e => {\n                const rect = canvas.getBoundingClientRect();\n                mouse.x = e.clientX - rect.left;\n                mouse.y = e.clientY - rect.top;\n            });\n\n            function initParticles() {\n                nodes = Array.from({ length: 90 }).map(() => ({\n                    x: Math.random() * width,\n                    y: Math.random() * height,\n                    vy: (Math.random() * 0.4) + 0.1,\n                    char: chars[Math.floor(Math.random() * chars.length)]\n                }));\n\n                beams = Array.from({ length: 25 }).map(() => ({\n                    x: Math.random() * width,\n                    y: Math.random() * height,\n                    length: Math.random() * 100 + 50,\n                    speed: (Math.random() * 6) + 3,\n                    opacity: Math.random() * 0.5 + 0.3\n                }));\n            }\n\n            resize();\n            initParticles();\n\n            function draw() {\n                ctx.clearRect(0, 0, width, height);\n\n                // 1. Upward Beams (Fast)\n                beams.forEach(b => {\n                    b.y -= b.speed;\n                    if (b.y + b.length < 0) {\n                        b.y = height + 100;\n                        b.x = Math.random() * width;\n                    }\n                    let g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.length);\n                    g.addColorStop(0, `rgba(96, 165, 250, ${b.opacity})`);\n                    g.addColorStop(1, 'transparent');\n                    ctx.strokeStyle = g;\n                    ctx.lineWidth = 1.5;\n                    ctx.beginPath();\n                    ctx.moveTo(b.x, b.y);\n                    ctx.lineTo(b.x, b.y + b.length);\n                    ctx.stroke();\n                });\n\n                // 2. Interactive Nodes (ASCII)\n                ctx.font = '12px monospace';\n                ctx.textAlign = 'center';\n                ctx.textBaseline = 'middle';\n                \n                // Proximity Lines\n                ctx.lineWidth = 0.5;\n                for(let i = 0; i < nodes.length; i++) {\n                    let n1 = nodes[i];\n                    for(let j = i + 1; j < nodes.length; j++) {\n                        let n2 = nodes[j];\n                        let d = Math.hypot(n1.x - n2.x, n1.y - n2.y);\n                        if(d < 120) {\n                            ctx.strokeStyle = `rgba(156, 163, 175, ${0.15 * (1 - d/120)})`;\n                            ctx.beginPath();\n                            ctx.moveTo(n1.x, n1.y);\n                            ctx.lineTo(n2.x, n2.y);\n                            ctx.stroke();\n                        }\n                    }\n                }\n\n                nodes.forEach(n => {\n                    n.y += n.vy; // Slow drift\n                    if(n.y > height + 20) {\n                        n.y = -20;\n                        n.x = Math.random() * width;\n                    }\n\n                    let dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);\n\n                    // Dynamic Character Swap\n                    if (dist < 180 || Math.random() > 0.98) n.char = chars[Math.floor(Math.random() * chars.length)];\n\n                    // Mouse Connection\n                    if (dist < 180) {\n                        ctx.strokeStyle = `rgba(96, 165, 250, ${0.5 * (1 - dist/180)})`;\n                        ctx.beginPath(); \n                        ctx.moveTo(n.x, n.y); \n                        ctx.lineTo(mouse.x, mouse.y); \n                        ctx.stroke();\n                    }\n\n                    ctx.fillStyle = dist < 180 ? '#60A5FA' : 'rgba(156, 163, 175, 0.4)';\n                    ctx.fillText(n.char, n.x, n.y);\n                });\n\n                requestAnimationFrame(draw);\n            }\n            draw();\n\n            // --- GSAP Timeline Reveals ---\n            const heading = document.getElementById('hero-heading');\n            \n            // Staggered vertical masked word setup\n            const words = heading.innerHTML.trim().split(/(<br\\s*\\/?>|\\s+)/).filter(w => w.trim().length > 0 || w.toLowerCase().includes('<br'));\n            let newHTML = '';\n            words.forEach(word => {\n                if(word.toLowerCase().includes('<br')) {\n                    newHTML += '<br/>';\n                } else if (word.trim() !== '') {\n                    newHTML += `<span class=\"inline-block overflow-hidden align-bottom pb-1 -mb-1\"><span class=\"reveal-word inline-block translate-y-full opacity-0\">${word}</span></span> `;\n                }\n            });\n            heading.innerHTML = newHTML;\n            heading.style.opacity = 1;\n\n            const tl = gsap.timeline({ \n                scrollTrigger: {\n                    trigger: heading,\n                    start: \"top 85%\"\n                },\n                delay: 0.1 \n            });\n\n            tl.to('.reveal-word', {\n                y: 0,\n                opacity: 1,\n                duration: 1.2,\n                stagger: 0.04,\n                ease: \"power4.out\"\n            }, 0);\n\n            tl.to('.fade-in-el', {\n                opacity: 1,\n                y: 0,\n                duration: 1,\n                stagger: 0.15,\n                ease: \"power3.out\"\n            }, 0.6);\n\n            // Canvas Timeline Integration\n            tl.to(canvas, { opacity: 1, duration: 2, ease: \"power2.inOut\" }, 0.2);\n\n            // Floating Logic independent 3D shifts\n            gsap.to('#floating-card', {\n                y: \"-=12\",\n                rotationX: 4,\n                rotationY: -4,\n                duration: 4,\n                yoyo: true,\n                repeat: -1,\n                ease: \"sine.inOut\"\n            });\n        });\n    <\/script>\n</body>\n</html>", x = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Omnichannel Data Intelligence</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&display=swap\" rel=\"stylesheet\">\n</head>\n<body class=\"font-sans antialiased text-white m-0 p-0 h-screen w-full flex flex-col overflow-hidden selection:bg-blue-500/30 bg-black relative\" style=\"font-family: 'Inter', sans-serif;\">\n\n    <!-- Background Image Stage -->\n    <div class=\"absolute inset-0 z-0 bg-[url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_3840w.jpg')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen\"></div>\n    \n    <!-- Directional Tonal Washes for Readability -->\n    <div class=\"absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-transparent\"></div>\n    <div class=\"absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent\"></div>\n\n    <!-- Visible Structural Grid Scaffold -->\n    <div class=\"absolute inset-0 z-10 pointer-events-none flex justify-center w-full\">\n        <div class=\"w-full max-w-7xl h-full grid grid-cols-1 md:grid-cols-4 border-x border-white/5 divide-y-0 md:divide-x divide-white/5 relative\">\n            <!-- Structural Line Markers -->\n            <div class=\"hidden md:block absolute top-[20%] -left-1 w-2 h-[1px] bg-white/30\"></div>\n            <div class=\"hidden md:block absolute top-[20%] -right-1 w-2 h-[1px] bg-white/30\"></div>\n            <div class=\"hidden md:block absolute bottom-[35%] -left-1 w-2 h-[1px] bg-white/30\"></div>\n            <div class=\"hidden md:block absolute bottom-[35%] -right-1 w-2 h-[1px] bg-white/30\"></div>\n            <!-- Grid columns -->\n            <div class=\"relative\"><div class=\"absolute top-0 right-0 w-[1px] h-4 bg-white/20\"></div></div>\n            <div class=\"hidden md:block relative\"><div class=\"absolute top-0 right-0 w-[1px] h-4 bg-white/20\"></div></div>\n            <div class=\"hidden md:block relative\"><div class=\"absolute top-0 right-0 w-[1px] h-4 bg-white/20\"></div></div>\n            <div class=\"hidden md:block\"></div>\n        </div>\n    </div>\n\n    <!-- Controls Box (Top Right Anchored) -->\n    <div class=\"absolute top-6 right-6 md:top-8 md:right-8 z-40 flex gap-3\">\n        <!-- Gradient Border Treatment Applied via wrapper -->\n        <div class=\"w-10 h-10 rounded p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-transparent\">\n            <button id=\"pauseBtn\" class=\"w-full h-full rounded bg-black/40 backdrop-blur-md flex items-center justify-center text-[#6a9ded] hover:bg-white/10 transition-all cursor-pointer outline-none focus:ring-1 focus:ring-[#6a9ded]/50 group\" aria-label=\"Pause Animation\">\n                <iconify-icon icon=\"solar:pause-linear\" width=\"18\" height=\"18\" stroke-width=\"1.5\" class=\"group-hover:scale-110 transition-transform\"></iconify-icon>\n            </button>\n        </div>\n        <div class=\"w-10 h-10 rounded p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-transparent\">\n            <button class=\"w-full h-full rounded bg-black/40 backdrop-blur-md flex items-center justify-center text-[#6a9ded] hover:bg-white/10 transition-all cursor-pointer outline-none focus:ring-1 focus:ring-[#6a9ded]/50 group\" aria-label=\"Settings\">\n                <iconify-icon icon=\"solar:settings-linear\" width=\"18\" height=\"18\" stroke-width=\"1.5\" class=\"group-hover:rotate-90 transition-transform duration-500\"></iconify-icon>\n            </button>\n        </div>\n    </div>\n\n    <!-- Additive Canvas Overlay -->\n    <canvas id=\"particle-canvas\" class=\"absolute inset-0 w-full h-full z-20 pointer-events-none\"></canvas>\n\n    <!-- Anchored Content Overlay low in viewport -->\n    <main class=\"relative z-30 flex-grow w-full flex flex-col justify-end pb-12 md:pb-24\">\n        <div class=\"w-full max-w-7xl mx-auto px-6 md:px-8\">\n            <div class=\"grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 items-end\">\n                \n                <!-- Primary Headline Block -->\n                <header class=\"md:col-span-2 flex flex-col gap-6\">\n                    <h1 class=\"text-4xl md:text-5xl font-extralight tracking-tight leading-tight text-white drop-shadow-lg\">\n                        <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"inline-block gsap-word translate-y-full\">Omnichannel</span></span> <br>\n                        <span class=\"text-white/60\">\n                            <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"inline-block gsap-word translate-y-full\">Data</span></span>\n                            <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"inline-block gsap-word translate-y-full\">Intelligence</span></span>\n                        </span>\n                    </h1>\n                    <p id=\"split-text-target\" class=\"text-sm md:text-base font-extralight text-white/50 max-w-sm leading-relaxed tracking-wide\">\n                        Empowering next-generation analytics platforms with real-time distributed insights and secure, scalable hybrid-cloud processing architectures.\n                    </p>\n                </header>\n\n                <!-- Secondary Framed Grid Lane (Stats) with Premium Gradient Border -->\n                <div class=\"md:col-span-2 relative p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-transparent backdrop-blur-sm\">\n                    <!-- Corner structural crosses -->\n                    <div class=\"absolute -top-[3px] -left-[3px] w-1.5 h-1.5 border-t border-l border-white/40 z-10\"></div>\n                    <div class=\"absolute -top-[3px] -right-[3px] w-1.5 h-1.5 border-t border-r border-white/40 z-10\"></div>\n                    <div class=\"absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 border-b border-l border-white/40 z-10\"></div>\n                    <div class=\"absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 border-b border-r border-white/40 z-10\"></div>\n\n                    <!-- Grid Layout for Stats inside Gradient Wrapper -->\n                    <div class=\"grid grid-cols-2 gap-px bg-white/5 w-full h-full relative z-0\">\n                        <!-- Stat 1 -->\n                        <div class=\"bg-black/60 p-6 flex flex-col gap-2 hover:bg-black/40 transition-colors\">\n                            <span class=\"text-3xl font-extralight tracking-tight text-[#6a9ded] overflow-hidden\"><span class=\"inline-block gsap-word translate-y-full\">120+</span></span>\n                            <span class=\"text-xs font-light uppercase tracking-widest text-white/40 leading-tight\">Edge<br>Nodes</span>\n                        </div>\n\n                        <!-- Stat 2 -->\n                        <div class=\"bg-black/60 p-6 flex flex-col gap-2 hover:bg-black/40 transition-colors\">\n                            <span class=\"text-3xl font-extralight tracking-tight text-[#6a9ded] overflow-hidden\"><span class=\"inline-block gsap-word translate-y-full\">5.2P</span></span>\n                            <span class=\"text-xs font-light uppercase tracking-widest text-white/40 leading-tight\">Data<br>Indexed</span>\n                        </div>\n\n                        <!-- Stat 3 -->\n                        <div class=\"bg-black/60 p-6 flex flex-col gap-2 hover:bg-black/40 transition-colors\">\n                            <span class=\"text-3xl font-extralight tracking-tight text-[#6a9ded] overflow-hidden\"><span class=\"inline-block gsap-word translate-y-full\">&lt;10ms</span></span>\n                            <span class=\"text-xs font-light uppercase tracking-widest text-white/40 leading-tight\">Query<br>Latency</span>\n                        </div>\n\n                        <!-- Stat 4 -->\n                        <div class=\"bg-black/60 p-6 flex flex-col gap-2 hover:bg-black/40 transition-colors\">\n                            <span class=\"text-3xl font-extralight tracking-tight text-[#6a9ded] overflow-hidden\"><span class=\"inline-block gsap-word translate-y-full\">3.4B+</span></span>\n                            <span class=\"text-xs font-light uppercase tracking-widest text-white/40 leading-tight\">Event<br>Triggers</span>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </main>\n\n    <script>\n        // Set up the masked text reveal dynamically for the paragraph text\n        const p = document.getElementById('split-text-target');\n        const text = p.innerText.trim();\n        const words = text.split(/\\s+/);\n        p.innerHTML = '';\n        words.forEach(word => {\n            p.innerHTML += `<span class=\"inline-block overflow-hidden align-bottom pb-1\"><span class=\"inline-block gsap-word translate-y-full\">${word}</span></span> `;\n        });\n\n        // Initialize GSAP ScrollTrigger for masked reveal\n        gsap.registerPlugin(ScrollTrigger);\n        gsap.to('.gsap-word', {\n            y: \"0%\",\n            duration: 0.9,\n            ease: \"power4.out\",\n            stagger: 0.04,\n            scrollTrigger: {\n                trigger: \"main\",\n                start: \"top 95%\"\n            }\n        });\n\n        // Canvas Particle Network (Original logic preserved)\n        const canvas = document.getElementById('particle-canvas');\n        const ctx = canvas.getContext('2d');\n        const pauseBtn = document.getElementById('pauseBtn');\n        let isPaused = false;\n\n        let width, height;\n        let particles = [];\n        const particleCount = 200;\n        const speedMultiplier = 1.1;\n\n        let originX, originY;\n\n        function resize() {\n            const dpr = Math.min(window.devicePixelRatio || 1, 2);\n            width = window.innerWidth;\n            height = window.innerHeight;\n            canvas.width = Math.max(1, Math.floor(width * dpr));\n            canvas.height = Math.max(1, Math.floor(height * dpr));\n            canvas.style.width = width + 'px';\n            canvas.style.height = height + 'px';\n            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n            ctx.imageSmoothingEnabled = false;\n            originX = width / 2;\n            originY = height * 0.7; // Lowered slightly to fit grid stage better\n        }\n\n        class Particle {\n            constructor() {\n                this.reset();\n                this.z = Math.random() * 1000;\n            }\n\n            reset() {\n                const angle = Math.random() * Math.PI * 2;\n                const radius = Math.random() * 600;\n                \n                this.x = Math.cos(angle) * radius;\n                this.y = (Math.sin(angle) * radius) - 150; \n                \n                this.z = 1000; \n                this.speed = (Math.random() * 2 + 1) * speedMultiplier;\n                \n                // Restrained blue and white hues for technical atmosphere\n                const hue = Math.random() > 0.5 ? '200, 220, 255' : '106, 157, 237';\n                this.color = `rgb(${hue})`;\n                this.length = Math.random() * 2 + 0.5;\n            }\n\n            update() {\n                this.z -= this.speed;\n                if (this.z <= 0) {\n                    this.reset();\n                }\n            }\n\n            draw() {\n                const fov = 300; \n                \n                const scale = fov / this.z;\n                const px = originX + this.x * scale;\n                const py = originY + this.y * scale;\n\n                const prevZ = this.z + this.speed * this.length;\n                const prevScale = fov / prevZ;\n                const prevPx = originX + this.x * prevScale;\n                const prevPy = originY + this.y * prevScale;\n\n                let opacity = 1 - (this.z / 1000);\n                if (this.z < 100) opacity = this.z / 100; \n                if (opacity < 0) opacity = 0;\n\n                ctx.beginPath();\n                ctx.moveTo(prevPx, prevPy);\n                ctx.lineTo(px, py);\n                \n                ctx.strokeStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${opacity * 0.9})`);\n                // Hairline strokes stay crisp under retina DPR scaling\n                ctx.lineWidth = Math.max(0.25, (1 - (this.z / 1000)) * 0.4);\n                ctx.lineCap = 'butt';\n                ctx.lineJoin = 'miter';\n                \n                ctx.stroke();\n            }\n        }\n\n        function init() {\n            resize();\n            window.addEventListener('resize', resize);\n            for (let i = 0; i < particleCount; i++) {\n                particles.push(new Particle());\n            }\n            animate();\n        }\n\n        function animate() {\n            requestAnimationFrame(animate);\n\n            if (!isPaused) {\n                // Faster fade keeps streaks sharp instead of smeared\n                ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';\n                ctx.fillRect(0, 0, width, height);\n\n                particles.forEach(p => {\n                    p.update();\n                    p.draw();\n                });\n            }\n        }\n\n        pauseBtn.addEventListener('click', () => {\n            isPaused = !isPaused;\n            const icon = pauseBtn.querySelector('iconify-icon');\n            if (isPaused) {\n                icon.setAttribute('icon', 'solar:play-linear');\n            } else {\n                icon.setAttribute('icon', 'solar:pause-linear');\n            }\n        });\n\n        init();\n    <\/script>\n</body>\n</html>", ee = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Quantum Flux</title>\n    \n    <!-- Tailwind & Iconify -->\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    \n    <!-- Fonts -->\n    <link href=\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap\" rel=\"stylesheet\">\n    \n    <!-- GSAP Core & ScrollTrigger -->\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    \n    <!-- Three.js Import Map -->\n    <script type=\"importmap\">\n    {\n        \"imports\": {\n            \"three\": \"https://unpkg.com/three@0.160.0/build/three.module.js\",\n            \"three/addons/\": \"https://unpkg.com/three@0.160.0/examples/jsm/\"\n        }\n    }\n    <\/script>\n</head>\n<body class=\"bg-[#050505] text-white selection:bg-white selection:text-black font-extralight overflow-x-hidden relative\" style=\"font-family: 'Space Grotesk', sans-serif;\">\n\n    <!-- Loading Overlay -->\n    <div id=\"loader\" class=\"fixed inset-0 z-50 flex items-center justify-center bg-[#050505] transition-opacity duration-1000\">\n        <div class=\"flex flex-col items-center gap-4\">\n            <div class=\"h-px w-24 bg-neutral-800 overflow-hidden relative\">\n                <div id=\"shimmer-bar\" class=\"absolute inset-y-0 left-0 bg-white w-full -translate-x-full\"></div>\n            </div>\n            <p class=\"text-xs uppercase tracking-[0.2em] text-neutral-500 font-light\">\n                Booting Sequence\n            </p>\n        </div>\n    </div>\n\n    <!-- 3D Canvas Container -->\n    <div class=\"fixed inset-0 z-0\">\n        <canvas id=\"webgl-canvas\" class=\"w-full h-full outline-none cursor-auto\"></canvas>\n    </div>\n\n    <!-- Container Lines & Corner Squares -->\n    <div class=\"fixed inset-y-6 inset-x-6 md:inset-y-12 md:inset-x-12 border-x border-white/10 pointer-events-none z-10 flex flex-col justify-between\">\n        <!-- Top Left -->\n        <div class=\"absolute top-0 -translate-y-1/2 -left-[3px] w-1.5 h-1.5 bg-neutral-900 border border-neutral-500 rounded-none\"></div>\n        <!-- Top Right -->\n        <div class=\"absolute top-0 -translate-y-1/2 -right-[3px] w-1.5 h-1.5 bg-neutral-900 border border-neutral-500 rounded-none\"></div>\n        <!-- Bottom Left -->\n        <div class=\"absolute bottom-0 translate-y-1/2 -left-[3px] w-1.5 h-1.5 bg-neutral-900 border border-neutral-500 rounded-none\"></div>\n        <!-- Bottom Right -->\n        <div class=\"absolute bottom-0 translate-y-1/2 -right-[3px] w-1.5 h-1.5 bg-neutral-900 border border-neutral-500 rounded-none\"></div>\n    </div>\n\n    <!-- Scrollable UI Overlay -->\n    <div class=\"relative z-20 flex flex-col min-h-[160vh] pointer-events-none\">\n        \n        <!-- Fixed Navigation -->\n        <header class=\"fixed top-6 md:top-12 left-6 right-6 md:left-12 md:right-12 px-6 py-6 flex justify-between items-center pointer-events-auto opacity-0 nav-item z-30\">\n            <div class=\"flex items-center gap-3 group cursor-pointer\">\n                <div class=\"w-8 h-8 rounded-none border border-neutral-800 flex items-center justify-center bg-[#050505] group-hover:border-neutral-400 transition-colors duration-300\">\n                    <span class=\"font-light text-xs tracking-tighter text-white\">Q</span>\n                </div>\n                <span class=\"text-xs font-light tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase glitch-target\">\n                    Quantum\n                </span>\n            </div>\n\n            <nav class=\"hidden md:flex items-center gap-10 px-8 py-3 rounded-none\" style=\"background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(8px); border: 1px solid transparent; background-clip: padding-box, border-box; background-image: linear-gradient(#050505, #050505), linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%);\">\n                <a href=\"#\" class=\"uppercase tracking-widest text-neutral-500 hover:text-white transition-colors text-xs font-light\">Topology</a>\n                <a href=\"#\" class=\"uppercase tracking-widest text-neutral-500 hover:text-white transition-colors text-xs font-light\">Matrix</a>\n                <a href=\"#\" class=\"uppercase tracking-widest text-neutral-500 hover:text-white transition-colors text-xs font-light\">Protocol</a>\n            </nav>\n\n            <button class=\"group flex items-center gap-3 px-5 py-2.5 rounded-none transition-all duration-300\" style=\"background: linear-gradient(#050505, #050505) padding-box, linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05)) border-box; border: 1px solid transparent;\">\n                <span class=\"text-xs font-light tracking-widest uppercase text-neutral-400 group-hover:text-white\">Connect</span>\n                <iconify-icon icon=\"solar:arrow-right-linear\" width=\"14\" class=\"text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all\"></iconify-icon>\n            </button>\n        </header>\n\n        <!-- Main Content Area -->\n        <main class=\"flex-grow flex flex-col pt-[35vh] pb-[40vh] px-12 md:px-24 pointer-events-none relative z-20 w-full max-w-6xl mx-auto scroll-trigger-area\">\n            <div class=\"space-y-12\">\n                <!-- Status Tagline -->\n                <div class=\"overflow-hidden\">\n                    <div class=\"flex items-center gap-3 mask-word translate-y-full inline-flex\">\n                        <span class=\"flex h-1.5 w-1.5 rounded-none bg-neutral-300 shadow-[0_0_8px_rgba(255,255,255,0.6)]\"></span>\n                        <p class=\"text-xs uppercase tracking-[0.25em] text-neutral-400 font-extralight\">\n                            Neural Node: Active\n                        </p>\n                    </div>\n                </div>\n\n                <!-- Headline with Staggered Masked Reveal -->\n                <div class=\"max-w-4xl flex flex-wrap gap-x-6 gap-y-2\">\n                    <span class=\"inline-block overflow-hidden pb-2\"><span class=\"mask-word inline-block translate-y-[110%] text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1] text-white glitch-target\">Dynamic</span></span>\n                    <span class=\"inline-block overflow-hidden pb-2\"><span class=\"mask-word inline-block translate-y-[110%] text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1] text-white glitch-target\">Resonance</span></span>\n                    <span class=\"inline-block overflow-hidden pb-2\"><span class=\"mask-word inline-block translate-y-[110%] text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-700 glitch-target\">Field.</span></span>\n                </div>\n\n                <!-- Description -->\n                <div class=\"overflow-hidden max-w-lg\">\n                    <p class=\"mask-word translate-y-[110%] inline-block text-sm md:text-base text-neutral-500 leading-relaxed font-extralight\">\n                        An autonomous volumetric simulation powered by algorithmic dispersion and real-time data flow.\n                    </p>\n                </div>\n\n                <!-- CTA Actions -->\n                <div class=\"overflow-hidden pt-6\">\n                    <div class=\"mask-word translate-y-[110%] flex flex-wrap gap-5 pointer-events-auto\">\n                        <button class=\"relative group px-8 py-3.5 bg-white text-black rounded-none overflow-hidden\">\n                            <div class=\"absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out\"></div>\n                            <div class=\"relative flex items-center gap-3\">\n                                <span class=\"text-xs uppercase tracking-widest font-light text-black\">Initialize</span>\n                                <iconify-icon icon=\"solar:play-linear\" width=\"16\"></iconify-icon>\n                            </div>\n                        </button>\n\n                        <button class=\"group px-8 py-3.5 rounded-none transition-colors backdrop-blur-sm\" style=\"background: linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.02)) padding-box, linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%) border-box; border: 1px solid transparent;\">\n                            <div class=\"flex items-center gap-3\">\n                                <span class=\"text-xs uppercase tracking-widest font-light text-neutral-400 group-hover:text-white transition-colors\">System Specs</span>\n                                <iconify-icon icon=\"solar:document-linear\" width=\"16\" class=\"text-neutral-500 group-hover:text-white transition-colors\"></iconify-icon>\n                            </div>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </main>\n\n        <!-- Fixed Footer -->\n        <footer class=\"fixed bottom-6 md:bottom-12 left-6 right-6 md:left-12 md:right-12 pointer-events-auto nav-item opacity-0 px-6 py-6 grid grid-cols-3 items-end z-30\">\n            <div class=\"flex flex-col gap-2\">\n                <span class=\"text-[10px] uppercase tracking-widest text-neutral-600 font-light\">Telemetry</span>\n                <span id=\"coords\" class=\"text-xs font-mono text-neutral-300 font-extralight\">0.00.0.00.00</span>\n            </div>\n\n            <div class=\"hidden sm:flex flex-col gap-2 items-center\">\n                <span class=\"text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-light\">Scroll to traverse</span>\n                <div class=\"w-px h-8 bg-gradient-to-b from-neutral-600 to-transparent\"></div>\n            </div>\n            \n            <div class=\"flex gap-6 justify-self-end\">\n                <a href=\"#\" class=\"text-neutral-600 hover:text-white transition-colors\">\n                    <iconify-icon icon=\"solar:link-linear\" width=\"18\"></iconify-icon>\n                </a>\n                <a href=\"#\" class=\"text-neutral-600 hover:text-white transition-colors\">\n                    <iconify-icon icon=\"solar:maximize-square-linear\" width=\"18\"></iconify-icon>\n                </a>\n            </div>\n        </footer>\n    </div>\n\n    <!-- Main Logic & Interactions -->\n    <script type=\"module\">\n        import * as THREE from 'three';\n        import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';\n        import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';\n        import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';\n\n        // Register GSAP ScrollTrigger\n        gsap.registerPlugin(ScrollTrigger);\n\n        // --- Configuration (Monotone) ---\n        const config = {\n            colors: {\n                bg: 0x050505,\n                primary: 0xdddddd, \n                secondary: 0x555555\n            }\n        };\n\n        // --- Scene Setup ---\n        const canvas = document.querySelector('#webgl-canvas');\n        const scene = new THREE.Scene();\n        scene.background = new THREE.Color(config.colors.bg);\n        scene.fog = new THREE.FogExp2(config.colors.bg, 0.04);\n\n        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);\n        camera.position.z = 7;\n\n        const renderer = new THREE.WebGLRenderer({\n            canvas: canvas,\n            antialias: false,\n            powerPreference: \"high-performance\",\n            alpha: false\n        });\n        renderer.setSize(window.innerWidth, window.innerHeight);\n        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\n        renderer.toneMapping = THREE.ACESFilmicToneMapping;\n        renderer.toneMappingExposure = 1.0;\n\n        // --- Objects Container ---\n        const mainGroup = new THREE.Group();\n        scene.add(mainGroup);\n\n        // --- 1. Vortex Particle Field (Smaller Dots) ---\n        const vortexCount = 9500;\n        const vortexPositions = new Float32Array(vortexCount * 3);\n        const vortexRadius = new Float32Array(vortexCount);\n        const vortexAngle = new Float32Array(vortexCount);\n        const vortexHeight = new Float32Array(vortexCount);\n        const vortexSpeed = new Float32Array(vortexCount);\n\n        for (let i = 0; i < vortexCount; i++) {\n            const i3 = i * 3;\n            const y = (Math.random() - 0.5) * 7.5;\n            const funnel = 0.4 + Math.abs(y) * 0.2;\n            const r = (0.1 + Math.pow(Math.random(), 1.5) * 2.5) * funnel;\n            const a = Math.random() * Math.PI * 2;\n\n            vortexHeight[i] = y;\n            vortexRadius[i] = r;\n            vortexAngle[i] = a;\n            vortexSpeed[i] = 0.5 + Math.random() * 0.8;\n\n            vortexPositions[i3] = Math.cos(a) * r;\n            vortexPositions[i3 + 1] = y;\n            vortexPositions[i3 + 2] = Math.sin(a) * r;\n        }\n\n        const vortexGeometry = new THREE.BufferGeometry();\n        vortexGeometry.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3));\n        const vortexMaterial = new THREE.PointsMaterial({\n            size: 0.006, // Smaller dots requested\n            color: config.colors.primary,\n            transparent: true,\n            opacity: 0.6,\n            blending: THREE.AdditiveBlending,\n            depthWrite: false\n        });\n        const vortexPoints = new THREE.Points(vortexGeometry, vortexMaterial);\n        mainGroup.add(vortexPoints);\n\n        // --- 2. Spiral Guides ---\n        function createSpiralLine(turnOffset, color) {\n            const spiralPoints = [];\n            const pointCount = 400;\n            for (let i = 0; i < pointCount; i++) {\n                const t = i / (pointCount - 1);\n                const angle = t * Math.PI * 14 + turnOffset;\n                const radius = 0.2 + t * 2.8;\n                const y = (0.5 - t) * 6.0;\n                spiralPoints.push(new THREE.Vector3(\n                    Math.cos(angle) * radius,\n                    y,\n                    Math.sin(angle) * radius\n                ));\n            }\n            const spiralGeometry = new THREE.BufferGeometry().setFromPoints(spiralPoints);\n            const spiralMaterial = new THREE.LineBasicMaterial({\n                color,\n                transparent: true,\n                opacity: 0.15,\n                blending: THREE.AdditiveBlending\n            });\n            return new THREE.Line(spiralGeometry, spiralMaterial);\n        }\n\n        const spiralLineA = createSpiralLine(0, config.colors.secondary);\n        const spiralLineB = createSpiralLine(Math.PI, config.colors.primary);\n        mainGroup.add(spiralLineA);\n        mainGroup.add(spiralLineB);\n\n        // --- 3. Ambient Particles ---\n        const particlesGeometry = new THREE.BufferGeometry();\n        const particlesCount = 300;\n        const posArray = new Float32Array(particlesCount * 3);\n        for(let i = 0; i < particlesCount * 3; i++) {\n            posArray[i] = (Math.random() - 0.5) * 12;\n        }\n        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));\n        const particlesMaterial = new THREE.PointsMaterial({\n            size: 0.008,\n            color: config.colors.secondary,\n            transparent: true,\n            opacity: 0.4,\n            blending: THREE.AdditiveBlending\n        });\n        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);\n        scene.add(particlesMesh);\n\n        // --- Post Processing ---\n        const renderScene = new RenderPass(scene, camera);\n        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.4, 0.85);\n        bloomPass.strength = 0.6;\n        bloomPass.radius = 0.3;\n        bloomPass.threshold = 0.2;\n\n        const composer = new EffectComposer(renderer);\n        composer.addPass(renderScene);\n        composer.addPass(bloomPass);\n\n        // --- Interactions & Animation State ---\n        let mouseX = 0, mouseY = 0;\n        let targetX = 0, targetY = 0;\n        let windowHalfX = window.innerWidth / 2;\n        let windowHalfY = window.innerHeight / 2;\n\n        document.addEventListener('mousemove', (event) => {\n            mouseX = (event.clientX - windowHalfX);\n            mouseY = (event.clientY - windowHalfY);\n            \n            // Coordinates Update\n            const xVal = (event.clientX / window.innerWidth).toFixed(2);\n            const yVal = (event.clientY / window.innerHeight).toFixed(2);\n            document.getElementById('coords').innerText = `${xVal}.${yVal}.00`;\n        });\n\n        // --- Animation Loop ---\n        const clock = new THREE.Clock();\n\n        function animate() {\n            const elapsedTime = clock.getElapsedTime();\n\n            targetX = mouseX * 0.001;\n            targetY = mouseY * 0.0008;\n\n            mainGroup.rotation.y += 0.002;\n            mainGroup.rotation.y += 0.03 * (targetX - mainGroup.rotation.y);\n            mainGroup.rotation.x += 0.03 * (targetY - mainGroup.rotation.x);\n\n            const positions = vortexGeometry.attributes.position.array;\n            for (let i = 0; i < vortexCount; i++) {\n                const i3 = i * 3;\n                const spin = elapsedTime * vortexSpeed[i] * 0.5 + vortexHeight[i] * 0.5;\n                const angle = vortexAngle[i] + spin;\n                const pulse = Math.sin(elapsedTime * 1.2 + i * 0.01) * 0.05;\n                const radius = vortexRadius[i] + pulse;\n\n                positions[i3] = Math.cos(angle) * radius;\n                positions[i3 + 1] = vortexHeight[i] + Math.sin(elapsedTime + i * 0.02) * 0.03;\n                positions[i3 + 2] = Math.sin(angle) * radius;\n            }\n            vortexGeometry.attributes.position.needsUpdate = true;\n\n            spiralLineA.rotation.y = elapsedTime * 0.15;\n            spiralLineB.rotation.y = -elapsedTime * 0.12;\n\n            particlesMesh.rotation.y = elapsedTime * 0.03;\n            particlesMesh.rotation.x = -mouseY * 0.0001;\n\n            composer.render();\n            requestAnimationFrame(animate);\n        }\n\n        // --- Resize ---\n        window.addEventListener('resize', () => {\n            camera.aspect = window.innerWidth / window.innerHeight;\n            camera.updateProjectionMatrix();\n            renderer.setSize(window.innerWidth, window.innerHeight);\n            composer.setSize(window.innerWidth, window.innerHeight);\n            windowHalfX = window.innerWidth / 2;\n            windowHalfY = window.innerHeight / 2;\n        });\n\n        // --- Init & GSAP Animations ---\n        window.onload = () => {\n            animate();\n\n            // Loader Shimmer loop\n            gsap.to(\"#shimmer-bar\", { x: \"100%\", duration: 1.5, repeat: -1, ease: \"power1.inOut\" });\n\n            const tl = gsap.timeline();\n\n            // 1. Loader Exit & Nav Enter\n            tl.to(\"#loader\", {\n                opacity: 0,\n                duration: 1.0,\n                onComplete: () => { document.getElementById(\"loader\").style.display = \"none\"; }\n            })\n            .from(mainGroup.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 2.0, ease: \"power3.out\" }, \"-=0.5\")\n            .to(\".nav-item\", { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: \"power2.out\" }, \"-=1.5\");\n\n            // 2. ScrollTrigger Masked Staggered Word Reveal\n            gsap.to(\".mask-word\", {\n                scrollTrigger: {\n                    trigger: \".scroll-trigger-area\",\n                    start: \"top 80%\",\n                },\n                y: 0,\n                duration: 1.4,\n                stagger: 0.1,\n                ease: \"power4.out\"\n            });\n        };\n    <\/script>\n\n    <!-- JS based Glitch Effect to avoid arbitrary style tags -->\n    <script>\n        (function(){\n            const targets = document.querySelectorAll('.glitch-target');\n            let lastX = 0, lastY = 0, lastTime = 0;\n            \n            document.addEventListener('mousemove', e => {\n                const now = Date.now(), dt = now - lastTime;\n                if (dt > 40) {\n                    const dx = e.clientX - lastX, dy = e.clientY - lastY;\n                    const speed = Math.sqrt(dx * dx + dy * dy) / dt;\n                    \n                    if (speed > 2.0) {\n                        targets.forEach(el => {\n                            if (!el.dataset.animating) {\n                                el.dataset.animating = \"true\";\n                                gsap.to(el, {\n                                    x: () => (Math.random() - 0.5) * 4,\n                                    y: () => (Math.random() - 0.5) * 2,\n                                    textShadow: \"2px 0 rgba(255,255,255,0.4), -2px 0 rgba(100,100,100,0.4)\",\n                                    duration: 0.05,\n                                    yoyo: true,\n                                    repeat: 3,\n                                    onComplete: () => {\n                                        gsap.set(el, { x: 0, y: 0, textShadow: \"none\" });\n                                        setTimeout(() => el.dataset.animating = \"\", 200);\n                                    }\n                                });\n                            }\n                        });\n                    }\n                    lastX = e.clientX; lastY = e.clientY; lastTime = now;\n                }\n            });\n        })();\n    <\/script>\n</body>\n</html>", S = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>AEON // Portal</title>\n    \n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&family=JetBrains+Mono:wght@300;400&display=swap\" rel=\"stylesheet\">\n</head>\n<body style=\"\n    --bg-base: #020202; \n    --bg-surface-1: rgba(255, 255, 255, 0.015); \n    --bg-surface-2: rgba(255, 255, 255, 0.04); \n    --bg-surface-3: rgba(255, 255, 255, 0.08);\n    --text-primary: #F4F4F5; \n    --text-secondary: #A3A3A3; \n    --text-accent: #020202; \n    --text-tech: #666666;\n    --bg-accent: #F4F4F5; \n    --bg-accent-active: #22C55E;\n    --border-glow: rgba(255, 255, 255, 0.08);\n    --glow-color: 255, 255, 255;\n    background-color: var(--bg-base); \n    color: var(--text-primary);\n    transition: background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.8s cubic-bezier(0.16, 1, 0.3, 1);\n\" class=\"font-['Inter'] min-h-screen overflow-hidden flex items-center justify-center antialiased selection:bg-[var(--bg-surface-3)] selection:text-[var(--text-primary)]\">\n\n    <!-- Ambient Background -->\n    <div id=\"webgl-container\" class=\"absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen\"></div>\n\n    <!-- Structural Framing -->\n    <div class=\"fixed inset-4 lg:inset-8 pointer-events-none z-0 border border-[var(--border-glow)] hidden lg:block transition-colors duration-700\">\n        <!-- Corner Registration Marks -->\n        <div class=\"absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-[var(--text-secondary)] transition-colors duration-500\"></div>\n        <div class=\"absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-[var(--text-secondary)] transition-colors duration-500\"></div>\n        <div class=\"absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-[var(--text-secondary)] transition-colors duration-500\"></div>\n        <div class=\"absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-[var(--text-secondary)] transition-colors duration-500\"></div>\n        \n        <!-- Precision Grid Lines -->\n        <div class=\"absolute top-0 bottom-0 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-[var(--border-glow)] to-transparent opacity-20\"></div>\n        <div class=\"absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-glow)] to-transparent opacity-10\"></div>\n    </div>\n\n    <!-- Interface Controls -->\n    <div class=\"absolute top-6 lg:top-12 right-6 lg:right-12 z-20 flex items-center gap-6\">\n        <div class=\"font-['JetBrains_Mono'] text-xs text-[var(--text-tech)] tracking-widest uppercase transition-colors duration-500 hidden sm:block\">SYS-2.9</div>\n        <button id=\"themeToggleBtn\" class=\"h-8 px-4 border border-[var(--border-glow)] bg-[var(--bg-surface-1)] hover:bg-[var(--bg-surface-2)] text-[var(--text-primary)] backdrop-blur-md flex items-center gap-2 transition-all duration-300 text-xs font-light tracking-wide rounded-sm\">\n            <iconify-icon id=\"themeIcon\" icon=\"solar:moon-linear\" stroke-width=\"1.5\" class=\"text-sm\"></iconify-icon>\n            <span id=\"themeText\">DARK</span>\n        </button>\n    </div>\n\n    <!-- Metadata Labels -->\n    <div class=\"absolute top-12 left-8 lg:top-16 lg:left-16 z-10 font-['JetBrains_Mono'] text-xs tracking-widest text-[var(--text-tech)] uppercase transition-colors duration-500 hidden sm:block\">\n        NEURAL.NET // ACTIVE\n    </div>\n    <div style=\"transform: translateY(-50%) rotate(90deg); transform-origin: center right;\" class=\"absolute top-1/2 right-8 lg:right-12 z-10 font-['JetBrains_Mono'] text-xs tracking-widest text-[var(--text-tech)] uppercase flex items-center gap-4 transition-colors duration-500 hidden xl:flex\">\n        <span class=\"opacity-40\">[</span>\n        <span>PRT</span>\n        <span class=\"opacity-40\">=</span>\n        <span>ECHO-9</span>\n        <span class=\"opacity-40\">]</span>\n    </div>\n\n    <!-- Remixed Layout: Typographic Hero + Interactive Section -->\n    <div class=\"relative z-10 w-full max-w-[1440px] min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-24 py-24 gap-16 lg:gap-8\">\n        \n        <!-- Hero Section -->\n        <div class=\"w-full lg:w-1/2 flex flex-col gap-6 lg:pr-12\">\n            <div class=\"font-['JetBrains_Mono'] text-xs text-[var(--text-secondary)] tracking-widest uppercase flex items-center gap-3\">\n                <div class=\"w-1.5 h-1.5 rounded-full bg-[var(--bg-accent-active)] animate-pulse\"></div>\n                <span class=\"block overflow-hidden\"><span class=\"block masked-word translate-y-full opacity-0\">Authorization Pending</span></span>\n            </div>\n            \n            <h1 class=\"text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tighter font-extralight leading-[0.95] text-[var(--text-primary)] uppercase\">\n                <span class=\"block overflow-hidden pb-2\"><span class=\"block masked-word translate-y-full opacity-0\">Establish</span></span>\n                <span class=\"block overflow-hidden pb-2\"><span class=\"block masked-word translate-y-full opacity-0\">Connection</span></span>\n            </h1>\n            \n            <p class=\"text-sm lg:text-base font-extralight text-[var(--text-secondary)] leading-relaxed max-w-md mt-4\">\n                <span class=\"block overflow-hidden\"><span class=\"block masked-word translate-y-full opacity-0\">Restricted network sector. Verify your identity via biometric uplink to access the centralized mainframe and quantum datasets.</span></span>\n            </p>\n        </div>\n\n        <!-- Second Section (Interactive Card) -->\n        <div class=\"w-full max-w-[420px] lg:w-1/2 flex justify-center lg:justify-end\">\n            \n            <!-- Structural Shell with Gradient Border -->\n            <div class=\"relative w-full rounded-sm p-[1px] bg-gradient-to-br from-[var(--border-glow)] via-transparent to-[var(--border-glow)] group\">\n                \n                <div class=\"w-full rounded-sm bg-[var(--bg-surface-1)] backdrop-blur-2xl p-8 lg:p-10 flex flex-col gap-8 transition-colors duration-500 shadow-2xl shadow-black/40\">\n                    \n                    <!-- Card Header -->\n                    <div class=\"flex flex-col gap-2\">\n                        <div class=\"font-['JetBrains_Mono'] text-xs text-[var(--text-primary)] border border-[var(--border-glow)] bg-[var(--bg-surface-2)] px-3 py-1 self-start mb-2 tracking-widest uppercase rounded-sm transition-colors duration-500\">IDENTITY.CHECK</div>\n                        <h2 class=\"text-2xl tracking-tight font-light text-[var(--text-primary)]\">\n                            <span class=\"block overflow-hidden\"><span class=\"block masked-word translate-y-full opacity-0\">Authentication</span></span>\n                        </h2>\n                    </div>\n\n                    <!-- Alternate Methods Grid -->\n                    <div class=\"grid grid-cols-3 gap-3\">\n                        <button class=\"h-12 rounded-sm bg-[var(--bg-surface-2)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--text-accent)] flex items-center justify-center transition-all duration-300 border border-[var(--border-glow)] group/btn\" aria-label=\"Biometric Scan\">\n                            <iconify-icon icon=\"solar:fingerprint-linear\" stroke-width=\"1.5\" class=\"text-xl transition-transform duration-300 group-hover/btn:scale-110\"></iconify-icon>\n                        </button>\n                        <button class=\"h-12 rounded-sm bg-[var(--bg-surface-2)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--text-accent)] flex items-center justify-center transition-all duration-300 border border-[var(--border-glow)] group/btn\" aria-label=\"Hardware Token\">\n                            <iconify-icon icon=\"solar:smartphone-linear\" stroke-width=\"1.5\" class=\"text-xl transition-transform duration-300 group-hover/btn:scale-110\"></iconify-icon>\n                        </button>\n                        <button class=\"h-12 rounded-sm bg-[var(--bg-surface-2)] hover:bg-[var(--text-primary)] text-[var(--text-primary)] hover:text-[var(--text-accent)] flex items-center justify-center transition-all duration-300 border border-[var(--border-glow)] group/btn\" aria-label=\"Neural Passkey\">\n                            <iconify-icon icon=\"solar:shield-keyhole-linear\" stroke-width=\"1.5\" class=\"text-xl transition-transform duration-300 group-hover/btn:scale-110\"></iconify-icon>\n                        </button>\n                    </div>\n\n                    <!-- Divider -->\n                    <div class=\"flex items-center gap-4 text-[var(--text-tech)] font-['JetBrains_Mono'] text-xs tracking-widest uppercase\">\n                        <div class=\"flex-1 h-[1px] bg-[var(--border-glow)] transition-colors duration-500\"></div>\n                        <span>FALLBACK PROTOCOL</span>\n                        <div class=\"flex-1 h-[1px] bg-[var(--border-glow)] transition-colors duration-500\"></div>\n                    </div>\n\n                    <!-- Input Fields -->\n                    <div class=\"flex flex-col gap-5\">\n                        <div class=\"relative flex flex-col gap-2\">\n                            <label class=\"font-['JetBrains_Mono'] text-xs font-light text-[var(--text-secondary)] uppercase tracking-widest transition-colors duration-500\">AGENT_ALIAS</label>\n                            <input type=\"text\" placeholder=\"agent.name@aeon.net\" autocomplete=\"username\" class=\"w-full px-4 h-12 border border-[var(--border-glow)] outline-none rounded-sm bg-[var(--bg-surface-1)] text-[var(--text-primary)] font-['Inter'] text-sm transition-all duration-300 focus:bg-[var(--bg-surface-2)] focus:border-[var(--text-secondary)] placeholder-[var(--text-tech)] font-light\">\n                        </div>\n                        <div class=\"relative flex flex-col gap-2\">\n                            <label class=\"font-['JetBrains_Mono'] text-xs font-light text-[var(--text-secondary)] uppercase tracking-widest transition-colors duration-500\">ACCESS_CODE</label>\n                            <input type=\"password\" placeholder=\"••••••••••••\" autocomplete=\"current-password\" class=\"w-full px-4 h-12 border border-[var(--border-glow)] outline-none rounded-sm bg-[var(--bg-surface-1)] text-[var(--text-primary)] font-['Inter'] text-sm transition-all duration-300 focus:bg-[var(--bg-surface-2)] focus:border-[var(--text-secondary)] placeholder-[var(--text-tech)] font-light\">\n                        </div>\n                    </div>\n\n                    <!-- Primary Action -->\n                    <button class=\"h-14 mt-4 rounded-sm bg-[var(--bg-accent)] text-[var(--text-accent)] font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-500 hover:bg-[var(--bg-accent-active)] hover:text-white group/submit relative overflow-hidden\">\n                        <span class=\"relative z-10 flex items-center gap-2\">\n                            INITIATE LINK \n                            <iconify-icon icon=\"solar:arrow-right-linear\" stroke-width=\"1.5\" class=\"text-base transition-transform duration-300 group-hover/submit:translate-x-1\"></iconify-icon>\n                        </span>\n                    </button>\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <script>\n        // GSAP Masked Reveal Directive\n        document.addEventListener(\"DOMContentLoaded\", () => {\n            gsap.registerPlugin(ScrollTrigger);\n            \n            gsap.to(\".masked-word\", {\n                y: \"0%\",\n                opacity: 1,\n                duration: 1.2,\n                ease: \"power4.out\",\n                stagger: 0.1,\n                delay: 0.1\n            });\n        });\n\n        // Theme Toggling Logic\n        const body = document.body;\n        const themeBtn = document.getElementById('themeToggleBtn');\n        const themeIcon = document.getElementById('themeIcon');\n        const themeText = document.getElementById('themeText');\n        let isDark = true;\n\n        const themes = {\n            dark: {\n                '--bg-base': '#020202',\n                '--bg-surface-1': 'rgba(255, 255, 255, 0.015)',\n                '--bg-surface-2': 'rgba(255, 255, 255, 0.04)',\n                '--bg-surface-3': 'rgba(255, 255, 255, 0.08)',\n                '--text-primary': '#F4F4F5',\n                '--text-secondary': '#A3A3A3',\n                '--text-accent': '#020202',\n                '--text-tech': '#666666',\n                '--bg-accent': '#F4F4F5',\n                '--bg-accent-active': '#22C55E',\n                '--border-glow': 'rgba(255, 255, 255, 0.08)',\n                '--glow-color': '255, 255, 255',\n                shaderCore: '#FFFFFF',\n                shaderFringe: '#1e3a8a'\n            },\n            light: {\n                '--bg-base': '#F4F4F5',\n                '--bg-surface-1': 'rgba(0, 0, 0, 0.02)',\n                '--bg-surface-2': 'rgba(0, 0, 0, 0.05)',\n                '--bg-surface-3': 'rgba(0, 0, 0, 0.1)',\n                '--text-primary': '#020202',\n                '--text-secondary': '#666666',\n                '--text-accent': '#FFFFFF',\n                '--text-tech': '#A3A3A3',\n                '--bg-accent': '#020202',\n                '--bg-accent-active': '#16A34A',\n                '--border-glow': 'rgba(0, 0, 0, 0.08)',\n                '--glow-color': '0, 0, 0',\n                shaderCore: '#020202',\n                shaderFringe: '#94a3b8'\n            }\n        };\n\n        themeBtn.addEventListener('click', () => {\n            isDark = !isDark;\n            const currentTheme = isDark ? themes.dark : themes.light;\n\n            for (const [key, value] of Object.entries(currentTheme)) {\n                if (key.startsWith('--')) {\n                    body.style.setProperty(key, value);\n                }\n            }\n\n            if (isDark) {\n                themeIcon.setAttribute('icon', 'solar:moon-linear');\n                themeText.textContent = 'DARK';\n            } else {\n                themeIcon.setAttribute('icon', 'solar:sun-linear');\n                themeText.textContent = 'LIGHT';\n            }\n\n            if (typeof material !== 'undefined') {\n                material.uniforms.u_colorCore.value = new THREE.Color(currentTheme.shaderCore);\n                material.uniforms.u_colorFringe.value = new THREE.Color(currentTheme.shaderFringe);\n                material.uniforms.u_isLightMode.value = isDark ? 0.0 : 1.0;\n            }\n        });\n\n        // Ambient WebGL Background\n        const container = document.getElementById('webgl-container');\n        const scene = new THREE.Scene();\n        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);\n        camera.position.z = 1;\n\n        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\n        renderer.setSize(window.innerWidth, window.innerHeight);\n        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\n        container.appendChild(renderer.domElement);\n\n        const geometry = new THREE.PlaneGeometry(2, 2);\n\n        const vertexShader = `\n            varying vec2 vUv;\n            void main() {\n                vUv = uv;\n                gl_Position = vec4(position, 1.0);\n            }\n        `;\n\n        const fragmentShader = `\n            uniform float u_time;\n            uniform vec2 u_resolution;\n            uniform vec2 u_mouse;\n            uniform vec3 u_colorCore;\n            uniform vec3 u_colorFringe;\n            uniform float u_isLightMode;\n            varying vec2 vUv;\n\n            vec2 hash( vec2 p ) {\n                p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );\n                return -1.0 + 2.0*fract(sin(p)*43758.5453123);\n            }\n            float noise( in vec2 p ) {\n                const float K1 = 0.366025404;\n                const float K2 = 0.211324865;\n                vec2 i = floor( p + (p.x+p.y)*K1 );\n                vec2 a = p - i + (i.x+i.y)*K2;\n                vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);\n                vec2 b = a - o + K2;\n                vec2 c = a - 1.0 + 2.0*K2;\n                vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );\n                vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));\n                return dot( n, vec3(70.0) );\n            }\n\n            float sdArc(vec2 p, vec2 center, float radius, float width, float warp) {\n                p.y += sin(p.x * 2.0 + u_time * 0.3) * warp;\n                p.x += noise(p * 1.5 + u_time * 0.1) * (warp * 0.8);\n                float d = length(p - center) - radius;\n                return abs(d) - width;\n            }\n\n            void main() {\n                vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n                vec2 st = uv;\n                st.x *= u_resolution.x / u_resolution.y;\n                \n                vec2 mouseOffset = (u_mouse - 0.5) * 0.05;\n                st += mouseOffset;\n\n                // Center organic form behind the content area\n                vec2 center = vec2(0.5, 0.5);\n                \n                float d1 = sdArc(st, center, 0.6, 0.02, 0.15);\n                float d2 = sdArc(st, center, 0.65, 0.06, 0.2);\n                \n                float coreGlow = exp(-d1 * 30.0);\n                float fringeGlow = exp(-d2 * 10.0);\n                float wash = smoothstep(1.5, -0.5, length(st - center)) * 0.15;\n\n                vec3 finalColor = vec3(0.0);\n                finalColor += u_colorCore * coreGlow;\n                finalColor += u_colorFringe * fringeGlow;\n                finalColor += u_colorFringe * wash * (sin(u_time * 0.5) * 0.2 + 0.8);\n\n                float alpha = clamp(coreGlow + fringeGlow + wash, 0.0, 1.0);\n                finalColor = vec3(1.0) - exp(-finalColor * 1.5);\n                \n                if(u_isLightMode > 0.5) {\n                    alpha = clamp((coreGlow * 1.2 + fringeGlow + wash * 0.4), 0.0, 0.4);\n                }\n\n                gl_FragColor = vec4(finalColor, alpha * 0.6);\n            }\n        `;\n\n        const material = new THREE.ShaderMaterial({\n            vertexShader,\n            fragmentShader,\n            uniforms: {\n                u_time: { value: 0.0 },\n                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },\n                u_mouse: { value: new THREE.Vector2(0.5, 0.5) },\n                u_colorCore: { value: new THREE.Color(themes.dark.shaderCore) },\n                u_colorFringe: { value: new THREE.Color(themes.dark.shaderFringe) },\n                u_isLightMode: { value: 0.0 }\n            },\n            transparent: true,\n            blending: THREE.AdditiveBlending \n        });\n\n        const mesh = new THREE.Mesh(geometry, material);\n        scene.add(mesh);\n\n        let targetMouse = new THREE.Vector2(0.5, 0.5);\n        document.addEventListener('mousemove', (e) => {\n            targetMouse.x = e.clientX / window.innerWidth;\n            targetMouse.y = 1.0 - (e.clientY / window.innerHeight); \n        });\n\n        const clock = new THREE.Clock();\n        function animate() {\n            requestAnimationFrame(animate);\n            material.uniforms.u_time.value = clock.getElapsedTime();\n            material.uniforms.u_mouse.value.lerp(targetMouse, 0.03);\n            renderer.render(scene, camera);\n        }\n        animate();\n\n        window.addEventListener('resize', () => {\n            const width = window.innerWidth;\n            const height = window.innerHeight;\n            renderer.setSize(width, height);\n            material.uniforms.u_resolution.value.set(width, height);\n        });\n    <\/script>\n</body>\n</html>", C = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Flow Field with Particle Trails</title>\n<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n  html, body { width: 100%; height: 100%; overflow: hidden; background: #0a0a0a; }\n  canvas { display: block; width: 100vw; height: 100vh; }\n  .label {\n    position: fixed;\n    top: 20px;\n    left: 24px;\n    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;\n    font-size: 11px;\n    letter-spacing: 0.15em;\n    text-transform: uppercase;\n    color: rgba(200, 149, 108, 0.5);\n    z-index: 10;\n    pointer-events: none;\n    user-select: none;\n  }\n</style>\n</head>\n<body>\n<div class=\"label\">Flow Field</div>\n<canvas id=\"canvas\"></canvas>\n<script>\n// ─────────────────────────────────────────────\n// Simplex Noise (compact implementation)\n// Based on Stefan Gustavson's simplex noise\n// ─────────────────────────────────────────────\nconst SimplexNoise = (function() {\n  const F2 = 0.5 * (Math.sqrt(3) - 1);\n  const G2 = (3 - Math.sqrt(3)) / 6;\n  const F3 = 1 / 3;\n  const G3 = 1 / 6;\n\n  const grad3 = [\n    [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],\n    [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],\n    [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]\n  ];\n\n  function SimplexNoise(seed) {\n    this.perm = new Uint8Array(512);\n    this.permMod12 = new Uint8Array(512);\n    const p = new Uint8Array(256);\n    // Seed-based permutation\n    seed = seed || Math.random() * 65536;\n    for (let i = 0; i < 256; i++) p[i] = i;\n    for (let i = 255; i > 0; i--) {\n      seed = (seed * 16807 + 0) % 2147483647;\n      const j = seed % (i + 1);\n      const tmp = p[i];\n      p[i] = p[j];\n      p[j] = tmp;\n    }\n    for (let i = 0; i < 512; i++) {\n      this.perm[i] = p[i & 255];\n      this.permMod12[i] = this.perm[i] % 12;\n    }\n  }\n\n  SimplexNoise.prototype.noise2D = function(xin, yin) {\n    const perm = this.perm, permMod12 = this.permMod12;\n    let n0, n1, n2;\n    const s = (xin + yin) * F2;\n    const i = Math.floor(xin + s);\n    const j = Math.floor(yin + s);\n    const t = (i + j) * G2;\n    const X0 = i - t, Y0 = j - t;\n    const x0 = xin - X0, y0 = yin - Y0;\n    let i1, j1;\n    if (x0 > y0) { i1 = 1; j1 = 0; }\n    else { i1 = 0; j1 = 1; }\n    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;\n    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;\n    const ii = i & 255, jj = j & 255;\n    let t0 = 0.5 - x0*x0 - y0*y0;\n    if (t0 < 0) n0 = 0;\n    else { t0 *= t0; const gi = permMod12[ii + perm[jj]]; n0 = t0 * t0 * (grad3[gi][0]*x0 + grad3[gi][1]*y0); }\n    let t1 = 0.5 - x1*x1 - y1*y1;\n    if (t1 < 0) n1 = 0;\n    else { t1 *= t1; const gi = permMod12[ii + i1 + perm[jj + j1]]; n1 = t1 * t1 * (grad3[gi][0]*x1 + grad3[gi][1]*y1); }\n    let t2 = 0.5 - x2*x2 - y2*y2;\n    if (t2 < 0) n2 = 0;\n    else { t2 *= t2; const gi = permMod12[ii + 1 + perm[jj + 1]]; n2 = t2 * t2 * (grad3[gi][0]*x2 + grad3[gi][1]*y2); }\n    return 70 * (n0 + n1 + n2);\n  };\n\n  SimplexNoise.prototype.noise3D = function(xin, yin, zin) {\n    const perm = this.perm, permMod12 = this.permMod12;\n    let n0, n1, n2, n3;\n    const s = (xin + yin + zin) * F3;\n    const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s);\n    const t = (i + j + k) * G3;\n    const X0 = i - t, Y0 = j - t, Z0 = k - t;\n    const x0 = xin - X0, y0 = yin - Y0, z0 = zin - Z0;\n    let i1, j1, k1, i2, j2, k2;\n    if (x0 >= y0) {\n      if (y0 >= z0) { i1=1;j1=0;k1=0;i2=1;j2=1;k2=0; }\n      else if (x0 >= z0) { i1=1;j1=0;k1=0;i2=1;j2=0;k2=1; }\n      else { i1=0;j1=0;k1=1;i2=1;j2=0;k2=1; }\n    } else {\n      if (y0 < z0) { i1=0;j1=0;k1=1;i2=0;j2=1;k2=1; }\n      else if (x0 < z0) { i1=0;j1=1;k1=0;i2=0;j2=1;k2=1; }\n      else { i1=0;j1=1;k1=0;i2=1;j2=1;k2=0; }\n    }\n    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;\n    const x2 = x0 - i2 + 2*G3, y2 = y0 - j2 + 2*G3, z2 = z0 - k2 + 2*G3;\n    const x3 = x0 - 1 + 3*G3, y3 = y0 - 1 + 3*G3, z3 = z0 - 1 + 3*G3;\n    const ii = i & 255, jj = j & 255, kk = k & 255;\n    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;\n    if (t0 < 0) n0 = 0;\n    else { t0 *= t0; const gi = permMod12[ii+perm[jj+perm[kk]]]; n0 = t0*t0*(grad3[gi][0]*x0+grad3[gi][1]*y0+grad3[gi][2]*z0); }\n    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;\n    if (t1 < 0) n1 = 0;\n    else { t1 *= t1; const gi = permMod12[ii+i1+perm[jj+j1+perm[kk+k1]]]; n1 = t1*t1*(grad3[gi][0]*x1+grad3[gi][1]*y1+grad3[gi][2]*z1); }\n    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;\n    if (t2 < 0) n2 = 0;\n    else { t2 *= t2; const gi = permMod12[ii+i2+perm[jj+j2+perm[kk+k2]]]; n2 = t2*t2*(grad3[gi][0]*x2+grad3[gi][1]*y2+grad3[gi][2]*z2); }\n    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;\n    if (t3 < 0) n3 = 0;\n    else { t3 *= t3; const gi = permMod12[ii+1+perm[jj+1+perm[kk+1]]]; n3 = t3*t3*(grad3[gi][0]*x3+grad3[gi][1]*y3+grad3[gi][2]*z3); }\n    return 32 * (n0 + n1 + n2 + n3);\n  };\n\n  return SimplexNoise;\n})();\n\n// ─────────────────────────────────────────────\n// Flow Field Renderer\n// ─────────────────────────────────────────────\n(function() {\n  const canvas = document.getElementById('canvas');\n  const ctx = canvas.getContext('2d');\n  const noise = new SimplexNoise(42);\n  const dpr = window.devicePixelRatio || 1;\n\n  let W, H;\n\n  function resize() {\n    W = window.innerWidth;\n    H = window.innerHeight;\n    canvas.width = W * dpr;\n    canvas.height = H * dpr;\n    canvas.style.width = W + 'px';\n    canvas.style.height = H + 'px';\n    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n    // Fill with background on resize to avoid flash\n    ctx.fillStyle = '#0a0a0a';\n    ctx.fillRect(0, 0, W, H);\n  }\n\n  window.addEventListener('resize', resize);\n  resize();\n\n  // ── Mouse tracking ──\n  const mouse = { x: -9999, y: -9999, active: false };\n  window.addEventListener('mousemove', function(e) {\n    mouse.x = e.clientX;\n    mouse.y = e.clientY;\n    mouse.active = true;\n  });\n  window.addEventListener('mouseleave', function() {\n    mouse.active = false;\n  });\n\n  // ── Color palette ──\n  // Warm tones: amber, gold, coral, with variations\n  const palette = [\n    { r: 200, g: 149, b: 108 }, // amber  #c8956c\n    { r: 212, g: 165, b: 116 }, // gold   #d4a574\n    { r: 224, g: 120, b: 80  }, // coral  #e07850\n    { r: 190, g: 130, b: 90  }, // dark amber\n    { r: 230, g: 180, b: 140 }, // light gold\n    { r: 210, g: 100, b: 70  }, // deep coral\n    { r: 180, g: 160, b: 120 }, // muted gold\n  ];\n\n  function lerpColor(a, b, t) {\n    return {\n      r: a.r + (b.r - a.r) * t,\n      g: a.g + (b.g - a.g) * t,\n      b: a.b + (b.b - a.b) * t\n    };\n  }\n\n  function getColor(noiseVal) {\n    // Map noise [-1,1] to palette index\n    const t = (noiseVal + 1) * 0.5; // 0..1\n    const idx = t * (palette.length - 1);\n    const i = Math.floor(idx);\n    const f = idx - i;\n    const a = palette[Math.min(i, palette.length - 1)];\n    const b = palette[Math.min(i + 1, palette.length - 1)];\n    return lerpColor(a, b, f);\n  }\n\n  // ── Particles ──\n  const PARTICLE_COUNT = 2500;\n  let NOISE_SCALE = 0.0025;\n  let SPEED = 1.2;\n  const MOUSE_RADIUS = 150;\n  const MOUSE_FORCE = 2.5;\n\n  const particles = [];\n\n  function createParticle() {\n    return {\n      x: Math.random() * W,\n      y: Math.random() * H,\n      speed: 0.4 + Math.random() * 1.0,\n      alpha: 0.15 + Math.random() * 0.55,\n      size: 0.5 + Math.random() * 1.5\n    };\n  }\n\n  for (let i = 0; i < PARTICLE_COUNT; i++) {\n    particles.push(createParticle());\n  }\n\n  // ── Animation ──\n  let time = 0;\n\n  function draw() {\n    // Fade previous frame with dark overlay — creates trailing effect\n    ctx.fillStyle = 'rgba(10, 10, 10, 0.03)';\n    ctx.fillRect(0, 0, W, H);\n\n    time += 0.0008;\n\n    for (let i = 0; i < PARTICLE_COUNT; i++) {\n      const p = particles[i];\n\n      // Sample noise field at particle position with time evolution\n      const nx = p.x * NOISE_SCALE;\n      const ny = p.y * NOISE_SCALE;\n      const angle = noise.noise3D(nx, ny, time) * Math.PI * 2;\n\n      // Secondary noise for color variation\n      const colorNoise = noise.noise3D(nx * 1.5 + 100, ny * 1.5 + 100, time * 0.5);\n\n      // Velocity from flow field\n      let vx = Math.cos(angle) * p.speed * SPEED;\n      let vy = Math.sin(angle) * p.speed * SPEED;\n\n      // Mouse interaction — gentle push away\n      if (mouse.active) {\n        const dx = p.x - mouse.x;\n        const dy = p.y - mouse.y;\n        const dist = Math.sqrt(dx * dx + dy * dy);\n        if (dist < MOUSE_RADIUS && dist > 0) {\n          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;\n          vx += (dx / dist) * force;\n          vy += (dy / dist) * force;\n        }\n      }\n\n      // Store previous position for line drawing\n      const px = p.x;\n      const py = p.y;\n\n      // Update position\n      p.x += vx;\n      p.y += vy;\n\n      // Draw particle trail segment\n      const color = getColor(colorNoise);\n      ctx.beginPath();\n      ctx.moveTo(px, py);\n      ctx.lineTo(p.x, p.y);\n      ctx.strokeStyle = 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + p.alpha + ')';\n      ctx.lineWidth = p.size;\n      ctx.stroke();\n\n      // Respawn if offscreen\n      if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) {\n        p.x = Math.random() * W;\n        p.y = Math.random() * H;\n      }\n    }\n\n    requestAnimationFrame(draw);\n  }\n\n  // Initial fill\n  ctx.fillStyle = '#0a0a0a';\n  ctx.fillRect(0, 0, W, H);\n\n  requestAnimationFrame(draw);\n\n  window.addEventListener('message', function(e) {\n    if (e.data && e.data.type === 'param') {\n      switch (e.data.name) {\n        case 'SPEED': SPEED = e.data.value; break;\n        case 'NOISE_SCALE': NOISE_SCALE = e.data.value; break;\n      }\n    }\n  });\n})();\n<\/script>\n<script defer src=\"https://static.cloudflareinsights.com/beacon.min.js/v8c78df7c7c0f484497ecbca7046644da1771523124516\" integrity=\"sha512-8DS7rgIrAmghBFwoOTujcf6D9rXvH8xm8JQ1Ja01h9QX8EzXldiszufYa4IFfKdLUKTTrnSFXLDkUEOTrZQ8Qg==\" data-cf-beacon='{\"version\":\"2024.11.0\",\"token\":\"216c03e5eb1b42998a91f716785010f9\",\"r\":1,\"server_timing\":{\"name\":{\"cfCacheStatus\":true,\"cfEdge\":true,\"cfExtPri\":true,\"cfL4\":true,\"cfOrigin\":true,\"cfSpeedBrain\":true},\"location_startswith\":null}}' crossorigin=\"anonymous\"><\/script>\n</body>\n</html>\n", te = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Aegis Security - Remixed Bento</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js\"><\/script>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Mono&display=swap\" rel=\"stylesheet\">\n</head>\n<body class=\"bg-[#111111] text-black antialiased min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-x-hidden selection:bg-yellow-300 selection:text-black\" style=\"font-family: 'Space Mono', monospace;\">\n\n    <!-- Bento Grid Container -->\n    <div class=\"grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl mx-auto min-h-[85vh] py-8\">\n        \n        <!-- Card 1: Grainy / Light (Black Globe) -->\n        <article class=\"col-span-1 relative w-full h-[500px] md:h-auto min-h-[450px] rounded-[2rem] flex flex-col justify-between p-8 overflow-hidden shadow-2xl border border-transparent\" style=\"background: linear-gradient(#f4f4f0, #f4f4f0) padding-box, linear-gradient(135deg, #ffffff 0%, #d1d5db 100%) border-box;\">\n            <!-- Noise Overlay -->\n            <div class=\"absolute inset-0 z-10 pointer-events-none opacity-[0.15]\" style=\"background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E'); mix-blend-mode: multiply;\"></div>\n            \n            <!-- WebGL Background -->\n            <div class=\"absolute inset-0 z-0 top-1/4\">\n                <canvas id=\"webgl-lines\" class=\"w-full h-full opacity-60\"></canvas>\n            </div>\n\n            <!-- Header -->\n            <header class=\"relative z-20 flex justify-between items-center text-sm tracking-tight font-normal\">\n                <div class=\"flex items-center gap-1.5\">\n                    <iconify-icon icon=\"solar:shield-network-linear\" width=\"20\" height=\"20\" style=\"stroke-width: 1.5;\"></iconify-icon>\n                    <span>aegis</span>\n                </div>\n                <span class=\"text-xs opacity-50 uppercase tracking-widest\">Sector.01</span>\n            </header>\n\n            <!-- Main Content -->\n            <main class=\"relative z-20 mt-auto\">\n                <h2 class=\"text-3xl md:text-4xl tracking-tight leading-[1.1] mb-4 masked-reveal\">\n                    Absolute stealth.<br>Zero presence.\n                </h2>\n                <p class=\"text-xs leading-relaxed font-sans max-w-[220px] text-black/70 masked-reveal\" style=\"font-family: 'Inter', sans-serif;\">\n                    Your network footprint.<br>Entirely eradicated.\n                </p>\n            </main>\n        </article>\n\n        <!-- Card 2: Yellow Grid + Aura Asset Image -->\n        <article class=\"col-span-1 relative w-full h-[500px] md:h-auto min-h-[450px] rounded-[2rem] flex flex-col justify-between p-8 overflow-hidden shadow-2xl border border-transparent\" style=\"background: linear-gradient(#FDE047, #FDE047) padding-box, linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(202,138,4,0.4) 100%) border-box;\">\n            \n            <!-- Aura Asset Image Background -->\n            <div class=\"absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none\">\n                <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/724142aa-44a6-48d3-9cf3-761e00d05b78_1600w.jpg\" class=\"w-full h-full object-cover\" alt=\"Futuristic Deconstructed Pyramid\">\n            </div>\n\n            <!-- Grid Background Overlay -->\n            <div class=\"absolute inset-0 z-0 opacity-[0.15] pointer-events-none\" style=\"background-image: linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px); background-size: 1.5rem 1.5rem;\"></div>\n\n            <!-- Header -->\n            <header class=\"relative z-20 flex justify-between items-center text-sm tracking-tight font-normal\">\n                <div class=\"flex items-center gap-1.5\">\n                    <iconify-icon icon=\"solar:shield-network-linear\" width=\"20\" height=\"20\" style=\"stroke-width: 1.5;\"></iconify-icon>\n                    <span>aegis</span>\n                </div>\n                <span class=\"text-xs opacity-50 uppercase tracking-widest\">Sector.02</span>\n            </header>\n\n            <!-- Main Content -->\n            <main class=\"relative z-20 mt-auto\">\n                <h2 class=\"text-3xl md:text-4xl tracking-tight leading-[1.1] masked-reveal\">\n                    Adaptive shields.<br>Total autonomy.\n                </h2>\n            </main>\n        </article>\n\n        <!-- Card 3: Black Halftone -->\n        <article class=\"col-span-1 md:col-span-2 relative w-full h-[450px] md:h-[350px] rounded-[2rem] flex flex-col md:flex-row justify-between p-8 overflow-hidden text-white shadow-2xl border border-transparent\" style=\"font-family: 'Inter', sans-serif; background: linear-gradient(#0A0A0A, #0A0A0A) padding-box, linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%) border-box;\">\n            \n            <!-- WebGL Halftone Background -->\n            <div class=\"absolute inset-0 z-0 md:left-1/3 pointer-events-none\">\n                <canvas id=\"webgl-halftone\" class=\"w-full h-full\"></canvas>\n            </div>\n\n            <!-- Header (Left on desktop) -->\n            <header class=\"relative z-20 flex md:flex-col justify-between md:justify-start items-center md:items-start text-sm tracking-tight font-normal text-white/90 gap-4\" style=\"font-family: 'Space Mono', monospace;\">\n                <div class=\"flex items-center gap-1.5\">\n                    <iconify-icon icon=\"solar:shield-network-linear\" width=\"20\" height=\"20\" class=\"text-yellow-400\" style=\"stroke-width: 1.5;\"></iconify-icon>\n                    <span>aegis</span>\n                </div>\n                <span class=\"text-xs opacity-50 uppercase tracking-widest\">Sector.03</span>\n            </header>\n\n            <!-- Main Content (Right on desktop) -->\n            <main class=\"relative z-20 mt-auto md:mt-0 md:self-end md:text-right max-w-md w-full\">\n                <h2 class=\"text-4xl md:text-5xl tracking-tight leading-[1.1] font-normal mb-4 md:mb-6 uppercase masked-reveal\">\n                    Quantum<br>Core.\n                </h2>\n                <p class=\"text-xs leading-relaxed text-white/70 md:ml-auto md:max-w-[240px] masked-reveal\" style=\"font-family: 'Space Mono', monospace;\">\n                    Next-gen cryptography<br>for modern infrastructure.\n                </p>\n            </main>\n        </article>\n\n    </div>\n\n    <script>\n        // GSAP ScrollTrigger Setup\n        gsap.registerPlugin(ScrollTrigger);\n\n        // Utility: Split text into words and wrap for masking\n        function wrapWords(element) {\n            const text = element.innerHTML;\n            const words = text.split(/(<br>|\\s+)/).filter(Boolean);\n            element.innerHTML = '';\n            \n            words.forEach(word => {\n                if (word === '<br>') {\n                    element.appendChild(document.createElement('br'));\n                    return;\n                }\n                if (word.trim() === '') {\n                    element.appendChild(document.createTextNode(' '));\n                    return;\n                }\n\n                const outerSpan = document.createElement('span');\n                outerSpan.style.display = 'inline-block';\n                outerSpan.style.overflow = 'hidden';\n                outerSpan.style.verticalAlign = 'bottom';\n                outerSpan.style.paddingBottom = '0.1em'; // Prevent clipping on descenders\n\n                const innerSpan = document.createElement('span');\n                innerSpan.style.display = 'inline-block';\n                innerSpan.innerHTML = word;\n                innerSpan.classList.add('reveal-target');\n                innerSpan.style.transform = 'translateY(110%)';\n                innerSpan.style.willChange = 'transform';\n\n                outerSpan.appendChild(innerSpan);\n                element.appendChild(outerSpan);\n            });\n        }\n\n        // Apply masking structure and animation\n        document.querySelectorAll('.masked-reveal').forEach(el => {\n            wrapWords(el);\n            \n            gsap.to(el.querySelectorAll('.reveal-target'), {\n                scrollTrigger: {\n                    trigger: el,\n                    start: \"top 90%\",\n                    toggleActions: \"play none none reverse\"\n                },\n                y: \"0%\",\n                duration: 0.85,\n                ease: \"power4.out\",\n                stagger: 0.04\n            });\n        });\n\n        /* --- WebGL Section 1: Abstract Lines --- */\n        const initLinesWebGL = () => {\n            const canvas = document.getElementById('webgl-lines');\n            if(!canvas) return;\n            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });\n            const scene = new THREE.Scene();\n            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);\n            \n            const resize = () => {\n                const parent = canvas.parentElement;\n                const width = parent.clientWidth;\n                const height = parent.clientHeight;\n                renderer.setSize(width, height);\n                camera.aspect = width / height;\n                camera.updateProjectionMatrix();\n            };\n            window.addEventListener('resize', resize);\n            resize();\n\n            camera.position.z = 4.5;\n\n            const group = new THREE.Group();\n            scene.add(group);\n\n            const material = new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.85 }); \n            const particlesCount = 200;\n            \n            const geometry = new THREE.BufferGeometry();\n            const positions = new Float32Array(particlesCount * 3);\n            \n            for(let i = 0; i < particlesCount * 3; i+=3) {\n                const r = 2.5;\n                const theta = Math.random() * Math.PI * 2;\n                const phi = Math.acos((Math.random() * 2) - 1);\n                \n                positions[i] = r * Math.sin(phi) * Math.cos(theta);\n                positions[i+1] = r * Math.sin(phi) * Math.sin(theta);\n                positions[i+2] = r * Math.cos(phi);\n            }\n            \n            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));\n            \n            const index = [];\n            for (let i = 0; i < particlesCount; i++) {\n                for (let j = i + 1; j < particlesCount; j++) {\n                    const dx = positions[i*3] - positions[j*3];\n                    const dy = positions[i*3+1] - positions[j*3+1];\n                    const dz = positions[i*3+2] - positions[j*3+2];\n                    const distSq = dx*dx + dy*dy + dz*dz;\n                    if (distSq < 1.2) { \n                        index.push(i, j);\n                    }\n                }\n            }\n            geometry.setIndex(index);\n            \n            const lines = new THREE.LineSegments(geometry, material);\n            group.add(lines);\n\n            const animate = () => {\n                requestAnimationFrame(animate);\n                group.rotation.y += 0.002;\n                group.rotation.x += 0.001;\n                renderer.render(scene, camera);\n            };\n            animate();\n        };\n\n        /* --- WebGL Section 3: Animated Halftone --- */\n        const initHalftoneWebGL = () => {\n            const canvas = document.getElementById('webgl-halftone');\n            if(!canvas) return;\n            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });\n            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\n            renderer.setClearColor(0x0A0A0A, 1);\n            const scene = new THREE.Scene();\n            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);\n            \n            const resize = () => {\n                const parent = canvas.parentElement;\n                const width = Math.max(1, (parent && parent.clientWidth) || window.innerWidth || canvas.clientWidth || 1);\n                const height = Math.max(1, (parent && parent.clientHeight) || window.innerHeight || canvas.clientHeight || 1);\n                renderer.setSize(width, height, false);\n                canvas.style.width = '100%';\n                canvas.style.height = '100%';\n                const aspect = width / height;\n                camera.left = -aspect;\n                camera.right = aspect;\n                camera.bottom = -1;\n                camera.top = 1;\n                camera.updateProjectionMatrix();\n            };\n            window.addEventListener('resize', resize);\n            resize();\n            camera.position.z = 1;\n\n            const gridSize = 20;\n            const geometry = new THREE.BufferGeometry();\n            const positions = [];\n            const scales = [];\n\n            for (let x = -gridSize; x <= gridSize; x++) {\n                for (let y = -gridSize; y <= gridSize; y++) {\n                    positions.push(x * 0.15, y * 0.15, 0);\n                    scales.push(1); \n                }\n            }\n\n            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));\n            geometry.setAttribute('scale', new THREE.Float32BufferAttribute(scales, 1));\n\n            const material = new THREE.ShaderMaterial({\n                uniforms: {\n                    time: { value: 0 },\n                    color1: { value: new THREE.Color(0xFBBF24) }, \n                    color2: { value: new THREE.Color(0xFFFFFF) }\n                },\n                vertexShader: `\n                    attribute float scale;\n                    varying vec2 vUv;\n                    varying float vScale;\n                    uniform float time;\n                    \n                    void main() {\n                        vUv = position.xy;\n                        float dist = length(position.xy);\n                        float animatedScale = scale * (sin(dist * 6.0 - time * 2.5) * 0.5 + 0.5);\n                        vScale = animatedScale;\n                        \n                        gl_PointSize = animatedScale * 5.0; \n                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n                    }\n                `,\n                fragmentShader: `\n                    uniform vec3 color1;\n                    uniform vec3 color2;\n                    varying vec2 vUv;\n                    varying float vScale;\n                    \n                    void main() {\n                        vec2 coord = gl_PointCoord - vec2(0.5);\n                        if(length(coord) > 0.5) discard;\n                        \n                        vec3 finalColor = mix(color2, color1, (vUv.y + 1.0) * 0.5);\n                        gl_FragColor = vec4(finalColor, vScale * 0.9);\n                    }\n                `,\n                transparent: true\n            });\n\n            const points = new THREE.Points(geometry, material);\n            scene.add(points);\n\n            const clock = new THREE.Clock();\n            const animate = () => {\n                requestAnimationFrame(animate);\n                material.uniforms.time.value = clock.getElapsedTime();\n                renderer.render(scene, camera);\n            };\n            animate();\n        };\n\n        // Initialize WebGL instances\n        initLinesWebGL();\n        initHalftoneWebGL();\n    <\/script>\n</body>\n</html>", ne = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Network Diagnostics</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <!-- GSAP & ScrollTrigger for Masked Reveal -->\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&family=JetBrains+Mono:wght@200;300;400&display=swap\" rel=\"stylesheet\">\n    <style>\n        /* Essential mask utility for inner gradient borders */\n        .mask-border {\n            -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);\n            mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);\n            -webkit-mask-composite: destination-out;\n            mask-composite: exclude;\n        }\n    </style>\n</head>\n<body class=\"bg-[#020804] text-white/90 antialiased min-h-screen flex items-center justify-center p-6 md:p-12 selection:bg-[#34d399]/20 font-sans relative overflow-hidden\">\n\n    <!-- Aura Asset Image Background Layer -->\n    <div class=\"absolute inset-0 z-0 opacity-20 bg-[url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg')] bg-cover bg-center pointer-events-none mix-blend-screen\"></div>\n\n    <!-- WebGL-style Lines & Particles Background -->\n    <canvas id=\"bg-waves\" class=\"absolute inset-0 z-0 pointer-events-none opacity-40\"></canvas>\n\n    <main id=\"main-container\" class=\"max-w-7xl w-full relative bg-white/[0.04] p-px z-10 backdrop-blur-sm shadow-2xl shadow-[#34d399]/5 rounded-sm\">\n        \n        <div id=\"flashlight\" class=\"absolute inset-0 z-0 opacity-0 transition-opacity duration-300 pointer-events-none\" style=\"background: radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(52,211,153,0.08), transparent 40%);\"></div>\n\n        <!-- Corner Accents -->\n        <div class=\"absolute -top-[3px] -left-[3px] w-1.5 h-1.5 border border-[#34d399]/30 bg-[#020804] z-30\"></div>\n        <div class=\"absolute -top-[3px] -right-[3px] w-1.5 h-1.5 border border-[#34d399]/30 bg-[#020804] z-30\"></div>\n        <div class=\"absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 border border-[#34d399]/30 bg-[#020804] z-30\"></div>\n        <div class=\"absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 border border-[#34d399]/30 bg-[#020804] z-30\"></div>\n\n        <!-- Horizontal Shooting Line -->\n        <div class=\"hidden md:block absolute -top-px left-0 right-0 h-px overflow-hidden z-20 pointer-events-none\">\n            <div id=\"shoot-h\" class=\"absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-transparent via-[#34d399]/80 to-transparent\"></div>\n        </div>\n\n        <div class=\"grid grid-cols-1 md:grid-cols-3 gap-y-px md:gap-x-px relative z-10\">\n            \n            <article class=\"relative flex flex-col py-12 md:p-12 bg-[#020804]/90 backdrop-blur-md\">\n                <!-- Border Gradient Overlay -->\n                <div class=\"absolute inset-0 border border-transparent bg-[linear-gradient(to_bottom,rgba(52,211,153,0.35),transparent)] mask-border pointer-events-none z-20\"></div>\n\n                <header class=\"text-xs text-white/40 mb-16 uppercase tracking-widest font-mono flex items-center gap-3 font-extralight\">\n                    <iconify-icon icon=\"solar:cpu-linear\" stroke-width=\"1.5\" class=\"text-sm text-[#34d399] drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]\"></iconify-icon>\n                    CORE-X\n                </header>\n                <div class=\"flex-grow flex items-center justify-center mb-16 relative h-56 w-full\">\n                    <canvas id=\"canvas-layers\" class=\"absolute inset-0 w-full h-full\" style=\"touch-action: none;\"></canvas>\n                </div>\n                <div>\n                    <h3 class=\"text-lg font-extralight tracking-tight mb-3 text-white/90 flex items-center\">\n                        <span class=\"typewriter\" data-text=\"Neural Synchrony\"></span><span class=\"animate-pulse inline-block w-1 h-4 bg-[#34d399]/80 ml-2 shadow-[0_0_8px_rgba(52,211,153,0.6)]\"></span>\n                    </h3>\n                    <p class=\"text-sm text-white/40 leading-relaxed font-extralight reveal-text\">Optimized for zero-latency cognitive routing, maintaining absolute parity across decentralized processing nodes.</p>\n                </div>\n            </article>\n\n            <article class=\"relative flex flex-col py-12 md:p-12 bg-[#020804]/90 backdrop-blur-md\">\n                <!-- Border Gradient Overlay -->\n                <div class=\"absolute inset-0 border border-transparent bg-[linear-gradient(to_bottom,rgba(52,211,153,0.35),transparent)] mask-border pointer-events-none z-20\"></div>\n                \n                <div class=\"hidden md:block absolute top-0 bottom-0 -left-px w-px overflow-hidden z-20 pointer-events-none\">\n                    <div id=\"shoot1\" class=\"absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-[#34d399]/70 to-transparent\"></div>\n                </div>\n                \n                <header class=\"text-xs text-white/40 mb-16 uppercase tracking-widest font-mono flex items-center gap-3 font-extralight\">\n                    <iconify-icon icon=\"solar:server-square-linear\" stroke-width=\"1.5\" class=\"text-sm text-[#34d399] drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]\"></iconify-icon>\n                    LINK-Y\n                </header>\n                <div class=\"flex-grow flex items-center justify-center mb-16 relative h-56 w-full\">\n                    <canvas id=\"canvas-nodes\" class=\"absolute inset-0 w-full h-full\" style=\"touch-action: none;\"></canvas>\n                </div>\n                <div>\n                    <h3 class=\"text-lg font-extralight tracking-tight mb-3 text-white/90 flex items-center\">\n                        <span class=\"typewriter\" data-text=\"Fluid Topologies\"></span><span class=\"animate-pulse inline-block w-1 h-4 bg-[#34d399]/80 ml-2 shadow-[0_0_8px_rgba(52,211,153,0.6)]\"></span>\n                    </h3>\n                    <p class=\"text-sm text-white/40 leading-relaxed font-extralight reveal-text\">Self-healing network architectures that dynamically adjust vectors to circumvent bottlenecks and systemic anomalies.</p>\n                </div>\n            </article>\n\n            <article class=\"relative flex flex-col py-12 md:p-12 bg-[#020804]/90 backdrop-blur-md\">\n                <!-- Border Gradient Overlay -->\n                <div class=\"absolute inset-0 border border-transparent bg-[linear-gradient(to_bottom,rgba(52,211,153,0.35),transparent)] mask-border pointer-events-none z-20\"></div>\n\n                <div class=\"hidden md:block absolute top-0 bottom-0 -left-px w-px overflow-hidden z-20 pointer-events-none\">\n                    <div id=\"shoot2\" class=\"absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#34d399]/60 to-transparent\"></div>\n                </div>\n                <div class=\"hidden md:block absolute top-0 bottom-0 -right-px w-px overflow-hidden z-20 pointer-events-none\">\n                    <div id=\"shoot3\" class=\"absolute top-0 left-0 w-full h-56 bg-gradient-to-b from-transparent via-[#34d399]/70 to-transparent\"></div>\n                </div>\n\n                <header class=\"text-xs text-white/40 mb-16 uppercase tracking-widest font-mono flex items-center gap-3 font-extralight\">\n                    <iconify-icon icon=\"solar:network-linear\" stroke-width=\"1.5\" class=\"text-sm text-[#34d399] drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]\"></iconify-icon>\n                    GRID-Z\n                </header>\n                <div class=\"flex-grow flex items-center justify-center mb-16 relative h-56 w-full\">\n                    <canvas id=\"canvas-flow\" class=\"absolute inset-0 w-full h-full\" style=\"touch-action: none;\"></canvas>\n                </div>\n                <div>\n                    <h3 class=\"text-lg font-extralight tracking-tight mb-3 text-white/90 flex items-center\">\n                        <span class=\"typewriter\" data-text=\"Elastic Matrices\"></span><span class=\"animate-pulse inline-block w-1 h-4 bg-[#34d399]/80 ml-2 shadow-[0_0_8px_rgba(52,211,153,0.6)]\"></span>\n                    </h3>\n                    <p class=\"text-sm text-white/40 leading-relaxed font-extralight reveal-text\">Responsive structural frameworks that instantly allocate computational mass during spikes and retract to preserve efficiency.</p>\n                </div>\n            </article>\n\n        </div>\n    </main>\n\n    <script>\n        // WebGL-style Background (Lines & Particles)\n        const bgCanvas = document.getElementById('bg-waves');\n        const bgCtx = bgCanvas.getContext('2d', { alpha: true });\n        let bw, bh, bgT = 0;\n        const resizeBg = () => {\n            bw = window.innerWidth; bh = window.innerHeight;\n            bgCanvas.width = bw; bgCanvas.height = bh;\n        };\n        window.addEventListener('resize', resizeBg);\n        resizeBg();\n\n        const drawBg = () => {\n            bgT += 0.012;\n            bgCtx.clearRect(0, 0, bw, bh);\n            bgCtx.save();\n            bgCtx.translate(bw / 2, bh / 2 + 150);\n            \n            const cols = 32, rows = 22, sp = 65;\n            bgCtx.lineWidth = 1;\n            \n            for(let z = 0; z < rows; z++) {\n                for(let x = 0; x < cols; x++) {\n                    const px = (x - cols/2) * sp;\n                    const pz = z * sp;\n                    const scale = 800 / (800 + pz);\n                    const sx = px * scale;\n                    const y = Math.sin(x * 0.3 + bgT) * Math.cos(z * 0.3 + bgT) * 60;\n                    const sy = (y + 50) * scale - 200;\n\n                    bgCtx.fillStyle = `rgba(52,211,153, ${0.7 * scale})`;\n                    bgCtx.beginPath();\n                    bgCtx.arc(sx, sy, 1.2 * scale, 0, Math.PI*2);\n                    bgCtx.fill();\n\n                    if (x > 0) {\n                        const pxL = (x - 1 - cols/2) * sp;\n                        const sxL = pxL * scale;\n                        const yL = Math.sin((x - 1) * 0.3 + bgT) * Math.cos(z * 0.3 + bgT) * 60;\n                        const syL = (yL + 50) * scale - 200;\n                        bgCtx.strokeStyle = `rgba(52,211,153, ${0.12 * scale})`;\n                        bgCtx.beginPath();\n                        bgCtx.moveTo(sx, sy); bgCtx.lineTo(sxL, syL);\n                        bgCtx.stroke();\n                    }\n                    if (z > 0) {\n                        const pzU = (z - 1) * sp;\n                        const scaleU = 800 / (800 + pzU);\n                        const sxU = px * scaleU;\n                        const yU = Math.sin(x * 0.3 + bgT) * Math.cos((z - 1) * 0.3 + bgT) * 60;\n                        const syU = (yU + 50) * scaleU - 200;\n                        bgCtx.strokeStyle = `rgba(52,211,153, ${0.12 * scale})`;\n                        bgCtx.beginPath();\n                        bgCtx.moveTo(sx, sy); bgCtx.lineTo(sxU, syU);\n                        bgCtx.stroke();\n                    }\n                }\n            }\n            bgCtx.restore();\n            requestAnimationFrame(drawBg);\n        };\n        drawBg();\n\n        // Interactive & Shooting Lines\n        const mainEl = document.getElementById('main-container');\n        const flash = document.getElementById('flashlight');\n        const s1 = document.getElementById('shoot1'), s2 = document.getElementById('shoot2');\n        const s3 = document.getElementById('shoot3'), sh = document.getElementById('shoot-h');\n        let pos1 = -200, pos2 = -400, pos3 = -300, posH = -300;\n\n        mainEl.addEventListener('mousemove', (e) => {\n            const rect = mainEl.getBoundingClientRect();\n            flash.style.setProperty('--x', `${e.clientX - rect.left}px`);\n            flash.style.setProperty('--y', `${e.clientY - rect.top}px`);\n            flash.style.opacity = '1';\n        });\n        mainEl.addEventListener('mouseleave', () => flash.style.opacity = '0');\n\n        const animateShoots = () => {\n            const h = mainEl.offsetHeight || 1000, w = mainEl.offsetWidth || 1200;\n            pos1 += 2.5; pos2 += 1.8; pos3 += 3; posH += 3.5;\n            if (pos1 > h) pos1 = -200;\n            if (pos2 > h) pos2 = -200;\n            if (pos3 > h) pos3 = -200;\n            if (posH > w) posH = -300;\n            if (s1) s1.style.transform = `translateY(${pos1}px)`;\n            if (s2) s2.style.transform = `translateY(${pos2}px)`;\n            if (s3) s3.style.transform = `translateY(${pos3}px)`;\n            if (sh) sh.style.transform = `translateX(${posH}px)`;\n            requestAnimationFrame(animateShoots);\n        };\n        animateShoots();\n\n        // Typewriter Effect\n        document.querySelectorAll('.typewriter').forEach(el => {\n            const text = el.getAttribute('data-text');\n            let i = 0, isDeleting = false;\n            const type = () => {\n                i += isDeleting ? -1 : 1;\n                el.textContent = text.substring(0, i);\n                let delay = isDeleting ? 30 : 80;\n                if (!isDeleting && i === text.length) { delay = 4000; isDeleting = true; }\n                else if (isDeleting && i === 0) { delay = 1500; isDeleting = false; }\n                setTimeout(type, delay);\n            };\n            type();\n        });\n\n        // GSAP Masked Staggered Word Reveal \n        gsap.registerPlugin(ScrollTrigger);\n        document.querySelectorAll('.reveal-text').forEach((el) => {\n            const words = el.innerText.split(' ');\n            el.innerHTML = '';\n            words.forEach(word => {\n                const wrapper = document.createElement('span');\n                wrapper.className = 'inline-block overflow-hidden mr-[0.25em] align-bottom leading-tight';\n                const inner = document.createElement('span');\n                inner.className = 'inline-block translate-y-full will-change-transform';\n                inner.innerText = word;\n                wrapper.appendChild(inner);\n                el.appendChild(wrapper);\n            });\n\n            gsap.to(el.querySelectorAll('.will-change-transform'), {\n                y: 0,\n                ease: \"power4.out\",\n                duration: 0.8,\n                stagger: 0.02,\n                scrollTrigger: {\n                    trigger: el,\n                    start: \"top 95%\",\n                }\n            });\n        });\n\n        // 3D Canvas Utilities\n        const projectIso = (x, y, z) => {\n            const angle = Math.PI / 6; \n            return { x: (x - z) * Math.cos(angle), y: y + (x + z) * Math.sin(angle) };\n        };\n\n        const setupCanvas = (id, renderFn) => {\n            const canvas = document.getElementById(id);\n            const ctx = canvas.getContext('2d', { alpha: true });\n            let w, h, time = 0;\n            const resize = () => {\n                const rect = canvas.parentElement.getBoundingClientRect();\n                w = rect.width; h = rect.height;\n                const dpr = window.devicePixelRatio || 1;\n                canvas.width = w * dpr; canvas.height = h * dpr;\n                ctx.scale(dpr, dpr);\n            };\n            window.addEventListener('resize', resize);\n            resize();\n            const loop = () => {\n                time += 0.015;\n                ctx.clearRect(0, 0, w, h);\n                ctx.save();\n                ctx.translate(w / 2, h / 2 + 5);\n                renderFn(ctx, time);\n                ctx.restore();\n                requestAnimationFrame(loop);\n            };\n            loop();\n        };\n\n        // Card 1: Fixed Cropping\n        setupCanvas('canvas-layers', (ctx, t) => {\n            const size = 42, layers = 5, gap = 20;\n            ctx.lineWidth = 1;\n            for (let i = layers - 1; i >= 0; i--) {\n                const yOff = i * gap - (layers * gap) / 2 + Math.sin(t + i * 0.4) * 4;\n                const p1 = projectIso(-size, yOff, -size), p2 = projectIso(size, yOff, -size);\n                const p3 = projectIso(size, yOff, size), p4 = projectIso(-size, yOff, size);\n\n                ctx.beginPath();\n                ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);\n                ctx.lineTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.closePath();\n                \n                ctx.fillStyle = '#020804'; ctx.fill();\n                ctx.strokeStyle = i === 0 ? 'rgba(52,211,153,0.8)' : 'rgba(52,211,153,0.15)';\n                ctx.stroke();\n\n                if (i === 0) {\n                    ctx.save();\n                    const center = projectIso(0, yOff, 0);\n                    ctx.translate(center.x, center.y); ctx.scale(1, 0.5);\n                    const sqSize = size * 0.55;\n                    ctx.beginPath(); ctx.rect(-sqSize, -sqSize, sqSize * 2, sqSize * 2);\n                    ctx.strokeStyle = 'rgba(52,211,153,0.4)'; ctx.stroke();\n                    ctx.clip();\n                    for(let j = -sqSize; j < sqSize; j += 4) {\n                        ctx.beginPath(); ctx.moveTo(-sqSize, j); ctx.lineTo(sqSize, j);\n                        ctx.strokeStyle = 'rgba(52,211,153,0.2)'; ctx.stroke();\n                    }\n                    ctx.restore();\n                }\n                \n                if (i < layers - 1) {\n                    const nextY = (i+1) * gap - (layers * gap) / 2 + Math.sin(t + (i+1) * 0.4) * 4;\n                    const p1Next = projectIso(-size, nextY, -size), p3Next = projectIso(size, nextY, size);\n                    ctx.beginPath(); ctx.setLineDash([2, 2]);\n                    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p1Next.x, p1Next.y);\n                    ctx.moveTo(p3.x, p3.y); ctx.lineTo(p3Next.x, p3Next.y);\n                    ctx.strokeStyle = 'rgba(52,211,153,0.1)'; ctx.stroke();\n                    ctx.setLineDash([]);\n                }\n            }\n        });\n\n        // Card 2\n        const drawCube = (ctx, x, y, z, s, colorStr) => {\n            const pts = [\n                projectIso(x-s, y-s, z-s), projectIso(x+s, y-s, z-s), projectIso(x+s, y-s, z+s), projectIso(x-s, y-s, z+s),\n                projectIso(x-s, y+s, z-s), projectIso(x+s, y+s, z-s), projectIso(x+s, y+s, z+s), projectIso(x-s, y+s, z+s)\n            ];\n            ctx.strokeStyle = colorStr; ctx.lineWidth = 1;\n            ctx.beginPath();\n            ctx.moveTo(pts[0].x, pts[0].y); ctx.lineTo(pts[1].x, pts[1].y); ctx.lineTo(pts[2].x, pts[2].y); ctx.lineTo(pts[3].x, pts[3].y); ctx.closePath();\n            ctx.moveTo(pts[4].x, pts[4].y); ctx.lineTo(pts[5].x, pts[5].y); ctx.lineTo(pts[6].x, pts[6].y); ctx.lineTo(pts[7].x, pts[7].y); ctx.closePath();\n            ctx.moveTo(pts[0].x, pts[0].y); ctx.lineTo(pts[4].x, pts[4].y);\n            ctx.moveTo(pts[1].x, pts[1].y); ctx.lineTo(pts[5].x, pts[5].y);\n            ctx.moveTo(pts[2].x, pts[2].y); ctx.lineTo(pts[6].x, pts[6].y);\n            ctx.moveTo(pts[3].x, pts[3].y); ctx.lineTo(pts[7].x, pts[7].y);\n            ctx.stroke();\n        };\n\n        setupCanvas('canvas-nodes', (ctx, t) => {\n            const s = 22, float = Math.sin(t) * 4;\n            drawCube(ctx, -35, -float, -35, s, 'rgba(52,211,153,0.15)');\n            drawCube(ctx, 35, float, -35, s, 'rgba(52,211,153,0.15)');\n            drawCube(ctx, -35, float, 35, s, 'rgba(52,211,153,0.15)');\n            drawCube(ctx, 35, -float, 35, s, 'rgba(52,211,153,0.15)');\n            drawCube(ctx, 0, Math.cos(t)*6 - 15, 0, s*0.9, 'rgba(52,211,153,0.6)'); \n        });\n\n        // Card 3\n        setupCanvas('canvas-flow', (ctx, t) => {\n            const size = 65, segments = 22, step = (size * 2) / segments;\n            ctx.lineWidth = 1;\n            const getH = (x, z) => {\n                const dist = Math.sqrt(x*x + z*z);\n                const peak = Math.max(0, 45 - dist * 1.1);\n                const wave = Math.sin(x*0.2 + t*1.5) * Math.cos(z*0.2 + t*1.5) * 5;\n                return -peak - wave + 15;\n            };\n\n            for (let z = -size; z < size; z += step) {\n                for (let x = -size; x < size; x += step) {\n                    const y1 = getH(x, z), y2 = getH(x + step, z);\n                    const y3 = getH(x + step, z + step), y4 = getH(x, z + step);\n                    const p1 = projectIso(x, y1, z), p2 = projectIso(x + step, y2, z);\n                    const p3 = projectIso(x + step, y3, z + step), p4 = projectIso(x, y4, z + step);\n\n                    ctx.beginPath();\n                    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);\n                    ctx.lineTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.closePath();\n                    ctx.fillStyle = '#020804'; ctx.fill();\n\n                    const heightRatio = Math.max(0, (-y1) / 30);\n                    const alpha = 0.05 + heightRatio * 0.4;\n                    ctx.strokeStyle = heightRatio > 0.6 ? `rgba(52,211,153,${alpha + 0.3})` : `rgba(52,211,153,${alpha + 0.05})`;\n                    ctx.stroke();\n                }\n            }\n        });\n    <\/script>\n</body>\n</html>", re = "<!doctype html>\n<html lang=\"en\" data-autofocus-guard-installed=\"1\"><head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Vanguard Security - Intelligence</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <!-- GSAP for Masked Reveal -->\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n<style>*, ::before, ::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/* ! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com */*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::after,::before{--tw-content:''}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0px}.top-0{top:0px}.z-0{z-index:0}.z-50{z-index:50}.z-10{z-index:10}.mx-4{margin-left:1rem;margin-right:1rem}.mx-auto{margin-left:auto;margin-right:auto}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mt-2{margin-top:0.5rem}.mt-auto{margin-top:auto}.flex{display:flex}.grid{display:grid}.h-1{height:0.25rem}.h-32{height:8rem}.h-\\[65vh\\]{height:65vh}.h-full{height:100%}.min-h-screen{min-height:100vh}.min-h-\\[500px\\]{min-height:500px}.w-full{width:100%}.max-w-2xl{max-width:42rem}.max-w-4xl{max-width:56rem}.max-w-7xl{max-width:80rem}.max-w-\\[40px\\]{max-width:40px}.grid-cols-1{grid-template-columns:repeat(1, minmax(0, 1fr))}.flex-col{flex-direction:column}.flex-col-reverse{flex-direction:column-reverse}.items-end{align-items:flex-end}.items-center{align-items:center}.items-baseline{align-items:baseline}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1\\.5{gap:0.375rem}.gap-2{gap:0.5rem}.gap-3{gap:0.75rem}.gap-6{gap:1.5rem}.gap-\\[2px\\]{gap:2px}.overflow-hidden{overflow:hidden}.rounded{border-radius:0.25rem}.rounded-md{border-radius:0.375rem}.rounded-sm{border-radius:0.125rem}.rounded-xl{border-radius:0.75rem}.border-b{border-bottom-width:1px}.border-white\\/5{border-color:rgb(255 255 255 / 0.05)}.bg-\\[\\#0a0a0a\\]{--tw-bg-opacity:1;background-color:rgb(10 10 10 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0a0a0a\\]\\/80{background-color:rgb(10 10 10 / 0.8)}.bg-\\[\\#1a1a1a\\]{--tw-bg-opacity:1;background-color:rgb(26 26 26 / var(--tw-bg-opacity, 1))}.bg-blue-600{--tw-bg-opacity:1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-\\[\\#121212\\]{--tw-bg-opacity:1;background-color:rgb(18 18 18 / var(--tw-bg-opacity, 1))}.bg-blue-500\\/80{background-color:rgb(59 130 246 / 0.8)}.bg-purple-500\\/80{background-color:rgb(168 85 247 / 0.8)}.bg-slate-500{--tw-bg-opacity:1;background-color:rgb(100 116 139 / var(--tw-bg-opacity, 1))}.p-6{padding:1.5rem}.px-1\\.5{padding-left:0.375rem;padding-right:0.375rem}.px-3{padding-left:0.75rem;padding-right:0.75rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0\\.5{padding-top:0.125rem;padding-bottom:0.125rem}.py-1\\.5{padding-top:0.375rem;padding-bottom:0.375rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-12{padding-top:3rem;padding-bottom:3rem}.pt-16{padding-top:4rem}.pt-6{padding-top:1.5rem}.text-center{text-align:center}.font-sans{font-family:ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"}.text-base{font-size:1rem;line-height:1.5rem}.text-xs{font-size:0.75rem;line-height:1rem}.text-5xl{font-size:3rem;line-height:1}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:0.875rem;line-height:1.25rem}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.font-light{font-weight:300}.leading-relaxed{line-height:1.625}.leading-tight{line-height:1.25}.tracking-tight{letter-spacing:-0.025em}.tracking-wide{letter-spacing:0.025em}.text-slate-200{--tw-text-opacity:1;color:rgb(226 232 240 / var(--tw-text-opacity, 1))}.text-slate-300{--tw-text-opacity:1;color:rgb(203 213 225 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-slate-400{--tw-text-opacity:1;color:rgb(148 163 184 / var(--tw-text-opacity, 1))}.text-slate-500{--tw-text-opacity:1;color:rgb(100 116 139 / var(--tw-text-opacity, 1))}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.opacity-80{opacity:0.8}.backdrop-blur-md{--tw-backdrop-blur:blur(12px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition-colors{transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.duration-300{transition-duration:300ms}.selection\\:bg-blue-500\\/30 *::selection{background-color:rgb(59 130 246 / 0.3)}.selection\\:bg-blue-500\\/30::selection{background-color:rgb(59 130 246 / 0.3)}.before\\:absolute::before{content:var(--tw-content);position:absolute}.before\\:inset-0::before{content:var(--tw-content);inset:0px}.before\\:-z-10::before{content:var(--tw-content);z-index:-10}.before\\:rounded-md::before{content:var(--tw-content);border-radius:0.375rem}.before\\:rounded-xl::before{content:var(--tw-content);border-radius:0.75rem}.before\\:bg-gradient-to-b::before{content:var(--tw-content);background-image:linear-gradient(to bottom, var(--tw-gradient-stops))}.before\\:from-white\\/20::before{content:var(--tw-content);--tw-gradient-from:rgb(255 255 255 / 0.2) var(--tw-gradient-from-position);--tw-gradient-to:rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.before\\:from-white\\/15::before{content:var(--tw-content);--tw-gradient-from:rgb(255 255 255 / 0.15) var(--tw-gradient-from-position);--tw-gradient-to:rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.before\\:to-transparent::before{content:var(--tw-content);--tw-gradient-to:transparent var(--tw-gradient-to-position)}.before\\:p-\\[1px\\]::before{content:var(--tw-content);padding:1px}.before\\:transition-colors::before{content:var(--tw-content);transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.before\\:duration-500::before{content:var(--tw-content);transition-duration:500ms}.before\\:\\[mask-composite\\:exclude\\]::before{content:var(--tw-content);-webkit-mask-composite:xor;mask-composite:exclude}.before\\:\\[mask\\:linear-gradient\\(\\#fff_0_0\\)_content-box\\2c linear-gradient\\(\\#fff_0_0\\)\\]::before{content:var(--tw-content);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)}.hover\\:bg-\\[\\#222\\]:hover{--tw-bg-opacity:1;background-color:rgb(34 34 34 / var(--tw-bg-opacity, 1))}.hover\\:before\\:from-white\\/25:hover::before{content:var(--tw-content);--tw-gradient-from:rgb(255 255 255 / 0.25) var(--tw-gradient-from-position);--tw-gradient-to:rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}.group:hover .group-hover\\:opacity-100{opacity:1}@media (min-width: 768px){.md\\:grid-cols-2{grid-template-columns:repeat(2, minmax(0, 1fr))}.md\\:text-7xl{font-size:4.5rem;line-height:1}.md\\:text-xl{font-size:1.25rem;line-height:1.75rem}}@media (min-width: 1024px){.lg\\:grid-cols-3{grid-template-columns:repeat(3, minmax(0, 1fr))}.lg\\:text-2xl{font-size:1.5rem;line-height:2rem}.lg\\:text-8xl{font-size:6rem;line-height:1}}</style><meta name=\"disabled-font-classes\" content=\"font-inter,font-roboto,font-poppins,font-playfair,font-merriweather,font-bricolage,font-work-sans,font-pt-serif,font-space-mono,font-cormorant,font-newsreader,font-dm-sans,font-oswald,font-geist-mono,font-space-grotesk,font-montserrat,font-quicksand,font-google-sans-flex,font-nunito,font-geist,font-jakarta,font-instrument-serif\"><link id=\"all-fonts-link-font-manrope\" rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&amp;display=swap\"><style id=\"all-fonts-style-font-manrope\">.font-manrope { font-family: 'Manrope', sans-serif !important; }</style></head>\n<body class=\"bg-[#0a0a0a] text-slate-200 min-h-screen selection:bg-blue-500/30 antialiased font-sans\">\n\n    <!-- Header -->\n    <header class=\"fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5\">\n        <div class=\"flex items-center gap-2\">\n            <span class=\"text-base text-white tracking-tight font-medium font-sans\">Vanguard</span>\n            <span class=\"bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded tracking-wide font-sans\">Security</span>\n        </div>\n        <button class=\"relative flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#222] transition-colors text-slate-300 text-xs px-3 py-1.5 rounded-md z-0 before:absolute before:inset-0 before:-z-10 before:rounded-md before:p-[1px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[WebkitMaskComposite:xor] font-sans\">\n            <iconify-icon icon=\"solar:alt-arrow-left-linear\" stroke-width=\"1.5\"></iconify-icon>\n            Back to Portal\n        </button>\n    </header>\n\n    <!-- Hero Section with Canvas Animation & Aura Background -->\n    <section class=\"relative w-full h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/5 pt-16\">\n        <!-- Aura Abstract Asset Image Background -->\n        <div class=\"absolute inset-0 z-0 opacity-20 mix-blend-screen bg-[url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_3840w.jpg')] bg-cover bg-center\"></div>\n        \n        <!-- WebGL/Canvas Background -->\n        <canvas id=\"particle-canvas\" class=\"absolute inset-0 z-0 w-full h-full opacity-80\" width=\"1519\" height=\"715\"></canvas>\n        \n        <!-- Hero Content -->\n        <div class=\"relative z-10 text-center mx-4 max-w-4xl w-full\">\n            <h1 class=\"reveal-text text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-tight mb-6 font-manrope font-light\">\n                Autonomous Cyber<br>Immunity\n            </h1>\n            <p class=\"reveal-text text-lg md:text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-manrope font-light\">\n                Securing global infrastructure through AI-driven threat intelligence and proactive zero-day neutralization.\n            </p>\n        </div>\n    </section>\n\n    <!-- Content Grid Section -->\n    <section class=\"max-w-7xl mx-auto px-6 py-12\">\n        <div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">\n            \n            <!-- Card 1 -->\n            <div class=\"relative bg-[#121212] rounded-xl p-6 h-full flex flex-col group z-0 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:p-[1px] before:bg-gradient-to-b before:from-white/15 hover:before:from-white/25 before:to-transparent before:transition-colors before:duration-500 before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[WebkitMaskComposite:xor]\">\n                <div class=\"mb-4\">\n                    <h3 class=\"reveal-text text-base text-white tracking-tight flex items-baseline gap-2 font-medium font-sans\">\n                        Sentinel Protocol <span class=\"text-xs text-slate-500 font-normal font-sans\">(Threat Detection)</span>\n                    </h3>\n                    <p class=\"text-sm text-slate-400 mt-2 leading-relaxed font-normal font-sans\">\n                        Deep learning algorithms monitoring data streams to isolate vulnerabilities before they manifest.\n                    </p>\n                </div>\n                \n                <!-- Animated Dot Chart -->\n                <div class=\"mt-auto pt-6 flex items-end gap-3 h-32 opacity-80 group-hover:opacity-100 transition-opacity\">\n                    <!-- Bars -->\n                    <div class=\"chart-col flex flex-col-reverse gap-[2px] w-full max-w-[40px]\">\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                    </div>\n                    <div class=\"chart-col flex flex-col-reverse gap-[2px] w-full max-w-[40px]\">\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                    </div>\n                    <div class=\"chart-col flex flex-col-reverse gap-[2px] w-full max-w-[40px]\">\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-slate-500 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Card 2 -->\n            <div class=\"relative bg-[#121212] rounded-xl p-6 h-full flex flex-col group z-0 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:p-[1px] before:bg-gradient-to-b before:from-white/15 hover:before:from-white/25 before:to-transparent before:transition-colors before:duration-500 before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[WebkitMaskComposite:xor]\">\n                <div class=\"mb-4\">\n                    <h3 class=\"reveal-text text-base text-white tracking-tight flex items-baseline gap-2 font-medium font-sans\">\n                        Nexus Guardian <span class=\"text-xs text-slate-500 font-normal font-sans\">(Node Security)</span>\n                    </h3>\n                    <p class=\"text-sm text-slate-400 mt-2 leading-relaxed font-normal font-sans\">\n                        Heuristic analysis tracking process execution and memory states to halt malicious payloads instantly.\n                    </p>\n                </div>\n                \n                <!-- Animated Dot Chart (Purple tint) -->\n                <div class=\"mt-auto pt-6 flex items-end gap-3 h-32 opacity-80 group-hover:opacity-100 transition-opacity\">\n                    <div class=\"chart-col flex flex-col-reverse gap-[2px] w-full max-w-[40px]\">\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                    </div>\n                    <div class=\"chart-col flex flex-col-reverse gap-[2px] w-full max-w-[40px]\">\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                    </div>\n                    <div class=\"chart-col flex flex-col-reverse gap-[2px] w-full max-w-[40px]\">\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-purple-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Card 3 -->\n            <div class=\"relative bg-[#121212] rounded-xl p-6 h-full flex flex-col group z-0 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:p-[1px] before:bg-gradient-to-b before:from-white/15 hover:before:from-white/25 before:to-transparent before:transition-colors before:duration-500 before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[WebkitMaskComposite:xor]\">\n                <div class=\"mb-4\">\n                    <h3 class=\"reveal-text text-base text-white tracking-tight flex items-baseline gap-2 font-medium font-sans\">\n                        Aether Monitor <span class=\"text-xs text-slate-500 font-normal font-sans\">(Cloud Defense)</span>\n                    </h3>\n                    <p class=\"text-sm text-slate-400 mt-2 leading-relaxed font-normal font-sans\">\n                        Continuous validation of distributed environments and access controls to maintain absolute state integrity.\n                    </p>\n                </div>\n                \n                <!-- Animated Dot Chart (Blue tint) -->\n                <div class=\"mt-auto pt-6 flex items-end gap-3 h-32 opacity-80 group-hover:opacity-100 transition-opacity\">\n                    <div class=\"chart-col flex flex-col-reverse gap-[2px] w-full max-w-[40px]\">\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 0.15;\"></div>\n                    </div>\n                    <div class=\"chart-col flex flex-col-reverse gap-[2px] w-full max-w-[40px]\">\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                        <div class=\"chart-dot w-full h-1 bg-blue-500/80 rounded-sm transition-opacity duration-300\" style=\"opacity: 1;\"></div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </section>\n\n    <!-- Scripts -->\n    <script>\n        document.addEventListener(\"DOMContentLoaded\", () => {\n            // Text Masked Reveal with GSAP Split Logic\n            document.querySelectorAll('.reveal-text').forEach(el => {\n                const html = el.innerHTML;\n                const newHtml = html.split(/(<br\\s*\\/?>|\\s+)/).map(part => {\n                    if (part.match(/<br/i)) return part;\n                    if (part.trim() === '') return part; \n                    return `<span style=\"display:inline-block; overflow:hidden; vertical-align:top;\"><span class=\"reveal-word\" style=\"display:inline-block; transform:translateY(100%); opacity:0;\">${part}</span></span>`;\n                }).join('');\n                el.innerHTML = newHtml;\n            });\n\n            gsap.registerPlugin(ScrollTrigger);\n            gsap.utils.toArray('.reveal-text').forEach(el => {\n                gsap.to(el.querySelectorAll('.reveal-word'), {\n                    y: '0%',\n                    opacity: 1,\n                    duration: 0.8,\n                    stagger: 0.04,\n                    ease: 'power3.out',\n                    scrollTrigger: {\n                        trigger: el,\n                        start: 'top 90%'\n                    }\n                });\n            });\n\n            // Chart Animation Logic\n            setInterval(() => {\n                document.querySelectorAll('.chart-col').forEach(col => {\n                    const dots = col.querySelectorAll('.chart-dot');\n                    const activeCount = Math.floor(Math.random() * (dots.length + 1));\n                    dots.forEach((dot, index) => {\n                        dot.style.opacity = index < activeCount ? '1' : '0.15';\n                    });\n                });\n            }, 600);\n\n            // Canvas Background Logic\n            const canvas = document.getElementById('particle-canvas');\n            if (canvas) {\n                const ctx = canvas.getContext('2d');\n                let width, height;\n                \n                const spacing = 16;\n                const dotRadius = 1.5;\n                let time = 0;\n\n                function resize() {\n                    width = canvas.width = canvas.offsetWidth;\n                    height = canvas.height = canvas.offsetHeight;\n                }\n                \n                window.addEventListener('resize', resize);\n                resize();\n\n                function draw() {\n                    ctx.clearRect(0, 0, width, height);\n                    \n                    const cols = Math.floor(width / spacing);\n                    const rows = Math.floor(height / spacing);\n                    \n                    const offsetX = (width - cols * spacing) / 2;\n                    const offsetY = (height - rows * spacing) / 2;\n\n                    for (let i = 0; i <= cols; i++) {\n                        for (let j = 0; j <= rows; j++) {\n                            const x = offsetX + i * spacing;\n                            const y = offsetY + j * spacing;\n                            \n                            const nx = i * 0.1;\n                            const ny = j * 0.1;\n                            \n                            const wave1 = Math.sin(nx + time * 0.5) * Math.cos(ny - time * 0.3);\n                            const wave2 = Math.sin(nx * 0.5 - ny * 0.5 + time * 0.8);\n                            const value = wave1 + wave2;\n\n                            if (value > 0.1) {\n                                ctx.beginPath();\n                                ctx.arc(x, y, dotRadius, 0, Math.PI * 2);\n\n                                const highlightCheck = Math.sin(i * 12.34) * Math.cos(j * 56.78);\n                                \n                                if (highlightCheck > 0.98) {\n                                    ctx.fillStyle = '#3b82f6'; // Blue highlight\n                                } else if (highlightCheck < -0.98) {\n                                    ctx.fillStyle = '#8b5cf6'; // Purple highlight\n                                } else {\n                                    const alpha = Math.min(0.6, (value - 0.1) * 0.8);\n                                    ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;\n                                }\n                                \n                                ctx.fill();\n                            }\n                        }\n                    }\n                    \n                    time += 0.02;\n                    requestAnimationFrame(draw);\n                }\n                \n                draw();\n            }\n        });\n    <\/script>\n\n</body></html>", w = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Skeuomorphic Toggle UI - Blue Remix</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n</head>\n<body class=\"bg-slate-50 flex items-center justify-center min-h-screen p-4 antialiased\" style=\"background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px); background-size: 120px 120px; background-position: center center;\">\n\n    <!-- Card Container with Premium Gradient Border -->\n    <div id=\"toggle-card\" class=\"relative rounded-[2rem] w-full max-w-[380px] shadow-[0_25px_50px_-12px_rgba(15,23,42,0.12)] p-[1px] bg-gradient-to-b from-slate-200/80 via-slate-100/50 to-slate-50/20 z-10\">\n        \n        <div class=\"bg-white rounded-[calc(2rem-1px)] w-full h-full overflow-hidden flex flex-col relative\">\n            \n            <!-- Top Section: 3D Environment -->\n            <div class=\"relative h-64 w-full flex items-center justify-center overflow-hidden\" style=\"background: radial-gradient(circle at 50% 50%, #f0f7ff 0%, #ffffff 80%);\">\n                \n                <!-- Light Rays -->\n                <div class=\"absolute inset-0 pointer-events-none opacity-40\" style=\"background: repeating-conic-gradient(from 0deg at 50% -10%, rgba(59, 130, 246, 0.04) 0deg, transparent 4deg, transparent 8deg, rgba(59, 130, 246, 0.04) 12deg);\"></div>\n\n                <!-- Soft Overlay Shadows -->\n                <div class=\"absolute inset-0 pointer-events-none\" style=\"box-shadow: inset 0 20px 40px -10px rgba(0,0,0,0.04), inset 0 -20px 40px -10px rgba(59, 130, 246, 0.05);\"></div>\n\n                <!-- Simulated WebGL Waves / Ripples -->\n                <div class=\"absolute inset-0 flex items-center justify-center pointer-events-none\">\n                    <!-- Ambient Wave Base -->\n                    <div class=\"absolute bottom-0 w-full h-32\" style=\"background: radial-gradient(ellipse at 50% 100%, rgba(59, 130, 246, 0.08) 0%, transparent 70%);\"></div>\n                    \n                    <!-- Outer Ripple -->\n                    <div class=\"absolute w-[320px] h-[160px] rounded-[80px]\" style=\"border: 1px solid rgba(96, 165, 250, 0.05); box-shadow: 0 0 30px rgba(96, 165, 250, 0.06), inset 0 0 20px rgba(96, 165, 250, 0.03);\"></div>\n                    <!-- Middle Ripple -->\n                    <div class=\"absolute w-[260px] h-[120px] rounded-[60px]\" style=\"border: 1px solid rgba(96, 165, 250, 0.12); box-shadow: 0 0 20px rgba(96, 165, 250, 0.1), inset 0 0 15px rgba(96, 165, 250, 0.05);\"></div>\n                    <!-- Inner Ripple -->\n                    <div class=\"absolute w-[220px] h-[90px] rounded-[45px]\" style=\"border: 1px solid rgba(96, 165, 250, 0.2); box-shadow: 0 0 15px rgba(96, 165, 250, 0.18), inset 0 0 10px rgba(96, 165, 250, 0.1);\"></div>\n                </div>\n\n                <!-- Dotted Pattern Arc -->\n                <div class=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[120px] pointer-events-none\" style=\"mask-image: radial-gradient(circle at bottom, transparent 50px, black 51px); -webkit-mask-image: radial-gradient(circle at bottom, transparent 50px, black 51px);\">\n                    <div class=\"w-full h-full opacity-40\" style=\"background-image: radial-gradient(rgba(59, 130, 246, 0.7) 1.5px, transparent 1.5px); background-size: 8px 8px; mask-image: linear-gradient(to bottom, black, transparent); -webkit-mask-image: linear-gradient(to bottom, black, transparent);\"></div>\n                </div>\n\n                <!-- Skeuomorphic Toggle Control -->\n                <div id=\"skeuomorphic-toggle\" role=\"switch\" aria-checked=\"true\" tabindex=\"0\" class=\"relative z-10 w-48 h-16 rounded-full p-1.5 cursor-pointer select-none\" style=\"background: repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px), linear-gradient(180deg, #dbeafe 0%, #93c5fd 100%); box-shadow: inset 0 4px 8px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(255,255,255,0.7), 0 0 0 6px rgba(239, 246, 255, 0.8), 0 0 25px 5px rgba(96, 165, 250, 0.4); border: 1px solid #60a5fa; transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;\">\n                    <div id=\"skeuomorphic-thumb\" class=\"absolute top-1.5 left-1.5 w-[116px] h-[calc(100%-0.75rem)] rounded-full flex items-center justify-center\" style=\"background: linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%); box-shadow: 0 10px 20px -4px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(0,0,0,0.04), inset 0 3px 4px rgba(255,255,255,1), inset 0 -2px 4px rgba(96, 165, 250, 0.2); border: 1px solid #e0edfa; transform: translateX(64px); transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;\">\n                        <span class=\"text-sm font-normal text-slate-800 tracking-wide\" style=\"text-shadow: 0 1px 1px rgba(255,255,255,0.9); transition: color 0.35s ease, opacity 0.35s ease;\">Live Sync</span>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Bottom Section: Content -->\n            <div class=\"p-7 pb-9 bg-white z-20 relative\">\n                <!-- Icon -->\n                <div class=\"w-8 h-8 rounded-[0.6rem] mb-4 flex items-center justify-center\" style=\"background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%); box-shadow: inset 0 2px 2px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1), 0 4px 8px -2px rgba(37, 99, 235, 0.4); border: 1px solid #1d4ed8;\">\n                    <iconify-icon icon=\"solar:server-square-linear\" class=\"text-white text-base\" style=\"filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));\"></iconify-icon>\n                </div>\n                \n                <!-- Text -->\n                <h2 class=\"text-xl font-normal tracking-tight text-slate-900 mb-1.5 mask-reveal\">Real-time Updates</h2>\n                <p class=\"text-sm text-slate-500 leading-relaxed mask-reveal\">Seamless background integration keeps everything current.</p>\n            </div>\n            \n        </div>\n    </div>\n\n    <script>\n        (function () {\n            var toggle = document.getElementById('skeuomorphic-toggle');\n            var thumb = document.getElementById('skeuomorphic-thumb');\n            var label = thumb && thumb.querySelector('span');\n            if (!toggle || !thumb) return;\n\n            var ON_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px), linear-gradient(180deg, #dbeafe 0%, #93c5fd 100%)';\n            var OFF_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px), linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)';\n            var ON_SHADOW = 'inset 0 4px 8px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(255,255,255,0.7), 0 0 0 6px rgba(239, 246, 255, 0.8), 0 0 25px 5px rgba(96, 165, 250, 0.4)';\n            var OFF_SHADOW = 'inset 0 4px 8px rgba(0,0,0,0.12), inset 0 -2px 4px rgba(255,255,255,0.55), 0 0 0 6px rgba(241, 245, 249, 0.9), 0 0 18px 2px rgba(148, 163, 184, 0.25)';\n            var ON_BORDER = '#60a5fa';\n            var OFF_BORDER = '#94a3b8';\n            var ON_THUMB_SHADOW = '0 10px 20px -4px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(0,0,0,0.04), inset 0 3px 4px rgba(255,255,255,1), inset 0 -2px 4px rgba(96, 165, 250, 0.2)';\n            var OFF_THUMB_SHADOW = '0 8px 16px -4px rgba(15, 23, 42, 0.18), 0 3px 5px -2px rgba(0,0,0,0.05), inset 0 3px 4px rgba(255,255,255,1), inset 0 -2px 4px rgba(148, 163, 184, 0.25)';\n\n            function travel() {\n                return Math.max(0, toggle.clientWidth - thumb.clientWidth - 12);\n            }\n\n            function apply(on) {\n                toggle.setAttribute('aria-checked', on ? 'true' : 'false');\n                toggle.style.background = on ? ON_BG : OFF_BG;\n                toggle.style.boxShadow = on ? ON_SHADOW : OFF_SHADOW;\n                toggle.style.borderColor = on ? ON_BORDER : OFF_BORDER;\n                thumb.style.transform = 'translateX(' + (on ? travel() : 0) + 'px)';\n                thumb.style.boxShadow = on ? ON_THUMB_SHADOW : OFF_THUMB_SHADOW;\n                if (label) {\n                    label.style.opacity = on ? '1' : '0.72';\n                    label.style.color = on ? '#1e293b' : '#475569';\n                }\n            }\n\n            function flip() {\n                apply(toggle.getAttribute('aria-checked') !== 'true');\n            }\n\n            apply(true);\n            toggle.addEventListener('click', flip);\n            toggle.addEventListener('keydown', function (e) {\n                if (e.key === 'Enter' || e.key === ' ') {\n                    e.preventDefault();\n                    flip();\n                }\n            });\n            window.addEventListener('resize', function () {\n                apply(toggle.getAttribute('aria-checked') === 'true');\n            });\n        })();\n\n        document.addEventListener(\"DOMContentLoaded\", () => {\n            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;\n            gsap.registerPlugin(ScrollTrigger);\n            \n            document.querySelectorAll('.mask-reveal').forEach(el => {\n                const text = el.innerText;\n                el.innerHTML = '';\n                \n                text.split(/(\\s+)/).forEach(part => {\n                    if (!part.trim()) {\n                        el.appendChild(document.createTextNode(part));\n                        return;\n                    }\n                    \n                    const wrapper = document.createElement('span');\n                    wrapper.style.display = 'inline-block';\n                    wrapper.style.overflow = 'hidden';\n                    wrapper.style.verticalAlign = 'bottom';\n                    \n                    const inner = document.createElement('span');\n                    inner.innerText = part;\n                    inner.style.display = 'inline-block';\n                    inner.className = 'reveal-word';\n                    inner.style.transform = 'translateY(110%)';\n                    inner.style.opacity = '0';\n                    \n                    wrapper.appendChild(inner);\n                    el.appendChild(wrapper);\n                });\n                \n                gsap.to(el.querySelectorAll('.reveal-word'), {\n                    y: '0%',\n                    opacity: 1,\n                    duration: 0.6,\n                    stagger: 0.04,\n                    ease: 'power3.out',\n                    scrollTrigger: {\n                        trigger: el,\n                        start: 'top 95%',\n                    }\n                });\n            });\n        });\n    <\/script>\n</body>\n</html>", ie = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Quantum Matrix State</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Geist:wght@300;400&family=Gloock&display=swap\" rel=\"stylesheet\">\n</head>\n<body class=\"bg-[#050505] text-white h-screen w-screen overflow-hidden relative selection:bg-white/20 selection:text-white\">\n    \n    <!-- WebGL Background Canvas -->\n    <canvas id=\"glcanvas\" class=\"absolute inset-0 z-0 w-full h-full\"></canvas>\n\n    <!-- Aura Asset Image Overlay (Mix Blend Texture) -->\n    <div class=\"absolute inset-0 z-10 opacity-30 mix-blend-screen pointer-events-none bg-[url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg')] bg-cover bg-center\"></div>\n\n    <!-- Structural Framing Lines with Corner Squares -->\n    <div class=\"absolute inset-6 md:inset-12 border border-white/10 pointer-events-none z-20 transition-all duration-1000 fade-target\" style=\"opacity: 0;\">\n        <div class=\"absolute -top-1 -left-1 w-2 h-2 border border-white/30 bg-[#050505]\"></div>\n        <div class=\"absolute -top-1 -right-1 w-2 h-2 border border-white/30 bg-[#050505]\"></div>\n        <div class=\"absolute -bottom-1 -left-1 w-2 h-2 border border-white/30 bg-[#050505]\"></div>\n        <div class=\"absolute -bottom-1 -right-1 w-2 h-2 border border-white/30 bg-[#050505]\"></div>\n    </div>\n\n    <!-- Main Content Overlay -->\n    <main class=\"absolute inset-0 z-30 p-12 md:p-20 flex flex-col justify-between pointer-events-none\">\n        \n        <!-- Top Row: Editorial Grid Metadata -->\n        <header class=\"grid grid-cols-2 md:grid-cols-3 w-full gap-8 fade-target transition-all duration-1000 ease-out font-['DM_Mono'] uppercase\" style=\"opacity: 0; transform: translateY(10px);\">\n            <div class=\"flex flex-col gap-2 text-xs text-gray-500 tracking-widest font-light\">\n                <span class=\"text-gray-200\">SYSTEM — 09</span>\n                <span>NETWORK UPLINK</span>\n            </div>\n            <div class=\"hidden md:flex flex-col gap-2 text-xs text-gray-500 tracking-widest font-light text-center\">\n                <span class=\"text-gray-200\">PING 1.2MS</span>\n                <span>SYNC COMPLETE</span>\n            </div>\n            <div class=\"flex flex-col gap-2 text-xs text-gray-500 tracking-widest font-light text-right\">\n                <span class=\"text-gray-200\">SECURITY</span>\n                <span>SECURED</span>\n            </div>\n        </header>\n\n        <!-- Middle: Dashboard Layout -->\n        <div class=\"flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-12 md:gap-8 fade-target transition-all duration-1000 ease-out flex-1 mt-12 md:mt-0\" style=\"opacity: 0; transform: translateY(10px);\">\n            \n            <!-- Left: Title & Context -->\n            <section class=\"flex-shrink-0 z-40 pointer-events-auto\">\n                <h2 class=\"font-['Gloock'] text-5xl md:text-7xl font-normal tracking-tight text-white leading-none uppercase\">\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">QUANTUM</span></span><br>\n                    <span class=\"inline-block overflow-hidden align-bottom italic text-gray-300 pr-4\"><span class=\"reveal-word inline-block translate-y-full\">MATRIX</span></span>\n                </h2>\n                <p class=\"font-['Geist'] text-sm text-gray-400 mt-6 max-w-xs font-light leading-relaxed\">\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">Continuous</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">monitoring</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">of</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">decentralized</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">server</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">arrays.</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">All</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">telemetry</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">data</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">is</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">perfectly</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">synchronized</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">across</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">the</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">global</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">infrastructure</span></span>\n                    <span class=\"inline-block overflow-hidden align-bottom\"><span class=\"reveal-word inline-block translate-y-full\">network.</span></span>\n                </p>\n            </section>\n\n            <!-- Right: Telemetry Grid -->\n            <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl pointer-events-auto font-['Geist'] z-40\">\n                <!-- Metric Card 1 -->\n                <div class=\"p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-transparent h-full\">\n                    <div class=\"bg-[#050505]/70 backdrop-blur-md p-5 flex flex-col gap-4 hover:bg-white/5 transition-colors duration-500 h-full\">\n                        <div class=\"flex justify-between items-center text-xs font-['DM_Mono'] text-gray-400 tracking-widest uppercase\">\n                            <span>Bandwidth</span>\n                            <iconify-icon icon=\"solar:graph-up-linear\" stroke-width=\"1.5\" class=\"text-base text-gray-200\"></iconify-icon>\n                        </div>\n                        <div class=\"text-3xl font-normal tracking-tight text-white\">142.8<span class=\"text-sm text-gray-500 ml-1 font-light\">GB/s</span></div>\n                        <div class=\"w-full h-0.5 bg-white/10 mt-2\">\n                            <div class=\"h-full bg-gray-300 w-[88%]\"></div>\n                        </div>\n                    </div>\n                </div>\n                \n                <!-- Metric Card 2 -->\n                <div class=\"p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-transparent h-full\">\n                    <div class=\"bg-[#050505]/70 backdrop-blur-md p-5 flex flex-col gap-4 hover:bg-white/5 transition-colors duration-500 h-full\">\n                        <div class=\"flex justify-between items-center text-xs font-['DM_Mono'] text-gray-400 tracking-widest uppercase\">\n                            <span>Server Uplinks</span>\n                            <iconify-icon icon=\"solar:server-square-linear\" stroke-width=\"1.5\" class=\"text-base text-gray-200\"></iconify-icon>\n                        </div>\n                        <div class=\"text-3xl font-normal tracking-tight text-white\">8,192</div>\n                        <div class=\"flex items-end gap-1 h-4 mt-2 opacity-70\">\n                            <div class=\"w-full bg-white/20 h-1/2\"></div>\n                            <div class=\"w-full bg-white/40 h-3/4\"></div>\n                            <div class=\"w-full bg-white/30 h-1/3\"></div>\n                            <div class=\"w-full bg-white/60 h-full\"></div>\n                            <div class=\"w-full bg-white/50 h-2/3\"></div>\n                            <div class=\"w-full bg-white/80 h-[90%]\"></div>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Metric Card 3 -->\n                <div class=\"p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-transparent h-full\">\n                    <div class=\"bg-[#050505]/70 backdrop-blur-md p-5 flex flex-col gap-4 hover:bg-white/5 transition-colors duration-500 h-full\">\n                        <div class=\"flex justify-between items-center text-xs font-['DM_Mono'] text-gray-400 tracking-widest uppercase\">\n                            <span>Health</span>\n                            <div class=\"w-1.5 h-1.5 rounded-full bg-gray-200 animate-pulse\"></div>\n                        </div>\n                        <div class=\"text-xl font-normal tracking-tight text-gray-200 leading-snug mt-auto\">\n                            Systems nominal across all primary regions.\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Metric Card 4 -->\n                <div class=\"p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-transparent h-full\">\n                    <div class=\"bg-[#050505]/70 backdrop-blur-md p-5 flex flex-col gap-4 hover:bg-white/5 transition-colors duration-500 h-full\">\n                        <div class=\"flex justify-between items-center text-xs font-['DM_Mono'] text-gray-400 tracking-widest uppercase\">\n                            <span>Firewalls</span>\n                            <iconify-icon icon=\"solar:shield-check-linear\" stroke-width=\"1.5\" class=\"text-base text-gray-200\"></iconify-icon>\n                        </div>\n                        <div class=\"flex flex-wrap gap-2 mt-auto font-['DM_Mono']\">\n                            <span class=\"text-xs border border-white/10 px-2 py-1 text-gray-300\">AES-256</span>\n                            <span class=\"text-xs border border-white/10 px-2 py-1 text-gray-300\">BIOMETRIC</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Bottom Row: Status Footer -->\n        <footer class=\"w-full flex justify-between items-end fade-target transition-all duration-1000 ease-out mt-8\" style=\"opacity: 0; transform: translateY(10px);\">\n            <div class=\"flex items-center gap-3 text-xs text-gray-500 tracking-widest font-['DM_Mono'] uppercase font-light\">\n                <iconify-icon icon=\"solar:radar-linear\" stroke-width=\"1.5\" class=\"text-lg text-gray-200\"></iconify-icon>\n                <span class=\"hidden md:inline\">MONITORING SECTORS</span>\n            </div>\n            <div class=\"flex flex-col gap-2 text-xs text-gray-500 tracking-widest font-['DM_Mono'] uppercase font-light text-right\">\n                <span class=\"text-gray-200\">ROOT.USER</span>\n                <span>SESSION ACTIVE</span>\n            </div>\n        </footer>\n    </main>\n\n    <!-- UI Animation Logic -->\n    <script>\n        window.addEventListener('load', () => {\n            gsap.registerPlugin(ScrollTrigger);\n\n            // Initial UI fade\n            document.querySelectorAll('.fade-target').forEach((el, i) => {\n                setTimeout(() => {\n                    el.style.opacity = '1';\n                    el.style.transform = 'translateY(0)';\n                }, i * 150 + 100);\n            });\n\n            // Masked word reveal\n            gsap.to('.reveal-word', {\n                scrollTrigger: {\n                    trigger: '.reveal-word',\n                    start: 'top 95%',\n                },\n                y: '0%',\n                duration: 0.8,\n                stagger: 0.03,\n                ease: 'power4.out',\n                delay: 0.3\n            });\n        });\n    <\/script>\n\n    <!-- WebGL Logic -->\n    <script>\n        const canvas = document.getElementById('glcanvas');\n        const gl = canvas.getContext('webgl');\n\n        let mouseX = -1000, mouseY = -1000;\n        let lastMouseMove = 0;\n        let currentMouseActive = 0.0;\n\n        window.addEventListener('mousemove', (e) => {\n            mouseX = e.clientX;\n            mouseY = canvas.clientHeight - e.clientY;\n            lastMouseMove = Date.now();\n        });\n\n        const vsSource = `\n            attribute vec4 aVertexPosition;\n            void main() {\n                gl_Position = aVertexPosition;\n            }\n        `;\n\n        const fsSource = `\n            precision highp float;\n            uniform vec2 u_resolution;\n            uniform float u_time;\n            uniform vec2 u_mouse;\n            uniform float u_mouseActive;\n\n            float hash(float n) { return fract(sin(n)*753.5453123); }\n            float noise(float x) {\n                float i = floor(x);\n                float f = fract(x);\n                f = f*f*(3.0-2.0*f);\n                return mix(hash(i), hash(i+1.0), f);\n            }\n\n            vec2 sdLine(vec2 p, vec2 a, vec2 b) {\n                vec2 pa = p - a, ba = b - a;\n                float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);\n                return vec2(length(pa - ba * h), h);\n            }\n\n            float lightning(vec2 uv, vec2 a, vec2 b, float t) {\n                vec2 ab = b - a;\n                float len = length(ab);\n                if(len < 0.01) return 0.0;\n                vec2 dir = ab / len;\n                \n                vec2 pa = uv - a;\n                float h = clamp(dot(pa, dir) / len, 0.0, 1.0);\n                float dist = length(pa - dir * (h * len));\n                \n                float env = sin(h * 3.1415);\n                \n                float offset = (noise(h * 25.0 - t * 35.0) - 0.5) * 0.08 * env;\n                offset += (noise(h * 70.0 + t * 50.0) - 0.5) * 0.02 * env;\n                \n                float d = abs(dist + offset);\n                \n                return (0.0002 / (d + 0.0002) + 0.00001 / (d*d + 0.00001)) * env;\n            }\n\n            void main() {\n                vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n                uv = uv * 2.0 - 1.0;\n                uv.x *= u_resolution.x / u_resolution.y;\n\n                vec2 mouseUV = u_mouse / u_resolution.xy;\n                mouseUV = mouseUV * 2.0 - 1.0;\n                mouseUV.x *= u_resolution.x / u_resolution.y;\n\n                vec2 center = vec2(-0.8, -0.2);\n                center.x += sin(u_time * 0.4) * 0.03;\n                center.y += cos(u_time * 0.3) * 0.03;\n\n                vec2 dirUp = normalize(vec2(0.15, 1.0));\n                vec2 dirRight = normalize(vec2(1.0, -0.25));\n                vec2 dirDownLeft = normalize(vec2(-0.8, -0.6));\n\n                vec2 l1 = sdLine(uv, center, center + dirUp * 5.0);\n                vec2 l2 = sdLine(uv, center, center + dirRight * 5.0);\n                vec2 l3 = sdLine(uv, center, center + dirDownLeft * 5.0);\n\n                float intensity = 0.006;\n                float glow = intensity / (l1.x + 0.001) +\n                             intensity / (l2.x + 0.001) +\n                             (intensity * 0.4) / (l3.x + 0.001);\n\n                float pulse1 = smoothstep(0.1, 0.0, abs(l1.y - fract(u_time * 0.4))) * 0.03 / (l1.x + 0.001);\n                float pulse2 = smoothstep(0.1, 0.0, abs(l2.y - fract(u_time * 0.5 + 0.3))) * 0.03 / (l2.x + 0.001);\n                float pulse3 = smoothstep(0.1, 0.0, abs(l3.y - fract(u_time * 0.3 + 0.7))) * 0.015 / (l3.x + 0.001);\n                glow += pulse1 + pulse2 + pulse3;\n\n                vec2 p1 = center + dirUp * clamp(dot(mouseUV - center, dirUp), 0.0, 5.0);\n                vec2 p2 = center + dirRight * clamp(dot(mouseUV - center, dirRight), 0.0, 5.0);\n                vec2 p3 = center + dirDownLeft * clamp(dot(mouseUV - center, dirDownLeft), 0.0, 5.0);\n                \n                float lgt1 = lightning(uv, p1, mouseUV, u_time);\n                float lgt2 = lightning(uv, p2, mouseUV, u_time + 10.0);\n                float lgt3 = lightning(uv, p3, mouseUV, u_time + 20.0);\n                \n                float flicker = step(0.1, noise(u_time * 60.0)) * (noise(u_time * 150.0) * 0.8 + 0.2);\n                \n                float d1 = length(mouseUV - p1);\n                float d2 = length(mouseUV - p2);\n                float d3 = length(mouseUV - p3);\n                \n                glow += lgt1 * smoothstep(2.0, 0.0, d1) * u_mouseActive * flicker;\n                glow += lgt2 * smoothstep(2.0, 0.0, d2) * u_mouseActive * flicker;\n                glow += lgt3 * smoothstep(2.0, 0.0, d3) * u_mouseActive * flicker;\n\n                float distToCenter = length(uv - center);\n                glow += 0.04 / (distToCenter + 0.01);\n\n                vec3 baseColor = vec3(0.6, 0.75, 1.0);\n                vec3 finalColor = baseColor * glow;\n\n                finalColor *= 0.85 + 0.15 * sin(u_time * 2.0 - distToCenter * 8.0);\n\n                float vignette = 1.0 - smoothstep(0.4, 2.0, length(uv));\n                finalColor *= vignette;\n\n                float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);\n                finalColor += n * 0.02;\n\n                gl_FragColor = vec4(finalColor, 1.0);\n            }\n        `;\n\n        function createShader(gl, type, source) {\n            const shader = gl.createShader(type);\n            gl.shaderSource(shader, source);\n            gl.compileShader(shader);\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;\n            return shader;\n        }\n\n        const shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, createShader(gl, gl.VERTEX_SHADER, vsSource));\n        gl.attachShader(shaderProgram, createShader(gl, gl.FRAGMENT_SHADER, fsSource));\n        gl.linkProgram(shaderProgram);\n\n        const programInfo = {\n            program: shaderProgram,\n            attribLocations: { vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition') },\n            uniformLocations: {\n                resolution: gl.getUniformLocation(shaderProgram, 'u_resolution'),\n                time: gl.getUniformLocation(shaderProgram, 'u_time'),\n                mouse: gl.getUniformLocation(shaderProgram, 'u_mouse'),\n                mouseActive: gl.getUniformLocation(shaderProgram, 'u_mouseActive'),\n            },\n        };\n\n        const positionBuffer = gl.createBuffer();\n        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]), gl.STATIC_DRAW);\n\n        let startTime = Date.now();\n\n        function render() {\n            if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {\n                canvas.width = canvas.clientWidth;\n                canvas.height = canvas.clientHeight;\n            }\n            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\n            gl.useProgram(programInfo.program);\n\n            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n            gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);\n            gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);\n\n            let timeSinceMove = Date.now() - lastMouseMove;\n            let targetActive = timeSinceMove < 150 ? 1.0 : Math.max(0.0, 1.0 - (timeSinceMove - 150) / 350.0);\n            currentMouseActive += (targetActive - currentMouseActive) * 0.15;\n\n            gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);\n            gl.uniform1f(programInfo.uniformLocations.time, (Date.now() - startTime) * 0.001);\n            gl.uniform2f(programInfo.uniformLocations.mouse, mouseX, mouseY);\n            gl.uniform1f(programInfo.uniformLocations.mouseActive, currentMouseActive);\n\n            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);\n            requestAnimationFrame(render);\n        }\n        requestAnimationFrame(render);\n    <\/script>\n</body>\n</html>", ae = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Nexus Gateway</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300&display=swap\" rel=\"stylesheet\">\n</head>\n<body class=\"bg-black text-slate-300 antialiased min-h-screen flex flex-col selection:bg-slate-700 selection:text-white relative\" style=\"font-family: 'Inter', sans-serif;\">\n\n    <!-- Global Dither Overlay -->\n    <div class=\"fixed inset-0 z-50 pointer-events-none opacity-[0.15]\" style=\"background-image: url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%202%202%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%221%22%20height%3D%221%22%20fill%3D%22%23ffffff%22%2F%3E%3Crect%20x%3D%221%22%20y%3D%221%22%20width%3D%221%22%20height%3D%221%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E'); background-size: 2px 2px;\"></div>\n\n    <!-- Visualization Background -->\n    <div class=\"fixed inset-0 z-0 overflow-hidden bg-black\">\n        <div class=\"absolute inset-0 z-0 opacity-10\" style=\"background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.01) 0%, rgba(0, 0, 0, 0) 80%);\"></div>\n        <canvas id=\"flow-canvas\" class=\"absolute inset-0 w-full h-full z-10\"></canvas>\n    </div>\n\n    <!-- Main Content -->\n    <main class=\"flex-grow flex flex-col items-center justify-center relative z-30 px-6 py-12 min-h-screen w-full\">\n        \n        <!-- Premium Login Card with Hover Border Gradient -->\n        <div class=\"max-w-md w-full bg-black/95 backdrop-blur-xl rounded-2xl p-7 md:p-8 shadow-2xl flex flex-col relative group\">\n            \n            <!-- Base Border -->\n            <div class=\"absolute inset-0 border border-white/[0.04] rounded-2xl pointer-events-none transition-colors duration-500 group-hover:border-transparent\"></div>\n            \n            <!-- Hover Gradient Border -->\n            <div class=\"absolute inset-0 p-[1px] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.15),transparent)] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10\"></div>\n\n            <!-- Header Text -->\n            <div class=\"text-center mb-8 w-full relative z-20\">\n                <div class=\"inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/50 border border-slate-700/50 mb-6 shadow-inner\">\n                    <iconify-icon icon=\"solar:cpu-bolt-linear\" width=\"24\" height=\"24\" stroke-width=\"1.5\" class=\"text-slate-200\"></iconify-icon>\n                </div>\n                <h1 id=\"reveal-title\" class=\"text-3xl md:text-4xl font-thin tracking-tight text-white leading-tight mb-3 uppercase flex flex-wrap justify-center gap-x-2\">\n                    <span class=\"overflow-hidden inline-block pt-1\"><span class=\"reveal-word inline-block translate-y-[120%]\">Nexus</span></span>\n                    <span class=\"overflow-hidden inline-block pt-1\"><span class=\"reveal-word inline-block translate-y-[120%]\">Gateway</span></span>\n                </h1>\n                <p class=\"text-sm text-slate-500 font-extralight leading-relaxed\">\n                    Verify identity to initialize secure connection with the primary framework. Oversee active protocols and routing.\n                </p>\n            </div>\n\n            <!-- Form -->\n            <form class=\"space-y-5 relative z-20\">\n                <div>\n                    <label for=\"identifier\" class=\"text-xs font-light text-slate-400 mb-1.5 block uppercase tracking-widest\">Operative ID</label>\n                    <div class=\"relative rounded-lg bg-black/80 group/input\">\n                        <div class=\"absolute inset-0 border border-slate-800/80 rounded-lg pointer-events-none transition-colors duration-300 group-hover/input:border-transparent focus-within:border-transparent\"></div>\n                        <div class=\"absolute inset-0 p-[1px] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.25),transparent)] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] pointer-events-none rounded-lg opacity-0 group-hover/input:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-10\"></div>\n                        <input type=\"text\" id=\"identifier\" class=\"relative w-full bg-transparent px-3 py-2 text-sm text-slate-200 focus:outline-none z-20 placeholder-slate-700 font-extralight\" placeholder=\"operative@nexus.net\">\n                    </div>\n                </div>\n                <div>\n                    <div class=\"flex justify-between items-center mb-1.5\">\n                        <label for=\"key\" class=\"text-xs font-light text-slate-400 block uppercase tracking-widest\">Security Key</label>\n                        <a href=\"#\" class=\"text-xs font-extralight text-slate-400 hover:text-white transition-colors underline decoration-slate-700 underline-offset-2\">Recover access</a>\n                    </div>\n                    <div class=\"relative rounded-lg bg-black/80 group/input\">\n                        <div class=\"absolute inset-0 border border-slate-800/80 rounded-lg pointer-events-none transition-colors duration-300 group-hover/input:border-transparent focus-within:border-transparent\"></div>\n                        <div class=\"absolute inset-0 p-[1px] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.25),transparent)] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] pointer-events-none rounded-lg opacity-0 group-hover/input:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-10\"></div>\n                        <input type=\"password\" id=\"key\" class=\"relative w-full bg-transparent pl-3 pr-10 py-2 text-sm text-slate-200 focus:outline-none z-20 placeholder-slate-700 font-extralight\" placeholder=\"••••••••\">\n                        <button type=\"button\" class=\"absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors z-30\" aria-label=\"Toggle visibility\">\n                            <iconify-icon icon=\"solar:eye-linear\" width=\"16\" height=\"16\" stroke-width=\"1.5\"></iconify-icon>\n                        </button>\n                    </div>\n                </div>\n                <div class=\"flex items-center gap-2 pt-1\">\n                    <div class=\"relative flex items-center justify-center w-4 h-4\">\n                        <input type=\"checkbox\" id=\"session\" class=\"peer appearance-none w-4 h-4 border border-slate-700 rounded bg-black/50 checked:bg-slate-300 checked:border-slate-300 cursor-pointer transition-colors\">\n                        <iconify-icon icon=\"solar:check-linear\" width=\"12\" height=\"12\" stroke-width=\"1.5\" class=\"absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none\"></iconify-icon>\n                    </div>\n                    <label for=\"session\" class=\"text-xs font-extralight text-slate-400 cursor-pointer select-none uppercase tracking-wider\">Maintain persistent uplink</label>\n                </div>\n                \n                <!-- Primary Button -->\n                <button type=\"submit\" class=\"w-full bg-[#0a0a0a] hover:bg-[#111] text-white text-sm font-light py-2.5 rounded-lg transition-all mt-2 uppercase tracking-widest relative group/btn shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.06)]\">\n                    <div class=\"absolute inset-0 border border-white/10 rounded-lg pointer-events-none transition-colors duration-300 group-hover/btn:border-transparent\"></div>\n                    <div class=\"absolute inset-0 p-[1px] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.4),transparent)] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] pointer-events-none rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-10\"></div>\n                    <span class=\"relative z-20\">Initialize Uplink</span>\n                </button>\n            </form>\n\n            <!-- Divider -->\n            <div class=\"relative flex items-center py-6 z-20\">\n                <div class=\"flex-grow border-t border-slate-800/60\"></div>\n                <span class=\"flex-shrink-0 px-4 text-xs font-extralight text-slate-600 uppercase tracking-widest\">Alternative Auth</span>\n                <div class=\"flex-grow border-t border-slate-800/60\"></div>\n            </div>\n\n            <!-- Alternative Options -->\n            <div class=\"grid grid-cols-2 gap-3 z-20\">\n                <button type=\"button\" class=\"relative flex items-center justify-center gap-2 w-full bg-black/40 hover:bg-slate-900 rounded-lg py-2.5 text-sm text-slate-400 hover:text-slate-200 transition-colors font-extralight group/alt\">\n                    <div class=\"absolute inset-0 border border-slate-800/80 rounded-lg pointer-events-none transition-colors duration-300 group-hover/alt:border-transparent\"></div>\n                    <div class=\"absolute inset-0 p-[1px] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.25),transparent)] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] pointer-events-none rounded-lg opacity-0 group-hover/alt:opacity-100 transition-opacity duration-300 z-10\"></div>\n                    <span class=\"relative z-20 flex items-center gap-2\"><iconify-icon icon=\"solar:buildings-linear\" width=\"18\" height=\"18\" stroke-width=\"1.5\"></iconify-icon> Corporate SSO</span>\n                </button>\n                <button type=\"button\" class=\"relative flex items-center justify-center gap-2 w-full bg-black/40 hover:bg-slate-900 rounded-lg py-2.5 text-sm text-slate-400 hover:text-slate-200 transition-colors font-extralight group/alt\">\n                    <div class=\"absolute inset-0 border border-slate-800/80 rounded-lg pointer-events-none transition-colors duration-300 group-hover/alt:border-transparent\"></div>\n                    <div class=\"absolute inset-0 p-[1px] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.25),transparent)] [mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] pointer-events-none rounded-lg opacity-0 group-hover/alt:opacity-100 transition-opacity duration-300 z-10\"></div>\n                    <span class=\"relative z-20 flex items-center gap-2\"><iconify-icon icon=\"solar:code-circle-linear\" width=\"18\" height=\"18\" stroke-width=\"1.5\"></iconify-icon> Git Auth</span>\n                </button>\n            </div>\n        </div>\n\n        <!-- Social Proof -->\n        <div class=\"mt-8 flex flex-col items-center gap-4 relative z-20\">\n            <div class=\"flex -space-x-2\">\n                <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2f563338-39fa-47ea-9761-658d4f3f84db_800w.jpg\" alt=\"Active Node\" class=\"w-10 h-10 rounded-full border border-slate-800 bg-black object-cover shadow-lg\">\n                <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4f5668c5-fc4a-44e0-bc5e-a664189d3c31_800w.jpg\" alt=\"Active Node\" class=\"w-10 h-10 rounded-full border border-slate-800 bg-black object-cover shadow-lg\">\n                <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/eca707cc-a5b7-439a-b4fd-247f6106c2e1_800w.jpg\" alt=\"Active Node\" class=\"w-10 h-10 rounded-full border border-slate-800 bg-black object-cover shadow-lg\">\n                <div class=\"w-10 h-10 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-xs text-slate-300 font-extralight shadow-lg\">+</div>\n            </div>\n            <p class=\"text-xs text-slate-600 font-extralight uppercase tracking-widest\">Validated by distributed consensus nodes</p>\n        </div>\n\n    </main>\n\n    <script>\n        document.addEventListener('DOMContentLoaded', () => {\n            // GSAP Masked Reveal for Heading\n            gsap.registerPlugin(ScrollTrigger);\n            gsap.to(\".reveal-word\", {\n                y: \"0%\",\n                duration: 1.2,\n                ease: \"power4.out\",\n                stagger: 0.15,\n                scrollTrigger: {\n                    trigger: \"#reveal-title\",\n                    start: \"top 95%\",\n                }\n            });\n\n            // Flow Canvas Animation\n            const canvas = document.getElementById('flow-canvas');\n            const ctx = canvas.getContext('2d');\n            \n            let width, height;\n            let explosions = [];\n\n            function resize() {\n                const dpr = window.devicePixelRatio || 1;\n                width = window.innerWidth;\n                height = window.innerHeight;\n                canvas.width = width * dpr;\n                canvas.height = height * dpr;\n                ctx.scale(dpr, dpr);\n            }\n            window.addEventListener('resize', resize);\n            resize();\n\n            window.addEventListener('click', (e) => {\n                explosions.push({ x: e.clientX, y: e.clientY, radius: 0, life: 1 });\n            });\n\n            const paths = [];\n            const numPaths = 80;\n            \n            for(let i = 0; i < numPaths; i++) {\n                paths.push({\n                    isLeft: i % 2 === 0,\n                    startY: (i / numPaths) * height * 1.4 - height * 0.2,\n                    particles: [{\n                        t: Math.random(),\n                        speed: 0.0015 + Math.random() * 0.002\n                    }]\n                });\n            }\n\n            function getBezierPoint(t, p0, p1, p2, p3) {\n                const u = 1 - t;\n                return {\n                    x: u**3 * p0.x + 3 * u**2 * t * p1.x + 3 * u * t**2 * p2.x + t**3 * p3.x,\n                    y: u**3 * p0.y + 3 * u**2 * t * p1.y + 3 * u * t**2 * p2.y + t**3 * p3.y\n                };\n            }\n\n            function render() {\n                ctx.clearRect(0, 0, width, height);\n                const centerX = width / 2;\n                const centerY = height / 2;\n\n                explosions.forEach(exp => {\n                    exp.radius += 15;\n                    exp.life -= 0.015;\n                });\n                explosions = explosions.filter(exp => exp.life > 0);\n\n                paths.forEach(path => {\n                    const p0 = { x: path.isLeft ? 0 : width, y: path.startY };\n                    const p1 = { x: path.isLeft ? centerX * 0.5 : width - centerX * 0.5, y: path.startY };\n                    const p2 = { x: path.isLeft ? centerX * 0.8 : width - centerX * 0.8, y: centerY };\n                    const p3 = { x: centerX, y: centerY };\n\n                    ctx.beginPath();\n                    ctx.moveTo(p0.x, p0.y);\n                    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);\n                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';\n                    ctx.lineWidth = 1.2;\n                    ctx.setLineDash([1, 4]);\n                    ctx.stroke();\n                    ctx.setLineDash([]);\n\n                    path.particles.forEach(p => {\n                        p.t += p.speed;\n                        if (p.t > 1) {\n                            p.t = 0;\n                            path.startY += (Math.random() - 0.5) * 10;\n                        }\n\n                        let pos = getBezierPoint(p.t, p0, p1, p2, p3);\n\n                        let dxTotal = 0, dyTotal = 0;\n                        explosions.forEach(exp => {\n                            let dx = pos.x - exp.x;\n                            let dy = pos.y - exp.y;\n                            let dist = Math.hypot(dx, dy);\n                            if (dist < exp.radius + 120 && dist > exp.radius - 120) {\n                                let force = (1 - Math.abs(dist - exp.radius) / 120) * exp.life;\n                                dxTotal += (dx / dist) * force * 80;\n                                dyTotal += (dy / dist) * force * 80;\n                            }\n                        });\n                        \n                        pos.x += dxTotal;\n                        pos.y += dyTotal;\n\n                        ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;\n                        ctx.fillRect(pos.x - 1.5, pos.y - 1.5, 3, 3);\n                    });\n                });\n                \n                requestAnimationFrame(render);\n            }\n            \n            render();\n        });\n    <\/script>\n</body>\n</html>", oe = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Global Connectivity Nexus</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n</head>\n<body class=\"font-sans antialiased text-blue-950 min-h-screen flex flex-col\" style=\"background: linear-gradient(180deg, rgba(240,244,248,0.92) 0%, rgba(225,234,244,0.92) 40%, rgba(196,217,239,0.92) 80%, rgba(166,200,234,0.92) 100%), url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg') center/cover no-repeat fixed; background-blend-mode: normal;\">\n\n    <!-- Main Structural Container -->\n    <div class=\"max-w-6xl mx-auto w-full flex-grow flex flex-col border-x border-transparent relative bg-white/20 backdrop-blur-[2px]\" style=\"border-image: linear-gradient(to bottom, rgba(147,197,253,0.1), rgba(147,197,253,0.7), rgba(147,197,253,0.1)) 1;\">\n        \n        <!-- Top Corner Squares -->\n        <div class=\"absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n        <div class=\"absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n\n        <!-- Header Section -->\n        <header class=\"pt-24 pb-20 px-6 text-center border-b border-transparent relative z-10\" style=\"border-image: linear-gradient(to right, rgba(147,197,253,0.1), rgba(147,197,253,0.7), rgba(147,197,253,0.1)) 1;\">\n            <h1 id=\"reveal-title\" class=\"text-5xl md:text-6xl font-normal tracking-tight text-blue-950 max-w-3xl mx-auto leading-tight\">\n                The nexus of <br> global connectivity\n            </h1>\n            \n            <!-- Header Bottom Corner Squares -->\n            <div class=\"absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n            <div class=\"absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n        </header>\n\n        <!-- Stats Section -->\n        <section class=\"border-b border-transparent relative z-10 bg-white/10\" style=\"border-image: linear-gradient(to right, rgba(147,197,253,0.1), rgba(147,197,253,0.7), rgba(147,197,253,0.1)) 1;\">\n            <div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-blue-300/40 text-center\">\n                \n                <div class=\"flex flex-col items-center justify-center space-y-3 py-14 px-6 relative\">\n                    <div class=\"text-4xl font-normal text-blue-950 tracking-tight\">150+</div>\n                    <div class=\"text-sm text-blue-800/70 max-w-[160px] leading-relaxed\">\n                        countries integrated worldwide\n                    </div>\n                    <!-- Internal Grid Intersection Square -->\n                    <div class=\"hidden lg:block absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n                </div>\n\n                <div class=\"flex flex-col items-center justify-center space-y-3 py-14 px-6 relative\">\n                    <div class=\"text-4xl font-normal text-blue-800/90 tracking-tight\">\n                        <span class=\"text-blue-500/80 font-light mr-1\">$</span>3.1T\n                    </div>\n                    <div class=\"text-sm text-blue-800/70 max-w-[160px] leading-relaxed\">\n                        annual transfer volume\n                    </div>\n                    <!-- Internal Grid Intersection Square -->\n                    <div class=\"hidden lg:block absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n                </div>\n\n                <div class=\"flex flex-col items-center justify-center space-y-3 py-14 px-6 relative\">\n                    <div class=\"text-4xl font-normal text-blue-800/80 tracking-tight\">99.999%</div>\n                    <div class=\"text-sm text-blue-800/70 max-w-[160px] leading-relaxed\">\n                        infrastructure reliability\n                    </div>\n                    <!-- Internal Grid Intersection Square -->\n                    <div class=\"hidden lg:block absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n                </div>\n\n                <div class=\"flex flex-col items-center justify-center space-y-3 py-14 px-6\">\n                    <div class=\"text-4xl font-normal text-blue-700/80 tracking-tight\">850M+</div>\n                    <div class=\"text-sm text-blue-800/70 max-w-[160px] leading-relaxed\">\n                        verified digital identities\n                    </div>\n                </div>\n\n            </div>\n            \n            <!-- Stats Bottom Corner Squares -->\n            <div class=\"absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n            <div class=\"absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n        </section>\n\n        <!-- Animation Section -->\n        <main class=\"flex-grow relative overflow-hidden min-h-[500px]\">\n            \n            <!-- Controls -->\n            <div class=\"absolute top-6 right-6 flex gap-2 z-20\">\n                <button id=\"pauseBtn\" class=\"w-8 h-8 flex items-center justify-center bg-white/40 hover:bg-white/60 backdrop-blur-md border border-blue-300/40 rounded text-blue-800 transition-all cursor-pointer\" aria-label=\"Pause animation\">\n                    <iconify-icon icon=\"solar:pause-linear\" width=\"16\" height=\"16\" style=\"stroke-width: 1.5;\"></iconify-icon>\n                </button>\n                <button class=\"w-8 h-8 flex items-center justify-center bg-white/40 hover:bg-white/60 backdrop-blur-md border border-blue-300/40 rounded text-blue-800 transition-all cursor-pointer\" aria-label=\"Settings\">\n                    <iconify-icon icon=\"solar:settings-linear\" width=\"16\" height=\"16\" style=\"stroke-width: 1.5;\"></iconify-icon>\n                </button>\n            </div>\n\n            <!-- Canvas Container -->\n            <canvas id=\"networkCanvas\" class=\"absolute inset-0 w-full h-full block z-0\"></canvas>\n            \n            <!-- Bottom Corner Squares -->\n            <div class=\"absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n            <div class=\"absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-400/70 z-20\"></div>\n        </main>\n    </div>\n\n    <script>\n        // Background Canvas Animation\n        const canvas = document.getElementById('networkCanvas');\n        const ctx = canvas.getContext('2d', { alpha: true });\n        let width, height;\n        let particles = [];\n        let isPlaying = true;\n        let animationFrameId;\n\n        function resize() {\n            width = canvas.clientWidth;\n            height = canvas.clientHeight;\n            canvas.width = width * window.devicePixelRatio;\n            canvas.height = height * window.devicePixelRatio;\n            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);\n            initParticles();\n        }\n\n        class Particle {\n            constructor() {\n                this.reset(true);\n            }\n\n            reset(initial = false) {\n                this.angle = Math.PI + (Math.random() * Math.PI); \n                if (Math.random() > 0.3) {\n                    this.angle = Math.PI * 1.25 + (Math.random() * Math.PI * 0.5);\n                }\n\n                this.speed = 0.5 + Math.random() * 2.5;\n                this.distance = initial ? Math.random() * (height * 1.2) : Math.random() * 50;\n                this.maxLength = 20 + Math.random() * 180;\n                this.length = 0;\n                this.alpha = 0;\n            }\n\n            update() {\n                this.distance += this.speed;\n                this.length = Math.min(this.maxLength, this.distance * 0.8);\n                \n                const normalizedDist = this.distance / (height * 1.2);\n                this.alpha = Math.min(1, this.distance / 100) * Math.max(0, 1 - normalizedDist);\n\n                if (this.distance > height * 1.5) {\n                    this.reset();\n                }\n            }\n\n            draw() {\n                const originX = width / 2;\n                const originY = height + 50;\n\n                const startX = originX + Math.cos(this.angle) * this.distance;\n                const startY = originY + Math.sin(this.angle) * this.distance;\n                const endX = originX + Math.cos(this.angle) * (this.distance + this.length);\n                const endY = originY + Math.sin(this.angle) * (this.distance + this.length);\n\n                const distRatio = Math.min(1, this.distance / height);\n                const hue = 220 + (distRatio * 15);\n                const lightness = 15 + (distRatio * 35);\n                \n                const color = `hsla(${hue}, 90%, ${lightness}%, ${this.alpha})`;\n                const tailColor = `hsla(${hue}, 90%, ${Math.max(5, lightness - 15)}%, ${this.alpha * 0.05})`;\n\n                ctx.beginPath();\n                const gradient = ctx.createLinearGradient(startX, startY, endX, endY);\n                gradient.addColorStop(0, tailColor);\n                gradient.addColorStop(1, color);\n                \n                ctx.moveTo(startX, startY);\n                ctx.lineTo(endX, endY);\n                ctx.strokeStyle = gradient;\n                ctx.lineWidth = 0.5 + (distRatio * 2);\n                ctx.stroke();\n\n                ctx.beginPath();\n                ctx.arc(endX, endY, 0.5 + (distRatio * 1.5), 0, Math.PI * 2);\n                ctx.fillStyle = `hsla(${hue}, 100%, ${lightness + 20}%, ${this.alpha * 1.5})`;\n                ctx.fill();\n            }\n        }\n\n        function initParticles() {\n            particles = [];\n            const particleCount = window.innerWidth < 768 ? 150 : 400;\n            for(let i=0; i<particleCount; i++) {\n                particles.push(new Particle());\n            }\n        }\n\n        function animate() {\n            if (!isPlaying) return;\n            ctx.clearRect(0, 0, width, height);\n            particles.forEach(p => {\n                p.update();\n                p.draw();\n            });\n            animationFrameId = requestAnimationFrame(animate);\n        }\n\n        window.addEventListener('resize', () => {\n            cancelAnimationFrame(animationFrameId);\n            resize();\n            if(isPlaying) animate();\n        });\n\n        resize();\n        animate();\n\n        const pauseBtn = document.getElementById('pauseBtn');\n        pauseBtn.addEventListener('click', () => {\n            isPlaying = !isPlaying;\n            if (isPlaying) {\n                pauseBtn.innerHTML = '<iconify-icon icon=\"solar:pause-linear\" width=\"16\" height=\"16\" style=\"stroke-width: 1.5;\"></iconify-icon>';\n                animate();\n            } else {\n                pauseBtn.innerHTML = '<iconify-icon icon=\"solar:play-linear\" width=\"16\" height=\"16\" style=\"stroke-width: 1.5;\"></iconify-icon>';\n                cancelAnimationFrame(animationFrameId);\n            }\n        });\n\n        // GSAP Masked Text Reveal\n        document.addEventListener(\"DOMContentLoaded\", (event) => {\n            gsap.registerPlugin(ScrollTrigger);\n            \n            const titleEl = document.getElementById('reveal-title');\n            if (titleEl) {\n                const lines = titleEl.innerHTML.split(/<br\\s*\\/?>/i);\n                titleEl.innerHTML = '';\n                \n                lines.forEach((line, index) => {\n                    const words = line.split(' ');\n                    words.forEach((word) => {\n                        if (word.trim() !== '') {\n                            const wrapper = document.createElement('span');\n                            wrapper.className = 'inline-block overflow-hidden align-bottom';\n                            wrapper.style.paddingBottom = '0.1em'; \n                            wrapper.style.marginBottom = '-0.1em';\n                            \n                            const inner = document.createElement('span');\n                            inner.className = 'inline-block reveal-text';\n                            inner.style.transform = 'translateY(110%)';\n                            inner.innerHTML = word;\n                            \n                            wrapper.appendChild(inner);\n                            titleEl.appendChild(wrapper);\n                            titleEl.appendChild(document.createTextNode(' '));\n                        }\n                    });\n                    if (index < lines.length - 1) {\n                        titleEl.appendChild(document.createElement('br'));\n                    }\n                });\n\n                gsap.to('.reveal-text', {\n                    y: 0,\n                    ease: 'power4.out',\n                    duration: 1.2,\n                    stagger: 0.08,\n                    scrollTrigger: {\n                        trigger: '#reveal-title',\n                        start: 'top 90%',\n                    }\n                });\n            }\n        });\n    <\/script>\n</body>\n</html>", se = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>System Interface</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n</head>\n<body class=\"bg-[#0a0a0c] text-zinc-400 font-mono min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden selection:bg-zinc-800 selection:text-white\">\n    \n    <!-- Aura Asset Background Image -->\n    <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg\" \n         class=\"absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen pointer-events-none z-0\" \n         alt=\"\">\n\n    <!-- WebGL-simulated Background Animation -->\n    <canvas id=\"bg-canvas\" class=\"absolute inset-0 z-0 pointer-events-none\"></canvas>\n\n    <!-- Main UI Container -->\n    <main class=\"relative z-10 w-full max-w-2xl flex flex-col gap-12 sm:gap-20\">\n\n        <!-- PANEL 1: CORE (Red/Orange) -->\n        <section class=\"relative group\">\n            <!-- Border Gradient Skill Application -->\n            <div class=\"absolute -inset-[1px] rounded-lg bg-gradient-to-r from-[#c87a65]/40 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700\" style=\"mask-image: linear-gradient(black, black); -webkit-mask-image: -webkit-linear-gradient(black, black);\"></div>\n            \n            <div class=\"relative bg-[#0a0a0c] rounded-lg p-2 flex flex-col gap-4 text-[#c87a65]\">\n                \n                <!-- Top Row -->\n                <div class=\"flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#c87a65]/20 pb-2\">\n                    <h1 class=\"gsap-reveal text-3xl sm:text-4xl tracking-tight font-medium uppercase animate-pulse\" style=\"animation-duration: 4s;\">[ CORE ]</h1>\n                    <div class=\"flex gap-6 text-xs tracking-wider\">\n                        <div class=\"flex flex-col gap-1\">\n                            <span>CONF.SYS</span>\n                            <span class=\"opacity-70\">RESTART</span>\n                            <span class=\"opacity-70\">SLEEP</span>\n                        </div>\n                        <div class=\"flex flex-col gap-1\">\n                            <span>BUILD_11</span>\n                            <span class=\"opacity-70\">ANALYZE</span>\n                            <span class=\"opacity-70\">INPUT NEEDED</span>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Middle Row -->\n                <div class=\"flex flex-col sm:flex-row justify-between items-start gap-6\">\n                    <!-- Dot Matrix -->\n                    <div class=\"grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1 opacity-80\" id=\"matrix-1\">\n                        <!-- Populated by JS for brevity -->\n                    </div>\n                    \n                    <!-- Right Controls -->\n                    <div class=\"flex flex-col gap-2 min-w-[200px]\">\n                        <div class=\"flex items-center justify-between border-b border-[#c87a65]/20 pb-1\">\n                            <div class=\"flex items-center gap-2\">\n                                <div class=\"w-3 h-3 rounded-full bg-[#c87a65] animate-ping\" style=\"animation-duration: 3s;\"></div>\n                                <span class=\"text-lg tracking-widest\">++</span>\n                            </div>\n                            <span class=\"text-xs\">HASH: 0x3C9A</span>\n                        </div>\n                        <div class=\"flex items-center justify-between text-xs pt-1\">\n                            <span>2B-44 - TEMP: 61°C</span>\n                            <div class=\"w-8 h-3 rounded-full border border-[#c87a65]/50 flex items-center p-[1px]\">\n                                <div class=\"w-2 h-full bg-[#c87a65] rounded-full\"></div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <!-- PANEL 2: SECURE (Green) -->\n        <section class=\"relative group\">\n            <!-- Border Gradient Skill Application -->\n            <div class=\"absolute -inset-[1px] rounded-lg bg-gradient-to-l from-[#7a9f65]/40 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700\" style=\"mask-image: linear-gradient(black, black); -webkit-mask-image: -webkit-linear-gradient(black, black);\"></div>\n            \n            <div class=\"relative bg-[#0a0a0c] rounded-lg p-2 flex flex-col gap-3 text-[#7a9f65]\">\n                \n                <!-- Ruler -->\n                <div class=\"relative w-full h-4 border-t border-[#7a9f65]/30 flex justify-between\">\n                    <div class=\"w-px h-2 bg-[#7a9f65]/50\"></div>\n                    <div class=\"w-px h-1 bg-[#7a9f65]/30\"></div>\n                    <div class=\"w-px h-2 bg-[#7a9f65]/50\"></div>\n                    <div class=\"w-px h-1 bg-[#7a9f65]/30\"></div>\n                    <div class=\"w-px h-2 bg-[#7a9f65]/50\"></div>\n                    <div class=\"w-px h-1 bg-[#7a9f65]/30\"></div>\n                    <div class=\"w-px h-2 bg-[#7a9f65]/50\"></div>\n                </div>\n\n                <div class=\"flex flex-col sm:flex-row justify-between items-end gap-6\">\n                    <!-- Large Dot Pattern -->\n                    <div class=\"flex flex-col gap-2 opacity-90\">\n                        <div class=\"flex gap-2\"><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current opacity-20\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current opacity-20\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div></div>\n                        <div class=\"flex gap-2\"><div class=\"w-2 h-2 rounded-full bg-current opacity-20\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current opacity-20\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current opacity-20\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div></div>\n                        <div class=\"flex gap-2\"><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current opacity-20\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current opacity-20\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current\"></div><div class=\"w-2 h-2 rounded-full bg-current opacity-20\"></div></div>\n                    </div>\n\n                    <!-- Info Box & Title -->\n                    <div class=\"flex flex-col items-end gap-2 w-full sm:w-auto\">\n                        <div class=\"flex items-stretch gap-2\">\n                            <div class=\"border border-[#7a9f65]/30 p-2 text-xs flex flex-col justify-center min-w-[120px]\">\n                                <span>APPROVED</span>\n                                <span class=\"opacity-70\">ID: X7-44</span>\n                                <span class=\"opacity-70\">SEQ: #0933</span>\n                            </div>\n                            <div class=\"border border-[#7a9f65]/30 p-2 flex items-center justify-center\">\n                                <iconify-icon icon=\"solar:clock-circle-linear\" class=\"text-xl\"></iconify-icon>\n                            </div>\n                            <!-- Logo Box -->\n                            <div class=\"w-12 h-12 bg-[#7a9f65] relative overflow-hidden flex-shrink-0\">\n                                <div class=\"absolute w-16 h-4 bg-[#0a0a0c] -rotate-45 top-4 -left-2\"></div>\n                            </div>\n                        </div>\n                        <h2 class=\"gsap-reveal text-2xl sm:text-3xl tracking-tight font-medium uppercase\">SECURE</h2>\n                    </div>\n                </div>\n\n                <!-- Bottom Text -->\n                <div class=\"flex flex-col sm:flex-row justify-between text-xs mt-2 opacity-80\">\n                    <span>LOADING <span class=\"animate-pulse\">...</span></span>\n                    <span>//KEY: <span class=\"text-white opacity-90\">0x7B11</span>//</span>\n                </div>\n                <div class=\"text-xs opacity-70\">\n                    SYNCING - ID: 88-K - DATA DROP: 0.2% SECTOR 9\n                </div>\n            </div>\n        </section>\n\n        <!-- PANEL 3: 909 (Purple/Blue) -->\n        <section class=\"relative group\">\n            <!-- Border Gradient Skill Application -->\n            <div class=\"absolute -inset-[1px] rounded-lg bg-gradient-to-t from-[#756a9f]/40 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700\" style=\"mask-image: linear-gradient(black, black); -webkit-mask-image: -webkit-linear-gradient(black, black);\"></div>\n            \n            <div class=\"relative bg-[#0a0a0c] rounded-lg p-2 flex flex-col gap-4 text-[#756a9f]\">\n                \n                <div class=\"flex flex-col sm:flex-row items-center justify-between gap-8\">\n                    \n                    <!-- Left: Node Diagram -->\n                    <div class=\"relative w-32 h-16 flex-shrink-0 hidden sm:block\">\n                        <!-- Lines -->\n                        <div class=\"absolute top-2 left-2 w-20 h-px bg-[#756a9f]/50\"></div>\n                        <div class=\"absolute top-10 left-6 w-16 h-px bg-[#756a9f]/50\"></div>\n                        <div class=\"absolute top-2 left-22 w-px h-8 bg-[#756a9f]/50 rotate-45 origin-top-left\"></div>\n                        <div class=\"absolute top-10 left-6 w-px h-6 bg-[#756a9f]/50 -rotate-45 origin-top-left\"></div>\n                        \n                        <!-- Nodes -->\n                        <div class=\"absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full border border-[#756a9f] bg-[#0a0a0c]\"></div>\n                        <div class=\"absolute top-1.5 left-21.5 w-1.5 h-1.5 rounded-full border border-[#756a9f] bg-[#0a0a0c]\"></div>\n                        <div class=\"absolute top-9.5 left-5.5 w-1.5 h-1.5 rounded-full border border-[#756a9f] bg-[#0a0a0c]\"></div>\n                        <div class=\"absolute top-9.5 left-21.5 w-1.5 h-1.5 rounded-full border border-[#756a9f] bg-[#0a0a0c]\"></div>\n                        <div class=\"absolute top-14.5 left-1.5 w-1.5 h-1.5 rounded-full border border-[#756a9f] bg-[#0a0a0c]\"></div>\n                        \n                        <!-- Arrows -->\n                        <div class=\"absolute top-5 left-0 flex items-center gap-1\">\n                            <iconify-icon icon=\"solar:alt-arrow-right-linear\" class=\"text-lg\"></iconify-icon>\n                            <div class=\"w-8 h-px bg-[#756a9f]\"></div>\n                        </div>\n                    </div>\n\n                    <!-- Middle: Title -->\n                    <div class=\"flex items-center gap-4\">\n                        <div class=\"flex items-center gap-1 sm:hidden\">\n                            <iconify-icon icon=\"solar:alt-arrow-right-linear\" class=\"text-lg\"></iconify-icon>\n                            <div class=\"w-8 h-px bg-[#756a9f]\"></div>\n                        </div>\n                        <h3 class=\"gsap-reveal text-5xl sm:text-6xl tracking-tight font-normal\">909</h3>\n                    </div>\n\n                    <!-- Right: Info & Circle -->\n                    <div class=\"flex items-center gap-6\">\n                        <div class=\"flex flex-col text-xs\">\n                            <span>SECURITY-NET</span>\n                            <span class=\"opacity-70\">ACTIVE</span>\n                            <span class=\"opacity-70\">STAT: 0xBB02</span>\n                            <div class=\"flex gap-1 mt-1\">\n                                <div class=\"w-1.5 h-1.5 rounded-full border border-current\"></div>\n                                <div class=\"w-1.5 h-1.5 rounded-full border border-current\"></div>\n                                <div class=\"w-1.5 h-1.5 rounded-full border border-current bg-current\"></div>\n                            </div>\n                        </div>\n                        \n                        <!-- Circular Dots -->\n                        <div class=\"relative w-12 h-12 animate-spin\" style=\"animation-duration: 10s; animation-timing-function: linear;\">\n                            <div class=\"absolute inset-0\" id=\"circle-dots\">\n                                <!-- Populated by JS -->\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Bottom Text -->\n                <div class=\"text-center sm:text-left text-xs flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-8 mt-2 opacity-80\">\n                    <span>UPLINK STATUS - <span class=\"text-white opacity-90\">ONLINE</span></span>\n                    <span>POWER: 48V - DRAW: 1.8A</span>\n                </div>\n            </div>\n        </section>\n\n    </main>\n\n    <script>\n        // GSAP Masked Staggered Reveal Logic\n        gsap.registerPlugin(ScrollTrigger);\n        document.querySelectorAll('.gsap-reveal').forEach(el => {\n            const text = el.innerText;\n            const words = text.split(' ');\n            el.innerHTML = '';\n            words.forEach((word, i) => {\n                const outer = document.createElement('span');\n                // Ensure overflow hidden and adjust alignment\n                outer.className = 'inline-block overflow-hidden pb-1 -mb-1 align-bottom';\n                const inner = document.createElement('span');\n                inner.className = 'inline-block translate-y-[120%]';\n                inner.innerText = word + (i < words.length - 1 ? '\\u00A0' : '');\n                outer.appendChild(inner);\n                el.appendChild(outer);\n                \n                gsap.to(inner, {\n                    y: \"0%\",\n                    duration: 0.8,\n                    ease: \"power3.out\",\n                    delay: i * 0.1,\n                    scrollTrigger: {\n                        trigger: el,\n                        start: \"top 95%\",\n                    }\n                });\n            });\n        });\n\n        // Populate Matrix 1\n        const matrixContainer = document.getElementById('matrix-1');\n        let matrixHTML = '';\n        for(let i=0; i<80; i++) {\n            const isFilled = Math.random() > 0.6;\n            const isDim = Math.random() > 0.5;\n            matrixHTML += `<div class=\"w-1.5 h-1.5 rounded-full border border-current ${isFilled ? 'bg-current' : ''} ${isDim ? 'opacity-30' : ''}\"></div>`;\n        }\n        matrixContainer.innerHTML = matrixHTML;\n\n        // Populate Circle Dots\n        const circleContainer = document.getElementById('circle-dots');\n        let circleHTML = '';\n        for(let i=0; i<12; i++) {\n            const angle = (i * 30) * (Math.PI / 180);\n            const x = 24 + 20 * Math.cos(angle) - 3; // center 24, radius 20, offset half width\n            const y = 24 + 20 * Math.sin(angle) - 3;\n            const isFilled = i % 3 === 0;\n            circleHTML += `<div class=\"absolute w-1.5 h-1.5 rounded-full border border-current ${isFilled ? 'bg-current' : ''}\" style=\"left: ${x}px; top: ${y}px;\"></div>`;\n        }\n        circleContainer.innerHTML = circleHTML;\n\n        // WebGL-simulated Canvas Animation\n        const canvas = document.getElementById('bg-canvas');\n        const ctx = canvas.getContext('2d');\n        let width, height;\n        let particles = [];\n\n        function initCanvas() {\n            const dpr = Math.min(window.devicePixelRatio || 1, 2);\n            width = window.innerWidth;\n            height = window.innerHeight;\n            canvas.width = Math.max(1, Math.floor(width * dpr));\n            canvas.height = Math.max(1, Math.floor(height * dpr));\n            canvas.style.width = width + 'px';\n            canvas.style.height = height + 'px';\n            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n            ctx.imageSmoothingEnabled = false;\n            particles = [];\n            const numParticles = window.innerWidth < 640 ? 30 : 70;\n            for (let i = 0; i < numParticles; i++) {\n                particles.push({\n                    x: Math.random() * width,\n                    y: Math.random() * height,\n                    vx: (Math.random() - 0.5) * 0.5,\n                    vy: (Math.random() - 0.5) * 0.5\n                });\n            }\n        }\n\n        function drawLines() {\n            ctx.clearRect(0, 0, width, height);\n            ctx.lineWidth = 1;\n            ctx.lineCap = 'butt';\n            ctx.lineJoin = 'miter';\n            \n            for (let i = 0; i < particles.length; i++) {\n                let p = particles[i];\n                p.x += p.vx;\n                p.y += p.vy;\n\n                if (p.x < 0 || p.x > width) p.vx *= -1;\n                if (p.y < 0 || p.y > height) p.vy *= -1;\n\n                for (let j = i + 1; j < particles.length; j++) {\n                    let p2 = particles[j];\n                    let dx = p.x - p2.x;\n                    let dy = p.y - p2.y;\n                    let dist = Math.sqrt(dx * dx + dy * dy);\n\n                    if (dist < 120) {\n                        ctx.beginPath();\n                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 + (1 - dist / 120) * 0.42})`;\n                        ctx.moveTo(p.x, p.y);\n                        ctx.lineTo(p2.x, p2.y);\n                        ctx.stroke();\n                    }\n                }\n\n                ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';\n                ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);\n            }\n            requestAnimationFrame(drawLines);\n        }\n\n        window.addEventListener('resize', initCanvas);\n        initCanvas();\n        drawLines();\n    <\/script>\n</body>\n</html>", ce = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Nexus / Systems</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap\" rel=\"stylesheet\">\n    <style>\n        body {\n            font-family: 'Inter', sans-serif;\n            background-color: #050505;\n        }\n        .font-mono {\n            font-family: 'JetBrains Mono', monospace;\n        }\n    </style>\n</head>\n<body class=\"text-zinc-300 min-h-screen flex flex-col overflow-x-hidden selection:bg-white/20 antialiased\">\n\n    <!-- Navbar / Top Brand -->\n    <nav class=\"w-full relative z-20\">\n        <!-- Gradient Border Bottom -->\n        <div class=\"absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent\"></div>\n        <div class=\"max-w-7xl mx-auto px-6 h-16 flex items-center justify-between\">\n            <div class=\"flex items-center gap-2 text-sm tracking-tight font-medium text-white\">\n                <iconify-icon icon=\"solar:atom-linear\" width=\"20\"></iconify-icon>\n                <span>NEXUS / CORE</span>\n            </div>\n            <div class=\"flex items-center gap-6 text-xs font-mono text-zinc-500\">\n                <span class=\"hidden sm:block reveal-text\">BUILD.v7.2.1</span>\n                <span class=\"flex items-center gap-2 text-zinc-400\">\n                    <span class=\"w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse\"></span>\n                    <span class=\"reveal-text\">ACTIVE</span>\n                </span>\n            </div>\n        </div>\n    </nav>\n\n    <!-- Main Layout with Vertical Container Lines -->\n    <main class=\"flex-grow w-full max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-3\">\n        \n        <!-- Gradient Container Borders -->\n        <div class=\"absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-20\"></div>\n        <div class=\"absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-20\"></div>\n\n        <!-- Decoration: Corner Squares for Container Lines -->\n        <div class=\"absolute -top-[1px] -left-[3px] w-[5px] h-[5px] bg-white z-20\"></div>\n        <div class=\"absolute -top-[1px] -right-[3px] w-[5px] h-[5px] bg-white z-20\"></div>\n        <div class=\"absolute -bottom-[1px] -left-[3px] w-[5px] h-[5px] bg-white z-20\"></div>\n        <div class=\"absolute -bottom-[1px] -right-[3px] w-[5px] h-[5px] bg-white z-20\"></div>\n\n        <!-- Section 01: Hypercube -->\n        <div class=\"group relative p-8 lg:p-10 flex flex-col justify-between h-[600px] lg:h-[800px] overflow-hidden\">\n            <!-- Background Image Aura Asset -->\n            <div class=\"absolute inset-0 z-0 opacity-[0.08] mix-blend-screen transition-opacity duration-1000 group-hover:opacity-[0.2]\" style=\"background-image: url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg'); background-size: cover; background-position: center;\"></div>\n            \n            <!-- Gradient Divider Right -->\n            <div class=\"hidden lg:block absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-20\"></div>\n            <!-- Gradient Divider Bottom (Mobile) -->\n            <div class=\"block lg:hidden absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20\"></div>\n\n            <!-- Header -->\n            <div class=\"relative z-10 flex justify-between items-start font-mono text-xs text-zinc-500 uppercase tracking-widest\">\n                <span class=\"text-zinc-300 font-medium font-sans reveal-text\">Prismatic Core</span>\n                <span class=\"reveal-text\">01//</span>\n            </div>\n            \n            <!-- Description Top -->\n            <p class=\"relative z-10 mt-8 text-xs text-zinc-400 leading-relaxed max-w-[280px] reveal-text\">\n                The foundational structure processes raw data streams, organizing chaotic inputs into structured geometric architectures.\n            </p>\n\n            <!-- Visual (Canvas) -->\n            <div data-wireframe-visual class=\"relative z-10 flex-grow flex items-center justify-center py-12\">\n                <canvas id=\"canvas1\" class=\"w-full max-w-[300px] aspect-square opacity-80 mix-blend-screen\"></canvas>\n                <!-- Axis Labels -->\n                <span class=\"absolute left-0 top-1/2 text-[10px] text-zinc-700 font-mono -translate-y-1/2 reveal-text\">Input</span>\n                <span class=\"absolute right-0 top-1/2 text-[10px] text-zinc-700 font-mono -translate-y-1/2 reveal-text\">Output</span>\n            </div>\n\n            <!-- Footer -->\n            <div class=\"relative z-10 space-y-6\">\n                <div class=\"pt-4 relative\">\n                    <div class=\"absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/10 to-transparent\"></div>\n                    <h3 class=\"text-sm font-medium text-white mb-2 reveal-text\">Sequence: Alpha</h3>\n                    <p class=\"text-xs text-zinc-500 leading-relaxed reveal-text\">\n                        Nexus enables the synthesis of physical and virtual environments, unlocking realms previously hidden from standard view.\n                    </p>\n                </div>\n                <!-- Mini Grid Decor -->\n                <div class=\"flex justify-end\">\n                    <div class=\"grid grid-cols-4 grid-rows-3 gap-[1px] bg-[#1a1a1c] border border-[#1a1a1c] w-24 h-16 opacity-50\">\n                        <div class=\"bg-[#09090b]\"></div><div class=\"bg-[#09090b]\"></div><div class=\"bg-[#09090b]\"></div><div class=\"bg-[#09090b]\"></div>\n                        <div class=\"bg-[#09090b]\"></div><div class=\"bg-[#09090b]\"></div><div class=\"bg-[#09090b] flex items-center justify-center\"><div class=\"w-1 h-1 bg-white rounded-full\"></div></div><div class=\"bg-[#09090b]\"></div>\n                        <div class=\"bg-[#09090b]\"></div><div class=\"bg-[#09090b]\"></div><div class=\"bg-[#09090b]\"></div><div class=\"bg-[#09090b]\"></div>\n                    </div>\n                </div>\n                <div class=\"flex justify-between items-end font-mono text-[10px] text-zinc-600\">\n                    <span class=\"reveal-text\">Nexus.sys</span>\n                    <span class=\"reveal-text\">V-00.XX.1024</span>\n                </div>\n            </div>\n        </div>\n\n        <!-- Section 02: Logic Cylinders -->\n        <div class=\"group relative p-8 lg:p-10 flex flex-col justify-between h-[600px] lg:h-[800px] overflow-hidden\">\n            <!-- Background Image Aura Asset -->\n            <div class=\"absolute inset-0 z-0 opacity-[0.08] mix-blend-screen transition-opacity duration-1000 group-hover:opacity-[0.2]\" style=\"background-image: url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg'); background-size: cover; background-position: center;\"></div>\n            \n            <!-- Gradient Divider Right -->\n            <div class=\"hidden lg:block absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent z-20\"></div>\n            <!-- Gradient Divider Bottom (Mobile) -->\n            <div class=\"block lg:hidden absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20\"></div>\n\n            <div class=\"relative z-10 flex justify-between items-start font-mono text-xs text-zinc-500 uppercase tracking-widest\">\n                <span class=\"text-zinc-300 font-medium font-sans reveal-text\">Cognitive Mesh</span>\n                <span class=\"reveal-text\">02//</span>\n            </div>\n\n            <p class=\"relative z-10 mt-8 text-xs text-zinc-400 leading-relaxed max-w-[280px] reveal-text\">\n                Data flow stems from legacy nodes. An interface born from overlapping algorithms and encrypted keys.\n            </p>\n\n            <div data-wireframe-visual class=\"relative z-10 flex-grow flex items-center justify-center py-12\">\n                <canvas id=\"canvas2\" class=\"w-full max-w-[300px] aspect-square opacity-80 mix-blend-screen\"></canvas>\n                <!-- Floating Glyphs -->\n                <div class=\"absolute inset-0 flex items-center justify-center gap-16 pointer-events-none\">\n                    <iconify-icon icon=\"solar:code-scan-linear\" class=\"text-white/20 text-4xl animate-[pulse_4s_ease-in-out_infinite]\"></iconify-icon>\n                    <iconify-icon icon=\"solar:database-linear\" class=\"text-white/20 text-4xl animate-[pulse_4s_ease-in-out_infinite] animation-delay-2000\"></iconify-icon>\n                </div>\n            </div>\n\n            <div class=\"relative z-10 space-y-6\">\n                <div class=\"text-right\">\n                    <p class=\"text-xs text-zinc-500 leading-relaxed max-w-[240px] ml-auto reveal-text\">\n                        Within Nexus, metrics are redefined: bridging analytical processing and immersive interaction. The ultimate signature of digital evolution.\n                    </p>\n                </div>\n                <div class=\"relative flex justify-between items-end font-mono text-[10px] text-zinc-600 pt-12\">\n                    <div class=\"absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent\"></div>\n                    <span class=\"reveal-text\">Nexus.sys</span>\n                    <span class=\"reveal-text\">SYS.MEM.OVERFLOW</span>\n                </div>\n            </div>\n        </div>\n\n        <!-- Section 03: Esoteric Sphere -->\n        <div class=\"group relative p-8 lg:p-10 flex flex-col justify-between h-[600px] lg:h-[800px] overflow-hidden\">\n            <!-- Background Image Aura Asset -->\n            <div class=\"absolute inset-0 z-0 opacity-[0.08] mix-blend-screen transition-opacity duration-1000 group-hover:opacity-[0.2]\" style=\"background-image: url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg'); background-size: cover; background-position: center;\"></div>\n\n            <div class=\"relative z-10 flex justify-between items-start font-mono text-xs text-zinc-500 uppercase tracking-widest\">\n                <span class=\"text-zinc-300 font-medium font-sans reveal-text\">Kinetic Frequency</span>\n                <span class=\"reveal-text\">03//</span>\n            </div>\n\n            <p class=\"relative z-10 mt-8 text-xs text-zinc-400 leading-relaxed max-w-[280px] reveal-text\">\n                \"Frequency\" denotes the synchronization of fragmented data packets, individuals, or systems oscillating at parallel states.\n            </p>\n\n            <div data-wireframe-visual class=\"relative z-10 flex-grow flex items-center justify-center py-12\">\n                <canvas id=\"canvas3\" class=\"w-full max-w-[300px] aspect-square opacity-80 mix-blend-screen\"></canvas>\n            </div>\n\n            <div class=\"relative z-10 space-y-6\">\n                 <div class=\"pt-4 relative\">\n                    <div class=\"absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent\"></div>\n                    <h3 class=\"text-sm font-medium text-white mb-2 reveal-text\">State: Synchronized</h3>\n                    <p class=\"text-xs text-zinc-500 leading-relaxed reveal-text\">\n                        Frequency: Data equals the juncture between pure logic and tactile feedback. Tuning to optimal processing bandwidths.\n                    </p>\n                </div>\n                <div class=\"flex justify-between items-end font-mono text-[10px] text-zinc-600\">\n                    <div class=\"flex gap-2\">\n                        <span class=\"w-2 h-2 rounded-full border border-zinc-700\"></span>\n                        <span class=\"w-2 h-2 rounded-full border border-zinc-700 bg-white/20\"></span>\n                        <span class=\"w-2 h-2 rounded-full border border-zinc-700\"></span>\n                    </div>\n                    <span class=\"reveal-text\">Nexus.sys</span>\n                </div>\n            </div>\n        </div>\n    </main>\n\n    <!-- Bottom Interface Bar -->\n    <footer class=\"w-full relative z-20 bg-[#09090b]\">\n        <div class=\"absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent\"></div>\n        <div class=\"max-w-7xl mx-auto px-6 h-12 flex items-center justify-between font-mono text-[10px] text-zinc-600 uppercase\">\n            <div class=\"flex items-center gap-4\">\n                <span class=\"reveal-text\">Ping: 2ms</span>\n                <span class=\"hidden sm:inline reveal-text\">Cipher: RSA-4096</span>\n            </div>\n            <div class=\"flex items-center gap-4\">\n                <a href=\"#\" class=\"hover:text-white transition-colors\">Privacy</a>\n                <a href=\"#\" class=\"hover:text-white transition-colors\">Terms</a>\n                <a href=\"#\" class=\"hover:text-white transition-colors\">Doctrine</a>\n            </div>\n        </div>\n    </footer>\n\n    <!-- WebGL-like Canvas Animation Script & GSAP Reveal -->\n    <script>\n        // GSAP ScrollTrigger Text Reveal\n        gsap.registerPlugin(ScrollTrigger);\n        \n        document.querySelectorAll('.reveal-text').forEach(el => {\n            const text = el.innerText.trim();\n            const words = text.split(/\\s+/);\n            el.innerHTML = words.map(word => \n                `<span style=\"overflow: hidden; display: inline-block; vertical-align: top;\"><span style=\"display: inline-block; transform: translateY(100%);\" class=\"reveal-word\">${word}</span></span>`\n            ).join(' ');\n\n            gsap.to(el.querySelectorAll('.reveal-word'), {\n                y: '0%',\n                duration: 0.8,\n                stagger: 0.03,\n                ease: 'power3.out',\n                scrollTrigger: {\n                    trigger: el,\n                    start: 'top 95%',\n                    toggleActions: 'play none none none'\n                }\n            });\n        });\n\n        // Wireframe Engine\n        class WireframeEngine {\n            constructor(canvasId, shapeType) {\n                this.canvas = document.getElementById(canvasId);\n                this.ctx = this.canvas.getContext('2d');\n                this.width = this.canvas.offsetWidth;\n                this.height = this.canvas.offsetHeight;\n                this.canvas.width = this.width * 2; \n                this.canvas.height = this.height * 2;\n                this.ctx.scale(2, 2);\n                this.cx = this.width / 2;\n                this.cy = this.height / 2;\n                this.shapeType = shapeType;\n                \n                this.points = [];\n                this.edges = [];\n                this.angleX = 0;\n                this.angleY = 0;\n                \n                this.initShape();\n                this.animate();\n            }\n\n            initShape() {\n                if (this.shapeType === 'cube') {\n                    const s = 80;\n                    this.points.push({x: s, y: s, z: s}, {x: -s, y: -s, z: s}, {x: -s, y: s, z: -s}, {x: s, y: -s, z: -s});\n                    this.points.push({x: -s, y: -s, z: -s}, {x: s, y: s, z: -s}, {x: s, y: -s, z: s}, {x: -s, y: s, z: s});\n                    this.edges.push([0,1], [0,2], [0,3], [1,2], [1,3], [2,3]);\n                    this.edges.push([4,5], [4,6], [4,7], [5,6], [5,7], [6,7]);\n                } else if (this.shapeType === 'cylinders') {\n                    const r = 70;\n                    const segments = 24;\n                    for(let i=0; i<segments; i++) {\n                        const theta = (i/segments) * Math.PI * 2;\n                        this.points.push({ x: Math.cos(theta)*r, y: Math.sin(theta)*r, z: -30 });\n                        this.points.push({ x: Math.cos(theta)*r, y: Math.sin(theta)*r, z: 30 });\n                        let next = (i+1)%segments;\n                        this.edges.push([i*2, next*2], [i*2+1, next*2+1], [i*2, i*2+1]);\n                    }\n                     let offset = this.points.length;\n                     for(let i=0; i<segments; i++) {\n                        const theta = (i/segments) * Math.PI * 2;\n                        this.points.push({ x: Math.cos(theta)*r, y: -30, z: Math.sin(theta)*r });\n                        this.points.push({ x: Math.cos(theta)*r, y: 30, z: Math.sin(theta)*r });\n                        let next = (i+1)%segments;\n                        this.edges.push([offset + i*2, offset + next*2], [offset + i*2+1, offset + next*2+1], [offset + i*2, offset + i*2+1]);\n                    }\n                } else if (this.shapeType === 'sphere') {\n                    const t = (1.0 + Math.sqrt(5.0)) / 2.0;\n                    const s = 50; \n                    const p = [\n                        [-1,  t,  0], [ 1,  t,  0], [-1, -t,  0], [ 1, -t,  0],\n                        [ 0, -1,  t], [ 0,  1,  t], [ 0, -1, -t], [ 0,  1, -t],\n                        [ t,  0, -1], [ t,  0,  1], [-t,  0, -1], [-t,  0,  1]\n                    ];\n                    p.forEach(v => this.points.push({x: v[0]*s, y: v[1]*s, z: v[2]*s}));\n                    for(let i=0; i<this.points.length; i++){\n                        for(let j=i+1; j<this.points.length; j++){\n                            let d = Math.hypot(this.points[i].x - this.points[j].x, this.points[i].y - this.points[j].y, this.points[i].z - this.points[j].z);\n                            if(d < s*2.1) this.edges.push([i,j]);\n                        }\n                    }\n                     p.forEach(v => this.points.push({x: v[0]*s*0.5, y: v[1]*s*0.5, z: v[2]*s*0.5}));\n                     let off = 12;\n                     for(let i=0; i<12; i++){\n                        for(let j=i+1; j<12; j++){\n                            let d = Math.hypot(this.points[off+i].x - this.points[off+j].x, this.points[off+i].y - this.points[off+j].y, this.points[off+i].z - this.points[off+j].z);\n                            if(d < s*1.1) this.edges.push([off+i,off+j]);\n                        }\n                        this.edges.push([i, off+i]); \n                     }\n                }\n            }\n\n            project(p) {\n                let x = p.x * Math.cos(this.angleY) - p.z * Math.sin(this.angleY);\n                let z = p.z * Math.cos(this.angleY) + p.x * Math.sin(this.angleY);\n                let y = p.y * Math.cos(this.angleX) - z * Math.sin(this.angleX);\n                z = z * Math.cos(this.angleX) + p.y * Math.sin(this.angleX);\n                \n                let fov = 400;\n                let scale = fov / (fov + z);\n                return { x: x * scale + this.cx, y: y * scale + this.cy, z: z };\n            }\n\n            animate() {\n                this.ctx.clearRect(0, 0, this.width, this.height);\n                this.angleY += 0.005;\n                this.angleX += 0.002;\n                \n                this.ctx.lineWidth = 0.8;\n\n                let projected = this.points.map(p => this.project(p));\n\n                this.edges.forEach(e => {\n                    let p1 = projected[e[0]];\n                    let p2 = projected[e[1]];\n                    let depth = (p1.z + p2.z) / 2;\n                    let alpha = Math.max(0.1, (1 - (depth / 200)));\n                    \n                    this.ctx.beginPath();\n                    this.ctx.moveTo(p1.x, p1.y);\n                    this.ctx.lineTo(p2.x, p2.y);\n                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;\n                    this.ctx.stroke();\n                });\n\n                projected.forEach(p => {\n                    let alpha = Math.max(0.1, (1 - (p.z / 200)));\n                    if (alpha > 0.5) {\n                        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;\n                        this.ctx.fillRect(p.x-1, p.y-1, 2, 2);\n                    }\n                });\n\n                requestAnimationFrame(() => this.animate());\n            }\n        }\n\n        window.onload = () => {\n            new WireframeEngine('canvas1', 'cube');\n            new WireframeEngine('canvas2', 'cylinders');\n            new WireframeEngine('canvas3', 'sphere');\n        };\n    <\/script>\n</body>\n</html>", le = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Cyber Defenses</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&family=Plus+Jakarta+Sans:wght@300;400&display=swap\" rel=\"stylesheet\">\n</head>\n<body class=\"bg-[#030303] min-h-screen flex flex-col items-center justify-center overflow-hidden text-white relative antialiased selection:bg-red-500/30\" style=\"font-family: 'Plus Jakarta Sans', sans-serif;\">\n    \n    <!-- Canvas for background line animation -->\n    <canvas id=\"bg-canvas\" class=\"absolute inset-0 z-0 opacity-50 pointer-events-none\"></canvas>\n\n    <!-- Ambient background glow -->\n    <div class=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none z-0\"></div>\n\n    <main class=\"relative z-10 flex flex-col items-center justify-center w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6\">\n        \n        <!-- 3D Card Carousel -->\n        <div class=\"relative flex items-center justify-center w-full h-[400px] sm:h-[650px]\" style=\"perspective: 1200px;\">\n            <div id=\"carousel\" class=\"relative w-full h-full flex items-center justify-center\" style=\"transform-style: preserve-3d;\">\n                \n                <!-- Left Cards -->\n                <div class=\"card absolute w-32 sm:w-64 h-[230px] sm:h-[422px] rounded-xl z-0 bg-gradient-to-r from-[#0a0202] to-[#1f0505] border border-red-900/10 cursor-pointer pointer-events-auto\" style=\"transform: translateX(-180%) translateZ(-400px) rotateY(35deg); opacity: 0.15; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);\"></div>\n                <div class=\"card absolute w-32 sm:w-64 h-[230px] sm:h-[422px] rounded-xl z-10 bg-gradient-to-r from-[#140303] to-[#3d0a0a] border border-red-900/20 cursor-pointer pointer-events-auto\" style=\"transform: translateX(-120%) translateZ(-250px) rotateY(25deg); opacity: 0.4; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);\"></div>\n                <div class=\"card absolute w-32 sm:w-64 h-[230px] sm:h-[422px] rounded-xl z-20 bg-gradient-to-r from-[#290606] to-[#6b1111] border border-red-700/30 cursor-pointer pointer-events-auto\" style=\"transform: translateX(-60%) translateZ(-100px) rotateY(15deg); opacity: 0.7; box-shadow: inset 0 0 20px rgba(0,0,0,0.3);\"></div>\n\n                <!-- Right Cards -->\n                <div class=\"card absolute w-32 sm:w-64 h-[230px] sm:h-[422px] rounded-xl z-0 bg-gradient-to-l from-[#0a0202] to-[#1f0505] border border-red-900/10 cursor-pointer pointer-events-auto\" style=\"transform: translateX(180%) translateZ(-400px) rotateY(-35deg); opacity: 0.15; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);\"></div>\n                <div class=\"card absolute w-32 sm:w-64 h-[230px] sm:h-[422px] rounded-xl z-10 bg-gradient-to-l from-[#140303] to-[#3d0a0a] border border-red-900/20 cursor-pointer pointer-events-auto\" style=\"transform: translateX(120%) translateZ(-250px) rotateY(-25deg); opacity: 0.4; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);\"></div>\n                <div class=\"card absolute w-32 sm:w-64 h-[230px] sm:h-[422px] rounded-xl z-20 bg-gradient-to-l from-[#290606] to-[#6b1111] border border-red-700/30 cursor-pointer pointer-events-auto\" style=\"transform: translateX(60%) translateZ(-100px) rotateY(-15deg); opacity: 0.7; box-shadow: inset 0 0 20px rgba(0,0,0,0.3);\"></div>\n\n                <!-- Center Active Card -->\n                <div class=\"card absolute w-36 sm:w-72 h-[269px] sm:h-[461px] bg-gradient-to-br from-[#ff4747] to-[#cc0000] rounded-xl flex items-center justify-center z-30 border border-red-300/40 overflow-hidden cursor-pointer pointer-events-auto\" style=\"transform: translateZ(50px); box-shadow: 0 0 80px 15px rgba(220, 38, 38, 0.35), inset 0 0 30px rgba(255,255,255,0.15);\">\n                    <img src=\"https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg\" class=\"absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply pointer-events-none\" alt=\"Abstract Pattern\">\n                    <div class=\"relative flex w-full h-full pointer-events-none\" style=\"background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%), repeating-linear-gradient(-45deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 2px, transparent 2px, transparent 12px);\">\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Typography Section (Overlayed) -->\n        <div class=\"absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-40\" id=\"hero-text\">\n            \n            <!-- Monospaced Technical Badge -->\n            <div id=\"hero-badge\" class=\"opacity-0 flex items-center gap-3 px-4 py-2 rounded-full bg-[#1a0505]/80 backdrop-blur-md text-red-400 text-xs font-light tracking-widest uppercase mb-8\" style=\"font-family: 'DM Mono', monospace; box-shadow: 0 0 20px rgba(220,38,38,0.15); border: 1px solid transparent; background-clip: padding-box, border-box; background-origin: padding-box, border-box; background-image: linear-gradient(#1a0505, #1a0505), linear-gradient(to right, rgba(153,27,27,0.6), rgba(239,68,68,0.3));\">\n                <iconify-icon icon=\"solar:radar-linear\" width=\"16\" height=\"16\" stroke-width=\"1.5\"></iconify-icon>\n                <span>Continuous Network Surveillance</span>\n            </div>\n            \n            <!-- Elegant Serif Headline -->\n            <h1 class=\"text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#f5f5f5] leading-none max-w-5xl flex flex-col items-center gap-y-2 sm:gap-y-4\" style=\"font-family: 'Cormorant Garamond', serif; text-shadow: 0 10px 40px rgba(0,0,0,0.9);\">\n                <div class=\"flex flex-wrap justify-center gap-x-3 sm:gap-x-4\">\n                    <span class=\"inline-flex overflow-hidden pb-1 sm:pb-2\"><span class=\"word translate-y-[120%] inline-block\">Expose</span></span>\n                    <span class=\"inline-flex overflow-hidden pb-1 sm:pb-2\"><span class=\"word translate-y-[120%] inline-block\">hidden</span></span>\n                    <span class=\"inline-flex overflow-hidden pb-1 sm:pb-2\"><span class=\"word translate-y-[120%] inline-block\">vulnerabilities</span></span>\n                </div>\n                <div class=\"flex flex-wrap justify-center gap-x-3 sm:gap-x-4 italic text-red-100\">\n                    <span class=\"inline-flex overflow-hidden pb-1 sm:pb-2\"><span class=\"word translate-y-[120%] inline-block\">within</span></span>\n                    <span class=\"inline-flex overflow-hidden pb-1 sm:pb-2\"><span class=\"word translate-y-[120%] inline-block\">your</span></span>\n                    <span class=\"inline-flex overflow-hidden pb-1 sm:pb-2\"><span class=\"word translate-y-[120%] inline-block\">cloud</span></span>\n                    <span class=\"inline-flex overflow-hidden pb-1 sm:pb-2\"><span class=\"word translate-y-[120%] inline-block\">infrastructure</span></span>\n                </div>\n            </h1>\n\n            <!-- Clean Sans-Serif CTA -->\n            <button id=\"hero-button\" class=\"opacity-0 group relative mt-10 sm:mt-14 px-8 py-4 rounded-lg text-sm font-light text-white transition-all active:scale-95 pointer-events-auto flex items-center justify-center bg-red-600 border border-red-500/50 overflow-hidden\" style=\"font-family: 'Plus Jakarta Sans', sans-serif;\">\n                <span class=\"absolute inset-0 w-full h-full bg-red-500 transition-all duration-500 ease-out [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)] z-0\"></span>\n                <span class=\"relative z-10 flex items-center gap-2\">\n                    Start Threat Assessment\n                    <iconify-icon icon=\"solar:arrow-right-linear\" width=\"18\" height=\"18\" stroke-width=\"1.5\"></iconify-icon>\n                </span>\n            </button>\n        </div>\n    </main>\n\n    <script>\n        // Background Canvas Animation\n        const canvas = document.getElementById('bg-canvas');\n        const ctx = canvas.getContext('2d');\n        let width, height;\n        let particles = [];\n\n        function initCanvas() {\n            const dpr = Math.min(window.devicePixelRatio || 1, 2);\n            width = window.innerWidth;\n            height = window.innerHeight;\n            canvas.width = Math.max(1, Math.floor(width * dpr));\n            canvas.height = Math.max(1, Math.floor(height * dpr));\n            canvas.style.width = width + 'px';\n            canvas.style.height = height + 'px';\n            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n            ctx.imageSmoothingEnabled = false;\n            particles = [];\n            const particleCount = window.innerWidth < 768 ? 40 : 100;\n            \n            for(let i = 0; i < particleCount; i++) {\n                particles.push({\n                    x: Math.random() * width,\n                    y: Math.random() * height,\n                    baseLength: Math.random() * 80 + 20,\n                    speedY: Math.random() * 0.8 + 0.2,\n                    baseOpacity: Math.random() * 0.2 + 0.05\n                });\n            }\n        }\n\n        window.addEventListener('resize', initCanvas);\n        initCanvas();\n\n        function animateCanvas() {\n            ctx.clearRect(0, 0, width, height);\n            const centerX = width / 2;\n            const centerY = height / 2;\n            ctx.lineCap = 'butt';\n            ctx.lineJoin = 'miter';\n            \n            particles.forEach(p => {\n                const distFromCenterX = Math.abs(p.x - centerX);\n                const distFromCenterY = Math.abs(p.y - centerY);\n                \n                const proximityX = Math.max(0, 1 - (distFromCenterX / (width / 2)));\n                const proximityY = Math.max(0, 1 - (distFromCenterY / (height / 2)));\n                const centerProximity = proximityX * (0.4 + proximityY * 0.6);\n                \n                const currentLength = p.baseLength * (1 + centerProximity * 4); \n                \n                const currentOpacity = Math.min(1.0, p.baseOpacity + (centerProximity * 2.0));\n                const brightness = Math.floor(centerProximity * 180);\n                \n                ctx.beginPath();\n                const grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + currentLength);\n                grad.addColorStop(0, `rgba(220, 38, 38, 0)`);\n                grad.addColorStop(0.5, `rgba(255, ${38 + brightness}, ${38 + brightness}, ${currentOpacity})`);\n                grad.addColorStop(1, `rgba(220, 38, 38, 0)`);\n                \n                ctx.strokeStyle = grad;\n                ctx.lineWidth = 0.5;\n                ctx.moveTo(p.x, p.y);\n                ctx.lineTo(p.x, p.y + currentLength);\n                ctx.stroke();\n\n                p.y -= p.speedY * 1.5 * (1 + centerProximity * 0.5);\n                \n                if(p.y + currentLength < 0) {\n                    p.y = height;\n                    p.x = Math.random() * width;\n                }\n            });\n            requestAnimationFrame(animateCanvas);\n        }\n        animateCanvas();\n\n        // 3D Cards Floating, Mouse Tracking & Hover Animation\n        const carousel = document.getElementById('carousel');\n        const cards = document.querySelectorAll('.card');\n        let time = 0;\n        let targetRotateY = 0;\n        let currentRotateY = 0;\n\n        cards.forEach(card => {\n            card.addEventListener('mouseenter', () => card.isHovered = true);\n            card.addEventListener('mouseleave', () => card.isHovered = false);\n            card.hoverAmt = 0;\n        });\n\n        window.addEventListener('mousemove', (e) => {\n            const x = (e.clientX / window.innerWidth) - 0.5;\n            targetRotateY = x * 40; \n        });\n\n        function animateCards() {\n            time += 0.015;\n            currentRotateY += (targetRotateY - currentRotateY) * 0.08;\n            carousel.style.transform = `rotateY(${currentRotateY}deg)`;\n\n            cards.forEach((card, index) => {\n                if(!card.dataset.baseTransform) {\n                    card.dataset.baseTransform = card.style.transform;\n                    const match = card.dataset.baseTransform.match(/translateX\\(([^)]+)\\)/);\n                    card.directionX = match ? parseFloat(match[1]) : 0;\n                }\n                \n                const targetHover = card.isHovered ? 1 : 0;\n                card.hoverAmt += (targetHover - card.hoverAmt) * 0.15;\n                \n                const hoverZ = card.hoverAmt * 60;\n                const hoverY = card.hoverAmt * -20;\n                let hoverX = 0;\n                \n                if (card.directionX < 0) hoverX = card.hoverAmt * -40;\n                else if (card.directionX > 0) hoverX = card.hoverAmt * 40;\n\n                const offset = Math.sin(time + (index * 0.5)) * 8;\n                \n                card.style.transform = `${card.dataset.baseTransform} translateX(${hoverX}px) translateY(${offset + hoverY}px) translateZ(${hoverZ}px)`;\n            });\n            requestAnimationFrame(animateCards);\n        }\n        animateCards();\n\n        // Entrance Animation with GSAP Masked Reveal\n        gsap.registerPlugin(ScrollTrigger);\n\n        setTimeout(() => {\n            // Animate headline words in a masked stagger\n            gsap.to('.word', {\n                y: \"0%\",\n                duration: 1.2,\n                stagger: 0.06,\n                ease: \"power4.out\",\n                scrollTrigger: {\n                    trigger: \"#hero-text\",\n                    start: \"top 90%\"\n                }\n            });\n\n            // Fade in and float up the badge and button sequentially\n            gsap.fromTo(['#hero-badge', '#hero-button'], \n                { opacity: 0, y: 20 },\n                { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: \"power3.out\", delay: 0.4 }\n            );\n        }, 150);\n    <\/script>\n</body>\n</html>", ue = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>System Override</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n</head>\n<body class=\"bg-zinc-900 text-orange-500 font-mono w-full h-screen overflow-hidden relative select-none flex items-center justify-center\">\n\n    <!-- Aura Asset Background Image (Subtle) -->\n    <div class=\"absolute inset-0 z-[-1] opacity-30 mix-blend-screen bg-cover bg-center\" style=\"background-image: url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg');\"></div>\n\n    <!-- Dither / Noise Overlay -->\n    <div class=\"pointer-events-none absolute inset-0 z-50 opacity-[0.06] mix-blend-screen\" style=\"background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 2 2%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Crect width=%221%22 height=%221%22 fill=%22%23f97316%22/%3E%3Crect x=%221%22 y=%221%22 width=%221%22 height=%221%22 fill=%22%23f97316%22/%3E%3C/svg%3E'); background-size: 2px 2px;\"></div>\n\n    <!-- WebGL-style Block by Block Animation Canvas -->\n    <canvas id=\"grid-canvas\" class=\"absolute inset-0 z-0 opacity-50\" aria-hidden=\"true\"></canvas>\n\n    <!-- Viewport Corner Markers -->\n    <div class=\"absolute top-4 left-4 w-4 h-4 border-t border-l border-orange-500/50 z-10\"></div>\n    <div class=\"absolute top-4 right-4 w-4 h-4 border-t border-r border-orange-500/50 z-10\"></div>\n    <div class=\"absolute bottom-4 left-4 w-4 h-4 border-b border-l border-orange-500/50 z-10\"></div>\n    <div class=\"absolute bottom-4 right-4 w-4 h-4 border-b border-r border-orange-500/50 z-10\"></div>\n\n    <!-- Background Telemetry Text -->\n    <div class=\"absolute top-8 left-8 text-xs font-thin opacity-60 tracking-widest flex flex-col gap-1 z-10 hidden sm:flex\">\n        <span>SYNC_PHASE: <span id=\"log-frame\">000000</span></span>\n        <span>SYS_OVERRIDE_SEQ: [ ACTIVE ]</span>\n        <span>ROUTE_MAP: TRACING</span>\n        <span>CRIT_ALERT:</span>\n        <span class=\"text-orange-600 animate-pulse\">> ERR_TIMEOUT</span>\n        <span id=\"typewriter\" class=\"text-orange-400\"></span>\n    </div>\n\n    <div class=\"absolute bottom-8 right-8 text-xs font-thin opacity-60 tracking-widest text-right z-10 hidden sm:block\">\n        <span id=\"log-mem\">REG_ADDR: 0xFA48B2</span><br>\n        <span>STATE: OVERRIDING</span>\n    </div>\n\n    <!-- Main Content Container -->\n    <main class=\"relative z-20 w-full max-w-5xl h-full flex items-center justify-center px-4 sm:px-16\">\n        \n        <!-- Container Lines & Mini Squares -->\n        <div class=\"absolute inset-y-12 left-8 w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent hidden sm:block\"></div>\n        <div class=\"absolute inset-y-12 right-8 w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent hidden sm:block\"></div>\n        <div class=\"absolute top-1/4 left-[30px] w-1.5 h-1.5 border border-orange-500/80 hidden sm:block\"></div>\n        <div class=\"absolute bottom-1/4 left-[30px] w-1.5 h-1.5 border border-orange-500/80 hidden sm:block\"></div>\n        <div class=\"absolute top-1/3 right-[30px] w-1.5 h-1.5 border border-orange-500/80 hidden sm:block\"></div>\n        <div class=\"absolute bottom-1/3 right-[30px] w-1.5 h-1.5 border border-orange-500/80 hidden sm:block\"></div>\n\n        <!-- The Main Orange Block (Gradient Border for Premium Surface) -->\n        <div class=\"p-[1px] bg-gradient-to-br from-orange-300 via-orange-600/70 to-orange-900/40 relative w-full shadow-[0_0_50px_rgba(249,115,22,0.15)]\">\n            \n            <div class=\"relative w-full h-40 sm:h-48 bg-[#f97316] flex items-center transition-all duration-100\">\n                \n                <!-- Top Left Tab -->\n                <div class=\"absolute -top-6 left-0 h-6 w-24 bg-[#f97316] flex items-center justify-between px-2 text-xs font-normal text-zinc-800 tracking-widest border-b border-zinc-800\">\n                    <span>TIMEOUT</span>\n                    <div class=\"w-1.5 h-1.5 bg-zinc-800\"></div>\n                </div>\n\n                <!-- Right Edge Extrusions & Cutouts -->\n                <div class=\"absolute -top-3 right-0 h-3 w-10 sm:w-16 bg-[#f97316]\">\n                    <div class=\"absolute top-1 right-1 w-1 h-1 bg-zinc-800\"></div>\n                </div>\n                <div class=\"absolute -bottom-3 right-0 h-3 w-10 sm:w-16 bg-[#f97316]\">\n                    <div class=\"absolute bottom-1 right-1 w-1 h-1 bg-zinc-800\"></div>\n                </div>\n\n                <!-- Left Edge Middle Cutout -->\n                <div class=\"absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-4 bg-zinc-800 border-r border-[#f97316]/50\"></div>\n                <!-- Right Edge Middle Cutout -->\n                <div class=\"absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-6 bg-zinc-800\"></div>\n\n                <!-- Inner Layout -->\n                <div class=\"flex w-full h-full px-4 sm:px-8\">\n                    \n                    <!-- Left Section: Warning & Text -->\n                    <div class=\"flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 sm:gap-6 w-full sm:w-1/2 border-zinc-800/30 sm:border-r pr-0 sm:pr-6 relative gs-reveal-container\">\n                        <!-- Subtle animated background highlight in left section -->\n                        <div class=\"absolute inset-0 bg-white/5 opacity-0 animate-[pulse_4s_ease-in-out_infinite]\" style=\"animation-direction: alternate;\"></div>\n                        \n                        <iconify-icon icon=\"solar:round-transfer-horizontal-linear\" class=\"text-zinc-800 text-5xl sm:text-7xl shrink-0 animate-spin-slow relative z-10\" style=\"stroke-width: 1.5px; animation: spin 4s linear infinite;\"></iconify-icon>\n                        <div class=\"flex flex-col relative z-10 pt-1\">\n                            <h1 class=\"text-zinc-800 text-3xl sm:text-5xl font-light tracking-tight leading-[0.85] uppercase overflow-hidden pb-1\">\n                                <span class=\"block gs-reveal\">System</span>\n                            </h1>\n                            <h2 class=\"text-zinc-800 text-3xl sm:text-5xl font-thin tracking-tight leading-[0.85] uppercase mt-1 overflow-hidden pb-1\">\n                                <span class=\"block gs-reveal\">Override</span>\n                            </h2>\n                        </div>\n                    </div>\n\n                    <!-- Right Section: Data Matrix -->\n                    <div class=\"hidden sm:flex flex-1 relative items-center justify-end pl-6\">\n                        <!-- Crosshairs / Guides -->\n                        <div class=\"absolute inset-x-6 top-1/2 h-px bg-zinc-800/20 -translate-y-1/2\"></div>\n                        <div class=\"absolute inset-y-8 right-32 w-px bg-zinc-800/20\"></div>\n                        <div class=\"absolute inset-y-8 right-12 w-px bg-zinc-800/20\"></div>\n\n                        <!-- Data Grid Blocks -->\n                        <div class=\"flex gap-4 sm:gap-6 relative z-10\">\n                            <!-- Block Group 1 -->\n                            <div class=\"grid grid-cols-2 gap-1.5 h-fit\">\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                            </div>\n                            \n                            <!-- Block Group 2 (Offset) -->\n                            <div class=\"grid grid-cols-2 gap-1.5 h-fit mt-8\">\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] opacity-20 animate-pulse\"></div>\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                            </div>\n\n                            <div class=\"w-2\"></div>\n\n                            <!-- Block Group 3 (Top aligned, missing piece blinking to suggest retry) -->\n                            <div class=\"grid grid-cols-2 gap-1.5 h-fit\">\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                                <div class=\"w-5 h-5 bg-transparent border border-zinc-800 relative animate-pulse\">\n                                    <div class=\"absolute inset-x-1 top-1/2 h-px bg-zinc-800\"></div>\n                                    <div class=\"absolute inset-y-1 left-1/2 w-px bg-zinc-800\"></div>\n                                </div>\n                                <div class=\"w-5 h-5 bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]\"></div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Bottom Left Micro Details -->\n                <div class=\"absolute bottom-2 left-4 flex gap-2 items-center text-zinc-800\">\n                    <iconify-icon icon=\"solar:server-square-linear\" class=\"text-lg opacity-80\" style=\"stroke-width: 1.5px;\"></iconify-icon>\n                    <div class=\"flex flex-col\">\n                        <span class=\"text-xs tracking-widest opacity-80 uppercase font-light leading-none\">AUTH_NODE // ACCESS DENIED</span>\n                        <span class=\"text-xs tracking-widest opacity-60 uppercase font-thin mt-1\">EXECUTING BYPASS PROTOCOL...</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </main>\n\n    <script>\n        // GSAP ScrollTrigger Masked Reveal\n        gsap.registerPlugin(ScrollTrigger);\n        gsap.from(\".gs-reveal\", {\n            y: \"120%\",\n            duration: 1.2,\n            stagger: 0.15,\n            ease: \"power4.out\",\n            scrollTrigger: {\n                trigger: \".gs-reveal-container\",\n                start: \"top 95%\",\n            }\n        });\n\n        // WebGL-style Block by Block Animation (Simulated in 2D for constraints)\n        const canvas = document.getElementById('grid-canvas');\n        const ctx = canvas.getContext('2d');\n        let width, height, time = 0;\n\n        function resize() {\n            width = canvas.width = window.innerWidth;\n            height = canvas.height = window.innerHeight;\n        }\n        window.addEventListener('resize', resize);\n        resize();\n\n        function draw() {\n            ctx.clearRect(0, 0, width, height);\n            time += 0.04;\n\n            const blockSize = 48;\n            const blockGap = 2;\n            const pitch = blockSize + blockGap;\n            const cols = Math.ceil(width / pitch);\n            const rows = Math.ceil(height / pitch);\n\n            const centerX = cols / 2;\n            const centerY = rows / 2;\n\n            for (let i = 0; i < cols; i++) {\n                for (let j = 0; j < rows; j++) {\n                    const dist = Math.sqrt(Math.pow(i - centerX, 2) + Math.pow(j - centerY, 2));\n                    const wave = Math.sin(time - dist * 0.4);\n                    \n                    if (wave > 0) {\n                        const alpha = wave * 0.15; \n                        ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;\n                        \n                        // Block scaling for \"Z-depth\" pulsing feel\n                        const scale = wave * 0.7 + 0.3;\n                        const size = blockSize * scale;\n                        const offset = (pitch - size) / 2;\n                        \n                        ctx.fillRect(i * pitch + offset, j * pitch + offset, size, size);\n                    }\n                }\n            }\n            requestAnimationFrame(draw);\n        }\n        draw();\n\n        // Simulate telemetry data updates\n        setInterval(() => {\n            const frameLog = document.getElementById('log-frame');\n            const memLog = document.getElementById('log-mem');\n            if (frameLog) frameLog.innerText = Math.floor(Math.random() * 999999).toString().padStart(6, '0');\n            if (memLog) {\n                const hex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();\n                memLog.innerText = `REG_ADDR: 0x${hex}`;\n            }\n        }, 150);\n\n        // Typewriter Animation Logic\n        const typewriterElement = document.getElementById('typewriter');\n        if (typewriterElement) {\n            const phrases = [\"> INITIATING BYPASS...\", \"> FLUSHING REGISTERS...\", \"> TIMEOUT: RETRYING...\"];\n            let phraseIdx = 0;\n            let charIdx = 0;\n            let isDeleting = false;\n            \n            function type() {\n                const currentPhrase = phrases[phraseIdx];\n                if (isDeleting) {\n                    charIdx--;\n                } else {\n                    charIdx++;\n                }\n                \n                typewriterElement.innerText = currentPhrase.substring(0, charIdx) + \"_\";\n                \n                let speed = isDeleting ? 30 : 60;\n                \n                if (!isDeleting && charIdx === currentPhrase.length) {\n                    speed = 2000;\n                    isDeleting = true;\n                } else if (isDeleting && charIdx === 0) {\n                    isDeleting = false;\n                    phraseIdx = (phraseIdx + 1) % phrases.length;\n                    speed = 500;\n                }\n                \n                setTimeout(type, speed);\n            }\n            type();\n        }\n    <\/script>\n</body>\n</html>", T = "<!DOCTYPE html>\n<html lang=\"en\" class=\"scroll-smooth\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>NexusNode Infrastructure</title>\n    <script src=\"https://cdn.tailwindcss.com\"><\/script>\n    <script src=\"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js\"><\/script>\n    <!-- GSAP & ScrollTrigger for Masked Reveal -->\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js\"><\/script>\n</head>\n<body class=\"bg-black text-white font-sans min-h-screen relative overflow-x-hidden selection:bg-white/20 selection:text-white font-light\" style=\"background-color: #000; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;\">\n\n    <!-- WebGL Background Container -->\n    <div class=\"fixed inset-0 z-0 pointer-events-none\">\n        <canvas id=\"topo-canvas\" class=\"w-full h-full\"></canvas>\n        <!-- Gradient overlay to fade bottom and top for text readability -->\n        <div class=\"absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black z-10\"></div>\n        <div class=\"absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-90 z-10\"></div>\n    </div>\n\n    <!-- Main Content -->\n    <main class=\"relative z-20 flex flex-col min-h-screen\">\n        \n        <!-- Navigation -->\n        <header class=\"container mx-auto px-6 py-6 flex items-center justify-between reveal opacity-0 translate-y-4 transition-all duration-1000 ease-out\">\n            <div class=\"flex items-center gap-2 text-white hover:text-neutral-300 transition-colors cursor-pointer\">\n                <iconify-icon icon=\"solar:radar-linear\" width=\"24\"></iconify-icon>\n                <span class=\"font-light text-sm tracking-tight\">NexusNode</span>\n            </div>\n            <nav class=\"hidden md:flex items-center gap-8 text-sm text-neutral-400 font-extralight\">\n                <a href=\"#\" class=\"hover:text-white transition-colors\">Compute Clusters</a>\n                <a href=\"#\" class=\"hover:text-white transition-colors\">Observability</a>\n                <a href=\"#\" class=\"hover:text-white transition-colors\">Throughput</a>\n                <a href=\"#\" class=\"hover:text-white transition-colors\">Consensus</a>\n            </nav>\n            <div class=\"flex items-center gap-4\">\n                <a href=\"#\" class=\"hidden md:block text-sm text-neutral-400 font-extralight hover:text-white transition-colors\">Sign In</a>\n                <button class=\"bg-white text-black px-4 py-2 rounded-full text-sm font-light hover:bg-neutral-200 transition-colors\">\n                    Get Started\n                </button>\n            </div>\n        </header>\n\n        <!-- Hero Section -->\n        <section class=\"flex-grow flex flex-col items-center justify-center text-center px-6 py-24 md:py-32\">\n            <div class=\"max-w-4xl mx-auto flex flex-col items-center\">\n                \n                <!-- Pill Badge -->\n                <div class=\"reveal opacity-0 translate-y-4 transition-all duration-1000 ease-out inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8\">\n                    <span class=\"flex h-2 w-2 relative\">\n                        <span class=\"animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75\"></span>\n                        <span class=\"relative inline-flex rounded-full h-2 w-2 bg-white\"></span>\n                    </span>\n                    <span class=\"text-xs font-extralight text-neutral-300 tracking-wide uppercase\">Nexus OS v4.2 deployment ready</span>\n                    <iconify-icon icon=\"solar:alt-arrow-right-linear\" width=\"14\" class=\"text-neutral-500\"></iconify-icon>\n                </div>\n\n                <h1 class=\"mask-container text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.1]\">\n                    <span class=\"overflow-hidden inline-block align-bottom pb-2\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">Orchestrate</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-2\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">the</span></span>\n                    <br class=\"hidden md:block\" />\n                    <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600 font-extralight inline-block\">\n                        <span class=\"overflow-hidden inline-block align-bottom pb-2\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">neural</span></span>\n                        <span class=\"overflow-hidden inline-block align-bottom pb-2\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">compute</span></span>\n                        <span class=\"overflow-hidden inline-block align-bottom pb-2\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">fabric.</span></span>\n                    </span>\n                </h1>\n                \n                <p class=\"mask-container mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-extralight\">\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">Provision</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">ultra-low</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">latency</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">inference</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">nodes</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">with</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">zero</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">configuration.</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">Enterprise-grade</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">AI</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">infrastructure</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">built</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">for</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">real-time</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">model</span></span>\n                    <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">serving.</span></span>\n                </p>\n                \n                <div class=\"reveal opacity-0 translate-y-4 transition-all duration-1000 ease-out delay-300 mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto\">\n                    <button class=\"w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-light hover:bg-neutral-200 transition-colors group\">\n                        Launch Workspace\n                        <iconify-icon icon=\"solar:transfer-horizontal-linear\" width=\"18\" class=\"group-hover:translate-x-0.5 transition-transform\"></iconify-icon>\n                    </button>\n                    <button class=\"w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-light text-white border border-white/20 hover:bg-white/5 transition-colors\">\n                        View Documentation\n                    </button>\n                </div>\n            </div>\n        </section>\n\n        <!-- Features Matrix with Subtler Gradient Borders -->\n        <section class=\"container mx-auto px-6 py-24 pb-32\">\n            <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6 reveal opacity-0 translate-y-4 transition-all duration-1000 ease-out delay-300\">\n                \n                <!-- Feature Card 1 -->\n                <div class=\"group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 overflow-hidden shadow-2xl shadow-white/5\">\n                    <div class=\"absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700\"></div>\n                    <div class=\"relative h-full bg-[#050505] rounded-[15px] p-8 flex flex-col gap-4 z-10\">\n                        <div class=\"w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2\">\n                            <iconify-icon icon=\"solar:scanner-linear\" width=\"20\"></iconify-icon>\n                        </div>\n                        <h3 class=\"mask-container text-xl font-light tracking-tight text-white\">\n                            <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">Homomorphic</span></span>\n                            <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">Encryption</span></span>\n                        </h3>\n                        <p class=\"text-sm text-neutral-400 font-extralight leading-relaxed\">Cryptographic isolation guaranteeing absolute data privacy during active model inference across edge nodes.</p>\n                    </div>\n                </div>\n\n                <!-- Feature Card 2 -->\n                <div class=\"group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 overflow-hidden shadow-2xl shadow-white/5\">\n                    <div class=\"absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700\"></div>\n                    <div class=\"relative h-full bg-[#050505] rounded-[15px] p-8 flex flex-col gap-4 z-10\">\n                        <div class=\"w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2\">\n                            <iconify-icon icon=\"solar:cpu-bolt-linear\" width=\"20\"></iconify-icon>\n                        </div>\n                        <h3 class=\"mask-container text-xl font-light tracking-tight text-white\">\n                            <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">Serverless</span></span>\n                            <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">GPUs</span></span>\n                        </h3>\n                        <p class=\"text-sm text-neutral-400 font-extralight leading-relaxed\">On-demand distributed compute layers. Elastic scaling powered by decentralized tensor processing units.</p>\n                    </div>\n                </div>\n\n                <!-- Feature Card 3 -->\n                <div class=\"group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 overflow-hidden shadow-2xl shadow-white/5\">\n                    <div class=\"absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700\"></div>\n                    <div class=\"relative h-full bg-[#050505] rounded-[15px] p-8 flex flex-col gap-4 z-10\">\n                        <div class=\"w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2\">\n                            <iconify-icon icon=\"solar:server-square-linear\" width=\"20\"></iconify-icon>\n                        </div>\n                        <h3 class=\"mask-container text-xl font-light tracking-tight text-white\">\n                            <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">Global</span></span>\n                            <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">State</span></span>\n                            <span class=\"overflow-hidden inline-block align-bottom pb-1\"><span class=\"mask-word inline-block opacity-0 translate-y-[120%]\">Sync</span></span>\n                        </h3>\n                        <p class=\"text-sm text-neutral-400 font-extralight leading-relaxed\">Distributed vector database integration. Access and mutate embedding states with sub-millisecond precision.</p>\n                    </div>\n                </div>\n\n            </div>\n        </section>\n\n    </main>\n\n    <!-- Interactions & WebGL Implementation -->\n    <script>\n        // Native Reveal Animations Trigger\n        setTimeout(() => {\n            document.querySelectorAll('.reveal').forEach(el => {\n                el.classList.remove('opacity-0', 'translate-y-4');\n            });\n        }, 100);\n\n        // GSAP Masked Reveal Implementation\n        gsap.registerPlugin(ScrollTrigger);\n        document.querySelectorAll('.mask-container').forEach(container => {\n            const words = container.querySelectorAll('.mask-word');\n            gsap.to(words, {\n                scrollTrigger: {\n                    trigger: container,\n                    start: \"top 95%\",\n                },\n                y: \"0%\",\n                opacity: 1,\n                duration: 1.1,\n                stagger: 0.05,\n                ease: \"power4.out\",\n                delay: 0.1\n            });\n        });\n\n        // WebGL Topography\n        const canvas = document.getElementById('topo-canvas');\n        const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false });\n\n        if (gl) {\n            const vsSource = `\n                attribute vec2 a_position;\n                void main() { gl_Position = vec4(a_position, 0.0, 1.0); }\n            `;\n\n            const fsSource = `\n                precision highp float;\n                uniform vec2 u_resolution;\n                uniform float u_time;\n                uniform float u_dpr;\n\n                vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }\n                float snoise(vec2 v){\n                    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);\n                    vec2 i  = floor(v + dot(v, C.yy) );\n                    vec2 x0 = v -   i + dot(i, C.xx);\n                    vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n                    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;\n                    i = mod(i, 289.0);\n                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));\n                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n                    m = m*m; m = m*m;\n                    vec3 x = 2.0 * fract(p * C.www) - 1.0;\n                    vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);\n                    vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n                    vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n                    return 130.0 * dot(m, g);\n                }\n\n                void main() {\n                    vec2 st = gl_FragCoord.xy / u_resolution.xy;\n                    st.x *= u_resolution.x / u_resolution.y;\n\n                    // 1px physical grid rendering\n                    float gridSize = 48.0 * u_dpr;\n                    vec2 gridSt = gl_FragCoord.xy / gridSize;\n                    vec2 gridFract = fract(gridSt);\n                    float lineThickness = 1.0 / gridSize;\n                    float gridLines = step(1.0 - lineThickness, gridFract.x) + step(1.0 - lineThickness, gridFract.y);\n                    gridLines = clamp(gridLines, 0.0, 1.0) * 0.12; \n\n                    // Ultra-thin Topographic Lines\n                    float noiseScale = 1.4;\n                    vec2 noisePos = st * noiseScale + vec2(u_time * 0.015, u_time * 0.025);\n                    float n = snoise(noisePos) * 0.5 + 0.5;\n                    float numBands = 10.0;\n                    float bandVal = n * numBands;\n                    float triangleWave = abs(fract(bandVal) - 0.5) * 2.0; \n                    \n                    // Thinner smoothstep constraint for fine industrial aesthetic\n                    float topoLines = smoothstep(0.02, 0.00, triangleWave) * 0.45;\n\n                    vec3 color = vec3(0.0);\n                    color += vec3(1.0) * gridLines;\n                    color += vec3(1.0) * topoLines;\n\n                    gl_FragColor = vec4(color, 1.0);\n                }\n            `;\n\n            function createShader(gl, type, source) {\n                const shader = gl.createShader(type);\n                gl.shaderSource(shader, source);\n                gl.compileShader(shader);\n                return shader;\n            }\n\n            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);\n            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);\n            const program = gl.createProgram();\n            gl.attachShader(program, vertexShader);\n            gl.attachShader(program, fragmentShader);\n            gl.linkProgram(program);\n            gl.useProgram(program);\n\n            const positionBuffer = gl.createBuffer();\n            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);\n\n            const positionLocation = gl.getAttribLocation(program, \"a_position\");\n            gl.enableVertexAttribArray(positionLocation);\n            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);\n\n            const resolutionLocation = gl.getUniformLocation(program, \"u_resolution\");\n            const timeLocation = gl.getUniformLocation(program, \"u_time\");\n            const dprLocation = gl.getUniformLocation(program, \"u_dpr\");\n\n            function resizeCanvas() {\n                const dpr = window.devicePixelRatio || 1;\n                canvas.width = window.innerWidth * dpr;\n                canvas.height = window.innerHeight * dpr;\n                gl.viewport(0, 0, canvas.width, canvas.height);\n                gl.uniform2f(resolutionLocation, canvas.width, canvas.height);\n                gl.uniform1f(dprLocation, dpr);\n            }\n\n            window.addEventListener('resize', resizeCanvas);\n            resizeCanvas();\n\n            let startTime = performance.now();\n            function render(time) {\n                gl.uniform1f(timeLocation, (time - startTime) * 0.001);\n                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);\n                requestAnimationFrame(render);\n            }\n            requestAnimationFrame(render);\n        }\n    <\/script>\n</body>\n</html>", E = v(), de = /* @__PURE__ */ c(u(), 1), fe = {
	mode: "dark",
	speed: 1,
	size: 1,
	gap: 2,
	length: 1,
	density: 1,
	strokeWidth: 1,
	opacity: 1,
	hue: 0,
	saturation: 1,
	brightness: 1
}, D = "#eef1f6";
function O(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function k(e, t, n = 1) {
	return Math.max(n, Math.round(e * t));
}
function A(e) {
	return e === "cylinders" || e === "sphere" ? e : "cube";
}
function pe(e, t = 3) {
	let n = Number(e).toFixed(t);
	return n.includes(".") ? n : `${n}.0`;
}
function me(e, t = "dark") {
	return e == null ? t : e === "light" || e === 1 || e === "1" ? "light" : "dark";
}
function he() {
	if (typeof document > "u" || typeof window > "u") return "dark";
	let e = document.documentElement, t = e.dataset.scheme ?? e.dataset.theme;
	return t === "light" || t === "dark" ? t : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ge(e) {
	let [t, n] = (0, de.useState)(he);
	return (0, de.useEffect)(() => {
		if (!e || typeof document > "u" || typeof window > "u") return;
		let t = document.documentElement, r = window.matchMedia("(prefers-color-scheme: dark)"), i = () => n(he()), a = new MutationObserver(i);
		return a.observe(t, {
			attributes: !0,
			attributeFilter: ["data-scheme", "data-theme"]
		}), r.addEventListener("change", i), i(), () => {
			a.disconnect(), r.removeEventListener("change", i);
		};
	}, [e]), t;
}
function _e(e, t) {
	return typeof e == "function" ? e(t) : e;
}
var ve = "\n[data-threeui-role=\"ui\"].flex-grow {\n  flex: none !important;\n  width: min(calc(100% - 32px), var(--threeui-target-width, 360px)) !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: calc(100% - 32px) !important;\n  aspect-ratio: 1 / 1 !important;\n  margin: 0 !important;\n  overflow: hidden !important;\n}\n[data-threeui-role=\"ui\"] > canvas {\n  position: absolute !important;\n  inset: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n}\n";
function ye(e, { mode: t }) {
	let n = e.replaceAll("time += 0.015;", "time += 0.015 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);");
	return t === "light" && (n = n.replaceAll("ctx.fillStyle = '#020804';", `ctx.fillStyle = '${D}';`).replaceAll("rgba(52,211,153,", "rgba(4,120,87,")), n;
}
var j = {
	constellationField: {
		title: "Constellation Field",
		source: y,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#070914",
		targets: [{
			selector: "#constellationCanvas",
			role: "background"
		}],
		patch(e, { size: t, length: n, density: r, strokeWidth: i, mode: a }) {
			let o = e.replace("const LINK = 160;", `const LINK = ${Math.round(160 * n)};`).replace("const MAX_NODES = window.innerWidth < 768 ? 40 : 85;", `const MAX_NODES = window.innerWidth < 768 ? ${k(40, r, 8)} : ${k(85, r, 12)};`).replace("radius: Math.random() * 2.4 + 1.8", `radius: (Math.random() * 2.4 + 1.8) * ${t}`).replace("ctx.lineWidth = 1;", `ctx.lineWidth = ${Number(Math.max(.25, i).toFixed(2))};`).replace("node.x += node.vx;", "node.x += node.vx * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("node.y += node.vy;", "node.y += node.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);");
			return a === "light" && (o = o.replace("ctx.strokeStyle = '#E6C879';", "ctx.strokeStyle = '#8B6914';").replace("ctx.fillStyle = '#E6C879';", "ctx.fillStyle = '#8B6914';")), o;
		}
	},
	particleDrift: {
		title: "Particle Drift",
		source: b,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#030509",
		targets: [{
			selector: "#particle-canvas",
			role: "background"
		}],
		patch(e, { size: t, length: n, density: r, mode: i }) {
			let a = Math.round(120 * n), o = i === "light" ? .22 : .15, s = e.replace("Array.from({ length: 90 })", `Array.from({ length: ${k(90, r, 12)} })`).replace("Array.from({ length: 25 })", `Array.from({ length: ${k(25, r, 4)} })`).replace("length: Math.random() * 100 + 50,", `length: (Math.random() * 100 + 50) * ${n},`).replace("n.y += n.vy; // Slow drift", "n.y += n.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1); // Slow drift").replace("b.y -= b.speed;", "b.y -= b.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("if(d < 120) {", `if(d < ${a}) {`).replace("0.15 * (1 - d/120)", `${o} * (1 - d/${a})`).replace("ctx.lineWidth = 1.5;", `ctx.lineWidth = ${Number((1.5 * t).toFixed(2))};`);
			return i === "light" && (s = s.replaceAll("rgba(96, 165, 250,", "rgba(37, 99, 235,").replaceAll("rgba(156, 163, 175,", "rgba(36, 48, 68,").replace("ctx.fillStyle = dist < 180 ? '#60A5FA' : 'rgba(36, 48, 68, 0.4)';", "ctx.fillStyle = dist < 180 ? '#2563EB' : 'rgba(36, 48, 68, 0.55)';")), s;
		}
	},
	particleNetwork: {
		title: "Particle Network",
		source: x,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#05070d",
		targets: [{
			selector: "#particle-canvas",
			role: "background"
		}],
		patch(e, { size: t, length: n, density: r, mode: i }) {
			let a = e.replace("const particleCount = 200;", `const particleCount = ${k(200, r, 40)};`).replace("this.length = Math.random() * 2 + 0.5;", `this.length = (Math.random() * 2 + 0.5) * ${n};`).replace("this.z -= this.speed;", "this.z -= this.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("const fov = 300;", `const fov = ${Math.round(300 / Math.max(.4, t))};`);
			return i === "light" && (a = a.replace("ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';", "ctx.fillStyle = 'rgba(238, 241, 246, 0.55)';").replace("const hue = Math.random() > 0.5 ? '200, 220, 255' : '106, 157, 237';", "const hue = Math.random() > 0.5 ? '36, 48, 68' : '37, 99, 235';")), a;
		}
	},
	fluxVortex: {
		title: "Flux Vortex",
		source: ee,
		background: "#050505",
		targets: [{
			selector: "#webgl-canvas",
			role: "background"
		}],
		patch(e, { size: t, density: n }) {
			return e.replace("const vortexCount = 9500;", `const vortexCount = ${k(9500, n, 1200)};`).replace("const particlesCount = 300;", `const particlesCount = ${k(300, n, 40)};`).replace("size: 0.006, // Smaller dots requested", `size: ${Number((.006 * t).toFixed(4))}, // Smaller dots requested`).replace("size: 0.008,", `size: ${Number((.008 * t).toFixed(4))},`);
		}
	},
	portalField: {
		title: "Portal Field",
		source: S,
		background: "#05060a",
		targets: [{
			selector: "#webgl-container",
			role: "background"
		}],
		patch(e, { size: t, length: n }) {
			return e.replace("float d1 = sdArc(st, center, 0.6, 0.02, 0.15);", `float d1 = sdArc(st, center, ${pe(.6 * n, 3)}, ${pe(.02 * t, 4)}, 0.15);`).replace("float d2 = sdArc(st, center, 0.65, 0.06, 0.2);", `float d2 = sdArc(st, center, ${pe(.65 * n, 3)}, ${pe(.06 * t, 4)}, 0.2);`);
		}
	},
	flowField: {
		title: "Flow Field",
		source: C,
		background: "#0a0a0a",
		targets: [{
			selector: "#canvas",
			role: "background"
		}],
		patch(e, { size: t, length: n, density: r }) {
			return e.replace(/<script defer src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^>]*><\/script>/, "").replace("const PARTICLE_COUNT = 2500;", `const PARTICLE_COUNT = ${k(2500, r, 300)};`).replace("let NOISE_SCALE = 0.0025;", `let NOISE_SCALE = ${Number((.0025 / n).toFixed(6))};`).replace("time += 0.0008;", "time += 0.0008 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||0);").replace("let vx = Math.cos(angle) * p.speed * SPEED;", "let vx = Math.cos(angle) * p.speed * SPEED * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||0);").replace("let vy = Math.sin(angle) * p.speed * SPEED;", "let vy = Math.sin(angle) * p.speed * SPEED * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||0);").replace("ctx.lineWidth = p.size;", `ctx.lineWidth = p.size * ${Number(t.toFixed(3))};`);
		}
	},
	amberHalftone: {
		title: "Amber Halftone",
		source: te,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#0A0A0A",
		targets: [{
			selector: "#webgl-halftone",
			role: "background"
		}],
		patch(e, { size: t, length: n, density: r, mode: i }) {
			let a = Number((.085 / Math.max(.25, r)).toFixed(4)), o = Math.max(12, Math.ceil(2.8 / a)), s = Number((9 * t).toFixed(2)), c = Number((6 * n).toFixed(2)), l = e.replace("const gridSize = 20;", `const gridSize = ${o};`).replace("positions.push(x * 0.15, y * 0.15, 0);", `positions.push(x * ${a}, y * ${a}, 0);`).replace("float animatedScale = scale * (sin(dist * 6.0 - time * 2.5) * 0.5 + 0.5);", `float animatedScale = scale * (sin(dist * ${pe(c, 2)} - time * 2.5) * 0.5 + 0.5);`).replace("gl_PointSize = animatedScale * 5.0;", `gl_PointSize = animatedScale * ${pe(s, 2)};`).replace("material.uniforms.time.value = clock.getElapsedTime();", "material.uniforms.time.value = clock.getElapsedTime() * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);");
			return i === "light" && (l = l.replace("renderer.setClearColor(0x0A0A0A, 1);", "renderer.setClearColor(0xeef1f6, 1);").replace("color1: { value: new THREE.Color(0xFBBF24) },", "color1: { value: new THREE.Color(0xB45309) },").replace("color2: { value: new THREE.Color(0xFFFFFF) }", "color2: { value: new THREE.Color(0x1a1f2a) }")), l;
		}
	},
	diagnosticsLayers: {
		title: "Layered Planes",
		source: ne,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#020804",
		targets: [{
			selector: "#main-container article:nth-of-type(1) .flex-grow",
			role: "ui",
			width: "360px"
		}],
		focusCss: ve,
		patch: ye
	},
	diagnosticsNodes: {
		title: "Node Cubes",
		source: ne,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#020804",
		targets: [{
			selector: "#main-container article:nth-of-type(2) .flex-grow",
			role: "ui",
			width: "360px"
		}],
		focusCss: ve,
		patch: ye
	},
	diagnosticsFlow: {
		title: "Flowing Mesh",
		source: ne,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#020804",
		targets: [{
			selector: "#main-container article:nth-of-type(3) .flex-grow",
			role: "ui",
			width: "360px"
		}],
		focusCss: ve,
		patch: ye
	},
	signalParticles: {
		title: "Signal Particles",
		source: re,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#0a0a0a",
		targets: [{
			selector: "#particle-canvas",
			role: "background"
		}],
		patch(e, { size: t, length: n, mode: r }) {
			let i = e.replace("const spacing = 16;", `const spacing = ${Math.max(6, Math.round(16 / Math.max(.35, n)))};`).replace("const dotRadius = 1.5;", `const dotRadius = ${Number((1.5 * t).toFixed(2))};`).replace("time += 0.02;", "time += 0.02 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);");
			return r === "light" && (i = i.replace("ctx.fillStyle = '#3b82f6'; // Blue highlight", "ctx.fillStyle = '#1d4ed8'; // Blue highlight").replace("ctx.fillStyle = '#8b5cf6'; // Purple highlight", "ctx.fillStyle = '#5b21b6'; // Purple highlight").replace("ctx.fillStyle = `rgba(148, 163, 184, ${alpha})`;", "ctx.fillStyle = `rgba(36, 48, 68, ${alpha})`;")), i;
		}
	},
	skeuomorphicToggle: {
		title: "Skeuomorphic Toggle",
		source: w,
		supportsMode: !0,
		defaultMode: "auto",
		background: (e) => e === "light" ? "#f8fafc" : "#0b1220",
		targets: [{
			selector: "#skeuomorphic-toggle",
			role: "ui",
			width: "192px"
		}],
		focusCss: "\n#skeuomorphic-toggle {\n  width: 12rem !important;\n  height: 4rem !important;\n  margin: auto !important;\n  overflow: visible !important;\n  max-height: none !important;\n}\n",
		patch(e, { mode: t }) {
			return t === "dark" ? e.replace("var ON_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px), linear-gradient(180deg, #dbeafe 0%, #93c5fd 100%)';", "var ON_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.035) 2px, rgba(255,255,255,0.035) 4px), linear-gradient(180deg, #1e3a8a 0%, #172554 100%)';").replace("var OFF_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px), linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)';", "var OFF_BG = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 4px), linear-gradient(180deg, #1e293b 0%, #0f172a 100%)';").replace("var ON_SHADOW = 'inset 0 4px 8px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(255,255,255,0.7), 0 0 0 6px rgba(239, 246, 255, 0.8), 0 0 25px 5px rgba(96, 165, 250, 0.4)';", "var ON_SHADOW = 'inset 0 5px 10px rgba(0,0,0,0.52), inset 0 -2px 4px rgba(147,197,253,0.24), 0 0 0 6px rgba(15,23,42,0.96), 0 0 26px 5px rgba(59,130,246,0.42)';").replace("var OFF_SHADOW = 'inset 0 4px 8px rgba(0,0,0,0.12), inset 0 -2px 4px rgba(255,255,255,0.55), 0 0 0 6px rgba(241, 245, 249, 0.9), 0 0 18px 2px rgba(148, 163, 184, 0.25)';", "var OFF_SHADOW = 'inset 0 5px 10px rgba(0,0,0,0.56), inset 0 -2px 4px rgba(148,163,184,0.12), 0 0 0 6px rgba(15,23,42,0.96), 0 0 18px 2px rgba(30,64,175,0.2)';").replace("var ON_BORDER = '#60a5fa';", "var ON_BORDER = '#3b82f6';").replace("var OFF_BORDER = '#94a3b8';", "var OFF_BORDER = '#334155';").replace("background: linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%);", "background: linear-gradient(180deg, #e2e8f0 0%, #94a3b8 100%);").replace("border: 1px solid #e0edfa;", "border: 1px solid #64748b;") : e;
		}
	},
	matrixField: {
		title: "Matrix Field",
		source: ie,
		background: "#000000",
		targets: [{
			selector: "#glcanvas",
			role: "background"
		}],
		patch(e, { size: t, length: n }) {
			return e.replace("float intensity = 0.006;", `float intensity = ${pe(.006 * t * n, 5)};`);
		}
	},
	gatewayFlow: {
		title: "Gateway Flow",
		source: ae,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#000000",
		targets: [{
			selector: "#flow-canvas",
			role: "background"
		}],
		patch(e, { size: t, density: n, mode: r }) {
			let i = e.replace("const numPaths = 80;", `const numPaths = ${k(80, n, 12)};`).replace("p.t += p.speed;", "p.t += p.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("ctx.lineWidth = 1.2;", `ctx.lineWidth = ${Number((1.2 * t).toFixed(2))};`);
			return r === "light" && (i = i.replace("ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';", "ctx.strokeStyle = 'rgba(26, 31, 42, 0.4)';").replace("ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;", "ctx.fillStyle = `rgba(26, 31, 42, 0.75)`;")), i;
		}
	},
	connectivityGraph: {
		title: "Connectivity Graph",
		source: oe,
		supportsMode: !0,
		defaultMode: "light",
		background: (e) => e === "light" ? "#c4d9ef" : "#0a1220",
		targets: [{
			selector: "#networkCanvas",
			role: "background"
		}],
		patch(e, { size: t, length: n, density: r, mode: i }) {
			let a = e.replace("const particleCount = window.innerWidth < 768 ? 150 : 400;", `const particleCount = window.innerWidth < 768 ? ${k(150, r, 30)} : ${k(400, r, 60)};`).replace("this.maxLength = 20 + Math.random() * 180;", `this.maxLength = (20 + Math.random() * 180) * ${n};`).replace("this.distance += this.speed;", "this.distance += this.speed * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("ctx.lineWidth = 0.5 + (distRatio * 2);", `ctx.lineWidth = (0.5 + (distRatio * 2)) * ${t};`);
			return i === "dark" && (a = a.replace("const lightness = 15 + (distRatio * 35);", "const lightness = 58 + (distRatio * 28);").replace("const tailColor = `hsla(${hue}, 90%, ${Math.max(5, lightness - 15)}%, ${this.alpha * 0.05})`;", "const tailColor = `hsla(${hue}, 90%, ${Math.max(40, lightness - 15)}%, ${this.alpha * 0.08})`;")), a;
		}
	},
	interfaceLines: {
		title: "Interface Lines",
		source: se,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#050505",
		targets: [{
			selector: "#bg-canvas",
			role: "background"
		}],
		patch(e, { size: t, length: n, density: r, mode: i }) {
			let a = Math.round(120 * n), o = e.replace("const numParticles = window.innerWidth < 640 ? 30 : 70;", `const numParticles = window.innerWidth < 640 ? ${k(30, r, 8)} : ${k(70, r, 12)};`).replace("p.x += p.vx;", "p.x += p.vx * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("p.y += p.vy;", "p.y += p.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("if (dist < 120)", `if (dist < ${a})`).replace("ctx.lineWidth = 1;", `ctx.lineWidth = ${Number((1 * t).toFixed(2))};`);
			return o = i === "light" ? o.replace("ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 + (1 - dist / 120) * 0.42})`;", `ctx.strokeStyle = \`rgba(26, 31, 42, \${0.28 + (1 - dist / ${a}) * 0.42})\`;`).replace("ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';", "ctx.fillStyle = 'rgba(26, 31, 42, 0.85)';") : o.replace("ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 + (1 - dist / 120) * 0.42})`;", `ctx.strokeStyle = \`rgba(255, 255, 255, \${0.28 + (1 - dist / ${a}) * 0.42})\`;`), o;
		}
	},
	wireframeForms: {
		title: "Wireframe Forms",
		source: ce,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#050505",
		targets: [{
			selector: "main",
			role: "ui",
			width: "1040px"
		}],
		focusCss: "\nmain {\n  display: flex !important;\n  flex-direction: row !important;\n  flex-wrap: wrap !important;\n  align-items: center !important;\n  justify-content: center !important;\n  gap: clamp(1rem, 3vw, 2.5rem) !important;\n  height: auto !important;\n  min-height: 0 !important;\n  padding: 1.5rem !important;\n  background: transparent !important;\n  border: 0 !important;\n  box-shadow: none !important;\n  grid-template-columns: none !important;\n}\nmain > .absolute { display: none !important; }\nmain > .group {\n  height: auto !important;\n  min-height: 0 !important;\n  padding: 0 !important;\n  overflow: visible !important;\n  background: transparent !important;\n  flex: 0 0 auto !important;\n  width: min(72vw, 480px) !important;\n}\nmain > .group:not([data-wireframe-selected]) { display: none !important; }\nmain > .group > :not([data-wireframe-visual]) { display: none !important; }\nmain > .group > [data-wireframe-visual] {\n  padding: 0 !important;\n  flex-grow: 0 !important;\n  width: 100% !important;\n  aspect-ratio: 1 !important;\n}\nmain > .group > [data-wireframe-visual] > :not(canvas) { display: none !important; }\n#canvas1, #canvas2, #canvas3 {\n  width: 100% !important;\n  max-width: none !important;\n  height: 100% !important;\n  opacity: 1 !important;\n  mix-blend-mode: normal !important;\n}\n",
		patch(e, { variant: t, size: n, length: r, mode: i }) {
			let a = A(t), o = {
				cube: "<!-- Section 01: Hypercube -->",
				cylinders: "<!-- Section 02: Logic Cylinders -->",
				sphere: "<!-- Section 03: Esoteric Sphere -->"
			}[a], s = e.replace(`${o}
        <div class="group`, `${o}
        <div data-wireframe-selected="${a}" class="group`).replace("this.angleY += 0.005;", "this.angleY += 0.005 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("this.angleX += 0.002;", "this.angleX += 0.002 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("const s = 80;", `const s = ${Math.round(80 * r)};`).replace("const r = 70;", `const r = ${Math.round(70 * r)};`).replace("const s = 50; ", `const s = ${Math.round(50 * r)}; `).replace("this.ctx.lineWidth = 0.8;", `this.ctx.lineWidth = ${Number((.8 * n).toFixed(2))};`);
			return i === "light" && (s = s.replace("this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;", "this.ctx.strokeStyle = `rgba(26, 31, 42, ${alpha * 0.45})`;").replace("this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;", "this.ctx.fillStyle = `rgba(26, 31, 42, ${alpha})`;")), s;
		}
	},
	defenseLines: {
		title: "Defense Lines",
		source: le,
		supportsMode: !0,
		background: (e) => e === "light" ? "#f4ecec" : "#120303",
		targets: [{
			selector: "#bg-canvas",
			role: "background"
		}],
		patch(e, { size: t, length: n, density: r, mode: i }) {
			let a = e.replace("const particleCount = window.innerWidth < 768 ? 40 : 100;", `const particleCount = window.innerWidth < 768 ? ${k(40, r, 8)} : ${k(100, r, 16)};`).replace("baseLength: Math.random() * 80 + 20,", `baseLength: (Math.random() * 80 + 20) * ${n},`).replace("p.y -= p.speedY * 1.5 * (1 + centerProximity * 0.5);", "p.y -= p.speedY * 1.5 * (1 + centerProximity * 0.5) * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);").replace("ctx.lineWidth = 0.5;", `ctx.lineWidth = ${Number((.5 * t).toFixed(2))};`);
			return i === "light" && (a = a.replaceAll("rgba(220, 38, 38, 0)", "rgba(153, 27, 27, 0)").replace("grad.addColorStop(0.5, `rgba(255, ${38 + brightness}, ${38 + brightness}, ${currentOpacity})`);", "grad.addColorStop(0.5, `rgba(185, ${20 + brightness * 0.55}, ${20 + brightness * 0.55}, ${currentOpacity})`);")), a;
		}
	},
	overrideGrid: {
		title: "Override Grid",
		source: ue,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#050505",
		targets: [{
			selector: "#grid-canvas",
			role: "background"
		}],
		patch(e, { size: t, gap: n, mode: r }) {
			let i = Math.max(8, Math.round(t)), a = Math.max(0, Math.round(n)), o = e.replace("const blockSize = 48;", `const blockSize = ${i};`).replace("const blockGap = 2;", `const blockGap = ${a};`).replace("time += 0.04;", "time += 0.04 * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);");
			return r === "light" && (o = o.replace("ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;", "ctx.fillStyle = `rgba(194, 65, 12, ${alpha * 1.35})`;")), o;
		}
	},
	topoField: {
		title: "Topo Field",
		source: T,
		supportsMode: !0,
		background: (e) => e === "light" ? D : "#000000",
		targets: [{
			selector: "#topo-canvas",
			role: "background"
		}],
		patch(e, { length: t, density: n, mode: r }) {
			let i = e.replace("float noiseScale = 1.4;", `float noiseScale = ${pe(1.4 * t, 3)};`).replace("float numBands = 10.0;", `float numBands = ${pe(10 * n, 2)};`);
			return r === "light" && (i = i.replace("gridLines = clamp(gridLines, 0.0, 1.0) * 0.12;", "gridLines = clamp(gridLines, 0.0, 1.0) * 0.55;").replace("float topoLines = smoothstep(0.02, 0.00, triangleWave) * 0.45;", "float topoLines = smoothstep(0.03, 0.00, triangleWave) * 0.95;").replace("vec3 color = vec3(0.0);\n                    color += vec3(1.0) * gridLines;\n                    color += vec3(1.0) * topoLines;", "vec3 paper = vec3(0.933, 0.945, 0.965);\n                    vec3 ink = vec3(0.12, 0.14, 0.18);\n                    float lines = clamp(gridLines + topoLines, 0.0, 1.0);\n                    vec3 color = mix(paper, ink, lines);")), i;
		}
	}
};
function be(e, t) {
	let n = t.mode, r = _e(e.background, n), i = JSON.stringify(e.targets).replace(/</g, "\\u003c"), a = JSON.stringify({
		mode: n,
		speed: t.speed,
		size: t.size,
		gap: t.gap,
		length: t.length,
		density: t.density,
		strokeWidth: t.strokeWidth,
		opacity: t.opacity
	}).replace(/</g, "\\u003c"), o = e.patch ? e.patch(e.source, {
		variant: t.variant,
		size: t.size,
		gap: t.gap,
		length: t.length,
		density: t.density,
		strokeWidth: t.strokeWidth,
		mode: n
	}) : e.source, s = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${r} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
${e.focusCss ?? ""}
</style>`, c = `<script data-threeui-controls>
(function () {
  var controls = ${a};
  window.__SF_CONTROLS = controls;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  var raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (callback) {
    return raf(function () {
      callback(performance.now());
    });
  };
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    var size = controls.size == null ? 1 : controls.size;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
      if (element.getAttribute('data-threeui-role') === 'ui') {
        element.style.transform = 'scale(' + size + ')';
        element.style.transformOrigin = 'center center';
      }
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
<\/script>`, l = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${i};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
<\/script>`;
	return o.replace(/<head([^>]*)>/i, `<head$1>${c}${s}`).replace(/<\/body>/i, `${l}</body>`);
}
function xe({ definition: e, variant: t = "cube", mode: n, speed: r = fe.speed, size: i = fe.size, gap: a = fe.gap, length: o = fe.length, density: s = fe.density, strokeWidth: c = fe.strokeWidth, opacity: l = fe.opacity, hue: u = fe.hue, saturation: d = fe.saturation, brightness: f = fe.brightness, className: p, style: m }) {
	let h = (0, de.useRef)(null), g = n ?? e.defaultMode ?? fe.mode, _ = ge(g === "auto"), v = g === "auto" ? _ : me(g, fe.mode), y = _e(e.background, v), b = O(r, 0, 3), x = O(i, .05, 200), ee = O(a, 0, 64), S = O(o, .35, 2.5), C = O(s, .25, 2.5), te = O(c, .25, 8), ne = O(l, .05, 1), re = O(u, -180, 180), w = O(d, 0, 2), ie = O(f, .35, 1.65), ae = (0, de.useMemo)(() => be(e, {
		variant: t,
		mode: v,
		speed: fe.speed,
		size: x,
		gap: ee,
		length: S,
		density: C,
		strokeWidth: te,
		opacity: fe.opacity
	}), [
		e,
		v,
		C,
		ee,
		S,
		x,
		te,
		t
	]);
	(0, de.useEffect)(() => {
		let e = h.current?.contentWindow;
		e && e.postMessage({
			type: "threeui-controls",
			controls: {
				mode: v,
				speed: b,
				size: x,
				gap: ee,
				length: S,
				density: C,
				strokeWidth: te,
				opacity: ne
			}
		}, "*");
	}, [
		v,
		C,
		ee,
		S,
		ne,
		x,
		b,
		te,
		ae
	]);
	let oe = re === 0 && w === 1 && ie === 1 ? void 0 : `hue-rotate(${re}deg) saturate(${w}) brightness(${ie})`;
	return /* @__PURE__ */ (0, E.jsx)("iframe", {
		ref: h,
		className: p,
		title: e.title,
		srcDoc: ae,
		sandbox: "allow-scripts",
		loading: "eager",
		style: {
			display: "block",
			width: "100%",
			height: "100%",
			border: 0,
			background: y,
			filter: oe,
			...m
		}
	});
}
function Se(e) {
	return function(t) {
		return /* @__PURE__ */ (0, E.jsx)(xe, {
			...t,
			definition: e
		});
	};
}
j.constellationField, j.particleDrift, j.particleNetwork, j.fluxVortex, j.portalField, j.flowField, j.amberHalftone, j.diagnosticsLayers, j.diagnosticsNodes, j.diagnosticsFlow, j.signalParticles, j.skeuomorphicToggle, j.matrixField, j.gatewayFlow;
var Ce = Se(j.connectivityGraph);
j.interfaceLines, j.wireframeForms, j.defenseLines, j.overrideGrid, j.topoField;
//#endregion
//#region node_modules/@designcodeio/threeui/lib-dist/style.css
var we = g(), Te = () => typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
function Ee() {
	let [e, t] = de.useState(Te);
	return de.useEffect(() => {
		if (typeof matchMedia != "function") return;
		let e = matchMedia("(prefers-reduced-motion: reduce)"), n = (e) => t(e.matches);
		return e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, []), /* @__PURE__ */ (0, E.jsx)(Ce, {
		mode: "light",
		speed: e ? .1 : .62,
		density: 1.15,
		gap: 2.2,
		strokeWidth: .9,
		opacity: .92,
		saturation: 0,
		brightness: 1.16
	});
}
var De = document.getElementById("hero-3d");
De && (0, we.createRoot)(De).render(/* @__PURE__ */ (0, E.jsx)(Ee, {}));
//#endregion

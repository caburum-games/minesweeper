function Minesweeper(A, Q, s) {
	var E = this;
	var i;
	var B;
	var a;
	var m;
	var N;
	var o;
	var p;
	var K;
	var G;
	var I;
	var c;
	var U = new F;
	var L;
	var g;
	var M;
	var r;
	var k;
	var D;
	var e;
	var v;
	var d;
	var C;
	var y;
	P();
	this.newGame = function (ae, Y) {
		var af, ab;
		var ad;
		var aa, ac;
		var Z;
		aa = B + "_" + a + "_" + m;
		Z = Q();
		i = Z.gameTypeId;
		B = Z.numRows;
		a = Z.numCols;
		m = Z.numMines;
		N = Z.zoom;
		if (Y) {
			if (typeof Y.gameTypeId !== "undefined") {
				i = Y.gameTypeId;
			}
			if (typeof Y.numRows !== "undefined") {
				B = Y.numRows;
			}
			if (typeof Y.numCols !== "undefined") {
				a = Y.numCols;
			}
			if (typeof Y.numMines !== "undefined") {
				m = Y.numMines;
			}
		}
		ac = B + "_" + a + "_" + m != aa;
		w(N);
		if (ac) {
			V();
		}
		l(ae);
		q();
		p = !!ae;
		K = m;
		G = B * a - m;
		for (af = 1; af <= B; af++) {
			for (ab = 1; ab <= a; ab++) {
				ad = I[af][ab];
				if (ad.isFlagged()) {
					ad.setClass("square bombflagged");
					K--;
				} else {
					if (ad.isMarked()) {
						ad.setClass("square question");
					} else {
						if (ad.isRevealed()) {
							ad.setClass("square open" + ad.getValue());
							if (!ad.isHidden()) {
								G--;
							}
						} else {
							ad.setClass("square blank");
						}
					}
				}
			}
		}
		U.stop();
		if (!p) {
			U.setTime(0);
		} else {
			if (Y && typeof Y.time !== "undefined") {
				U.setTime(Y.time);
			} else {}
		}
		W();
		L = false;
		g = false;
		D = false;
		e = false;
		v = false;
		isMouseDownForCtrlClick = false;
		d = null;
		C = false;
		y = false;
		$("#face")[0].className = "facesmile";
		hoveredSquareId = "";
	};
	this.resize = function (Y) {
		var Z = (Y * a * 16 - 6 * Math.ceil(Y * 13) - Y * 2 * 6 - Y * 26) / 2;
		w(Y);
		$("#game-container").removeClass("z" + N * 100).addClass("z" + Y * 100);
		$("#face").css({"margin-left": Math.floor(Z) + "px", "margin-right": Math.ceil(Z) + "px"});
		N = Y;
	};
	this.hasStartedPlaying = function () {
		return g;
	};
	this.export_ = function () {
		var aa = z(true);
		var Z = U.getTime();
		var Y = {version: 1, gameTypeId: i, numRows: B, numCols: a, numMines: m, gridObj: aa, time: Z};
		y = true;
		return btoa(JSON.stringify(Y));
	};
	this.isImportable = function (aa) {
		try {
			var Y = JSON.parse(atob(aa));
			return Y.version === 1;
		} catch (Z) {
			return false;
		}
	};
	this.import_ = function (ae) {
		var aa = JSON.parse(atob(ae));
		var ag, Z;
		var af, ad;
		var ac = [];
		for (ag = 0; ag <= aa.numRows + 1; ag++) {
			ac[ag] = [];
			for (Z = 0; Z <= aa.numCols + 1; Z++) {
				af = aa.gridObj[ag][Z];
				if (typeof af === "number") {
					ad = {value: af, isRevealed: false, isFlagged: false, isMarked: false};
				} else {
					ad = {value: af[0], isRevealed: af[1] === 1, isFlagged: af[2] === 1, isMarked: af[3] === 1};
				}
				ac[ag][Z] = ad;
			}
		}
		var Y = {gridObj: ac};
		var ab = {gameTypeId: aa.gameTypeId, numRows: aa.numRows, numCols: aa.numCols, numMines: aa.numMines, time: aa.time};
		s({gameTypeId: aa.gameTypeId, numRows: aa.numRows, numCols: aa.numCols, numMines: aa.numMines});
		E.newGame(Y, ab);
	};
	function w(Y) {
		$("#game-container, #game").width(Y * (a * 16 + 20));
		$("#game").height(Y * (B * 16 + 30 + 26 + 6));
	}
	function V() {
		var ab, Y;
		var Z = [];
		var aa = (N * a * 16 - 6 * Math.ceil(N * 13) - N * 2 * 6 - N * 26) / 2;
		Z.push('<div class="bordertl"></div>');
		for (Y = 0; Y < a; Y++) {
			Z.push('<div class="bordertb"></div>');
		}
		Z.push('<div class="bordertr"></div>');
		Z.push('<div class="borderlrlong"></div>', '<div class="time0" id="mines_hundreds"></div>', '<div class="time0" id="mines_tens"></div>', '<div class="time0" id="mines_ones"></div>', '<div class="facesmile" style="margin-left:', Math.floor(aa), "px; margin-right: ", Math.ceil(aa), 'px;" id="face"></div>', '<div class="time0" id="seconds_hundreds"></div>', '<div class="time0" id="seconds_tens"></div>', '<div class="time0" id="seconds_ones"></div>', '<div class="borderlrlong"></div>');
		Z.push('<div class="borderjointl"></div>');
		for (Y = 0; Y < a; Y++) {
			Z.push('<div class="bordertb"></div>');
		}
		Z.push('<div class="borderjointr"></div>');
		for (ab = 1; ab <= B; ab++) {
			Z.push('<div class="borderlr"></div>');
			for (Y = 1; Y <= a; Y++) {
				Z.push('<div class="square blank" id="', ab, "_", Y, '"></div>');
			}
			Z.push('<div class="borderlr"></div>');
		}
		Z.push('<div class="borderbl"></div>');
		for (Y = 0; Y < a; Y++) {
			Z.push('<div class="bordertb"></div>');
		}
		Z.push('<div class="borderbr"></div>');
		for (Y = 0; Y <= a + 1; Y++) {
			Z.push('<div class="square blank" style="display: none;" id="', 0, "_", Y, '"></div>');
		}
		for (Y = 0; Y <= a + 1; Y++) {
			Z.push('<div class="square blank" style="display: none;" id="', B + 1, "_", Y, '"></div>');
		}
		for (ab = 1; ab <= B; ab++) {
			Z.push('<div class="square blank" style="display: none;" id="', ab, "_", 0, '"></div>');
			Z.push('<div class="square blank" style="display: none;" id="', ab, "_", a + 1, '"></div>');
		}
		$("#game").html(Z.join(""));
	}
	function u(ad, Z) {
		var ab = 0;
		var aa = false;
		var Y = false;
		var ac = false;
		this.addToValue = function (ae) {
			ab += ae;
		};
		this.isMine = function () {
			return ab < 0;
		};
		this.isFlagged = function () {
			return aa;
		};
		this.isMarked = function () {
			return Y;
		};
		this.isRevealed = function () {
			return ac;
		};
		this.isHidden = function () {
			return ad < 1 || ad > B || Z < 1 || Z > a;
		};
		this.getRow = function () {
			return ad;
		};
		this.getCol = function () {
			return Z;
		};
		this.getValue = function () {
			return ab;
		};
		this.setRevealed = function (ae) {
			ac = ae;
		};
		this.plantMine = function () {
			ab -= 10;
			I[ad - 1][Z - 1].addToValue(1);
			I[ad - 1][Z].addToValue(1);
			I[ad - 1][Z + 1].addToValue(1);
			I[ad][Z - 1].addToValue(1);
			I[ad][Z + 1].addToValue(1);
			I[ad + 1][Z - 1].addToValue(1);
			I[ad + 1][Z].addToValue(1);
			I[ad + 1][Z + 1].addToValue(1);
		};
		this.unplantMine = function () {
			ab += 10;
			I[ad - 1][Z - 1].addToValue(-1);
			I[ad - 1][Z].addToValue(-1);
			I[ad - 1][Z + 1].addToValue(-1);
			I[ad][Z - 1].addToValue(-1);
			I[ad][Z + 1].addToValue(-1);
			I[ad + 1][Z - 1].addToValue(-1);
			I[ad + 1][Z].addToValue(-1);
			I[ad + 1][Z + 1].addToValue(-1);
		};
		this.setClass = function (ae) {
			document.getElementById(ad + "_" + Z).className = ae;
		};
		this.reveal1 = function () {
			var ae, af;
			var ag, ah;
			var ai = [];
			ai.push(this);
			this.pushed = true;
			while (ai.length > 0) {
				ag = ai.pop();
				if (!ag.isRevealed() && !ag.isFlagged()) {
					if (ag.isMine()) {
						return false;
					} else {
						if (!ag.isFlagged()) {
							ag.setClass("square open" + ag.getValue());
							ag.setRevealed(true);
							if (!ag.isHidden() && --G == 0) {
								J();
								return true;
							}
							if (ag.getValue() == 0 && !ag.isHidden()) {
								for (ae = -1; ae <= 1; ae++) {
									for (af = -1; af <= 1; af++) {
										ah = I[ag.getRow() + ae][ag.getCol() + af];
										if (!ah.pushed && !ah.isHidden() && !ah.isRevealed()) {
											ai.push(ah);
											ah.pushed = true;
										}
									}
								}
							}
						}
					}
				}
			}
			q();
			return true;
		};
		this.reveal9 = function () {
			if (ac) {
				var af, ag;
				var ah;
				var ai = 0;
				var ae = [];
				for (af = -1; af <= 1; af++) {
					for (ag = -1; ag <= 1; ag++) {
						ah = I[ad + af][Z + ag];
						if (ah != this && ah.isFlagged()) {
							ai++;
						}
					}
				}
				if (ai == ab) {
					for (af = -1; af <= 1; af++) {
						for (ag = -1; ag <= 1; ag++) {
							ah = I[ad + af][Z + ag];
							if (ah != this && !ah.reveal1()) {
								ae.push(ah);
							}
						}
					}
					if (ae.length > 0) {
						R(ae);
					} else {
						q();
					}
				}
			}
		};
		this.flag = function (ae) {
			if (!ac) {
				if (aa) {
					if ($("#marks").attr("checked")) {
						this.setClass("square question");
						Y = true;
					} else {
						this.setClass("square blank");
						if (ae) {
							this._showFlagAnimation(true);
						}
					}
					aa = false;
					K++;
					W();
				} else {
					if (Y) {
						this.setClass("square blank");
						Y = false;
					} else {
						this.setClass("square bombflagged");
						aa = true;
						K--;
						W();
						if (ae) {
							this._showFlagAnimation();
						}
					}
				}
				q();
			}
		};
		this._showFlagAnimation = function (af) {
			var al = $("#" + ad + "_" + Z);
			var ag = al.offset();
			var aj = ag.left + al.width() / 2;
			var ai = ag.top + al.height() / 2;
			var ao = 57 * N * 1.75;
			var ah = 79 * N * 1.75;
			var ae = {left: aj - ao / 2, top: ai - ah / 2, width: ao + "px", height: ah + "px", opacity: 0};
			var am = {left: aj, top: ai, width: 0, height: 0, opacity: 1};
			if (af) {
				var an = ae;
				ae = am;
				am = an;
			}
			var ak = $('<img src="flag.png" class="flag-animation"></div>').css(ae);
			$("body").append(ak);
			setTimeout(function () {
				ak.css(am);
			}, 0);
			setTimeout(function () {
				ak.remove();
			}, 500);
		};
		this.serializeToObj = function (ae) {
			if (ae) {
				if (!ac && !aa && !Y) {
					return ab;
				} else {
					return [ab, ac ? 1 : 0, aa ? 1 : 0, Y ? 1 : 0];
				}
			} else {
				return {value: ab, isRevealed: ac, isFlagged: aa, isMarked: Y};
			}
		};
		this.deserializeFromObj = function (ae) {
			ab = ae.value;
			aa = ae.isFlagged;
			Y = ae.isMarked;
			ac = ae.isRevealed;
		};
	}
	function l(ab) {
		var ad, Y, Z;
		var aa;
		I = [];
		c = [];
		M = [];
		Z = 0;
		for (ad = 0; ad <= B + 1; ad++) {
			I[ad] = [];
			for (Y = 0; Y <= a + 1; Y++) {
				aa = new u(ad, Y);
				I[ad][Y] = aa;
				c[ad + "_" + Y] = aa;
				if (!aa.isHidden()) {
					M[Z++] = aa;
				}
			}
		}
		if (ab) {
			var ac = ab.gridObj;
			for (ad = 0; ad <= B + 1; ad++) {
				for (Y = 0; Y <= a + 1; Y++) {
					I[ad][Y].deserializeFromObj(ac[ad][Y]);
				}
			}
			M = [];
			for (ad = 0; ad <= B + 1; ad++) {
				for (Y = 0; Y <= a + 1; Y++) {
					aa = I[ad][Y];
					if (!aa.isHidden() && !aa.isMine()) {
						M.push(aa);
					}
				}
			}
		} else {
			for (Z = 0; Z < m; Z++) {
				M.splice(Math.floor(Math.random() * M.length), 1)[0].plantMine();
			}
		}
	}
	function z(Z) {
		var aa = [];
		var ab, Y;
		for (ab = 0; ab <= B + 1; ab++) {
			aa[ab] = [];
			for (Y = 0; Y <= a + 1; Y++) {
				aa[ab][Y] = I[ab][Y].serializeToObj(Z);
			}
		}
		return aa;
	}
	function q() {
		var Y = z();
		o = {gridObj: Y};
	}
	function t(ag) {
		var Y = ag.getRow();
		var ae = ag.getCol();
		var ad, Z;
		var ac;
		var af;
		var aa;
		if (!p && !y) {
			if (ag.isMine()) {
				M.splice(Math.floor(Math.random() * M.length), 1)[0].plantMine();
				ag.unplantMine();
				M.push(ag);
			}
			var af = [];
			for (var ab = 0; ab < M.length; ab++) {
				aa = M[ab];
				if (aa.getRow() < Y - 1 || aa.getRow() > Y + 1 || aa.getCol() < ae - 1 || aa.getCol() > ae + 1) {
					af.push(aa);
				}
			}
			for (ad = -1; ad <= 1; ad++) {
				for (Z = -1; Z <= 1; Z++) {
					ac = I[Y + ad][ae + Z];
					if (ac.isMine() && af.length > 0) {
						af.splice(Math.floor(Math.random() * af.length), 1)[0].plantMine();
						ac.unplantMine();
					}
				}
			}
		}
		U.start();
		if (Y == 1 && ae == 1 || Y == 1 && ae == a || Y == B && ae == 1 || Y == B && ae == a) {
			return 1;
		} else {
			if (Y == 1 || Y == B || ae == 1 || ae == a) {
				return 2;
			} else {
				return 3;
			}
		}
	}
	function X(Y) {
	}
	function F() {
		var aa;
		var ab;
		var ac;
		function Z() {
			var ag = (new Date).getTime();
			var ad = ab * 1e3;
			var af = ag - aa;
			var ae = 1e3 - (af - ad);
			ac = setTimeout(Z, ae);
			ab++;
			Y();
		}
		function Y() {
			var ad = x(ab);
			document.getElementById("seconds_hundreds").className = "time" + ad[0];
			document.getElementById("seconds_tens").className = "time" + ad[1];
			document.getElementById("seconds_ones").className = "time" + ad[2];
		}
		this.start = function () {
			aa = (new Date).getTime() - ab * 1e3;
			Z();
		};
		this.stop = function () {
			clearTimeout(ac);
		};
		this.getTime = function () {
			return ab;
		};
		this.setTime = function (ad) {
			ab = ad;
			Y();
		};
	}
	function W() {
		var Y = x(K);
		document.getElementById("mines_hundreds").className = "time" + Y[0];
		document.getElementById("mines_tens").className = "time" + Y[1];
		document.getElementById("mines_ones").className = "time" + Y[2];
	}
	function x(Y) {
		Y = Math.min(Y, 999);
		if (Y >= 0) {
			return [Math.floor(Y / 100), Math.floor(Y % 100 / 10), Y % 10];
		} else {
			return ["-", Math.floor(-Y % 100 / 10), -Y % 10];
		}
	}
	function R(Y) {
		var ac, Z, aa;
		var ab;
		document.getElementById("face").className = "facedead";
		U.stop();
		L = true;
		for (ac = 1; ac <= B; ac++) {
			columnloop: for (Z = 1; Z <= a; Z++) {
				ab = I[ac][Z];
				if (!ab.isRevealed()) {
					for (aa = 0; aa < Y.length; aa++) {
						if (ab == Y[aa]) {
							ab.setClass("square bombdeath");
							continue columnloop;
						}
					}
					if (ab.isMine() && !ab.isFlagged()) {
						ab.setClass("square bombrevealed");
					} else {
						if (!ab.isMine() && ab.isFlagged()) {
							ab.setClass("square bombmisflagged");
						}
					}
				}
			}
		}
	}
	function J() {
		var ad, Y;
		var aa;
		var Z;
		var ab;
		var ac = false;
		document.getElementById("face").className = "facewin";
		U.stop();
		L = true;
		K = 0;
		W();
		for (ad = 1; ad <= B; ad++) {
			for (Y = 1; Y <= a; Y++) {
				aa = I[ad][Y];
				if (!aa.isRevealed() && !aa.isFlagged()) {
					aa.setClass("square bombflagged");
				}
			}
		}
		if (i > 0) {
			ab = U.getTime();
			if (E.onWin) {
				E.onWin(i, ab);
			}
		}
	}
	function O() {
		try {
			return "localStorage" in window && window.localStorage !== null;
		} catch (Y) {
			return false;
		}
	}
	function f(Z) {
		var Y = {};
		if (k) {
			Y.left = Z.button == 1 || Z.button == 3 || Z.button == 4;
			Y.right = Z.button == 2 || Z.button == 3 || Z.button == 4;
		} else {
			Y.left = Z.button == 0 || Z.button == 1;
			Y.right = Z.button == 2 || Z.button == 1;
		}
		return Y;
	}
	function h(aa, Z, Y) {
		if (!aa.isRevealed()) {
			if (aa.isMarked()) {
				aa.setClass(Y);
			} else {
				if (!aa.isFlagged()) {
					aa.setClass(Z);
				}
			}
		}
	}
	function b(ac, ab, aa) {
		var Y, Z;
		for (Y = -1; Y <= 1; Y++) {
			for (Z = -1; Z <= 1; Z++) {
				h(I[ac.getRow() + Y][ac.getCol() + Z], ab, aa);
			}
		}
	}
	function P() {
		var aa = false;
		var ac;
		function Z(ag) {
			if (ag.type === "touchmove" && !ae(ag)) {
				return;
			}
			var af = Y(ag);
			if (af != ac && !D) {
				if (v) {
					if (ac) {
						b(c[ac.id], "square blank", "square question");
					}
					if (af.className.substring(0, 6) == "square") {
						b(c[af.id], "square open0", "square questionpressed");
					}
				} else {
					if (ac) {
						h(c[ac.id], "square blank", "square question");
					}
					if (af.className.substring(0, 6) == "square") {
						h(c[af.id], "square open0", "square questionpressed");
					}
				}
			}
			ac = af.className.substring(0, 6) == "square" ? af : undefined;
		}
		function ad(ag) {
			if (ag.type === "touchmove" && !ae(ag)) {
				return;
			}
			var af = Y(ag);
			document.getElementById("face").className = af.id == "face" ? "facepressed" : "facesmile";
		}
		function Y(af) {
			if (af.type === "touchmove" || af.type === "touchend") {
				var ag = af.originalEvent.changedTouches[0];
				return document.elementFromPoint(ag.clientX, ag.clientY);
			} else {
				return af.target;
			}
		}
		function ae(af) {
			if (!d) {
				return false;
			}
			var ag = af.originalEvent.changedTouches[0].identifier === d;
			return ag;
		}
		k = $.browser.msie && parseFloat($.browser.version) <= 7;
		$(document).bind("gesturestart", function (af) {
			C = true;
			ab();
		});
		$(document).bind("gestureend", function (af) {
			C = false;
		});
		$(document).bind("scroll", ab);
		function ab() {
			if (!d) {
				return;
			}
			d = null;
			if (ac) {
				h(c[ac.id], "square blank", "square question");
				ac = undefined;
			}
			if (!L) {
				document.getElementById("face").className = "facesmile";
			}
		}
		$(document).bind("touchstart", function (ah) {
			$(document).unbind("mousedown").unbind("mouseup");
			if (d || C) {
				return;
			}
			d = ah.originalEvent.changedTouches[0].identifier;
			if (ah.target.className.substring(0, 6) == "square" && !L) {
				var ag = d;
				var af = ah.target;
				setTimeout(function () {
					if (ag === d && af === ac) {
						c[af.id].flag(true);
						d = null;
						document.getElementById("face").className = "facesmile";
					}
				}, 500);
				$(document).bind("touchmove", Z);
				document.getElementById("face").className = "faceooh";
				ac = undefined;
				Z(ah);
			} else {
				if (ah.target.id == "face") {
					aa = true;
					$(document).bind("touchmove", Z);
					document.getElementById("face").className = "facepressed";
				}
			}
		});
		$(document).bind("touchend", function (ag) {
			if (!ae(ag)) {
				return;
			}
			d = null;
			$(document).unbind("touchmove", Z).unbind("touchmove", ad);
			if (aa || !L) {
				document.getElementById("face").className = "facesmile";
			}
			var af = Y(ag);
			if (af.className.substring(0, 6) == "square" && !L) {
				square = c[af.id];
				if (!g) {
					squareTypeId = t(square);
				}
				if (square.isRevealed()) {
					square.reveal9();
				} else {
					if (square.isFlagged()) {
						square.flag(true);
					} else {
						if (!square.reveal1()) {
							R([square]);
						}
						if (!g) {
							g = true;
						}
					}
				}
				ag.preventDefault();
			} else {
				if (af.id == "face" && aa) {
					E.newGame();
				}
			}
			aa = false;
		});
		$(document).mousedown(function (ag) {
			var af = f(ag);
			e = af.left || e;
			v = af.right || v;
			if (ag.ctrlKey && ag.target.className.substring(0, 6) == "square" && !L) {
				c[ag.target.id].flag();
				isMouseDownForCtrlClick = true;
			} else {
				if (e) {
					if (ag.target.className.substring(0, 6) == "square" && !L) {
						ag.preventDefault();
						$(document).bind("mousemove", Z);
						document.getElementById("face").className = "faceooh";
						ac = undefined;
						Z(ag);
					} else {
						if (ag.target.id == "face") {
							ag.preventDefault();
							aa = true;
							$(document).bind("mousemove", ad);
							document.getElementById("face").className = "facepressed";
						}
					}
				} else {
					if (v) {
						if (ag.target.className.substring(0, 6) == "square" && !L) {
							c[ag.target.id].flag();
						}
						return false;
					}
				}
			}
		});
		$(document).on("contextmenu", function (ag) {
			var af = $(ag.target);
			if (af.is("#game") || af.closest("#game").length > 0) {
				return;
			}
			v = false;
		});
		$(document).mouseup(function (ai) {
			var af = f(ai);
			var ah;
			var ag;
			if (isMouseDownForCtrlClick) {
				e = false;
				v = false;
				isMouseDownForCtrlClick = false;
				return;
			}
			if (af.left) {
				e = false;
				$(document).unbind("mousemove", Z).unbind("mousemove", ad);
				if (aa || !L) {
					document.getElementById("face").className = "facesmile";
				}
				if (ai.target.className.substring(0, 6) == "square" && !L) {
					ah = c[ai.target.id];
					if (v) {
						D = true;
						b(c[ai.target.id], "square blank", "square question");
						ah.reveal9();
					} else {
						if (!D) {
							if (!g) {
								ag = t(ah);
							}
							if (!ah.reveal1()) {
								R([ah]);
							}
							if (!g) {
								g = true;
							}
						}
						D = false;
					}
				} else {
					if (ai.target.id == "face" && aa) {
						E.newGame();
					}
				}
				aa = false;
			}
			if (af.right) {
				v = false;
				if (ai.target.className.substring(0, 6) == "square" && !L) {
					if (e) {
						ah = c[ai.target.id];
						D = true;
						b(ah, "square blank", "square question");
						ah.reveal9();
					} else {
						D = false;
					}
					if (!L) {
						document.getElementById("face").className = "facesmile";
					}
				}
			}
		});
		$(document).keydown(function (ag) {
			if (ag.which == 113) {
				E.newGame();
			} else {
				if (ag.which == 32) {
					if (hoveredSquareId && !L) {
						square = c[hoveredSquareId];
						if (square.isRevealed()) {
							square.reveal9();
						} else {
							square.flag();
						}
					}
					ag.preventDefault();
				} else {
					if (ag.which == 90 && !ag.shiftKey && af()) {
						if (document.getElementById("face").className == "facedead") {
							E.newGame(o);
						}
					}
				}
			}
			function af() {
				var ah = window.navigator && window.navigator.platform && window.navigator.platform.toLowerCase().indexOf("mac") !== -1;
				if (ah) {
					return ag.metaKey;
				} else {
					return ag.ctrlKey;
				}
			}
		});
		$("#game").mouseover(function (af) {
			if (af.target.className.substring(0, 6) == "square") {
				hoveredSquareId = af.target.id;
			}
		});
		$("#game").mouseout(function (af) {
			if (af.target.className.substring(0, 6) == "square") {
				if (hoveredSquareId = af.target.id) {
					hoveredSquareId = "";
				}
			}
		});
	}
};
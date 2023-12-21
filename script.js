/*line 1070 to change the date countdown:  {var dt1 = "08/25/" + dt.getFullYear() + " 00:00:01 am +0000";} */

var Base = function() {};
(Base.extend = function(a, b) {
  "use strict";
  var c = Base.prototype.extend;
  Base._prototyping = !0;
  var d = new this();
  c.call(d, a), (d.base = function() {}), delete Base._prototyping;
  var e = d.constructor,
    f = (d.constructor = function() {
      if (!Base._prototyping)
        if (this._constructing || this.constructor == f)
          (this._constructing = !0),
            e.apply(this, arguments),
            delete this._constructing;
        else if (null !== arguments[0])
          return (arguments[0].extend || c).call(arguments[0], d);
    });
  return (
    (f.ancestor = this),
    (f.extend = this.extend),
    (f.forEach = this.forEach),
    (f.implement = this.implement),
    (f.prototype = d),
    (f.toString = this.toString),
    (f.valueOf = function(a) {
      return "object" == a ? f : e.valueOf();
    }),
    c.call(f, b),
    "function" == typeof f.init && f.init(),
    f
  );
}),
  (Base.prototype = {
    extend: function(a, b) {
      if (arguments.length > 1) {
        var c = this[a];
        if (
          c &&
          "function" == typeof b &&
          (!c.valueOf || c.valueOf() != b.valueOf()) &&
          /\bbase\b/.test(b)
        ) {
          var d = b.valueOf();
          (b = function() {
            var a = this.base || Base.prototype.base;
            this.base = c;
            var b = d.apply(this, arguments);
            return (this.base = a), b;
          }),
            (b.valueOf = function(a) {
              return "object" == a ? b : d;
            }),
            (b.toString = Base.toString);
        }
        this[a] = b;
      } else if (a) {
        var e = Base.prototype.extend;
        Base._prototyping ||
          "function" == typeof this ||
          (e = this.extend || e);
        for (
          var f = { toSource: null },
            g = ["constructor", "toString", "valueOf"],
            h = Base._prototyping ? 0 : 1;
          (i = g[h++]);

        )
          a[i] != f[i] && e.call(this, i, a[i]);
        for (var i in a) f[i] || e.call(this, i, a[i]);
      }
      return this;
    }
  }),
  (Base = Base.extend(
    {
      constructor: function() {
        this.extend(arguments[0]);
      }
    },
    {
      ancestor: Object,
      version: "1.1",
      forEach: function(a, b, c) {
        for (var d in a) void 0 === this.prototype[d] && b.call(c, a[d], d, a);
      },
      implement: function() {
        for (var a = 0; a < arguments.length; a++)
          "function" == typeof arguments[a]
            ? arguments[a](this.prototype)
            : this.prototype.extend(arguments[a]);
        return this;
      },
      toString: function() {
        return String(this.valueOf());
      }
    }
  ));
var FlipClock;
!(function(a) {
  "use strict";
  (FlipClock = function(a, b, c) {
    return (
      b instanceof Object && b instanceof Date == !1 && ((c = b), (b = 0)),
      new FlipClock.Factory(a, b, c)
    );
  }),
    (FlipClock.Lang = {}),
    (FlipClock.Base = Base.extend({
      buildDate: "2014-12-12",
      version: "0.7.7",
      constructor: function(b, c) {
        "object" != typeof b && (b = {}),
          "object" != typeof c && (c = {}),
          this.setOptions(a.extend(!0, {}, b, c));
      },
      callback: function(a) {
        if ("function" == typeof a) {
          for (var b = [], c = 1; c <= arguments.length; c++)
            arguments[c] && b.push(arguments[c]);
          a.apply(this, b);
        }
      },
      log: function(a) {
        window.console && console.log && console.log(a);
      },
      getOption: function(a) {
        return this[a] ? this[a] : !1;
      },
      getOptions: function() {
        return this;
      },
      setOption: function(a, b) {
        this[a] = b;
      },
      setOptions: function(a) {
        for (var b in a) "undefined" != typeof a[b] && this.setOption(b, a[b]);
      }
    }));
})(jQuery),
  (function(a) {
    "use strict";
    FlipClock.Face = FlipClock.Base.extend({
      autoStart: !0,
      dividers: [],
      factory: !1,
      lists: [],
      constructor: function(a, b) {
        (this.dividers = []),
          (this.lists = []),
          this.base(b),
          (this.factory = a);
      },
      build: function() {
        this.autoStart && this.start();
      },
      createDivider: function(b, c, d) {
        ("boolean" != typeof c && c) || ((d = c), (c = b));
        var e = [
          '<span class="' + this.factory.classes.dot + ' top"></span>',
          '<span class="' + this.factory.classes.dot + ' bottom"></span>'
        ].join("");
        d && (e = ""), (b = this.factory.localize(b));
        var f = [
            '<span class="' +
              this.factory.classes.divider +
              " " +
              (c ? c : "").toLowerCase() +
              '">',
            '<span class="' +
              this.factory.classes.label +
              '">' +
              (b ? b : "") +
              "</span>",
            e,
            "</span>"
          ],
          g = a(f.join(""));
        return this.dividers.push(g), g;
      },
      createList: function(a, b) {
        "object" == typeof a && ((b = a), (a = 0));
        var c = new FlipClock.List(this.factory, a, b);
        return this.lists.push(c), c;
      },
      reset: function() {
        (this.factory.time = new FlipClock.Time(
          this.factory,
          this.factory.original ? Math.round(this.factory.original) : 0,
          { minimumDigits: this.factory.minimumDigits }
        )),
          this.flip(this.factory.original, !1);
      },
      appendDigitToClock: function(a) {
        a.$el.append(!1);
      },
      addDigit: function(a) {
        var b = this.createList(a, {
          classes: {
            active: this.factory.classes.active,
            before: this.factory.classes.before,
            flip: this.factory.classes.flip
          }
        });
        this.appendDigitToClock(b);
      },
      start: function() {},
      stop: function() {},
      autoIncrement: function() {
        this.factory.countdown ? this.decrement() : this.increment();
      },
      increment: function() {
        this.factory.time.addSecond();
      },
      decrement: function() {
        0 == this.factory.time.getTimeSeconds()
          ? this.factory.stop()
          : this.factory.time.subSecond();
      },
      flip: function(b, c) {
        var d = this;
        a.each(b, function(a, b) {
          var e = d.lists[a];
          e ? (c || b == e.digit || e.play(), e.select(b)) : d.addDigit(b);
        });
      }
    });
  })(jQuery),
  (function(a) {
    "use strict";
    FlipClock.Factory = FlipClock.Base.extend({
      animationRate: 1e3,
      autoStart: !0,
      callbacks: {
        destroy: !1,
        create: !1,
        init: !1,
        interval: !1,
        start: !1,
        stop: !1,
        reset: !1
      },
      classes: {
        active: "flip-clock-active",
        before: "flip-clock-before",
        divider: "flip-clock-divider",
        dot: "flip-clock-dot",
        label: "flip-clock-label",
        flip: "flip",
        play: "play",
        wrapper: "flip-clock-wrapper"
      },
      clockFace: "HourlyCounter",
      countdown: !1,
      defaultClockFace: "HourlyCounter",
      defaultLanguage: "english",
      $el: !1,
      face: !0,
      lang: !1,
      language: "english",
      minimumDigits: 0,
      original: !1,
      running: !1,
      time: !1,
      timer: !1,
      $wrapper: !1,
      constructor: function(b, c, d) {
        d || (d = {}),
          (this.lists = []),
          (this.running = !1),
          this.base(d),
          (this.$el = a(b).addClass(this.classes.wrapper)),
          (this.$wrapper = this.$el),
          (this.original = c instanceof Date ? c : c ? Math.round(c) : 0),
          (this.time = new FlipClock.Time(this, this.original, {
            minimumDigits: this.minimumDigits,
            animationRate: this.animationRate
          })),
          (this.timer = new FlipClock.Timer(this, d)),
          this.loadLanguage(this.language),
          this.loadClockFace(this.clockFace, d),
          this.autoStart && this.start();
      },
      loadClockFace: function(a, b) {
        var c,
          d = "Face",
          e = !1;
        return (
          (a = a.ucfirst() + d),
          this.face.stop && (this.stop(), (e = !0)),
          this.$el.html(""),
          (this.time.minimumDigits = this.minimumDigits),
          (c = FlipClock[a]
            ? new FlipClock[a](this, b)
            : new FlipClock[this.defaultClockFace + d](this, b)),
          c.build(),
          (this.face = c),
          e && this.start(),
          this.face
        );
      },
      loadLanguage: function(a) {
        var b;
        return (
          (b = FlipClock.Lang[a.ucfirst()]
            ? FlipClock.Lang[a.ucfirst()]
            : FlipClock.Lang[a]
              ? FlipClock.Lang[a]
              : FlipClock.Lang[this.defaultLanguage]),
          (this.lang = b)
        );
      },
      localize: function(a, b) {
        var c = this.lang;
        if (!a) return null;
        var d = a.toLowerCase();
        return "object" == typeof b && (c = b), c && c[d] ? c[d] : a;
      },
      start: function(a) {
        var b = this;
        b.running || (b.countdown && !(b.countdown && b.time.time > 0))
          ? b.log("Trying to start timer when countdown already at 0")
          : (b.face.start(b.time),
            b.timer.start(function() {
              b.flip(), "function" == typeof a && a();
            }));
      },
      stop: function(a) {
        this.face.stop(), this.timer.stop(a);
        for (var b in this.lists)
          this.lists.hasOwnProperty(b) && this.lists[b].stop();
      },
      reset: function(a) {
        this.timer.reset(a), this.face.reset();
      },
      setTime: function(a) {
        (this.time.time = a), this.flip(!0);
      },
      getTime: function(a) {
        return this.time;
      },
      setCountdown: function(a) {
        var b = this.running;
        (this.countdown = a ? !0 : !1), b && (this.stop(), this.start());
      },
      flip: function(a) {
        this.face.flip(!1, a);
      }
    });
  })(jQuery),
  (function(a) {
    "use strict";
    FlipClock.List = FlipClock.Base.extend({
      digit: 0,
      classes: {
        active: "flip-clock-active",
        before: "flip-clock-before",
        flip: "flip"
      },
      factory: !1,
      $el: !1,
      $obj: !1,
      items: [],
      lastDigit: 0,
      constructor: function(a, b, c) {
        (this.factory = a),
          (this.digit = b),
          (this.lastDigit = b),
          (this.$el = this.createList()),
          (this.$obj = this.$el),
          b > 0 && this.select(b),
          this.factory.$el.append(this.$el);
      },
      select: function(a) {
        if (
          ("undefined" == typeof a ? (a = this.digit) : (this.digit = a),
          this.digit != this.lastDigit)
        ) {
          var b = this.$el
            .find("." + this.classes.before)
            .removeClass(this.classes.before);
          this.$el
            .find("." + this.classes.active)
            .removeClass(this.classes.active)
            .addClass(this.classes.before),
            this.appendListItem(this.classes.active, this.digit),
            b.remove(),
            (this.lastDigit = this.digit);
        }
      },
      play: function() {
        this.$el.addClass(this.factory.classes.play);
      },
      stop: function() {
        var a = this;
        setTimeout(function() {
          a.$el.removeClass(a.factory.classes.play);
        }, this.factory.timer.interval);
      },
      createListItem: function(a, b) {
        return [
          '<li class="' + (a ? a : "") + '">',
          '<a href="#">',
          '<div class="up">',
          '<div class="shadow"></div>',
          '<div class="inn">' + (b ? b : "") + "</div>",
          "</div>",
          '<div class="down">',
          '<div class="shadow"></div>',
          '<div class="inn">' + (b ? b : "") + "</div>",
          "</div>",
          "</a>",
          "</li>"
        ].join("");
      },
      appendListItem: function(a, b) {
        var c = this.createListItem(a, b);
        this.$el.append(c);
      },
      createList: function() {
        var b = this.getPrevDigit() ? this.getPrevDigit() : this.digit,
          c = a(
            [
              '<ul class="' +
                this.classes.flip +
                " " +
                (this.factory.running ? this.factory.classes.play : "") +
                '">',
              this.createListItem(this.classes.before, b),
              this.createListItem(this.classes.active, this.digit),
              "</ul>"
            ].join("")
          );
        return c;
      },
      getNextDigit: function() {
        return 9 == this.digit ? 0 : this.digit + 1;
      },
      getPrevDigit: function() {
        return 0 == this.digit ? 9 : this.digit - 1;
      }
    });
  })(jQuery),
  (function(a) {
    "use strict";
    (String.prototype.ucfirst = function() {
      return this.substr(0, 1).toUpperCase() + this.substr(1);
    }),
      (a.fn.FlipClock = function(b, c) {
        return new FlipClock(a(this), b, c);
      }),
      (a.fn.flipClock = function(b, c) {
        return a.fn.FlipClock(b, c);
      });
  })(jQuery),
  (function(a) {
    "use strict";
    FlipClock.Time = FlipClock.Base.extend({
      time: 0,
      factory: !1,
      minimumDigits: 0,
      constructor: function(a, b, c) {
        "object" != typeof c && (c = {}),
          c.minimumDigits || (c.minimumDigits = a.minimumDigits),
          this.base(c),
          (this.factory = a),
          b && (this.time = b);
      },
      convertDigitsToArray: function(a) {
        var b = [];
        a = a.toString();
        for (var c = 0; c < a.length; c++) a[c].match(/^\d*$/g) && b.push(a[c]);
        return b;
      },
      digit: function(a) {
        var b = this.toString(),
          c = b.length;
        return b[c - a] ? b[c - a] : !1;
      },
      digitize: function(b) {
        var c = [];
        if (
          (a.each(b, function(a, b) {
            (b = b.toString()), 1 == b.length && (b = "0" + b);
            for (var d = 0; d < b.length; d++) c.push(b.charAt(d));
          }),
          c.length > this.minimumDigits && (this.minimumDigits = c.length),
          this.minimumDigits > c.length)
        )
          for (var d = c.length; d < this.minimumDigits; d++) c.unshift("0");
        return c;
      },
      getDateObject: function() {
        return this.time instanceof Date
          ? this.time
          : new Date(new Date().getTime() + 1e3 * this.getTimeSeconds());
      },
      getDayCounter: function(a) {
        var b = [this.getDays(), this.getHours(!0), this.getMinutes(!0)];
        return a && b.push(this.getSeconds(!0)), this.digitize(b);
      },
      getDays: function(a) {
        var b = this.getTimeSeconds() / 60 / 60 / 24;
        return a && (b %= 7), Math.floor(b);
      },
      getHourCounter: function() {
        var a = this.digitize([
          this.getHours(),
          this.getMinutes(!0),
          this.getSeconds(!0)
        ]);
        return a;
      },
      getHourly: function() {
        return this.getHourCounter();
      },
      getHours: function(a) {
        var b = this.getTimeSeconds() / 60 / 60;
        return a && (b %= 24), Math.floor(b);
      },
      getMilitaryTime: function(a, b) {
        "undefined" == typeof b && (b = !0), a || (a = this.getDateObject());
        var c = [a.getHours(), a.getMinutes()];
        return b === !0 && c.push(a.getSeconds()), this.digitize(c);
      },
      getMinutes: function(a) {
        var b = this.getTimeSeconds() / 60;
        return a && (b %= 60), Math.floor(b);
      },
      getMinuteCounter: function() {
        var a = this.digitize([this.getMinutes(), this.getSeconds(!0)]);
        return a;
      },
      getTimeSeconds: function(a) {
        return (
          a || (a = new Date()),
          this.time instanceof Date
            ? this.factory.countdown
              ? Math.max(this.time.getTime() / 1e3 - a.getTime() / 1e3, 0)
              : a.getTime() / 1e3 - this.time.getTime() / 1e3
            : this.time
        );
      },
      getTime: function(a, b) {
        "undefined" == typeof b && (b = !0),
          a || (a = this.getDateObject()),
          console.log(a);
        var c = a.getHours(),
          d = [c > 12 ? c - 12 : 0 === c ? 12 : c, a.getMinutes()];
        return b === !0 && d.push(a.getSeconds()), this.digitize(d);
      },
      getSeconds: function(a) {
        var b = this.getTimeSeconds();
        return a && (60 == b ? (b = 0) : (b %= 60)), Math.ceil(b);
      },
      getWeeks: function(a) {
        var b = this.getTimeSeconds() / 60 / 60 / 24 / 7;
        return a && (b %= 52), Math.floor(b);
      },
      removeLeadingZeros: function(b, c) {
        var d = 0,
          e = [];
        return (
          a.each(c, function(a, f) {
            b > a ? (d += parseInt(c[a], 10)) : e.push(c[a]);
          }),
          0 === d ? e : c
        );
      },
      addSeconds: function(a) {
        this.time instanceof Date
          ? this.time.setSeconds(this.time.getSeconds() + a)
          : (this.time += a);
      },
      addSecond: function() {
        this.addSeconds(1);
      },
      subSeconds: function(a) {
        this.time instanceof Date
          ? this.time.setSeconds(this.time.getSeconds() - a)
          : (this.time -= a);
      },
      subSecond: function() {
        this.subSeconds(1);
      },
      toString: function() {
        return this.getTimeSeconds().toString();
      }
    });
  })(jQuery),
  (function(a) {
    "use strict";
    FlipClock.Timer = FlipClock.Base.extend({
      callbacks: {
        destroy: !1,
        create: !1,
        init: !1,
        interval: !1,
        start: !1,
        stop: !1,
        reset: !1
      },
      count: 0,
      factory: !1,
      interval: 1e3,
      animationRate: 1e3,
      constructor: function(a, b) {
        this.base(b),
          (this.factory = a),
          this.callback(this.callbacks.init),
          this.callback(this.callbacks.create);
      },
      getElapsed: function() {
        return this.count * this.interval;
      },
      getElapsedTime: function() {
        return new Date(this.time + this.getElapsed());
      },
      reset: function(a) {
        clearInterval(this.timer),
          (this.count = 0),
          this._setInterval(a),
          this.callback(this.callbacks.reset);
      },
      start: function(a) {
        (this.factory.running = !0),
          this._createTimer(a),
          this.callback(this.callbacks.start);
      },
      stop: function(a) {
        (this.factory.running = !1),
          this._clearInterval(a),
          this.callback(this.callbacks.stop),
          this.callback(a);
      },
      _clearInterval: function() {
        clearInterval(this.timer);
      },
      _createTimer: function(a) {
        this._setInterval(a);
      },
      _destroyTimer: function(a) {
        this._clearInterval(),
          (this.timer = !1),
          this.callback(a),
          this.callback(this.callbacks.destroy);
      },
      _interval: function(a) {
        this.callback(this.callbacks.interval), this.callback(a), this.count++;
      },
      _setInterval: function(a) {
        var b = this;
        b._interval(a),
          (b.timer = setInterval(function() {
            b._interval(a);
          }, this.interval));
      }
    });
  })(jQuery),
  (function(a) {
    FlipClock.TwentyFourHourClockFace = FlipClock.Face.extend({
      constructor: function(a, b) {
        this.base(a, b);
      },
      build: function(b) {
        var c = this,
          d = this.factory.$el.find("ul");
        this.factory.time.time ||
          ((this.factory.original = new Date()),
          (this.factory.time = new FlipClock.Time(
            this.factory,
            this.factory.original
          )));
        var b = b ? b : this.factory.time.getMilitaryTime(!1, this.showSeconds);
        b.length > d.length &&
          a.each(b, function(a, b) {
            c.createList(b);
          }),
          this.createDivider(),
          this.createDivider(),
          a(this.dividers[0]).insertBefore(
            this.lists[this.lists.length - 2].$el
          ),
          a(this.dividers[1]).insertBefore(
            this.lists[this.lists.length - 4].$el
          ),
          this.base();
      },
      flip: function(a, b) {
        this.autoIncrement(),
          (a = a ? a : this.factory.time.getMilitaryTime(!1, this.showSeconds)),
          this.base(a, b);
      }
    });
  })(jQuery),
  (function(a) {
    FlipClock.CounterFace = FlipClock.Face.extend({
      shouldAutoIncrement: !1,
      constructor: function(a, b) {
        "object" != typeof b && (b = {}),
          (a.autoStart = b.autoStart ? !0 : !1),
          b.autoStart && (this.shouldAutoIncrement = !0),
          (a.increment = function() {
            (a.countdown = !1), a.setTime(a.getTime().getTimeSeconds() + 1);
          }),
          (a.decrement = function() {
            a.countdown = !0;
            var b = a.getTime().getTimeSeconds();
            b > 0 && a.setTime(b - 1);
          }),
          (a.setValue = function(b) {
            a.setTime(b);
          }),
          (a.setCounter = function(b) {
            a.setTime(b);
          }),
          this.base(a, b);
      },
      build: function() {
        var b = this,
          c = this.factory.$el.find("ul"),
          d = this.factory.getTime().digitize([this.factory.getTime().time]);
        d.length > c.length &&
          a.each(d, function(a, c) {
            var d = b.createList(c);
            d.select(c);
          }),
          a.each(this.lists, function(a, b) {
            b.play();
          }),
          this.base();
      },
      flip: function(a, b) {
        this.shouldAutoIncrement && this.autoIncrement(),
          a ||
            (a = this.factory
              .getTime()
              .digitize([this.factory.getTime().time])),
          this.base(a, b);
      },
      reset: function() {
        (this.factory.time = new FlipClock.Time(
          this.factory,
          this.factory.original ? Math.round(this.factory.original) : 0
        )),
          this.flip();
      }
    });
  })(jQuery),
  (function(a) {
    FlipClock.DailyCounterFace = FlipClock.Face.extend({
      showSeconds: !0,
      constructor: function(a, b) {
        this.base(a, b);
      },
      build: function(b) {
        var c = this,
          d = this.factory.$el.find("ul"),
          e = 0;
        (b = b ? b : this.factory.time.getDayCounter(this.showSeconds)),
          b.length > d.length &&
            a.each(b, function(a, b) {
              c.createList(b);
            }),
          this.showSeconds
            ? a(this.createDivider("Seconds")).insertBefore(
                this.lists[this.lists.length - 2].$el
              )
            : (e = 2),
          a(this.createDivider("Minutes")).insertBefore(
            this.lists[this.lists.length - 4 + e].$el
          ),
          a(this.createDivider("Hours")).insertBefore(
            this.lists[this.lists.length - 6 + e].$el
          ),
          a(this.createDivider("Days", !0)).insertBefore(this.lists[0].$el),
          this.base();
      },
      flip: function(a, b) {
        a || (a = this.factory.time.getDayCounter(this.showSeconds)),
          this.autoIncrement(),
          this.base(a, b);
      }
    });
  })(jQuery),
  (function(a) {
    FlipClock.HourlyCounterFace = FlipClock.Face.extend({
      constructor: function(a, b) {
        this.base(a, b);
      },
      build: function(b, c) {
        var d = this,
          e = this.factory.$el.find("ul");
        (c = c ? c : this.factory.time.getHourCounter()),
          c.length > e.length &&
            a.each(c, function(a, b) {
              d.createList(b);
            }),
          a(this.createDivider("Seconds")).insertBefore(
            this.lists[this.lists.length - 2].$el
          ),
          a(this.createDivider("Minutes")).insertBefore(
            this.lists[this.lists.length - 4].$el
          ),
          b ||
            a(this.createDivider("Hours", !0)).insertBefore(this.lists[0].$el),
          this.base();
      },
      flip: function(a, b) {
        a || (a = this.factory.time.getHourCounter()),
          this.autoIncrement(),
          this.base(a, b);
      },
      appendDigitToClock: function(a) {
        this.base(a), this.dividers[0].insertAfter(this.dividers[0].next());
      }
    });
  })(jQuery),
  (function(a) {
    FlipClock.MinuteCounterFace = FlipClock.HourlyCounterFace.extend({
      clearExcessDigits: !1,
      constructor: function(a, b) {
        this.base(a, b);
      },
      build: function() {
        this.base(!0, this.factory.time.getMinuteCounter());
      },
      flip: function(a, b) {
        a || (a = this.factory.time.getMinuteCounter()), this.base(a, b);
      }
    });
  })(jQuery),
  (function(a) {
    FlipClock.TwelveHourClockFace = FlipClock.TwentyFourHourClockFace.extend({
      meridium: !1,
      meridiumText: "AM",
      build: function() {
        var b = this.factory.time.getTime(!1, this.showSeconds);
        this.base(b),
          (this.meridiumText = this.getMeridium()),
          (this.meridium = a(
            [
              '<ul class="flip-clock-meridium">',
              "<li>",
              '<a href="#">' + this.meridiumText + "</a>",
              "</li>",
              "</ul>"
            ].join("")
          )),
          this.meridium.insertAfter(this.lists[this.lists.length - 1].$el);
      },
      flip: function(a, b) {
        this.meridiumText != this.getMeridium() &&
          ((this.meridiumText = this.getMeridium()),
          this.meridium.find("a").html(this.meridiumText)),
          this.base(this.factory.time.getTime(!1, this.showSeconds), b);
      },
      getMeridium: function() {
        return new Date().getHours() >= 12 ? "PM" : "AM";
      },
      isPM: function() {
        return "PM" == this.getMeridium() ? !0 : !1;
      },
      isAM: function() {
        return "AM" == this.getMeridium() ? !0 : !1;
      }
    });
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Arabic = {
      years: "سنوات",
      months: "شهور",
      days: "أيام",
      hours: "ساعات",
      minutes: "دقائق",
      seconds: "ثواني"
    }),
      (FlipClock.Lang.ar = FlipClock.Lang.Arabic),
      (FlipClock.Lang["ar-ar"] = FlipClock.Lang.Arabic),
      (FlipClock.Lang.arabic = FlipClock.Lang.Arabic);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Danish = {
      years: "År",
      months: "Måneder",
      days: "Dage",
      hours: "Timer",
      minutes: "Minutter",
      seconds: "Sekunder"
    }),
      (FlipClock.Lang.da = FlipClock.Lang.Danish),
      (FlipClock.Lang["da-dk"] = FlipClock.Lang.Danish),
      (FlipClock.Lang.danish = FlipClock.Lang.Danish);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.German = {
      years: "Jahre",
      months: "Monate",
      days: "Tage",
      hours: "Stunden",
      minutes: "Minuten",
      seconds: "Sekunden"
    }),
      (FlipClock.Lang.de = FlipClock.Lang.German),
      (FlipClock.Lang["de-de"] = FlipClock.Lang.German),
      (FlipClock.Lang.german = FlipClock.Lang.German);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.English = {
      years: "Years",
      months: "Months",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds"
    }),
      (FlipClock.Lang.en = FlipClock.Lang.English),
      (FlipClock.Lang["en-us"] = FlipClock.Lang.English),
      (FlipClock.Lang.english = FlipClock.Lang.English);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Spanish = {
      years: "Años",
      months: "Meses",
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos"
    }),
      (FlipClock.Lang.es = FlipClock.Lang.Spanish),
      (FlipClock.Lang["es-es"] = FlipClock.Lang.Spanish),
      (FlipClock.Lang.spanish = FlipClock.Lang.Spanish);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Finnish = {
      years: "Vuotta",
      months: "Kuukautta",
      days: "Päivää",
      hours: "Tuntia",
      minutes: "Minuuttia",
      seconds: "Sekuntia"
    }),
      (FlipClock.Lang.fi = FlipClock.Lang.Finnish),
      (FlipClock.Lang["fi-fi"] = FlipClock.Lang.Finnish),
      (FlipClock.Lang.finnish = FlipClock.Lang.Finnish);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.French = {
      years: "Ans",
      months: "Mois",
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes",
      seconds: "Secondes"
    }),
      (FlipClock.Lang.fr = FlipClock.Lang.French),
      (FlipClock.Lang["fr-ca"] = FlipClock.Lang.French),
      (FlipClock.Lang.french = FlipClock.Lang.French);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Italian = {
      years: "Anni",
      months: "Mesi",
      days: "Giorni",
      hours: "Ore",
      minutes: "Minuti",
      seconds: "Secondi"
    }),
      (FlipClock.Lang.it = FlipClock.Lang.Italian),
      (FlipClock.Lang["it-it"] = FlipClock.Lang.Italian),
      (FlipClock.Lang.italian = FlipClock.Lang.Italian);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Latvian = {
      years: "Gadi",
      months: "Mēneši",
      days: "Dienas",
      hours: "Stundas",
      minutes: "Minūtes",
      seconds: "Sekundes"
    }),
      (FlipClock.Lang.lv = FlipClock.Lang.Latvian),
      (FlipClock.Lang["lv-lv"] = FlipClock.Lang.Latvian),
      (FlipClock.Lang.latvian = FlipClock.Lang.Latvian);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Dutch = {
      years: "Jaren",
      months: "Maanden",
      days: "Dagen",
      hours: "Uren",
      minutes: "Minuten",
      seconds: "Seconden"
    }),
      (FlipClock.Lang.nl = FlipClock.Lang.Dutch),
      (FlipClock.Lang["nl-be"] = FlipClock.Lang.Dutch),
      (FlipClock.Lang.dutch = FlipClock.Lang.Dutch);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Norwegian = {
      years: "År",
      months: "Måneder",
      days: "Dager",
      hours: "Timer",
      minutes: "Minutter",
      seconds: "Sekunder"
    }),
      (FlipClock.Lang.no = FlipClock.Lang.Norwegian),
      (FlipClock.Lang.nb = FlipClock.Lang.Norwegian),
      (FlipClock.Lang["no-nb"] = FlipClock.Lang.Norwegian),
      (FlipClock.Lang.norwegian = FlipClock.Lang.Norwegian);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Portuguese = {
      years: "Anos",
      months: "Meses",
      days: "Dias",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos"
    }),
      (FlipClock.Lang.pt = FlipClock.Lang.Portuguese),
      (FlipClock.Lang["pt-br"] = FlipClock.Lang.Portuguese),
      (FlipClock.Lang.portuguese = FlipClock.Lang.Portuguese);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Russian = {
      years: "лет",
      months: "месяцев",
      days: "дней",
      hours: "часов",
      minutes: "минут",
      seconds: "секунд"
    }),
      (FlipClock.Lang.ru = FlipClock.Lang.Russian),
      (FlipClock.Lang["ru-ru"] = FlipClock.Lang.Russian),
      (FlipClock.Lang.russian = FlipClock.Lang.Russian);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Swedish = {
      years: "År",
      months: "Månader",
      days: "Dagar",
      hours: "Timmar",
      minutes: "Minuter",
      seconds: "Sekunder"
    }),
      (FlipClock.Lang.sv = FlipClock.Lang.Swedish),
      (FlipClock.Lang["sv-se"] = FlipClock.Lang.Swedish),
      (FlipClock.Lang.swedish = FlipClock.Lang.Swedish);
  })(jQuery),
  (function(a) {
    (FlipClock.Lang.Chinese = {
      years: "年",
      months: "月",
      days: "日",
      hours: "时",
      minutes: "分",
      seconds: "秒"
    }),
      (FlipClock.Lang.zh = FlipClock.Lang.Chinese),
      (FlipClock.Lang["zh-cn"] = FlipClock.Lang.Chinese),
      (FlipClock.Lang.chinese = FlipClock.Lang.Chinese);
  })(jQuery);
/*change var dt1 date to end date*/
document.addEventListener("touchstart", function() {}, false);
(function($) {
  "use strict";
  var dt = new Date();
  var dtc = "01/01/2024 00:00:00";
  
  var cts = Math.ceil(new Date().getTime() / 1000);
  var dtClock1 = Math.ceil(new Date(dtc).getTime(dt) / 1000);
  
  var flipTimeboxSeconds1 = Math.ceil(dtClock1 - cts);
  
  var dtClock2 = Math.ceil(new Date().getTime() / 1000);
  var flipTimeboxSeconds2 = Math.ceil(dtClock2 - cts);
  var flipTimeboxSeconds24hours = 3600 * 24;
  var flipclock1;
  var opts1 = {
    clockFace: "DailyCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        $(".flipclock1message").html("");
      }
    }
  };
  $(".flipclock1").FlipClock(flipTimeboxSeconds1, opts1);
  var flipclock2;
  var opts2 = {
    clockFace: "DailyCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        $(".flipclock2message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock2").FlipClock(flipTimeboxSeconds2, opts2);
  var opts3 = {
    clockFace: "DailyCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        $(".flipclock3message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock3").FlipClock(flipTimeboxSeconds2, opts3);
  var opts4 = {
    clockFace: "DailyCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        $(".flipclock4message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock4").FlipClock(flipTimeboxSeconds2, opts4);
  FlipClock.Lang.Custom = {
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes"
  };
  var opts5 = {
    clockFace: "DailyCounter",
    countdown: true,
    language: "Custom",
    callbacks: {
      stop: function() {
        $(".flipclock5message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock5").FlipClock(flipTimeboxSeconds1, opts5);
  var flipclock6;
  var opts6 = {
    clockFace: "HourCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        $(".flipclock6message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock6").FlipClock(flipTimeboxSeconds2, opts6);
  var flipclock7;
  var opts7 = {
    clockFace: "HourCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        $(".flipclock7message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock7").FlipClock(flipTimeboxSeconds2, opts7);
  var flipclock8;
  var opts8 = {
    clockFace: "HourCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        $(".flipclock8message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock8").FlipClock(flipTimeboxSeconds24hours, opts8);
  var flipclock9;
  var opts9 = { clockFace: "TwelveHourClock" };
  $(".flipclock9").FlipClock(opts9);
  var flipclock10;
  var opts10 = { clockFace: "TwelveHourClock" };
  $(".flipclock10").FlipClock(opts10);
  var flipclock11;
  var opts11 = { clockFace: "TwelveHourClock" };
  $(".flipclock11").FlipClock(opts11);
  var flipclock12;
  var opts12 = { clockFace: "TwentyFourHourClock" };
  $(".flipclock12").FlipClock(opts12);
  var flipclock13;
  var opts13 = { clockFace: "MinuteCounter" };
  $(".flipclock13").FlipClock(opts13);
  var flipclock14;
  var opts14 = { clockFace: "MinuteCounter", countdown: true };
  $(".flipclock14").FlipClock(3600, opts14);
  var flipclock15;
  var opts15 = { clockFace: "MinuteCounter", countdown: true };
  $(".flipclock15").FlipClock(1800, opts15);
  var flipclock16 = $(".flipclock16").FlipClock(0, { clockFace: "Counter" });
  setTimeout(function() {
    setInterval(function() {
      flipclock16.increment();
    }, 1000);
  });
  var flipclock17 = $(".flipclock17").FlipClock(0, { clockFace: "Counter" });
  setTimeout(function() {
    setInterval(function() {
      flipclock17.increment();
    }, 1000);
  });
  var flipclock18 = $(".flipclock18").FlipClock(500, {
    clockFace: "Counter",
    countdown: true
  });
  setTimeout(function() {
    setInterval(function() {
      flipclock18.increment();
    }, 1000);
  });
  var flipclock19;
  var opts19 = {
    clockFace: "DailyCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        $(".flipclock19message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock19").FlipClock(flipTimeboxSeconds2, opts19);
  var flipclock20;
  var opts20 = {
    clockFace: "DailyCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        
        $(".flipclock20message").html("Time Up! It is Time to go Live!!!");
      }
    }
  };
  $(".flipclock20").FlipClock(flipTimeboxSeconds2, opts20);
  
  setInterval(() => {
    if (new Date(dtc).getTime() <= dt.getTime()) {
      $(".heading-title").html("Happy New Year 2024 !");
      
      setTimeout(() => {
        let container = document.querySelector("body");
        const fireworks = new Fireworks.default(container, {
          autoresize: true,
          opacity: 0.5,
          acceleration: 1.05,
          friction: 0.97,
          gravity: 1.5,
          particles: 20,
          traceLength: 3,
          traceSpeed: 10,
          explosion: 5,
          intensity: 30,
          flickering: 50,
          sound: {
            enabled: true,
            files: [
              './audios/explosion1.mp3',
              './audios/explosion2.mp3',
              './audios/explosion3.mp3'
            ],
            volume: {
              min: 4,
              max: 8
            }
          },
          lineStyle: 'round',
        });
        
        $(".loli-spin, .container").fadeOut();
        $("body").css("height", "100vh");
        $("body").css("width", "100%");
        fireworks.start();
      }, 500);
      
    }
  }, 1000);
})(jQuery);

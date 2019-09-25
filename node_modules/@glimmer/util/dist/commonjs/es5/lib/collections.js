"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StackImpl = exports.DictSet = undefined;
exports.dict = dict;
exports.isDict = isDict;
exports.isObject = isObject;

var _guid = require("./guid");

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function dict() {
    return Object.create(null);
}
function isDict(u) {
    return u !== null && u !== undefined;
}
function isObject(u) {
    return typeof u === 'object' && u !== null;
}
var DictSet = exports.DictSet = function () {
    function DictSet() {
        _classCallCheck(this, DictSet);

        this.dict = dict();
    }

    DictSet.prototype.add = function add(obj) {
        if (typeof obj === 'string') this.dict[obj] = obj;else this.dict[(0, _guid.ensureGuid)(obj)] = obj;
        return this;
    };

    DictSet.prototype.delete = function _delete(obj) {
        if (typeof obj === 'string') delete this.dict[obj];else if (obj._guid) delete this.dict[obj._guid];
    };

    return DictSet;
}();
var StackImpl = exports.StackImpl = function () {
    function StackImpl() {
        _classCallCheck(this, StackImpl);

        this.stack = [];
        this.current = null;
    }

    StackImpl.prototype.push = function push(item) {
        this.current = item;
        this.stack.push(item);
    };

    StackImpl.prototype.pop = function pop() {
        var item = this.stack.pop();
        var len = this.stack.length;
        this.current = len === 0 ? null : this.stack[len - 1];
        return item === undefined ? null : item;
    };

    StackImpl.prototype.nth = function nth(from) {
        var len = this.stack.length;
        return len < from ? null : this.stack[len - from];
    };

    StackImpl.prototype.isEmpty = function isEmpty() {
        return this.stack.length === 0;
    };

    StackImpl.prototype.toArray = function toArray() {
        return this.stack;
    };

    _createClass(StackImpl, [{
        key: 'size',
        get: function get() {
            return this.stack.length;
        }
    }]);

    return StackImpl;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3V0aWwvbGliL2NvbGxlY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztRQVNNLEksR0FBQSxJO1FBSUEsTSxHQUFBLE07UUFJQSxRLEdBQUEsUTs7QUFqQk47Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNNLFNBQUEsSUFBQSxHQUFjO0FBQ2xCLFdBQU8sT0FBQSxNQUFBLENBQVAsSUFBTyxDQUFQO0FBQ0Q7QUFFSyxTQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQXdCO0FBQzVCLFdBQU8sTUFBQSxJQUFBLElBQWMsTUFBckIsU0FBQTtBQUNEO0FBRUssU0FBQSxRQUFBLENBQUEsQ0FBQSxFQUEwQjtBQUM5QixXQUFPLE9BQUEsQ0FBQSxLQUFBLFFBQUEsSUFBeUIsTUFBaEMsSUFBQTtBQUNEO0FBSUQsSUFBQSw0QkFBQSxZQUFBO0FBR0UsYUFBQSxPQUFBLEdBQUE7QUFBQSx3QkFBQSxJQUFBLEVBQUEsT0FBQTs7QUFDRSxhQUFBLElBQUEsR0FBQSxNQUFBO0FBQ0Q7O0FBTEgsWUFBQSxTQUFBLENBQUEsR0FBQSxHQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsRUFPWTtBQUNSLFlBQUksT0FBQSxHQUFBLEtBQUosUUFBQSxFQUE2QixLQUFBLElBQUEsQ0FBQSxHQUFBLElBQTdCLEdBQTZCLENBQTdCLEtBQ0ssS0FBQSxJQUFBLENBQVUsc0JBQVYsR0FBVSxDQUFWLElBQUEsR0FBQTtBQUNMLGVBQUEsSUFBQTtBQVZKLEtBQUE7O0FBQUEsWUFBQSxTQUFBLENBQUEsTUFBQSxHQUFBLFNBQUEsT0FBQSxDQUFBLEdBQUEsRUFhZTtBQUNYLFlBQUksT0FBQSxHQUFBLEtBQUosUUFBQSxFQUE2QixPQUFPLEtBQUEsSUFBQSxDQUFwQyxHQUFvQyxDQUFQLENBQTdCLEtBQ0ssSUFBSyxJQUFMLEtBQUEsRUFBd0IsT0FBTyxLQUFBLElBQUEsQ0FBVyxJQUFsQixLQUFPLENBQVA7QUFmakMsS0FBQTs7QUFBQSxXQUFBLE9BQUE7QUFBQSxDQUFBLEVBQUE7QUFtQkEsSUFBQSxnQ0FBQSxZQUFBO0FBQUEsYUFBQSxTQUFBLEdBQUE7QUFBQSx3QkFBQSxJQUFBLEVBQUEsU0FBQTs7QUFDVSxhQUFBLEtBQUEsR0FBQSxFQUFBO0FBQ0QsYUFBQSxPQUFBLEdBQUEsSUFBQTtBQStCUjs7QUFqQ0QsY0FBQSxTQUFBLENBQUEsSUFBQSxHQUFBLFNBQUEsSUFBQSxDQUFBLElBQUEsRUFRYztBQUNWLGFBQUEsT0FBQSxHQUFBLElBQUE7QUFDQSxhQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQTtBQVZKLEtBQUE7O0FBQUEsY0FBQSxTQUFBLENBQUEsR0FBQSxHQUFBLFNBQUEsR0FBQSxHQWFLO0FBQ0QsWUFBSSxPQUFPLEtBQUEsS0FBQSxDQUFYLEdBQVcsRUFBWDtBQUNBLFlBQUksTUFBTSxLQUFBLEtBQUEsQ0FBVixNQUFBO0FBQ0EsYUFBQSxPQUFBLEdBQWUsUUFBQSxDQUFBLEdBQUEsSUFBQSxHQUFtQixLQUFBLEtBQUEsQ0FBVyxNQUE3QyxDQUFrQyxDQUFsQztBQUVBLGVBQU8sU0FBQSxTQUFBLEdBQUEsSUFBQSxHQUFQLElBQUE7QUFsQkosS0FBQTs7QUFBQSxjQUFBLFNBQUEsQ0FBQSxHQUFBLEdBQUEsU0FBQSxHQUFBLENBQUEsSUFBQSxFQXFCa0I7QUFDZCxZQUFJLE1BQU0sS0FBQSxLQUFBLENBQVYsTUFBQTtBQUNBLGVBQU8sTUFBQSxJQUFBLEdBQUEsSUFBQSxHQUFvQixLQUFBLEtBQUEsQ0FBVyxNQUF0QyxJQUEyQixDQUEzQjtBQXZCSixLQUFBOztBQUFBLGNBQUEsU0FBQSxDQUFBLE9BQUEsR0FBQSxTQUFBLE9BQUEsR0EwQlM7QUFDTCxlQUFPLEtBQUEsS0FBQSxDQUFBLE1BQUEsS0FBUCxDQUFBO0FBM0JKLEtBQUE7O0FBQUEsY0FBQSxTQUFBLENBQUEsT0FBQSxHQUFBLFNBQUEsT0FBQSxHQThCUztBQUNMLGVBQU8sS0FBUCxLQUFBO0FBL0JKLEtBQUE7O0FBQUEsaUJBQUEsU0FBQSxFQUFBLENBQUE7QUFBQSxhQUFBLE1BQUE7QUFBQSxhQUFBLFNBQUEsR0FBQSxHQUlpQjtBQUNiLG1CQUFPLEtBQUEsS0FBQSxDQUFQLE1BQUE7QUFDRDtBQU5ILEtBQUEsQ0FBQTs7QUFBQSxXQUFBLFNBQUE7QUFBQSxDQUFBLEVBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYXNHdWlkLCBlbnN1cmVHdWlkIH0gZnJvbSAnLi9ndWlkJztcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vcGxhdGZvcm0tdXRpbHMnO1xuaW1wb3J0IHsgRGljdCwgU3RhY2sgfSBmcm9tICdAZ2xpbW1lci9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGludGVyZmFjZSBTZXQ8VD4ge1xuICBhZGQodmFsdWU6IFQpOiBTZXQ8VD47XG4gIGRlbGV0ZSh2YWx1ZTogVCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWN0PFQgPSB1bmtub3duPigpOiBEaWN0PFQ+IHtcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpY3Q8VD4odTogVCk6IHUgaXMgRGljdCAmIFQge1xuICByZXR1cm4gdSAhPT0gbnVsbCAmJiB1ICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdDxUPih1OiBUKTogdSBpcyBvYmplY3QgJiBUIHtcbiAgcmV0dXJuIHR5cGVvZiB1ID09PSAnb2JqZWN0JyAmJiB1ICE9PSBudWxsO1xufVxuXG5leHBvcnQgdHlwZSBTZXRNZW1iZXIgPSBIYXNHdWlkIHwgc3RyaW5nO1xuXG5leHBvcnQgY2xhc3MgRGljdFNldDxUIGV4dGVuZHMgU2V0TWVtYmVyPiBpbXBsZW1lbnRzIFNldDxUPiB7XG4gIHByaXZhdGUgZGljdDogRGljdDxUPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRpY3QgPSBkaWN0PFQ+KCk7XG4gIH1cblxuICBhZGQob2JqOiBUKTogU2V0PFQ+IHtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHRoaXMuZGljdFtvYmogYXMgYW55XSA9IG9iajtcbiAgICBlbHNlIHRoaXMuZGljdFtlbnN1cmVHdWlkKG9iaiBhcyBhbnkpXSA9IG9iajtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRlbGV0ZShvYmo6IFQpIHtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIGRlbGV0ZSB0aGlzLmRpY3Rbb2JqIGFzIGFueV07XG4gICAgZWxzZSBpZiAoKG9iaiBhcyBhbnkpLl9ndWlkKSBkZWxldGUgdGhpcy5kaWN0WyhvYmogYXMgYW55KS5fZ3VpZF07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0YWNrSW1wbDxUPiBpbXBsZW1lbnRzIFN0YWNrPFQ+IHtcbiAgcHJpdmF0ZSBzdGFjazogVFtdID0gW107XG4gIHB1YmxpYyBjdXJyZW50OiBPcHRpb248VD4gPSBudWxsO1xuXG4gIHB1YmxpYyBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFjay5sZW5ndGg7XG4gIH1cblxuICBwdXNoKGl0ZW06IFQpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBpdGVtO1xuICAgIHRoaXMuc3RhY2sucHVzaChpdGVtKTtcbiAgfVxuXG4gIHBvcCgpOiBPcHRpb248VD4ge1xuICAgIGxldCBpdGVtID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICBsZXQgbGVuID0gdGhpcy5zdGFjay5sZW5ndGg7XG4gICAgdGhpcy5jdXJyZW50ID0gbGVuID09PSAwID8gbnVsbCA6IHRoaXMuc3RhY2tbbGVuIC0gMV07XG5cbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGl0ZW07XG4gIH1cblxuICBudGgoZnJvbTogbnVtYmVyKTogT3B0aW9uPFQ+IHtcbiAgICBsZXQgbGVuID0gdGhpcy5zdGFjay5sZW5ndGg7XG4gICAgcmV0dXJuIGxlbiA8IGZyb20gPyBudWxsIDogdGhpcy5zdGFja1tsZW4gLSBmcm9tXTtcbiAgfVxuXG4gIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhY2subGVuZ3RoID09PSAwO1xuICB9XG5cbiAgdG9BcnJheSgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLnN0YWNrO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
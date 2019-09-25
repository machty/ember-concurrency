var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { ensureGuid } from './guid';
export function dict() {
    return Object.create(null);
}
export function isDict(u) {
    return u !== null && u !== undefined;
}
export function isObject(u) {
    return typeof u === 'object' && u !== null;
}
export var DictSet = function () {
    function DictSet() {
        _classCallCheck(this, DictSet);

        this.dict = dict();
    }

    DictSet.prototype.add = function add(obj) {
        if (typeof obj === 'string') this.dict[obj] = obj;else this.dict[ensureGuid(obj)] = obj;
        return this;
    };

    DictSet.prototype.delete = function _delete(obj) {
        if (typeof obj === 'string') delete this.dict[obj];else if (obj._guid) delete this.dict[obj._guid];
    };

    return DictSet;
}();
export var StackImpl = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3V0aWwvbGliL2NvbGxlY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxTQUFBLFVBQUEsUUFBQSxRQUFBO0FBU0EsT0FBTSxTQUFBLElBQUEsR0FBYztBQUNsQixXQUFPLE9BQUEsTUFBQSxDQUFQLElBQU8sQ0FBUDtBQUNEO0FBRUQsT0FBTSxTQUFBLE1BQUEsQ0FBQSxDQUFBLEVBQXdCO0FBQzVCLFdBQU8sTUFBQSxJQUFBLElBQWMsTUFBckIsU0FBQTtBQUNEO0FBRUQsT0FBTSxTQUFBLFFBQUEsQ0FBQSxDQUFBLEVBQTBCO0FBQzlCLFdBQU8sT0FBQSxDQUFBLEtBQUEsUUFBQSxJQUF5QixNQUFoQyxJQUFBO0FBQ0Q7QUFJRCxXQUFNLE9BQU47QUFHRSx1QkFBQTtBQUFBOztBQUNFLGFBQUEsSUFBQSxHQUFBLE1BQUE7QUFDRDs7QUFMSCxzQkFPRSxHQVBGLGdCQU9FLEdBUEYsRUFPWTtBQUNSLFlBQUksT0FBQSxHQUFBLEtBQUosUUFBQSxFQUE2QixLQUFBLElBQUEsQ0FBQSxHQUFBLElBQTdCLEdBQTZCLENBQTdCLEtBQ0ssS0FBQSxJQUFBLENBQVUsV0FBVixHQUFVLENBQVYsSUFBQSxHQUFBO0FBQ0wsZUFBQSxJQUFBO0FBQ0QsS0FYSDs7QUFBQSxzQkFhRSxNQWJGLG9CQWFFLEdBYkYsRUFhZTtBQUNYLFlBQUksT0FBQSxHQUFBLEtBQUosUUFBQSxFQUE2QixPQUFPLEtBQUEsSUFBQSxDQUFwQyxHQUFvQyxDQUFQLENBQTdCLEtBQ0ssSUFBSyxJQUFMLEtBQUEsRUFBd0IsT0FBTyxLQUFBLElBQUEsQ0FBVyxJQUFsQixLQUFPLENBQVA7QUFDOUIsS0FoQkg7O0FBQUE7QUFBQTtBQW1CQSxXQUFNLFNBQU47QUFBQSx5QkFBQTtBQUFBOztBQUNVLGFBQUEsS0FBQSxHQUFBLEVBQUE7QUFDRCxhQUFBLE9BQUEsR0FBQSxJQUFBO0FBK0JSOztBQWpDRCx3QkFRRSxJQVJGLGlCQVFFLElBUkYsRUFRYztBQUNWLGFBQUEsT0FBQSxHQUFBLElBQUE7QUFDQSxhQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQTtBQUNELEtBWEg7O0FBQUEsd0JBYUUsR0FiRixrQkFhSztBQUNELFlBQUksT0FBTyxLQUFBLEtBQUEsQ0FBWCxHQUFXLEVBQVg7QUFDQSxZQUFJLE1BQU0sS0FBQSxLQUFBLENBQVYsTUFBQTtBQUNBLGFBQUEsT0FBQSxHQUFlLFFBQUEsQ0FBQSxHQUFBLElBQUEsR0FBbUIsS0FBQSxLQUFBLENBQVcsTUFBN0MsQ0FBa0MsQ0FBbEM7QUFFQSxlQUFPLFNBQUEsU0FBQSxHQUFBLElBQUEsR0FBUCxJQUFBO0FBQ0QsS0FuQkg7O0FBQUEsd0JBcUJFLEdBckJGLGdCQXFCRSxJQXJCRixFQXFCa0I7QUFDZCxZQUFJLE1BQU0sS0FBQSxLQUFBLENBQVYsTUFBQTtBQUNBLGVBQU8sTUFBQSxJQUFBLEdBQUEsSUFBQSxHQUFvQixLQUFBLEtBQUEsQ0FBVyxNQUF0QyxJQUEyQixDQUEzQjtBQUNELEtBeEJIOztBQUFBLHdCQTBCRSxPQTFCRixzQkEwQlM7QUFDTCxlQUFPLEtBQUEsS0FBQSxDQUFBLE1BQUEsS0FBUCxDQUFBO0FBQ0QsS0E1Qkg7O0FBQUEsd0JBOEJFLE9BOUJGLHNCQThCUztBQUNMLGVBQU8sS0FBUCxLQUFBO0FBQ0QsS0FoQ0g7O0FBQUE7QUFBQTtBQUFBLDRCQUlpQjtBQUNiLG1CQUFPLEtBQUEsS0FBQSxDQUFQLE1BQUE7QUFDRDtBQU5IOztBQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYXNHdWlkLCBlbnN1cmVHdWlkIH0gZnJvbSAnLi9ndWlkJztcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vcGxhdGZvcm0tdXRpbHMnO1xuaW1wb3J0IHsgRGljdCwgU3RhY2sgfSBmcm9tICdAZ2xpbW1lci9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGludGVyZmFjZSBTZXQ8VD4ge1xuICBhZGQodmFsdWU6IFQpOiBTZXQ8VD47XG4gIGRlbGV0ZSh2YWx1ZTogVCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWN0PFQgPSB1bmtub3duPigpOiBEaWN0PFQ+IHtcbiAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpY3Q8VD4odTogVCk6IHUgaXMgRGljdCAmIFQge1xuICByZXR1cm4gdSAhPT0gbnVsbCAmJiB1ICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdDxUPih1OiBUKTogdSBpcyBvYmplY3QgJiBUIHtcbiAgcmV0dXJuIHR5cGVvZiB1ID09PSAnb2JqZWN0JyAmJiB1ICE9PSBudWxsO1xufVxuXG5leHBvcnQgdHlwZSBTZXRNZW1iZXIgPSBIYXNHdWlkIHwgc3RyaW5nO1xuXG5leHBvcnQgY2xhc3MgRGljdFNldDxUIGV4dGVuZHMgU2V0TWVtYmVyPiBpbXBsZW1lbnRzIFNldDxUPiB7XG4gIHByaXZhdGUgZGljdDogRGljdDxUPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRpY3QgPSBkaWN0PFQ+KCk7XG4gIH1cblxuICBhZGQob2JqOiBUKTogU2V0PFQ+IHtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHRoaXMuZGljdFtvYmogYXMgYW55XSA9IG9iajtcbiAgICBlbHNlIHRoaXMuZGljdFtlbnN1cmVHdWlkKG9iaiBhcyBhbnkpXSA9IG9iajtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRlbGV0ZShvYmo6IFQpIHtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIGRlbGV0ZSB0aGlzLmRpY3Rbb2JqIGFzIGFueV07XG4gICAgZWxzZSBpZiAoKG9iaiBhcyBhbnkpLl9ndWlkKSBkZWxldGUgdGhpcy5kaWN0WyhvYmogYXMgYW55KS5fZ3VpZF07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0YWNrSW1wbDxUPiBpbXBsZW1lbnRzIFN0YWNrPFQ+IHtcbiAgcHJpdmF0ZSBzdGFjazogVFtdID0gW107XG4gIHB1YmxpYyBjdXJyZW50OiBPcHRpb248VD4gPSBudWxsO1xuXG4gIHB1YmxpYyBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFjay5sZW5ndGg7XG4gIH1cblxuICBwdXNoKGl0ZW06IFQpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBpdGVtO1xuICAgIHRoaXMuc3RhY2sucHVzaChpdGVtKTtcbiAgfVxuXG4gIHBvcCgpOiBPcHRpb248VD4ge1xuICAgIGxldCBpdGVtID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICBsZXQgbGVuID0gdGhpcy5zdGFjay5sZW5ndGg7XG4gICAgdGhpcy5jdXJyZW50ID0gbGVuID09PSAwID8gbnVsbCA6IHRoaXMuc3RhY2tbbGVuIC0gMV07XG5cbiAgICByZXR1cm4gaXRlbSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGl0ZW07XG4gIH1cblxuICBudGgoZnJvbTogbnVtYmVyKTogT3B0aW9uPFQ+IHtcbiAgICBsZXQgbGVuID0gdGhpcy5zdGFjay5sZW5ndGg7XG4gICAgcmV0dXJuIGxlbiA8IGZyb20gPyBudWxsIDogdGhpcy5zdGFja1tsZW4gLSBmcm9tXTtcbiAgfVxuXG4gIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhY2subGVuZ3RoID09PSAwO1xuICB9XG5cbiAgdG9BcnJheSgpOiBUW10ge1xuICAgIHJldHVybiB0aGlzLnN0YWNrO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
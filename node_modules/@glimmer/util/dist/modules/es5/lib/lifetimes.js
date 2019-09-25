var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { isDestroyable, isStringDestroyable, DESTROY } from './destroy';

export var LINKED = new WeakMap();
export var DROP = 'DROP [94d46cf3-3974-435d-b278-3e60d1155290]';
export var CHILDREN = 'CHILDREN [7142e52a-8600-4e01-a773-42055b96630d]';
export var DESTRUCTORS = new WeakMap();
export function isDrop(value) {
    if (value === null || typeof value !== 'object') return false;
    return DROP in value;
}
export function associate(parent, child) {
    associateDestructor(parent, destructor(child));
}
export function associateDestructor(parent, child) {
    var associated = LINKED.get(parent);
    if (!associated) {
        associated = new Set();
        LINKED.set(parent, associated);
    }
    associated.add(child);
}
export function takeAssociated(parent) {
    var linked = LINKED.get(parent);
    if (linked && linked.size > 0) {
        LINKED.delete(parent);
        return linked;
    } else {
        return null;
    }
}
export function destroyAssociated(parent) {
    var associated = LINKED.get(parent);
    if (associated) {
        associated.forEach(function (item) {
            item[DROP]();
            associated.delete(item);
        });
    }
}
export function destructor(value) {
    var d = DESTRUCTORS.get(value);
    if (!d) {
        if (isDestroyable(value)) {
            d = new DestroyableDestructor(value);
        } else if (isStringDestroyable(value)) {
            d = new StringDestroyableDestructor(value);
        } else {
            d = new SimpleDestructor(value);
        }
        DESTRUCTORS.set(value, d);
    }
    return d;
}
export function snapshot(values) {
    return new SnapshotDestructor(values);
}

var SnapshotDestructor = function () {
    function SnapshotDestructor(destructors) {
        _classCallCheck(this, SnapshotDestructor);

        this.destructors = destructors;
    }

    SnapshotDestructor.prototype[DROP] = function () {
        this.destructors.forEach(function (item) {
            return item[DROP]();
        });
    };

    SnapshotDestructor.prototype.toString = function toString() {
        return 'SnapshotDestructor';
    };

    _createClass(SnapshotDestructor, [{
        key: CHILDREN,
        get: function get() {
            return this.destructors;
        }
    }]);

    return SnapshotDestructor;
}();

var DestroyableDestructor = function () {
    function DestroyableDestructor(inner) {
        _classCallCheck(this, DestroyableDestructor);

        this.inner = inner;
    }

    DestroyableDestructor.prototype[DROP] = function () {
        this.inner[DESTROY]();
        destroyAssociated(this.inner);
    };

    DestroyableDestructor.prototype.toString = function toString() {
        return 'DestroyableDestructor';
    };

    _createClass(DestroyableDestructor, [{
        key: CHILDREN,
        get: function get() {
            return LINKED.get(this.inner) || [];
        }
    }]);

    return DestroyableDestructor;
}();

var StringDestroyableDestructor = function () {
    function StringDestroyableDestructor(inner) {
        _classCallCheck(this, StringDestroyableDestructor);

        this.inner = inner;
    }

    StringDestroyableDestructor.prototype[DROP] = function () {
        this.inner.destroy();
        destroyAssociated(this.inner);
    };

    StringDestroyableDestructor.prototype.toString = function toString() {
        return 'StringDestroyableDestructor';
    };

    _createClass(StringDestroyableDestructor, [{
        key: CHILDREN,
        get: function get() {
            return LINKED.get(this.inner) || [];
        }
    }]);

    return StringDestroyableDestructor;
}();

var SimpleDestructor = function () {
    function SimpleDestructor(inner) {
        _classCallCheck(this, SimpleDestructor);

        this.inner = inner;
    }

    SimpleDestructor.prototype[DROP] = function () {
        destroyAssociated(this.inner);
    };

    SimpleDestructor.prototype.toString = function toString() {
        return 'SimpleDestructor';
    };

    _createClass(SimpleDestructor, [{
        key: CHILDREN,
        get: function get() {
            return LINKED.get(this.inner) || [];
        }
    }]);

    return SimpleDestructor;
}();

export var ListContentsDestructor = function () {
    function ListContentsDestructor(inner) {
        _classCallCheck(this, ListContentsDestructor);

        this.inner = inner;
    }

    ListContentsDestructor.prototype[DROP] = function () {
        this.inner.forEachNode(function (d) {
            return destructor(d)[DROP]();
        });
    };

    ListContentsDestructor.prototype.toString = function toString() {
        return 'ListContentsDestructor';
    };

    _createClass(ListContentsDestructor, [{
        key: CHILDREN,
        get: function get() {
            var out = [];
            this.inner.forEachNode(function (d) {
                return out.push.apply(out, destructor(d)[CHILDREN]);
            });
            return out;
        }
    }]);

    return ListContentsDestructor;
}();
export function debugDropTree(inner) {
    var hasDrop = isDrop(inner);
    var rawChildren = LINKED.get(inner) || null;
    var children = null;
    if (rawChildren) {
        children = [];
        for (var _iterator = rawChildren, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var child = _ref;

            children.push(debugDropTree(child));
        }
    }
    var obj = Object.create(null);
    obj.inner = inner;
    if (children) {
        obj.children = children;
    }
    obj.hasDrop = hasDrop;
    return obj;
}
export function printDropTree(inner) {
    printDrop(destructor(inner));
}
export function printDrop(inner) {
    console.group(String(inner));
    console.log(inner);
    var children = inner[CHILDREN] || null;
    if (children) {
        for (var _iterator2 = children, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var child = _ref2;

            printDrop(child);
        }
    }
    console.groupEnd();
}
if (false && typeof window !== 'undefined') {
    window.PRINT_DROP = printDropTree;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3V0aWwvbGliL2xpZmV0aW1lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsU0FBQSxhQUFBLEVBQUEsbUJBQUEsRUFBQSxPQUFBLFFBQUEsV0FBQTs7QUFZQSxPQUFPLElBQU0sU0FBcUMsSUFBM0MsT0FBMkMsRUFBM0M7QUFDUCxPQUFPLElBQU0sT0FBTiw2Q0FBQTtBQUNQLE9BQU8sSUFBTSxXQUFOLGlEQUFBO0FBQ1AsT0FBTyxJQUFNLGNBQWMsSUFBcEIsT0FBb0IsRUFBcEI7QUFFUCxPQUFNLFNBQUEsTUFBQSxDQUFBLEtBQUEsRUFBK0I7QUFDbkMsUUFBSSxVQUFBLElBQUEsSUFBa0IsT0FBQSxLQUFBLEtBQXRCLFFBQUEsRUFBaUQsT0FBQSxLQUFBO0FBQ2pELFdBQU8sUUFBUCxLQUFBO0FBQ0Q7QUFFRCxPQUFNLFNBQUEsU0FBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLEVBQWlEO0FBQ3JELHdCQUFBLE1BQUEsRUFBNEIsV0FBNUIsS0FBNEIsQ0FBNUI7QUFDRDtBQUVELE9BQU0sU0FBQSxtQkFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLEVBQXlEO0FBQzdELFFBQUksYUFBYSxPQUFBLEdBQUEsQ0FBakIsTUFBaUIsQ0FBakI7QUFFQSxRQUFJLENBQUosVUFBQSxFQUFpQjtBQUNmLHFCQUFhLElBQWIsR0FBYSxFQUFiO0FBQ0EsZUFBQSxHQUFBLENBQUEsTUFBQSxFQUFBLFVBQUE7QUFDRDtBQUVELGVBQUEsR0FBQSxDQUFBLEtBQUE7QUFDRDtBQUVELE9BQU0sU0FBQSxjQUFBLENBQUEsTUFBQSxFQUF1QztBQUMzQyxRQUFJLFNBQVMsT0FBQSxHQUFBLENBQWIsTUFBYSxDQUFiO0FBRUEsUUFBSSxVQUFVLE9BQUEsSUFBQSxHQUFkLENBQUEsRUFBK0I7QUFDN0IsZUFBQSxNQUFBLENBQUEsTUFBQTtBQUNBLGVBQUEsTUFBQTtBQUZGLEtBQUEsTUFHTztBQUNMLGVBQUEsSUFB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QUEsS0FBZixJQUFBO0FBQ0EsUUFBQSxRQUFBLEVBQWM7QUFDWiw4QkFBQSxRQUFBLHlIQUE0QjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBQTVCLEtBQTRCOztBQUMxQixzQkFBQSxLQUFBO0FBQ0Q7QUFDRjtBQUVELFlBQUEsUUFBQTtBQUNEO0FBRUQsSUFBSSxTQUFXLE9BQUEsTUFBQSxLQUFmLFdBQUEsRUFBOEM7QUFDM0MsV0FBQSxVQUFBLEdBQUEsYUFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEZXN0cm95YWJsZSwgaXNTdHJpbmdEZXN0cm95YWJsZSwgREVTVFJPWSB9IGZyb20gJy4vZGVzdHJveSc7XG5pbXBvcnQge1xuICBPcHRpb24sXG4gIFN5bWJvbERlc3Ryb3lhYmxlLFxuICBEZXN0cm95YWJsZSxcbiAgRHJvcCxcbiAgRHJvcFN5bWJvbCxcbiAgQ2hpbGRyZW5TeW1ib2wsXG59IGZyb20gJ0BnbGltbWVyL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTGlua2VkTGlzdCwgTGlua2VkTGlzdE5vZGUgfSBmcm9tICcuL2xpc3QtdXRpbHMnO1xuaW1wb3J0IHsgREVWTU9ERSB9IGZyb20gJ0BnbGltbWVyL2xvY2FsLWRlYnVnLWZsYWdzJztcblxuZXhwb3J0IGNvbnN0IExJTktFRDogV2Vha01hcDxvYmplY3QsIFNldDxEcm9wPj4gPSBuZXcgV2Vha01hcCgpO1xuZXhwb3J0IGNvbnN0IERST1A6IERyb3BTeW1ib2wgPSAnRFJPUCBbOTRkNDZjZjMtMzk3NC00MzVkLWIyNzgtM2U2MGQxMTU1MjkwXSc7XG5leHBvcnQgY29uc3QgQ0hJTERSRU46IENoaWxkcmVuU3ltYm9sID0gJ0NISUxEUkVOIFs3MTQyZTUyYS04NjAwLTRlMDEtYTc3My00MjA1NWI5NjYzMGRdJztcbmV4cG9ydCBjb25zdCBERVNUUlVDVE9SUyA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Ryb3AodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBEcm9wIHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIERST1AgaW4gKHZhbHVlIGFzIG9iamVjdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NvY2lhdGUocGFyZW50OiBvYmplY3QsIGNoaWxkOiBvYmplY3QpIHtcbiAgYXNzb2NpYXRlRGVzdHJ1Y3RvcihwYXJlbnQsIGRlc3RydWN0b3IoY2hpbGQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc29jaWF0ZURlc3RydWN0b3IocGFyZW50OiBvYmplY3QsIGNoaWxkOiBEcm9wKTogdm9pZCB7XG4gIGxldCBhc3NvY2lhdGVkID0gTElOS0VELmdldChwYXJlbnQpO1xuXG4gIGlmICghYXNzb2NpYXRlZCkge1xuICAgIGFzc29jaWF0ZWQgPSBuZXcgU2V0KCk7XG4gICAgTElOS0VELnNldChwYXJlbnQsIGFzc29jaWF0ZWQpO1xuICB9XG5cbiAgYXNzb2NpYXRlZC5hZGQoY2hpbGQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFrZUFzc29jaWF0ZWQocGFyZW50OiBvYmplY3QpOiBPcHRpb248U2V0PERyb3A+PiB7XG4gIGxldCBsaW5rZWQgPSBMSU5LRUQuZ2V0KHBhcmVudCk7XG5cbiAgaWYgKGxpbmtlZCAmJiBsaW5rZWQuc2l6ZSA+IDApIHtcbiAgICBMSU5LRUQuZGVsZXRlKHBhcmVudCk7XG4gICAgcmV0dXJuIGxpbmtlZDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUFzc29jaWF0ZWQocGFyZW50OiBvYmplY3QpIHtcbiAgbGV0IGFzc29jaWF0ZWQgPSBMSU5LRUQuZ2V0KHBhcmVudCk7XG5cbiAgaWYgKGFzc29jaWF0ZWQpIHtcbiAgICBhc3NvY2lhdGVkLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtW0RST1BdKCk7XG4gICAgICBhc3NvY2lhdGVkIS5kZWxldGUoaXRlbSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3RydWN0b3IodmFsdWU6IG9iamVjdCk6IERyb3Age1xuICBsZXQgZCA9IERFU1RSVUNUT1JTLmdldCh2YWx1ZSk7XG5cbiAgaWYgKCFkKSB7XG4gICAgaWYgKGlzRGVzdHJveWFibGUodmFsdWUpKSB7XG4gICAgICBkID0gbmV3IERlc3Ryb3lhYmxlRGVzdHJ1Y3Rvcih2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChpc1N0cmluZ0Rlc3Ryb3lhYmxlKHZhbHVlKSkge1xuICAgICAgZCA9IG5ldyBTdHJpbmdEZXN0cm95YWJsZURlc3RydWN0b3IodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkID0gbmV3IFNpbXBsZURlc3RydWN0b3IodmFsdWUpO1xuICAgIH1cblxuICAgIERFU1RSVUNUT1JTLnNldCh2YWx1ZSwgZCk7XG4gIH1cblxuICByZXR1cm4gZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNuYXBzaG90KHZhbHVlczogU2V0PERyb3A+KTogRHJvcCB7XG4gIHJldHVybiBuZXcgU25hcHNob3REZXN0cnVjdG9yKHZhbHVlcyk7XG59XG5cbmNsYXNzIFNuYXBzaG90RGVzdHJ1Y3RvciBpbXBsZW1lbnRzIERyb3Age1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlc3RydWN0b3JzOiBTZXQ8RHJvcD4pIHt9XG5cbiAgW0RST1BdKCkge1xuICAgIHRoaXMuZGVzdHJ1Y3RvcnMuZm9yRWFjaChpdGVtID0+IGl0ZW1bRFJPUF0oKSk7XG4gIH1cblxuICBnZXQgW0NISUxEUkVOXSgpOiBJdGVyYWJsZTxEcm9wPiB7XG4gICAgcmV0dXJuIHRoaXMuZGVzdHJ1Y3RvcnM7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ1NuYXBzaG90RGVzdHJ1Y3Rvcic7XG4gIH1cbn1cblxuY2xhc3MgRGVzdHJveWFibGVEZXN0cnVjdG9yIGltcGxlbWVudHMgRHJvcCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5uZXI6IFN5bWJvbERlc3Ryb3lhYmxlKSB7fVxuXG4gIFtEUk9QXSgpIHtcbiAgICB0aGlzLmlubmVyW0RFU1RST1ldKCk7XG4gICAgZGVzdHJveUFzc29jaWF0ZWQodGhpcy5pbm5lcik7XG4gIH1cblxuICBnZXQgW0NISUxEUkVOXSgpOiBJdGVyYWJsZTxEcm9wPiB7XG4gICAgcmV0dXJuIExJTktFRC5nZXQodGhpcy5pbm5lcikgfHwgW107XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ0Rlc3Ryb3lhYmxlRGVzdHJ1Y3Rvcic7XG4gIH1cbn1cblxuY2xhc3MgU3RyaW5nRGVzdHJveWFibGVEZXN0cnVjdG9yIGltcGxlbWVudHMgRHJvcCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5uZXI6IERlc3Ryb3lhYmxlKSB7fVxuXG4gIFtEUk9QXSgpIHtcbiAgICB0aGlzLmlubmVyLmRlc3Ryb3koKTtcbiAgICBkZXN0cm95QXNzb2NpYXRlZCh0aGlzLmlubmVyKTtcbiAgfVxuXG4gIGdldCBbQ0hJTERSRU5dKCk6IEl0ZXJhYmxlPERyb3A+IHtcbiAgICByZXR1cm4gTElOS0VELmdldCh0aGlzLmlubmVyKSB8fCBbXTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnU3RyaW5nRGVzdHJveWFibGVEZXN0cnVjdG9yJztcbiAgfVxufVxuXG5jbGFzcyBTaW1wbGVEZXN0cnVjdG9yIGltcGxlbWVudHMgRHJvcCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5uZXI6IG9iamVjdCkge31cblxuICBbRFJPUF0oKSB7XG4gICAgZGVzdHJveUFzc29jaWF0ZWQodGhpcy5pbm5lcik7XG4gIH1cblxuICBnZXQgW0NISUxEUkVOXSgpOiBJdGVyYWJsZTxEcm9wPiB7XG4gICAgcmV0dXJuIExJTktFRC5nZXQodGhpcy5pbm5lcikgfHwgW107XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ1NpbXBsZURlc3RydWN0b3InO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaXN0Q29udGVudHNEZXN0cnVjdG9yIGltcGxlbWVudHMgRHJvcCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5uZXI6IExpbmtlZExpc3Q8TGlua2VkTGlzdE5vZGU+KSB7fVxuXG4gIFtEUk9QXSgpIHtcbiAgICB0aGlzLmlubmVyLmZvckVhY2hOb2RlKGQgPT4gZGVzdHJ1Y3RvcihkKVtEUk9QXSgpKTtcbiAgfVxuXG4gIGdldCBbQ0hJTERSRU5dKCk6IEl0ZXJhYmxlPERyb3A+IHtcbiAgICBsZXQgb3V0OiBEcm9wW10gPSBbXTtcbiAgICB0aGlzLmlubmVyLmZvckVhY2hOb2RlKGQgPT4gb3V0LnB1c2goLi4uZGVzdHJ1Y3RvcihkKVtDSElMRFJFTl0pKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdMaXN0Q29udGVudHNEZXN0cnVjdG9yJztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlYnVnTm9kZSB7XG4gIGlubmVyOiBvYmplY3Q7XG4gIGNoaWxkcmVuOiBEZWJ1Z05vZGVbXSB8IG51bGw7XG4gIGhhc0Ryb3A6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1Z0Ryb3BUcmVlKGlubmVyOiBvYmplY3QpOiBEZWJ1Z05vZGUge1xuICBsZXQgaGFzRHJvcCA9IGlzRHJvcChpbm5lcik7XG4gIGxldCByYXdDaGlsZHJlbiA9IExJTktFRC5nZXQoaW5uZXIpIHx8IG51bGw7XG4gIGxldCBjaGlsZHJlbjogRGVidWdOb2RlW10gfCBudWxsID0gbnVsbDtcblxuICBpZiAocmF3Q2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbiA9IFtdO1xuICAgIGZvciAobGV0IGNoaWxkIG9mIHJhd0NoaWxkcmVuKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKGRlYnVnRHJvcFRyZWUoY2hpbGQpKTtcbiAgICB9XG4gIH1cblxuICBsZXQgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgb2JqLmlubmVyID0gaW5uZXI7XG4gIGlmIChjaGlsZHJlbikge1xuICAgIG9iai5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9XG4gIG9iai5oYXNEcm9wID0gaGFzRHJvcDtcbiAgcmV0dXJuIG9iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50RHJvcFRyZWUoaW5uZXI6IG9iamVjdCkge1xuICBwcmludERyb3AoZGVzdHJ1Y3Rvcihpbm5lcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnREcm9wKGlubmVyOiBEcm9wKSB7XG4gIGNvbnNvbGUuZ3JvdXAoU3RyaW5nKGlubmVyKSk7XG5cbiAgY29uc29sZS5sb2coaW5uZXIpO1xuXG4gIGxldCBjaGlsZHJlbiA9IGlubmVyW0NISUxEUkVOXSB8fCBudWxsO1xuICBpZiAoY2hpbGRyZW4pIHtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgcHJpbnREcm9wKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICBjb25zb2xlLmdyb3VwRW5kKCk7XG59XG5cbmlmIChERVZNT0RFICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICh3aW5kb3cgYXMgYW55KS5QUklOVF9EUk9QID0gcHJpbnREcm9wVHJlZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
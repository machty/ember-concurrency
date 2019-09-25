"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListContentsDestructor = exports.DESTRUCTORS = exports.CHILDREN = exports.DROP = exports.LINKED = undefined;
exports.isDrop = isDrop;
exports.associate = associate;
exports.associateDestructor = associateDestructor;
exports.takeAssociated = takeAssociated;
exports.destroyAssociated = destroyAssociated;
exports.destructor = destructor;
exports.snapshot = snapshot;
exports.debugDropTree = debugDropTree;
exports.printDropTree = printDropTree;
exports.printDrop = printDrop;

var _destroy = require("./destroy");

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

var LINKED = exports.LINKED = new WeakMap();
var DROP = exports.DROP = 'DROP [94d46cf3-3974-435d-b278-3e60d1155290]';
var CHILDREN = exports.CHILDREN = 'CHILDREN [7142e52a-8600-4e01-a773-42055b96630d]';
var DESTRUCTORS = exports.DESTRUCTORS = new WeakMap();
function isDrop(value) {
    if (value === null || typeof value !== 'object') return false;
    return DROP in value;
}
function associate(parent, child) {
    associateDestructor(parent, destructor(child));
}
function associateDestructor(parent, child) {
    var associated = LINKED.get(parent);
    if (!associated) {
        associated = new Set();
        LINKED.set(parent, associated);
    }
    associated.add(child);
}
function takeAssociated(parent) {
    var linked = LINKED.get(parent);
    if (linked && linked.size > 0) {
        LINKED.delete(parent);
        return linked;
    } else {
        return null;
    }
}
function destroyAssociated(parent) {
    var associated = LINKED.get(parent);
    if (associated) {
        associated.forEach(function (item) {
            item[DROP]();
            associated.delete(item);
        });
    }
}
function destructor(value) {
    var d = DESTRUCTORS.get(value);
    if (!d) {
        if ((0, _destroy.isDestroyable)(value)) {
            d = new DestroyableDestructor(value);
        } else if ((0, _destroy.isStringDestroyable)(value)) {
            d = new StringDestroyableDestructor(value);
        } else {
            d = new SimpleDestructor(value);
        }
        DESTRUCTORS.set(value, d);
    }
    return d;
}
function snapshot(values) {
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
        this.inner[_destroy.DESTROY]();
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

var ListContentsDestructor = exports.ListContentsDestructor = function () {
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
function debugDropTree(inner) {
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
function printDropTree(inner) {
    printDrop(destructor(inner));
}
function printDrop(inner) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3V0aWwvbGliL2xpZmV0aW1lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7UUFpQk0sTSxHQUFBLE07UUFLQSxTLEdBQUEsUztRQUlBLG1CLEdBQUEsbUI7UUFXQSxjLEdBQUEsYztRQVdBLGlCLEdBQUEsaUI7UUFXQSxVLEdBQUEsVTtRQWtCQSxRLEdBQUEsUTtRQThGQSxhLEdBQUEsYTtRQXFCQSxhLEdBQUEsYTtRQUlBLFMsR0FBQSxTOztBQXBNTjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWU8sSUFBTSwwQkFBcUMsSUFBM0MsT0FBMkMsRUFBM0M7QUFDQSxJQUFNLHNCQUFOLDZDQUFBO0FBQ0EsSUFBTSw4QkFBTixpREFBQTtBQUNBLElBQU0sb0NBQWMsSUFBcEIsT0FBb0IsRUFBcEI7QUFFRCxTQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQStCO0FBQ25DLFFBQUksVUFBQSxJQUFBLElBQWtCLE9BQUEsS0FBQSxLQUF0QixRQUFBLEVBQWlELE9BQUEsS0FBQTtBQUNqRCxXQUFPLFFBQVAsS0FBQTtBQUNEO0FBRUssU0FBQSxTQUFBLENBQUEsTUFBQSxFQUFBLEtBQUEsRUFBaUQ7QUFDckQsd0JBQUEsTUFBQSxFQUE0QixXQUE1QixLQUE0QixDQUE1QjtBQUNEO0FBRUssU0FBQSxtQkFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLEVBQXlEO0FBQzdELFFBQUksYUFBYSxPQUFBLEdBQUEsQ0FBakIsTUFBaUIsQ0FBakI7QUFFQSxRQUFJLENBQUosVUFBQSxFQUFpQjtBQUNmLHFCQUFhLElBQWIsR0FBYSxFQUFiO0FBQ0EsZUFBQSxHQUFBLENBQUEsTUFBQSxFQUFBLFVBQUE7QUFDRDtBQUVELGVBQUEsR0FBQSxDQUFBLEtBQUE7QUFDRDtBQUVLLFNBQUEsY0FBQSxDQUFBLE1BQUEsRUFBdUM7QUFDM0MsUUFBSSxTQUFTLE9BQUEsR0FBQSxDQUFiLE1BQWEsQ0FBYjtBQUVBLFFBQUksVUFBVSxPQUFB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QUFBO0FBQUEsb0JBQUEsSUFBQSxJQUFBLEVBQUE7QUFBQSx3QkFBQSxJQUFBLEtBQUE7QUFBQTs7QUFBQSxnQkFBNUIsUUFBNEIsS0FBQTs7QUFDMUIsc0JBQUEsS0FBQTtBQUNEO0FBQ0Y7QUFFRCxZQUFBLFFBQUE7QUFDRDtBQUVELElBQUksU0FBVyxPQUFBLE1BQUEsS0FBZixXQUFBLEVBQThDO0FBQzNDLFdBQUEsVUFBQSxHQUFBLGFBQUE7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGVzdHJveWFibGUsIGlzU3RyaW5nRGVzdHJveWFibGUsIERFU1RST1kgfSBmcm9tICcuL2Rlc3Ryb3knO1xuaW1wb3J0IHtcbiAgT3B0aW9uLFxuICBTeW1ib2xEZXN0cm95YWJsZSxcbiAgRGVzdHJveWFibGUsXG4gIERyb3AsXG4gIERyb3BTeW1ib2wsXG4gIENoaWxkcmVuU3ltYm9sLFxufSBmcm9tICdAZ2xpbW1lci9pbnRlcmZhY2VzJztcbmltcG9ydCB7IExpbmtlZExpc3QsIExpbmtlZExpc3ROb2RlIH0gZnJvbSAnLi9saXN0LXV0aWxzJztcbmltcG9ydCB7IERFVk1PREUgfSBmcm9tICdAZ2xpbW1lci9sb2NhbC1kZWJ1Zy1mbGFncyc7XG5cbmV4cG9ydCBjb25zdCBMSU5LRUQ6IFdlYWtNYXA8b2JqZWN0LCBTZXQ8RHJvcD4+ID0gbmV3IFdlYWtNYXAoKTtcbmV4cG9ydCBjb25zdCBEUk9QOiBEcm9wU3ltYm9sID0gJ0RST1AgWzk0ZDQ2Y2YzLTM5NzQtNDM1ZC1iMjc4LTNlNjBkMTE1NTI5MF0nO1xuZXhwb3J0IGNvbnN0IENISUxEUkVOOiBDaGlsZHJlblN5bWJvbCA9ICdDSElMRFJFTiBbNzE0MmU1MmEtODYwMC00ZTAxLWE3NzMtNDIwNTViOTY2MzBkXSc7XG5leHBvcnQgY29uc3QgREVTVFJVQ1RPUlMgPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEcm9wKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgRHJvcCB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBEUk9QIGluICh2YWx1ZSBhcyBvYmplY3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzb2NpYXRlKHBhcmVudDogb2JqZWN0LCBjaGlsZDogb2JqZWN0KSB7XG4gIGFzc29jaWF0ZURlc3RydWN0b3IocGFyZW50LCBkZXN0cnVjdG9yKGNoaWxkKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NvY2lhdGVEZXN0cnVjdG9yKHBhcmVudDogb2JqZWN0LCBjaGlsZDogRHJvcCk6IHZvaWQge1xuICBsZXQgYXNzb2NpYXRlZCA9IExJTktFRC5nZXQocGFyZW50KTtcblxuICBpZiAoIWFzc29jaWF0ZWQpIHtcbiAgICBhc3NvY2lhdGVkID0gbmV3IFNldCgpO1xuICAgIExJTktFRC5zZXQocGFyZW50LCBhc3NvY2lhdGVkKTtcbiAgfVxuXG4gIGFzc29jaWF0ZWQuYWRkKGNoaWxkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRha2VBc3NvY2lhdGVkKHBhcmVudDogb2JqZWN0KTogT3B0aW9uPFNldDxEcm9wPj4ge1xuICBsZXQgbGlua2VkID0gTElOS0VELmdldChwYXJlbnQpO1xuXG4gIGlmIChsaW5rZWQgJiYgbGlua2VkLnNpemUgPiAwKSB7XG4gICAgTElOS0VELmRlbGV0ZShwYXJlbnQpO1xuICAgIHJldHVybiBsaW5rZWQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lBc3NvY2lhdGVkKHBhcmVudDogb2JqZWN0KSB7XG4gIGxldCBhc3NvY2lhdGVkID0gTElOS0VELmdldChwYXJlbnQpO1xuXG4gIGlmIChhc3NvY2lhdGVkKSB7XG4gICAgYXNzb2NpYXRlZC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbVtEUk9QXSgpO1xuICAgICAgYXNzb2NpYXRlZCEuZGVsZXRlKGl0ZW0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cnVjdG9yKHZhbHVlOiBvYmplY3QpOiBEcm9wIHtcbiAgbGV0IGQgPSBERVNUUlVDVE9SUy5nZXQodmFsdWUpO1xuXG4gIGlmICghZCkge1xuICAgIGlmIChpc0Rlc3Ryb3lhYmxlKHZhbHVlKSkge1xuICAgICAgZCA9IG5ldyBEZXN0cm95YWJsZURlc3RydWN0b3IodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmdEZXN0cm95YWJsZSh2YWx1ZSkpIHtcbiAgICAgIGQgPSBuZXcgU3RyaW5nRGVzdHJveWFibGVEZXN0cnVjdG9yKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZCA9IG5ldyBTaW1wbGVEZXN0cnVjdG9yKHZhbHVlKTtcbiAgICB9XG5cbiAgICBERVNUUlVDVE9SUy5zZXQodmFsdWUsIGQpO1xuICB9XG5cbiAgcmV0dXJuIGQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFwc2hvdCh2YWx1ZXM6IFNldDxEcm9wPik6IERyb3Age1xuICByZXR1cm4gbmV3IFNuYXBzaG90RGVzdHJ1Y3Rvcih2YWx1ZXMpO1xufVxuXG5jbGFzcyBTbmFwc2hvdERlc3RydWN0b3IgaW1wbGVtZW50cyBEcm9wIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZXN0cnVjdG9yczogU2V0PERyb3A+KSB7fVxuXG4gIFtEUk9QXSgpIHtcbiAgICB0aGlzLmRlc3RydWN0b3JzLmZvckVhY2goaXRlbSA9PiBpdGVtW0RST1BdKCkpO1xuICB9XG5cbiAgZ2V0IFtDSElMRFJFTl0oKTogSXRlcmFibGU8RHJvcD4ge1xuICAgIHJldHVybiB0aGlzLmRlc3RydWN0b3JzO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdTbmFwc2hvdERlc3RydWN0b3InO1xuICB9XG59XG5cbmNsYXNzIERlc3Ryb3lhYmxlRGVzdHJ1Y3RvciBpbXBsZW1lbnRzIERyb3Age1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlubmVyOiBTeW1ib2xEZXN0cm95YWJsZSkge31cblxuICBbRFJPUF0oKSB7XG4gICAgdGhpcy5pbm5lcltERVNUUk9ZXSgpO1xuICAgIGRlc3Ryb3lBc3NvY2lhdGVkKHRoaXMuaW5uZXIpO1xuICB9XG5cbiAgZ2V0IFtDSElMRFJFTl0oKTogSXRlcmFibGU8RHJvcD4ge1xuICAgIHJldHVybiBMSU5LRUQuZ2V0KHRoaXMuaW5uZXIpIHx8IFtdO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdEZXN0cm95YWJsZURlc3RydWN0b3InO1xuICB9XG59XG5cbmNsYXNzIFN0cmluZ0Rlc3Ryb3lhYmxlRGVzdHJ1Y3RvciBpbXBsZW1lbnRzIERyb3Age1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlubmVyOiBEZXN0cm95YWJsZSkge31cblxuICBbRFJPUF0oKSB7XG4gICAgdGhpcy5pbm5lci5kZXN0cm95KCk7XG4gICAgZGVzdHJveUFzc29jaWF0ZWQodGhpcy5pbm5lcik7XG4gIH1cblxuICBnZXQgW0NISUxEUkVOXSgpOiBJdGVyYWJsZTxEcm9wPiB7XG4gICAgcmV0dXJuIExJTktFRC5nZXQodGhpcy5pbm5lcikgfHwgW107XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ1N0cmluZ0Rlc3Ryb3lhYmxlRGVzdHJ1Y3Rvcic7XG4gIH1cbn1cblxuY2xhc3MgU2ltcGxlRGVzdHJ1Y3RvciBpbXBsZW1lbnRzIERyb3Age1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlubmVyOiBvYmplY3QpIHt9XG5cbiAgW0RST1BdKCkge1xuICAgIGRlc3Ryb3lBc3NvY2lhdGVkKHRoaXMuaW5uZXIpO1xuICB9XG5cbiAgZ2V0IFtDSElMRFJFTl0oKTogSXRlcmFibGU8RHJvcD4ge1xuICAgIHJldHVybiBMSU5LRUQuZ2V0KHRoaXMuaW5uZXIpIHx8IFtdO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdTaW1wbGVEZXN0cnVjdG9yJztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGlzdENvbnRlbnRzRGVzdHJ1Y3RvciBpbXBsZW1lbnRzIERyb3Age1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGlubmVyOiBMaW5rZWRMaXN0PExpbmtlZExpc3ROb2RlPikge31cblxuICBbRFJPUF0oKSB7XG4gICAgdGhpcy5pbm5lci5mb3JFYWNoTm9kZShkID0+IGRlc3RydWN0b3IoZClbRFJPUF0oKSk7XG4gIH1cblxuICBnZXQgW0NISUxEUkVOXSgpOiBJdGVyYWJsZTxEcm9wPiB7XG4gICAgbGV0IG91dDogRHJvcFtdID0gW107XG4gICAgdGhpcy5pbm5lci5mb3JFYWNoTm9kZShkID0+IG91dC5wdXNoKC4uLmRlc3RydWN0b3IoZClbQ0hJTERSRU5dKSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnTGlzdENvbnRlbnRzRGVzdHJ1Y3Rvcic7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWJ1Z05vZGUge1xuICBpbm5lcjogb2JqZWN0O1xuICBjaGlsZHJlbjogRGVidWdOb2RlW10gfCBudWxsO1xuICBoYXNEcm9wOiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVidWdEcm9wVHJlZShpbm5lcjogb2JqZWN0KTogRGVidWdOb2RlIHtcbiAgbGV0IGhhc0Ryb3AgPSBpc0Ryb3AoaW5uZXIpO1xuICBsZXQgcmF3Q2hpbGRyZW4gPSBMSU5LRUQuZ2V0KGlubmVyKSB8fCBudWxsO1xuICBsZXQgY2hpbGRyZW46IERlYnVnTm9kZVtdIHwgbnVsbCA9IG51bGw7XG5cbiAgaWYgKHJhd0NoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4gPSBbXTtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiByYXdDaGlsZHJlbikge1xuICAgICAgY2hpbGRyZW4ucHVzaChkZWJ1Z0Ryb3BUcmVlKGNoaWxkKSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIG9iai5pbm5lciA9IGlubmVyO1xuICBpZiAoY2hpbGRyZW4pIHtcbiAgICBvYmouY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfVxuICBvYmouaGFzRHJvcCA9IGhhc0Ryb3A7XG4gIHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludERyb3BUcmVlKGlubmVyOiBvYmplY3QpIHtcbiAgcHJpbnREcm9wKGRlc3RydWN0b3IoaW5uZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50RHJvcChpbm5lcjogRHJvcCkge1xuICBjb25zb2xlLmdyb3VwKFN0cmluZyhpbm5lcikpO1xuXG4gIGNvbnNvbGUubG9nKGlubmVyKTtcblxuICBsZXQgY2hpbGRyZW4gPSBpbm5lcltDSElMRFJFTl0gfHwgbnVsbDtcbiAgaWYgKGNoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIHByaW50RHJvcChjaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgY29uc29sZS5ncm91cEVuZCgpO1xufVxuXG5pZiAoREVWTU9ERSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAod2luZG93IGFzIGFueSkuUFJJTlRfRFJPUCA9IHByaW50RHJvcFRyZWU7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
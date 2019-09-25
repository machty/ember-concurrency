var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { DROP, destructor, CHILDREN } from './lifetimes';
export var ListNode = function ListNode(value) {
    _classCallCheck(this, ListNode);

    this.next = null;
    this.prev = null;
    this.value = value;
};
export var LinkedList = function () {
    function LinkedList() {
        _classCallCheck(this, LinkedList);

        this.clear();
    }

    LinkedList.prototype.head = function head() {
        return this._head;
    };

    LinkedList.prototype.tail = function tail() {
        return this._tail;
    };

    LinkedList.prototype.clear = function clear() {
        this._head = this._tail = null;
    };

    LinkedList.prototype.toArray = function toArray() {
        var out = [];
        this.forEachNode(function (n) {
            return out.push(n);
        });
        return out;
    };

    LinkedList.prototype.nextNode = function nextNode(node) {
        return node.next;
    };

    LinkedList.prototype.forEachNode = function forEachNode(callback) {
        var node = this._head;
        while (node !== null) {
            callback(node);
            node = node.next;
        }
    };

    LinkedList.prototype.insertBefore = function insertBefore(node) {
        var reference = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (reference === null) return this.append(node);
        if (reference.prev) reference.prev.next = node;else this._head = node;
        node.prev = reference.prev;
        node.next = reference;
        reference.prev = node;
        return node;
    };

    LinkedList.prototype.append = function append(node) {
        var tail = this._tail;
        if (tail) {
            tail.next = node;
            node.prev = tail;
            node.next = null;
        } else {
            this._head = node;
        }
        return this._tail = node;
    };

    LinkedList.prototype.remove = function remove(node) {
        if (node.prev) node.prev.next = node.next;else this._head = node.next;
        if (node.next) node.next.prev = node.prev;else this._tail = node.prev;
        return node;
    };

    LinkedList.prototype[DROP] = function () {
        this.forEachNode(function (d) {
            return destructor(d)[DROP]();
        });
    };

    _createClass(LinkedList, [{
        key: CHILDREN,
        get: function get() {
            var out = [];
            this.forEachNode(function (d) {
                return out.push.apply(out, destructor(d)[CHILDREN]);
            });
            return out;
        }
    }]);

    return LinkedList;
}();
export var ListSlice = function () {
    function ListSlice(head, tail) {
        _classCallCheck(this, ListSlice);

        this._head = head;
        this._tail = tail;
    }

    ListSlice.prototype.forEachNode = function forEachNode(callback) {
        var node = this._head;
        while (node !== null) {
            callback(node);
            node = this.nextNode(node);
        }
    };

    ListSlice.prototype.head = function head() {
        return this._head;
    };

    ListSlice.prototype.tail = function tail() {
        return this._tail;
    };

    ListSlice.prototype.toArray = function toArray() {
        var out = [];
        this.forEachNode(function (n) {
            return out.push(n);
        });
        return out;
    };

    ListSlice.prototype.nextNode = function nextNode(node) {
        if (node === this._tail) return null;
        return node.next;
    };

    return ListSlice;
}();
export var EMPTY_SLICE = new ListSlice(null, null);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3V0aWwvbGliL2xpc3QtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLFNBQUEsSUFBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLFFBQUEsYUFBQTtBQVFBLFdBQU0sUUFBTixHQUtFLGtCQUFBLEtBQUEsRUFBb0I7QUFBQTs7QUFKYixTQUFBLElBQUEsR0FBQSxJQUFBO0FBQ0EsU0FBQSxJQUFBLEdBQUEsSUFBQTtBQUlMLFNBQUEsS0FBQSxHQUFBLEtBQUE7QUFDRCxDQVBIO0FBY0EsV0FBTSxVQUFOO0FBSUUsMEJBQUE7QUFBQTs7QUFDRSxhQUFBLEtBQUE7QUFDRDs7QUFOSCx5QkFRRSxJQVJGLG1CQVFNO0FBQ0YsZUFBTyxLQUFQLEtBQUE7QUFDRCxLQVZIOztBQUFBLHlCQVlFLElBWkYsbUJBWU07QUFDRixlQUFPLEtBQVAsS0FBQTtBQUNELEtBZEg7O0FBQUEseUJBZ0JFLEtBaEJGLG9CQWdCTztBQUNILGFBQUEsS0FBQSxHQUFhLEtBQUEsS0FBQSxHQUFiLElBQUE7QUFDRCxLQWxCSDs7QUFBQSx5QkFvQkUsT0FwQkYsc0JBb0JTO0FBQ0wsWUFBSSxNQUFKLEVBQUE7QUFDQSxhQUFBLFdBQUEsQ0FBaUI7QUFBQSxtQkFBSyxJQUFBLElBQUEsQ0FBdEIsQ0FBc0IsQ0FBTDtBQUFBLFNBQWpCO0FBQ0EsZUFBQSxHQUFBO0FBQ0QsS0F4Qkg7O0FBQUEseUJBMEJFLFFBMUJGLHFCQTBCRSxJQTFCRixFQTBCa0I7QUFDZCxlQUFPLEtBQVAsSUFBQTtBQUNELEtBNUJIOztBQUFBLHlCQThCRSxXQTlCRix3QkE4QkUsUUE5QkYsRUE4QnlDO0FBQ3JDLFlBQUksT0FBTyxLQUFYLEtBQUE7QUFFQSxlQUFPLFNBQVAsSUFBQSxFQUFzQjtBQUNwQixxQkFBQSxJQUFBO0FBQ0EsbUJBQU8sS0FBUCxJQUFBO0FBQ0Q7QUFDRixLQXJDSDs7QUFBQSx5QkF1Q0UsWUF2Q0YseUJBdUNFLElB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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcHRpb24gfSBmcm9tICcuL3BsYXRmb3JtLXV0aWxzJztcbmltcG9ydCB7IERST1AsIGRlc3RydWN0b3IsIENISUxEUkVOIH0gZnJvbSAnLi9saWZldGltZXMnO1xuaW1wb3J0IHsgRHJvcCB9IGZyb20gJ0BnbGltbWVyL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExpbmtlZExpc3ROb2RlIHtcbiAgbmV4dDogT3B0aW9uPExpbmtlZExpc3ROb2RlPjtcbiAgcHJldjogT3B0aW9uPExpbmtlZExpc3ROb2RlPjtcbn1cblxuZXhwb3J0IGNsYXNzIExpc3ROb2RlPFQ+IGltcGxlbWVudHMgTGlua2VkTGlzdE5vZGUge1xuICBwdWJsaWMgbmV4dDogT3B0aW9uPExpc3ROb2RlPFQ+PiA9IG51bGw7XG4gIHB1YmxpYyBwcmV2OiBPcHRpb248TGlzdE5vZGU8VD4+ID0gbnVsbDtcbiAgcHVibGljIHZhbHVlOiBUO1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBUKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5cbi8vIHdlIGFyZSB1bmFibGUgdG8gZXhwcmVzcyB0aGUgY29uc3RyYWludCB0aGF0IFQncyAucHJldiBhbmQgLm5leHQgYXJlXG4vLyB0aGVtc2VsdmVzIFQuIEhvd2V2ZXIsIGl0IHdpbGwgYWx3YXlzIGJlIHRydWUsIHNvIHRydXN0IHVzLlxudHlwZSB0cnVzdCA9IGFueTtcblxuZXhwb3J0IGNsYXNzIExpbmtlZExpc3Q8VCBleHRlbmRzIExpbmtlZExpc3ROb2RlPiBpbXBsZW1lbnRzIFNsaWNlPFQ+LCBEcm9wIHtcbiAgcHJpdmF0ZSBfaGVhZCE6IE9wdGlvbjxUPjtcbiAgcHJpdmF0ZSBfdGFpbCE6IE9wdGlvbjxUPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gIH1cblxuICBoZWFkKCk6IE9wdGlvbjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWQ7XG4gIH1cblxuICB0YWlsKCk6IE9wdGlvbjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX3RhaWw7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9oZWFkID0gdGhpcy5fdGFpbCA9IG51bGw7XG4gIH1cblxuICB0b0FycmF5KCk6IFRbXSB7XG4gICAgbGV0IG91dDogVFtdID0gW107XG4gICAgdGhpcy5mb3JFYWNoTm9kZShuID0+IG91dC5wdXNoKG4pKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgbmV4dE5vZGUobm9kZTogVCk6IFQge1xuICAgIHJldHVybiBub2RlLm5leHQgYXMgdHJ1c3Q7XG4gIH1cblxuICBmb3JFYWNoTm9kZShjYWxsYmFjazogKG5vZGU6IFQpID0+IHZvaWQpIHtcbiAgICBsZXQgbm9kZSA9IHRoaXMuX2hlYWQ7XG5cbiAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgY2FsbGJhY2sobm9kZSBhcyB0cnVzdCk7XG4gICAgICBub2RlID0gbm9kZS5uZXh0IGFzIHRydXN0O1xuICAgIH1cbiAgfVxuXG4gIGluc2VydEJlZm9yZShub2RlOiBULCByZWZlcmVuY2U6IE9wdGlvbjxUPiA9IG51bGwpOiBUIHtcbiAgICBpZiAocmVmZXJlbmNlID09PSBudWxsKSByZXR1cm4gdGhpcy5hcHBlbmQobm9kZSk7XG5cbiAgICBpZiAocmVmZXJlbmNlLnByZXYpIHJlZmVyZW5jZS5wcmV2Lm5leHQgPSBub2RlO1xuICAgIGVsc2UgdGhpcy5faGVhZCA9IG5vZGU7XG5cbiAgICBub2RlLnByZXYgPSByZWZlcmVuY2UucHJldjtcbiAgICBub2RlLm5leHQgPSByZWZlcmVuY2U7XG4gICAgcmVmZXJlbmNlLnByZXYgPSBub2RlO1xuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBhcHBlbmQobm9kZTogVCk6IFQge1xuICAgIGxldCB0YWlsID0gdGhpcy5fdGFpbDtcblxuICAgIGlmICh0YWlsKSB7XG4gICAgICB0YWlsLm5leHQgPSBub2RlO1xuICAgICAgbm9kZS5wcmV2ID0gdGFpbDtcbiAgICAgIG5vZGUubmV4dCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hlYWQgPSBub2RlO1xuICAgIH1cblxuICAgIHJldHVybiAodGhpcy5fdGFpbCA9IG5vZGUpO1xuICB9XG5cbiAgcmVtb3ZlKG5vZGU6IFQpOiBUIHtcbiAgICBpZiAobm9kZS5wcmV2KSBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcbiAgICBlbHNlIHRoaXMuX2hlYWQgPSBub2RlLm5leHQgYXMgdHJ1c3Q7XG5cbiAgICBpZiAobm9kZS5uZXh0KSBub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcbiAgICBlbHNlIHRoaXMuX3RhaWwgPSBub2RlLnByZXYgYXMgdHJ1c3Q7XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIFtEUk9QXSgpIHtcbiAgICB0aGlzLmZvckVhY2hOb2RlKGQgPT4gZGVzdHJ1Y3RvcihkKVtEUk9QXSgpKTtcbiAgfVxuXG4gIGdldCBbQ0hJTERSRU5dKCk6IEl0ZXJhYmxlPERyb3A+IHtcbiAgICBsZXQgb3V0OiBEcm9wW10gPSBbXTtcbiAgICB0aGlzLmZvckVhY2hOb2RlKGQgPT4gb3V0LnB1c2goLi4uZGVzdHJ1Y3RvcihkKVtDSElMRFJFTl0pKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xpY2U8VCBleHRlbmRzIExpbmtlZExpc3ROb2RlPiB7XG4gIGhlYWQoKTogT3B0aW9uPFQ+O1xuICB0YWlsKCk6IE9wdGlvbjxUPjtcbiAgbmV4dE5vZGUobm9kZTogVCk6IE9wdGlvbjxUPjtcbiAgZm9yRWFjaE5vZGUoY2FsbGJhY2s6IChub2RlOiBUKSA9PiB2b2lkKTogdm9pZDtcbiAgdG9BcnJheSgpOiBUW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xvbmVhYmxlTGlzdE5vZGUgZXh0ZW5kcyBMaW5rZWRMaXN0Tm9kZSB7XG4gIGNsb25lKCk6IHRoaXM7XG59XG5cbmV4cG9ydCBjbGFzcyBMaXN0U2xpY2U8VCBleHRlbmRzIExpbmtlZExpc3ROb2RlPiBpbXBsZW1lbnRzIFNsaWNlPFQ+IHtcbiAgcHJpdmF0ZSBfaGVhZDogT3B0aW9uPFQ+O1xuICBwcml2YXRlIF90YWlsOiBPcHRpb248VD47XG5cbiAgY29uc3RydWN0b3IoaGVhZDogT3B0aW9uPFQ+LCB0YWlsOiBPcHRpb248VD4pIHtcbiAgICB0aGlzLl9oZWFkID0gaGVhZDtcbiAgICB0aGlzLl90YWlsID0gdGFpbDtcbiAgfVxuXG4gIGZvckVhY2hOb2RlKGNhbGxiYWNrOiAobm9kZTogVCkgPT4gdm9pZCkge1xuICAgIGxldCBub2RlID0gdGhpcy5faGVhZDtcblxuICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgICBjYWxsYmFjayhub2RlKTtcbiAgICAgIG5vZGUgPSB0aGlzLm5leHROb2RlKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIGhlYWQoKTogT3B0aW9uPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZDtcbiAgfVxuXG4gIHRhaWwoKTogT3B0aW9uPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fdGFpbDtcbiAgfVxuXG4gIHRvQXJyYXkoKTogVFtdIHtcbiAgICBsZXQgb3V0OiBUW10gPSBbXTtcbiAgICB0aGlzLmZvckVhY2hOb2RlKG4gPT4gb3V0LnB1c2gobikpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBuZXh0Tm9kZShub2RlOiBUKTogT3B0aW9uPFQ+IHtcbiAgICBpZiAobm9kZSA9PT0gdGhpcy5fdGFpbCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIG5vZGUubmV4dCBhcyBUO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBFTVBUWV9TTElDRSA9IG5ldyBMaXN0U2xpY2UobnVsbCwgbnVsbCk7XG4iXSwic291cmNlUm9vdCI6IiJ9
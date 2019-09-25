'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Walker = function () {
    function Walker(order) {
        _classCallCheck(this, Walker);

        this.order = order;
        this.stack = [];
    }

    Walker.prototype.visit = function visit(node, callback) {
        if (!node) {
            return;
        }
        this.stack.push(node);
        if (this.order === 'post') {
            this.children(node, callback);
            callback(node, this);
        } else {
            callback(node, this);
            this.children(node, callback);
        }
        this.stack.pop();
    };

    Walker.prototype.children = function children(node, callback) {
        var type = void 0;
        if (node.type === 'Block' || node.type === 'Template' && visitors.Program) {
            type = 'Program';
        } else {
            type = node.type;
        }
        var visitor = visitors[type];
        if (visitor) {
            visitor(this, node, callback);
        }
    };

    return Walker;
}();

exports.default = Walker;


var visitors = {
    Program: function Program(walker, node, callback) {
        for (var i = 0; i < node.body.length; i++) {
            walker.visit(node.body[i], callback);
        }
    },
    Template: function Template(walker, node, callback) {
        for (var i = 0; i < node.body.length; i++) {
            walker.visit(node.body[i], callback);
        }
    },
    Block: function Block(walker, node, callback) {
        for (var i = 0; i < node.body.length; i++) {
            walker.visit(node.body[i], callback);
        }
    },
    ElementNode: function ElementNode(walker, node, callback) {
        for (var i = 0; i < node.children.length; i++) {
            walker.visit(node.children[i], callback);
        }
    },
    BlockStatement: function BlockStatement(walker, node, callback) {
        walker.visit(node.program, callback);
        walker.visit(node.inverse || null, callback);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3N5bnRheC9saWIvdHJhdmVyc2FsL3dhbGtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUtjLFM7QUFFWixhQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQThCO0FBQUEsd0JBQUEsSUFBQSxFQUFBLE1BQUE7O0FBQVgsYUFBQSxLQUFBLEdBQUEsS0FBQTtBQURaLGFBQUEsS0FBQSxHQUFBLEVBQUE7QUFDMkI7O3FCQUVsQyxLLGtCQUFBLEksRUFBQSxRLEVBQW9FO0FBQ2xFLFlBQUksQ0FBSixJQUFBLEVBQVc7QUFDVDtBQUNEO0FBRUQsYUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUE7QUFFQSxZQUFJLEtBQUEsS0FBQSxLQUFKLE1BQUEsRUFBMkI7QUFDekIsaUJBQUEsUUFBQSxDQUFBLElBQUEsRUFBQSxRQUFBO0FBQ0EscUJBQUEsSUFBQSxFQUFBLElBQUE7QUFGRixTQUFBLE1BR087QUFDTCxxQkFBQSxJQUFBLEVBQUEsSUFBQTtBQUNBLGlCQUFBLFFBQUEsQ0FBQSxJQUFBLEVBQUEsUUFBQTtBQUNEO0FBRUQsYUFBQSxLQUFBLENBQUEsR0FBQTs7O3FCQUdGLFEscUJBQUEsSSxFQUFBLFEsRUFBaUM7QUFDL0IsWUFBQSxPQUFBLEtBQUEsQ0FBQTtBQUNBLFlBQUksS0FBQSxJQUFBLEtBQUEsT0FBQSxJQUEwQixLQUFBLElBQUEsS0FBQSxVQUFBLElBQTRCLFNBQTFELE9BQUEsRUFBNkU7QUFDM0UsbUJBQUEsU0FBQTtBQURGLFNBQUEsTUFFTztBQUNMLG1CQUFPLEtBQVAsSUFBQTtBQUNEO0FBRUQsWUFBSSxVQUFXLFNBQWYsSUFBZSxDQUFmO0FBQ0EsWUFBQSxPQUFBLEVBQWE7QUFDWCxvQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUE7QUFDRDs7Ozs7O2tCQWpDUyxNOzs7QUFxQ2QsSUFBSSxXQUFXO0FBQUEsYUFBQSxTQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFDOEQ7QUFDekUsYUFBSyxJQUFJLElBQVQsQ0FBQSxFQUFnQixJQUFJLEtBQUEsSUFBQSxDQUFwQixNQUFBLEVBQUEsR0FBQSxFQUEyQztBQUN6QyxtQkFBQSxLQUFBLENBQWEsS0FBQSxJQUFBLENBQWIsQ0FBYSxDQUFiLEVBQUEsUUFBQTtBQUNEO0FBSlUsS0FBQTtBQUFBLGNBQUEsU0FBQSxRQUFBLENBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBT2dFO0FBQzNFLGFBQUssSUFBSSxJQUFULENBQUEsRUFBZ0IsSUFBSSxLQUFBLElBQUEsQ0FBcEIsTUFBQSxFQUFBLEdBQUEsRUFBMkM7QUFDekMsbUJBQUEsS0FBQSxDQUFhLEtBQUEsSUFBQSxDQUFiLENBQWEsQ0FBYixFQUFBLFFBQUE7QUFDRDtBQVZVLEtBQUE7QUFBQSxXQUFBLFNBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQWEwRDtBQUNyRSxhQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQUksS0FBQSxJQUFBLENBQXBCLE1BQUEsRUFBQSxHQUFBLEVBQTJDO0FBQ3pDLG1CQUFBLEtBQUEsQ0FBYSxLQUFBLElBQUEsQ0FBYixDQUFhLENBQWIsRUFBQSxRQUFBO0FBQ0Q7QUFoQlUsS0FBQTtBQUFBLGlCQUFBLFNBQUEsV0FBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQW1Cc0U7QUFDakYsYUFBSyxJQUFJLElBQVQsQ0FBQSxFQUFnQixJQUFJLEtBQUEsUUFBQSxDQUFwQixNQUFBLEVBQUEsR0FBQSxFQUErQztBQUM3QyxtQkFBQSxLQUFBLENBQWEsS0FBQSxRQUFBLENBQWIsQ0FBYSxDQUFiLEVBQUEsUUFBQTtBQUNEO0FBdEJVLEtBQUE7QUFBQSxvQkFBQSxTQUFBLGNBQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUF5QjZFO0FBQ3hGLGVBQUEsS0FBQSxDQUFhLEtBQWIsT0FBQSxFQUFBLFFBQUE7QUFDQSxlQUFBLEtBQUEsQ0FBYSxLQUFBLE9BQUEsSUFBYixJQUFBLEVBQUEsUUFBQTtBQUNEO0FBNUJZLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcHRpb24gfSBmcm9tICdAZ2xpbW1lci9pbnRlcmZhY2VzJztcbmltcG9ydCAqIGFzIEFTVCBmcm9tICcuLi90eXBlcy9ub2Rlcyc7XG5cbmV4cG9ydCB0eXBlIE5vZGVDYWxsYmFjazxOIGV4dGVuZHMgQVNULk5vZGU+ID0gKG5vZGU6IE4sIHdhbGtlcjogV2Fsa2VyKSA9PiB2b2lkO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxrZXIge1xuICBwdWJsaWMgc3RhY2s6IGFueVtdID0gW107XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcmRlcj86IGFueSkge31cblxuICB2aXNpdDxOIGV4dGVuZHMgQVNULk5vZGU+KG5vZGU6IE9wdGlvbjxOPiwgY2FsbGJhY2s6IE5vZGVDYWxsYmFjazxOPikge1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RhY2sucHVzaChub2RlKTtcblxuICAgIGlmICh0aGlzLm9yZGVyID09PSAncG9zdCcpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4obm9kZSwgY2FsbGJhY2spO1xuICAgICAgY2FsbGJhY2sobm9kZSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKG5vZGUsIHRoaXMpO1xuICAgICAgdGhpcy5jaGlsZHJlbihub2RlLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGFjay5wb3AoKTtcbiAgfVxuXG4gIGNoaWxkcmVuKG5vZGU6IGFueSwgY2FsbGJhY2s6IGFueSkge1xuICAgIGxldCB0eXBlO1xuICAgIGlmIChub2RlLnR5cGUgPT09ICdCbG9jaycgfHwgKG5vZGUudHlwZSA9PT0gJ1RlbXBsYXRlJyAmJiB2aXNpdG9ycy5Qcm9ncmFtKSkge1xuICAgICAgdHlwZSA9ICdQcm9ncmFtJztcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZSA9IG5vZGUudHlwZTtcbiAgICB9XG5cbiAgICBsZXQgdmlzaXRvciA9ICh2aXNpdG9ycyBhcyBhbnkpW3R5cGVdO1xuICAgIGlmICh2aXNpdG9yKSB7XG4gICAgICB2aXNpdG9yKHRoaXMsIG5vZGUsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IHZpc2l0b3JzID0ge1xuICBQcm9ncmFtKHdhbGtlcjogV2Fsa2VyLCBub2RlOiBBU1QuUHJvZ3JhbSwgY2FsbGJhY2s6IE5vZGVDYWxsYmFjazxBU1QuTm9kZT4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgd2Fsa2VyLnZpc2l0KG5vZGUuYm9keVtpXSwgY2FsbGJhY2spO1xuICAgIH1cbiAgfSxcblxuICBUZW1wbGF0ZSh3YWxrZXI6IFdhbGtlciwgbm9kZTogQVNULlRlbXBsYXRlLCBjYWxsYmFjazogTm9kZUNhbGxiYWNrPEFTVC5Ob2RlPikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB3YWxrZXIudmlzaXQobm9kZS5ib2R5W2ldLCBjYWxsYmFjayk7XG4gICAgfVxuICB9LFxuXG4gIEJsb2NrKHdhbGtlcjogV2Fsa2VyLCBub2RlOiBBU1QuQmxvY2ssIGNhbGxiYWNrOiBOb2RlQ2FsbGJhY2s8QVNULk5vZGU+KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHdhbGtlci52aXNpdChub2RlLmJvZHlbaV0sIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0sXG5cbiAgRWxlbWVudE5vZGUod2Fsa2VyOiBXYWxrZXIsIG5vZGU6IEFTVC5FbGVtZW50Tm9kZSwgY2FsbGJhY2s6IE5vZGVDYWxsYmFjazxBU1QuTm9kZT4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHdhbGtlci52aXNpdChub2RlLmNoaWxkcmVuW2ldLCBjYWxsYmFjayk7XG4gICAgfVxuICB9LFxuXG4gIEJsb2NrU3RhdGVtZW50KHdhbGtlcjogV2Fsa2VyLCBub2RlOiBBU1QuQmxvY2tTdGF0ZW1lbnQsIGNhbGxiYWNrOiBOb2RlQ2FsbGJhY2s8QVNULkJsb2NrPikge1xuICAgIHdhbGtlci52aXNpdChub2RlLnByb2dyYW0sIGNhbGxiYWNrKTtcbiAgICB3YWxrZXIudmlzaXQobm9kZS5pbnZlcnNlIHx8IG51bGwsIGNhbGxiYWNrKTtcbiAgfSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9
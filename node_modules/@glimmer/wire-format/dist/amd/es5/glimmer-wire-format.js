define('@glimmer/wire-format', ['exports'], function (exports) { 'use strict';

    function is(variant) {
        return function (value) {
            return Array.isArray(value) && value[0] === variant;
        };
    }
    // Statements
    var isFlushElement = is(9 /* FlushElement */);
    function isAttribute(val) {
        return val[0] === 11 /* StaticAttr */ || val[0] === 12 /* DynamicAttr */ || val[0] === 19 /* TrustingDynamicAttr */ || val[0] === 13 /* ComponentAttr */ || val[0] === 20 /* TrustingComponentAttr */ || val[0] === 14 /* AttrSplat */ || val[0] === 3 /* Modifier */;
    }
    function isArgument(val) {
        return val[0] === 18 /* StaticArg */ || val[0] === 17 /* DynamicArg */;
    }
    function isHelper(expr) {
        return Array.isArray(expr) && expr[0] === 29 /* Helper */;
    }
    // Expressions
    var isGet = is(24 /* Get */);
    var isMaybeLocal = is(25 /* MaybeLocal */);

    exports.is = is;
    exports.isFlushElement = isFlushElement;
    exports.isAttribute = isAttribute;
    exports.isArgument = isArgument;
    exports.isHelper = isHelper;
    exports.isGet = isGet;
    exports.isMaybeLocal = isMaybeLocal;

    Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpbW1lci13aXJlLWZvcm1hdC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvQGdsaW1tZXIvd2lyZS1mb3JtYXQvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhdGVtZW50cywgU3RhdGVtZW50LCBTZXhwT3Bjb2RlcywgRXhwcmVzc2lvbnMsIEV4cHJlc3Npb24gfSBmcm9tICdAZ2xpbW1lci9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzPFQ+KHZhcmlhbnQ6IG51bWJlcik6ICh2YWx1ZTogYW55KSA9PiB2YWx1ZSBpcyBUIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBUIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWVbMF0gPT09IHZhcmlhbnQ7XG4gIH07XG59XG5cbi8vIFN0YXRlbWVudHNcbmV4cG9ydCBjb25zdCBpc0ZsdXNoRWxlbWVudCA9IGlzPFN0YXRlbWVudHMuRmx1c2hFbGVtZW50PihTZXhwT3Bjb2Rlcy5GbHVzaEVsZW1lbnQpO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBdHRyaWJ1dGUodmFsOiBTdGF0ZW1lbnQpOiB2YWwgaXMgU3RhdGVtZW50cy5BdHRyaWJ1dGUge1xuICByZXR1cm4gKFxuICAgIHZhbFswXSA9PT0gU2V4cE9wY29kZXMuU3RhdGljQXR0ciB8fFxuICAgIHZhbFswXSA9PT0gU2V4cE9wY29kZXMuRHluYW1pY0F0dHIgfHxcbiAgICB2YWxbMF0gPT09IFNleHBPcGNvZGVzLlRydXN0aW5nRHluYW1pY0F0dHIgfHxcbiAgICB2YWxbMF0gPT09IFNleHBPcGNvZGVzLkNvbXBvbmVudEF0dHIgfHxcbiAgICB2YWxbMF0gPT09IFNleHBPcGNvZGVzLlRydXN0aW5nQ29tcG9uZW50QXR0ciB8fFxuICAgIHZhbFswXSA9PT0gU2V4cE9wY29kZXMuQXR0clNwbGF0IHx8XG4gICAgdmFsWzBdID09PSBTZXhwT3Bjb2Rlcy5Nb2RpZmllclxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcmd1bWVudCh2YWw6IFN0YXRlbWVudCk6IHZhbCBpcyBTdGF0ZW1lbnRzLkFyZ3VtZW50IHtcbiAgcmV0dXJuIHZhbFswXSA9PT0gU2V4cE9wY29kZXMuU3RhdGljQXJnIHx8IHZhbFswXSA9PT0gU2V4cE9wY29kZXMuRHluYW1pY0FyZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSGVscGVyKGV4cHI6IEV4cHJlc3Npb24pOiBleHByIGlzIEV4cHJlc3Npb25zLkhlbHBlciB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGV4cHIpICYmIGV4cHJbMF0gPT09IFNleHBPcGNvZGVzLkhlbHBlcjtcbn1cblxuLy8gRXhwcmVzc2lvbnNcbmV4cG9ydCBjb25zdCBpc0dldCA9IGlzPEV4cHJlc3Npb25zLkdldD4oU2V4cE9wY29kZXMuR2V0KTtcbmV4cG9ydCBjb25zdCBpc01heWJlTG9jYWwgPSBpczxFeHByZXNzaW9ucy5NYXliZUxvY2FsPihTZXhwT3Bjb2Rlcy5NYXliZUxvY2FsKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUVNLFNBQUEsRUFBQSxDQUFBLE9BQUEsRUFBK0I7SUFDbkMsV0FBTyxVQUFBLEtBQUEsRUFBbUI7SUFDeEIsZUFBTyxNQUFBLE9BQUEsQ0FBQSxLQUFBLEtBQXdCLE1BQUEsQ0FBQSxNQUEvQixPQUFBO0lBREYsS0FBQTtJQUdEO0lBRUQ7QUFDQSxRQUFhLGlCQUFpQixHQUFBLENBQUEsb0JBQXZCO0FBRVAsSUFBTSxTQUFBLFdBQUEsQ0FBQSxHQUFBLEVBQW9DO0lBQ3hDLFdBQ0UsSUFBQSxDQUFBLE1BQUEsRUFBQSxxQkFDQSxJQUFBLENBQUEsTUFEQSxFQUFBLHNCQUVBLElBQUEsQ0FBQSxNQUZBLEVBQUEsOEJBR0EsSUFBQSxDQUFBLE1BSEEsRUFBQSx3QkFJQSxJQUFBLENBQUEsTUFKQSxFQUFBLGdDQUtBLElBQUEsQ0FBQSxNQUxBLEVBQUEsb0JBTUEsSUFBQSxDQUFBLE1BUEYsQ0FBQTtJQVNEO0FBRUQsSUFBTSxTQUFBLFVBQUEsQ0FBQSxHQUFBLEVBQW1DO0lBQ3ZDLFdBQU8sSUFBQSxDQUFBLE1BQUEsRUFBQSxvQkFBb0MsSUFBQSxDQUFBLE1BQTNDLEVBQUE7SUFDRDtBQUVELElBQU0sU0FBQSxRQUFBLENBQUEsSUFBQSxFQUFtQztJQUN2QyxXQUFPLE1BQUEsT0FBQSxDQUFBLElBQUEsS0FBdUIsS0FBQSxDQUFBLE1BQTlCLEVBQUE7SUFDRDtJQUVEO0FBQ0EsUUFBYSxRQUFRLEdBQUEsRUFBQSxXQUFkO0FBQ1AsUUFBYSxlQUFlLEdBQUEsRUFBQSxrQkFBckI7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
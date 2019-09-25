"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Opcodes = exports.Opcodes = undefined;
(function (Opcodes) {
    // Statements
    Opcodes[Opcodes["Text"] = 0] = "Text";
    Opcodes[Opcodes["Append"] = 1] = "Append";
    Opcodes[Opcodes["Comment"] = 2] = "Comment";
    Opcodes[Opcodes["Modifier"] = 3] = "Modifier";
    Opcodes[Opcodes["Block"] = 4] = "Block";
    Opcodes[Opcodes["Component"] = 5] = "Component";
    Opcodes[Opcodes["DynamicComponent"] = 6] = "DynamicComponent";
    Opcodes[Opcodes["OpenElement"] = 7] = "OpenElement";
    Opcodes[Opcodes["FlushElement"] = 8] = "FlushElement";
    Opcodes[Opcodes["CloseElement"] = 9] = "CloseElement";
    Opcodes[Opcodes["StaticAttr"] = 10] = "StaticAttr";
    Opcodes[Opcodes["DynamicAttr"] = 11] = "DynamicAttr";
    Opcodes[Opcodes["ComponentAttr"] = 12] = "ComponentAttr";
    Opcodes[Opcodes["AttrSplat"] = 13] = "AttrSplat";
    Opcodes[Opcodes["Yield"] = 14] = "Yield";
    Opcodes[Opcodes["Partial"] = 15] = "Partial";
    Opcodes[Opcodes["DynamicArg"] = 16] = "DynamicArg";
    Opcodes[Opcodes["StaticArg"] = 17] = "StaticArg";
    Opcodes[Opcodes["TrustingAttr"] = 18] = "TrustingAttr";
    Opcodes[Opcodes["TrustingComponentAttr"] = 19] = "TrustingComponentAttr";
    Opcodes[Opcodes["Debugger"] = 20] = "Debugger";
    Opcodes[Opcodes["ClientSideStatement"] = 21] = "ClientSideStatement";
    // Expressions
    Opcodes[Opcodes["Unknown"] = 22] = "Unknown";
    Opcodes[Opcodes["Get"] = 23] = "Get";
    Opcodes[Opcodes["MaybeLocal"] = 24] = "MaybeLocal";
    Opcodes[Opcodes["HasBlock"] = 25] = "HasBlock";
    Opcodes[Opcodes["HasBlockParams"] = 26] = "HasBlockParams";
    Opcodes[Opcodes["Undefined"] = 27] = "Undefined";
    Opcodes[Opcodes["Helper"] = 28] = "Helper";
    Opcodes[Opcodes["Concat"] = 29] = "Concat";
})(Opcodes || (exports.Opcodes = Opcodes = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3dpcmUtZm9ybWF0L2xpYi9vcGNvZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBQSxxQ0FBQTtBQUFBLENBQUEsVUFBQSxPQUFBLEVBQW1CO0FBQ2pCO0FBQ0EsWUFBQSxRQUFBLE1BQUEsSUFBQSxDQUFBLElBQUEsTUFBQTtBQUNBLFlBQUEsUUFBQSxRQUFBLElBQUEsQ0FBQSxJQUFBLFFBQUE7QUFDQSxZQUFBLFFBQUEsU0FBQSxJQUFBLENBQUEsSUFBQSxTQUFBO0FBQ0EsWUFBQSxRQUFBLFVBQUEsSUFBQSxDQUFBLElBQUEsVUFBQTtBQUNBLFlBQUEsUUFBQSxPQUFBLElBQUEsQ0FBQSxJQUFBLE9BQUE7QUFDQSxZQUFBLFFBQUEsV0FBQSxJQUFBLENBQUEsSUFBQSxXQUFBO0FBQ0EsWUFBQSxRQUFBLGtCQUFBLElBQUEsQ0FBQSxJQUFBLGtCQUFBO0FBQ0EsWUFBQSxRQUFBLGFBQUEsSUFBQSxDQUFBLElBQUEsYUFBQTtBQUNBLFlBQUEsUUFBQSxjQUFBLElBQUEsQ0FBQSxJQUFBLGNBQUE7QUFDQSxZQUFBLFFBQUEsY0FBQSxJQUFBLENBQUEsSUFBQSxjQUFBO0FBQ0EsWUFBQSxRQUFBLFlBQUEsSUFBQSxFQUFBLElBQUEsWUFBQTtBQUNBLFlBQUEsUUFBQSxhQUFBLElBQUEsRUFBQSxJQUFBLGFBQUE7QUFDQSxZQUFBLFFBQUEsZUFBQSxJQUFBLEVBQUEsSUFBQSxlQUFBO0FBQ0EsWUFBQSxRQUFBLFdBQUEsSUFBQSxFQUFBLElBQUEsV0FBQTtBQUNBLFlBQUEsUUFBQSxPQUFBLElBQUEsRUFBQSxJQUFBLE9BQUE7QUFDQSxZQUFBLFFBQUEsU0FBQSxJQUFBLEVBQUEsSUFBQSxTQUFBO0FBRUEsWUFBQSxRQUFBLFlBQUEsSUFBQSxFQUFBLElBQUEsWUFBQTtBQUNBLFlBQUEsUUFBQSxXQUFBLElBQUEsRUFBQSxJQUFBLFdBQUE7QUFDQSxZQUFBLFFBQUEsY0FBQSxJQUFBLEVBQUEsSUFBQSxjQUFBO0FBQ0EsWUFBQSxRQUFBLHVCQUFBLElBQUEsRUFBQSxJQUFBLHVCQUFBO0FBQ0EsWUFBQSxRQUFBLFVBQUEsSUFBQSxFQUFBLElBQUEsVUFBQTtBQUNBLFlBQUEsUUFBQSxxQkFBQSxJQUFBLEVBQUEsSUFBQSxxQkFBQTtBQUVBO0FBRUEsWUFBQSxRQUFBLFNBQUEsSUFBQSxFQUFBLElBQUEsU0FBQTtBQUNBLFlBQUEsUUFBQSxLQUFBLElBQUEsRUFBQSxJQUFBLEtBQUE7QUFDQSxZQUFBLFFBQUEsWUFBQSxJQUFBLEVBQUEsSUFBQSxZQUFBO0FBQ0EsWUFBQSxRQUFBLFVBQUEsSUFBQSxFQUFBLElBQUEsVUFBQTtBQUNBLFlBQUEsUUFBQSxnQkFBQSxJQUFBLEVBQUEsSUFBQSxnQkFBQTtBQUNBLFlBQUEsUUFBQSxXQUFBLElBQUEsRUFBQSxJQUFBLFdBQUE7QUFDQSxZQUFBLFFBQUEsUUFBQSxJQUFBLEVBQUEsSUFBQSxRQUFBO0FBQ0EsWUFBQSxRQUFBLFFBQUEsSUFBQSxFQUFBLElBQUEsUUFBQTtBQW5DRixDQUFBLEVBQVksb0JBQVosT0FBWSxHQUFBLFVBQVosRUFBWSxDQUFaIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gT3Bjb2RlcyB7XG4gIC8vIFN0YXRlbWVudHNcbiAgVGV4dCxcbiAgQXBwZW5kLFxuICBDb21tZW50LFxuICBNb2RpZmllcixcbiAgQmxvY2ssXG4gIENvbXBvbmVudCxcbiAgRHluYW1pY0NvbXBvbmVudCxcbiAgT3BlbkVsZW1lbnQsXG4gIEZsdXNoRWxlbWVudCxcbiAgQ2xvc2VFbGVtZW50LFxuICBTdGF0aWNBdHRyLFxuICBEeW5hbWljQXR0cixcbiAgQ29tcG9uZW50QXR0cixcbiAgQXR0clNwbGF0LFxuICBZaWVsZCxcbiAgUGFydGlhbCxcblxuICBEeW5hbWljQXJnLFxuICBTdGF0aWNBcmcsXG4gIFRydXN0aW5nQXR0cixcbiAgVHJ1c3RpbmdDb21wb25lbnRBdHRyLFxuICBEZWJ1Z2dlcixcbiAgQ2xpZW50U2lkZVN0YXRlbWVudCxcblxuICAvLyBFeHByZXNzaW9uc1xuXG4gIFVua25vd24sXG4gIEdldCxcbiAgTWF5YmVMb2NhbCxcbiAgSGFzQmxvY2ssXG4gIEhhc0Jsb2NrUGFyYW1zLFxuICBVbmRlZmluZWQsXG4gIEhlbHBlcixcbiAgQ29uY2F0LFxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
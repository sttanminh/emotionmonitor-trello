"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSG\": function() { return /* binding */ __N_SSG; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ \"./node_modules/react-bootstrap/esm/index.js\");\n/* harmony import */ var _Components_Slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Slider */ \"./Components/Slider.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst Home = ()=>{\n    _s();\n    const [metrics, setMetrics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [sliderValue, setSliderValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    // Add dummy metric\n    const addDummyMetric = ()=>{\n        const dummyMetric = {\n            name: \"Dummy Metric\",\n            rate: 0\n        };\n        setMetrics([\n            ...metrics,\n            dummyMetric\n        ]);\n    };\n    // Get slider value\n    const handleSliderChange = (event)=>{\n        console.log(event.target.value);\n        setSliderValue(parseInt(event.target.value, 10));\n    };\n    console.log(metrics);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Hello\"\n            }, void 0, false, {\n                fileName: \"/Users/minhnguyen/Desktop/4002/emotimonitor-trello/pages/index.tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, undefined),\n            metrics.reduce((rows, metric, index)=>{\n                if (index % 2 === 0) {\n                    rows.push([]);\n                }\n                rows[rows.length - 1].push(metric);\n                return rows;\n            }, []).map((row, rowIndex)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.Row, {\n                    className: \"justify-content-center\",\n                    children: row.map((metric, colIndex)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__.Col, {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Components_Slider__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                metric: metric.name,\n                                onChange: handleSliderChange\n                            }, void 0, false, {\n                                fileName: \"/Users/minhnguyen/Desktop/4002/emotimonitor-trello/pages/index.tsx\",\n                                lineNumber: 51,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/minhnguyen/Desktop/4002/emotimonitor-trello/pages/index.tsx\",\n                            lineNumber: 50,\n                            columnNumber: 13\n                        }, undefined))\n                }, rowIndex, false, {\n                    fileName: \"/Users/minhnguyen/Desktop/4002/emotimonitor-trello/pages/index.tsx\",\n                    lineNumber: 48,\n                    columnNumber: 9\n                }, undefined)),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: addDummyMetric,\n                children: \"Add Dummy Metric\"\n            }, void 0, false, {\n                fileName: \"/Users/minhnguyen/Desktop/4002/emotimonitor-trello/pages/index.tsx\",\n                lineNumber: 56,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/minhnguyen/Desktop/4002/emotimonitor-trello/pages/index.tsx\",\n        lineNumber: 39,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Home, \"kjKVRWF/o8yfQkGdMaFVQ3HsUUw=\");\n_c = Home;\nvar __N_SSG = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR21EO0FBQ1Q7QUFDRjtBQVd4QyxNQUFNSSxPQUF3QixJQUFNOztJQUNsQyxNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR04sK0NBQVFBLENBQUMsRUFBRTtJQUN6QyxNQUFNLENBQUNPLGFBQWFDLGVBQWUsR0FBR1IsK0NBQVFBLENBQUM7SUFFL0MsbUJBQW1CO0lBQ25CLE1BQU1TLGlCQUFpQixJQUFNO1FBQzNCLE1BQU1DLGNBQXNCO1lBQzFCQyxNQUFNO1lBQ05DLE1BQU07UUFDUjtRQUNBTixXQUFXO2VBQUlEO1lBQVNLO1NBQVk7SUFDdEM7SUFFQSxtQkFBbUI7SUFDbkIsTUFBTUcscUJBQXFCLENBQUNDLFFBQStDO1FBQ3pFQyxRQUFRQyxHQUFHLENBQUNGLE1BQU1HLE1BQU0sQ0FBQ0MsS0FBSztRQUM5QlYsZUFBZVcsU0FBU0wsTUFBTUcsTUFBTSxDQUFDQyxLQUFLLEVBQUU7SUFDOUM7SUFFQUgsUUFBUUMsR0FBRyxDQUFDWDtJQUVaLHFCQUNFLDhEQUFDZTs7MEJBQ0MsOERBQUNDOzBCQUFHOzs7Ozs7WUFDSGhCLFFBQVFpQixNQUFNLENBQUMsQ0FBQ0MsTUFBTUMsUUFBUUMsUUFBVTtnQkFDdkMsSUFBSUEsUUFBUSxNQUFNLEdBQUc7b0JBQ25CRixLQUFLRyxJQUFJLENBQUMsRUFBRTtnQkFDZCxDQUFDO2dCQUNESCxJQUFJLENBQUNBLEtBQUtJLE1BQU0sR0FBRyxFQUFFLENBQUNELElBQUksQ0FBQ0Y7Z0JBQzNCLE9BQU9EO1lBQ1QsR0FBRyxFQUFFLEVBQUVLLEdBQUcsQ0FBQyxDQUFDQyxLQUFLQyx5QkFDZiw4REFBQzdCLGdEQUFHQTtvQkFBZ0I4QixXQUFVOzhCQUMzQkYsSUFBSUQsR0FBRyxDQUFDLENBQUNKLFFBQVFRLHlCQUNoQiw4REFBQzlCLGdEQUFHQTtzQ0FDRiw0RUFBQ0MsMERBQU1BO2dDQUFDcUIsUUFBUUEsT0FBT2IsSUFBSTtnQ0FBRXNCLFVBQVVwQjs7Ozs7Ozs7Ozs7bUJBSG5DaUI7Ozs7OzBCQVFaLDhEQUFDSTtnQkFBT0MsU0FBUzFCOzBCQUFnQjs7Ozs7Ozs7Ozs7O0FBR3ZDO0dBMUNNTDtLQUFBQTs7QUE0RE4sK0RBQWVBLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXgudHN4PzA3ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnXG5pbXBvcnQgeyBHZXRTdGF0aWNQcm9wcywgTmV4dFBhZ2UgfSBmcm9tICduZXh0J1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBSb3csIENvbCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCdcbmltcG9ydCBTbGlkZXIgZnJvbSAnQC9Db21wb25lbnRzL1NsaWRlcidcblxuaW50ZXJmYWNlIE1ldHJpYyB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmF0ZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBtZXRyaWNzOiBNZXRyaWNbXTtcbn1cblxuY29uc3QgSG9tZTogTmV4dFBhZ2U8UHJvcHM+ID0gKCkgPT4ge1xuICBjb25zdCBbbWV0cmljcywgc2V0TWV0cmljc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzbGlkZXJWYWx1ZSwgc2V0U2xpZGVyVmFsdWVdID0gdXNlU3RhdGUoMSk7XG5cbiAgLy8gQWRkIGR1bW15IG1ldHJpY1xuICBjb25zdCBhZGREdW1teU1ldHJpYyA9ICgpID0+IHtcbiAgICBjb25zdCBkdW1teU1ldHJpYzogTWV0cmljID0ge1xuICAgICAgbmFtZTogXCJEdW1teSBNZXRyaWNcIixcbiAgICAgIHJhdGU6IDAsXG4gICAgfTtcbiAgICBzZXRNZXRyaWNzKFsuLi5tZXRyaWNzLCBkdW1teU1ldHJpY10pO1xuICB9O1xuXG4gIC8vIEdldCBzbGlkZXIgdmFsdWVcbiAgY29uc3QgaGFuZGxlU2xpZGVyQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgc2V0U2xpZGVyVmFsdWUocGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlLCAxMCkpO1xuICB9O1xuXG4gIGNvbnNvbGUubG9nKG1ldHJpY3MpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMT5IZWxsbzwvaDE+XG4gICAgICB7bWV0cmljcy5yZWR1Y2UoKHJvd3MsIG1ldHJpYywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ICUgMiA9PT0gMCkge1xuICAgICAgICAgIHJvd3MucHVzaChbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcm93c1tyb3dzLmxlbmd0aCAtIDFdLnB1c2gobWV0cmljKTtcbiAgICAgICAgcmV0dXJuIHJvd3M7XG4gICAgICB9LCBbXSkubWFwKChyb3csIHJvd0luZGV4KSA9PiAoXG4gICAgICAgIDxSb3cga2V5PXtyb3dJbmRleH0gY2xhc3NOYW1lPVwianVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgIHtyb3cubWFwKChtZXRyaWMsIGNvbEluZGV4KSA9PiAoXG4gICAgICAgICAgICA8Q29sPlxuICAgICAgICAgICAgICA8U2xpZGVyIG1ldHJpYz17bWV0cmljLm5hbWV9IG9uQ2hhbmdlPXtoYW5kbGVTbGlkZXJDaGFuZ2V9IC8+XG4gICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9Sb3c+XG4gICAgICApKX1cbiAgICAgIDxidXR0b24gb25DbGljaz17YWRkRHVtbXlNZXRyaWN9PkFkZCBEdW1teSBNZXRyaWM8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzOiBHZXRTdGF0aWNQcm9wcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBuYW1lOiAnTW9uaWNhJyxcbiAgICAgICAgICBlbWFpbDogJ21vbmljYUBwcmlzbWEuaW8nXG4gICAgICAgIH0sXG4gICAgICB9KVxuICBjb25zdCBmZWVkID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZE1hbnkoe1xuICAgIHdoZXJlOiB7IG5hbWU6IFwiTW9uaWNhXCIgfVxuICAgIH0pO1xuICByZXR1cm4geyBcbiAgICBwcm9wczogeyBmZWVkIH0sIFxuICAgIHJldmFsaWRhdGU6IDEwIFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJSb3ciLCJDb2wiLCJTbGlkZXIiLCJIb21lIiwibWV0cmljcyIsInNldE1ldHJpY3MiLCJzbGlkZXJWYWx1ZSIsInNldFNsaWRlclZhbHVlIiwiYWRkRHVtbXlNZXRyaWMiLCJkdW1teU1ldHJpYyIsIm5hbWUiLCJyYXRlIiwiaGFuZGxlU2xpZGVyQ2hhbmdlIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwidmFsdWUiLCJwYXJzZUludCIsImRpdiIsImgxIiwicmVkdWNlIiwicm93cyIsIm1ldHJpYyIsImluZGV4IiwicHVzaCIsImxlbmd0aCIsIm1hcCIsInJvdyIsInJvd0luZGV4IiwiY2xhc3NOYW1lIiwiY29sSW5kZXgiLCJvbkNoYW5nZSIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.tsx\n"));

/***/ })

});
(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/421c4_framer-motion_dist_es_motion_e4a9d4._.js", {

"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "Feature": ()=>Feature
});
class Feature {
    constructor(node){
        this.isMounted = false;
        this.node = node;
    }
    update() {}
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/animation/index.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "AnimationFeature": ()=>AnimationFeature
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$animation$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/utils/animation-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
class AnimationFeature extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Feature"] {
    /**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */ constructor(node){
        super(node);
        node.animationState || (node.animationState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$animation$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAnimationState"])(node));
    }
    updateAnimationControlsSubscription() {
        const { animate } = this.node.getProps();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationControls"])(animate)) {
            this.unmountControls = animate.subscribe(this.node);
        }
    }
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */ mount() {
        this.updateAnimationControlsSubscription();
    }
    update() {
        const { animate } = this.node.getProps();
        const { animate: prevAnimate } = this.node.prevProps || {};
        if (animate !== prevAnimate) {
            this.updateAnimationControlsSubscription();
        }
    }
    unmount() {
        var _a;
        this.node.animationState.reset();
        (_a = this.unmountControls) === null || _a === void 0 ? void 0 : _a.call(this);
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "ExitAnimationFeature": ()=>ExitAnimationFeature
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
let id = 0;
class ExitAnimationFeature extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Feature"] {
    constructor(){
        super(...arguments);
        this.id = id++;
    }
    update() {
        if (!this.node.presenceContext) return;
        const { isPresent, onExitComplete } = this.node.presenceContext;
        const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
        if (!this.node.animationState || isPresent === prevIsPresent) {
            return;
        }
        const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
        if (onExitComplete && !isPresent) {
            exitAnimation.then(()=>onExitComplete(this.id));
        }
    }
    mount() {
        const { register } = this.node.presenceContext || {};
        if (register) {
            this.unmount = register(this.id);
        }
    }
    unmount() {}
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/animations.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "animations": ()=>animations
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animation$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/animation/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animation$2f$exit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const animations = {
    animation: {
        Feature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animation$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationFeature"]
    },
    exit: {
        Feature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$animation$2f$exit$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExitAnimationFeature"]
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

/**
 * Map an IntersectionHandler callback to an element. We only ever make one handler for one
 * element, so even though these handlers might all be triggered by different
 * observers, we can keep them in the same map.
 */ __turbopack_esm__({
    "observeIntersection": ()=>observeIntersection
});
const observerCallbacks = new WeakMap();
/**
 * Multiple observers can be created for multiple element/document roots. Each with
 * different settings. So here we store dictionaries of observers to each root,
 * using serialised settings (threshold/margin) as lookup keys.
 */ const observers = new WeakMap();
const fireObserverCallback = (entry)=>{
    const callback = observerCallbacks.get(entry.target);
    callback && callback(entry);
};
const fireAllObserverCallbacks = (entries)=>{
    entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
    const lookupRoot = root || document;
    /**
     * If we don't have an observer lookup map for this root, create one.
     */ if (!observers.has(lookupRoot)) {
        observers.set(lookupRoot, {});
    }
    const rootObservers = observers.get(lookupRoot);
    const key = JSON.stringify(options);
    /**
     * If we don't have an observer for this combination of root and settings,
     * create one.
     */ if (!rootObservers[key]) {
        rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, {
            root,
            ...options
        });
    }
    return rootObservers[key];
}
function observeIntersection(element, options, callback) {
    const rootInteresectionObserver = initIntersectionObserver(options);
    observerCallbacks.set(element, callback);
    rootInteresectionObserver.observe(element);
    return ()=>{
        observerCallbacks.delete(element);
        rootInteresectionObserver.unobserve(element);
    };
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "InViewFeature": ()=>InViewFeature
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$viewport$2f$observers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/Feature.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const thresholdNames = {
    some: 0,
    all: 1
};
class InViewFeature extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$Feature$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Feature"] {
    constructor(){
        super(...arguments);
        this.hasEnteredView = false;
        this.isInView = false;
    }
    startObserver() {
        this.unmount();
        const { viewport = {} } = this.node.getProps();
        const { root, margin: rootMargin, amount = "some", once } = viewport;
        const options = {
            root: root ? root.current : undefined,
            rootMargin,
            threshold: typeof amount === "number" ? amount : thresholdNames[amount]
        };
        const onIntersectionUpdate = (entry)=>{
            const { isIntersecting } = entry;
            /**
             * If there's been no change in the viewport state, early return.
             */ if (this.isInView === isIntersecting) return;
            this.isInView = isIntersecting;
            /**
             * Handle hasEnteredView. If this is only meant to run once, and
             * element isn't visible, early return. Otherwise set hasEnteredView to true.
             */ if (once && !isIntersecting && this.hasEnteredView) {
                return;
            } else if (isIntersecting) {
                this.hasEnteredView = true;
            }
            if (this.node.animationState) {
                this.node.animationState.setActive("whileInView", isIntersecting);
            }
            /**
             * Use the latest committed props rather than the ones in scope
             * when this observer is created
             */ const { onViewportEnter, onViewportLeave } = this.node.getProps();
            const callback = isIntersecting ? onViewportEnter : onViewportLeave;
            callback && callback(entry);
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$viewport$2f$observers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeIntersection"])(this.node.current, options, onIntersectionUpdate);
    }
    mount() {
        this.startObserver();
    }
    update() {
        if (typeof IntersectionObserver === "undefined") return;
        const { props, prevProps } = this.node;
        const hasOptionsChanged = [
            "amount",
            "margin",
            "root"
        ].some(hasViewportOptionChanged(props, prevProps));
        if (hasOptionsChanged) {
            this.startObserver();
        }
    }
    unmount() {}
}
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
    return (name)=>viewport[name] !== prevViewport[name];
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/gestures.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "gestureAnimations": ()=>gestureAnimations
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$viewport$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$press$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/gestures/press.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$focus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/gestures/focus.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$hover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/gestures/hover.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const gestureAnimations = {
    inView: {
        Feature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$viewport$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InViewFeature"]
    },
    tap: {
        Feature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$press$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PressGesture"]
    },
    focus: {
        Feature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$focus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FocusGesture"]
    },
    hover: {
        Feature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$hover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HoverGesture"]
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "MeasureLayout": ()=>MeasureLayout
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$correction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$node$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/projection/node/state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/microtask.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$use$2d$presence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
class MeasureLayoutWithContext extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    /**
     * This only mounts projection nodes for components that
     * need measuring, we might want to do it for all components
     * in order to incorporate transforms
     */ componentDidMount() {
        const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
        const { projection } = visualElement;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$correction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addScaleCorrector"])(defaultScaleCorrectors);
        if (projection) {
            if (layoutGroup.group) layoutGroup.group.add(projection);
            if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
                switchLayoutGroup.register(projection);
            }
            projection.root.didUpdate();
            projection.addEventListener("animationComplete", ()=>{
                this.safeToRemove();
            });
            projection.setOptions({
                ...projection.options,
                onExitComplete: ()=>this.safeToRemove()
            });
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$node$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globalProjectionState"].hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(prevProps) {
        const { layoutDependency, visualElement, drag, isPresent } = this.props;
        const projection = visualElement.projection;
        if (!projection) return null;
        /**
         * TODO: We use this data in relegate to determine whether to
         * promote a previous element. There's no guarantee its presence data
         * will have updated by this point - if a bug like this arises it will
         * have to be that we markForRelegation and then find a new lead some other way,
         * perhaps in didUpdate
         */ projection.isPresent = isPresent;
        if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === undefined) {
            projection.willUpdate();
        } else {
            this.safeToRemove();
        }
        if (prevProps.isPresent !== isPresent) {
            if (isPresent) {
                projection.promote();
            } else if (!projection.relegate()) {
                /**
                 * If there's another stack member taking over from this one,
                 * it's in charge of the exit animation and therefore should
                 * be in charge of the safe to remove. Otherwise we call it here.
                 */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].postRender(()=>{
                    const stack = projection.getStack();
                    if (!stack || !stack.members.length) {
                        this.safeToRemove();
                    }
                });
            }
        }
        return null;
    }
    componentDidUpdate() {
        const { projection } = this.props.visualElement;
        if (projection) {
            projection.root.didUpdate();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["microtask"].postRender(()=>{
                if (!projection.currentAnimation && projection.isLead()) {
                    this.safeToRemove();
                }
            });
        }
    }
    componentWillUnmount() {
        const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
        const { projection } = visualElement;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup && layoutGroup.group) layoutGroup.group.remove(projection);
            if (promoteContext && promoteContext.deregister) promoteContext.deregister(projection);
        }
    }
    safeToRemove() {
        const { safeToRemove } = this.props;
        safeToRemove && safeToRemove();
    }
    render() {
        return null;
    }
}
function MeasureLayout(props) {
    const [isPresent, safeToRemove] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$use$2d$presence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePresence"])();
    const layoutGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutGroupContext"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MeasureLayoutWithContext, {
        ...props,
        layoutGroup: layoutGroup,
        switchLayoutGroup: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchLayoutGroupContext"]),
        isPresent: isPresent,
        safeToRemove: safeToRemove
    });
}
const defaultScaleCorrectors = {
    borderRadius: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
        applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius"
        ]
    },
    borderTopLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderTopRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderBottomLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderBottomRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBoxShadow"]
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/drag.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "drag": ()=>drag
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$pan$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/gestures/pan/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/gestures/drag/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$node$2f$HTMLProjectionNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$layout$2f$MeasureLayout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const drag = {
    pan: {
        Feature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$pan$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanGesture"]
    },
    drag: {
        Feature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DragGesture"],
        ProjectionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$node$2f$HTMLProjectionNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLProjectionNode"],
        MeasureLayout: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$layout$2f$MeasureLayout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureLayout"]
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/layout.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "layout": ()=>layout
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$node$2f$HTMLProjectionNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$layout$2f$MeasureLayout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const layout = {
    layout: {
        ProjectionNode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$node$2f$HTMLProjectionNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HTMLProjectionNode"],
        MeasureLayout: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$layout$2f$MeasureLayout$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeasureLayout"]
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "motionComponentSymbol": ()=>motionComponentSymbol
});
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "featureDefinitions": ()=>featureDefinitions
});
const featureProps = {
    animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag"
    ],
    exit: [
        "exit"
    ],
    drag: [
        "drag",
        "dragControls"
    ],
    focus: [
        "whileFocus"
    ],
    hover: [
        "whileHover",
        "onHoverStart",
        "onHoverEnd"
    ],
    tap: [
        "whileTap",
        "onTap",
        "onTapStart",
        "onTapCancel"
    ],
    pan: [
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd"
    ],
    inView: [
        "whileInView",
        "onViewportEnter",
        "onViewportLeave"
    ],
    layout: [
        "layout",
        "layoutId"
    ]
};
const featureDefinitions = {};
for(const key in featureProps){
    featureDefinitions[key] = {
        isEnabled: (props)=>featureProps[key].some((name)=>!!props[name])
    };
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/load-features.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "loadFeatures": ()=>loadFeatures
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function loadFeatures(features) {
    for(const key in features){
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureDefinitions"][key] = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureDefinitions"][key],
            ...features[key]
        };
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "useVisualElement": ()=>useVisualElement
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$data$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/microtask.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
let scheduleHandoffComplete = false;
function useVisualElement(Component, visualState, props, createVisualElement, ProjectionNodeConstructor) {
    const { visualElement: parent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"]);
    const lazyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LazyContext"]);
    const presenceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]);
    const reducedMotionConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfigContext"]).reducedMotion;
    const visualElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */ createVisualElement = createVisualElement || lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
            visualState,
            parent,
            props,
            presenceContext,
            blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
            reducedMotionConfig
        });
    }
    const visualElement = visualElementRef.current;
    /**
     * Load Motion gesture and animation features. These are rendered as renderless
     * components so each feature can optionally make use of React lifecycle methods.
     */ const initialLayoutGroupConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchLayoutGroupContext"]);
    if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
        createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInsertionEffect"])(()=>{
        visualElement && visualElement.update(props, presenceContext);
    });
    /**
     * Cache this value as we want to know whether HandoffAppearAnimations
     * was present on initial render - it will be deleted after this.
     */ const wantsHandoff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Boolean(props[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$data$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimizedAppearDataAttribute"]] && !window.HandoffComplete));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        if (!visualElement) return;
        visualElement.updateFeatures();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["microtask"].render(visualElement.render);
        /**
         * Ideally this function would always run in a useEffect.
         *
         * However, if we have optimised appear animations to handoff from,
         * it needs to happen synchronously to ensure there's no flash of
         * incorrect styles in the event of a hydration error.
         *
         * So if we detect a situtation where optimised appear animations
         * are running, we use useLayoutEffect to trigger animations.
         */ if (wantsHandoff.current && visualElement.animationState) {
            visualElement.animationState.animateChanges();
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!visualElement) return;
        if (!wantsHandoff.current && visualElement.animationState) {
            visualElement.animationState.animateChanges();
        }
        if (wantsHandoff.current) {
            wantsHandoff.current = false;
            // This ensures all future calls to animateChanges() will run in useEffect
            if (!scheduleHandoffComplete) {
                scheduleHandoffComplete = true;
                queueMicrotask(completeHandoff);
            }
        }
    });
    return visualElement;
}
function completeHandoff() {
    window.HandoffComplete = true;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
    const { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot } = props;
    visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? undefined : getClosestProjectingNode(visualElement.parent));
    visualElement.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: Boolean(drag) || dragConstraints && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(dragConstraints),
        visualElement,
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */ animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig,
        layoutScroll,
        layoutRoot
    });
}
function getClosestProjectingNode(visualElement) {
    if (!visualElement) return undefined;
    return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "useMotionRef": ()=>useMotionRef
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */ function useMotionRef(visualState, visualElement, externalRef) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])((instance)=>{
        instance && visualState.mount && visualState.mount(instance);
        if (visualElement) {
            if (instance) {
                visualElement.mount(instance);
            } else {
                visualElement.unmount();
            }
        }
        if (externalRef) {
            if (typeof externalRef === "function") {
                externalRef(instance);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(externalRef)) {
                externalRef.current = instance;
            }
        }
    }, /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */ [
        visualElement
    ]);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/index.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "createMotionComponent": ()=>createMotionComponent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$symbol$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$load$2d$features$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/load-features.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$motion$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */ function createMotionComponent({ preloadedFeatures, createVisualElement, useRender, useVisualState, Component }) {
    preloadedFeatures && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$load$2d$features$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFeatures"])(preloadedFeatures);
    function MotionComponent(props, externalRef) {
        /**
         * If we need to measure the element we load this functionality in a
         * separate class component in order to gain access to getSnapshotBeforeUpdate.
         */ let MeasureLayout;
        const configAndProps = {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfigContext"]),
            ...props,
            layoutId: useLayoutId(props)
        };
        const { isStatic } = configAndProps;
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateMotionContext"])(props);
        const visualState = useVisualState(props, isStatic);
        if (!isStatic && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowser"]) {
            useStrictMode(configAndProps, preloadedFeatures);
            const layoutProjection = getProjectionFunctionality(configAndProps);
            MeasureLayout = layoutProjection.MeasureLayout;
            /**
             * Create a VisualElement for this component. A VisualElement provides a common
             * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
             * providing a way of rendering to these APIs outside of the React render loop
             * for more performant animations and interactions
             */ context.visualElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisualElement"])(Component, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
        }
        /**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"].Provider, {
            value: context,
            children: [
                MeasureLayout && context.visualElement ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MeasureLayout, {
                    visualElement: context.visualElement,
                    ...configAndProps
                }) : null,
                useRender(Component, props, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$motion$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionRef"])(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)
            ]
        });
    }
    const ForwardRefComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(MotionComponent);
    ForwardRefComponent[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$symbol$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionComponentSymbol"]] = Component;
    return ForwardRefComponent;
}
function useLayoutId({ layoutId }) {
    const layoutGroupId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutGroupContext"]).id;
    return layoutGroupId && layoutId !== undefined ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
    const isStrict = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LazyContext"]).strict;
    /**
     * If we're in development mode, check to make sure we're not rendering a motion component
     * as a child of LazyMotion, as this will break the file-size benefits of using it.
     */ if (("TURBOPACK compile-time value", "development") !== "production" && preloadedFeatures && isStrict) {
        const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
        configAndProps.ignoreStrict ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warning"])(false, strictMessage) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(false, strictMessage);
    }
}
function getProjectionFunctionality(props) {
    const { drag, layout } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureDefinitions"];
    if (!drag && !layout) return {};
    const combined = {
        ...drag,
        ...layout
    };
    return {
        MeasureLayout: (drag === null || drag === void 0 ? void 0 : drag.isEnabled(props)) || (layout === null || layout === void 0 ? void 0 : layout.isEnabled(props)) ? combined.MeasureLayout : undefined,
        ProjectionNode: combined.ProjectionNode
    };
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "makeUseVisualState": ()=>makeUseVisualState
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$get$2d$will$2d$change$2d$name$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/use-will-change/get-will-change-name.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/array.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$utils$2f$resolve$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
function makeState({ applyWillChange = false, scrapeMotionValuesFromProps, createRenderState, onMount }, props, context, presenceContext, isStatic) {
    const state = {
        latestValues: makeLatestValues(props, context, presenceContext, isStatic ? false : applyWillChange, scrapeMotionValuesFromProps),
        renderState: createRenderState()
    };
    if (onMount) {
        state.mount = (instance)=>onMount(props, instance, state);
    }
    return state;
}
const makeUseVisualState = (config)=>(props, isStatic)=>{
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"]);
        const presenceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]);
        const make = ()=>makeState(config, props, context, presenceContext, isStatic);
        return isStatic ? make() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConstant"])(make);
    };
function addWillChange(willChange, name) {
    const memberName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$get$2d$will$2d$change$2d$name$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWillChangeName"])(name);
    if (memberName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addUniqueItem"])(willChange, memberName);
    }
}
function forEachDefinition(props, definition, callback) {
    const list = Array.isArray(definition) ? definition : [
        definition
    ];
    for(let i = 0; i < list.length; i++){
        const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveVariantFromProps"])(props, list[i]);
        if (resolved) {
            const { transitionEnd, transition, ...target } = resolved;
            callback(target, transitionEnd);
        }
    }
}
function makeLatestValues(props, context, presenceContext, shouldApplyWillChange, scrapeMotionValues) {
    var _a;
    const values = {};
    const willChange = [];
    const applyWillChange = shouldApplyWillChange && ((_a = props.style) === null || _a === void 0 ? void 0 : _a.willChange) === undefined;
    const motionValues = scrapeMotionValues(props, {});
    for(const key in motionValues){
        values[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$utils$2f$resolve$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMotionValue"])(motionValues[key]);
    }
    let { initial, animate } = props;
    const isControllingVariants$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isControllingVariants"])(props);
    const isVariantNode$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantNode"])(props);
    if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
        if (initial === undefined) initial = context.initial;
        if (animate === undefined) animate = context.animate;
    }
    let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
    isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
    const variantToSet = isInitialAnimationBlocked ? animate : initial;
    if (variantToSet && typeof variantToSet !== "boolean" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationControls"])(variantToSet)) {
        forEachDefinition(props, variantToSet, (target, transitionEnd)=>{
            for(const key in target){
                let valueTarget = target[key];
                if (Array.isArray(valueTarget)) {
                    /**
                     * Take final keyframe if the initial animation is blocked because
                     * we want to initialise at the end of that blocked animation.
                     */ const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
                    valueTarget = valueTarget[index];
                }
                if (valueTarget !== null) {
                    values[key] = valueTarget;
                }
            }
            for(const key in transitionEnd){
                values[key] = transitionEnd[key];
            }
        });
    }
    // Add animating values to will-change
    if (applyWillChange) {
        if (animate && initial !== false && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationControls"])(animate)) {
            forEachDefinition(props, animate, (target)=>{
                for(const key in target){
                    addWillChange(willChange, key);
                }
            });
        }
        if (willChange.length) {
            values.willChange = willChange.join(",");
        }
    }
    return values;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

__turbopack_esm__({
    "isForcedMotionValue": ()=>isForcedMotionValue
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/html/utils/transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$correction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function isForcedMotionValue(key, { layout, layoutId }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key) || key.startsWith("origin") || (layout || layoutId !== undefined) && (!!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$correction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scaleCorrectors"][key] || key === "opacity");
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname }) => (() => {
"use strict";

/**
 * A list of all valid MotionProps.
 *
 * @privateRemarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */ __turbopack_esm__({
    "isValidMotionProp": ()=>isValidMotionProp
});
const validMotionProps = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "ignoreStrict",
    "viewport"
]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */ function isValidMotionProp(key) {
    return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
;

})()),
}]);

//# sourceMappingURL=421c4_framer-motion_dist_es_motion_e4a9d4._.js.map
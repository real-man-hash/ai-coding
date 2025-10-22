module.exports = {

"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/render-step.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "createRenderStep": ()=>createRenderStep
});
function createRenderStep(runNextFrame) {
    /**
     * We create and reuse two queues, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */ let thisFrame = new Set();
    let nextFrame = new Set();
    /**
     * Track whether we're currently processing jobs in this step. This way
     * we can decide whether to schedule new jobs for this frame or next.
     */ let isProcessing = false;
    let flushNextFrame = false;
    /**
     * A set of processes which were marked keepAlive when scheduled.
     */ const toKeepAlive = new WeakSet();
    let latestFrameData = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false
    };
    function triggerCallback(callback) {
        if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
        }
        callback(latestFrameData);
    }
    const step = {
        /**
         * Schedule a process to run on the next frame.
         */ schedule: (callback, keepAlive = false, immediate = false)=>{
            const addToCurrentFrame = immediate && isProcessing;
            const queue = addToCurrentFrame ? thisFrame : nextFrame;
            if (keepAlive) toKeepAlive.add(callback);
            if (!queue.has(callback)) queue.add(callback);
            return callback;
        },
        /**
         * Cancel the provided callback from running on the next frame.
         */ cancel: (callback)=>{
            nextFrame.delete(callback);
            toKeepAlive.delete(callback);
        },
        /**
         * Execute all schedule callbacks.
         */ process: (frameData)=>{
            latestFrameData = frameData;
            /**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */ if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            [thisFrame, nextFrame] = [
                nextFrame,
                thisFrame
            ];
            // Clear the next frame queue
            nextFrame.clear();
            // Execute this frame
            thisFrame.forEach(triggerCallback);
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        }
    };
    return step;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/batcher.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "createRenderBatcher": ()=>createRenderBatcher,
    "stepsOrder": ()=>stepsOrder
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$render$2d$step$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/render-step.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$GlobalConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const stepsOrder = [
    "read",
    "resolveKeyframes",
    "update",
    "preRender",
    "render",
    "postRender"
];
const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false
    };
    const flagRunNextFrame = ()=>runNextFrame = true;
    const steps = stepsOrder.reduce((acc, key)=>{
        acc[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$render$2d$step$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRenderStep"])(flagRunNextFrame);
        return acc;
    }, {});
    const { read, resolveKeyframes, update, preRender, render, postRender } = steps;
    const processBatch = ()=>{
        const timestamp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$GlobalConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].useManualTiming ? state.timestamp : performance.now();
        runNextFrame = false;
        state.delta = useDefaultElapsed ? 1000 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
        state.timestamp = timestamp;
        state.isProcessing = true;
        // Unrolled render loop for better per-frame performance
        read.process(state);
        resolveKeyframes.process(state);
        update.process(state);
        preRender.process(state);
        render.process(state);
        postRender.process(state);
        state.isProcessing = false;
        if (runNextFrame && allowKeepAlive) {
            useDefaultElapsed = false;
            scheduleNextBatch(processBatch);
        }
    };
    const wake = ()=>{
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!state.isProcessing) {
            scheduleNextBatch(processBatch);
        }
    };
    const schedule = stepsOrder.reduce((acc, key)=>{
        const step = steps[key];
        acc[key] = (process, keepAlive = false, immediate = false)=>{
            if (!runNextFrame) wake();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    const cancel = (process)=>{
        for(let i = 0; i < stepsOrder.length; i++){
            steps[stepsOrder[i]].cancel(process);
        }
    };
    return {
        schedule,
        cancel,
        state,
        steps
    };
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "cancelFrame": ()=>cancelFrame,
    "frame": ()=>frame,
    "frameData": ()=>frameData,
    "steps": ()=>steps
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/batcher.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/noop.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const { schedule: frame, cancel: cancelFrame, state: frameData, steps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRenderBatcher"])(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"], true);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/sync-time.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "time": ()=>time
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$GlobalConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
let now;
function clearTime() {
    now = undefined;
}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */ const time = {
    now: ()=>{
        if (now === undefined) {
            time.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frameData"].isProcessing || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$GlobalConfig$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].useManualTiming ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frameData"].timestamp : performance.now());
        }
        return now;
    },
    set: (newTime)=>{
        now = newTime;
        queueMicrotask(clearTime);
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/microtask.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "cancelMicrotask": ()=>cancelMicrotask,
    "microtask": ()=>microtask
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/batcher.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const { schedule: microtask, cancel: cancelMicrotask } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRenderBatcher"])(queueMicrotask, false);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "MotionGlobalConfig": ()=>MotionGlobalConfig
});
const MotionGlobalConfig = {
    skipAnimations: false,
    useManualTiming: false
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/noop.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "noop": ()=>noop
});
const noop = (any)=>any;
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/time-conversion.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */ __turbopack_esm__({
    "millisecondsToSeconds": ()=>millisecondsToSeconds,
    "secondsToMilliseconds": ()=>secondsToMilliseconds
});
const secondsToMilliseconds = (seconds)=>seconds * 1000;
const millisecondsToSeconds = (milliseconds)=>milliseconds / 1000;
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "instantAnimationState": ()=>instantAnimationState
});
const instantAnimationState = {
    current: false
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/memo.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "memo": ()=>memo
});
function memo(callback) {
    let result;
    return ()=>{
        if (result === undefined) result = callback();
        return result;
    };
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/errors.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "invariant": ()=>invariant,
    "warning": ()=>warning
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/noop.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
let warning = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"];
let invariant = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"];
if ("TURBOPACK compile-time truthy", 1) {
    warning = (check, message)=>{
        if (!check && typeof console !== "undefined") {
            console.warn(message);
        }
    };
    invariant = (check, message)=>{
        if (!check) {
            throw new Error(message);
        }
    };
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */ __turbopack_esm__({
    "isNumericalString": ()=>isNumericalString
});
const isNumericalString = (v)=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/clamp.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "clamp": ()=>clamp
});
const clamp = (min, max, v)=>{
    if (v > max) return max;
    if (v < min) return min;
    return v;
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Check if the value is a zero value string like "0px" or "0%"
 */ __turbopack_esm__({
    "isZeroValueString": ()=>isZeroValueString
});
const isZeroValueString = (v)=>/^0[^.\s]+$/u.test(v);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/ __turbopack_esm__({
    "velocityPerSecond": ()=>velocityPerSecond
});
function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/offsets/time.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "convertOffsetToTimes": ()=>convertOffsetToTimes
});
function convertOffsetToTimes(offset, duration) {
    return offset.map((o)=>o * duration);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/progress.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.

  @param [number]: Lower limit
  @param [number]: Upper limit
  @param [number]: Value to find progress within given range
  @return [number]: Progress of value within range as expressed 0-1
*/ __turbopack_esm__({
    "progress": ()=>progress
});
const progress = (from, to, value)=>{
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/number.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/ __turbopack_esm__({
    "mixNumber": ()=>mixNumber
});
const mixNumber = (from, to, progress)=>{
    return from + (to - from) * progress;
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/offsets/fill.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "fillOffset": ()=>fillOffset
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/progress.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/number.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for(let i = 1; i <= remaining; i++){
        const offsetProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["progress"])(0, remaining, i);
        offset.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixNumber"])(min, 1, offsetProgress));
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/offsets/default.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "defaultOffset": ()=>defaultOffset
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$offsets$2f$fill$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/offsets/fill.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function defaultOffset(arr) {
    const offset = [
        0
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$offsets$2f$fill$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fillOffset"])(offset, arr.length - 1);
    return offset;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/immediate.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "mixImmediate": ()=>mixImmediate
});
function mixImmediate(a, b) {
    return (p)=>p > 0 ? b : a;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/visibility.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "invisibleValues": ()=>invisibleValues,
    "mixVisibility": ()=>mixVisibility
});
const invisibleValues = new Set([
    "none",
    "hidden"
]);
/**
 * Returns a function that, when provided a progress value between 0 and 1,
 * will return the "none" or "hidden" string only when the progress is that of
 * the origin or target.
 */ function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
        return (p)=>p <= 0 ? origin : target;
    } else {
        return (p)=>p >= 1 ? target : origin;
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/pipe.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */ __turbopack_esm__({
    "pipe": ()=>pipe
});
const combineFunctions = (a, b)=>(v)=>b(a(v));
const pipe = (...transformers)=>transformers.reduce(combineFunctions);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Adapted from https://gist.github.com/mjackson/5311256
__turbopack_esm__({
    "hslaToRgba": ()=>hslaToRgba
});
function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    } else {
        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha
    };
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/color.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "mixColor": ()=>mixColor,
    "mixLinearColor": ()=>mixLinearColor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/number.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/rgba.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/immediate.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/hsla.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/errors.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$hsla$2d$to$2d$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
const mixLinearColor = (from, to, v)=>{
    const fromExpo = from * from;
    const expo = v * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hex"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgba"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hsla"]
];
const getColorType = (v)=>colorTypes.find((type)=>type.test(v));
function asRGBA(color) {
    const type = getColorType(color);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warning"])(Boolean(type), `'${color}' is not an animatable color. Use the equivalent color code instead.`);
    if (!Boolean(type)) return false;
    let model = type.parse(color);
    if (type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hsla"]) {
        // TODO Remove this cast - needed since Framer Motion's stricter typing
        model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$hsla$2d$to$2d$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hslaToRgba"])(model);
    }
    return model;
}
const mixColor = (from, to)=>{
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixImmediate"])(from, to);
    }
    const blended = {
        ...fromRGBA
    };
    return (v)=>{
        blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
        blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
        blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
        blended.alpha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixNumber"])(fromRGBA.alpha, toRGBA.alpha, v);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgba"].transform(blended);
    };
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/complex.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getMixer": ()=>getMixer,
    "mixArray": ()=>mixArray,
    "mixComplex": ()=>mixComplex,
    "mixObject": ()=>mixObject
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/errors.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/immediate.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$visibility$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/visibility.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/pipe.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/number.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$color$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/color.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs [app-ssr] (ecmascript)");
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
function mixNumber(a, b) {
    return (p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixNumber"])(a, b, p);
}
function getMixer(a) {
    if (typeof a === "number") {
        return mixNumber;
    } else if (typeof a === "string") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCSSVariableToken"])(a) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixImmediate"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"].test(a) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$color$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixColor"] : mixComplex;
    } else if (Array.isArray(a)) {
        return mixArray;
    } else if (typeof a === "object") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"].test(a) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$color$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixColor"] : mixObject;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixImmediate"];
}
function mixArray(a, b) {
    const output = [
        ...a
    ];
    const numValues = output.length;
    const blendValue = a.map((v, i)=>getMixer(v)(v, b[i]));
    return (p)=>{
        for(let i = 0; i < numValues; i++){
            output[i] = blendValue[i](p);
        }
        return output;
    };
}
function mixObject(a, b) {
    const output = {
        ...a,
        ...b
    };
    const blendValue = {};
    for(const key in output){
        if (a[key] !== undefined && b[key] !== undefined) {
            blendValue[key] = getMixer(a[key])(a[key], b[key]);
        }
    }
    return (v)=>{
        for(const key in blendValue){
            output[key] = blendValue[key](v);
        }
        return output;
    };
}
function matchOrder(origin, target) {
    var _a;
    const orderedOrigin = [];
    const pointers = {
        color: 0,
        var: 0,
        number: 0
    };
    for(let i = 0; i < target.values.length; i++){
        const type = target.types[i];
        const originIndex = origin.indexes[type][pointers[type]];
        const originValue = (_a = origin.values[originIndex]) !== null && _a !== void 0 ? _a : 0;
        orderedOrigin[i] = originValue;
        pointers[type]++;
    }
    return orderedOrigin;
}
const mixComplex = (origin, target)=>{
    const template = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["complex"].createTransformer(target);
    const originStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["analyseComplexValue"])(origin);
    const targetStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["analyseComplexValue"])(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$visibility$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invisibleValues"].has(origin) && !targetStats.values.length || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$visibility$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invisibleValues"].has(target) && !originStats.values.length) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$visibility$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixVisibility"])(origin, target);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pipe"])(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warning"])(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixImmediate"])(origin, target);
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/index.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "mix": ()=>mix
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$complex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/complex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/number.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function mix(from, to, p) {
    if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixNumber"])(from, to, p);
    }
    const mixer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$complex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMixer"])(from);
    return mixer(from, to);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/interpolate.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "interpolate": ()=>interpolate
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/mix/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/noop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/pipe.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/errors.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/progress.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$clamp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/clamp.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$mix$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mix"];
    const numMixers = output.length - 1;
    for(let i = 0; i < numMixers; i++){
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"] : ease;
            mixer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$pipe$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pipe"])(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
/**
 * Create a function that maps from a numerical input array to a generic output array.
 *
 * Accepts:
 *   - Numbers
 *   - Colors (hex, hsl, hsla, rgb, rgba)
 *   - Complex (combinations of one or more numbers or strings)
 *
 * ```jsx
 * const mixColor = interpolate([0, 1], ['#fff', '#000'])
 *
 * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
 * ```
 *
 * TODO Revist this approach once we've moved to data models for values,
 * probably not needed to pregenerate mixer functions.
 *
 * @public
 */ function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invariant"])(inputLength === output.length, "Both input and output ranges must be the same length");
    /**
     * If we're only provided a single input, we can just make a function
     * that returns the output.
     */ if (inputLength === 1) return ()=>output[0];
    if (inputLength === 2 && input[0] === input[1]) return ()=>output[1];
    // If input runs highest -> lowest, reverse both arrays
    if (input[0] > input[inputLength - 1]) {
        input = [
            ...input
        ].reverse();
        output = [
            ...output
        ].reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const numMixers = mixers.length;
    const interpolator = (v)=>{
        let i = 0;
        if (numMixers > 1) {
            for(; i < input.length - 2; i++){
                if (v < input[i + 1]) break;
            }
        }
        const progressInRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$progress$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["progress"])(input[i], input[i + 1], v);
        return mixers[i](progressInRange);
    };
    return isClamp ? (v)=>interpolator((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$clamp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(input[0], input[inputLength - 1], v)) : interpolator;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/array.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addUniqueItem": ()=>addUniqueItem,
    "moveItem": ()=>moveItem,
    "removeItem": ()=>removeItem
});
function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1) arr.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1) arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
    }
    return arr;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/warn-once.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "warnOnce": ()=>warnOnce
});
const warned = new Set();
function warnOnce(condition, message, element) {
    if (condition || warned.has(message)) return;
    console.warn(message);
    if (element) console.warn(element);
    warned.add(message);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/subscription-manager.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "SubscriptionManager": ()=>SubscriptionManager
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$array$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/array.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
class SubscriptionManager {
    constructor(){
        this.subscriptions = [];
    }
    add(handler) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$array$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addUniqueItem"])(this.subscriptions, handler);
        return ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$array$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeItem"])(this.subscriptions, handler);
    }
    notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions) return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */ this.subscriptions[0](a, b, c);
        } else {
            for(let i = 0; i < numSubscriptions; i++){
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */ const handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/resolve-value.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isCustomValue": ()=>isCustomValue,
    "resolveFinalValueInKeyframes": ()=>resolveFinalValueInKeyframes
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const isCustomValue = (v)=>{
    return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
const resolveFinalValueInKeyframes = (v)=>{
    // TODO maybe throw if v.length - 1 is placeholder token?
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isKeyframesTarget"])(v) ? v[v.length - 1] || 0 : v;
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/shallow-compare.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "shallowCompare": ()=>shallowCompare
});
function shallowCompare(next, prev) {
    if (!Array.isArray(prev)) return false;
    const prevLength = prev.length;
    if (prevLength !== next.length) return false;
    for(let i = 0; i < prevLength; i++){
        if (prev[i] !== next[i]) return false;
    }
    return true;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/distance.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "distance": ()=>distance,
    "distance2D": ()=>distance2D
});
const distance = (a, b)=>Math.abs(a - b);
function distance2D(a, b) {
    // Multi-dimensional
    const xDelta = distance(a.x, b.x);
    const yDelta = distance(a.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/get-context-window.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Fixes https://github.com/framer/motion/issues/2270
__turbopack_esm__({
    "getContextWindow": ()=>getContextWindow
});
const getContextWindow = ({ current })=>{
    return current ? current.ownerDocument.defaultView : null;
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isRefObject": ()=>isRefObject
});
function isRefObject(ref) {
    return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/delay.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "delay": ()=>delay
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/sync-time.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
/**
 * Timeout defined in ms
 */ function delay(callback, timeout) {
    const start = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["time"].now();
    const checkElapsed = ({ timestamp })=>{
        const elapsed = timestamp - start;
        if (elapsed >= timeout) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelFrame"])(checkElapsed);
            callback(elapsed - timeout);
        }
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].read(checkElapsed, true);
    return ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelFrame"])(checkElapsed);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isBrowser": ()=>isBrowser
});
const isBrowser = typeof window !== "undefined";
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "useIsomorphicLayoutEffect": ()=>useIsomorphicLayoutEffect
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const useIsomorphicLayoutEffect = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBrowser"] ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"];
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "useConstant": ()=>useConstant
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */ function useConstant(init) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Does this device prefer reduced motion? Returns `null` server-side.
__turbopack_esm__({
    "hasReducedMotionListener": ()=>hasReducedMotionListener,
    "prefersReducedMotion": ()=>prefersReducedMotion
});
const prefersReducedMotion = {
    current: null
};
const hasReducedMotionListener = {
    current: false
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "initPrefersReducedMotion": ()=>initPrefersReducedMotion
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function initPrefersReducedMotion() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasReducedMotionListener"].current = true;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBrowser"]) return;
    if (window.matchMedia) {
        const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
        const setReducedMotionPreferences = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current = motionMediaQuery.matches;
        motionMediaQuery.addListener(setReducedMotionPreferences);
        setReducedMotionPreferences();
    } else {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current = false;
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/numbers/index.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "alpha": ()=>alpha,
    "number": ()=>number,
    "scale": ()=>scale
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$clamp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/clamp.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const number = {
    test: (v)=>typeof v === "number",
    parse: parseFloat,
    transform: (v)=>v
};
const alpha = {
    ...number,
    transform: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$clamp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(0, 1, v)
};
const scale = {
    ...number,
    default: 1
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/utils.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/**
 * TODO: When we move from string as a source of truth to data models
 * everything in this folder should probably be referred to as models vs types
 */ // If this number is a decimal, make it just five decimal places
// to avoid exponents
__turbopack_esm__({
    "colorRegex": ()=>colorRegex,
    "floatRegex": ()=>floatRegex,
    "isNullish": ()=>isNullish,
    "isString": ()=>isString,
    "sanitize": ()=>sanitize,
    "singleColorRegex": ()=>singleColorRegex
});
const sanitize = (v)=>Math.round(v * 100000) / 100000;
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
function isString(v) {
    return typeof v === "string";
}
function isNullish(v) {
    return v == null;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/numbers/units.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "degrees": ()=>degrees,
    "percent": ()=>percent,
    "progressPercentage": ()=>progressPercentage,
    "px": ()=>px,
    "vh": ()=>vh,
    "vw": ()=>vw
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/utils.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const createUnitType = (unit)=>({
        test: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isString"])(v) && v.endsWith(unit) && v.split(" ").length === 1,
        parse: parseFloat,
        transform: (v)=>`${v}${unit}`
    });
const degrees = createUnitType("deg");
const percent = createUnitType("%");
const px = createUnitType("px");
const vh = createUnitType("vh");
const vw = createUnitType("vw");
const progressPercentage = {
    ...percent,
    parse: (v)=>percent.parse(v) / 100,
    transform: (v)=>percent.transform(v * 100)
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/utils.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isColorString": ()=>isColorString,
    "splitColor": ()=>splitColor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/utils.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */ const isColorString = (type, testProp)=>(v)=>{
        return Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isString"])(v) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["singleColorRegex"].test(v) && v.startsWith(type) || testProp && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNullish"])(v) && Object.prototype.hasOwnProperty.call(v, testProp));
    };
const splitColor = (aName, bName, cName)=>(v)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isString"])(v)) return v;
        const [a, b, c, alpha] = v.match(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["floatRegex"]);
        return {
            [aName]: parseFloat(a),
            [bName]: parseFloat(b),
            [cName]: parseFloat(c),
            alpha: alpha !== undefined ? parseFloat(alpha) : 1
        };
    };
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/rgba.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "rgbUnit": ()=>rgbUnit,
    "rgba": ()=>rgba
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$clamp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/clamp.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/numbers/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/utils.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const clampRgbUnit = (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$clamp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(0, 255, v);
const rgbUnit = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"],
    transform: (v)=>Math.round(clampRgbUnit(v))
};
const rgba = {
    test: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isColorString"])("rgb", "red"),
    parse: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splitColor"])("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 })=>"rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sanitize"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"].transform(alpha$1)) + ")"
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/hex.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "hex": ()=>hex
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/rgba.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    // If we have 6 characters, ie #FF0000
    if (v.length > 5) {
        r = v.substring(1, 3);
        g = v.substring(3, 5);
        b = v.substring(5, 7);
        a = v.substring(7, 9);
    // Or we have 3 characters, ie #F00
    } else {
        r = v.substring(1, 2);
        g = v.substring(2, 3);
        b = v.substring(3, 4);
        a = v.substring(4, 5);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1
    };
}
const hex = {
    test: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isColorString"])("#"),
    parse: parseHex,
    transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgba"].transform
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/hsla.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "hsla": ()=>hsla
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/numbers/units.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/numbers/index.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const hsla = {
    test: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isColorString"])("hsl", "hue"),
    parse: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["splitColor"])("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 })=>{
        return "hsla(" + Math.round(hue) + ", " + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percent"].transform((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sanitize"])(saturation)) + ", " + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["percent"].transform((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sanitize"])(lightness)) + ", " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sanitize"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"].transform(alpha$1)) + ")";
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/index.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "color": ()=>color
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/rgba.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/hsla.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/utils.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const color = {
    test: (v)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgba"].test(v) || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hex"].test(v) || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hsla"].test(v),
    parse: (v)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgba"].test(v)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgba"].parse(v);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hsla"].test(v)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hsla"].parse(v);
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hex"].parse(v);
        }
    },
    transform: (v)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isString"])(v) ? v : v.hasOwnProperty("red") ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rgba"].transform(v) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hsla"].transform(v);
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "analyseComplexValue": ()=>analyseComplexValue,
    "complex": ()=>complex
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/color/index.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function test(v) {
    var _a, _b;
    return isNaN(v) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isString"])(v) && (((_a = v.match(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["floatRegex"])) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = v.match(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorRegex"])) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
// this regex consists of the `singleCssVariableRegex|rgbHSLValueRegex|digitRegex`
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
        color: [],
        number: [],
        var: []
    };
    const types = [];
    let i = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"].test(parsedValue)) {
            indexes.color.push(i);
            types.push(COLOR_TOKEN);
            values.push(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"].parse(parsedValue));
        } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
            indexes.var.push(i);
            types.push(VAR_TOKEN);
            values.push(parsedValue);
        } else {
            indexes.number.push(i);
            types.push(NUMBER_TOKEN);
            values.push(parseFloat(parsedValue));
        }
        ++i;
        return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return {
        values,
        split,
        indexes,
        types
    };
}
function parseComplexValue(v) {
    return analyseComplexValue(v).values;
}
function createTransformer(source) {
    const { split, types } = analyseComplexValue(source);
    const numSections = split.length;
    return (v)=>{
        let output = "";
        for(let i = 0; i < numSections; i++){
            output += split[i];
            if (v[i] !== undefined) {
                const type = types[i];
                if (type === NUMBER_TOKEN) {
                    output += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sanitize"])(v[i]);
                } else if (type === COLOR_TOKEN) {
                    output += __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["color"].transform(v[i]);
                } else {
                    output += v[i];
                }
            }
        }
        return output;
    };
}
const convertNumbersToZero = (v)=>typeof v === "number" ? 0 : v;
function getAnimatableNone(v) {
    const parsed = parseComplexValue(v);
    const transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
}
const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/complex/filter.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "filter": ()=>filter
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/complex/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/types/utils.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
/**
 * Properties that should default to 1 or 100%
 */ const maxDefaults = new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity"
]);
function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow") return v;
    const [number] = value.match(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["floatRegex"]) || [];
    if (!number) return v;
    const unit = value.replace(number, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value) defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["complex"],
    getAnimatableNone: (v)=>{
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/use-will-change/get-will-change-name.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getWillChangeName": ()=>getWillChangeName
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/html/utils/transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animators$2f$utils$2f$accelerated$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
function getWillChangeName(name) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transformProps"].has(name)) {
        return "transform";
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animators$2f$utils$2f$accelerated$2d$values$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["acceleratedValues"].has(name)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["camelToDash"])(name);
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/index.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "MotionValue": ()=>MotionValue,
    "collectMotionValues": ()=>collectMotionValues,
    "motionValue": ()=>motionValue
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/sync-time.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$warn$2d$once$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/warn-once.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/subscription-manager.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/frameloop/frame.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */ const MAX_VELOCITY_DELTA = 30;
const isFloat = (value)=>{
    return !isNaN(parseFloat(value));
};
const collectMotionValues = {
    current: undefined
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */ class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */ constructor(init, options = {}){
        /**
         * This will be replaced by the build step with the latest version number.
         * When MotionValues are provided to motion components, warn if versions are mixed.
         */ this.version = "11.3.19";
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */ this.canTrackVelocity = null;
        /**
         * An object containing a SubscriptionManager for each active event.
         */ this.events = {};
        this.updateAndNotify = (v, render = true)=>{
            const currentTime = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["time"].now();
            /**
             * If we're updating the value during another frame or eventloop
             * than the previous frame, then the we set the previous frame value
             * to current.
             */ if (this.updatedAt !== currentTime) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(v);
            // Update update subscribers
            if (this.current !== this.prev && this.events.change) {
                this.events.change.notify(this.current);
            }
            // Update render subscribers
            if (render && this.events.renderRequest) {
                this.events.renderRequest.notify(this.current);
            }
        };
        this.hasAnimated = false;
        this.setCurrent(init);
        this.owner = options.owner;
    }
    setCurrent(current) {
        this.current = current;
        this.updatedAt = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["time"].now();
        if (this.canTrackVelocity === null && current !== undefined) {
            this.canTrackVelocity = isFloat(this.current);
        }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
        this.prevFrameValue = prevFrameValue;
        this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */ onChange(subscription) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$warn$2d$once$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warnOnce"])(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
        }
        return this.on("change", subscription);
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubscriptionManager"]();
        }
        const unsubscribe = this.events[eventName].add(callback);
        if (eventName === "change") {
            return ()=>{
                unsubscribe();
                /**
                 * If we have no more change listeners by the start
                 * of the next frame, stop active animations.
                 */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["frame"].read(()=>{
                    if (!this.events.change.getSize()) {
                        this.stop();
                    }
                });
            };
        }
        return unsubscribe;
    }
    clearListeners() {
        for(const eventManagers in this.events){
            this.events[eventManagers].clear();
        }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */ attach(passiveEffect, stopPassiveEffect) {
        this.passiveEffect = passiveEffect;
        this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */ set(v, render = true) {
        if (!render || !this.passiveEffect) {
            this.updateAndNotify(v, render);
        } else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    }
    setWithVelocity(prev, current, delta) {
        this.set(current);
        this.prev = undefined;
        this.prevFrameValue = prev;
        this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */ jump(v, endAnimation = true) {
        this.updateAndNotify(v);
        this.prev = v;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        endAnimation && this.stop();
        if (this.stopPassiveEffect) this.stopPassiveEffect();
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */ get() {
        if (collectMotionValues.current) {
            collectMotionValues.current.push(this);
        }
        return this.current;
    }
    /**
     * @public
     */ getPrevious() {
        return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */ getVelocity() {
        const currentTime = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["time"].now();
        if (!this.canTrackVelocity || this.prevFrameValue === undefined || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
            return 0;
        }
        const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
        // Casts because of parseFloat's poor typing
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["velocityPerSecond"])(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */ start(startAnimation) {
        this.stop();
        return new Promise((resolve)=>{
            this.hasAnimated = true;
            this.animation = startAnimation(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(()=>{
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */ stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */ isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */ destroy() {
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function motionValue(init, options) {
    return new MotionValue(init, options);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/use-will-change/WillChangeMotionValue.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "WillChangeMotionValue": ()=>WillChangeMotionValue
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$get$2d$will$2d$change$2d$name$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/use-will-change/get-will-change-name.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$array$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/array.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/index.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
class WillChangeMotionValue extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionValue"] {
    constructor(){
        super(...arguments);
        this.output = [];
        this.counts = new Map();
    }
    add(name) {
        const styleName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$get$2d$will$2d$change$2d$name$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWillChangeName"])(name);
        if (!styleName) return;
        /**
         * Update counter. Each value has an indepdent counter
         * as multiple sources could be requesting the same value
         * gets added to will-change.
         */ const prevCount = this.counts.get(styleName) || 0;
        this.counts.set(styleName, prevCount + 1);
        if (prevCount === 0) {
            this.output.push(styleName);
            this.update();
        }
        /**
         * Prevents the remove function from being called multiple times.
         */ let hasRemoved = false;
        return ()=>{
            if (hasRemoved) return;
            hasRemoved = true;
            const newCount = this.counts.get(styleName) - 1;
            this.counts.set(styleName, newCount);
            if (newCount === 0) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$array$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeItem"])(this.output, styleName);
                this.update();
            }
        };
    }
    update() {
        this.set(this.output.length ? this.output.join(", ") : "auto");
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isMotionValue": ()=>isMotionValue
});
const isMotionValue = (value)=>Boolean(value && value.getVelocity);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/use-will-change/is.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isWillChangeMotionValue": ()=>isWillChangeMotionValue
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function isWillChangeMotionValue(value) {
    return Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(value) && value.add);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addValueToWillChange": ()=>addValueToWillChange
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$WillChangeMotionValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/use-will-change/WillChangeMotionValue.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$is$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/use-will-change/is.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function addValueToWillChange(visualElement, key) {
    var _a;
    if (!visualElement.applyWillChange) return;
    let willChange = visualElement.getValue("willChange");
    /**
     * If we haven't created a willChange MotionValue, and the we haven't been
     * manually provided one, create one.
     */ if (!willChange && !((_a = visualElement.props.style) === null || _a === void 0 ? void 0 : _a.willChange)) {
        willChange = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$WillChangeMotionValue$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WillChangeMotionValue"]("auto");
        visualElement.addValue("willChange", willChange);
    }
    /**
     * It could be that a user has set willChange to a regular MotionValue,
     * in which case we can't add the value to it.
     */ if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$will$2d$change$2f$is$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWillChangeMotionValue"])(willChange)) {
        return willChange.add(key);
    }
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "resolveMotionValue": ()=>resolveMotionValue
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$resolve$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/resolve-value.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 */ function resolveMotionValue(value) {
    const unwrappedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$resolve$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCustomValue"])(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/utils/is-bezier-definition.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isBezierDefinition": ()=>isBezierDefinition
});
const isBezierDefinition = (easing)=>Array.isArray(easing) && typeof easing[0] === "number";
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "cubicBezier": ()=>cubicBezier
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/noop.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
/*
  Bezier function generator
  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticiably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.
  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.
  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/ // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2)=>(((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0.0) {
            upperBound = currentT;
        } else {
            lowerBound = currentT;
        }
    }while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations)
    return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
    // If this is a linear gradient, return linear easing
    if (mX1 === mY1 && mX2 === mY2) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"];
    const getTForX = (aX)=>binarySubdivide(aX, 0, 1, mX1, mX2);
    // If animation is at start/end, return t without easing
    return (t)=>t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/ease.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "easeIn": ()=>easeIn,
    "easeInOut": ()=>easeInOut,
    "easeOut": ()=>easeOut
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const easeIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.42, 0, 1, 1);
const easeOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0, 0, 0.58, 1);
const easeInOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.42, 0, 0.58, 1);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isEasingArray": ()=>isEasingArray
});
const isEasingArray = (ease)=>{
    return Array.isArray(ease) && typeof ease[0] !== "number";
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Accepts an easing function and returns a new one that outputs reversed values.
// Turns easeIn into easeOut.
__turbopack_esm__({
    "reverseEasing": ()=>reverseEasing
});
const reverseEasing = (easing)=>(p)=>1 - easing(1 - p);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

// Accepts an easing function and returns a new one that outputs mirrored values for
// the second half of the animation. Turns easeIn into easeInOut.
__turbopack_esm__({
    "mirrorEasing": ()=>mirrorEasing
});
const mirrorEasing = (easing)=>(p)=>p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/circ.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "circIn": ()=>circIn,
    "circInOut": ()=>circInOut,
    "circOut": ()=>circOut
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$modifiers$2f$reverse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$modifiers$2f$mirror$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const circIn = (p)=>1 - Math.sin(Math.acos(p));
const circOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$modifiers$2f$reverse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reverseEasing"])(circIn);
const circInOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$modifiers$2f$mirror$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mirrorEasing"])(circIn);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/back.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "backIn": ()=>backIn,
    "backInOut": ()=>backInOut,
    "backOut": ()=>backOut
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$modifiers$2f$reverse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$modifiers$2f$mirror$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const backOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.33, 1.53, 0.69, 0.99);
const backIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$modifiers$2f$reverse$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reverseEasing"])(backOut);
const backInOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$modifiers$2f$mirror$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mirrorEasing"])(backIn);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/anticipate.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "anticipate": ()=>anticipate
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/back.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const anticipate = (p)=>(p *= 2) < 1 ? 0.5 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["backIn"])(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/utils/map.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "easingDefinitionToFunction": ()=>easingDefinitionToFunction
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/noop.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/ease.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/circ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/back.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$anticipate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/anticipate.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/utils/errors.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
const easingLookup = {
    linear: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$noop$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"],
    easeIn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeIn"],
    easeInOut: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeInOut"],
    easeOut: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeOut"],
    circIn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["circIn"],
    circInOut: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["circInOut"],
    circOut: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["circOut"],
    backIn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["backIn"],
    backInOut: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["backInOut"],
    backOut: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["backOut"],
    anticipate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$anticipate$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anticipate"]
};
const easingDefinitionToFunction = (definition)=>{
    if (Array.isArray(definition)) {
        // If cubic bezier definition, create bezier curve
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invariant"])(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
        const [x1, y1, x2, y2] = definition;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(x1, y1, x2, y2);
    } else if (typeof definition === "string") {
        // Else lookup from table
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$errors$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["invariant"])(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`);
        return easingLookup[definition];
    }
    return definition;
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/events/add-dom-event.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addDomEvent": ()=>addDomEvent
});
function addDomEvent(target, eventName, handler, options = {
    passive: true
}) {
    target.addEventListener(eventName, handler, options);
    return ()=>target.removeEventListener(eventName, handler);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/events/utils/is-primary-pointer.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isPrimaryPointer": ()=>isPrimaryPointer
});
const isPrimaryPointer = (event)=>{
    if (event.pointerType === "mouse") {
        return typeof event.button !== "number" || event.button <= 0;
    } else {
        /**
         * isPrimary is true for all mice buttons, whereas every touch point
         * is regarded as its own input. So subsequent concurrent touch points
         * will be false.
         *
         * Specifically match against false here as incomplete versions of
         * PointerEvents in very old browser might have it set as undefined.
         */ return event.isPrimary !== false;
    }
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/events/event-info.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addPointerInfo": ()=>addPointerInfo,
    "extractEventInfo": ()=>extractEventInfo
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/events/utils/is-primary-pointer.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
function extractEventInfo(event, pointType = "page") {
    return {
        point: {
            x: event[`${pointType}X`],
            y: event[`${pointType}Y`]
        }
    };
}
const addPointerInfo = (handler)=>{
    return (event)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPrimaryPointer"])(event) && handler(event, extractEventInfo(event));
};
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/events/add-pointer-event.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "addPointerEvent": ()=>addPointerEvent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/events/add-dom-event.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$event$2d$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/events/event-info.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function addPointerEvent(target, eventName, handler, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$add$2d$dom$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDomEvent"])(target, eventName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$events$2f$event$2d$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addPointerInfo"])(handler), options);
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "PresenceContext": ()=>PresenceContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
/**
 * @public
 */ const PresenceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LayoutGroupContext": ()=>LayoutGroupContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const LayoutGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({});
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "SwitchLayoutGroupContext": ()=>SwitchLayoutGroupContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
/**
 * Internal, exported only for usage in Framer
 */ const SwitchLayoutGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({});
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "MotionConfigContext": ()=>MotionConfigContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
/**
 * @public
 */ const MotionConfigContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    transformPagePoint: (p)=>p,
    isStatic: false,
    reducedMotion: "never"
});
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getCurrentTreeVariants": ()=>getCurrentTreeVariants
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function getCurrentTreeVariants(props, context) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isControllingVariants"])(props)) {
        const { initial, animate } = props;
        return {
            initial: initial === false || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVariantLabel"])(initial) ? initial : undefined,
            animate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVariantLabel"])(animate) ? animate : undefined
        };
    }
    return props.inherit !== false ? context : {};
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "MotionContext": ()=>MotionContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const MotionContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({});
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "useCreateMotionContext": ()=>useCreateMotionContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
function useCreateMotionContext(props) {
    const { initial, animate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$utils$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentTreeVariants"])(props, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionContext"]));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            initial,
            animate
        }), [
        variantLabelsAsDependency(initial),
        variantLabelsAsDependency(animate)
    ]);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "LazyContext": ()=>LazyContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const LazyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    strict: false
});
;

})()),
"[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs [app-ssr] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isPresent": ()=>isPresent,
    "useIsPresent": ()=>useIsPresent,
    "usePresence": ()=>usePresence
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.0-canary.152_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/framer-motion@11.3.19_react-dom@19.0.0-rc-7771d3a7-20240827_react@19.0.0-rc-7771d3a7-20240827/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-ssr] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */ function usePresence() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PresenceContext"]);
    if (context === null) return [
        true,
        null
    ];
    const { isPresent, onExitComplete, register } = context;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>register(id), []);
    const safeToRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>onExitComplete && onExitComplete(id), [
        id,
        onExitComplete
    ]);
    return !isPresent && onExitComplete ? [
        false,
        safeToRemove
    ] : [
        true
    ];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */ function useIsPresent() {
    return isPresent((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$0$2d$canary$2e$152_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$11$2e$3$2e$19_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827_react$40$19$2e$0$2e$0$2d$rc$2d$7771d3a7$2d$20240827$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PresenceContext"]));
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}
;

})()),

};

//# sourceMappingURL=421c4_framer-motion_dist_es_476a9b._.js.map
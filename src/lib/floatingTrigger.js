let __trigger = null;

export const setFloatingTrigger = (fn) => { __trigger = fn; };
export const getFloatingTrigger = () => __trigger;
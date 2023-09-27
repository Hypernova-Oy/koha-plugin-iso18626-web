import { defineStore } from "pinia";

export type Confirmation = {
    title: string;
    message: string;
    accept_label: string;
    cancel_label: string;
}

export const useMainStore = defineStore("main", {
    state: () => ({
        _message: null as string | null,
        _error: null as Error | null,
        _warning: null as string | null,
        _confirmation: null as Confirmation | null,
        _accept_callback: null as null | (() => Promise<void>),
        previousMessage: null as string | null,
        previousError: null as string | null,
        displayed_already: false as boolean,
        _is_submitting: false as boolean,
        _is_loading: false as boolean,
    }),
    actions: {
        setMessage(message: string, displayed = false) {
            this._error = null;
            this._warning = null;
            this._message = message;
            this._confirmation = null;
            this.displayed_already =
                displayed; /* Will be displayed on the next view */
        },
        setError(error: Error, displayed = true) {
            this._error = error;
            this._warning = null;
            this._message = null;
            this._confirmation = null;
            this.displayed_already =
                displayed; /* Is displayed on the current view */
        },
        setWarning(warning: string, displayed = true) {
            this._error = null;
            this._warning = warning;
            this._message = null;
            this._confirmation = null;
            this.displayed_already =
                displayed; /* Is displayed on the current view */
        },
        setConfirmationDialog(confirmation: Confirmation, accept_callback: Function, displayed = true) {
            if (accept_callback) {
                this._accept_callback = async () => {
                    await accept_callback();
                    this.removeConfirmationMessages();
                };
            }
            this._confirmation = confirmation;
            this.displayed_already =
                displayed; /* Is displayed on the current view */
        },
        removeMessages() {
            if (this.displayed_already) {
                this._error = null;
                this._warning = null;
                this._message = null;
                this._confirmation = null;
                this._accept_callback = null;
            }
            this.displayed_already = true;
        },
        removeConfirmationMessages() {
            this._confirmation = null;
            this._accept_callback = null;
        },
        submitting() {
            this._is_submitting = true;
        },
        submitted() {
            this._is_submitting = false;
        },
        loading() {
            this._is_loading = true;
        },
        loaded() {
            this._is_loading = false;
        },
    },
    getters: {
        error(state) {
            return state._error;
        },
        warning(state) {
            return state._warning;
        },
        message(state) {
            return state._message;
        },
        confirmation(state) {
            return state._confirmation;
        },
        accept_callback(state) {
            return state._accept_callback;
        },
        is_submitting(state) {
            return state._is_submitting;
        },
        is_loading(state) {
            return state._is_loading;
        },
    },
});

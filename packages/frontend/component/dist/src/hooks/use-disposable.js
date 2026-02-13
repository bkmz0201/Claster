import { useEffect, useState } from 'react';
export function useDisposable(disposableFn, deps) {
    const [state, setState] = useState({
        data: null,
        loading: false,
        error: null,
    });
    // oxlint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const abortController = new AbortController();
        let _data = null;
        setState(prev => ({ ...prev, loading: true, error: null }));
        Promise.resolve(disposableFn(abortController.signal))
            .then(data => {
            _data = data;
            if (!abortController.signal.aborted) {
                setState({ data, loading: false, error: null });
            }
        })
            .catch(error => {
            if (!abortController.signal.aborted) {
                setState(prev => ({ ...prev, error, loading: false }));
            }
        });
        return () => {
            abortController.abort();
            if (_data && typeof _data === 'object') {
                if (Symbol.dispose in _data) {
                    _data[Symbol.dispose]();
                }
                else if (Symbol.asyncDispose in _data) {
                    _data[Symbol.asyncDispose]();
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps || []);
    return state;
}
//# sourceMappingURL=use-disposable.js.map